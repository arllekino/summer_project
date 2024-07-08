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
    private const BEGINNIG = 0;
    private IslandService $islandService;
    private SessionController $session;

    public function __construct(
        IslandService $islandService,
        SessionController $session
    )
    {
        $this->islandService = $islandService;
        $this->session = $session;
    }

    public function createIsland(Request $request): JsonResponse
    {        
        $dataAsArray = json_decode($request->getContent());
        if ($dataAsArray === null)
        {
            return new JsonResponse([
                'status' => 'Invalid JSON',
                Response::HTTP_BAD_REQUEST
            ]);
        }

        $input = new IslandInput(
            $dataAsArray['island_matrix'],
            self::BEGINNIG,
            self::BEGINNIG,
            self::BEGINNIG,
            self::BEGINNIG,
            self::BEGINNIG,
            self::BEGINNIG,
            self::BEGINNIG,
            self::BEGINNIG,
            self::BEGINNIG,
            self::BEGINNIG,
            self::BEGINNIG,
            self::BEGINNIG,
            $this->session->getSession('userId')      
        );


        return new JsonResponse([
            'status' => 'success', 
            'received' => $dataAsArray
        ]);
    }

    public function updateIsland(Request $request): JsonResponse
    {
        $dataAsArray = json_decode($request->getContent());
        if ($dataAsArray === null)
        {
            return new JsonResponse([
                'status' => 'Invalid JSON',
                Response::HTTP_BAD_REQUEST
            ]);
        }
        
        $input = new IslandInput(
            $dataAsArray['island_matrix'],
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
            $dataAsArray['knowledge'],
            $this->session->getSession('userId')
        );

        try {
            $this->islandService->update($input);
        } catch (\UnexpectedValueException $e) {
            return new JsonResponse([
                'status' => $e->getMessage(),
                Response::HTTP_UNAUTHORIZED
            ]);
        }
        
        return new JsonResponse([
            'status' => 'success',
            'received' => $dataAsArray
        ]);
    }
    
    public function viewAllIsland(Request $request): JsonResponse
    {
        $islands = $this->islandService->findAll();

        return new JsonResponse([
            'status' => 'success',
            'dispatched' => $islands
        ]);
    }

    public function deleteAllIsland(): JsonResponse
    {
        $this->islandService->deleteAll();
        return new JsonResponse([
            'status' => 'success'
        ]);
    }
}