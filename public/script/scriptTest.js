import { DrawInfoBlocks, DrawBuildingsBlock, DrawNumberOfResources, UpdateNumberOfResources } from "./drawInfoBlocks.js";
import { Game } from "./classes/game.js";
import { main } from "./stages.js";
import { CreateIsland } from "./classes/Map.js";
import { FormationOfGame, islandTemplate } from "./formationOfGame.js";
import { createIsland, viewIsland, updateIsland, loadLostBuildings, getGameStatus } from "./gameRequsets.js";
import { WaitingForPlayers } from "./websocket/logicForStage.js";



(async () => {
    const infoForUser = await FormationOfGame();

    const app = new PIXI.Application();
    await app.init({ background: '#00aeff', resizeTo: window });

    app.stage.interactive = true;
    document.body.appendChild(app.canvas);    

    const island = CreateIsland(infoForUser.matrixOfField, infoForUser.colorFlag);
    const response = await createIsland();
    const allContainer = DrawInfoBlocks(app);
    
    let textures = await PIXI.Assets.load('/../imageParser/grounds.json');
    textures = await PIXI.Assets.load('/../imageParser/buildings.json');
    textures = await PIXI.Assets.load('/../imageParser/farmParser.json');
    textures = await PIXI.Assets.load('/../imageParser/playingHouse.json');
    textures = await PIXI.Assets.load('/../imageParser/wareHouse.json');
    textures = await PIXI.Assets.load('/../imageParser/farmerHouse.json');
    textures = await PIXI.Assets.load('/../imageParser/Castle.json');
    textures = await PIXI.Assets.load('/../imageParser/Icons.json');
    textures = await PIXI.Assets.load('/../imageParser/resources.json');
    textures = await PIXI.Assets.load("/../imageParser/backgroundInfobox.json");
    textures = await PIXI.Assets.load("/../imageParser/buildingDices.json");
    textures = await PIXI.Assets.load("/../imageParser/diceEdges.json");
    textures = await PIXI.Assets.load("/../imageParser/wall.json")
    textures = await PIXI.Assets.load("/../imageParser/warrior.json")
    textures = await PIXI.Assets.load("/../imageParser/barracks.json");
    textures = await PIXI.Assets.load("/../imageParser/warrior.json");
    textures = await PIXI.Assets.load("/../imageParser/tower.json");
    textures = await PIXI.Assets.load("/../imageParser/fire.json");

    island.mapReader(allContainer.containerForMap, island.matrixOfIsland, island.cells, app, island.worldResources, island.resourcesOnIsland, island.cellsOfUserIsland, infoForUser.numberOfUser, island.quadTree, island.quadTreeOfUserIsland, infoForUser.arrOfUserIdsInLobby);

    const allTextResources = DrawNumberOfResources(allContainer.containerForResources, island.resourcesOfUser, app);
    DrawBuildingsBlock(app, island, allTextResources, allContainer.containerForMap);

    const arrPlayersId = {
        arr: [],
    }
    await WaitingForPlayers(arrPlayersId, app, island, allTextResources, allContainer.containerForMap);

    if (response === 'error')
    {
        const userResources = await viewIsland();
        island.resourcesOfUser.wheat = userResources.food;
        island.resourcesOfUser.hammer = userResources.hammers;
        island.resourcesOfUser.maxWheat = userResources.max_food;
        island.resourcesOfUser.maxStone = userResources.max_stone;
        island.resourcesOfUser.maxWars = userResources.max_warriors;
        island.resourcesOfUser.maxWood = userResources.max_wood;
        island.resourcesOfUser.money = userResources.money;
        island.resourcesOfUser.stone = userResources.stone;
        island.resourcesOfUser.inhabitants = userResources.villagers;
        island.resourcesOfUser.wars = userResources.warriors;
        island.resourcesOfUser.wood = userResources.wood; //allContainer.containerForMap

        await loadLostBuildings(app, island, infoForUser.numberOfUser, allContainer.containerForMap, []);
        UpdateNumberOfResources(allTextResources, island.resourcesOfUser, island.buildingCountsOfUser);
        
        const BDStage = await getGameStatus();
        if (Game.stage === 0 && BDStage !== 0)
        {

            let tmpStage = BDStage;
            console.log(tmpStage, 'Before');
            const promiseForWaiting = new Promise(function(resolve) {
                const waitingForNextStage = setInterval(async () => {
                    tmpStage = await getGameStatus();
                    console.log(tmpStage, 'AFTER');
                    console.log('ЖДЁМ');
                    if (tmpStage !== BDStage)
                    {
                        clearInterval(waitingForNextStage);
                        resolve();
                    }
                }, 500);
            });
            await Promise.all([promiseForWaiting]);
            Game.playing = true;
            Game.stage = tmpStage;
        }
    }
    else
    {
        await updateIsland(island.resourcesOfUser);
    }

    main(allContainer, app, island, infoForUser.numberOfUser, arrPlayersId, allTextResources);

    return {
        stage: app.stage,
    };
})();
