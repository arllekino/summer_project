<?php
declare(strict_types=1);

namespace App\Service;

use App\Entity\Island;
use App\Repository\IslandRepository;
use App\Service\Input\IslandInputInterface;

class IslandService
{
    private IslandRepository $repository;

    public function __construct(IslandRepository $repository)
    {
        $this->repository = $repository;
    }

    public function create(IslandInputInterface $input): void
    {
        $island = new Island(
            null,
            $input->getFood(),
            $input->getMaxFood(),
            $input->getWood(),
            $input->getMaxFood(),
            $input->getStones(),
            $input->getMaxStones(),
            $input->getWarriors(),
            $input->getMaxWarriors(),
            $input->getVillagers(),
            $input->getHammers(),
            $input->getMoney(),
            $input->getKnowledge(),
            $input->getUserId()
        );
        
        $this->repository->store($island);
    }
}