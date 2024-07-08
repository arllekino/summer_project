<?php
declare(strict_types=1);

namespace App\Entity;

class LobbyPlace
{
    private ?int $id;
    private int $lobbyId;
    private int $playerId;
    private ?string $keyRoom;

    public function __construct(
        ?int $id,
        int $lobbyId,
        int $playerId,
        ?string $keyRoom
    )
    {
        $this->id = $id;
        $this->lobbyId = $lobbyId;
        $this->playerId = $playerId;
        $this->keyRoom = $keyRoom;
    }

    public function getId(): ?int
    {
        return $this->id;    
    }
    public function getLobbyId(): int
    {
        return $this->lobbyId;    
    }
    public function getKeyRoom(): ?string
    {
        return $this->keyRoom;    
    }

    public function getPlayerId(): int
    {
        return $this->playerId;
    }
    
    
    public function setLobbyId(int $lobbyId): void
    {
        $this->lobbyId = $lobbyId;    
    }
    public function setKeyRoom(string $keyRoom): void
    {
        $this->keyRoom = $keyRoom;    
    }
    
    public function setPlayerId(int $playerId): void
    {
        $this->playerId = $playerId;    
    }
}