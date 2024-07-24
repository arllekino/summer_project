<?php
declare(strict_types=1);

namespace App\WebSocket;

use Ratchet\ConnectionInterface;
use Ratchet\MessageComponentInterface;

class WebSocketHandler implements MessageComponentInterface
{
    private const LAST_PLAYER_IN_ROOM = 1;
    private const ON_DELETE_TIME = 10;
    protected $clients;
    private array $lobbies;
    private array $games;
    private $onDeletePlayers;
    
    public function __construct()
    {
        $this->clients = new \SplObjectStorage;
        $this->lobbies = [];   
        $this->games = []; 
        $this->onDeletePlayers = [];
    }

    public function onOpen(ConnectionInterface $connection)
    {
        $this->clients->attach($connection);

        foreach ($this->onDeletePlayers as $key => $onDeletePlayer)
        {
            if ($onDeletePlayer['client'] === $connection)
            {
                unset($this->onDeletePlayers[$key]);
            }
        }
    }

    public function onMessage(ConnectionInterface $from, $msg)
    {
        $data = json_decode($msg, true);
        var_dump($data);
        if ($data['type'] === 'heartbeat')
        {
            $currentTime = time();
            foreach ($this->onDeletePlayers as $key => $onDeletePlayer)
            {
                if ($currentTime - $onDeletePlayer['time'] >= self::ON_DELETE_TIME)
                {
                    $lobby = $this->lobbies[$data['key_room']];
                    $game = $this->games[$data['key_room']];
                    $room = $lobby ?? $game;
                    if ( $room !== null)
                    {
                        $userId = array_search($onDeletePlayer['client'], $room);
                        if ($userId)
                        {
                            $this->deletePlayerFromRoom($room, $userId);
                        }
                    }
                    unset($this->onDeletePlayers[$key]);
                }
            }
        }
        
        if ($data['type'] !== 'heartbeat')
        {
            var_dump($data);
            foreach ($this->clients as $client)
            {
                if ($from !== $client)
                {
                    if (isset($this->lobbies[$data['key_room']]) && in_array($client, $this->lobbies[$data['key_room']]))
                    {
                        $client->send($msg);
                    }
                    if ($this->games[$data['key_room']] !== null && in_array($client, $this->games[$data['key_room']]))
                    {
                        $client->send($msg);
                    }
                } 
                else 
                {         
                    if ($data['type'] === 'new_player')
                    {
                        if ($data['from'] === 'lobby')
                        {
                            $this->lobbies[$data['key_room']][$data['user_id']] = $client;
                        }
                        if ($data['from'] === 'game')
                        {
                            $this->games[$data['key_room']][$data['user_id']] = $client;
                        }
                    }
                }
            }    
        }
    }

    public function onClose(ConnectionInterface $connection)
    {
        foreach ($this->lobbies as $lobby)
        {
            if (in_array($connection, $lobby))
            {
                if (count($lobby) === self::LAST_PLAYER_IN_ROOM)
                {
                    $id = array_search($connection, $lobby);
                    $this->deletePlayerFromRoom($lobby, $id);
                } 
                else 
                {
                    $this->onDeletePlayers[] = [
                        'client' => $connection, 
                        'time' => time()
                    ]; 
                }
            }
        }
        foreach ($this->games as $game)
        {
            if (in_array($connection, $game))
            {
                if (count($game) === self::LAST_PLAYER_IN_ROOM)
                {
                    $id = array_search($connection, $game);
                    $this->deletePlayerFromRoom($game, $id);
                } 
                else 
                {
                    $this->onDeletePlayers[] = [
                        'client' => $connection, 
                        'time' => time()
                    ]; 
                }
            }
        }
        $this->clients->detach($connection);
    }

    public function onError(ConnectionInterface $connection, \Exception $e)
    {
        echo $e->getMessage();
        $connection->close();
    }
    private function deletePlayerFromRoom(array &$room, int $id)
    {
        unset($room[$id]);
   // удаление из бд     
        
        foreach ($room as $client)         
        {
            $client->send(json_encode([
                'type' => 'player_disconnected',
                'user_id' => $id
            ]));   
        }
    }
}