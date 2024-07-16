<?php
declare(strict_types=1);

namespace App\WebSocket;

use Ratchet\ConnectionInterface;
use Ratchet\MessageComponentInterface;

class WebSocketHandler implements MessageComponentInterface
{
    protected $clients;
    protected $rooms;
    
    public function __construct()
    {
        $this->clients = new \SplObjectStorage;
        $this->rooms = [];    
    }

    public function onOpen(ConnectionInterface $connection)
    {
        $this->clients->attach($connection);
    }

    public function onMessage(ConnectionInterface $from, $msg)
    {
        echo "\n" . $msg . "\n\n";

        $data = json_decode($msg, true);
        
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
        foreach ($this->clients as $client)
        {
            if ($connection === $client)
            {
                foreach ($this->rooms as $room)
                {
                    if (in_array($client, $room))
                    {
                        $key = array_search($client, $room);
                        unset($room[$key]);
                        $this->playerLeft($room, $key);
                        break;
                    }
                }
                break;
            }
        }
        $this->clients->detach($connection);
    }

    public function onError(ConnectionInterface $connection, \Exception $e)
    {
        echo $e->getMessage();
        $connection->close();
    }

    private function playerLeft(array $room, int $id)
    {
        foreach ($room as $client)         
        {
            $client->send(json_encode([
                'type' => 'player_disconnected',
                'user_id' => $id
            ]));   
        }
    }
}