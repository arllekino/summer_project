<?php
declare(strict_types=1);

namespace App\Controller\Input;
use App\Service\Input\IslandInputInterface;

class IslandInput implements IslandInputInterface
{
    public function __construct(
        private int $foodCount,
        private int $maxFoodCount,
        private int $woodCount,
        private int $maxWoodCount,
        private int $stonesCount,
        private int $maxStonesCount,
        private int $warriorsCount,
        private int $maxWarriorsCount,
        private int $villagersCount,
        private int $hammersCount,
        private int $moneyCount,
        private int $knowledgeCount
    )
    {}

    public function getFood(): int
    {
        return $this->foodCount;
    }
    public function getMaxFood(): int
    {
        return $this->maxFoodCount;
    }
    public function getWood(): int
    {
        return $this->woodCount;
    }
    public function getMaxWood(): int
    {
        return $this->maxWoodCount;
    }
    public function getStones(): int
    {
        return $this->stonesCount;
    }
    public function getMaxStones(): int
    {
        return $this->maxStonesCount;
    }
    public function getWarriors(): int
    {
        return $this->warriorsCount;
    }
    public function getMaxWarriors(): int
    {
        return $this->maxWarriorsCount;
    }
    public function getVillagers(): int
    {
        return $this->villagersCount;
    }
    public function getHammers(): int
    {
        return $this->hammersCount;
    }
    public function getMoney(): int
    {
        return $this->moneyCount;
    }
    public function getKnowledge(): int
    {
        return $this->knowledgeCount;
    }
}