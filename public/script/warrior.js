function GetXCoordFromMatrixWorld(numberOfCellX, numberOfCellY, cells) {
    return cells[numberOfCellY * 20 + numberOfCellX].getBounds().x + cells[numberOfCellY * 20 + numberOfCellX].getBounds().width / 2;
}

function GetYCoordFromMatrixWorld(numberOfCellX, numberOfCellY, cells) {
    return cells[numberOfCellY * 20 + numberOfCellX].getBounds().y + cells[numberOfCellY * 20 + numberOfCellX].getBounds().height / 2;
}

async function DrawWarrior(warrior, app, cells, pathToFile, numberOfCellX, numberOfCellY) {
    const x = GetXCoordFromMatrixWorld(numberOfCellX, numberOfCellY, cells) - 5;
    const y = GetYCoordFromMatrixWorld(numberOfCellX, numberOfCellY, cells) - 7;

    const textureIcon = await PIXI.Assets.load(pathToFile);
    warrior.texture = textureIcon;
    warrior.x = x;
    warrior.y = y;

    app.stage.addChild(warrior);
}

export function ChoiceEndCoords(coordsBuildings, coordsOfShip, worldMatrix, cells) {
    console.log(coordsBuildings, coordsOfShip);
    const currentCoords = {
        x: 0,
        y: 0,
        diagonalMovement: false,
    };
    const cellsAround = [];
    for (let iter = 0; iter < 9; iter++) {
        SetCoords(currentCoords, coordsBuildings, iter);
        if (currentCoords.x === coordsBuildings.x && currentCoords.y === coordsBuildings.y) {
            continue;
        }
        const cell = CreateCellForAlg(0, -1, currentCoords.x, currentCoords.y, coordsBuildings.x, coordsBuildings.y);
        let costPath = 0;
        if (currentCoords.diagonalMovement) {
            costPath = 1.4;
        }
        else {
            costPath = 1;
        }
        cell.costPath = costPath;
        cell.approximateCostPath = CalculateDistance({ x: cell.x, y: cell.y }, coordsOfShip, worldMatrix, cells);
        cellsAround.push(cell);
    }
    let cellWithTheSmallestPath1 = cellsAround[0];
    cellsAround.forEach(cell => {
        if ((cell.approximateCostPath + cell.costPath) <= (cellWithTheSmallestPath1.costPath + cellWithTheSmallestPath1.approximateCostPath)) {
            cellWithTheSmallestPath1 = cell;
        }
    })
    if (cells[cellWithTheSmallestPath1.y * 20 + cellWithTheSmallestPath1.x].__ptrTower !== -1) {
        const currentCoords = {
            x: 0,
            y: 0,
            diagonalMovement: false,
        };
        const cellsAround = [];
        for (let iter = 0; iter < 9; iter++) {
            SetCoords(currentCoords, cellWithTheSmallestPath1, iter);
            if (currentCoords.x === cellWithTheSmallestPath1.x && currentCoords.y === cellWithTheSmallestPath1.y) {
                continue;
            }
            if (worldMatrix[currentCoords.y][currentCoords.x] === 0) {
                continue;
            }
            if (cells[currentCoords.y * 20 + currentCoords.x].__ptrTower !== -1) {
                continue;
            }
            const cell = CreateCellForAlg(0, -1, currentCoords.x, currentCoords.y, cellWithTheSmallestPath1.x, cellWithTheSmallestPath1.y);
            let costPath = 0;
            if (currentCoords.diagonalMovement) {
                costPath = 1.4;
            }
            else {
                costPath = 1;
            }
            cell.costPath = costPath + cellWithTheSmallestPath1.costPath;
            cell.approximateCostPath = CalculateDistance({ x: cell.x, y: cell.y }, coordsOfShip, worldMatrix, cells);
            cellsAround.push(cell);
        }
        let cellWithTheSmallestPath = cellsAround[0];
        cellsAround.forEach(cell => {
            if ((cell.approximateCostPath + cell.costPath) <= (cellWithTheSmallestPath.costPath + cellWithTheSmallestPath.approximateCostPath)) {
                cellWithTheSmallestPath = cell;
            }
        })
        return {x: cellWithTheSmallestPath.x, y: cellWithTheSmallestPath.y}
    }
    return {x: cellWithTheSmallestPath1.x, y: cellWithTheSmallestPath1.y}
}

function CalculateDistanceXCoordByTheSmallestYCoord(minX, maxX, minY, worldMatrix, cells) {
    let distanceX = 0;
    for (let iter = minX; iter < maxX; iter++) {
        let cellIndex = minY * 20 + iter;
        if (worldMatrix[minY][iter] === 1) {
            if (cells[cellIndex].__ptrTower === -1) {
                distanceX += 1;
            } else {
                distanceX += 5;
            }
        } else {
            distanceX += 10;
        }
        // if (worldMatrix[minY][iter] === 1) {
        //     distanceX += 1;
        // } else {
        //     distanceX += 10;
        // }
    }

    return distanceX;
}

function CalculateDistanceXCoordByTheBiggestYCoord(minX, maxX, maxY, worldMatrix, cells) {
    let distanceX = 0;
    for (let iter = minX; iter < maxX; iter++) {
        let cellIndex = maxY * 20 + iter;
        if (worldMatrix[maxY][iter] === 1) {
            if (cells[cellIndex].__ptrTower === -1) {
                distanceX += 1;
            } else {
                distanceX += 5;
            }
        } else {
            distanceX += 10;
        }
        // if (worldMatrix[maxY][iter] === 1) {
        //     distanceX += 1;
        // } else {
        //     distanceX += 10;
        // }
    }
    return distanceX;
}

function CalculateDistanceYCoordByTheSmallestXCoord(minY, maxY, minX, worldMatrix, cells) {
    let distanceY = 0;
    for (let iter = minY; iter < maxY; iter++) {
        let cellIndex = iter * 20 + minX;
        if (worldMatrix[iter][minX] === 1) {
            if (cells[cellIndex].__ptrTower === -1) {
                distanceY += 1;
            } else {
                distanceY += 5;
            }
        } else {
            distanceY += 10;
        }
        // if (worldMatrix[iter][minX] === 1) {
        //     distanceY += 1;
        // } else {
        //     distanceY += 10;
        // }
    }
    return distanceY;
}

function CalculateDistanceYCoordByTheBiggestXCoord(minY, maxY, maxX, worldMatrix, cells) {
    let distanceY = 0;
    for (let iter = minY; iter < maxY; iter++) {
        let cellIndex = iter * 20 + maxX;
        if (worldMatrix[iter][maxX] === 1) {
            if (cells[cellIndex].__ptrTower === -1) {
                distanceY += 1;
            } else {
                distanceY += 5;
            }
        } else {
            distanceY += 10;
        }
        // if (worldMatrix[iter][maxX] === 1) {
        //     distanceY += 1;
        // } else {
        //     distanceY += 10;
        // }
    }
    return distanceY;
}

function FirstCalculateOptionForTwoStage(minX, maxX, minY, maxY, worldMatrix, cells) {
    const distanceXFirstOption = CalculateDistanceXCoordByTheSmallestYCoord(minX, maxX, minY, worldMatrix, cells);
    const distanceYFirstOption = CalculateDistanceYCoordByTheBiggestXCoord(minY, maxY, maxX, worldMatrix, cells);

    const distanceXSecondOption = CalculateDistanceXCoordByTheBiggestYCoord(minX, maxX, maxY, worldMatrix, cells);
    const distanceYSecondOption = CalculateDistanceYCoordByTheSmallestXCoord(minY, maxY, minX, worldMatrix, cells);

    if ((distanceXFirstOption + distanceYFirstOption) > (distanceXSecondOption + distanceYSecondOption)) {
        return distanceXSecondOption + distanceYSecondOption;
    } else {
        return distanceXFirstOption + distanceYFirstOption;
    }
}

function SecondCalculateOptionForTwoStage(minX, maxX, minY, maxY, worldMatrix, cells) {
    const distanceXFirstOption = CalculateDistanceXCoordByTheSmallestYCoord(minX, maxX, minY, worldMatrix, cells);
    const distanceYFirstOption = CalculateDistanceYCoordByTheBiggestXCoord(minY, maxY, minX, worldMatrix, cells);

    const distanceXSecondOption = CalculateDistanceXCoordByTheBiggestYCoord(minX, maxX, maxY, worldMatrix, cells);
    const distanceYSecondOption = CalculateDistanceYCoordByTheSmallestXCoord(minY, maxY, maxX, worldMatrix, cells);

    if ((distanceXFirstOption + distanceYFirstOption) > (distanceXSecondOption + distanceYSecondOption)) {
        return distanceXSecondOption + distanceYSecondOption;
    } else {
        return distanceXFirstOption + distanceYFirstOption;
    }
}

function CalculateDistance(coordsStartWar, coordsEndWar, worldMatrix, cells) {
    if (coordsStartWar.x <= coordsEndWar.x && coordsStartWar.y <= coordsEndWar.y) {
        return FirstCalculateOptionForTwoStage(coordsStartWar.x, coordsEndWar.x, coordsStartWar.y, coordsEndWar.y, worldMatrix, cells);
    }
    if (coordsStartWar.x >= coordsEndWar.x && coordsStartWar.y >= coordsEndWar.y) {
        return FirstCalculateOptionForTwoStage(coordsEndWar.x, coordsStartWar.x, coordsEndWar.y, coordsStartWar.y, worldMatrix, cells);
    }
    if (coordsStartWar.x >= coordsEndWar.x && coordsStartWar.y <= coordsEndWar.y) {
        return SecondCalculateOptionForTwoStage(coordsEndWar.x, coordsStartWar.x, coordsStartWar.y, coordsEndWar.y, worldMatrix, cells);
    }
    if (coordsStartWar.x <= coordsEndWar.x && coordsStartWar.y >= coordsEndWar.y) {
        return SecondCalculateOptionForTwoStage(coordsStartWar.x, coordsEndWar.x, coordsEndWar.y, coordsStartWar.y, worldMatrix, cells);
    }
    return -1;
}

function SetCoords(currentCords, coordsStartWar, iter) {
    switch (iter) {
        case 0:
            currentCords.x = coordsStartWar.x - 1;
            currentCords.y = coordsStartWar.y - 1;
            currentCords.diagonalMovement = true;
            break;
        case 1:
            currentCords.x = coordsStartWar.x;
            currentCords.y = coordsStartWar.y - 1;
            currentCords.diagonalMovement = false;
            break;
        case 2:
            currentCords.x = coordsStartWar.x + 1;
            currentCords.y = coordsStartWar.y - 1;
            currentCords.diagonalMovement = true;
            break;
        case 3:
            currentCords.x = coordsStartWar.x - 1;
            currentCords.y = coordsStartWar.y;
            currentCords.diagonalMovement = false;
            break;
        case 4:
            currentCords.x = coordsStartWar.x;
            currentCords.y = coordsStartWar.y;
            currentCords.diagonalMovement = false;
            break;
        case 5:
            currentCords.x = coordsStartWar.x + 1;
            currentCords.y = coordsStartWar.y;
            currentCords.diagonalMovement = false;
            break;
        case 6:
            currentCords.x = coordsStartWar.x - 1;
            currentCords.y = coordsStartWar.y + 1;
            currentCords.diagonalMovement = true;
            break;
        case 7:
            currentCords.x = coordsStartWar.x;
            currentCords.y = coordsStartWar.y + 1;
            currentCords.diagonalMovement = false;
            break;
        case 8:
            currentCords.x = coordsStartWar.x + 1;
            currentCords.y = coordsStartWar.y + 1;
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

function GetShortWay(coordsStartWar, coordsEndWar, worldMatrix, cells) {
    const calculatedCells = [];

    const dirtyShortWay = [];
    const consideredCells = [];

    const cellStart = CreateCellForAlg(0, -1, coordsStartWar.x, coordsStartWar.y, -1, -1);
    cellStart.approximateCostPath = CalculateDistance(coordsStartWar, coordsEndWar, worldMatrix, cells);
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
            if (currentCoords.x === previousCell.x && currentCoords.y === previousCell.y) {
                continue;
            }
            if (worldMatrix[currentCoords.y][currentCoords.x] !== 1 && worldMatrix[currentCoords.y][currentCoords.x] !== 2) {
                continue;
            }
            if (cells[currentCoords.x + currentCoords.y * 20].__ptrTower !== -1) {
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
            cell.approximateCostPath = CalculateDistance({ x: cell.x, y: cell.y }, coordsEndWar, worldMatrix, cells);
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
        if (cellWithTheSmallestPath.x === coordsEndWar.x && cellWithTheSmallestPath.y === coordsEndWar.y) {
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
        debugger;
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
        cells[cellShortWay.y * 20 + cellShortWay.x].okField();
    });

    return reversedShortWay;
}

function MoveSpriteToCell(xCoordMatrix, yCoordMatrix, cells, warrior, resolve) {
    const ticker = new PIXI.Ticker;
    const speed = 0.8;

    const xCoord = GetXCoordFromMatrixWorld(xCoordMatrix, yCoordMatrix, cells) - 5;
    const yCoord = GetYCoordFromMatrixWorld(xCoordMatrix, yCoordMatrix, cells) - 7;

    let isSpriteMoveRight = warrior.x <= xCoord;
    let isSpriteMoveLeft = warrior.x >= xCoord;
    let isSpriteMoveDown = warrior.y <= yCoord;
    let isSpriteMoveUp = warrior.y >= yCoord;

    ticker.add((time) => {
        if (isSpriteMoveRight) {
            warrior.x += speed * time.deltaTime;
            if (warrior.x >= xCoord) {
                isSpriteMoveRight = !isSpriteMoveRight;
            }
        }
        if (isSpriteMoveLeft) {
            warrior.x -= speed * time.deltaTime;
            if (warrior.x <= xCoord) {
                isSpriteMoveLeft = !isSpriteMoveLeft;
            }
        }
        if (isSpriteMoveDown) {
            warrior.y += speed * time.deltaTime;
            if (warrior.y >= yCoord) {
                isSpriteMoveDown = !isSpriteMoveDown;
            }
        }
        if (isSpriteMoveUp) {
            warrior.y -= speed * time.deltaTime;
            if (warrior.y <= yCoord) {
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

async function MoveSprite(warrior, shortWay, cells, isShipSailingBack, resolve) {
    if (!isShipSailingBack) {
        let iter = 0;
        while (iter < shortWay.length) {
            const promise = new Promise(function (resolve) {
                MoveSpriteToCell(shortWay[iter].x, shortWay[iter].y, cells, warrior, resolve);
            });
            await Promise.all([promise]);
            iter++;
        }
    }
    else {
        let iter = shortWay.length - 1;
        while (iter >= 0) {
            const promise = new Promise(function (resolve) {
                MoveSpriteToCell(shortWay[iter].x, shortWay[iter].y, cells, warrior, resolve);
            });
            await Promise.all([promise]);
            iter--;
        }
    }
    resolve();
}

export async function MoveWarrior(coordsEndWar, coordsStartWar, cells, app, worldMatrix, buildings) {
    const warrior = new PIXI.Sprite();
    DrawWarrior(warrior, app, cells, "/../assets/textures/warrior.jpg", coordsStartWar.x, coordsStartWar.y);
    const shortWay = GetShortWay(coordsStartWar, coordsEndWar, worldMatrix, cells, buildings);

    const promiseForward = new Promise(function (resolve) {
        MoveSprite(warrior, shortWay, cells, false, resolve);
    });
    await Promise.all([promiseForward]);
}