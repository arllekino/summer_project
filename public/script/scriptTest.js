import { DrawInfoBlocks, DrawBuildingsBlock } from "./drawInfoBlocks.js";
import { main } from "./stages.js";
import { CreateIsland, worldMatrix } from "./classes/Map.js";

(async () => {
    const app = new PIXI.Application();
    await app.init({ background: '#00aeff', resizeTo: window });

    app.stage.interactive = true;
    document.body.appendChild(app.canvas);

    const island = CreateIsland(worldMatrix);
    
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

    island.mapReader(island.matrixOfIsland, island.cells, app, island.resourcesOnIsland);

    main(allContainer, app, island);    

    return {
        stage: app.stage,
    };
})();