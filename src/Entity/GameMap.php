<?php
declare(strict_types=1);

namespace App\Entity;

class GameMap
{
    public function __construct(
        private ?int $id,
        private string $keyRoom,
        private string $matrixGameMap,
        private int $gameStatus
    )
    {}

    public function getId(): ?int
    {
        return $this->id;    
    }
    
    public function getKeyRoom(): string
    {
        return $this->keyRoom;    
    }
    
    public function getMatrixGameMap(): string
    {
        return $this->matrixGameMap;    
    }

    public function getGameStatus(): int
    {
        return $this->gameStatus;
    }


    public function setGameStatus(int $gameStatus): void
    {
        $this->gameStatus = $gameStatus;
    }

    public function setMatrixGameMap(string $matrixGameMap): void
    {
        $this->matrixGameMap = $matrixGameMap;
    }
}