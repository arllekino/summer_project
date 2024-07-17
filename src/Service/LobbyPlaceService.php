<?php
declare(strict_types=1);

namespace App\Service;

use App\Entity\LobbyPlace;
use App\Repository\LobbyPlaceRepository;

class LobbyPlaceService
{
    private const MAX_PLAYERS = 4;
    private const PLAYER_HOST = 'host';
    private const PLAYER_GUEST = 'guest';
    private const LOBBY = 'lobby';
    private const GAME = 'game';
    private const READY = 'ready';
    private const NOT_READY = 'not ready';
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
            null,
            self::PLAYER_HOST,
            self::LOBBY,
            self::NOT_READY
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
        if (empty($lobbyPlaces))
        {
            throw new \UnexpectedValueException('Лобби не найдено');
        }
        if (count($lobbyPlaces) === self::MAX_PLAYERS)
        {
            throw new \UnexpectedValueException('Лобби уже заполнено');      
        }
        if (!self::LOBBY === $lobbyPlaces[0]->getLobbyStatus())
        {
            throw new \UnexpectedValueException('Игра уже запущена');
        }
        foreach ($lobbyPlaces as $lobbyPlace)
        {
            if ($userId === $lobbyPlace->getPlayerId())
            {
                return;
            }
        }

        $lobbyPlace = new LobbyPlace(
            null,
            $lobbyPlaces[0]->getLobbyId(),
            $userId,
            $keyRoom,
            self::PLAYER_GUEST,
            self::LOBBY,
            self::NOT_READY
        );
        $this->repository->store($lobbyPlace);
    }

    public function setReadyStatus(int $userId): void
    {
        $lobbyPlace = $this->repository->findByPlayerId($userId);
        if ($lobbyPlace === null)
        {
            throw new \UnderflowException('Пользователь в лобби не найден');
        }

        $lobbyPlace->setReadiness(self::READY);
        $this->repository->update($lobbyPlace);
    }

    public function setNotReadyStatus(int $userId): void
    {
        $lobbyPlace = $this->repository->findByPlayerId($userId);
        if ($lobbyPlace === null)
        {
            throw new \UnderflowException('Пользователь в лобби не найден');
        }
        
        $lobbyPlace->setReadiness(self::NOT_READY);
        $this->repository->update($lobbyPlace);
    }

    public function makePlayersNotReady(string $keyRoom): void
    {
        $lobbyPlaces = $this->repository->findByKeyRoom($keyRoom);
        if (empty($lobbyPlaces))
        {
            throw new \UnexpectedValueException('Лобби не найдено');
        }
        foreach ($lobbyPlaces as $lobbyPlace)
        {
            $lobbyPlace->setReadiness(self::NOT_READY);
        }
    }

    public function MakeGuestHost(int $userId): void
    {
        $lobbyPlace = $this->repository->findByPlayerId($userId);
        if ($lobbyPlace === null)
        {
            throw new \UnderflowException('Пользователь в лобби не найден');
        }
        
        $lobbyPlace->setStatus(self::PLAYER_HOST);
    }

    public function showUsersInLobby(string $keyRoom): array
    {
        $lobbyPlaces = $this->repository->findByKeyRoom($keyRoom);
        if (empty($lobbyPlaces))
        {
            throw new \UnexpectedValueException('Лобби не найдено');
        }
        if (self::LOBBY !== $lobbyPlaces[0]->getLobbyStatus())
        {
            throw new \UnexpectedValueException('Игра уже запущена');
        }

        $players = [];
        foreach ($lobbyPlaces as $lobbyPlace)
        {
            $playerId = $lobbyPlace->getPlayerId();
            $playerName = $this->userService->findUserName($playerId);
            $playerId = $lobbyPlace->getPlayerId();
            $playerStatus = $lobbyPlace->getStatus();
            $playerReadiness = $lobbyPlace->getReadiness();
            $player = [
                'id' => $playerId,
                'name' => $playerName,
                'status' => $playerStatus,
                'readiness' => $playerReadiness

            ];
            $players[] = $player; 
        }

        return $players;
    }   

    public function findKeyRoomByPlayerId(int $id): string
    {
        $lobbyPlace = $this->repository->findByPlayerId($id);
        if ($lobbyPlace === null)
        {
            throw new \UnexpectedValueException('Лобби не найдено');
        }    

        return $lobbyPlace->getKeyRoom();
    }

    public function findCountPlayers(string $keyRoom): int
    {
        $players = $this->repository->findByKeyRoom($keyRoom);
        return count($players);
    }

    public function findPlayersId(string $keyRoom): array
    {
        $players = $this->repository->findByKeyRoom($keyRoom);
        $result = [];
        foreach ($players as $player)
        {
            array_push($result, $player->getPlayerId());
        }
        return $result;
    }

    public function getPlayerStatus(int $userId): string
    {
        $lobbyPlace = $this->repository->findByPlayerId($userId);
        if ($lobbyPlace === null)
        {
            throw new \UnexpectedValueException('Пользователя нет в лобби');
        }

        return $lobbyPlace->getStatus();
    }

    public function setGameStatus(string $keyRoom): void
    {
        $lobbyPlaces = $this->repository->findByKeyRoom($keyRoom);
        if (empty($lobbyPlaces))
        {
            throw new \UnexpectedValueException('Лобби не найдено');
        }    

        foreach ($lobbyPlaces as $lobbyPlace)
        {
            $lobbyPlace->setLobbyStatus(self::GAME);
            $this->repository->update($lobbyPlace);
        }
    }

    public function setLobbyStatus(string $keyRoom): void
    {
        $lobbyPlaces = $this->repository->findByKeyRoom($keyRoom);
        if (empty($lobbyPlaces))
        {
            throw new \UnexpectedValueException('Лобби не найдено');
        }    

        foreach ($lobbyPlaces as $lobbyPlace)
        {
            $lobbyPlace->setStatus(self::LOBBY);
            $this->repository->update($lobbyPlace);
        }
    }

    public function isAllPlayersReady(string $keyRoom): bool
    {
        $lobbyPlaces = $this->repository->findByKeyRoom($keyRoom);
        if (empty($lobbyPlaces))
        {
            throw new \UnexpectedValueException('Лобби не найдено');
        }  

        foreach ($lobbyPlaces as $lobbyPlace)
        {
            if ($lobbyPlace->getReadiness === self::NOT_READY)
            {
                return false;
            }
        }
        return true;
    }
    
    public function deleteUserFromLobby(int $userId): void
    {
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