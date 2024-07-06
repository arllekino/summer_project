<?php
declare(strict_types=1);

namespace App\Entity\Types;

enum CellType
{
    case Water;
    case Sand;
    case Grass;
    case BuildingOnGrass;
}