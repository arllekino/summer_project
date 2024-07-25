import { Building } from "./classes/Building.js";
import { GetParamForBuilding } from "./websocket/logicForStage.js";

const urlRequests = {
    endGame: '/end_game',
    createIsland: '/create_island',
    updateIsland: '/update_island',
    viewIsland: '/view_island',
    createIslandBuilding: '/create_build',
    deleteIslandBuilding: '/delete_build',
    getAllBuildings: '/view_all_builds',
    getGameStatus: '/get_game_status',
    setGameStatus: '/set_game_status'
}

export async function endGame()
{
    const response = await fetch(urlRequests.endGame, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });

    if (!response.ok) {
        console.log(response.statusText);
        return;
    }
}

export async function createIsland()
{
    const response = await fetch(urlRequests.createIsland, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });
    if (response.ok) {
        return 'ok';
    }
    else {
        return 'error';
    }
}

export async function viewIsland(idAttackedUser)
{
    const data = {};
    if (idAttackedUser) {
        data.user_id = idAttackedUser;
    }
    const response = await fetch(urlRequests.viewIsland, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });
    if (response.ok) {
        const data = await response.json();
        return data;
    }

    if (!response.ok) {
        console.log(response.statusText);
        return;
    }
}

export async function updateIsland(resources)
{
    const data = {
        food: resources.wheat,
        max_food: resources.maxWheat,
        wood: resources.wood,
        max_wood: resources.maxWood,
        stones: resources.stone,
        max_stones: resources.maxStone,
        warriors: resources.wars,
        max_warriors: resources.maxWars,
        villagers: resources.inhabitants,
        hammers: resources.hammer,
        money: resources.money,
        knowledge: resources.books,
    }

    const response = await fetch(urlRequests.updateIsland, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });

    if (!response.ok) {
        console.log(response.statusText);
        return;
    }
}


export async function createIslandBuilding(building, cells)
{
    const listOfCoords = [];
    Object.keys(building.__cellsStatus).forEach(key => {
        listOfCoords.push([Number(key), cells.indexOf(building.__cellsStatus[key])]);
    })

    const data = {
        build_type: building.getAlias(),
        hp: building.getHp(),
        build_ptr: building.getBuildingPtr(),
        cell_status: listOfCoords,
    }

    const response = await fetch(urlRequests.createIslandBuilding, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });

    if (response.ok)
    {
        const responseData = await response.json();
        return responseData.build_id;
    }

    if (!response.ok) {
        console.log(response.statusText);
        return;
    }
}

async function getWorldBuildings()
{
    const response = await fetch(urlRequests.getAllBuildings, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });
    if (response.ok) {
        const data = await response.json();
        return data;
    }

    if (!response.ok) {
        console.log(response.statusText);
        return [];
    }
}

export async function loadLostBuildings(app, island, userId, containerForMap, allTextResources)
{
    const listOfBuildings = (await getWorldBuildings()) ? await getWorldBuildings() : [];
    const dimensions = {
        x: island.matrixOfIsland[0].length,
        y: island.matrixOfIsland.length,
    }
    listOfBuildings.forEach(building => {
        const infoAboutBuilding = {}
        GetParamForBuilding({typeOfBuilding: building.build_type, build_ptr: building.build_ptr}, infoAboutBuilding)
        const tmpBuilding = new Building(app, island.cells, island.buildingsOfUserIsland, island.buildings, island.quadTree, infoAboutBuilding.name, infoAboutBuilding.alias, infoAboutBuilding.givingResource, infoAboutBuilding.peopleCount, building.hp, infoAboutBuilding.defense, infoAboutBuilding.buildType, infoAboutBuilding.buildPtr, infoAboutBuilding.requiredResources, island.resourcesOfUser, allTextResources, island.buildingCountsOfUser, containerForMap, dimensions, true, infoAboutBuilding.damage);
        JSON.parse(building.cell_status).forEach((key_cellIndex) => {
            tmpBuilding.__cellsStatus[key_cellIndex[0]] = island.cells[key_cellIndex[1]];
        })

        if (building.user_id === userId)
        {  
            tmpBuilding.displayMyBuilding(island.buildingsOfUserIsland, island.buildings, island.buildingCountsOfUser, containerForMap, building.build_id)
        }
        else
        {
            tmpBuilding.displayBuildingOtherPlayer(island.buildings, [], allTextResources, containerForMap, building.build_id)
        }
        
    })
}

export async function getGameStatus()
{
    const response = await fetch(urlRequests.getGameStatus, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });
    if (response.ok) {
        const data = await response.json();
        return data.game_status;
    }

    if (!response.ok) {
        console.log(response.statusText);
        return;
    }
}


export async function setGameStatus(stage)
{
    const data = {
        game_status: stage,
    }
    const response = await fetch(urlRequests.setGameStatus, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });

    if (!response.ok) {
        console.log(response.statusText);
        return;
    }
}

export async function deleteIslandBuilding(buildingId)
{
    const data = {
        build_id: buildingId,
    }

    const response = await fetch(urlRequests.deleteIslandBuilding, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });

    if (!response.ok) {
        console.log(response.statusText);
        return;
    }
}
