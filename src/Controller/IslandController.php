<?php
declare(strict_types=1);

namespace App\Controller;

use App\Controller\Input\IslandInput;
use App\Service\IslandService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class IslandController extends AbstractController
{
    private const SESSION_USER_ID = 'userId';
    private const SESSION_KEY_GAME = 'keyGame';
    private const BEGINNING = 0;

    public function __construct(
        private IslandService $islandService,
        private SessionController $session
    )
    {}

    public function createIsland(Request $request): JsonResponse
    {        
        $sessionUserId = $this->session->getSession(self::SESSION_USER_ID);
        $sessionKeyGame = $this->session->getSession(self::SESSION_KEY_GAME);

        $input = new IslandInput(
            self::BEGINNING,
            self::BEGINNING,
            self::BEGINNING,
            self::BEGINNING,
            self::BEGINNING,
            self::BEGINNING,
            self::BEGINNING,
            self::BEGINNING,
            self::BEGINNING,
            self::BEGINNING,
            self::BEGINNING,
            self::BEGINNING
        );

        try {
            $this->islandService->create($input, $sessionUserId, $sessionKeyGame);
        } catch (\UnexpectedValueException $e) {
            return new JsonResponse($e->getMessage(), Response::HTTP_CONFLICT);
        }

        return new JsonResponse([
            'status' => 'success', 
        ]);
    }

    public function viewIsland(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $userId = $data['user_id'] ?? $this->session->getSession(self::SESSION_USER_ID);

        try {
            $islandAsArray = $this->islandService->findIsland($userId);
        } catch (\UnexpectedValueException $e) {
            return new JsonResponse($e->getMessage(), Response::HTTP_NOT_FOUND);
        }
        
        return new JsonResponse($islandAsArray);
    }

    public function updateIsland(Request $request): JsonResponse
    {
        $dataAsArray = json_decode($request->getContent(), true);
        if ($dataAsArray === null)
        {
            return new JsonResponse([
                'status' => 'Invalid JSON',
                Response::HTTP_BAD_REQUEST
            ]);
        }

        $sessionUserId = $this->session->getSession(self::SESSION_USER_ID);

        $input = new IslandInput(
            $dataAsArray['food'],
            $dataAsArray['max_food'],
            $dataAsArray['wood'],
            $dataAsArray['max_wood'],
            $dataAsArray['stones'],
            $dataAsArray['max_stones'],
            $dataAsArray['warriors'],
            $dataAsArray['max_warriors'],
            $dataAsArray['villagers'],
            $dataAsArray['hammers'],
            $dataAsArray['money'],
            $dataAsArray['knowledge']
        );

        try {
            $this->islandService->update($input, $sessionUserId);
        } catch (\UnexpectedValueException $e) {
            return new JsonResponse([
                'status' => $e->getMessage(),
                Response::HTTP_NOT_FOUND
            ]);
        }
        
        return new JsonResponse([
            'status' => 'success',
            'received' => $dataAsArray
        ]);
    }
    
    public function viewIslandsInGame(): JsonResponse
    {
        $sessionKeyGame = $this->session->getSession(self::SESSION_KEY_GAME);
        $islands = $this->islandService->findIslandsInGame($sessionKeyGame);

        return new JsonResponse([
            'status' => 'success',
            'dispatched' => $islands
        ]);
    }
}