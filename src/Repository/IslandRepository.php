<?php
declare(strict_types=1);

namespace App\Repository;

use App\Entity\Island;
use Doctrine\ORM\EntityManagerInterface;

class IslandRepository
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function findById(int $id): ?Island
    {
        return $this->entityManager->find(Island::class, $id);  
    }

    public function store(Island $island): void
    {
        $this->entityManager->persist($island);
        $this->entityManager->flush();
    }

    public function delete(Island $island): void
    {
        $this->entityManager->remove($island);
        $this->entityManager->flush();    
    }
}