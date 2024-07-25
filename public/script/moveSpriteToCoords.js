import { mouseDistanceInContainer, mouseIntersects, mouseIntersectsInContainer, mouseDistance } from "./classes/CommonFunctions.js";
import { Game } from "./classes/game.js";
import { Rect } from "./classes/Quadtree.js";

function GetXCoordFromMatrixWorld(numberOfCellX, numberOfCellY, cells, dimensions) {
    return cells[numberOfCellY * dimensions.x + numberOfCellX].getBounds().x + cells[numberOfCellY * dimensions.x + numberOfCellX].getBounds().width / 2;
}

function GetYCoordFromMatrixWorld(numberOfCellX, numberOfCellY, cells, dimensions) {
    return cells[numberOfCellY * dimensions.x + numberOfCellX].getBounds().y + cells[numberOfCellY * dimensions.x + numberOfCellX].getBounds().height / 2;
}

async function DrawShip(sprite, app, ships, cells, pathToFile, numberOfCellX, numberOfCellY, containerForMap, dimensions) {
    const x = GetXCoordFromMatrixWorld(numberOfCellX, numberOfCellY, cells, dimensions) - 5;
    const y = GetYCoordFromMatrixWorld(numberOfCellX, numberOfCellY, cells, dimensions) - 7;

    const textureIcon = await PIXI.Assets.load(pathToFile);
    sprite.texture = textureIcon;

    sprite.x = x;
    sprite.y = y;

    ships.push(sprite);
    containerForMap.addChild(sprite);
    app.stage.addChild(sprite);
}

export function SetPositionShip(x, y, ship) {
    ship.x = x;
    ship.y = y;
}

function CalculateDistanceXCoordByTheSmallestYCoord(minX, maxX, minY, worldMatrix) {
    let distanceX = 0;
    for (let iter = minX; iter < maxX; iter++) {
        if (worldMatrix[minY][iter] === 0) {
            distanceX += 1;
        }
        else {
            distanceX += 10;
        }
    }
    return distanceX;
}

function CalculateDistanceXCoordByTheBiggestYCoord(minX, maxX, maxY, worldMatrix) {
    let distanceX = 0;
    for (let iter = minX; iter < maxX; iter++) {
        if (worldMatrix[maxY][iter] === 0) {
            distanceX += 1;
        }
        else {
            distanceX += 10;
        }
    }
    return distanceX;
}

function CalculateDistanceYCoordByTheSmallestXCoord(minY, maxY, minX, worldMatrix) {
    let distanceY = 0;
    for (let iter = minY; iter < maxY; iter++) {
        if (worldMatrix[iter][minX] === 0) {
            distanceY += 1;
        }
        else {
            distanceY += 10;
        }
    }
    return distanceY;
}

function CalculateDistanceYCoordByTheBiggestXCoord(minY, maxY, maxX, worldMatrix) {
    let distanceY = 0;
    for (let iter = minY; iter < maxY; iter++) {
        if (worldMatrix[iter][maxX] === 0) {
            distanceY += 1;
        }
        else {
            distanceY += 10;
        }
    }
    return distanceY;
}

function FirstCalculateOptionForTwoStage(minX, maxX, minY, maxY, worldMatrix) {
    const distanceXFirstOption = CalculateDistanceXCoordByTheSmallestYCoord(minX, maxX, minY, worldMatrix);
    const distanceYFirstOption = CalculateDistanceYCoordByTheBiggestXCoord(minY, maxY, maxX, worldMatrix);

    const distanceXSecondOption = CalculateDistanceXCoordByTheBiggestYCoord(minX, maxX, maxY, worldMatrix);
    const distanceYSecondOption = CalculateDistanceYCoordByTheSmallestXCoord(minY, maxY, minX, worldMatrix);

    if ((distanceXFirstOption + distanceYFirstOption) > (distanceXSecondOption + distanceYSecondOption)) {
        return distanceXSecondOption + distanceYSecondOption;
    } else {
        return distanceXFirstOption + distanceYFirstOption;
    }
}

function SecondCalculateOptionForTwoStage(minX, maxX, minY, maxY, worldMatrix) {
    const distanceXFirstOption = CalculateDistanceXCoordByTheSmallestYCoord(minX, maxX, minY, worldMatrix);
    const distanceYFirstOption = CalculateDistanceYCoordByTheBiggestXCoord(minY, maxY, minX, worldMatrix);

    const distanceXSecondOption = CalculateDistanceXCoordByTheBiggestYCoord(minX, maxX, maxY, worldMatrix);
    const distanceYSecondOption = CalculateDistanceYCoordByTheSmallestXCoord(minY, maxY, maxX, worldMatrix);

    if ((distanceXFirstOption + distanceYFirstOption) > (distanceXSecondOption + distanceYSecondOption)) {
        return distanceXSecondOption + distanceYSecondOption;
    } else {
        return distanceXFirstOption + distanceYFirstOption;
    }
}

function CalculateDistance(coordsStart, coordsEnd, worldMatrix) {
    if (coordsStart.x <= coordsEnd.x && coordsStart.y <= coordsEnd.y) {
        return FirstCalculateOptionForTwoStage(coordsStart.x, coordsEnd.x, coordsStart.y, coordsEnd.y, worldMatrix);
    }
    if (coordsStart.x >= coordsEnd.x && coordsStart.y >= coordsEnd.y) {
        return FirstCalculateOptionForTwoStage(coordsEnd.x, coordsStart.x, coordsEnd.y, coordsStart.y, worldMatrix);
    }
    if (coordsStart.x >= coordsEnd.x && coordsStart.y <= coordsEnd.y) {
        return SecondCalculateOptionForTwoStage(coordsEnd.x, coordsStart.x, coordsStart.y, coordsEnd.y, worldMatrix);
    }
    if (coordsStart.x <= coordsEnd.x && coordsStart.y >= coordsEnd.y) {
        return SecondCalculateOptionForTwoStage(coordsStart.x, coordsEnd.x, coordsEnd.y, coordsStart.y, worldMatrix);
    }
    return -1;
}

function SetCoords(currentCords, coordsStart, iter) {
    switch (iter) {
        case 0:
            currentCords.x = coordsStart.x - 1;
            currentCords.y = coordsStart.y - 1;
            currentCords.diagonalMovement = true;
            break;
        case 1:
            currentCords.x = coordsStart.x;
            currentCords.y = coordsStart.y - 1;
            currentCords.diagonalMovement = false;
            break;
        case 2:
            currentCords.x = coordsStart.x + 1;
            currentCords.y = coordsStart.y - 1;
            currentCords.diagonalMovement = true;
            break;
        case 3:
            currentCords.x = coordsStart.x - 1;
            currentCords.y = coordsStart.y;
            currentCords.diagonalMovement = false;
            break;
        case 4:
            currentCords.x = coordsStart.x;
            currentCords.y = coordsStart.y;
            currentCords.diagonalMovement = false;
            break;
        case 5:
            currentCords.x = coordsStart.x + 1;
            currentCords.y = coordsStart.y;
            currentCords.diagonalMovement = false;
            break;
        case 6:
            currentCords.x = coordsStart.x - 1;
            currentCords.y = coordsStart.y + 1;
            currentCords.diagonalMovement = true;
            break;
        case 7:
            currentCords.x = coordsStart.x;
            currentCords.y = coordsStart.y + 1;
            currentCords.diagonalMovement = false;
            break;
        case 8:
            currentCords.x = coordsStart.x + 1;
            currentCords.y = coordsStart.y + 1;
            currentCords.diagonalMovement = true;
            break;
    }
}

function CreateCellForAlg(costPath, approximateCostPath, x, y, previousX, previousY) {
    return {
        costPath: costPath,
        approximateCostPath: approximateCostPath,
        x: x,
        y: y,
        previousX: previousX,
        previousY: previousY,
    }
}

function TheseCellsTheSame(cell1, cell2) {
    if (cell1.x === cell2.x && cell1.y === cell2.y) {
        return true;
    }
    return false;
}

function GetShortWay(coordsStart, coordsEnd, worldMatrix, cells, dimensions) {
    const calculatedCells = [];

    const dirtyShortWay = [];
    const consideredCells = [];
    
    const cellStart = CreateCellForAlg(0, -1, coordsStart.x, coordsStart.y, -1, -1);
    cellStart.approximateCostPath = CalculateDistance(coordsStart, coordsEnd, worldMatrix);
    dirtyShortWay.push(cellStart);

    const currentCoords = {
        x: 0,
        y: 0,
        diagonalMovement: false,
    };
    
    let pathHasBeenFound = false;
    while (!pathHasBeenFound) {
        const cellsAround = [];
        const previousCell = dirtyShortWay[dirtyShortWay.length - 1];
        for (let iter = 0; iter < 9; iter++) {
            SetCoords(currentCoords, { x: previousCell.x, y: previousCell.y }, iter);
            if (currentCoords.x < 0 || currentCoords.y < 0) {
                continue;
            }
            if (currentCoords.x > dimensions.x || currentCoords.y > dimensions.y) {
                continue;
            }
            if (currentCoords.x === previousCell.x && currentCoords.y === previousCell.y) {
                continue;
            }
            if (worldMatrix[currentCoords.y][currentCoords.x] !== 0) {
                continue;
            }
            const cell = CreateCellForAlg(0, -1, currentCoords.x, currentCoords.y, previousCell.x, previousCell.y);
            let costPath = 0;
            if (currentCoords.diagonalMovement) {
                costPath = 1.4;
            }
            else {
                costPath = 1;
            }
            let isCellConsidered = false;
            for (let iterForConsideredCell = 0; iterForConsideredCell < consideredCells.length; iterForConsideredCell++) {
                if (TheseCellsTheSame(consideredCells[iterForConsideredCell], cell)) {
                    isCellConsidered = true;
                    break;
                }
            }
            if (isCellConsidered) {
                continue;
            }
            cell.costPath = costPath + previousCell.costPath;
            cell.approximateCostPath = CalculateDistance({ x: cell.x, y: cell.y }, coordsEnd, worldMatrix);
            cellsAround.push(cell);
            calculatedCells.push(cell);
        }
        let cellWithTheSmallestPath = cellsAround[0];
        cellsAround.forEach(cell => {
            if ((cell.approximateCostPath + cell.costPath) <= (cellWithTheSmallestPath.costPath + cellWithTheSmallestPath.approximateCostPath)) {
                cellWithTheSmallestPath = cell;
            }
        })
        if (!cellWithTheSmallestPath) {
            pathHasBeenFound = true;
            break;
        }
        if (cellWithTheSmallestPath.x === coordsEnd.x && cellWithTheSmallestPath.y === coordsEnd.y) {
            pathHasBeenFound = true;
        }
        consideredCells.push(cellWithTheSmallestPath);
        let isCellCalculated = false;
        let calculatedCell;
        for (let iter = 0; iter < calculatedCells.length; iter++) {
            if (TheseCellsTheSame(cellWithTheSmallestPath, calculatedCells[iter])) {
                isCellCalculated = true;
                calculatedCell = calculatedCells[iter];
                break;
            }
        }
        if (isCellCalculated) {
            dirtyShortWay.push(calculatedCell);
        }
        else {
            dirtyShortWay.push(cellWithTheSmallestPath);
        }
    }

    const shortWay = [];
    shortWay.push(dirtyShortWay[dirtyShortWay.length - 1]);
    for (let iter = dirtyShortWay.length - 2; iter >= 0; iter--) {
        for (let iter2 = iter; iter2 >= 0; iter2--) {
            if (shortWay[shortWay.length - 1].previousX === dirtyShortWay[iter2].x && shortWay[shortWay.length - 1].previousY === dirtyShortWay[iter2].y) {
                shortWay.push(dirtyShortWay[iter2]);
                iter = iter2;
                break;
            }
        }
    }

    const reversedShortWay = shortWay.reverse();

    reversedShortWay.forEach((cellShortWay) => {
        cells[cellShortWay.y * dimensions.x + cellShortWay.x].okField();
    });

    return reversedShortWay;
}

function MoveSpriteToCell(xCoordMatrix, yCoordMatrix, cells, sprite, resolve, dimensions) {
    const ticker = new PIXI.Ticker;
    const speed = 10;

    const xCoord = GetXCoordFromMatrixWorld(xCoordMatrix, yCoordMatrix, cells, dimensions) - 5;
    const yCoord = GetYCoordFromMatrixWorld(xCoordMatrix, yCoordMatrix, cells, dimensions) - 7;

    let isSpriteMoveRight = sprite.x <= xCoord;
    let isSpriteMoveLeft = sprite.x >= xCoord;
    let isSpriteMoveDown = sprite.y <= yCoord;
    let isSpriteMoveUp = sprite.y >= yCoord;

    ticker.add((time) => {
        if (isSpriteMoveRight) {
            sprite.x += speed * time.deltaTime;
            if (sprite.x >= xCoord) {
                isSpriteMoveRight = !isSpriteMoveRight;
            }
        }
        if (isSpriteMoveLeft) {
            sprite.x -= speed * time.deltaTime;
            if (sprite.x <= xCoord) {
                isSpriteMoveLeft = !isSpriteMoveLeft;
            }
        }
        if (isSpriteMoveDown) {
            sprite.y += speed * time.deltaTime;
            if (sprite.y >= yCoord) {
                isSpriteMoveDown = !isSpriteMoveDown;
            }
        }
        if (isSpriteMoveUp) {
            sprite.y -= speed * time.deltaTime;
            if (sprite.y <= yCoord) {
                isSpriteMoveUp = !isSpriteMoveUp;
            }
        }
        sprite.zIndex = sprite.y;

        if (!isSpriteMoveRight && !isSpriteMoveLeft && !isSpriteMoveDown && !isSpriteMoveUp) {
            ticker.destroy();
            resolve();
        }

    })
    ticker.start();
}

async function MoveSprite(sprite, shortWay, cells, isShipSailingBack, resolve, dimensions) {
    if (!isShipSailingBack) {
        let iter = 0;
        while (iter < shortWay.length) {
            const promise = new Promise(function (resolve) {
                MoveSpriteToCell(shortWay[iter].x, shortWay[iter].y, cells, sprite, resolve, dimensions);
            });
            await Promise.all([promise]);
            iter++;
        }
    }
    else {
        let iter = shortWay.length - 1;
        while (iter >= 0) {
            const promise = new Promise(function (resolve) {
                MoveSpriteToCell(shortWay[iter].x, shortWay[iter].y, cells, sprite, resolve, dimensions);
            });
            await Promise.all([promise]);
            iter--;
        }
    }
    resolve();
}

export function GetCoordsOfBuildings(cells, coords, buildings, resolve, isBuildingPressed, containerForMap, clickedBuilding, dimensions) {
    document.addEventListener("pointerdown", function getCoordsFromMatrix(event) {
        if (Game.stage === 4) {
            let minDist = 99999;
            let minDistObject = null;
            buildings.forEach((building) => {
                if (mouseDistanceInContainer(event, building, containerForMap) < minDist && mouseIntersectsInContainer(event, building, containerForMap))
                {
                    minDist = mouseDistanceInContainer(event, building, containerForMap);
                    minDistObject = building;
                }
            })
            if (minDistObject) {
                isBuildingPressed.state = true;
                const index = cells.indexOf(minDistObject.__cellsStatus[4]);
                coords.x = index % dimensions.x;
                coords.y = (index - coords.x) / dimensions.x;
                clickedBuilding.building = minDistObject;
                resolve();
            }
            resolve();
        }
        else {
            resolve();
        }
        this.removeEventListener("pointerdown", getCoordsFromMatrix);
    });
}

let cellBefore = null;
export function MouseFollowingForShip(event, cells, coords, cellForShip, isThisRightCell, cellForShipFromMap, quadTree, resolve, dimensions) {
    if (cellForShip) {
        const position = {
            x: event.pageX,
            y: event.pageY,
        }

        // sprite.x = position.x - sprite.getBounds().width / 2;
        // sprite.y = position.y - sprite.getBounds().height / 2;

        cellForShip.setDirectPositions(position.x + 20 - 40, position.y + 20 - 40);

        let intersectedCells = quadTree.query(new Rect(cellForShip.x, cellForShip.y, 5, 5)) 
        if (cellBefore === null && intersectedCells.length > 0)
        {
            cellBefore = intersectedCells[0];
        }

        if (intersectedCells.length > 0)
        {
            if (intersectedCells[0] !== cellBefore)
            {
                cellBefore.changeType(cellBefore.getType());
                cellBefore = intersectedCells[0];
            }
            intersectedCells[0].errorField();
            if (Game.stage !== 4) {
                intersectedCells[0].changeType(intersectedCells[0].getType());
                resolve();
            }
            isThisRightCell.state = false;
            const index = cells.indexOf(intersectedCells[0]);
            console.log(index);
            let TopMiddleCellIsland = false;
            let MiddleLeftCellIsland = false;
            let MiddleRightCellIsland = false;
            let DownMiddleCellIsland = false;
            if (cells[index - dimensions.x]) {
                TopMiddleCellIsland = (cells[index - dimensions.x].getType() === 1 || cells[index - dimensions.x].getType() === 2);
            }
            if (cells[index - 1]) {
                MiddleLeftCellIsland = (cells[index - 1].getType() === 1 || cells[index - 1].getType() === 2);
            }
            if (cells[index + 1]) {
                MiddleRightCellIsland = (cells[index + 1].getType() === 1 || cells[index + 1].getType() === 2);
            }
            if (cells[index + dimensions.x]) {
                DownMiddleCellIsland = (cells[index + dimensions.x].getType() === 1 || cells[index + dimensions.x].getType() === 2);
            }
            if ((intersectedCells[0].getType() == 0) && (TopMiddleCellIsland || MiddleLeftCellIsland || MiddleRightCellIsland || DownMiddleCellIsland)) {
                intersectedCells[0].okField();
                cellForShipFromMap.cell = intersectedCells[0];
                coords.x = index % dimensions.x;
                coords.y = (index - coords.x) / dimensions.x;
                cells[coords.y * dimensions.x + coords.x].okField();
                isThisRightCell.state = true;
            }
        }
    }
}

export function ChoicePlaceForShip(app, stopMoving, isThisRightCell, cellForShip, cellForShipFromMap, resolve) {
    if (isThisRightCell.state) {
        stopMoving.state = true;
        cellForShipFromMap.cell.changeType(0);
        cellForShip = null;
        app.stage.on("pointermove", (event) => MouseFollowingForShip(event)).off("pointermove");
        resolve();
    }
}

export async function MoveSpriteToCoords(coordsEnd, coordsStart, cells, app, ships, worldMatrix, resolve, containerForMap) {
    const dimensions = {
        x: worldMatrix[0].length,
        y: worldMatrix.length,
    }

    const rect = new PIXI.Sprite();
    DrawShip(rect, app, ships, cells, "/../assets/textures/ship(yellowRectangle).svg", coordsStart.x, coordsStart.y, containerForMap, dimensions);
    const shortWay = GetShortWay(coordsStart, coordsEnd, worldMatrix, cells, dimensions);
    const promiseForward = new Promise(function (resolve) {
        MoveSprite(rect, shortWay, cells, false, resolve, dimensions);
    });
    await Promise.all([promiseForward]);
    resolve();
    // const promiseBack = new Promise(function(resolve) {
    //     MoveSprite(rect, shortWay, cells, true, resolve);
    // });
    // await Promise.all([promiseBack]);
}