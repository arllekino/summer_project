<?php
declare(strict_types=1);

namespace App\Entity\Types;

enum ResourcesType
{
    case Food;
    case Wood;
    case Stones;
    case Warriors;
    case Villagers;
    case Hammer;
    case Money;
    case Knowledge;
}