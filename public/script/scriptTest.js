import { DrawInfoBlocks, DrawBuildingsBlock } from "./drawInfoBlocks.js";
import { mapReader, worldMatrix, cells } from "./renderMap.js";
import { main } from "./stages.js";

(async () => {
    const app = new PIXI.Application();
    await app.init({ background: '#00aeff', resizeTo: window });

    app.stage.interactive = true;
    document.body.appendChild(app.canvas);

    let buildings = [];
    const buildingMoment = {
        isContctructionGoingNow: false,
    };
    let resources = []

    const t = {
        buldingObject: null,
    };
    const selectedBuilding = {
        buildingSprite: null,
    };
    
    DrawBuildingsBlock(app, selectedBuilding, cells, buildings, buildingMoment, t);
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

    mapReader(worldMatrix, app, resources);

    main(allContainer, app, selectedBuilding, cells, buildings, buildingMoment, t, resources);    

    return {
        stage: app.stage,
    };
})();