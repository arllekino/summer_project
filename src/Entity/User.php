<?php
declare(strict_types=1);

namespace App\Entity;

class User
{
    public function __construct(
        private ?int $id,
        private string $userName,
        private string $email,
        private string $hashPassword
    )
    {}

    public function getId(): ?int
    {
        return $this->id;    
    }

    public function getUserName(): string
    {
        return $this->userName;    
    }

    public function getEmail(): string
    {
        return $this->email;    
    }

    public function getHashPassword(): string
    {
        return $this->hashPassword;    
    }


    public function setUserName(string $userName): void
    {
        $this->userName = $userName;    
    }
    
    public function setEmail(string $email): void
    {
        $this->email = $email;    
    }

    public function setHashPassword(string $hashPassword): void
    {
        $this->hashPassword = $hashPassword;    
    }
}