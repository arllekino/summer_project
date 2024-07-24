<?php
declare(strict_types=1);

namespace App\Service\Input;

interface IslandBuildInputInterface
{
    public function getHp(): int;
    public function getStrBuildType(): string;
    public function getBuildMatrix(): array;
    public function getBuildPtr(): int;
    public function getCellStatus(): array;
}