<?php
declare(strict_types=1);

namespace App\Service\Input;

interface LoginUserInputInterface
{
    public function getEmail(): string;
    public function getPassword(): string;
}