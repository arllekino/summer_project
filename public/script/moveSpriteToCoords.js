function GetXCoordFromMatrixWorld(numberOfCellX, numberOfCellY, cells) {
    return cells[numberOfCellY * 20 + numberOfCellX].getBounds().x + cells[numberOfCellY * 20 + numberOfCellX].getBounds().width / 2;
}

function GetYCoordFromMatrixWorld(numberOfCellX, numberOfCellY, cells) {
    return cells[numberOfCellY * 20 + numberOfCellX].getBounds().y + cells[numberOfCellY * 20 + numberOfCellX].getBounds().height / 2;
}

async function DrawShip(sprite, app, ships, cells, pathToFile, numberOfCellX, numberOfCellY) {
    const x = GetXCoordFromMatrixWorld(numberOfCellX, numberOfCellY, cells) - 5;
    const y = GetYCoordFromMatrixWorld(numberOfCellX, numberOfCellY, cells) - 7;

    const textureIcon = await PIXI.Assets.load(pathToFile);
    sprite.texture = textureIcon;

    sprite.x = x;
    sprite.y = y;

    ships.push(sprite);
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

function GetShortWay(coordsStart, coordsEnd, worldMatrix, cells) {
    const shortWay = [];

    const cellStart = CreateCellForAlg(0, -1, coordsStart.x, coordsStart.y, -1, -1);
    cellStart.approximateCostPath = CalculateDistance(coordsStart, coordsEnd, worldMatrix);
    shortWay.push(cellStart);

    const currentCoords = {
        x: 0,
        y: 0,
        diagonalMovement: false,
    };

    let pathHasBeenFound = false;
    while (!pathHasBeenFound) {
        const cellsAround = [];
        const previousCell = shortWay[shortWay.length - 1];
        for (let iter = 0; iter < 9; iter++) {
            SetCoords(currentCoords, {x: previousCell.x, y: previousCell.y}, iter);
            if (currentCoords.x < 0 || currentCoords.y < 0) {
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
            cell.costPath = costPath + previousCell.costPath;
            cell.approximateCostPath = CalculateDistance({x: cell.x, y: cell.y}, coordsEnd, worldMatrix);
            cellsAround.push(cell);
        }
        let cellWithTheSmallestPath = cellsAround[0];
        cellsAround.forEach(cell => {
            if ((cell.approximateCostPath + cell.costPath) <= (cellWithTheSmallestPath.costPath + cellWithTheSmallestPath.approximateCostPath)) {
                cellWithTheSmallestPath = cell;
            }
        })
        if (previousCell.approximateCostPath <= cellWithTheSmallestPath.approximateCostPath) {
            pathHasBeenFound = true;
        }
        else {
            shortWay.push(cellWithTheSmallestPath);
        }
    }
    
    shortWay.forEach((cellShortWay) => {
        cells[cellShortWay.y * 20 + cellShortWay.x].errorField();
    });

    return shortWay;
}

function MoveSpriteToCell(xCoordMatrix, yCoordMatrix, cells, sprite, resolve) {
    const ticker = new PIXI.Ticker;
    const speed = 0.8;
    
    const xCoord = GetXCoordFromMatrixWorld(xCoordMatrix, yCoordMatrix, cells) - 5;
    const yCoord = GetYCoordFromMatrixWorld(xCoordMatrix, yCoordMatrix, cells) - 7;

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
        
        if (!isSpriteMoveRight && !isSpriteMoveLeft && !isSpriteMoveDown && !isSpriteMoveUp) {
            ticker.destroy();
            resolve();
        }
        
	})
    ticker.start();
}

async function MoveSprite(sprite, shortWay, cells, isShipSailingBack, resolve) {
    if (!isShipSailingBack) {
        let iter = 0;
        while (iter < shortWay.length) {
            const promise = new Promise(function(resolve) {
                MoveSpriteToCell(shortWay[iter].x, shortWay[iter].y, cells, sprite, resolve);
            });
            await Promise.all([promise]);
            iter++;
        }
    }
    else {
        let iter = shortWay.length - 1;
        while (iter >= 0) {
            const promise = new Promise(function(resolve) {
                MoveSpriteToCell(shortWay[iter].x, shortWay[iter].y, cells, sprite, resolve);
            });
            await Promise.all([promise]);
            iter--;
        }
    }
    resolve();
}

export async function MoveSpriteToCoords(coordsEnd, coordsStart, cells, app, ships, worldMatrix) {
    const rect = new PIXI.Sprite();
    DrawShip(rect, app, ships, cells, "/../assets/textures/ship(yellowRectangle).svg", coordsStart.x, coordsStart.y);
    const shortWay = GetShortWay(coordsStart, coordsEnd, worldMatrix, cells);

    const promiseForward = new Promise(function(resolve) {
        MoveSprite(rect, shortWay, cells, false, resolve);
    });
    await Promise.all([promiseForward]);

    // const promiseBack = new Promise(function(resolve) {
    //     MoveSprite(rect, shortWay, cells, true, resolve);
    // });
    // await Promise.all([promiseBack]);
}