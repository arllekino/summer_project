function MakeResources(wheats, woods, stones, inhabitants, hammers) {
    const PlayerResources = {
        Wheat: wheats,
        Wood: woods,
        Stone: stones,
        Inhabitant: inhabitants,
        Hammer: hammers,
    }
    return PlayerResources;
}

function MakePlayer() {
    const PlayerResources = MakeResources(0, 0, 0, 0, 0);
    const Player = {
        Resources: PlayerResources,
        isReady: false,
        StageTime: 0,
        countVillageHouse: 0,
        countGrandeeHouse: 0,
        countFarm: 0,
        countWareHouse: 0,
    }
    return Player;
}

function SetPlayerReady(player, isReady) {
    if (player.hasIsReady("isReady")) {
        player.isReady = isReady;
        return;
    }
    return false;
}

