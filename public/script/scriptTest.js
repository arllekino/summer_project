// const { setPositionsInIsometric } = require("./pixi");

// import * as PIXI from './pixi.mjs';
import { DrawInfoBlock } from "./testGame.js";
import { intersects, distance, cartesianToIsometric } from "./classes/CommonFunctions.js";
import { Destroyer } from "./classes/destroyer.js"; 
import { Building } from "./classes/Building.js";
import { Cell } from "./classes/Cell.js"; 


(async () => {
    const app = new PIXI.Application();
    await app.init({ background: '#00aeff', resizeTo: window });
    app.stage.interactive = true;
    document.body.appendChild(app.canvas);
    let buildings = [];
    let buildingMoment = false;
    let t;
    let selectedBuilding = null;

    DrawInfoBlock(app);
    DrawBuildingsBlock(app);

    function cartesianToScreenFromIsometric(cartX, cartY) {
        return {
            x: cartX + cartY,
            y: (cartX - cartY) * 2
        };
    }

    let textures = await PIXI.Assets.load('/../imageParser/grounds.json');
    let texturess = await PIXI.Assets.load('/../imageParser/buildings.json');
    texturess = await PIXI.Assets.load('/../imageParser/farmParser.json');
    texturess = await PIXI.Assets.load('/../imageParser/playingHouse.json');
    texturess = await PIXI.Assets.load('/../imageParser/wareHouse.json');
    texturess = await PIXI.Assets.load('/../imageParser/farmerHouse.json');
    texturess = await PIXI.Assets.load('/../imageParser/greenCastle.json');
    texturess = await PIXI.Assets.load('/../imageParser/Icons.json');

    class game {
        constructor() {
            this.status = ''; // R - бросок кубиков,  W - драка, B - Постройка, D - несчастье
        }
    }

    let worldMatrix = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0,],
        [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0,],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 0, 0,],
        [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0,],
        [0, 1, 1, 0, 0, 0, 0, 0, 0, 2, 2, 2, 1, 1, 1, 1, 1, 2, 0, 0,],
        [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 0, 0, 0,],
        [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0,],
        [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0,],
        [0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0,],
        [0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0,],
    ];


    let cells = [];
    function mapReader(worldMatrix) {
        let i = 0;
        let j = 0;
        worldMatrix.forEach((row) => {
            row.forEach((num) => {
                var cell = new Cell(app, -1, num);
                cell.__sprite.zIndex = -999;
                cell.setPositionsInIsometric(500 + 20 * i, -500 + 20 * j);
                if (i % 2 == 0) {
                    cell.setPositionsInIsometric(500 + 20 * i, -500 + 20 * j);
                }
                cells.push(cell);
                j += 1
            })
            j = 0;
            i += 1;
        })
    }
    mapReader(worldMatrix)

    const hummer = new Destroyer(app)
    document.addEventListener('keypress', (e) => {
        const key = e.key;
        if (key === 'z' && !hummer.activation)
        {
            hummer.initSprite();
            hummer.activate();
        }
    })
    document.addEventListener('mousemove', (e) => hummer.followMouse(e))
    document.addEventListener('pointerdown', (e) => hummer.click(e, buildings))
    
    async function DrawBlockBuildings(container, app) {
        const textureBackground = await PIXI.Assets.load(
            "/../assets/textures/BuildingsPanel.svg",
        );
        const buildingBlock = new PIXI.Sprite(textureBackground);
        container.addChild(buildingBlock);

        const percentageScreenWidth = 0.3;
        const percentageScreenHeight = 0.77;
        container.x = app.screen.width * percentageScreenWidth;
        container.y = app.screen.height * percentageScreenHeight;

        const textures = await PIXI.Assets.load('/../imageParser/panelBuildings.json');
        let buildingX = 20;
        let buildingY = 20;

        const buildingsContainer = new PIXI.Container();
        container.addChild(buildingsContainer);

        for (const textureName in textures.textures) {
            const buildingSprite = new PIXI.Sprite(textures.textures[textureName]);

            buildingSprite.x = buildingX;
            buildingSprite.y = buildingY;

            buildingSprite.interactive = true;
            buildingSprite.buttonMode = true;

            buildingSprite.on('pointerdown', () => {
                if (selectedBuilding) {
                    selectedBuilding.tint = 0xffffff;
                }
                selectedBuilding = buildingSprite;
                selectedBuilding.tint = 0x00ff00
                console.log('Выбрано здание:', textureName);

                if ((textureName === 'richHouse.png')) {
                    t = new Building(app, cells, buildings, 100, 0, 2, 5, buildingMoment);
                    t.setMatrixPattern([
                        [0, 0, 0],
                        [0, 1, 0],
                        [1, 1, 0],
                    ])
                    t.renderMatrixPattern(app);
                    buildingMoment = true
                }
                if ((textureName === 'farm.png')) {
                    t = new Building(app, cells, buildings, 100, 0, 1, 1, buildingMoment);
                    t.setMatrixPattern([
                        [1, 1, 0],
                        [1, 1, 0],
                        [1, 1, 0],
                    ])
                    t.renderMatrixPattern(app);
                    buildingMoment = true
                }
                if ((textureName === 'warehouse.png')) {
                    t = new Building(app, cells, buildings, 100, 0, 3, 9, buildingMoment);
                    t.setMatrixPattern([
                        [1, 1, 0],
                        [1, 1, 0],
                        [1, 1, 0],
                    ])
                    t.renderMatrixPattern(app);
                    buildingMoment = true
                }
                if ((textureName === 'house.png')) {
                    t = new Building(app, cells, buildings, 100, 0, 3, 13, buildingMoment);
                    t.setMatrixPattern([
                        [0, 0, 0],
                        [0, 1, 0],
                        [0, 0, 0],
                    ])
                    t.renderMatrixPattern(app);
                    buildingMoment = true
                }
                console.log(buildingMoment)
            });

            buildingsContainer.addChild(buildingSprite);
            buildingX += buildingSprite.width + 20;
            if (buildingX + buildingSprite.width > buildingBlock.width) {
                buildingX = 20;
                buildingY += buildingSprite.height + 20;
            }
        }
    }

    const handleKeyDown = (event) => {
        const key = event.key;
        if (selectedBuilding) {
            if (key === 'f' && buildingMoment && t) {
                console.log('f');
                t.clearPatterns();
                t.clearCellsStatus()
                t.rotateMatrix(-1);
                t.renderMatrixPattern(app);
            } 
            else if (key === 'g' && buildingMoment && t) {
                console.log('g');
                t.clearPatterns();
                t.clearCellsStatus();
                t.rotateMatrix(1);
                t.renderMatrixPattern(app);
            }
        }
        if (key === 'a') {
            cells.forEach(cell => {
                cell.setDirectPositions(cell.getBounds().x - 50, cell.getBounds().y)
            })
            buildings.forEach(build => {
                build.setPosition(build.getBounds().x - 50, build.getBounds().y)
            })
        }
        else if (key === 'w') {
            cells.forEach(cell => {
                cell.setDirectPositions(cell.getBounds().x, cell.getBounds().y - 50)
            })
            buildings.forEach(build => {
                build.setPosition(build.getBounds().x, build.getBounds().y - 50)
            })
        }
        else if (key === 'd') {
            cells.forEach(cell => {
                cell.setDirectPositions(cell.getBounds().x + 50, cell.getBounds().y)
            })
            buildings.forEach(build => {
                build.setPosition(build.getBounds().x + 50, build.getBounds().y)
            })
        }
        else if (key === 's') {
            cells.forEach(cell => {
                cell.setDirectPositions(cell.getBounds().x, cell.getBounds().y + 50)
            })
            buildings.forEach(build => {
                build.setPosition(build.getBounds().x, build.getBounds().y + 50)
            })
        }
    };
    window.addEventListener('keydown', handleKeyDown);

    function DrawBuildingsBlock(app) {

        const containerForBuilding = new PIXI.Container();
        app.stage.addChild(containerForBuilding);
        DrawBlockBuildings(containerForBuilding, app);
    }

    // window.addEventListener('oncontextmenu', (e) => {
    //     console.log('asdsad');
    //     e.preventDefault();
    //     t.clearPatterns();
    //     delete t.__sprite;
    // })

    document.addEventListener("pointerdown", function(event) {
        if (event.button === 2 && buildingMoment) 
        {
            event.preventDefault();
            selectedBuilding.tint = 0xffffff;
            t.clearPatterns();
            t.clearCellsStatus();
            app.stage.on('pointermove', (event) => t.startMouseFollowing(event)).off('pointermove');
            app.stage.removeChild(t.__sprite);
            t.__sprite.destroy();
            buildingMoment = false;
        }
      });

    return {
        stage: app.stage,
    };
})();

function startBuildingsEventListners()
{
    
}

