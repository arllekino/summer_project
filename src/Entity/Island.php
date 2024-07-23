<?php
declare(strict_types=1);

namespace App\Entity;


class Island
{
    private ?int $id;
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
    private string $keyRoom;
    
    private int $userId;
    private ?User $user = null;

    public function __construct(
        ?int $id,
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
        int $knowledge,
        int $userId,
        string $keyRoom
    )
    {
        $this->id = $id;      
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
        $this->userId = $userId;
        $this->keyRoom = $keyRoom;
    }

    public function getId(): ?int
    {
        return $this->id;
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


    public function setFood(int $food): void
    {
        $this->food = $food;
    }
    public function setMaxFood(int $maxFood): void
    {
        $this->maxFood = $maxFood;
    }
    public function setWood(int $wood): void
    {
        $this->wood =  $wood;
    }
    public function setMaxWood(int $maxWood): void
    {
        $this->maxWood = $maxWood;
    }
    public function setStones(int $stones): void
    {
        $this->stones = $stones;
    }
    public function setMaxStones(int $maxStones): void
    {
        $this->maxStones = $maxStones;
    }
    public function setWarriors(int $warriors): void
    {
        $this->warriors = $warriors;
    }
    public function setMaxWarriors(int $maxWarriors): void
    {
        $this->maxWarriors = $maxWarriors;
    }
    public function setVillagers(int $villagers): void
    {
        $this->villagers = $villagers;
    }
    public function setHammers(int $hammers): void
    {
        $this->hammers = $hammers;
    }
    public function setMoney(int $money): void
    {
        $this->money = $money;
    }
    public function setKnowledge(int $knowledge): void
    {
        $this->knowledge = $knowledge;
    }
    public function setUser(User $user): void
    {
        $this->user = $user;
    }
}