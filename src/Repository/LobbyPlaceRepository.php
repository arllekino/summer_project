<?php
declare(strict_types=1);

namespace App\Repository;

use App\Entity\LobbyPlace;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;

class LobbyPlaceRepository
{
    private EntityManagerInterface $entityManager;
    private EntityRepository $repository;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
        $this->repository = $entityManager->getRepository(LobbyPlace::class);
    }

    public function store(LobbyPlace $lobby): int
    {
        $this->entityManager->persist($lobby);
        $this->entityManager->flush();
        return $lobby->getLobbyId();       
    }

    public function update(LobbyPlace $lobby): void
    {
        $this->entityManager->persist($lobby);
        $this->entityManager->flush();    
    }

    public function findByKeyRoom(string $keyRoom): ?array
    {
        return $this->repository->findBy(['keyRoom' => $keyRoom]);    
    }

    public function findByPlayerId(int $userId): ?LobbyPlace
    {
        return $this->repository->findOneBy(['playerId' => $userId]);    
    }

    public function findLastInsertLobby(): int
    {
        $lobbies = $this->repository->findAll();
        $maxIndex = 0;
        foreach ($lobbies as $lobby)
        {
            if ($maxIndex < $lobby->getLobbyId())
            {
                $maxIndex = $lobby->getLobbyId();
            }
        }    
        return $maxIndex;
    }

    public function delete(LobbyPlace $lobbyPlace): void
    {
        $this->entityManager->remove($lobbyPlace);    
        $this->entityManager->flush();
    }
}