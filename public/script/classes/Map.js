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

function mapReader(worldMatrix, cells, app, resources, cellsOfUserIsland, numberOfUser, quadTree) {
    const coordsOfLeftTop = {
        iterXOfField: 0,
        iterYOfField: 0,
    }
    GetBoundsForIsland(numberOfUser, coordsOfLeftTop);
    worldMatrix.forEach((row, i) => {
        row.forEach((num, j) => {
            const cell = new Cell(app, -1, num);
            const resource = {
                object: null,
            }
            if (num >= 3)
            {
                cell.setPtrTower(9);
                cell.__placeType = 1;
                resource.object = new Resource(app, num - 2);
                resource.object.__cellsStatus['-1'] = cell;
            }
            cell.__sprite.zIndex = -999;
            cell.setPositionsInIsometric(500 + 20 * i, -500 + 20 * j);

            if (i >= coordsOfLeftTop.iterYOfField && j >= coordsOfLeftTop.iterXOfField 
                && i <= coordsOfLeftTop.iterYOfField + 20 && j <= coordsOfLeftTop.iterXOfField + 20) {
                    cellsOfUserIsland.push(cell);
            }

            if (i % 2 == 0) {
                cell.setPositionsInIsometric(500 + 20 * i, -500 + 20 * j);
            }
            if (resource.object)
            {
                resource.object.setPosition(cell.getBounds().x + cell.getBounds().width / 2, cell.getBounds().y + cell.getBounds().height / 2 - 7)
                resource.object.setZIndex(resource.getBounds().y - 15);
                resources.object.push(resource);
            }
            cells.push(cell);
            quadTree.insert(cell);
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
        buildings: [],
        buildingMoment: false,
        buldingObject: null,
        buildingSprite: null,
        ships: [],
        quadTree: new QuadTree(new Rect(0, 0, window.innerWidth * 20,  window.innerHeight * 1000), 900)
    }
}