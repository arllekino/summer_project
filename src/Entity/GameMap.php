<?php
declare(strict_types=1);

namespace App\Entity;

class GameMap
{
    private ?int $id;
    private string $keyRoom;
    private string $matrixGameMap;

    public function __construct(
        ?int $id,
        string $keyRoom,
        string $matrixGameMap
    )
    {
        $this->id = $id;
        $this->keyRoom = $keyRoom;
        $this->matrixGameMap = $matrixGameMap;
    }

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

    public function setMatrixGameMap(string $matrixGameMap): void
    {
        $this->matrixGameMap = $matrixGameMap;
    }
}