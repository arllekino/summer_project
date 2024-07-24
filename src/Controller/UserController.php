<?php
declare(strict_types=1);

namespace App\Controller;

use App\Controller\Input\LoginUserInput;
use App\Controller\Input\RegisterUserInput;
use App\Service\UserService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class UserController extends AbstractController
{
    private const MIN_LENGTH_USER_NAME = 3; 
    private const MIN_LENGTH_PASSWORD = 8; 
    private const SESSION_USER_ID = 'userId';

    public function __construct(
        private UserService $userService,
        private SessionController $session)
    {}

    public function registerForm(Request $request): Response
    {
        $message = $request->get('message');
        return $this->render(
            'register_form.html.twig',
            ['message' => $message]
        ); 
    }

    public function registerUser(Request $request): Response
    {
        $input = new RegisterUserInput(
            $request->get('username'),
            $request->get('email'),
            $request->get('password')
        );
        if (!$this->isValid($input))
        {
            return $this->redirectToRoute(
                'register_form', 
                ['message' => 'Не все поля заполнены']
            );
        }
        try {
            $userId = $this->userService->register($input);
        } catch (\UnexpectedValueException $e) {
            return $this->redirectToRoute(
                'register_form', [
                'message' => $e->getMessage()
            ]);
        }
        $this->session->clearSession();
        $this->session->setSession(self::SESSION_USER_ID, $userId);
        return $this->redirectToRoute('start_lobby_page');
    }

    public function logInForm(Request $request): Response
    {       
        $userSession = $this->session->getSession(self::SESSION_USER_ID);
        if ($userSession)
        {
            return $this->redirectToRoute('start_lobby_page');
        } 
        $message = $request->get('message');
        return $this->render(
            'login_form.html.twig', 
            ['message' => $message]
        );
    }

    public function logInUser(Request $request): Response
    {
        $input = new LoginUserInput(
            $request->get('email'),
            $request->get('password')
        );
        if (!$this->isValid($input))
        {
            return $this->redirectToRoute(
                'login_form', 
                ['message' => 'Не все поля заполнены']
            );
        }
        try {
            $userId = $this->userService->logIn($input);
            $userName = $this->userService->findUserName($userId);
        } catch (\UnexpectedValueException $e) {
            return $this->redirectToRoute(
                'login_form', [
                'message' => $e->getMessage()
            ]);
        }   
        $this->session->setSession(self::SESSION_USER_ID, $userId);

        return $this->redirectToRoute('start_lobby_page');
    }

    public function logout(): Response
    {
        $this->session->removeSession(self::SESSION_USER_ID);
        return $this->redirectToRoute('login_form');
    }

    public function findUsername(): Response
    {
        $sessionUserId = $this->session->getSession(self::SESSION_USER_ID);
        if ($sessionUserId === null)
        {
            return $this->redirectToRoute(
                'login_form', 
                ['message' => 'В первую очередь надо войти в аккаунт']
            );
        }     

        try {
            $username = $this->userService->findUserName($sessionUserId);
        } catch (\UnexpectedValueException $e) {
            return new Response($e->getMessage());
        }

        return new Response(json_encode([
            'id' => $sessionUserId,
            'username' => $username
        ]));
    }

    private function isValid(mixed $input): bool
    {
        $email = filter_var($input->getEmail(), FILTER_SANITIZE_EMAIL);

        if (preg_match('/\s/', $input->getPassword()) ||
           strlen($input->getPassword()) < self::MIN_LENGTH_PASSWORD    
        ) 
        {
            return false;
        }

        if (!filter_var($email, FILTER_SANITIZE_EMAIL))
        {
            return false;
        }

        if ($input instanceof RegisterUserInput)
        {
            if (preg_match('/\s/', $input->getUsername()) ||
                strlen($input->getUsername()) < self::MIN_LENGTH_USER_NAME    
            ) 
            {
                return false;
            }
        }

        return true;
    }
}