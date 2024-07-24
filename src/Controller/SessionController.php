<?php
declare(strict_types=1);

namespace App\Controller;

use Symfony\Component\HttpFoundation\Session\SessionInterface;

class SessionController 
{
    public function __construct(private SessionInterface $session)
    {}
    public function setSession(string $name, mixed $value): void
    {
        $this->session->set($name, $value);
    }   

    public function getSession(string $name): mixed
    {
        $value = $this->session->get($name);

        return $value;
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