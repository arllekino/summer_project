<?php
declare(strict_types=1);

namespace App\Service;

use App\Entity\User;
use App\Repository\UserRepository;
use App\Service\Input\LoginUserInputInterface;
use App\Service\Input\RegisterUserInputInterface;
use App\Service\PasswordHasher;

class UserService
{
    public function __construct(
        private UserRepository $repository,
        private PasswordHasher $passwordHasher
    )
    {}

    public function register(RegisterUserInputInterface $input): int
    {
        $extantEmailUser = $this->repository->findByEmail($input->getEmail());
        if ($extantEmailUser)
        {
            throw new \UnexpectedValueException('Пользователь с такой почтой уже существует');
        }

        $hashPassword = $this->passwordHasher->hash($input->getPassword());

        $user = new User(
            null,
            $input->getUsername(),
            $input->getEmail(),
            $hashPassword
        );
        return $this->repository->store($user);
    }

    public function logIn(LoginUserInputInterface $input): int
    {
        $extantEmailUser = $this->repository->findByEmail($input->getEmail());
        
        if ($extantEmailUser !== null)
        {
            $hashPassword = $this->passwordHasher->hash($input->getPassword());
            if ($this->passwordHasher->verify($extantEmailUser->getHashPassword(), $input->getPassword()))
            {
                return $extantEmailUser->getId();
            }
        }
        throw new \UnexpectedValueException('Неправильная почта или пароль');
    }

    public function findUserName(int $id): string 
    {
        $user = $this->repository->findById($id);
        if ($user === null)
        {
            throw new \UnexpectedValueException('Пользователь не найден');
        }
        return $user->getUserName();
    }
}