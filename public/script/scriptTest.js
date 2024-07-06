import { DrawInfoBlocks, DrawBuildingsBlock } from "./drawInfoBlocks.js";
import { main } from "./stages.js";
import { CreateIsland, worldMatrix } from "./classes/Map.js";

(async () => {
    const app = new PIXI.Application();
    await app.init({ background: '#00aeff', resizeTo: window });

    app.stage.interactive = true;
    document.body.appendChild(app.canvas);

    const island = CreateIsland(worldMatrix);
    
    DrawBuildingsBlock(app, island);
    const allContainer = DrawInfoBlocks(app);
    
    let textures = await PIXI.Assets.load('/../imageParser/grounds.json');
    let texturess = await PIXI.Assets.load('/../imageParser/buildings.json');
    texturess = await PIXI.Assets.load('/../imageParser/farmParser.json');
    texturess = await PIXI.Assets.load('/../imageParser/playingHouse.json');
    texturess = await PIXI.Assets.load('/../imageParser/wareHouse.json');
    texturess = await PIXI.Assets.load('/../imageParser/farmerHouse.json');
    texturess = await PIXI.Assets.load('/../imageParser/greenCastle.json');
    texturess = await PIXI.Assets.load('/../imageParser/Icons.json');
    texturess = await PIXI.Assets.load('/../imageParser/resources.json');

    island.mapReader(island.matrixOfIsland, island.cells, app, island.resourcesOnIsland);

    main(allContainer, app, island);    

    return {
        stage: app.stage,
    };
})();