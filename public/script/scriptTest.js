import { DrawInfoBlocks, DrawBuildingsBlock } from "./drawInfoBlocks.js";
import { main } from "./stages.js";
import { CreateIsland } from "./classes/Map.js";
import { FormationOfGame, islandTemplate } from "./formationOfGame.js";

(async () => {

    const infoForUser = await FormationOfGame();

    const app = new PIXI.Application();
    await app.init({ background: '#00aeff', resizeTo: window });

    app.stage.interactive = true;
    document.body.appendChild(app.canvas);    

    const island = CreateIsland(infoForUser.matrixOfField);
    
    const allContainer = DrawInfoBlocks(app);
    
    let textures = await PIXI.Assets.load('/../imageParser/grounds.json');
    textures = await PIXI.Assets.load('/../imageParser/buildings.json');
    textures = await PIXI.Assets.load('/../imageParser/farmParser.json');
    textures = await PIXI.Assets.load('/../imageParser/playingHouse.json');
    textures = await PIXI.Assets.load('/../imageParser/wareHouse.json');
    textures = await PIXI.Assets.load('/../imageParser/farmerHouse.json');
    textures = await PIXI.Assets.load('/../imageParser/greenCastle.json');
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
