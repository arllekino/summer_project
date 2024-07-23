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
    private const SESSION_KEY_GAME = 'keyGame';
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

    public function startLobbyPage(Request $request): Response
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
            ['userName' => $userName,
            'message' => $request->get('message')]
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
            $userStatus = $this->lobbyService->getPlayerStatus($sessionUserId);
            $userReadiness = $this->lobbyService->getPlayerReadiness($sessionUserId);
        } catch (\UnexpectedValueException $e) {
            return $this->redirectToRoute(
                'start_lobby_page',
                ['message' => $e->getMessage(),
            ]);
        }
        return $this->render('lobby_page.html.twig', [
            'users' => $users,
            'keyRoom' => $keyRoom,
            'user_status' => $userStatus,
            'user_readiness' => $userReadiness
        ]);
    }

    public function findKeyRoom(): Response
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
            $keyRoom = $this->lobbyService->findKeyRoomByPlayerId($sessionUserId);
        } catch (\UnexpectedValueException $e) {
            return new Response($e->getMessage());
        }

        return new Response(json_encode([
            'key_room' => $keyRoom
        ]));
    }

    public function makeGuestHost(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);

        $sessionUserId = $this->session->getSession(self::SESSION_USER_ID);
        if ($sessionUserId === null)
        {
            return new Response(json_encode([
                'success' => false
            ]));
        }
        try {
            $this->lobbyService->MakeGuestHost($sessionUserId, $data['key_room']);
        } catch (\UnexpectedValueException $e) {
            return new Response(json_encode([
                'success' => false
            ]));
        }
        return new Response(json_encode([
            'success' => true
        ]));
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

    public function makePlayersNotReady(): Response
    {
        $sessionKeyRoom = $this->session->getSession(self::SESSION_KEY_GAME);
        try {
            $this->lobbyService->makePlayersNotReady($sessionKeyRoom);
        } catch (\UnexpectedValueException $e) {
            return new Response($e->getMessage());
        }
        return new Response('OK');
    }

    public function getPlayerStatus(): Response
    {
        $sessionUserId = $this->session->getSession(self::SESSION_USER_ID);
        if ($sessionUserId === null)
        {
            return new Response('Id пользователя не найден');
        }

        try {
            $playerStatus = $this->lobbyService->getPlayerStatus($sessionUserId);
        } catch (\UnexpectedValueException $e) {
            return new Response($e->getMessage());
        }

        return new Response(json_encode([
            'player_status' => $playerStatus
        ]));
    }

    public function findCountPLayersInLobby(): Response
    {
        $sessionKeyRoom = $this->session->getSession(self::SESSION_KEY_GAME);
        if ($sessionKeyRoom === null)
        {
            return new Response('Игры с таким ключом нет');
        }

        $countPlayers = $this->lobbyService->findCountPlayers($sessionKeyRoom);
        return new Response(json_encode([
            'count_players' => $countPlayers
        ]));
    }

    public function getPlayersIdsInLobby(): Response
    {
        $sessionKeyRoom = $this->session->getSession(self::SESSION_KEY_GAME);
        if ($sessionKeyRoom === null)
        {
            return new Response('Игры с таким ключом нет');
        }

        $idsPlayers = $this->lobbyService->findPlayersId($sessionKeyRoom);
        return new Response(json_encode([
            'ids_players' => $idsPlayers
        ]));
    }

    public function getPlayerColorFlag(): Response
    {
        $sessionUserId = $this->session->getSession(self::SESSION_USER_ID);
        if ($sessionUserId === null)
        {
            return new Response('Пользователь не найден');
        }

        try {
            $colorFlag = $this->lobbyService->findPlayerColorFlag($sessionUserId);
        } catch (\UnexpectedValueException $e) {
            return new Response($e->getMessage());
        }

        return new Response(json_encode([
            'color_flag' => $colorFlag
        ]));
    }

    public function isAllPlayersReady(Request $request): Response
    {
        $keyRoom = $this->session->getSession(self::SESSION_KEY_GAME);
        if ($keyRoom === null)
        {
            $data = json_decode($request->getContent(), true);
            $keyRoom = $data['key_room'];
        }   

        try {
            $lobbyReadiness = $this->lobbyService->isAllPlayersReady($keyRoom);
        } catch (\UnexpectedValueException $e) {
            return new Response($e->getMessage());
        }

        return new Response(json_encode([
            'lobby_readiness' => $lobbyReadiness
        ]));
    }

    public function isHostExist(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);
        
        try {
            $hostExisting = $this->lobbyService->isHostExist($data['key_room']);
        } catch (\UnexpectedValueException $e) {
            return new Response($e->getMessage());
        }

        return new Response(json_encode([
            'host_existing' => $hostExisting
        ]));
    }

    public function quitFromLobby(): Response
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
        $data = json_decode($request->getContent(), true);
        try {
            $this->lobbyService->deleteUserFromLobby($data['user_id']);
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