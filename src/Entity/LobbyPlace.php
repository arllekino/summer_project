<?php
declare(strict_types=1);

namespace App\Entity;

class LobbyPlace
{
    private ?int $id;
    private int $lobbyId;
    private int $playerId;
    private string $colorFlag;
    private ?string $keyRoom;
    private string $status;
    private string $lobbyStatus;
    private string $readiness;

    public function __construct(
        ?int $id,
        int $lobbyId,
        int $playerId,
        string $colorFlag,
        ?string $keyRoom,
        string $status,
        string $lobbyStatus,
        string $readiness
    )
    {
        $this->id = $id;
        $this->lobbyId = $lobbyId;
        $this->playerId = $playerId;
        $this->colorFlag = $colorFlag;
        $this->keyRoom = $keyRoom;
        $this->status = $status;
        $this->lobbyStatus = $lobbyStatus;
        $this->readiness = $readiness;
    }

    public function getId(): ?int
    {
        return $this->id;    
    }
    public function getLobbyId(): int
    {
        return $this->lobbyId;    
    }
    public function getColorFlag(): string
    {
        return $this->colorFlag;    
    }
    public function getKeyRoom(): ?string
    {
        return $this->keyRoom;    
    }
    public function getPlayerId(): int
    {
        return $this->playerId;
    }
    public function getStatus(): string
    {
        return $this->status;   
    }
    public function getLobbyStatus(): string
    {
        return $this->lobbyStatus;    
    }
    public function getReadiness(): string
    {
        return $this->readiness;    
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
    public function setStatus(string $status): void
    {
        $this->status = $status;    
    }
    public function setLobbyStatus(string $lobbyStatus): void
    {
        $this->lobbyStatus = $lobbyStatus;    
    }
    public function setReadiness(string $readiness): void
    {
        $this->readiness = $readiness;    
    }
}