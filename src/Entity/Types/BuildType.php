<?php

declare(strict_types=1);

namespace App\Entity\Types;

enum BuildType
{
    case Farm;
    case Barrack;
    case Defence;
    case Church;
	case Wall;
	case HousePeasant;
	case HouseNobles;
	case Warehouse;
}