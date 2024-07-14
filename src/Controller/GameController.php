<?php
declare(strict_types=1);

namespace App\Controller;

use App\Service\GameMapService;
use App\Service\LobbyPlaceService;
use App\Service\UserService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class GameController extends AbstractController
{
    private const SESSION_USER_ID = 'userId';
    private const SESSION_KEY_GAME = 'keyGame';
    private const KEY_LENGTH = 4;
    private SessionController $session;
    private LobbyPlaceService $lobbyService;
    private GameMapService $gameMapService;
    private UserService $userService;

    public function __construct(
        SessionController $session,
        UserService $userService,
        LobbyPlaceService $lobbyService,
        GameMapService $gameMapService
    )
    {
        $this->session = $session;
        $this->userService = $userService;
        $this->lobbyService = $lobbyService;
        $this->gameMapService = $gameMapService;
    }

    public function startGame(Request $request): Response
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
        $this->session->setSession(self::SESSION_KEY_GAME, $keyRoom);     
        $this->lobbyService->setGameStatus($keyRoom); 
        return $this->redirectToRoute(
            'main_game',
            ['keyRoom' => $keyRoom]
        );
    }

    public function mainGame(): Response
    {
        $sessionUserId = $this->session->getSession(self::SESSION_USER_ID);
        if ($sessionUserId === null)
        {
            return $this->redirectToRoute(
                'login_form', 
                ['message' => 'Сначала вы должны войти в аккаунт']
            );
        }

        $sessionKeyRoom = $this->session->getSession(self::SESSION_KEY_GAME);
        if ($sessionKeyRoom === null)
        {
            return $this->redirectToRoute(
                'start_lobby_page',
                ['message' => 'Игры с таким ключом нет']
            );
        }

        return $this->render('main_game.html.twig');    
    }

    public function createGameMap(Request $request): Response
    {
        $sessionKeyRoom = $this->session->getSession(self::SESSION_KEY_GAME);
        if ($sessionKeyRoom === null)
        {
            return $this->redirectToRoute(
                'start_lobby_page',
                ['message' => 'Игры с таким ключом нет']
            );
        }
        $data = json_decode($request->getContent(), true);
        try {
            $this->gameMapService->createGameMap($sessionKeyRoom, $data['matrix_game_map']);
        } catch (\UnexpectedValueException $e) {
            return new Response($e->getMessage());
        }
        
        return new Response('OK');
    }

    public function findGameMap(): Response
    {
        $sessionKeyRoom = $this->session->getSession(self::SESSION_KEY_GAME);
        if ($sessionKeyRoom === null)
        {
            return $this->redirectToRoute(
                'start_lobby_page',
                ['message' => 'Игры с таким ключом нет']
            );
        }
        try {
            $matrixGameMap = $this->gameMapService->viewGameMap($sessionKeyRoom);
        } catch (\UnexpectedValueException $e) {
            return new Response($e->getMessage());
        }

        return new Response(json_encode([
            'matrix_game_map' => $matrixGameMap
        ]));
    }

    public function updateGameMap(Request $request): Response
    {
        $sessionKeyRoom = $this->session->getSession(self::SESSION_KEY_GAME);
        if ($sessionKeyRoom === null)
        {
            return $this->redirectToRoute(
                'start_lobby_page',
                ['message' => 'Игры с таким ключом нет']
            );
        }
        $matrixGameMap = json_decode($request->getContent(), true);
        if (empty($matrixGameMap))      
        {
            return new Response('Invalid JSON');
        }

        try {
            $this->gameMapService->updateGameMap($sessionKeyRoom, $matrixGameMap);
        } catch (\UnexpectedValueException $e) {
            return new Response($e->getMessage());
        }
        
        return new Response('OK');
    }

    public function endGame(): Response
    {
        $sessionKeyRoom = $this->session->getSession(self::SESSION_KEY_GAME);
        try {
            $this->gameMapService->deleteGameMap($sessionKeyRoom);
            $this->lobbyService->setLobbyStatus($sessionKeyRoom);
        } catch (\UnexpectedValueException $e) {
            return new Response($e->getMessage());
        }
        $this->session->removeSession(self::SESSION_KEY_GAME);

        return new Response('OK');
    }
}