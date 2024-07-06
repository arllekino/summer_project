<?php
declare(strict_types=1);

namespace App\Entity;

use App\Entity\Types\ResourcesType;
use App\Entity\Types\CubeType;
use App\Entity\Types\BuildType;

class IslandBuild
{
    private ?int $id;
    private BuildType $buildType;
    private int $hp;
    private int $maxHp;
    private ?ResourcesType $resourcesType;
    private ?int $resourcesAmount;
    private ?CubeType $cubeType;
    private ?int $cubeAmount;
    private ?ResourcesType $passiveAbility;
    private ?int $amountOfPassiveAbility;


    public function __construct(
        ?int $id,
        BuildType $buildType,
        int $hp,
        int $maxHp,
        ?ResourcesType $resourcesType,
        ?int $resourcesAmount,
        ?CubeType $cubeType,
        ?int $cubeAmount,
        ?ResourcesType $passiveAbility,
        ?int $amountOfPassiveAbility
    )
    {
        $this->id = $id;
        $this->buildType = $buildType;
        $this->hp = $hp;
        $this->maxHp = $maxHp;
        $this->resourcesType = $resourcesType;
        $this->resourcesAmount = $resourcesAmount;
        $this->cubeType = $cubeType;
        $this->cubeAmount = $cubeAmount;
        $this->passiveAbility = $passiveAbility;
        $this->amountOfPassiveAbility = $amountOfPassiveAbility;
    }


    public function getId(): int
    {
        return $this->id;    
    }
    public function getBuildType(): BuildType
    {
        return $this->buildType;    
    }
    public function getHp(): int
    {
        return $this->hp;    
    }
    public function getMaxHp(): int
    {
        return $this->maxHp;    
    }
    public function getResourcesType(): ?ResourcesType
    {
        return $this->resourcesType;    
    }
    public function getResourcesAmount(): ?int
    {
        return $this->resourcesAmount;    
    }
    public function getCubeType(): ?CubeType
    {
        return $this->cubeType;    
    }
    public function getCubeAmount(): ?int
    {
        return $this->cubeAmount;    
    }
    public function getPassiveAbility(): ?ResourcesType
    {
        return $this->passiveAbility;    
    }
    public function getAmountOfPassiveAbility(): ?int
    {
        return $this->amountOfPassiveAbility;    
    }


    public function setHp(int $hp): void
    {
        $this->hp = $hp;
    }
    public function setResourcesAmount(int $resourcesAmount): void
    {
        $this->resourcesAmount = $resourcesAmount;
    }
    public function setCubeAmount(int $cubeAmount): void
    {
        $this->cubeAmount = $cubeAmount;
    }
}