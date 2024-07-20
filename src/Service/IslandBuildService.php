<?php
declare(strict_types=1);

namespace App\Service;

use App\Entity\IslandBuild;
use App\Entity\Types\BuildType;
use App\Repository\IslandBuildRepository;
use App\Service\Input\IslandBuildInputInterface;

class IslandBuildService
{
    private IslandBuildRepository $repository;
    public function __construct(IslandBuildRepository $repository)
    {
        $this->repository = $repository;
    }

    public function createIslandBuild(IslandBuildInputInterface $input): int
    {
        $buildType = $this->getBuildType($input->getStrBuildType()); 
        if ($buildType === null)
        {
            throw new \UnexpectedValueException('Некорректный тип здания');
        }
        $islandBuild = new IslandBuild(
            null,
            $input->getHp(),
            $buildType,
            json_encode($input->getBuildMatrix()),
            false,
            false,
            $input->getKeyRoom()
        );

        return $this->repository->store($islandBuild);
    }

    public function viewAllBuilds(string $keyRoom): array
    {
        //id hp buildtype matrix illness destroyed
        $islandBuilds = $this->repository->findBuildsByKeyRoom($keyRoom);
        if (empty($islandBuilds))
        {
            throw new \UnexpectedValueException('Здания не найдены');
        }

        $arrayIslandBuilds = [];
        foreach ($islandBuilds as $islandBuild)
        {
            $arrayIslandBuild = [
                'build_id' => $islandBuild->getId(),
                'hp' => $islandBuild->getHp(),
                'build_type' => $islandBuild->getBuildType(),
                'build_matrix' => $islandBuild->getBuildMatrix(),
                'illness' => $islandBuild->getIllness(),
                'destroyed' => $islandBuild->getDestroyed()
            ];
            
            $arrayIslandBuilds[] = $arrayIslandBuild;
        }
        return $arrayIslandBuilds;
    }

    public function setNewHpToBuild(int $buildId, int $newHp): void
    {
        $islandBuild = $this->repository->findByBuildId($buildId);
        if ($islandBuild === null)
        {
            throw new \UnexpectedValueException('Здание не найдено');
        }

        $islandBuild->setHp($newHp);
        $this->repository->update($islandBuild);
    }

    public function setIllnessToBuild(int $buildId): void
    {
        $islandBuild = $this->repository->findByBuildId($buildId);
        if ($islandBuild === null)
        {
            throw new \UnexpectedValueException('Здание не найдено');
        }

        $islandBuild->setIllness(true);
        $this->repository->update($islandBuild);
    }

    public function unsetIllnessToBuild(int $buildId): void
    {
        $islandBuild = $this->repository->findByBuildId($buildId);
        if ($islandBuild === null)
        {
            throw new \UnexpectedValueException('Здание не найдено');
        }

        $islandBuild->setIllness(false);
        $this->repository->update($islandBuild);
    }

    public function destroyBuild(int $buildId): void
    {
        $islandBuild = $this->repository->findByBuildId($buildId);
        if ($islandBuild === null)
        {
            throw new \UnexpectedValueException('Здание не найдено');
        }

        $islandBuild->setDestroyed(true);
        $this->repository->update($islandBuild);
    }

    public function deleteBuild(int $buildId): void
    {
        $islandBuild = $this->repository->findByBuildId($buildId);
        if ($islandBuild === null)
        {
            throw new \UnexpectedValueException('Здание не найдено');
        }

        $this->repository->delete($islandBuild);
    }

    private function getBuildType(string $strBuildType): ?BuildType
    {
        switch ($strBuildType)
        {
            case 'castle':
                $buildType = BuildType::Castle;
                break;
            case 'farm':
                $buildType = BuildType::Farm;
                break;
            case 'barrack':
                $buildType = BuildType::Barrack;
                break;
            case 'defence':
                $buildType = BuildType::Defence;
                break;
            case 'wall':
                $buildType = BuildType::Wall;
                break;
            case 'house_peasant':
                $buildType = BuildType::HousePeasant;
                break;
            case 'house_nobles':
                $buildType = BuildType::HouseNobles;
                break;
            case 'warehouse':
                $buildType = BuildType::Warehouse;
                break;    
            default:
                $buildType = null;
                break;
        }    
        return $buildType;
    }
}