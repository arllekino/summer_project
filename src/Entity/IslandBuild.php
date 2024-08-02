<?php
declare(strict_types=1);

namespace App\Entity;

class IslandBuild
{
    public function __construct(
        private ?int $id,
        private int $hp,
        private string $buildType,
        private int $buildPtr,
        private string $cellStatusJSON,
        private bool $illness,
        private bool $destroyed,
        private int $userId,
        private string $keyRoom
    )
    {}

    public function getId(): ?int
    {
        return $this->id;    
    }
    public function getHp(): int
    {
        return $this->hp;    
    }
    public function getBuildType(): string
    {
        return $this->buildType;    
    }
    public function getBuildPtr(): int
    {
        return $this->buildPtr;
    }
    public function getCellStatusJSON(): string
    {
        return $this->cellStatusJSON;    
    }
    public function getIllness(): bool
    {
        return $this->illness;    
    }
    public function getDestroyed(): bool
    {
        return $this->destroyed;    
    }
    public function getKeyRoom(): string
    {
        return $this->keyRoom;
    }
    public function getUserId(): int
    {
        return $this->userId;
    }

    public function setHp(int $hp): void
    {
        $this->hp = $hp;    
    }
    public function setIllness(bool $illness): void
    {
        $this->illness = $illness;    
    }
    public function setDestroyed(bool $destroyed): void
    {
        $this->destroyed = $destroyed;    
    }
}