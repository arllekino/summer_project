<?php
declare(strict_types=1);

namespace App\Controller\Input;
use App\Service\Input\IslandInputInterface;

class IslandInput implements IslandInputInterface
{
    private int $food;
    private int $maxFood;

    private int $wood;
    private int $maxWood;
    
    private int $stones;
    private int $maxStones;

    private int $warriors;
    private int $maxWarriors;

    private int $villagers;
    private int $hammers;
    private int $money;
    private int $knowledge;

    public function __construct(
        int $food,
        int $maxFood,
        int $wood,
        int $maxWood,
        int $stones,
        int $maxStones,
        int $warriors,
        int $maxWarriors,
        int $villagers,
        int $hammers,
        int $money,
        int $knowledge
    )
    {
        $this->food = $food;
        $this->maxFood = $maxFood;
        $this->wood = $wood;
        $this->maxWood = $maxWood;
        $this->stones = $stones;
        $this->maxStones = $maxStones;
        $this->warriors = $warriors;
        $this->maxWarriors = $maxWarriors;
        $this->villagers = $villagers;
        $this->hammers = $hammers;
        $this->money = $money;
        $this->knowledge = $knowledge;
    }

    public function getFood(): int
    {
        return $this->food;
    }
    public function getMaxFood(): int
    {
        return $this->maxFood;
    }
    public function getWood(): int
    {
        return $this->wood;
    }
    public function getMaxWood(): int
    {
        return $this->maxWood;
    }
    public function getStones(): int
    {
        return $this->stones;
    }
    public function getMaxStones(): int
    {
        return $this->maxStones;
    }
    public function getWarriors(): int
    {
        return $this->warriors;
    }
    public function getMaxWarriors(): int
    {
        return $this->maxWarriors;
    }
    public function getVillagers(): int
    {
        return $this->villagers;
    }
    public function getHammers(): int
    {
        return $this->hammers;
    }
    public function getMoney(): int
    {
        return $this->money;
    }
    public function getKnowledge(): int
    {
        return $this->knowledge;
    }
}