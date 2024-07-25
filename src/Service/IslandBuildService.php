<?php
declare(strict_types=1);

namespace App\Service;

use App\Entity\IslandBuild;
use App\Repository\IslandBuildRepository;
use App\Service\Input\IslandBuildInputInterface;

class IslandBuildService
{
    private IslandBuildRepository $repository;
    public function __construct(IslandBuildRepository $repository)
    {
        $this->repository = $repository;
    }

    public function createIslandBuild(IslandBuildInputInterface $input, int $userId, string $keyRoom): int
    {
        $islandBuild = new IslandBuild(
            null,
            $input->getHp(),
            $input->getStrBuildType(),
            $input->getBuildPtr(),
            json_encode($input->getCellStatus()),
            false,
            false,
            $userId,
            $keyRoom
        );

        return $this->repository->store($islandBuild);
    }

    public function viewAllBuilds(string $keyRoom): ?array
    {
        $islandBuilds = $this->repository->findBuildsByKeyRoom($keyRoom);
        if (empty($islandBuilds))
        {
            return null;
        }

        $arrayIslandBuilds = [];
        foreach ($islandBuilds as $islandBuild)
        {
            $arrayIslandBuild = [
                'build_id' => $islandBuild->getId(),
                'hp' => $islandBuild->getHp(),
                'build_type' => $islandBuild->getBuildType(),
                'build_ptr' => $islandBuild->getBuildPtr(),
                'illness' => $islandBuild->getIllness(),
                'user_id' => $islandBuild->getUserId(),
                'cell_status' => $islandBuild->getCellStatusJSON(),
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

    public function deleteBuildsInGame(string $keyRoom): void
    {
        $islandBuilds = $this->repository->findBuildsByKeyRoom($keyRoom);
        if (empty($islandBuilds))
        {
            throw new \UnexpectedValueException('Здания не найдены');
        }

        foreach ($islandBuilds as $islandBuild)
        {
            $this->repository->delete($islandBuild);
        }
    }
}