<?php

declare(strict_types=1);

namespace App\Entity\Types;

enum BuildType
{
    case Castle;
    case Farm;
    case Barrack;
    case Defence;
	case Wall;
	case HousePeasant;
	case HouseNobles;
	case Warehouse;
}