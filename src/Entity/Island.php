<?php
declare(strict_types=1);

namespace App\Entity;


class Island
{
    private ?User $user = null;

    public function __construct(
        private ?int $id,
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
        private int $knowledgeCount,
        private int $userId,
        private string $keyRoom
    )
    {}

    public function getId(): ?int
    {
        return $this->id;
    }
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
    public function getUserId(): int
    {
        return $this->userId;    
    }
    public function getUser(): ?User
    {
        return $this->user;    
    }
    public function getKeyRoom(): string
    {
        return $this->keyRoom;    
    }


    public function setFood(int $foodCount): void
    {
        $this->foodCount = $foodCount;
    }
    public function setMaxFood(int $maxFoodCount): void
    {
        $this->maxFoodCount = $maxFoodCount;
    }
    public function setWood(int $woodCount): void
    {
        $this->woodCount = $woodCount;
    }
    public function setMaxWood(int $maxWoodCount): void
    {
        $this->maxWoodCount = $maxWoodCount;
    }
    public function setStones(int $stonesCount): void
    {
        $this->stonesCount = $stonesCount;
    }
    public function setMaxStones(int $maxStonesCount): void
    {
        $this->maxStonesCount = $maxStonesCount;
    }
    public function setWarriors(int $warriorsCount): void
    {
        $this->warriorsCount = $warriorsCount;
    }
    public function setMaxWarriors(int $maxWarriorsCount): void
    {
        $this->maxWarriorsCount = $maxWarriorsCount;
    }
    public function setVillagers(int $villagersCount): void
    {
        $this->villagersCount = $villagersCount;
    }
    public function setHammers(int $hammersCount): void
    {
        $this->hammersCount = $hammersCount;
    }
    public function setMoney(int $moneyCount): void
    {
        $this->moneyCount = $moneyCount;
    }
    public function setKnowledge(int $knowledgeCount): void
    {
        $this->knowledgeCount = $knowledgeCount;
    }
}