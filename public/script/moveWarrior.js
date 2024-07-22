import { Warrior } from './classes/Warrior.js';

function GetXCoordFromMatrixWorld(numberOfCellX, numberOfCellY, cells) {
    return cells[numberOfCellY * 50 + numberOfCellX].getBounds().x + cells[numberOfCellY * 50 + numberOfCellX].getBounds().width / 2;
}

function GetYCoordFromMatrixWorld(numberOfCellX, numberOfCellY, cells) {
    return cells[numberOfCellY * 50 + numberOfCellX].getBounds().y + cells[numberOfCellY * 50 + numberOfCellX].getBounds().height / 2;
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
    if (cells[cellWithTheSmallestPath1.y * 50 + cellWithTheSmallestPath1.x].__ptrTower !== -1) {
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
            if (cells[currentCoords.y * 50 + currentCoords.x].__ptrTower !== -1) {
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
        return { x: cellWithTheSmallestPath.x, y: cellWithTheSmallestPath.y }
    }
    return { x: cellWithTheSmallestPath1.x, y: cellWithTheSmallestPath1.y }
}

function CalculateDistanceXCoordByTheSmallestYCoord(minX, maxX, minY, worldMatrix, cells) {
    let distanceX = 0;
    for (let iter = minX; iter < maxX; iter++) {
        let cellIndex = minY * 50 + iter;
        if (worldMatrix[minY][iter] === 1) {
            if (cells[cellIndex].__ptrTower === -1) {
                distanceX += 1;
            } else {
                distanceX += 5;
            }
        } else {
            distanceX += 10;
        }
    }
    return distanceX;
}

function CalculateDistanceXCoordByTheBiggestYCoord(minX, maxX, maxY, worldMatrix, cells) {
    let distanceX = 0;
    for (let iter = minX; iter < maxX; iter++) {
        let cellIndex = maxY * 50 + iter;
        if (worldMatrix[maxY][iter] === 1) {
            if (cells[cellIndex].__ptrTower === -1) {
                distanceX += 1;
            } else {
                distanceX += 5;
            }
        } else {
            distanceX += 10;
        }
    }
    return distanceX;
}

function CalculateDistanceYCoordByTheSmallestXCoord(minY, maxY, minX, worldMatrix, cells) {
    let distanceY = 0;
    for (let iter = minY; iter < maxY; iter++) {
        let cellIndex = iter * 50 + minX;
        if (worldMatrix[iter][minX] === 1) {
            if (cells[cellIndex].__ptrTower === -1) {
                distanceY += 1;
            } else {
                distanceY += 5;
            }
        } else {
            distanceY += 10;
        }
    }
    return distanceY;
}

function CalculateDistanceYCoordByTheBiggestXCoord(minY, maxY, maxX, worldMatrix, cells) {
    let distanceY = 0;
    for (let iter = minY; iter < maxY; iter++) {
        let cellIndex = iter * 50 + maxX;
        if (worldMatrix[iter][maxX] === 1) {
            if (cells[cellIndex].__ptrTower === -1) {
                distanceY += 1;
            } else {
                distanceY += 5;
            }
        } else {
            distanceY += 10;
        }
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
            if (cells[currentCoords.x + currentCoords.y * 50].__ptrTower !== -1) {
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

    // reversedShortWay.forEach((cellShortWay) => {
    //     cells[cellShortWay.y * 50 + cellShortWay.x].okField();
    // });

    return reversedShortWay;
}

async function DestroyBuilding(app, buildings, clickedBuilding, warriors, shortWay, cells) {
    if (clickedBuilding.building) {
        console.log('HP здания:', clickedBuilding.building.__hp);

        const hpText = new PIXI.Text(`${clickedBuilding.building.name}: ${clickedBuilding.building.__hp}`, {
            fontSize: 16,
            fill: 0xffff00,
            align: 'center'
        });
        hpText.zIndex = 500;
        hpText.x = clickedBuilding.building.__sprite.x + clickedBuilding.building.__sprite.width / 2 - hpText.width / 2;
        hpText.y = clickedBuilding.building.__sprite.y - 5;
        app.stage.addChild(hpText);

        await new Promise(resolve => setTimeout(resolve, 200)); // Ждем 300 мс, чтобы текст с HP был виден

        while (clickedBuilding.building.__hp > 0 && clickedBuilding.building.__sprite) {
            for (const warrior of warriors) {
                // Проверяем, не больше ли урон воина, чем HP здания
                const damageToApply = Math.min(warrior.damage, clickedBuilding.building.__hp);

                await warrior.attack(clickedBuilding.building, damageToApply);
                console.log('HP здания после атаки:', clickedBuilding.building.__hp);
                hpText.text = `${clickedBuilding.building.name}: ${clickedBuilding.building.__hp}`;

                // Анимация урона
                const damageText = new PIXI.Text(`-${damageToApply}`, {
                    fontSize: 16,
                    fill: 0xff0000,
                    align: 'center',
                    alpha: 0,
                    fontWeight: 'bold'
                });
                damageText.zIndex = 501;
                damageText.x = clickedBuilding.building.__sprite.x + clickedBuilding.building.__sprite.width / 2 - damageText.width / 2;
                damageText.y = clickedBuilding.building.__sprite.y - 5 - 20;
                app.stage.addChild(damageText);

                for (let i = 0; i <= 10; i++) {
                    damageText.alpha = i / 10;
                    await new Promise(resolve => setTimeout(resolve, 20));
                }
                await new Promise(resolve => setTimeout(resolve, 200));

                for (let i = 10; i >= 0; i--) {
                    damageText.alpha = i / 10;
                    await new Promise(resolve => setTimeout(resolve, 20));
                }
                app.stage.removeChild(damageText);
                if (clickedBuilding.building.__hp <= 0) {
                    break; // Выход из цикла, если HP здания <= 0
                }
            }
        }
        app.stage.removeChild(hpText);

        for (const warrior of warriors) {
            warrior.sprite.visible = true;
            warrior.attackSprite.visible = false;
        }

        await animateBuildingDestruction(clickedBuilding.building.__sprite);
        clickedBuilding.building.__sprite.destroy();
        buildings.splice(buildings.indexOf(clickedBuilding.building), 1);

        for (const cellId in clickedBuilding.building.__cellsStatus) {
            clickedBuilding.building.__cellsStatus[cellId].setPtrTower(-1);
        }

        const promiseBack = new Promise(function (resolve) {
            MoveSprite(app, shortWay, cells, buildings, true, resolve, clickedBuilding, warriors);
        });
        await Promise.all([promiseBack]);

        for (const warrior of warriors) {
            warrior.destroy(app);
        }
    }
}

async function animateBuildingDestruction(buildingSprite) {
    const textureBackground = await PIXI.Assets.load("/../../assets/textures/debris.png");
    const debrisSprite = new PIXI.Sprite(textureBackground);
    debrisSprite.anchor.set(0.5);
    debrisSprite.zIndex = 600;
    debrisSprite.x = buildingSprite.x + buildingSprite.width / 2 - debrisSprite.width / 2 + 20;
    debrisSprite.y = buildingSprite.y + buildingSprite.height / 2 - debrisSprite.height / 2;

    debrisSprite.scale.set(buildingSprite.width / debrisSprite.width, buildingSprite.height / debrisSprite.height);

    // Случайное вращение обломков
    debrisSprite.rotation = Math.random() * Math.PI * 2;

    buildingSprite.parent.addChild(debrisSprite);

    // Анимация
    for (let i = 1; i >= 0; i -= 0.1) {
        buildingSprite.alpha = i;
        // Вращение обломков
        debrisSprite.rotation += 0.005;
        await new Promise(resolve => setTimeout(resolve, 50)); // Задержка 50 мс
    }
    debrisSprite.destroy();
}


function MoveSpriteToCell(xCoordMatrix, yCoordMatrix, cells, resolve, warriors) {
    const speed = 0.6;
    const targetX = GetXCoordFromMatrixWorld(xCoordMatrix, yCoordMatrix, cells) - 5;
    const targetY = GetYCoordFromMatrixWorld(xCoordMatrix, yCoordMatrix, cells) - 7;

    const groupSize = 3;
    const groups = [];
    let currentGroup = [];
    for (let i = 0; i < warriors.length; i++) {
        currentGroup.push(warriors[i]);

        if (currentGroup.length === groupSize) {
            groups.push(currentGroup);
            currentGroup = [];
        }
    }
    if (currentGroup.length > 0) {
        groups.push(currentGroup);
    }

    let allWarriorsReached = false;

    const ticker = new PIXI.Ticker();
    ticker.add((time) => {
        allWarriorsReached = true;

        groups.forEach((group, groupIndex) => {
            let offsetX = 0; // Смещение по X для каждой группы
            let offsetY = 0; // Смещение по Y для каждой группы

            // Смещение относительно предыдущей группы
            if (groupIndex > 0) {
                const previousGroup = groups[groupIndex - 1];
                const previousLeaderSprite = previousGroup[0].getSprite(); // Спрайт лидера предыдущей группы

                // Смещение по X в разные стороны
                offsetX = (groupIndex % 2 === 0) ? 5 : -5; // Вправо для четных, влево для нечетных групп
                offsetY = previousLeaderSprite.y - targetY + 5 * groupIndex; // Смещение по Y относительно предыдущего лидера
            }

            group.forEach((warrior, index) => {
                const sprite = warrior.getSprite();

                // Смещение в разные стороны (внутри группы)
                let internalOffsetX = 0;
                if (index === 0) {
                    internalOffsetX = -5; // Левый воин
                } else if (index === 2) {
                    internalOffsetX = 5; // Правый воин
                }

                // Движение воина к целевой позиции с учетом смещения
                const dx = targetX + offsetX + internalOffsetX - sprite.x;
                const dy = targetY + offsetY - sprite.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance > 1) {
                    sprite.x += dx / distance * speed * time.deltaTime;
                    sprite.y += dy / distance * speed * time.deltaTime;
                    allWarriorsReached = false;
                }
            });
        });

        if (allWarriorsReached) {
            ticker.destroy();
            resolve();
        }
    });

    ticker.start();
}

async function MoveSprite(app, shortWay, cells, buildings, isWarriorSailingBack, resolve, clickedBuilding, warriors) {
    if (!isWarriorSailingBack) {
        for (let iter = 0; iter < shortWay.length; iter++) {
            await new Promise(resolve => {
                MoveSpriteToCell(shortWay[iter].x, shortWay[iter].y, cells, resolve, warriors);
            });

            if (iter === shortWay.length - 1) {
                DestroyBuilding(app, buildings, clickedBuilding, warriors, shortWay, cells);
            }
        }
    } else {
        for (let iter = shortWay.length - 1; iter >= 0; iter--) {
            await new Promise(resolve => {
                MoveSpriteToCell(shortWay[iter].x, shortWay[iter].y, cells, resolve, warriors);
            });
        }
    }
    resolve();
}

export async function MoveWarrior(coordsEndWar, coordsStartWar, cells, app, worldMatrix, buildings, clickedBuilding, warriors) {
    const x = GetXCoordFromMatrixWorld(coordsStartWar.x, coordsStartWar.y, cells) - 5;
    const y = GetYCoordFromMatrixWorld(coordsStartWar.x, coordsStartWar.y, cells) - 7;

    const numWarriors = 5;
    const warriorGroup = [];

    for (let i = 0; i < numWarriors; i++) {
        const warrior = new Warrior(app, "war", x, y, 40, 3 + i);
        warriorGroup.push(warrior)
        warriors.push(warrior);
    }
    const shortWay = GetShortWay(coordsStartWar, coordsEndWar, worldMatrix, cells);
    const promiseForward = new Promise(function (resolve) {
        MoveSprite(app, shortWay, cells, buildings, false, resolve, clickedBuilding, warriorGroup);
    });
    await Promise.all([promiseForward]);
}