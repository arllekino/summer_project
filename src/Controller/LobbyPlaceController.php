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
    private const SESSION_USER_ID = 'userId';
    private const KEY_LENGTH = 4;
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
        $sessionUserId = $this->session->getSession(self::SESSION_USER_ID);
        if ($sessionUserId === null)
        {
            return $this->redirectToRoute(
                'login_form',
                ['message' => 'В первую очередь надо войти в аккаунт']
            );
        }
        
        try {
            $userName = $this->userService->findUserName($sessionUserId);
        } catch (\UnexpectedValueException $e) {
            $this->session->removeSession(self::SESSION_USER_ID);
            return $this->redirectToRoute(
                'error_page', [
                    'message' => $e->getMessage(),
                    'messageCode' => $e->getCode()
            ]);
        }
        return $this->render(
            'start_lobby_page.html.twig',
            ['userName' => $userName]
        );
    }
    public function createLobby(): Response
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
        $sessionUserId = $this->session->getSession(self::SESSION_USER_ID);
        if ($sessionUserId === null)
        {
            return $this->redirectToRoute(
                'login_form',
                ['message' => 'В первую очередь надо войти в аккаунт']
            );
        }
        
        $keyRoom = $request->get('keyRoom');
        if (!$this->isKeyRoomValid($keyRoom))
        {
            return $this->redirectToRoute(
                'start_lobby_page',
                ['message' => 'Некорректный ключ']
            );
        }

        try {
            $this->lobbyService->addUserToLobby($keyRoom, $sessionUserId);
        } catch (\UnexpectedValueException $e) {
            return $this->redirectToRoute(
                'start_lobby_page',
                ['message' => $e->getMessage()]
            );
        }

        return $this->redirectToRoute(
            'lobby_page', 
            ['keyRoom' => $keyRoom]
    );       
    }
    public function lobbyPage(Request $request): Response
    {
        $sessionUserId = $this->session->getSession(self::SESSION_USER_ID);
        if ($sessionUserId === null)
        {
            return $this->redirectToRoute(
                'login_form', 
                ['message' => 'В первую очередь надо войти в аккаунт']
            );
        }

        $keyRoom = $request->get('keyRoom');
        try {
            $users = $this->lobbyService->showUsersInLobby($keyRoom);
        } catch (\UnexpectedValueException $e) {
            return $this->redirectToRoute(
                'start_lobby_page',
                ['message' => $e->getMessage(),
            ]);
        }
        return $this->render('lobby_page.html.twig', [
            'users' => $users,
            'keyRoom' => $keyRoom
        ]);
    }

    public function makeGuestHost(): Response
    {
        $sessionUserId = $this->session->getSession(self::SESSION_USER_ID);
        if ($sessionUserId === null)
        {
            return $this->redirectToRoute(
                'login_form', 
                ['message' => 'В первую очередь надо войти в аккаунт']
            );
        }

        $this->lobbyService->MakeGuestHost($sessionUserId);
        return new Response('OK');
    }

    public function makePlayerReady(): Response
    {
        $sessionUserId = $this->session->getSession(self::SESSION_USER_ID);
        if ($sessionUserId === null)
        {
            return $this->redirectToRoute(
                'login_form', 
                ['message' => 'В первую очередь надо войти в аккаунт']
            );
        }  

        $this->lobbyService->setReadyStatus($sessionUserId);
        return new Response('OK');
    }

    public function makePlayerNotReady(): Response
    {
        $sessionUserId = $this->session->getSession(self::SESSION_USER_ID);
        if ($sessionUserId === null)
        {
            return $this->redirectToRoute(
                'login_form', 
                ['message' => 'В первую очередь надо войти в аккаунт']
            );
        }  

        $this->lobbyService->setNotReadyStatus($sessionUserId);
        return new Response('OK');
    }

    public function quitFromLooby(): Response
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
            $this->lobbyService->deleteUserFromLobby($sessionUserId);
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

    public function kickFromLobby(Request $request): Response
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
            $this->lobbyService->deleteUserFromLobby( $sessionUserId);
        } catch (\UnexpectedValueException $e) {
            return new Response($e->getMessage());
        }    
        return new Response('OK');
    }

    private function isKeyRoomValid(string $keyRoom): bool
    {
        if (strlen($keyRoom) === self::KEY_LENGTH)
        {
            return true;
        }   
        return false;
    }
}