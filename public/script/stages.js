import { DrawBlockForDiceRoll, UpdateNumberOfResources, DrawNumberOfResources, DrawBuildingsBlock } from "./drawInfoBlocks.js";
import { startTimerForStage } from "./timerForStage.js";
import { GetResources } from "./stages/resources.js";
import { Destroyer, AddEventListenersForHammer } from "./classes/Destroyer.js"; 
import { Game } from "./classes/game.js";
import { ChoicePlaceForShip, MouseFollowingForShip, MoveSpriteToCoords, SetPositionShip } from "./moveSpriteToCoords.js";
import { Building } from "./classes/Building.js";
import { Infobox } from "./classes/Infobox.js";
import { mouseDistance, mouseIntersectsInContainer, mouseDistanceInContainer, getRandomElementFormList } from "./classes/CommonFunctions.js";
import { Rules } from "./classes/Rules.js";
import { GetCoordsOfBuildings } from "./moveSpriteToCoords.js";
import { Cell } from "./classes/Cell.js";
import { Rect } from "./classes/Quadtree.js";
import { ChoiceEndCoords, MoveWarrior } from "./warrior.js";
import {MakePlayersNotReady, MakePlayerReady, CheckReadinessOfPlayers} from './requestsForMainGame.js'


export async function stageResources(containerForDiceRoll, app, resources, buildings) {
    const containerCubes = new PIXI.Container();
    const blockButtonReRoll = new PIXI.Sprite();
    
    const promise = new Promise(function(resolve) {
        DrawBlockForDiceRoll(containerForDiceRoll, app, containerCubes, blockButtonReRoll, resolve);
    });
    await Promise.all([promise]);

    GetResources(buildings, containerCubes, containerForDiceRoll, blockButtonReRoll, resources);
}


export function stageDisasters(allTextResources, resourcesOfUser, ObjectsBuildings, CountsBuildings, illObjects)
{
    let illList = []

    // вычитание из пищи людей на данный момент не голодных
    console.log(resourcesOfUser.wheat);
    console.log(resourcesOfUser.inhabitants);
    resourcesOfUser.wheat -= resourcesOfUser.inhabitants;
    
    // Откат всех больных зданий и людей
    Object.keys(illObjects).forEach((key) => {
        console.log(key)
        if (key !== 'inhabitants')
        {
            CountsBuildings[key] += illObjects[key];
            illObjects[key] = 0;
        }
        else
        {
            resourcesOfUser.inhabitants += illObjects['inhabitants'];
            illObjects['inhabitants'] = 0
        }
    })
    ObjectsBuildings.forEach((value) => {
        value.__sprite.alpha = 1;
        value.interactivity = true;
    })
    // проверка на голодающих
    if (resourcesOfUser.wheat < 0)
    {
        for (let i = 0; i < Math.abs(resourcesOfUser.wheat); i++)
        {
            let building = getRandomElementFormList(ObjectsBuildings);
            while (building.getAlias() === 'warehouse' && building in illList)
            {
                building = getRandomElementFormList(ObjectsBuildings);
            }
            illList.push[building];
            illObjects[building.getAlias()] += 1;
            CountsBuildings[building.getAlias()]  -= 1;
            building.__sprite.alpha = 0.5;
            building.interactivity = false;

            resourcesOfUser.inhabitants -= 1;
            illObjects['inhabitants'] += 1;
        }
        resourcesOfUser.wheat = 0;

    }
    // обновление текста пищи
    if (resourcesOfUser.wheat > resourcesOfUser.maxWheat + Game.warehouseAmountOfAdding * CountsBuildings.warehouse) {
        resourcesOfUser.wheat = resourcesOfUser.maxWheat + Game.warehouseAmountOfAdding * CountsBuildings.warehouse;
    }
    allTextResources['textForWheat'].text = `${resourcesOfUser.wheat}/${resourcesOfUser.maxWheat + Game.warehouseAmountOfAdding * CountsBuildings.warehouse}`;

    // обновление текста людей
    allTextResources['textForInhabitants'].text = `${resourcesOfUser.inhabitants}`;

    console.log('Больные: ', illObjects),
    console.log('Здания: ',CountsBuildings);
}

export async function StartStage(app, island, allTextResources, flags, blocks, containerForMap)
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

    await buildCastle(app, island, allTextResources, blocks, containerForMap);
    await buildFarmerHouse(app, island, allTextResources, blocks, containerForMap);
    await buildFarmerHouse(app, island, allTextResources, blocks, containerForMap);
    await buildFarmerHouse(app, island, allTextResources, blocks, containerForMap);
    await buildFarm(app, island, allTextResources, blocks, containerForMap);
    Game.stage += 1;
}

async function buildCastle(app, island, allTextResources, blocks, containerForMap) {
    return new Promise((resolve) => {
        const requiredResources = {};
        island.buildingMoment = true;
        island.buldingObject = new Building(app, island.cells, island.buildings, island.quadTree, 'Castle', 'Castle', {}, 1, 100, 0, 1, 17, requiredResources, island.resourcesOfUser, allTextResources, blocks, containerForMap);
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
async function buildFarmerHouse(app, island, allTextResources, blocks, containerForMap) {
    return new Promise((resolve) => {
        const requiredResources = {};
        island.buildingMoment = true;
        island.buldingObject = new Building(app, island.cells, island.buildings, island.quadTree, 'Farmer House', 'houseVillage', {}, 1, 100, 0, 1, 13, requiredResources, island.resourcesOfUser, allTextResources, blocks, containerForMap);
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

async function buildFarm(app, island, allTextResources, blocks, containerForMap) {
    return new Promise((resolve) => {
        const requiredResources = {};
        island.buildingMoment = true;
        island.buldingObject = new Building(app, island.cells, island.buildings, island.quadTree, 'Farm', 'farm', {wheat: 1}, 1, 100, 0, 1, 1, requiredResources, island.resourcesOfUser, allTextResources, blocks, containerForMap);
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

export async function stageBuilding(app, island, allTextResources, flags, blocks, containerForMap) {
    if (!flags['hummer'])
    {
        const hummer = new Destroyer(app)
        AddEventListenersForHammer(hummer, island.buildings, island.resourcesOnIsland,
             island.buildingMoment, app, island.resourcesOfUser, allTextResources, blocks, containerForMap);
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
        if (event.button === 0 && island.buldingObject.getStopMovingFlag() && Game.stage === 3)
        {
            let minDist = 99999;
            let minDistObject = null;
            island.buildings.forEach((building) => {
                if (mouseDistanceInContainer(event, building, containerForMap) < minDist && mouseIntersectsInContainer(event, building, containerForMap))// && mouseIntersects(event, building)
                {
                    minDist = mouseDistanceInContainer(event, building, containerForMap);
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

export async function stageBattles(app, cells, quadTree, buildings, ships, worldMatrix, allContainer) {
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
            GetCoordsOfBuildings(cells, coordsOfBuilding, buildings, resolve, isBuildingPressed, allContainer.containerForMap);
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
                app.stage.on("pointermove", (event) => MouseFollowingForShip(event, cells, coordsEnd, cellForShip, isThisRightCell, cellForShipFromMap, quadTree))
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
        const promiseForMovingShip = new Promise(function(resolve) {
            MoveSpriteToCoords(coordsEnd, coordsStart, cells, app, ships, worldMatrix,resolve, allContainer.containerForMap);
        });
        await Promise.all([promiseForMovingShip]);
        const coordsStartForWarrior = ChoiceEndCoords(coordsOfBuilding, coordsEnd, worldMatrix, cells);
        MoveWarrior(coordsStartForWarrior, coordsEnd, cells, app, worldMatrix, buildings);
    }
}

export async function main(allContainer, app, island) {
    allContainer.wheelBlock.interactive = true;
    allContainer.wheelBlock.buttonMode = true;
    allContainer.wheelBlock.cursor = "pointer";

    const handleKeyDown = (event) => {
        const key = event.key;
        if (key === 'd' && Game.stage !== 1) {
            island.cells.forEach(cell => {
                cell.changeXY(cell.getBounds().x - 10, cell.getBounds().y)
            })
            allContainer.containerForMap.x -= 10;
            island.ships.forEach(ship => {
                SetPositionShip(ship.getBounds().x - 10, ship.getBounds().y, ship)
            })
        }
        else if (key === 's' && Game.stage !== 1) {
            island.cells.forEach(cell => {
                cell.changeXY(cell.getBounds().x, cell.getBounds().y - 10)
            })
            allContainer.containerForMap.y -= 10;
            island.ships.forEach(ship => {
                SetPositionShip(ship.getBounds().x, ship.getBounds().y - 10, ship)
            })
        }
        else if (key === 'a' && Game.stage !== 1) {
            island.cells.forEach(cell => {
                cell.changeXY(cell.getBounds().x + 10, cell.getBounds().y)
            })
            allContainer.containerForMap.x += 10;
            island.ships.forEach(ship => {
                SetPositionShip(ship.getBounds().x + 10, ship.getBounds().y, ship)
            })
        }
        else if (key === 'w' && Game.stage !== 1) {
            island.cells.forEach(cell => {
                cell.changeXY(cell.getBounds().x, cell.getBounds().y + 10)
            })
            allContainer.containerForMap.y += 10;
            island.ships.forEach(ship => {
                SetPositionShip(ship.getBounds().x, ship.getBounds().y + 10, ship)
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
            warehouse: 0,
            Castle: 0,
        },
        illObjects: {
            Castle: 0,
            houseVillage: 0,
            houseGrendee: 0,
            farm: 0,
            warehouse: 0,
            inhabitants: 0,
        }
    }

    const allTextResources = DrawNumberOfResources(allContainer.containerForResources, island.resourcesOfUser, app);
    DrawBuildingsBlock(app, island, allTextResources, blocks, allContainer.containerForMap);

    const flags = {
        wheelFlag: false,
        hummer: false,
        rotations: false,
        choiceTower: false,
    };



    const rules = new Rules(app);
    const promiseForStartStage = new Promise(function(resolve) {
        StartStage(app, island, allTextResources, flags, blocks, allContainer.containerForMap, resolve);
    });
    await Promise.all([promiseForStartStage]);
    
    MakePlayerReady();
    const promiseForWaitingForPlayers = new Promise(function(resolve) {
        const waitingForPlayers = setInterval(async () => {
            let statusOfPlayer = await CheckReadinessOfPlayers();
            if (statusOfPlayer) {
                clearInterval(waitingForPlayers);
                resolve();
            }
        }, 1000);
    });
    await Promise.all([promiseForWaitingForPlayers]);

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

        stageDisasters(allTextResources, island.resourcesOfUser, island.buildings, blocks.buildings, blocks.illObjects);
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

        stageBuilding(app, island, allTextResources, flags, blocks, allContainer.containerForMap);
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
        stageBattles(app, island.cells, island.quadTree, island.buildings, island.ships, island.matrixOfIsland, allContainer);
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