<?php
declare(strict_types=1);

namespace App\Service;

use App\Entity\GameMap;
use App\Repository\GameMapRepository;

class GameMapService
{
    public function __construct(private GameMapRepository $repository)
    {}

    public function createGameMap(string $keyRoom, string $matrixGameMap, int $gameStatus): void
    {
        $gameMap = new GameMap(
            null,
            $keyRoom,
            $matrixGameMap,
            $gameStatus
        );
        $this->repository->store($gameMap);
    }
    
    public function viewGameMap(string $keyRoom): string
    {
        $gameMap = $this->repository->findByKeyRoom($keyRoom);
        if ($gameMap === null)
        {
            throw new \UnexpectedValueException('Карта всей игры не найдена');
        }

        return $gameMap->getMatrixGameMap();
    }

    public function getGameStatus(string $keyRoom): int
    {
        $gameMap = $this->repository->findByKeyRoom($keyRoom);
        if ($gameMap === null)
        {
            throw new \UnexpectedValueException('Карта всей игры не найдена');
        }

        return $gameMap->getGameStatus();
    }

    public function setGameStatus(string $keyRoom, int $gameStatus): void
    {
        $gameMap = $this->repository->findByKeyRoom($keyRoom);
        if ($gameMap === null)
        {
            throw new \UnexpectedValueException('Карта всей игры не найдена');
        }

        $gameMap->setGameStatus($gameStatus);
        $this->repository->store($gameMap);
    }

    public function updateGameMap(string $keyRoom, string $newMatrixGameMap): void
    {
        $gameMap = $this->repository->findByKeyRoom($keyRoom);
        if ($gameMap === null)
        {
            throw new \UnexpectedValueException('Карта всей игры не найдена');
        }    

        $gameMap->setMatrixGameMap($newMatrixGameMap);
        $this->repository->store($gameMap);
    }

    public function deleteGameMap(string $keyRoom): void
    {
        $gameMap = $this->repository->findByKeyRoom($keyRoom);
        if ($gameMap === null)
        {
            throw new \UnexpectedValueException('Карты всей игры и так нет');
        }
        $this->repository->delete($gameMap);    
    }
}