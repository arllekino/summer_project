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
            $input->getIslandMatrix(),
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
    public function update(IslandInputInterface $input): void
    {
        $island = $this->repository->findByUserId($input->getUserId());
        if ($island === null)
        {
            throw new \UnexpectedValueException('Остров не найден');
        }  

        $island->setIslandMatrix($input->getIslandMatrix());
        $island->setFood($input->getFood());
        $island->setMaxFood($input->getMaxFood());
        $island->setWood($input->getWood());
        $island->setMaxWood($input->getMaxWood());
        $island->setStones($input->getStones());
        $island->setMaxStones($input->getMaxStones());
        $island->setWarriors($input->getWarriors());
        $island->setMaxWarriors($input->getMaxWarriors());
        $island->setVillagers($input->getVillagers());
        $island->setHammers($input->getHammers());
        $island->setMoney($input->getMoney());
        $island->setKnowledge($input->getKnowledge());
    }

    public function findAll(): array
    {
        $islands = $this->repository->listIsland();

        $islandsOutputArr = [];

        foreach ($islands as $island)
        {
            $islandOutput = [
                'island_matrix' => $island->getIslandMatrix(),
                'warriors' => $island->getWarriors(),
                'villagers' => $island->getVillagers()
            ];
            $islandsOutputArr[] = $islandOutput;
        }
        return $islandsOutputArr;
    }

    public function deleteAll(): void
    {
        $this->repository->deleteAll();    
    }
}