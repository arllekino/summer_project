<?php
declare(strict_types=1);

namespace App\Repository;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
use Symfony\Config\Framework\HttpClient\DefaultOptions\RetryFailedConfig;

class UserRepository
{
    private EntityManagerInterface $entityManager;
    private EntityRepository $repository;


    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
        $this->repository = $entityManager->getRepository(User::class);
    }

    public function findById(int $id): ?User
    {
        return $this->entityManager->find(User::class, $id);
    }

    public function findByEmail(string $email): ?User
    {
        return $this->repository->findOneBy(['email' => $email]); 
    }

    public function store(User $user): int
    {
        $this->entityManager->persist($user);
        $this->entityManager->flush();
        return $user->getId();
    }

    public function update(User $user): void
    {
        $this->entityManager->persist($user);
        $this->entityManager->flush();
    }

    public function delete(User $user): void
    {
        $this->entityManager->remove($user);
        $this->entityManager->flush();    
    }
}