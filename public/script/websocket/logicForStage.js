import { Building } from "../classes/Building.js";
import { Cell } from "../classes/Cell.js";
import { MakePlayerReady } from "../requestsForMainGame.js";
import { webSocketObject } from "./lobby.js";

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
    if (webSocketObject.webSocket) {
        webSocketObject.webSocket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log(data);
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
                }
                GetParamForBuilding(data, infoAboutBulding);
                const dimensions = {
                    x: island.matrixOfIsland[0].length,
                    y: island.matrixOfIsland.length,
                }
                console.log(infoAboutBulding);
                const building = new Building(app, island.cells, island.buildingsOfUserIsland, island.buildings, island.quadTree, infoAboutBulding.name, infoAboutBulding.alias, infoAboutBulding.givingResource, infoAboutBulding.peopleCount, infoAboutBulding.hp, infoAboutBulding.defense, infoAboutBulding.buildType, infoAboutBulding.buildPtr, infoAboutBulding.requiredResources, island.resourcesOfUser, allTextResources, island.buildingCountsOfUser, containerForMap, dimensions, true);
                console.log();
                data.build_matrix.forEach((coord) => {
                    building.__cellsStatus[coord.index] = island.cells[coord.y * dimensions.y + coord.x];
                    building.__cellsStatus[coord.index].setCellId = coord.index;
                });
                building.displayBuildingOtherPlayer(island.buildings, island.resourcesOfUser, allTextResources, containerForMap);
            }
        };
    }
    else {
        console.log("соединение разорвалось");
    }
}

export async function SendPlayerId(arrPlayersId, idPlayer) {
    if (webSocketObject.webSocket) {
        arrPlayersId.arr.push(idPlayer);
        arrPlayersId.arr.sort();

        let responseLobby = await fetch('/find_key_room', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        });
        let lobbyData = await responseLobby.json();

        const data = {
            type: 'waiting',
            arrPlayersId: arrPlayersId.arr,
            key_room: lobbyData.key_room,
        }
        webSocketObject.webSocket.send(JSON.stringify(data));
        MakePlayerReady();
    }
    else {
        console.log("соединение разорвалось");
    }
}

export async function SendBuilding(building, cells, dimensions) {
    if (webSocketObject.webSocket) {
        let responseLobby = await fetch('/find_key_room', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        });
        let lobbyData = await responseLobby.json();
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
            type: 'building',
            hp: building.__hp,
            typeOfBuilding: typeOfBuilding,
            build_matrix: arrCoords,
            build_ptr: building.__buildPtr,
            id: building.id,
            key_room: lobbyData.key_room,
        }
        webSocketObject.webSocket.send(JSON.stringify(data));
    }
    else {
        console.log("соединение разорвалось");
    }
}