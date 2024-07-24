<?php
declare(strict_types=1);

namespace App\Repository;

use App\Entity\IslandBuild;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;

class IslandBuildRepository
{
    private EntityRepository $repository;
    
    public function __construct(private EntityManagerInterface $entityManager)
    {
        $this->repository = $entityManager->getRepository(IslandBuild::class);
    }
    
    public function store(IslandBuild $islandBuild): int
    {
        $this->entityManager->persist($islandBuild);
        $this->entityManager->flush();    
        return $islandBuild->getId();
    }
    
    public function update(IslandBuild $islandBuild): void
    {
        $this->entityManager->persist($islandBuild);
        $this->entityManager->flush();
    }

    public function findByBuildId(int $buildId): ?IslandBuild
    {
        return $this->repository->findOneBy(['id' => $buildId]);    
    }

    public function findBuildsByKeyRoom(string $keyRoom): ?array
    {
        return $this->repository->findBy(['keyRoom' => $keyRoom]);
    }
    
    public function delete(IslandBuild $islandBuild): void
    {
        $this->entityManager->remove($islandBuild);
        $this->entityManager->flush();
    }
}