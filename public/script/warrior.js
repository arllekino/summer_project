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


function GetShortWay(coordsStartWar, coordsEndWar, worldMatrix, cells, buildings) {
    const shortWay = [];

    const cellStart = CreateCellForAlg(0, -1, coordsStartWar.x, coordsStartWar.y, -1, -1);
    cellStart.approximateCostPath = CalculateDistance(coordsStartWar, coordsEndWar, worldMatrix, cells);
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
            SetCoords(currentCoords, { x: previousCell.x, y: previousCell.y }, iter);
            if (currentCoords.x < 0 || currentCoords.y < 0) {
                continue;
            }
            if (currentCoords.x === previousCell.x && currentCoords.y === previousCell.y) {
                continue;
            }
            if (worldMatrix[currentCoords.y][currentCoords.x] !== 1) {
                continue;
            }

            if (cells[currentCoords.x + currentCoords.y * 20].__ptrTower !== -1) {
                const buildingId = cells[currentCoords.x + currentCoords.y * 20].__ptrTower;
                const building = buildings[buildingId];
            
                if (building) {
                    console.log('Найдено здание:', building);
                    console.log('HP здания', building.__hp);
            
                    if (currentCoords.x === coordsEndWar.x && currentCoords.y === coordsEndWar.y) {
                        building.__hp -= 100;
                        console.log('HP здания', building.__hp);
            
                        if (building.__hp <= 0) {
                            building.__sprite.destroy();
                            buildings.splice(buildings.indexOf(building), 1);
                            cells[currentCoords.x + currentCoords.y * 20].__ptrTower = -1;
                        }
                    }
                    continue;
                }
                
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
            cell.approximateCostPath = CalculateDistance({ x: cell.x, y: cell.y }, coordsEndWar, worldMatrix, cells);
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
        cells[cellShortWay.y * 20 + cellShortWay.x].okField();
    });

    return shortWay;
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