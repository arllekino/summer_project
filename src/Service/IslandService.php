<?php
declare(strict_types=1);

namespace App\Service;

use App\Entity\Island;
use App\Repository\IslandRepository;
use App\Service\Input\IslandInputInterface;

class IslandService
{
    public function __construct(private IslandRepository $repository)
    {}

    public function create(IslandInputInterface $input, int $userId, string $keyGame): void
    {
        $extantIsland = $this->repository->findByUserId($userId);
        if ($extantIsland !== null)
        {
            throw new \UnexpectedValueException('Остров уже создан');
        }

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
            $userId,
            $keyGame
        );

        $this->repository->store($island);
    }

    public function findIsland(int $userId): array
    {
        $island = $this->repository->findByUserId($userId);
        if ($island === null)
        {
            throw new \UnexpectedValueException('Остров не найден');
        }

        return [
            'food' => $island->getFood(),
            'max_food' => $island->getMaxFood(),
            'wood' => $island->getWood(),
            'max_wood' => $island->getMaxFood(),
            'stone' => $island->getStones(),
            'max_stone' => $island->getMaxStones(),
            'warriors' => $island->getWarriors(),
            'max_warriors' => $island->getMaxWarriors(),
            'villagers' => $island->getVillagers(),
            'hammers' => $island->getHammers(),
            'money' => $island->getMoney(),
        ];
    }

    public function update(IslandInputInterface $input, int $userId): void
    {
        $island = $this->repository->findByUserId($userId);
        if ($island === null)
        {
            throw new \UnexpectedValueException('Остров не найден');
        }  

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

        $this->repository->store($island);
    }

    public function findIslandsInGame(string $keyRoom): array
    {
        $islands = $this->repository->findByKeyRoom($keyRoom);

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

    public function deleteIslandsInGame(string $keyRoom): void
    {
        $islands = $this->repository->findByKeyRoom($keyRoom);
        if ($islands === null)
        {
            throw new \UnexpectedValueException('Игра не найдена');
        }

        foreach ($islands as $island)
        {
            $this->repository->deleteIsland($island);
        }
    }
}