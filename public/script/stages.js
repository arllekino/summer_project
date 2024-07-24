import { DrawBlockForDiceRoll, UpdateNumberOfResources, DrawNumberOfResources, DrawBuildingsBlock } from "./drawInfoBlocks.js";
import { startTimerForStage } from "./timerForStage.js";
import { GetResources } from "./stages/resources.js";
import { Destroyer, AddEventListenersForHammer } from "./classes/Destroyer.js";
import { Game } from "./classes/game.js";
import { ChoicePlaceForShip, MouseFollowingForShip, MoveSpriteToCoords, SetPositionShip } from "./moveSpriteToCoords.js";
import { Building } from "./classes/Building.js";
import { Infobox } from "./classes/Infobox.js";
import { mouseIntersectsInContainer, mouseDistanceInContainer, getRandomElementFormList } from "./classes/CommonFunctions.js";
import { Rules } from "./classes/Rules.js";
import { GetCoordsOfBuildings } from "./moveSpriteToCoords.js";
import { Cell } from "./classes/Cell.js";
import { Rect } from "./classes/Quadtree.js";
import { ChoiceEndCoords, MoveWarrior } from "./moveWarrior.js";
import { CheckReadinessOfPlayers, MakePlayersNotReady } from "./requestsForMainGame.js"
import { SendPlayerId, WaitingForPlayers } from "./websocket/logicForStage.js";
import { getUsersIds } from "./formationOfGame.js";
import { Warrior } from "./classes/Warrior.js";
import { Sound } from "./classes/Sound.js";
import { GetCountOfUsers, CheckStatusOfUserInLobby } from "./formationOfGame.js";
import { endGame, updateIsland } from "./gameRequsets.js";


export async function stageResources(containerForDiceRoll, app, resources, buildings) {
    const containerCubes = new PIXI.Container();
    const blockButtonReRoll = new PIXI.Sprite();

    const promise = new Promise(function (resolve) {
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
        if (value.getAlias() !== 'Castle')
        {
            value.interactivity = true;
        }
    })
    // проверка на голодающих
    if (resourcesOfUser.wheat < 0)
    {
        for (let i = 0; i < Math.abs(resourcesOfUser.wheat); i++)
        {
            let building = getRandomElementFormList(ObjectsBuildings);
            while (building.getAlias() === 'warehouse' && building.getAlias() === 'wall' && building in illList)
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

export async function StartStage(app, island, allTextResources, flags, blocks, containerForMap, resolve)
{
    const handleKeyDown = (event) => {
        const key = event.key;
        if (island.buldingObject) {
            if (island.buldingObject.getStopMovingFlag()) {
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

    if (!flags['rotations']) {
        window.addEventListener('keydown', handleKeyDown);
        flags['rotations'] = true;
    }

    await buildCastle(app, island, allTextResources, blocks, containerForMap);
    await buildFarmerHouse(app, island, allTextResources, blocks, containerForMap);
    await buildFarmerHouse(app, island, allTextResources, blocks, containerForMap);
    await buildFarmerHouse(app, island, allTextResources, blocks, containerForMap);
    await buildFarm(app, island, allTextResources, blocks, containerForMap);
    Game.stage += 1;
    resolve();
}

async function buildCastle(app, island, allTextResources, blocks, containerForMap) {
    const dimensions = {
        x: island.matrixOfIsland[0].length,
        y: island.matrixOfIsland.length,
    }
    let castlePtr = 0;
    switch (island.colorFlag)
    {
        case 'green':
            castlePtr = 37;
            break;
        case 'red':
            castlePtr = 41;
            break;
        case 'blue':
            castlePtr = 17;
            break;
        case 'yellow':
            castlePtr = 33;
            break;
    }
    return new Promise((resolve) => {
        const requiredResources = {};
        island.buildingMoment = true;
        island.buldingObject = new Building(app, island.cells, island.buildingsOfUserIsland, island.buildings, island.quadTreeOfUserIsland, 'Castle', 'Castle', {}, 1, 100, 0, 1, castlePtr, requiredResources, island.resourcesOfUser, allTextResources, island.buildingCountsOfUser, containerForMap, dimensions, false, 0);
        island.buldingObject.setMatrixPattern([
            [1, 1, 1],
            [1, 1, 1],
            [1, 1, 1],
        ])
        island.buldingObject.renderMatrixPattern(app);
        island.buldingObject.interactivity = false;
        Game.playing = true;
        const checkCondition = () => {
            if (!island.buldingObject.getStopMovingFlag()) {
                setTimeout(checkCondition, 100);
            }
            else {
                resolve();
            }
        }
        checkCondition();
    })
}
async function buildFarmerHouse(app, island, allTextResources, blocks, containerForMap) {
    const dimensions = {
        x: island.matrixOfIsland[0].length,
        y: island.matrixOfIsland.length,
    }
    return new Promise((resolve) => {
        const requiredResources = {};
        island.buildingMoment = true;
        island.buldingObject = new Building(app, island.cells, island.buildingsOfUserIsland, island.buildings, island.quadTreeOfUserIsland, 'Farmer House', 'houseVillage', {}, 1, 100, 0, 1, 13, requiredResources, island.resourcesOfUser, allTextResources, island.buildingCountsOfUser, containerForMap, dimensions, false, 0);
        island.buldingObject.setMatrixPattern([
            [0, 0, 0],
            [0, 1, 0],
            [0, 0, 0],
        ])
        island.buldingObject.renderMatrixPattern(app);
        island.buldingObject.__droppingResources = { wood: 1 }
        blocks.infoBox.show(island.buldingObject);
        const checkCondition = () => {
            if (!island.buldingObject.getStopMovingFlag()) {
                setTimeout(checkCondition, 100);
            }
            else {
                resolve();
            }
        }
        checkCondition();
    })
}


async function updateMap(island)
{
    const status = await CheckStatusOfUserInLobby();
    let matrixOfField = [];
    if (status === "host") {
        const countOfUser = await GetCountOfUsers();
        const dimensions = {
            width: 0,
            height: 0,
        }
        switch (countOfUser) {
            case 1:
                dimensions.width = 50;
                dimensions.height = 50;
                break;
            case 2:
                dimensions.width = 50;
                dimensions.height = 100;
                break;
            case 3:
                dimensions.width = 100;
                dimensions.height = 100;
                break;
            case 4:
                dimensions.width = 100;
                dimensions.height = 100;
                break;
            default:
                dimensions.width = 50;
                dimensions.height = 50;
                break;
        }
        let tempArr = []
        let i = 0;
        let j = 0;
        island.cells.forEach(cell => {
            temp
        })
    }
    const response = await fetch('/update_map', {
        method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    })
    if (response.ok) {
        const data = await response.json();
        return data.count_players;
    }
    else {
        console.log(response.status);
    }
}

async function buildFarm(app, island, allTextResources, blocks, containerForMap) {
    const dimensions = {
        x: island.matrixOfIsland[0].length,
        y: island.matrixOfIsland.length,
    }
    return new Promise((resolve) => {
        const requiredResources = {};
        island.buildingMoment = true;
        island.buldingObject = new Building(app, island.cells, island.buildingsOfUserIsland, island.buildings, island.quadTreeOfUserIsland, 'Farm', 'farm', {wheat: 1}, 1, 100, 0, 1, 1, requiredResources, island.resourcesOfUser, allTextResources, island.buildingCountsOfUser, containerForMap, dimensions, false, 0);
        island.buldingObject.setMatrixPattern([
            [1, 1, 0],
            [1, 1, 0],
            [1, 1, 0],
        ])
        island.buldingObject.renderMatrixPattern(app);
        island.buldingObject.__droppingResources = { wood: 1 }
        blocks.infoBox.show(island.buldingObject);
        const checkCondition = () => {
            if (!island.buldingObject.getStopMovingFlag()) {
                setTimeout(checkCondition, 100);
            }
            else {
                resolve();
            }
        }
        checkCondition();
    })
}

function interruptBuilding(app, island)
{
    if (!island.buldingObject.getStopMovingFlag()) {
        island.buildingSprite.tint = 0xffffff;
        island.buldingObject.clearPatterns();
        island.buldingObject.clearCellsStatus();
        app.stage.on('pointermove', (event) => island.buldingObject.startMouseFollowing(event)).off('pointermove');
        app.stage.removeChild(island.buldingObject.__sprite);
        island.buldingObject.__sprite.destroy();
        island.buildingMoment = false;
    }
}

export async function stageBuilding(app, island, allTextResources, flags, blocks, containerForMap) {
    if (!flags['hummer'])
    {
        const hummer = new Destroyer(app)
        AddEventListenersForHammer(hummer, island.buildingsOfUserIsland, island.resourcesOnIsland,
            island.cells, app, island.resourcesOfUser, allTextResources, island.buildingCountsOfUser, containerForMap);
        flags['hummer'] = true;
    }

    document.addEventListener("pointerdown", function (event) {
        if (event.button === 2 && !island.buldingObject.getStopMovingFlag() && Game.stage === 3) {
            event.preventDefault();
            interruptBuilding(app, island);
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
            if (minDistObject) {
                blocks.infoBox.show(minDistObject);
            }
        }
    });
}

export async function stageBattles(app, cells, quadTree, buildings, ships, worldMatrix, allContainer, warriors, towers, island) {
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

    const clickedBuilding = {
        building: null,
    };

    while (!isBuildingPressed.state) {
        const promise = new Promise(function(resolve) {
            GetCoordsOfBuildings(cells, coordsOfBuilding, buildings, resolve, isBuildingPressed, allContainer.containerForMap, clickedBuilding);
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
        function getCoordsOfShip(resolve) {
            ChoicePlaceForShip(app, stopMoving, isThisRightCell, cellForShip, cellForShipFromMap, resolve);
            if (Game.stage !== 4) {
                resolve();
            }
            if (isThisRightCell.state) {
                app.stage.on("click", (event) => getCoordsOfShip(event)).off("click");
            }
        }
        while (!stopMoving.state) {
            const promise = new Promise(function(resolve) {
                app.stage.on("pointermove", (event) => MouseFollowingForShip(event, cells, coordsEnd, cellForShip, isThisRightCell, cellForShipFromMap, quadTree, resolve, worldMatrix));
                app.stage.on("click", () => getCoordsOfShip(resolve));
                if (Game.stage !== 4) {
                    resolve();
                }
            })
            await Promise.all([promise]);
            if (Game.stage !== 4) {
                cellForShip = null;
                app.stage.on("pointermove", (event) => MouseFollowingForShip(event)).off("pointermove");
                app.stage.on("click", (event) => getCoordsOfShip(event)).off("click");
                stopMoving.state = true;
            }
        }
        cellForShip = null;
    }
    if (stopMoving.state && Game.stage === 4) {
        const promiseForMovingShip = new Promise(function(resolve) {
            MoveSpriteToCoords(coordsEnd, coordsStart, cells, app, ships, worldMatrix, resolve, allContainer.containerForMap, island);
        });
        await Promise.all([promiseForMovingShip]);
        const coordsStartForWarrior = ChoiceEndCoords(coordsOfBuilding, coordsEnd, worldMatrix, cells);
        cells[coordsStartForWarrior.y * 50 + coordsStartForWarrior.x].okField();
        MoveWarrior(coordsStartForWarrior, coordsEnd, cells, app, worldMatrix, buildings, clickedBuilding, warriors, allContainer.containerForMap, island);
        towers.forEach(tower => {
            tower.startAttack(warriors);
        })
    }
}

async function checkEnd(island, arrPlayersId, idUser)
{
    if (island.buildingCountsOfUser.Castle === 0)
    {
        Game.playing = false;
        let endGameBlock = document.createElement('div');
        endGameBlock.className = 'end-screen'
        endGameBlock.innerHTML =`
                <div class="end-block">
                    <h1 class="end-block__title">LOSER</h1>
                    <button class="intro__but logout" id="quit_button">
                        <span class="button-text">Выйти</span>
                        <img src="../images/home.jpg" alt="Описание картинки" class="button-image">
                    </button>
                </div>
            `
        document.body.appendChild(endGameBlock);
        const quitButton = document.getElementById('quit_button');
        quitButton.addEventListener('click', async () => {
            await leaveGame();
            window.location.href = '/start_lobby_page';
        })
        setInterval(async () => {
            console.log(arrPlayersId.arr);
            if (arrPlayersId.arr.indexOf(idUser) === -1)
            {
                await SendPlayerId(arrPlayersId, idUser);
            }
            console.log(arrPlayersId.arr);
        }, 4000)
    }
    else
    {
        if (island.buildings.filter(building => building.getAlias() == 'Castle').length === 1)
        {
            Game.playing = false;
            let endGameBlock = document.createElement('div');
            endGameBlock.className = 'end-screen'
            endGameBlock.innerHTML =`
                    <div class="end-block">
                        <h1 class="end-block__title">WINNER</h1>
                        <button class="intro__but logout" id="quit_button">
                            <span class="button-text">Выйти</span>
                            <img src="../images/home.jpg" alt="Описание картинки" class="button-image">
                        </button>
                    </div>
                `
            document.body.appendChild(endGameBlock);
            const quitButton = document.getElementById('quit_button');
            quitButton.addEventListener('click', async () => {
                await leaveGame();
                window.location.href = '/start_lobby_page';
            })
            const status = await CheckStatusOfUserInLobby();
            if (status === 'host')
            {
                endGame();
            }
        }
    }
}

async function leaveGame()
{
    const response = await fetch('/quit_lobby', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });
}

export async function main(allContainer, app, island, idUser) {

    const mainMusic = new Sound('main_game', 0.005);
    mainMusic.repeating(true);
    mainMusic.play();

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

    const blocks = {
        infoBox: new Infobox(app),
    }

    const allTextResources = DrawNumberOfResources(allContainer.containerForResources, island.resourcesOfUser, app);
    DrawBuildingsBlock(app, island, allTextResources, allContainer.containerForMap);

    const flags = {
        wheelFlag: false,
        hummer: false,
        rotations: false,
        choiceTower: false,
    };

    const rules = new Rules(app);

    MakePlayersNotReady();

    const arrPlayersId = {
        arr: [],
    }
    await WaitingForPlayers(arrPlayersId, app, island, allTextResources, allContainer.containerForMap);

    const promiseForStartStage = new Promise(function(resolve) {
        StartStage(app, island, allTextResources, flags, blocks, allContainer.containerForMap, resolve);
    })
    await Promise.all([promiseForStartStage]);
    
    await SendPlayerId(arrPlayersId, idUser);
    while (!Game.isAllPlayersReady) {
        const userIDInLobby = await getUsersIds();
        if (userIDInLobby.length === arrPlayersId.arr.length) {
            Game.isAllPlayersReady = true;
        }
    }
    const promiseForWaitingForPlayers = new Promise(function(resolve) {
        setTimeout(() => {
            resolve();
        }, 500);
    });
    await Promise.all([promiseForWaitingForPlayers]);
    Game.isAllPlayersReady = false;
    arrPlayersId.arr = [];
    
    let promiseForWaiting = null;

    while (Game.playing) {

        stageResources(allContainer.containerForDiceRoll, app, island.resourcesOfUser, island.buildingCountsOfUser);
        const promiseForResources = new Promise(function(resolve) {
            startTimerForStage(Game.timeStageForResources, allContainer.wheelBlock, Game.stage, resolve, app, flags, idUser, arrPlayersId);
        });
        await Promise.all([promiseForResources]);
        arrPlayersId.arr = [];
        Game.isAllPlayersReady = false;
        Game.playerReady = false;

        // if (Game.playerReady) {
        //     const promiseForReady = new Promise(function(resolve) {
        //         startTimerForStage(5, allContainer.wheelBlock, Game.stage, resolve, app, flags);
        //     });
        //     await Promise.all([promiseForReady]);
        //     Game.playerReady = false;
        // }
        UpdateNumberOfResources(allTextResources, island.resourcesOfUser, island.buildingCountsOfUser);
        ///setTimeout(() => {
            allContainer.containerForDiceRoll.visible = false;
        //}, 100);
        Game.stage++;
        promiseForWaiting = new Promise(function(resolve) {
            setTimeout(() => {
                resolve();
            }, 500);
        });
        await Promise.all([promiseForWaiting]);

        stageDisasters(allTextResources, island.resourcesOfUser, island.buildingsOfUserIsland, island.buildingCountsOfUser, island.illObjects);
        const promiseForDisasters = new Promise(function(resolve) {
            startTimerForStage(Game.timeStageForDisasters, allContainer.wheelBlock, Game.stage, resolve, app, flags, idUser, arrPlayersId);
        })
        await Promise.all([promiseForDisasters]);
        await updateIsland(island.resourcesOfUser);
        arrPlayersId.arr = [];
        Game.isAllPlayersReady = false;
        Game.playerReady = false;

        // if (Game.playerReady) {
        //     const promiseForReady = new Promise(function(resolve) {
        //         startTimerForStage(5, allContainer.wheelBlock, Game.stage, resolve, app, flags);
        //     });
        //     await Promise.all([promiseForReady]);
        //     Game.playerReady = false;
        // }

        Game.stage++;
        promiseForWaiting = new Promise(function(resolve) {
            setTimeout(() => {
                resolve();
            }, 500);
        });
        await Promise.all([promiseForWaiting]);

        stageBuilding(app, island, allTextResources, flags, blocks, allContainer.containerForMap);
        const promiseForBuildings = new Promise(function(resolve) {
            startTimerForStage(Game.timeStageForBuildings, allContainer.wheelBlock, Game.stage, resolve, app, flags, idUser, arrPlayersId);
        })
        await Promise.all([promiseForBuildings]);
        await updateIsland(island.resourcesOfUser);
        interruptBuilding(app, island);
        arrPlayersId.arr = [];
        Game.isAllPlayersReady = false;
        Game.playerReady = false;

        // if (Game.playerReady) {
        //     const promiseForReady = new Promise(function(resolve) {
        //         startTimerForStage(5, allContainer.wheelBlock, Game.stage, resolve, app, flags);
        //     });
        //     await Promise.all([promiseForReady]);
        //     Game.playerReady = false;
        // }

        Game.stage++;
        promiseForWaiting = new Promise(function(resolve) {
            setTimeout(() => {
                resolve();
            }, 500);
        });
        await Promise.all([promiseForWaiting]);

        const towers = island.buildingsOfUserIsland.filter(building => building.getAlias() === 'tower' )
        stageBattles(app, island.cells, island.quadTree, island.buildings, island.ships, island.matrixOfIsland, allContainer, island.warriors, towers, island);
        const promiseForBattles = new Promise(function(resolve) {
            startTimerForStage(Game.timeStageForBattles, allContainer.wheelBlock, Game.stage, resolve, app, flags, idUser, arrPlayersId);
        })
        await Promise.all([promiseForBattles]);
        towers.forEach(tower => {
            tower.stopAttack();
        })
        arrPlayersId.arr = [];
        Game.isAllPlayersReady = false;
        Game.playerReady = false;
        await checkEnd(island, arrPlayersId, idUser);

        // if (Game.playerReady) {
        //     const promiseForReady = new Promise(function(resolve) {
        //         startTimerForStage(5, allContainer.wheelBlock, Game.stage, resolve, app, flags);
        //     });
        //     await Promise.all([promiseForReady]);
        //     Game.playerReady = false;
        // }

        Game.stage = 1;
        promiseForWaiting = new Promise(function(resolve) {
            setTimeout(() => {
                resolve();
            }, 500);
        });
        await Promise.all([promiseForWaiting]);
    }
}