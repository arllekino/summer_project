<?php
declare(strict_types=1);

namespace App\Controller;

use App\Service\GameMapService;
use App\Service\IslandService;
use App\Service\LobbyPlaceService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class GameController extends AbstractController
{
    private const SESSION_USER_ID = 'userId';
    private const SESSION_KEY_GAME = 'keyGame';
    private const STATUS_START = 0;
    public function __construct(
        private SessionController $session,
        private LobbyPlaceService $lobbyService,
        private GameMapService $gameMapService,
        private IslandService $islandService,
    )
    {}

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

        $data = json_decode($request->getContent(), true);
        $keyRoom = $data['key_room'];

        try {
            $readiness = $this->lobbyService->isAllPlayersReady($keyRoom);
        } catch (\UnexpectedValueException $e) {
            return new Response($e->getMessage());
        }

        if ($readiness)
        {
            $this->session->setSession(self::SESSION_KEY_GAME, $keyRoom);     
            $this->lobbyService->setGameStatus($keyRoom); 
        }
        
        return new Response(json_encode([
            'readiness' => $readiness
        ]));
    }

    public function addUserToGame(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);
        $this->session->setSession(self::SESSION_KEY_GAME, $data['key_room']);

        return new Response('OK');
    }

    public function mainGame(): Response
    {
        $sessionUserId = $this->session->getSession(self::SESSION_USER_ID);
        if ($sessionUserId === null)
        {
            return $this->redirectToRoute(
                'login_form', 
                ['message' => 'В первую очередь надо войти в аккаунт']
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
            return new Response('Игры с таким ключом нет');
        }
        $data = json_decode($request->getContent(), true);
        try {
            $this->gameMapService->createGameMap($sessionKeyRoom, json_encode($data['matrix_game_map']), self::STATUS_START);
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
            return new Response('Игры с таким ключом нет', Response::HTTP_NOT_FOUND);
        }

        try {
            $matrixGameMap = $this->gameMapService->viewGameMap($sessionKeyRoom);
        } catch (\UnexpectedValueException $e) {
            return new Response($e->getMessage(), Response::HTTP_NOT_FOUND);
        }

        return new Response(json_encode([
            'matrix_game_map' => json_decode($matrixGameMap)
        ]));
    }

    public function getGameStatus(): Response
    {
       $sessionKeyRoom = $this->session->getSession(self::SESSION_KEY_GAME);
        if ($sessionKeyRoom === null)
        {
            return new Response('Игры с таким ключом нет', Response::HTTP_NOT_FOUND);
        }

        try {
            $gameStatus = $this->gameMapService->getGameStatus($sessionKeyRoom);
        } catch (\UnexpectedValueException $e) {
            return new Response($e->getMessage(), Response::HTTP_NOT_FOUND);
        }

        return new Response(json_encode([
            'game_status' => $gameStatus
        ]));
    }

    public function setGameStatus(Request $request): Response
    {
       $sessionKeyRoom = $this->session->getSession(self::SESSION_KEY_GAME);
        if ($sessionKeyRoom === null)
        {
            return new Response('Игры с таким ключом нет', Response::HTTP_NOT_FOUND);
        }

        $data = json_decode($request->getContent(), true);

        try {
            $this->gameMapService->setGameStatus($sessionKeyRoom, $data['game_status']);
        } catch (\UnexpectedValueException $e) {
            return new Response($e->getMessage(), Response::HTTP_NOT_FOUND);
        }

        return new Response('OK');
    }

    public function updateGameMap(Request $request): Response
    {
        $sessionKeyRoom = $this->session->getSession(self::SESSION_KEY_GAME);
        if ($sessionKeyRoom === null)
        {
            return new Response('Игры с таким ключом нет');
        }
        $data = json_decode($request->getContent(), true);
        if (empty($data))      
        {
            return new Response('Invalid JSON');
        }

        try {
            $this->gameMapService->updateGameMap($sessionKeyRoom, $data['matrix_game_map']);
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
            $this->islandService->deleteIslandsInGame($sessionKeyRoom);
        } catch (\UnexpectedValueException $e) {
            return new Response($e->getMessage(), Response::HTTP_BAD_REQUEST);
        }
        $this->session->removeSession(self::SESSION_KEY_GAME);

        return new Response('OK');
    }
}