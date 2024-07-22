import { Building } from "../classes/Building.js";
import { Cell } from "../classes/Cell.js";
import { MakePlayerReady } from "../requestsForMainGame.js";
// import { webSocketObject } from "./lobby.js";

const webSocketObject = {
    webSocket: null,
}

const ws = new WebSocket('ws://10.250.104.153:8080');

let lobbyKey;

let userId;

ws.onopen = () => {
    joinGame();
}

async function joinGame() {
    let responseLobby = await fetch('/find_key_room', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    });
    const dataLobby = await responseLobby.json();
    lobbyKey = dataLobby.key_room;
    
    let responseUser = await fetch('/find_username', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    });
    const dataUser = await responseUser.json();
    userId = dataUser.id;

    console.log('отправка');
    ws.send(JSON.stringify({
        from: 'game',
        type: 'new_player',
        user_id: userId,
        key_room: lobbyKey,
    }));
}

function GetParamForBuilding(data, infoAboutBulding) {
    switch (data.typeOfBuilding) {
        case "castle":
            infoAboutBulding.name = "Castle";
            infoAboutBulding.alias = "Castle";
            infoAboutBulding.givingResource = {};
            infoAboutBulding.peopleCount = 1;
            infoAboutBulding.hp = 100;
            infoAboutBulding.defense = 0;
            infoAboutBulding.buildType = 1;
            infoAboutBulding.buildPtr = data.build_ptr;
            infoAboutBulding.requiredResources = {};
            break;
        case "houseVillage":
            infoAboutBulding.name = "Farmer House";
            infoAboutBulding.alias = "houseVillage";
            infoAboutBulding.givingResource = {};
            infoAboutBulding.peopleCount = 1;
            infoAboutBulding.hp = 100;
            infoAboutBulding.defense = 50;
            infoAboutBulding.buildType = 3;
            infoAboutBulding.buildPtr = data.build_ptr;
            infoAboutBulding.requiredResources = {wood: 2, hammer: 1};
            break;
        case "houseVillage":
            infoAboutBulding.name = "Farmer House";
            infoAboutBulding.alias = "houseVillage";
            infoAboutBulding.givingResource = {};
            infoAboutBulding.peopleCount = 1;
            infoAboutBulding.hp = 100;
            infoAboutBulding.defense = 50;
            infoAboutBulding.buildType = 3;
            infoAboutBulding.buildPtr = data.build_ptr;
            infoAboutBulding.requiredResources = {wood: 2, hammer: 1};
            break;
        case "farm":
            infoAboutBulding.name = "Farm";
            infoAboutBulding.alias = "farm";
            infoAboutBulding.givingResource = {wheat: 1};
            infoAboutBulding.peopleCount = 1;
            infoAboutBulding.hp = 100;
            infoAboutBulding.defense = 0;
            infoAboutBulding.buildType = 1;
            infoAboutBulding.buildPtr = data.build_ptr;
            infoAboutBulding.requiredResources = {wood: 1, hammer: 1};
            break;
        case "warehouse":
            infoAboutBulding.name = "Warehouse";
            infoAboutBulding.alias = "warehouse";
            infoAboutBulding.givingResource = {};
            infoAboutBulding.peopleCount = 1;
            infoAboutBulding.hp = 100;
            infoAboutBulding.defense = 0;
            infoAboutBulding.buildType = 3;
            infoAboutBulding.buildPtr = data.build_ptr;
            infoAboutBulding.requiredResources = {wood: 4, stone: 2, hammer: 1};
            break;
        case "houseGrendee":
            infoAboutBulding.name = "House";
            infoAboutBulding.alias = "houseGrendee";
            infoAboutBulding.givingResource = {};
            infoAboutBulding.peopleCount = 1;
            infoAboutBulding.hp = 100;
            infoAboutBulding.defense = 0;
            infoAboutBulding.buildType = 2;
            infoAboutBulding.buildPtr = data.build_ptr;
            infoAboutBulding.requiredResources = {stone: 2, hammer: 1};
            break;
        case "barrack":
            infoAboutBulding.name = "Barrack";
            infoAboutBulding.alias = "barrack";
            infoAboutBulding.givingResource = {};
            infoAboutBulding.peopleCount = 1;
            infoAboutBulding.hp = 100;
            infoAboutBulding.defense = 0;
            infoAboutBulding.buildType = 2;
            infoAboutBulding.buildPtr = data.build_ptr;
            infoAboutBulding.requiredResources = {stone: 2, hammer: 1, wood: 1, money: 2};
            break;
        case "tower":
            infoAboutBulding.name = "Tower";
            infoAboutBulding.alias = "tower";
            infoAboutBulding.givingResource = {};
            infoAboutBulding.peopleCount = 1;
            infoAboutBulding.hp = 150;
            infoAboutBulding.defense = 20;
            infoAboutBulding.buildType = 5;
            infoAboutBulding.buildPtr = data.build_ptr;
            infoAboutBulding.requiredResources = {stone: 2, wood: 2, money: 1, hammer: 1};
            infoAboutBulding.damage = 20;
            break;
        default:
            infoAboutBulding.name = "Farmer House";
            infoAboutBulding.alias = "houseVillage";
            infoAboutBulding.givingResource = {};
            infoAboutBulding.peopleCount = 1;
            infoAboutBulding.hp = 100;
            infoAboutBulding.defense = 50;
            infoAboutBulding.buildType = 3;
            infoAboutBulding.buildPtr = data.build_ptr;
            infoAboutBulding.requiredResources = {wood: 2, hammer: 1};
            break;
    }
}

export async function WaitingForPlayers(arrPlayersId, app, island, allTextResources, containerForMap) {
    if (ws) {
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === "waiting") {
                arrPlayersId.arr = data.arrPlayersId;
            }
            if (data.type === "building") {
                const infoAboutBulding = {
                    name: "",
                    alias: "",
                    givingResource: {},
                    peopleCount: 0,
                    hp: 0,
                    defense: 0,
                    buildType: 0,
                    buildPtr: 0,
                    requiredResources: {},
                    damage: 0,
                }
                GetParamForBuilding(data, infoAboutBulding);
                const dimensions = {
                    x: island.matrixOfIsland[0].length,
                    y: island.matrixOfIsland.length,
                }
                const building = new Building(app, island.cells, island.buildingsOfUserIsland, island.buildings, island.quadTree, infoAboutBulding.name, infoAboutBulding.alias, infoAboutBulding.givingResource, infoAboutBulding.peopleCount, infoAboutBulding.hp, infoAboutBulding.defense, infoAboutBulding.buildType, infoAboutBulding.buildPtr, infoAboutBulding.requiredResources, island.resourcesOfUser, allTextResources, island.buildingCountsOfUser, containerForMap, dimensions, true, infoAboutBulding.damage);
                data.build_matrix.forEach((coord) => {
                    building.__cellsStatus[coord.index] = island.cells[coord.y * dimensions.y + coord.x];
                    building.__cellsStatus[coord.index].setCellId = coord.index;
                });
                building.displayBuildingOtherPlayer(island.buildings, island.resourcesOfUser, allTextResources, containerForMap);
            }
            if (data.type === "destroying") {
                [...island.buildings, ...island.worldResources].forEach(object => {
                    const arrCoords = [];
                    for (let key in object.__cellsStatus) {
                        const index = island.cells.indexOf(object.__cellsStatus[key]);
                        const x = index % object.dimensions.x;
                        const y = (index - x) / object.dimensions.y;
                        const coords = {
                            x: x,
                            y: y,
                            index: key,
                        }
                        arrCoords.push(coords);
                    }
                    if (JSON.stringify(arrCoords) === JSON.stringify(data.cellsStatus))
                    {
                        console.log('_____КОНТАКТ____');
                        if (object.__cellsStatus['-1'])
                        {
                            object.sprite.destroy();
                            object.__cellsStatus['-1'].setPtrTower(-1);
                            island.worldResources.splice(island.worldResources.indexOf(object), 1);
                            
                            return;
                        }
                        for (const cellId in object.__cellsStatus)
                        {
                            object.__cellsStatus[cellId].setPtrTower(-1);
                        }
                        object.__sprite.destroy();
                        island.buildings.splice(island.buildings.indexOf(object), 1); 
                        return;
                    }
                });
            }
        };
    }
    else {
        console.log("соединение разорвалось");
    }
}

export async function SendPlayerId(arrPlayersId, idPlayer) {
    if (ws) {
        arrPlayersId.arr.push(idPlayer);
        arrPlayersId.arr.sort();
        

        const data = {
            from: 'game',
            type: 'waiting',
            arrPlayersId: arrPlayersId.arr,
            key_room: lobbyKey,
        }
        ws.send(JSON.stringify(data));
        MakePlayerReady();
    }
    else {
        console.log("соединение разорвалось");
    }
}

export async function SendBuilding(building, cells, dimensions) {
    if (ws) {
        let typeOfBuilding;
        switch (building.alias) {
            case "Castle":
                typeOfBuilding = "castle";
                break;
            case "houseVillage":
                typeOfBuilding = "houseVillage";
                break;
            case "farm":
                typeOfBuilding = "farm";
                break;
            case "warehouse":
                typeOfBuilding = "warehouse";
                break;
            case "houseGrendee":
                typeOfBuilding = "houseGrendee";
                break;
            case "barrack":
                typeOfBuilding = "barrack";
                break;
            case "tower":
                typeOfBuilding = "tower";
                break;
            default:
                typeOfBuilding = "houseVillage";
                break;
        }
        const arrCoords = [];
        for (let key in building.__cellsStatus) {
            const index = cells.indexOf(building.__cellsStatus[key]);
            const x = index % dimensions.x;
            const y = (index - x) / dimensions.y;
            const coords = {
                x: x,
                y: y,
                index: key,
            }
            arrCoords.push(coords);
        }

        const data = {
            from: 'game',
            type: 'building',
            hp: building.__hp,
            typeOfBuilding: typeOfBuilding,
            build_matrix: arrCoords,
            build_ptr: building.__buildPtr,
            id: userId,
            key_room: lobbyKey,
        }
        ws.send(JSON.stringify(data));
    }
    else {
        console.log("соединение разорвалось");
    }
}

export async function SendDestroyBuilding(object, cells) {
    const arrCoords = [];
    console.log(object)
    for (let key in object.__cellsStatus) {
        const index = cells.indexOf(object.__cellsStatus[key]);
        const x = index % object.dimensions.x;
        const y = (index - x) / object.dimensions.y;
        const coords = {
            x: x,
            y: y,
            index: key,
        }
        arrCoords.push(coords);
    }
    console.log(arrCoords);
    if (ws) {
        const data = {
            from: 'game',
            type: 'destroying',
            cellsStatus: arrCoords,
            id: userId,
            key_room: lobbyKey,
        }
        ws.send(JSON.stringify(data));
    }
    else {
        console.log("соединение разорвалось");
    }
}