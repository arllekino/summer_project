<?php
declare(strict_types=1);

namespace App\Controller;

use App\Controller\Input\IslandInput;
use App\Service\IslandService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

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
        
        $input = new IslandInput(
            $request->getContent(),
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
        return new JsonResponse(['status' => 'success']);
    }
}