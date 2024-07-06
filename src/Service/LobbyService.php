<?php
declare(strict_types=1);

namespace App\Service;

use App\Entity\Lobby;
use App\Repository\LobbyRepository;

class LobbyService
{
    private const MAX_PLAYERS = 4;
    private LobbyRepository $repository;
    
    public function __construct(LobbyRepository $repository)
    {
        $this->repository = $repository;
    }

    public function create(int $userId): string
    {
        $lobby = new Lobby(
            null,
            null,
            $userId,
            null,
            null,
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
        $lobby = $this->repository->findLooby($keyRoom);
        if ($lobby === null)
        {
            throw new \UnexpectedValueException('Лобби не найдено');
        }
        for ($i = 1; $i <= self::MAX_PLAYERS; $i++)
        {
            $functionSetId = 'setPlayerId' . $i;
            $functionGetId = 'getPlayerId' . $i;
            $playerId = $lobby->$functionGetId(); 
            if ($playerId === $userId)
            {
                return;
            }
            if ($playerId === null)
            {
                $lobby->$functionSetId($userId);
                $this->repository->update($lobby);
                return;
            }
        }
        throw new \UnexpectedValueException('Лобби уже заполнено');      
    }

    public function showUsersInLobby(string $keyRoom): array
    {
        $lobby = $this->repository->findLooby($keyRoom);
        if ($lobby === null)
        {
            throw new \UnexpectedValueException('Лобби не найдено');
        }

        return [
            $lobby->getPlayerId1(),
            $lobby->getPlayerId2(),
            $lobby->getPlayerId3(),
            $lobby->getPlayerId4()
        ];
    }   
    
    public function deleteUserFromLobby(string $keyRoom, int $userId): void
    {
        $lobby = $this->repository->findLooby($keyRoom);
        if ($lobby === null)
        {
            throw new \UnexpectedValueException('Лобби не найдено');
        }
        
        for ($i = 1; $i <= self::MAX_PLAYERS; $i++)
        {
            $functionSetId = 'setPlayerId' . $i;
            $functionGetId = 'getPlayerId' . $i;
            if ($lobby->$functionGetId() == $userId)
            {
                $lobby->$functionSetId(null);
                if (!self::areAllNull($lobby))
                {
                    $this->repository->update($lobby);
                } 
                else 
                {
                    $this->repository->delete($lobby);
                }
                return;
            }
        }
        throw new \UnexpectedValueException('Пользователя уже нет в этом лобби');
    }

    private function createKeyRoom(int $id): string
    {
        return substr(md5( (string) $id), 0, 4);    
    }

    private function areAllNull(Lobby $lobby): bool
    {
        for ($i = 1; $i <= self::MAX_PLAYERS; $i++)
        {
            $functionGetId = 'getPlayerId' . $i;
            if ($lobby->$functionGetId() !== null)
            {
                return false;
            }
        }       
        return true;
    }
}