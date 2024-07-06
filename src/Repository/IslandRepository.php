<?php
declare(strict_types=1);

namespace App\Repository;

use App\Entity\Island;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;

class IslandRepository
{
    private EntityManagerInterface $entityManager;
    private EntityRepository $repository;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
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

    public function listIsland(): array
    {
        return $this->repository->findAll();    
    }

    public function store(Island $island): void
    {
        $this->entityManager->persist($island);
        $this->entityManager->flush();
    }

    public function deleteAll(): void
    {
        $islands = $this->repository->findAll();
        foreach ($islands as $island)
        {
            $this->entityManager->remove($island);
        }
        $this->entityManager->flush();
    }
}