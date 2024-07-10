<?php
declare(strict_types=1);

namespace App\WebSocket;

use Ratchet\ConnectionInterface;
use Ratchet\MessageComponentInterface;

class WebSocketHandler implements MessageComponentInterface
{
    protected $clients;
    
    public function __construct()
    {
        $this->clients = new \SplObjectStorage;    
    }

    public function onOpen(ConnectionInterface $connection)
    {
        $this->clients->attach($connection);
    }

    public function onMessage(ConnectionInterface $from, $msg)
    {
        foreach ($this->clients as $client)
        {
            if ($from !== $client)
            {
                $client->send($msg);
            }
        }    
    }

    public function onClose(ConnectionInterface $connection)
    {
        $this->clients->detach($connection);
    }

    public function onError(ConnectionInterface $connection, \Exception $e)
    {
        echo $e->getMessage();
        
        $connection->close();
    }
}