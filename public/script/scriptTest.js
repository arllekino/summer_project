import { DrawInfoBlocks, DrawBuildingsBlock } from "./drawInfoBlocks.js";
import { main } from "./stages.js";
import { CreateIsland } from "./classes/Map.js";
import { FormationOfGame, islandTemplate } from "./formationOfGame.js";

(async () => {

    const infoForUser = FormationOfGame();

    // const infoForUser = {
    //     matrixOfField: islandTemplate,
    //     numberOfUser: 1,
    // }

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

    island.mapReader(allContainer.containerForMap, island.matrixOfIsland, island.cells, app, island.resourcesOnIsland, island.cellsOfUserIsland, infoForUser.numberOfUser, island.quadTree);

    // main(allContainer, app, island);

    return {
        stage: app.stage,
    };
})();