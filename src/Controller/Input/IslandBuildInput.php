<?php
declare(strict_types=1);

namespace App\Controller\Input;
use App\Service\Input\IslandBuildInputInterface;

class IslandBuildInput implements IslandBuildInputInterface
{
    private int $hp;
    private string $buildType;
    private array $buildMatrix;
    private int $buildPtr;
    private string $keyRoom;
    
    public function __construct(
        int $hp,
        string $buildType,
        array $buildMatrix,
        int $buildPtr,
        string $keyRoom
    )
    {
        $this->hp = $hp;
        $this->buildType = $buildType;
        $this->buildMatrix = $buildMatrix;
        $this->buildPtr = $buildPtr;
        $this->keyRoom = $keyRoom;
    }

    public function getHp(): int
    {
        return $this->hp;    
    }
    public function getStrBuildType(): string
    {
        return $this->buildType;    
    }
    public function getBuildMatrix(): array
    {
        return $this->buildMatrix;    
    }
    public function getBuildPtr(): int
    {
        return $this->buildPtr;
    }
    public function getKeyRoom(): string
    {
        return $this->keyRoom;    
    }
}