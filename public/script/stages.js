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
import { ChoiceEndCoords, MakeIslandWarriorsOfPlayer, MoveWarrior, MoveWarriorsToOtherWarriors } from "./moveWarrior.js";
import { CheckReadinessOfPlayers, MakePlayersNotReady } from "./requestsForMainGame.js"
import { SendInfoAboutAttack, SendPlayerId, WaitingForPlayers, ws } from "./websocket/logicForStage.js";
import { getUsersIds } from "./formationOfGame.js";
import { Warrior } from "./classes/Warrior.js";
import { Sound } from "./classes/Sound.js";
import { GetCountOfUsers, CheckStatusOfUserInLobby } from "./formationOfGame.js";
import { endGame, updateIsland, setGameStatus, viewIsland } from "./gameRequsets.js";


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

async function buildTower(app, island, allTextResources, blocks, containerForMap)
{
    const dimensions = {
        x: island.matrixOfIsland[0].length,
        y: island.matrixOfIsland.length,
    }
    return new Promise((resolve) => {
        const requiredResources = {};
        island.buildingMoment = true
        island.buldingObject = new Building(app, island.cells, island.buildingsOfUserIsland, island.buildings, island.quadTreeOfUserIsland, 'Tower', 'tower', {}, 1, 100, 0, 2, 29, requiredResources, island.resourcesOfUser, allTextResources, island.buildingCountsOfUser, containerForMap, dimensions, false, 20);
        island.buldingObject.setMatrixPattern([
            [0, 0, 0],
            [0, 1, 0],
            [0, 0, 0],
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

    if (island.buildingCountsOfUser.Castle === 0)
    {
        await buildCastle(app, island, allTextResources, blocks, containerForMap);
    }
    if (island.buildingCountsOfUser.houseVillage < 3)
    {
        await buildFarmerHouse(app, island, allTextResources, blocks, containerForMap);
        await buildFarmerHouse(app, island, allTextResources, blocks, containerForMap);
        await buildFarmerHouse(app, island, allTextResources, blocks, containerForMap);
    }
    if (island.buildingCountsOfUser.farm === 0 )
    {
        await buildFarm(app, island, allTextResources, blocks, containerForMap);
    }
    if (island.buildingCountsOfUser.tower === 0 )
    {
        await buildTower(app, island, allTextResources, blocks, containerForMap);
    }
    Game.stage += 1;
    resolve();
}

async function buildCastle(app, island, allTextResources, blocks, containerForMap, userId) {
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
        island.buldingObject = new Building(app, island.cells, island.buildingsOfUserIsland, island.buildings, island.quadTreeOfUserIsland, 'Castle', 'Castle', {}, 1, 100, 0, 1, castlePtr, requiredResources, island.resourcesOfUser, allTextResources, island.buildingCountsOfUser, containerForMap, dimensions, false, 0, userId);
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
async function buildFarmerHouse(app, island, allTextResources, blocks, containerForMap, userId) {
    const dimensions = {
        x: island.matrixOfIsland[0].length,
        y: island.matrixOfIsland.length,
    }
    return new Promise((resolve) => {
        const requiredResources = {};
        island.buildingMoment = true;
        island.buldingObject = new Building(app, island.cells, island.buildingsOfUserIsland, island.buildings, island.quadTreeOfUserIsland, 'Farmer House', 'houseVillage', {}, 1, 100, 0, 1, 13, requiredResources, island.resourcesOfUser, allTextResources, island.buildingCountsOfUser, containerForMap, dimensions, false, 0, userId);
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

async function buildFarm(app, island, allTextResources, blocks, containerForMap, userId) {
    const dimensions = {
        x: island.matrixOfIsland[0].length,
        y: island.matrixOfIsland.length,
    }
    return new Promise((resolve) => {
        const requiredResources = {};
        island.buildingMoment = true;
        island.buldingObject = new Building(app, island.cells, island.buildingsOfUserIsland, island.buildings, island.quadTreeOfUserIsland, 'Farm', 'farm', {wheat: 1}, 1, 100, 0, 1, 1, requiredResources, island.resourcesOfUser, allTextResources, island.buildingCountsOfUser, containerForMap, dimensions, false, 0, userId);
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
    if (island.buldingObject && !island.buldingObject.getStopMovingFlag()) {
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
        if ( island.buldingObject && event.button === 0 && island.buldingObject.getStopMovingFlag() && Game.stage === 3)
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

export async function stageBattles(app, cells, quadTree, buildings, ships, worldMatrix, allContainer, warriors, towers, isThereBattleGoingNow, countOfWarriors, idUser, island) {
    const dimensions = {
        x: worldMatrix[0].length,
        y: worldMatrix.length,
    }
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

    if (countOfWarriors !== 0) {
        while (!isBuildingPressed.state) {
            const promise = new Promise(function(resolve) {
                GetCoordsOfBuildings(cells, coordsOfBuilding, buildings, resolve, isBuildingPressed, allContainer.containerForMap, clickedBuilding, dimensions);
                if (Game.stage !== 4) {
                    resolve();
                }
            });
            await Promise.all([promise]);

            if (Game.stage !== 4) {
                isBuildingPressed.state = true;
            }
        }
        console.log(clickedBuilding);
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

            isThereBattleGoingNow.state = true;
            SendInfoAboutAttack(clickedBuilding, coordsStart, coordsEnd, coordsOfBuilding, countOfWarriors, cells, isThereBattleGoingNow, island.colorFlag);
            const warriorsOfAllUser = {
                warriorsOfIsland: [],
                warriorsOfShip: [],
            }
            console.log(clickedBuilding);
            const resourcesOfAttackedPlayer = await viewIsland(clickedBuilding.building.__userId);
            const promiseForMovingShip = new Promise(function(resolve) {
                MoveSpriteToCoords(coordsEnd, coordsStart, cells, app, ships, worldMatrix,resolve, allContainer.containerForMap);
            });
            await Promise.all([promiseForMovingShip]);
            const idAttackedUser = clickedBuilding.building.__userId;
            let castleAttackedUser;
            buildings.forEach(building => {
                if (building.__userId === idAttackedUser) {
                    if (building.name === "Castle") {
                        castleAttackedUser = building;
                        return;
                    }
                }
            });
            if (resourcesOfAttackedPlayer.warriors !== 0) {
                if (resourcesOfAttackedPlayer.warriors > countOfWarriors) {
                    MakeIslandWarriorsOfPlayer(app, countOfWarriors, warriorsOfAllUser, castleAttackedUser, island.colorFlag, idAttackedUser);
                }
                else {
                    MakeIslandWarriorsOfPlayer(app, resourcesOfAttackedPlayer.warriors, warriorsOfAllUser, castleAttackedUser, island.colorFlag, idAttackedUser);
                }
            }
            const coordsStartForWarrior = ChoiceEndCoords(coordsOfBuilding, coordsEnd, worldMatrix, cells);
            MoveWarrior(coordsStartForWarrior, coordsEnd, cells, app, worldMatrix, buildings, clickedBuilding, allContainer.containerForMap, warriorsOfAllUser, countOfWarriors, island, island.colorFlag, idUser);
            towers.forEach(tower => {
                tower.startAttack(warriorsOfAllUser.warriorsOfIsland);
            })
            if (resourcesOfAttackedPlayer.warriors !== 0) {
                MoveWarriorsToOtherWarriors(warriorsOfAllUser, idUser, resourcesOfAttackedPlayer);
            }
        }
    }
}

async function checkEnd(island, arrPlayersId, idUser)
{
    if (island.buildingCountsOfUser.Castle === 0 && island.illObjects.Castle === 0)
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

export async function main(allContainer, app, island, idUser, arrPlayersId, allTextResources, isThereBattleGoingNow) {
    console.log(idUser);

    const mainMusic = new Sound('main_game', 0.2, true);
    mainMusic.repeating(true);
    await mainMusic.load();
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

    const flags = {
        wheelFlag: false,
        hummer: false,
        rotations: false,
        choiceTower: false,
    };

    const rules = new Rules(app);
    
    if (Game.stage === 0)
    {
        MakePlayersNotReady();
        const promiseForStartStage = new Promise(function(resolve) {
            StartStage(app, island, allTextResources, flags, blocks, allContainer.containerForMap, resolve, idUser);
        })
        await Promise.all([promiseForStartStage]);
        console.log(island.buildings);
        
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
        await updateIsland(island.resourcesOfUser);
        await Promise.all([promiseForWaitingForPlayers]);
        Game.isAllPlayersReady = false;
        arrPlayersId.arr = [];
    }
    
    let promiseForWaiting = null;

    while (Game.playing) {
        isThereBattleGoingNow.state = false;
        if (Game.stage === 1)
        {
            await setGameStatus(Game.stage);
            stageResources(allContainer.containerForDiceRoll, app, island.resourcesOfUser, island.buildingCountsOfUser);
            const promiseForResources = new Promise(function(resolve) {
                startTimerForStage(Game.timeStageForResources, allContainer.wheelBlock, Game.stage, resolve, app, flags, idUser, arrPlayersId);
            });
            await Promise.all([promiseForResources]);
            arrPlayersId.arr = [];
            Game.isAllPlayersReady = false;
            Game.playerReady = false;
            UpdateNumberOfResources(allTextResources, island.resourcesOfUser, island.buildingCountsOfUser);
            allContainer.containerForDiceRoll.visible = false;
            Game.stage++;
            
            promiseForWaiting = new Promise(function(resolve) {
                setTimeout(() => {
                    resolve();
                }, 500);
            });
            await Promise.all([promiseForWaiting]);
        }

        if (Game.stage === 2)
        {
            await setGameStatus(Game.stage);
            stageDisasters(allTextResources, island.resourcesOfUser, island.buildingsOfUserIsland, island.buildingCountsOfUser, island.illObjects);
            const promiseForDisasters = new Promise(function(resolve) {
                startTimerForStage(Game.timeStageForDisasters, allContainer.wheelBlock, Game.stage, resolve, app, flags, idUser, arrPlayersId);
            })
            await Promise.all([promiseForDisasters]);
            await updateIsland(island.resourcesOfUser);
            arrPlayersId.arr = [];
            Game.isAllPlayersReady = false;
            Game.playerReady = false;
            Game.stage++;
            promiseForWaiting = new Promise(function(resolve) {
                setTimeout(() => {
                    resolve();
                }, 500);
            });
            await Promise.all([promiseForWaiting]);
        }

        if (Game.stage === 3)
        {
            await setGameStatus(Game.stage);
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
            Game.stage++;
            promiseForWaiting = new Promise(function(resolve) {
                setTimeout(() => {
                    resolve();
                }, 500);
            });
            await Promise.all([promiseForWaiting]);
        }

        if (Game.stage === 4)
        {
            await setGameStatus(Game.stage);
            const towers = island.buildingsOfUserIsland.filter(building => building.getAlias() === 'tower' )
            stageBattles(app, island.cells, island.quadTree, island.buildings, island.ships, island.matrixOfIsland, allContainer, island.warriors, towers, isThereBattleGoingNow, island.resourcesOfUser.wars, idUser, island);
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
            Game.stage = 1;
            promiseForWaiting = new Promise(function(resolve) {
                setTimeout(() => {
                    resolve();
                }, 500);
            });
            await Promise.all([promiseForWaiting]);
        }
        
        await checkEnd(island, arrPlayersId, idUser);
    }
}