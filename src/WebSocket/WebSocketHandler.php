<?php
declare(strict_types=1);

namespace App\WebSocket;

use Ratchet\ConnectionInterface;
use Ratchet\MessageComponentInterface;

class WebSocketHandler implements MessageComponentInterface
{
    private const LAST_PLAYER_IN_ROOM = 1;
    private const LOBBY_STATUS = 'lobby';
    private const GAME_STATUS = 'game';
    private const ON_DELETE_TIME = 10;
    protected $clients;
    private $rooms;
    private $onDeletePlayers;
    private $roomStatuses;
    
    public function __construct()
    {
        $this->clients = new \SplObjectStorage;
        $this->rooms = [];    
        $this->onDeletePlayers = [];
        $this->roomStatuses = [];
    }

    public function onOpen(ConnectionInterface $connection)
    {
        $this->clients->attach($connection);

        $i = 0;
        foreach ($this->onDeletePlayers as $onDeletePlayer)
        {
            if ($onDeletePlayer['client'] === $connection)
            {
                unset($this->onDeletePlayers[$i]);
            }
            $i++;
        }
    }

    public function onMessage(ConnectionInterface $from, $msg)
    {
        // echo "\n" . $msg . "\n\n";

        $data = json_decode($msg, true);

        if ($data['type'] === 'heartbeat')
        {
            if (!empty($this->onDeletePlayers))
            {
                $currentTime = time();
                foreach ($this->onDeletePlayers as $onDeletePlayer)
                {
                    if ($currentTime - $onDeletePlayer['time'] >= self::ON_DELETE_TIME)
                    {
                        $room = $this->rooms[$data['key_room']];
                        $userId = array_search($onDeletePlayer['client'], $room);
                        $this->deletePlayerFromRoom($room, $userId);
                    }
                }
            }
        }
        if ($data['type'] === 'start_game')
        {
            $this->roomStatuses[$data['key_room']] = self::GAME_STATUS;
        }
        if ($data['type'] === 'end_game')
        {
            $this->roomStatuses[$data['key_room']] = self::LOBBY_STATUS;
        }
        
        foreach ($this->clients as $client)
        {
            if ($from !== $client)
            {
                if (in_array($client, $this->rooms[$data['key_room']]))
                {
                    $client->send($msg);
                }
            } 
            else 
            {         
                if ($data['type'] === 'new_player')
                {
                    $this->rooms[$data['key_room']][$data['user_id']] = $client;
                }
            }
        }    
    }

    public function onClose(ConnectionInterface $connection)
    {
        foreach ($this->rooms as $room)
        {
            if (in_array($connection, $room))
            {
                if (count($room) === self::LAST_PLAYER_IN_ROOM)
                {
                    $id = array_search($connection, $room);
                    $this->deletePlayerFromRoom($room, $id);
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
// foreach ($this->clients as $client)
// {
//     if ($connection === $client)
//     {
//         foreach ($this->rooms as $room)
//         {
//             if (in_array($client, $room))
//             {
//                 $key = array_search($client, $room);
//                 unset($room[$key]);
//                 $this->playerLeft($room, $key);
//                 break;
//             }
//         }
//         break;
//     }
// }