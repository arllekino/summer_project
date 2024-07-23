<?php
declare(strict_types=1);

namespace App\Controller;

use App\Controller\Input\IslandBuildInput;
use App\Service\IslandBuildService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class IslandBuildController extends AbstractController
{
    private const SESSION_KEY_GAME = 'keyGame';
    private SessionController $session;
    private IslandBuildService $islandBuildService;

    public function __construct(
        SessionController $session,
        IslandBuildService $islandBuildService
    )
    {
        $this->session = $session;
        $this->islandBuildService = $islandBuildService;
    }

    public function createIslandBuild(Request $request): Response
    {
        $sessionKeyRoom = $this->session->getSession(self::SESSION_KEY_GAME);

        $data = json_decode($request->getContent(), true);

        $input = new IslandBuildInput(
            $data['hp'],
            $data['build_type'],
            $data['build_matrix'],
            $data['build_ptr'],
            $sessionKeyRoom
        );

        try {
            $buildId = $this->islandBuildService->createIslandBuild($input);
        } catch (\UnexpectedValueException $e) {
            return new Response($e->getMessage());
        }

        return new Response(json_encode([
            'build_id' => $buildId
        ]));
    }

    public function viewAllBuilds(): Response
    {
        $sessionKeyRoom = $this->session->getSession(self::SESSION_KEY_GAME);

        try {
            $builds = $this->islandBuildService->viewAllBuilds($sessionKeyRoom);
        } catch (\UnexpectedValueException $e) {
            return new Response($e->getMessage());
        }

        return new Response(json_encode($builds));
    }

    public function setNewHpToBuild(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);

        try {
            $this->islandBuildService->setNewHpToBuild($data['build_id'], $data['hp']);
        } catch (\UnexpectedValueException $e) {
            return new Response($e->getMessage());
        }

        return new Response('OK');
    }

    public function setIllnessToBuild(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);

        try {
            $this->islandBuildService->setIllnessToBuild($data['build_id']);
        } catch (\UnexpectedValueException $e) {
            return new Response($e->getMessage());
        }

        return new Response('OK');
    }

    public function unsetIllnessToBuild(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);    
        
        try {
            $this->islandBuildService->unsetIllnessToBuild($data['build_id']);
        } catch (\UnexpectedValueException $e) {
            return new Response($e->getMessage());
        }

        return new Response('OK');
    }

    public function destroyBuild(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);    

        try {
            $this->islandBuildService->destroyBuild($data['build_id']);
        } catch (\UnexpectedValueException $e) {
            return new Response($e->getMessage());
        }

        return new Response('OK');
    }

    public function deleteBuild(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);    

        try {
            $this->islandBuildService->deleteBuild($data['build_id']);
        } catch (\UnexpectedValueException $e) {
            return new Response($e->getMessage());
        }

        return new Response('OK');
    }
}