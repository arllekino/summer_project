<?php
declare(strict_types=1);

namespace App\Service\Input;

interface RegisterUserInputInterface 
{
    public function getUsername(): string;
    public function getEmail(): string;
    public function getPassword(): string;
}