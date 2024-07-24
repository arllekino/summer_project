import { DrawInfoBlocks, DrawBuildingsBlock } from "./drawInfoBlocks.js";
import { main } from "./stages.js";
import { CreateIsland } from "./classes/Map.js";
import { FormationOfGame, islandTemplate } from "./formationOfGame.js";
import { createIsland, viewIsland } from "./gameRequsets.js";


(async () => {
    const infoForUser = await FormationOfGame();

    const app = new PIXI.Application();
    await app.init({ background: '#00aeff', resizeTo: window });

    app.stage.interactive = true;
    document.body.appendChild(app.canvas);    

    const island = CreateIsland(infoForUser.matrixOfField, infoForUser.colorFlag);
    const response = await createIsland();
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
        island.resourcesOfUser.wood = userResources.wood;
    }
    
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

    main(allContainer, app, island, infoForUser.numberOfUser);

    return {
        stage: app.stage,
    };
})();
