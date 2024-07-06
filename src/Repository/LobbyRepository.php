<?php
declare(strict_types=1);

namespace App\Repository;

use App\Entity\Lobby;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;

class LobbyRepository
{
    private EntityManagerInterface $entityManager;
    private EntityRepository $repository;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
        $this->repository = $entityManager->getRepository(Lobby::class);
    }

    public function store(Lobby $lobby): int
    {
        $this->entityManager->persist($lobby);
        $this->entityManager->flush();
        return $lobby->getId();       
    }

    public function update(Lobby $lobby): void
    {
        $this->entityManager->persist($lobby);
        $this->entityManager->flush();    
    }

    public function findLooby(string $keyRoom): ?Lobby
    {
        return $this->repository->findOneBy(['keyRoom' => $keyRoom]);    
    }

    public function delete(Lobby $lobby): void
    {
        $this->entityManager->remove($lobby);    
    }
}