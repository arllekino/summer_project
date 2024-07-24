<?php
declare(strict_types=1);

namespace App\Controller\Input;
use App\Service\Input\IslandBuildInputInterface;

class IslandBuildInput implements IslandBuildInputInterface
{
    public function __construct(
        private int $hp,
        private string $buildType,
        private array $buildMatrix,
        private int $buildPtr,
        private array $cellStatus
    )
    {}

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
    public function getCellStatus(): array
    {
        return $this->cellStatus;    
    }
}