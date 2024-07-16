import { DrawInfoBlocks, DrawBuildingsBlock } from "./drawInfoBlocks.js";
import { main } from "./stages.js";
import { CreateIsland } from "./classes/Map.js";
import { FormationOfGame, islandTemplate } from "./formationOfGame.js";

(async () => {

    // const infoForUser = FormationOfGame();

    const infoForUser = {
        matrixOfField: islandTemplate,
        numberOfUser: 1,
    }

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
    textures = await PIXI.Assets.load("/../imageParser/wall.json");


    island.mapReader(allContainer.containerForMap, island.matrixOfIsland, island.cells, app, island.resourcesOnIsland, island.cellsOfUserIsland, infoForUser.numberOfUser, island.quadTree);

    main(allContainer, app, island);

    return {
        stage: app.stage,
    };
})();

// import { QuadTree, Rect } from "./classes/Quadtree.js";


// const quadTree = new QuadTree(new Rect(0, 0, window.innerWidth,  window.innerHeight), 3);

// const objects = [
//   { id: 1, x: 20, y: 20, width: 100, height: 100 },
//   { id: 2, x: 120, y: 20, width: 100, height: 100 },
//   { id: 3, x: 20, y: 100, width: 100, height: 100 },
// ];

// for (const object of objects) {
//   quadTree.insert(object);
// }
  
//   // Проверка коллизии курсора мыши с объектами
// window.addEventListener('mousemove', (e) => mouseMove(e))
// function mouseMove(e)
// {
//     const cursor = { x: e.clientX, y: e.clientY };
//     const range = new Rect(cursor.x, cursor.y, 1, 1);
//     const foundObjects = quadTree.query(range);
//     if (foundObjects.length > 0) {
//         console.log(foundObjects[0].id, cursor);
//     } else {
//         console.log('Пересечения с объектами не обнаружено.');
//     }
// }
