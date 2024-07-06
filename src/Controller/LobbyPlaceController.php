<?php
declare(strict_types=1);

namespace App\Controller;

use App\Service\LobbyPlaceService;
use App\Service\UserService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class LobbyPlaceController extends AbstractController
{
    private const SESSION_NAME = 'userId';
    private SessionController $session;
    private LobbyPlaceService $lobbyService;
    private UserService $userService;
    
    public function __construct(
        SessionController $session,
        UserService $userService,
        LobbyPlaceService $lobbyService
    )
    {
        $this->session = $session;
        $this->userService = $userService;
        $this->lobbyService = $lobbyService;
    }

    
    public function startLobbyPage(): Response
    {
        $sessionUserId = $this->session->getSession(self::SESSION_NAME);
        if (!$sessionUserId)
        {
            return $this->redirectToRoute('login_form', [
                'error' => 'You must log in first'
            ]);
        }
        
        try {
            $userName = $this->userService->findUserName($sessionUserId);
        } catch (\UnexpectedValueException $e) {
            return $this->redirectToRoute(
                'error_page',
                ['message' => $e->getMessage(),
            ]);
        }
        return $this->render(
            'start_lobby_page.html.twig',
            ['userName' => $userName]
        );
    }
    public function createLobby(): Response
    {
        $sessionUserId = $this->session->getSession(self::SESSION_NAME);
        if ($sessionUserId === null)
        {
            return $this->redirectToRoute('login_form', [
                'error' => 'You must log in first'
            ]);
        }
        try {
            $keyRoom = $this->lobbyService->create($sessionUserId);
        } catch (\UnexpectedValueException $e) {
            return $this->redirectToRoute(
                'start_lobby_page',
                ['message' => $e]
            );
        }

        return $this->redirectToRoute('lobby_page', [
            'keyRoom' => $keyRoom
        ]);
    }
    public function joinLobby(Request $request): Response
    {
        $sessionUserId = $this->session->getSession(self::SESSION_NAME);
        if ($sessionUserId === null)
        {
            return $this->redirectToRoute('login_form', [
                'error' => 'You must log in first'
            ]);
        }
        
        $keyRoom = $request->get('keyRoom');
        try {
            $this->lobbyService->addUserToLobby($keyRoom, $sessionUserId);
        } catch (\UnexpectedValueException $e) {
            return $this->redirectToRoute(
                'start_lobby_page',
                ['message' => $e->getMessage()]
            );
        }

        return $this->redirectToRoute('lobby_page', [
            'keyRoom' => $keyRoom
        ]);       
    }
    public function lobbyPage(Request $request): Response
    {
        $sessionUserId = $this->session->getSession(self::SESSION_NAME);
        if (!$sessionUserId)
        {
            return $this->redirectToRoute(
                'login_form', 
                ['error' => 'You must log in first']
            );
        }

        $keyRoom = $request->get('keyRoom');
        try {
            $userNames = $this->lobbyService->showUsersInLobby($keyRoom);
        } catch (\UnexpectedValueException $e) {
            return $this->redirectToRoute(
                'start_lobby_page',
                ['message' => $e->getMessage(),
            ]);
        }
        return $this->render('lobby_page.html.twig', [
            'userNames' => $userNames,
            'keyRoom' => $keyRoom
        ]);
    }

    public function quitFromLooby(Request $request): Response
    {
        $sessionUserId = $this->session->getSession(self::SESSION_NAME);
        if (!$sessionUserId)
        {
            return $this->redirectToRoute(
                'login_form', 
                ['error' => 'You must log in first']
            );
        }
        try {
            $this->lobbyService->deleteUserFromLobby($request->get('keyRoom'), $sessionUserId);
        } catch (\UnexpectedValueException $e) {
            return $this->redirectToRoute(
                'start_lobby_page',
                ['message' => $e->getMessage()]
            );
        }

        return $this->redirectToRoute(
            'start_lobby_page',
            ['message' => null]
        );
    }
}