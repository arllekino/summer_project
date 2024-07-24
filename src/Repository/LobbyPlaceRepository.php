<?php
declare(strict_types=1);

namespace App\Repository;

use App\Entity\LobbyPlace;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;

class LobbyPlaceRepository
{
    private EntityRepository $repository;

    public function __construct(private EntityManagerInterface $entityManager)
    {
        $this->repository = $entityManager->getRepository(LobbyPlace::class);
    }

    public function store(LobbyPlace $lobbyPlace): int
    {
        $this->entityManager->persist($lobbyPlace);
        $this->entityManager->flush();
        return $lobbyPlace->getLobbyId();       
    }

    public function update(LobbyPlace $lobbyPlace): void
    {
        $this->entityManager->persist($lobbyPlace);
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
        $lobbyPlaces = $this->repository->findAll();
        $maxIndex = 0;
        foreach ($lobbyPlaces as $lobbyPlace)
        {
            if ($maxIndex < $lobbyPlace->getLobbyId())
            {
                $maxIndex = $lobbyPlace->getLobbyId();
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