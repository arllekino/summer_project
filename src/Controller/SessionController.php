<?php
declare(strict_types=1);

namespace App\Controller;

use Symfony\Component\HttpFoundation\Session\SessionInterface;

class SessionController 
{
    private SessionInterface $session;
    
    public function __construct(SessionInterface $session)
    {
        $this->session = $session;     
    }
    public function setSession(string $name, mixed $value): void
    {
        $this->session->set($name, $value);
    }   

    public function getSession(string $name): ?int
    {
        $sessionName = $this->session->get($name);

        return $sessionName;
    }

    public function removeSession(string $name): void
    {
        $this->session->remove($name);
    }

    public function clearSession(): void
    {
        $this->session->clear();
    }
}