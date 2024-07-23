import { GetBoundsForIsland } from "../formationOfGame.js";
import { Cell } from "./Cell.js";
import { Resource } from "./Resource.js";
import { QuadTree, Rect } from "./Quadtree.js";

const TResources = {
    wheat: 4,
    maxWheat: 15,
    wood: 4,
    maxWood: 15,
    stone: 4,
    maxStone: 15,
    wars: 0,
    maxWars: 8,
    inhabitants: 0,
    hammer: 4,
    money: 0,
    books: 0,
    skulls: 0,
}

function mapReader(container, worldMatrix, cells, app, worldResources, resources, cellsOfUserIsland, numberOfUser, quadTree, quadTreeOfUserIsland, arrOfUserIdsInLobby) {
    const index = arrOfUserIdsInLobby.indexOf(numberOfUser);
    const coordsOfLeftTop = {
        iterXOfField: 0,
        iterYOfField: 0,
        startXOfFiled: 0,
        startYOfFiled: 0,
    }
    if (index !== -1) {
        GetBoundsForIsland(index, coordsOfLeftTop);
    }
    else {
        console.log("НЕТ ТАКОГО ИГРОКА В ЛОББИ");
    }
    
    worldMatrix.forEach((row, i) => {
        row.forEach((num, j) => {
            const cell = new Cell(app, -1, num, 500 + 20 * i, -500 + 20 * j);
            const resource = {
                object: null,
            }
            if (num >= 3)
            {
                const dimensions = {
                    x: worldMatrix[0].length,
                    y: worldMatrix.length,
                }
                cell.setPtrTower(9);
                cell.changeType(1);
                resource.object = new Resource(app, num - 2, cell, dimensions);
                resource.object.__cellsStatus['-1'] = cell;
            }
            cell.__sprite.zIndex = -999;
            cell.setPositionsInIsometric(500 + 20 * i, -500 + 20 * j);

            if (i >= coordsOfLeftTop.iterYOfField && j >= coordsOfLeftTop.iterXOfField 
                && i <= coordsOfLeftTop.iterYOfField + 20 && j <= coordsOfLeftTop.iterXOfField + 20) {
                    cellsOfUserIsland.push(cell);
                    quadTreeOfUserIsland.insert(cell);
                    if (resource.object)
                    {
                        resources.push(resource.object);
                    }
            }

            if (i % 2 == 0) {
                cell.setPositionsInIsometric(500 + 20 * i, -500 + 20 * j);
            }
            if (resource.object)
            {
                resource.object.setPosition(cell.getBounds().x + cell.getBounds().width / 2, cell.getBounds().y + cell.getBounds().height / 2 - 7)
                resource.object.setZIndex(resource.object.getBounds().y - 15);
                container.addChild(resource.object.sprite);
            }
            cells.push(cell);
            if (resource.object)
            {
                worldResources.push(resource.object)
            }
            quadTree.insert(cell);
            container.addChild(cell.__sprite);
        })
    })
}

export function CreateIsland(worldMatrix) {
    return {
        resourcesOfUser: TResources,
        matrixOfIsland: worldMatrix,
        cells: [],
        cellsOfUserIsland: [],
        mapReader: mapReader,
        resourcesOnIsland: [],
        worldResources: [],
        buildings: [],
        buildingsOfUserIsland: [],
        buildingCountsOfUser: {
            houseVillage: 0,
            houseGrendee: 0,
            farm: 0,
            warehouse: 0,
            Castle: 0,
            barrack: 0,
        },
        illObjects: {
            barrack: 0,
            Castle: 0,
            houseVillage: 0,
            houseGrendee: 0,
            farm: 0,
            warehouse: 0,
            inhabitants: 0,
        },
        buildingMoment: false,
        buldingObject: null,
        buildingSprite: null,
        ships: [],
        quadTree: new QuadTree(new Rect(-5000, -5000, window.innerWidth * 20,  window.innerHeight * 1000), 10000),
        quadTreeOfUserIsland: new QuadTree(new Rect(-5000, -5000, window.innerWidth * 20,  window.innerHeight * 1000), 961),
        warriors: []
    }
}