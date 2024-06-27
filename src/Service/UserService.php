<?php
declare(strict_types=1);

namespace App\Service;

use App\Entity\User;
use App\Repository\UserRepository;
use App\Service\PasswordHasher;
use Symfony\Component\Validator\Validation;
use Symfony\Component\Validator\Constraints\Email;

class UserService
{
    const MIN_LENGTH_USER_NAME = 5; 
    const MIN_LENGTH_PASSWORD = 8; 
    public function __construct(
        private UserRepository $repository,
        private PasswordHasher $passwordHasher
    )
    {    
    }

    public function register(
        string $userName,
        string $email,
        string $password
    ): int
    {
        $extantEmailUser = $this->repository->findByEmail($email);
        if ($extantEmailUser)
        {
            throw new \UnexpectedValueException('User with this email is already exist');
        }
        if (!self::isValid($userName, $email, $password))
        {
            throw new \UnexpectedValueException('Check all fields.');
        }

        $hashPassword = $this->passwordHasher->hash($password);

        $user = new User(
            null,
            $userName,
            $email,
            $hashPassword
        );
        return $this->repository->store($user);
    }

    public function logIn(string $email, string $password): int
    {
        if (!$this->isValid('username', $email, $password))
        {
            throw new \UnexpectedValueException('Check all fields');
        }
        $extantEmailUser = $this->repository->findByEmail($email);
        
        if ($extantEmailUser !== null)
        {
            $hashPassword = $this->passwordHasher->hash($password);
            if ($hashPassword === $extantEmailUser->getHashPassword())
            {
                return $extantEmailUser->getId();
            }
        }
        throw new \UnexpectedValueException('Incorrect email or password');
    }

    public function findUserName(int $id): string 
    {
        $user = $this->repository->findById($id);
        if ($user === null)
        {
            throw new \UnexpectedValueException('User is not exist');
        }
        return $user->getUserName();
    }

    private function isValid(
        string $userName,
        string $email,
        string $password
    ): bool
    {
        if (
           empty($userName) || ($userName < self::MIN_LENGTH_USER_NAME) ||
           empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL) ||
           empty($password) || (str_replace(' ', '', $password) < self::MIN_LENGTH_PASSWORD)
        )
        {
            return false;
        }
        return true;
    }
}