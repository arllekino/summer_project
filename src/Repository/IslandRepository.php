<?php
declare(strict_types=1);

namespace App\Repository;

use App\Entity\Island;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;

class IslandRepository
{
    private EntityRepository $repository;

    public function __construct(private EntityManagerInterface $entityManager)
    {
        $this->repository = $entityManager->getRepository(Island::class);
    }

    public function findById(int $id): ?Island
    {
        return $this->entityManager->find(Island::class, $id);  
    }

    public function findByUserId(int $userId): ?Island
    {
        return $this->repository->findOneBy(['user_id' => $userId]);
    }

    public function findByKeyRoom(string $keyRoom): array
    {
        return $this->repository->findBy(['keyRoom' => $keyRoom]);    
    }

    public function store(Island $island): void
    {
        $this->entityManager->persist($island);
        $this->entityManager->flush();
    }

    public function deleteIsland(Island $island): void
    {
        $this->entityManager->remove($island);
        $this->entityManager->flush();
    }
}