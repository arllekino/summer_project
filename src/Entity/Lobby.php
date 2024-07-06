<?php
declare(strict_types=1);

namespace App\Entity;

class Lobby
{
    private ?int $lobbyId;
    private ?string $keyRoom;
    private ?int $playerId1;
    private ?int $playerId2;
    private ?int $playerId3;
    private ?int $playerId4;

    public function __construct(
        ?int $lobbyId,
        ?string $keyRoom,
        ?int $playerId1,
        ?int $playerId2,
        ?int $playerId3,
        ?int $playerId4,
    )
    {
        $this->lobbyId = $lobbyId;
        $this->keyRoom = $keyRoom;
        $this->playerId1 = $playerId1;
        $this->playerId2 = $playerId2;
        $this->playerId3 = $playerId3;
        $this->playerId4 = $playerId4;
    }

    public function getId(): ?int
    {
        return $this->lobbyId;    
    }
    
    public function getKeyRoom(): ?string
    {
        return $this->keyRoom;    
    }

    public function getPlayerId1(): ?int
    {
        return $this->playerId1;    
    }
    public function getPlayerId2(): ?int
    {
        return $this->playerId2;    
    }
    public function getPlayerId3(): ?int
    {
        return $this->playerId3;    
    }
    public function getPlayerId4(): ?int
    {
        return $this->playerId4;    
    }
    
    
    public function setKeyRoom(string $keyRoom): void
    {
        $this->keyRoom = $keyRoom;    
    }
    
    public function setPlayerId1(?int $id): void
    {
        $this->playerId1 = $id;    
    }
    public function setPlayerId2(?int $id): void
    {
        $this->playerId2 = $id;    
    }
    public function setPlayerId3(?int $id): void
    {
        $this->playerId3 = $id;    
    }
    public function setPlayerId4(?int $id): void
    {
        $this->playerId4 = $id;    
    }
}