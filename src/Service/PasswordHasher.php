<?php
declare(strict_types=1);

namespace App\Service;

use Symfony\Component\PasswordHasher\Exception\InvalidPasswordException;
use Symfony\Component\PasswordHasher\Hasher\CheckPasswordLengthTrait;

class PasswordHasher
{
    private const SALT = 'NotSugar';
    private const PASSWORD_LENGTH = 20;

    public function hash(string $password): string
    {
        if ($this->isPasswordTooLong($password))
        {
            throw new \UnexpectedValueException('Password is too long!!!');
        } 
        return $this->encodePassword($password);
    }

    public function verify(string $hashedPassword, string $plainPassword): bool
    {
        if ($plainPassword === '' || $this->isPasswordTooLong($plainPassword))
        {
            return false;
        }

        return $this->encodePassword($plainPassword) === $hashedPassword;    
    }

    private function encodePassword(string $password): string
    {
        return md5($password . self::SALT);    
    }

    private function isPasswordTooLong(string $password): bool
    {
        return self::PASSWORD_LENGTH < strlen($password);
    }
}