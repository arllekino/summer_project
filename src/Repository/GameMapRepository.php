<?php
declare(strict_types=1);

namespace App\Repository;

use App\Entity\GameMap;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;

class GameMapRepository
{
    private EntityRepository $repository;

    public function __construct(
        private EntityManagerInterface $entityManager
    )
    {
        $this->repository = $entityManager->getRepository(GameMap::class);
    }

    public function store(GameMap $gameMap): void
    {
        $this->entityManager->persist($gameMap);
        $this->entityManager->flush(); 
    }

    public function findByKeyRoom(string $keyRoom): ?GameMap
    {
        return $this->repository->findOneBy(['keyRoom' => $keyRoom]);    
    }

    public function delete(GameMap $gameMap): void
    {
        $this->entityManager->remove($gameMap);
        $this->entityManager->flush();    
    }
}