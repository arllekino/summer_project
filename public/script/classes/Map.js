import { Cell } from "./Cell.js";
import { Resource } from "./Resource.js";

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

export let worldMatrix = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 3, 4, 4, 4, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0,],
    [0, 0, 0, 3, 3, 3, 3, 4, 4, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0,],
    [0, 0, 3, 3, 3, 3, 3, 4, 4, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 0, 0,],
    [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 2, 2, 2, 2, 2, 0,],
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

function mapReader(worldMatrix, cells, app, resources) {
    let i = 0;
    let j = 0;
    worldMatrix.forEach((row) => {
        row.forEach((num) => {
            if (num < 3)
            {
                var cell = new Cell(app, -1, num);
            }
            else
            {
                var cell = new Cell(app, 9, 1);
                var resource = new Resource(app, num - 2)
                resource.__cellsStatus['-1'] = cell;
            }
            cell.__sprite.zIndex = -999;
            cell.setPositionsInIsometric(500 + 20 * i, -500 + 20 * j);
            if (i % 2 == 0) {
                cell.setPositionsInIsometric(500 + 20 * i, -500 + 20 * j);
            }
            if (resource)
            {
                resource.setPosition(cell.getBounds().x + cell.getBounds().width / 2, cell.getBounds().y + cell.getBounds().height / 2 - 7)
                resource.setZIndex(resource.getBounds().y - 15);
                resources.push(resource);
            }
            cells.push(cell);
            j += 1
        })
        j = 0;
        i += 1;
    })
}

export function CreateIsland(worldMatrix) {
    return {
        resourcesOfUser: TResources,
        matrixOfIsland: worldMatrix,
        cells: [],
        mapReader: mapReader,
        resourcesOnIsland: [],
        buildings: [],
        buildingMoment: false,
        buldingObject: null,
        buildingSprite: null,
        ships: [],
    }
}