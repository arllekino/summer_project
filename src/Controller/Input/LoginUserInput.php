<?php
declare(strict_types=1);

namespace App\Controller\Input;

use App\Service\Input\LoginUserInputInterface;

class LoginUserInput implements LoginUserInputInterface
{
    private string $email;
    private string $password;

    public function __construct(string $email, string $password)
    {
        $this->email = $email;
        $this->password = $password;
    }

    public function getEmail(): string
    {
        return $this->email;    
    }
    public function getPassword(): string
    {
        return $this->password;    
    }
}