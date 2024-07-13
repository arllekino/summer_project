<?php
declare(strict_types=1);

namespace App\Controller;

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

    public function endGame(Request $request): Response
    {
        $this->session->removeSession(self::SESSION_KEY_GAME);
        $keyRoom = $request->get('keyRoom');
        try {
            $this->lobbyService->setLobbyStatus($keyRoom);
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
}