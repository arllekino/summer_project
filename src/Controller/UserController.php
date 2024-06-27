<?php
declare(strict_types=1);

namespace App\Controller;

use App\Service\UserService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class UserController extends AbstractController
{
    private UserService $userService;
    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
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
        try {
            $userId = $this->userService->register($request->get('user_name'), $request->get('email'), $request->get('password'));
        } catch (\UnexpectedValueException $e) {
            return $this->redirectToRoute(
                'register_form', [
                'error' => $e->getMessage()
            ]);
        }
        return $this->redirectToRoute(
            'start_lobby_page',
            ['userId' => $userId,
            Response::HTTP_SEE_OTHER, 
        ]);
    }

    public function logInUser(Request $request): Response
    {
        try {
            $userId = $this->userService->logIn($request->get('email'), $request->get('password'));
        } catch (\UnexpectedValueException $e) {
            return $this->redirectToRoute(
                'login_form', [
                'error' => $e->getMessage()
            ]);
        }   
        return $this->redirectToRoute(
            'start_lobby_page',
            ['userId' => $userId 
        ]);
    }

    public function startLobbyPage(Request $request): Response
    {
        $userId = $request->get('userId');
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
}