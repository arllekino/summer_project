<?php
declare(strict_types=1);

namespace App\Service\Input;

interface IslandInputInterface
{
    public function getFood(): int;
    public function getMaxFood(): int;
    public function getWood(): int;
    public function getMaxWood(): int;
    public function getStones(): int;
    public function getMaxStones(): int;
    public function getWarriors(): int;
    public function getMaxWarriors(): int;
    public function getVillagers(): int;
    public function getHammers(): int;
    public function getMoney(): int;
    public function getKnowledge(): int;
}