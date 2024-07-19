<?php
declare(strict_types=1);

namespace App\Entity;

use App\Entity\Types\BuildType;

class IslandBuild
{
    private ?int $id;
    private int $hp;
    private BuildType $buildType;
    private string $buildMatrix;
    private bool $illness;
    private bool $destroyed;
    private string $keyRoom;

    public function __construct(
        ?int $id,
        int $hp,
        BuildType $buildType,
        string $buildMatrix,
        bool $illness,
        bool $destroyed,
        string $keyRoom
    )
    {
        $this->id = $id;
        $this->hp = $hp;
        $this->buildType = $buildType;
        $this->buildMatrix = $buildMatrix;
        $this->illness = $illness;
        $this->destroyed = $destroyed;
        $this->keyRoom = $keyRoom;
    }

    public function getId(): ?int
    {
        return $this->id;    
    }
    public function getHp(): int
    {
        return $this->hp;    
    }
    public function getBuildType(): BuildType
    {
        return $this->buildType;    
    }
    public function getBuildMatrix(): string
    {
        return $this->buildMatrix;    
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