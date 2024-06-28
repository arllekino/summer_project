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
    const MIN_LENGTH_USER_NAME = 3; 
    const MIN_LENGTH_PASSWORD = 8; 

    private UserService $userService;
    private SessionController $session;
    public function __construct(UserService $userService, SessionController $session)
    {
        $this->userService = $userService;
        $this->session = $session;
    }

    public function registerForm(Request $request): Response
    {
        $error = $request->get('error');
        return $this->render('register_form.html.twig', [
            'error' => $error
        ]); 
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
                'register_form', [
                'error' => 'Check all fields'
            ]);
        }
        try {
            $this->userService->register($input);
        } catch (\UnexpectedValueException $e) {
            return $this->redirectToRoute(
                'register_form', [
                'error' => $e->getMessage()
            ]);
        }
        return $this->redirect('login_form');
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
                'login_form', [
                'error' => 'Check all fields'
            ]);
        }
        try {
            $userId = $this->userService->logIn($input);
            $userName = $this->userService->findUserName($userId);
        } catch (\UnexpectedValueException $e) {
            return $this->redirectToRoute(
                'login_form', [
                'error' => $e->getMessage()
            ]);
        }   
        $this->session->setSession($userId, $userName);

        return $this->redirectToRoute('start_lobby_page', [
            'userId' => $userId
        ]);
    }

    public function startLobbyPage(Request $request): Response
    {
        $userId = $request->get('userId');
        $sessionUserId = $this->session->getSession('userId');
        if ($userId != $sessionUserId)
        {
            return $this->redirectToRoute('login_form', [
                'error' => 'You must log in first'
        ]);
        }
        try {
            $userName = $this->userService->findUserName((int) $userId);
        } catch (\UnexpectedValueException $e) {
            return $this->redirectToRoute(
                'error_page',
                ['message' => $e->getMessage(),
            ]);
        }
        return $this->render(
            'start_lobby_page.html.twig',
            ['userName' => $userName
        ]);
    }

    private function isValid(mixed $input): bool
    {
        $email = filter_var($input->getEmail(), FILTER_SANITIZE_EMAIL);

        // Проверяем, является ли email действительным
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