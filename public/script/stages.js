import { DrawBlockForDiceRoll, UpdateNumberOfResources, DrawNumberOfResources, DrawBuildingsBlock } from "./drawInfoBlocks.js";
import { startTimerForStage } from "./timerForStage.js";
import { GetResources } from "./stages/resources.js";
import { Destroyer, AddEventListenersForHammer } from "./classes/Destroyer.js"; 
import { Game } from "./classes/game.js";
import { ChoicePlaceForShip, MouseFollowingForShip, MoveSpriteToCoords, SetPositionShip } from "./moveSpriteToCoords.js";
import { Building } from "./classes/Building.js";
import { Infobox } from "./classes/Infobox.js";
import { mouseDistance, mouseIntersects } from "./classes/CommonFunctions.js";
import { Rules } from "./classes/Rules.js";
import { GetCoordsOfBuildings } from "./moveSpriteToCoords.js";
import { Cell } from "./classes/Cell.js";
import { Rect } from "./classes/Quadtree.js";

export async function stageResources(containerForDiceRoll, app, resources, buildings) {
    const containerCubes = new PIXI.Container();
    const blockButtonReRoll = new PIXI.Sprite();
    
    const promise = new Promise(function(resolve) {
        DrawBlockForDiceRoll(containerForDiceRoll, app, containerCubes, blockButtonReRoll, resolve);
    });
    await Promise.all([promise]);

    GetResources(buildings, containerCubes, containerForDiceRoll, blockButtonReRoll, resources);
}

export function stageDisasters() {
    console.log("disasters");
}

export async function StartStage(app, island, allTextResources, flags, blocks)
{
    const handleKeyDown = (event) => {
        const key = event.key;
        if (island.buldingObject)
        {
            if (island.buldingObject.getStopMovingFlag())
            {
                island.buildingMoment = false;
            }
            if (key === 'f' && island.buildingMoment && island.buldingObject && (Game.stage === 3 || Game.stage === 0)) {
                island.buldingObject.clearPatterns();
                island.buldingObject.clearCellsStatus()
                island.buldingObject.rotateMatrix(-1); 
                island.buldingObject.renderMatrixPattern(app);
            } 
            else if (key === 'g' && island.buildingMoment && island.buldingObject && (Game.stage === 3 || Game.stage === 0)) {
                island.buldingObject.clearPatterns();
                island.buldingObject.clearCellsStatus();
                island.buldingObject.rotateMatrix(1);
                island.buldingObject.renderMatrixPattern(app);
            }
        }
    };

    if (!flags['rotations'])
    {
        window.addEventListener('keydown', handleKeyDown);
        flags['rotations'] = true;
    }

    await buildCastle(app, island, allTextResources, blocks);
    await buildFarmerHouse(app, island, allTextResources, blocks);
    await buildFarmerHouse(app, island, allTextResources, blocks);
    await buildFarmerHouse(app, island, allTextResources, blocks);
    await buildFarm(app, island, allTextResources, blocks);
    Game.stage += 1;
}

async function buildCastle(app, island, allTextResources, blocks) {
    return new Promise((resolve) => {
        const requiredResources = {};
        island.buildingMoment = true;
        island.buldingObject = new Building(app, island.cells, island.buildings, island.quadTree, 'Castle', 'Castle', {}, 100, 0, 1, 17, requiredResources, island.resourcesOfUser, allTextResources, blocks);
        island.buldingObject.setMatrixPattern([
            [1, 1, 1],
            [1, 1, 1],
            [1, 1, 1],
        ])
        island.buldingObject.renderMatrixPattern(app);
        const checkCondition = () => {
            if (!island.buldingObject.getStopMovingFlag())
            {
                setTimeout(checkCondition, 100);
            }
            else
            {
                resolve();
            }
        }
        checkCondition();
        
    })
}
async function buildFarmerHouse(app, island, allTextResources, blocks) {
    return new Promise((resolve) => {
        const requiredResources = {};
        island.buildingMoment = true;
        island.buldingObject = new Building(app, island.cells, island.buildings, island.quadTree, 'Farmer House', 'houseVillage', {}, 100, 0, 1, 13, requiredResources, island.resourcesOfUser, allTextResources, blocks);
        island.buldingObject.setMatrixPattern([
            [0, 0, 0],
            [0, 1, 0],
            [0, 0, 0],
        ])
        island.buldingObject.renderMatrixPattern(app);
        island.buldingObject.__droppingResources = {wood: 1}
        blocks.infoBox.show(island.buldingObject);
        const checkCondition = () => {
            if (!island.buldingObject.getStopMovingFlag())
            {
                setTimeout(checkCondition, 100);
            }
            else
            {
                resolve();
            }
        }
        checkCondition();
    })
}

async function buildFarm(app, island, allTextResources, blocks) {
    return new Promise((resolve) => {
        const requiredResources = {};
        island.buildingMoment = true;
        island.buldingObject = new Building(app, island.cells, island.buildings, island.quadTree, 'Farm', 'farm', {wheat: 1}, 100, 0, 1, 1, requiredResources, island.resourcesOfUser, allTextResources, blocks);
        island.buldingObject.setMatrixPattern([
            [1, 1, 0],
            [1, 1, 0],
            [1, 1, 0],
        ])
        island.buldingObject.renderMatrixPattern(app);
        island.buldingObject.__droppingResources = {wood: 1}
        blocks.infoBox.show(island.buldingObject);
        const checkCondition = () => {
            if (!island.buldingObject.getStopMovingFlag())
            {
                setTimeout(checkCondition, 100);
            }
            else
            {
                resolve();
            }
        }
        checkCondition();
    })
}

export async function stageBuilding(app, island, allTextResources, flags, blocks) {
    if (!flags['hummer'])
    {
        const hummer = new Destroyer(app)
        AddEventListenersForHammer(hummer, island.buildings, island.resourcesOnIsland,
             island.buildingMoment, app, island.resourcesOfUser, allTextResources, blocks);
        flags['hummer'] = true;
    }

    document.addEventListener("pointerdown", function(event) {
        if (event.button === 2 && !island.buldingObject.getStopMovingFlag() && Game.stage === 3) 
        {
            event.preventDefault();
            island.buildingSprite.tint = 0xffffff;
            island.buldingObject.clearPatterns();
            island.buldingObject.clearCellsStatus();
            app.stage.on('pointermove', (event) => island.buldingObject.startMouseFollowing(event)).off('pointermove');
            app.stage.removeChild(island.buldingObject.__sprite);
            island.buldingObject.__sprite.destroy();
            island.buildingMoment = false;
        }
        console.log(event.button)
        if (event.button === 0 && island.buldingObject.getStopMovingFlag() && Game.stage === 3)
        {
            let minDist = 99999;
            let minDistObject = null;
            island.buildings.forEach((building) => {
                if (mouseDistance(event, building) < minDist && mouseIntersects(event, building))
                {
                    minDist = mouseDistance(event, building);
                    minDistObject = building;
                }
            })
            if (minDistObject)
            {
                blocks.infoBox.show(minDistObject);
            }
        }
      });
}

export async function stageBattles(app, cells, buildings, ships, worldMatrix) {
    const coordsStart = {
        x: 0,
        y: 0,
    }
    const isBuildingPressed = {
        state: false,
    };
    const coordsOfBuilding = {
        x: 0,
        y: 0,
    } 
    while (!isBuildingPressed.state) {
        const promise = new Promise(function(resolve) {
            GetCoordsOfBuildings(cells, coordsOfBuilding, buildings, resolve, isBuildingPressed);
        });
        await Promise.all([promise]);
        if (Game.stage !== 4) {
            isBuildingPressed.state = true;
        }
    }
    const stopMoving = {
        state: false,
    };
    const isThisRightCell = {
        state: false,
    };
    const coordsEnd = {
        x: 0,
        y: 0,
    }
    const cellForShipFromMap = {
        cell: null,
    }
    if (isBuildingPressed.state && Game.stage === 4) {
        let cellForShip = new Cell(app, -1, 5);
        while (!stopMoving.state) {
            const promise = new Promise(function(resolve) {
                app.stage.on("pointermove", (event) => MouseFollowingForShip(event, cells, coordsEnd, cellForShip, isThisRightCell, cellForShipFromMap))
                setTimeout(() => {
                    document.addEventListener("click", function getCoordsOfShip() {
                        ChoicePlaceForShip(app, stopMoving, isThisRightCell, cellForShip, cellForShipFromMap, resolve);
                        this.removeEventListener("click", getCoordsOfShip);
                    });
                }, 500);
                
            })
            await Promise.all([promise]);
            if (Game.stage !== 4) {
                cellForShip = null;
                stopMoving.state = true;
            }
        }
        cellForShip = null;
    }
    if (stopMoving.state && Game.stage === 4) {
        MoveSpriteToCoords(coordsEnd, coordsStart, cells, app, ships, worldMatrix);
    }
}

export async function main(allContainer, app, island) {
    allContainer.wheelBlock.interactive = true;
    allContainer.wheelBlock.buttonMode = true;
    allContainer.wheelBlock.cursor = "pointer";

    // window.addEventListener('mousemove', (e) => mouseMove(e))
    // function mouseMove(e)
    // {
    //     const cursor = { x: e.clientX, y: e.clientY };
    //     const range = new Rect(cursor.x, cursor.y, 1, 1);
    //     const foundObjects = island.quadTree.query(range);
    //     if (foundObjects.length > 0) {
    //         console.log(foundObjects, cursor);
    //     } else {
    //         console.log('Пересечения с объектами не обнаружено.');
    //     }
    // }

    const handleKeyDown = (event) => {
        const key = event.key;
        if (key === 'a' && Game.stage !== 1) {
            island.cells.forEach(cell => {
                cell.setDirectPositions(cell.getBounds().x - 50, cell.getBounds().y)
            })
            island.buildings.forEach(build => {
                build.setPosition(build.getBounds().x - 50, build.getBounds().y)
            })
            island.resourcesOnIsland.forEach(resource => {
                resource.setAnchor(0);
                resource.setPosition(resource.getBounds().x - 50, resource.getBounds().y);
                resource.setAnchor(0.5);
            })
            island.ships.forEach(ship => {
                SetPositionShip(ship.getBounds().x - 50, ship.getBounds().y, ship)
            })
        }
        else if (key === 'w' && Game.stage !== 1) {
            island.cells.forEach(cell => {
                cell.setDirectPositions(cell.getBounds().x, cell.getBounds().y - 50)
            })
            island.buildings.forEach(build => {
                build.setPosition(build.getBounds().x, build.getBounds().y - 50)
            })
            island.resourcesOnIsland.forEach(resource => {
                resource.setAnchor(0);
                resource.setPosition(resource.getBounds().x, resource.getBounds().y - 50)
                resource.setAnchor(0.5);
            })
            island.ships.forEach(ship => {
                SetPositionShip(ship.getBounds().x, ship.getBounds().y - 50, ship)
            })
        }
        else if (key === 'd' && Game.stage !== 1) {
            island.cells.forEach(cell => {
                cell.setDirectPositions(cell.getBounds().x + 50, cell.getBounds().y)
            })
            island.buildings.forEach(build => {
                build.setPosition(build.getBounds().x + 50, build.getBounds().y)
            })
            island.resourcesOnIsland.forEach(resource => {
                resource.setAnchor(0);
                resource.setPosition(resource.getBounds().x + 50, resource.getBounds().y)
                resource.setAnchor(0.5);
            })
            island.ships.forEach(ship => {
                SetPositionShip(ship.getBounds().x + 50, ship.getBounds().y, ship)
            })
        }
        else if (key === 's' && Game.stage !== 1) {
            island.cells.forEach(cell => {
                cell.setDirectPositions(cell.getBounds().x, cell.getBounds().y + 50)
            })
            island.buildings.forEach(build => {
                build.setPosition(build.getBounds().x, build.getBounds().y + 50)
            })
            island.resourcesOnIsland.forEach(resource => {
                resource.setAnchor(0);
                resource.setPosition(resource.getBounds().x, resource.getBounds().y + 50)
                resource.setAnchor(0.5);
            })
            island.ships.forEach(ship => {
                SetPositionShip(ship.getBounds().x, ship.getBounds().y + 50, ship)
            })
        }
    }

    window.addEventListener('keydown', handleKeyDown);

    let blocks = {
        infoBox: new Infobox(app),
        
        buildings: {
            houseVillage: 0,
            houseGrendee: 0,
            farm: 0,
            warehouse: 0
        }
    }

    const allTextResources = DrawNumberOfResources(allContainer.containerForResources, island.resourcesOfUser, app);
    DrawBuildingsBlock(app, island, allTextResources, blocks);

    const flags = {
        wheelFlag: false,
        hummer: false,
        rotations: false,
        choiceTower: false,
    };

    const rules = new Rules(app);
    await StartStage(app, island, allTextResources, flags, blocks);

    while (true) {

        stageResources(allContainer.containerForDiceRoll, app, island.resourcesOfUser, blocks.buildings);
        const promiseForResources = new Promise(function(resolve) {
            startTimerForStage(Game.timeStageForResources, allContainer.wheelBlock, Game.stage, resolve, app, flags);
        });
        await Promise.all([promiseForResources]);

        // if (Game.playerReady) {
        //     const promiseForReady = new Promise(function(resolve) {
        //         startTimerForStage(5, allContainer.wheelBlock, Game.stage, resolve, app, flags);
        //     });
        //     await Promise.all([promiseForReady]);
        //     Game.playerReady = false;
        // }
        UpdateNumberOfResources(allTextResources, island.resourcesOfUser, blocks.buildings);
        setTimeout(() => {
            allContainer.containerForDiceRoll.visible = false;
        }, 1500);
        Game.stage++;

        stageDisasters();
        const promiseForDisasters = new Promise(function(resolve) {
            startTimerForStage(Game.timeStageForDisasters, allContainer.wheelBlock, Game.stage, resolve, app, flags);
        })
        await Promise.all([promiseForDisasters]);
        // if (Game.playerReady) {
        //     const promiseForReady = new Promise(function(resolve) {
        //         startTimerForStage(5, allContainer.wheelBlock, Game.stage, resolve, app, flags);
        //     });
        //     await Promise.all([promiseForReady]);
        //     Game.playerReady = false;
        // }

        Game.stage++;

        stageBuilding(app, island, allTextResources, flags, blocks);
        const promiseForBuildings = new Promise(function(resolve) {
            startTimerForStage(Game.timeStageForBuildings, allContainer.wheelBlock, Game.stage, resolve, app, flags);
        })
        await Promise.all([promiseForBuildings]);
        // if (Game.playerReady) {
        //     const promiseForReady = new Promise(function(resolve) {
        //         startTimerForStage(5, allContainer.wheelBlock, Game.stage, resolve, app, flags);
        //     });
        //     await Promise.all([promiseForReady]);
        //     Game.playerReady = false;
        // }

        Game.stage++;
        stageBattles(app, island.cells, island.buildings, island.ships, island.matrixOfIsland);
        const promiseForBattles = new Promise(function(resolve) {
            startTimerForStage(Game.timeStageForBattles, allContainer.wheelBlock, Game.stage, resolve, app, flags);
        })
        await Promise.all([promiseForBattles]);

        // if (Game.playerReady) {
        //     const promiseForReady = new Promise(function(resolve) {
        //         startTimerForStage(5, allContainer.wheelBlock, Game.stage, resolve, app, flags);
        //     });
        //     await Promise.all([promiseForReady]);
        //     Game.playerReady = false;
        // }

        Game.stage = 1;
    }
}