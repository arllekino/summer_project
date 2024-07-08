<?php
declare(strict_types=1);

namespace App\Service;

use App\Entity\LobbyPlace;
use App\Repository\LobbyPlaceRepository;

class LobbyPlaceService
{
    private const MAX_PLAYERS = 4;
    private LobbyPlaceRepository $repository;
    private UserService $userService;
    
    public function __construct(LobbyPlaceRepository $repository, UserService $userService)
    {
        $this->repository = $repository;
        $this->userService = $userService;
    }

    public function create(int $userId): string
    {
        $extantLobby = $this->repository->findByPlayerId($userId);
        if ($extantLobby)
        {
            throw new \UnexpectedValueException('Вы уже создали лобби. Его ключ - ' . $extantLobby->getKeyRoom());
        }
        
        $lobby = new LobbyPlace(
            null,
            $this->repository->findLastInsertLobby() + 1,
            $userId,
            null  
        );
        $lobbyId = $this->repository->store($lobby);
        $keyRoom =  self::createKeyRoom($lobbyId);
        $lobby->setKeyRoom($keyRoom);
        $this->repository->update($lobby);
        return $keyRoom;
    }

    public function addUserToLobby(string $keyRoom, int $userId): void
    {
        $lobbyPlaces = $this->repository->findByKeyRoom($keyRoom);
        if ($lobbyPlaces === null)
        {
            throw new \UnexpectedValueException('Лобби не найдено');
        }

        if (count($lobbyPlaces) === self::MAX_PLAYERS)
        {
            throw new \UnexpectedValueException('Лобби уже заполнено');      
        }
        $lobbyPlace = new LobbyPlace(
            null,
            $lobbyPlaces[0]->getLobbyId(),
            $userId,
            $keyRoom
        );

    }

    public function showUsersInLobby(string $keyRoom): array
    {
        $lobbyPlaces = $this->repository->findByKeyRoom($keyRoom);
        if ($lobbyPlaces === null)
        {
            throw new \UnexpectedValueException('Лобби не найдено');
        }

        foreach ($lobbyPlaces as $lobbyPlace)
        {
            $playerId = $lobbyPlace->getPlayerId();
            $playerNames[]= $this->userService->findUserName($playerId);
        }

        return $playerNames;
    }   
    
    public function deleteUserFromLobby(string $keyRoom, int $userId): void
    {
        $lobby = $this->repository->findByKeyRoom($keyRoom);
        if ($lobby === null)
        {
            throw new \UnexpectedValueException('Лобби не найдено');
        }

        $lobbyPlace = $this->repository->findByPlayerId($userId);
        if ($lobbyPlace === null)
        {
            throw new \UnexpectedValueException('Пользователя уже нет в этом лобби');
        }

        $this->repository->delete($lobbyPlace);
    }

    private function createKeyRoom(int $id): string
    {
        return substr(md5( (string) $id), 0, 4);    
    }
}