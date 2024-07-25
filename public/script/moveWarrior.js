import { mouseDistanceInContainer, mouseIntersectsInContainer } from './classes/CommonFunctions.js';
import { Warrior } from './classes/Warrior.js';
<<<<<<< HEAD
import { updateIsland } from './gameRequsets.js';
import { UpdateNumberOfResources } from "./drawInfoBlocks.js";
=======
>>>>>>> parent of 97d43ca (fixed)

function GetXCoordFromMatrixWorld(numberOfCellX, numberOfCellY, cells, dimensions) {
    return cells[numberOfCellY * dimensions.x + numberOfCellX].getBounds().x + cells[numberOfCellY * dimensions.x + numberOfCellX].getBounds().width / 2;
}

function GetYCoordFromMatrixWorld(numberOfCellX, numberOfCellY, cells, dimensions) {
    return cells[numberOfCellY * dimensions.x + numberOfCellX].getBounds().y + cells[numberOfCellY * dimensions.x + numberOfCellX].getBounds().height / 2;
}

async function DrawWarrior(warrior, app, cells, pathToFile, numberOfCellX, numberOfCellY, dimensions) {
    const x = GetXCoordFromMatrixWorld(numberOfCellX, numberOfCellY, cells, dimensions) - 5;
    const y = GetYCoordFromMatrixWorld(numberOfCellX, numberOfCellY, cells, dimensions) - 7;

    const textureIcon = await PIXI.Assets.load(pathToFile);
    warrior.texture = textureIcon;
    warrior.x = x;
    warrior.y = y;

    app.stage.addChild(warrior);
}

export function MakeIslandWarriorsOfPlayer(app, countOfWarriors, warriorsOfAllUser, buildingCastle, colorFlag) {
    let xForEnemy = 0, yForEnemy = 0;
    if (buildingCastle) {
        xForEnemy = buildingCastle.__cellsStatus[4].x;
        yForEnemy = buildingCastle.__cellsStatus[4].y;
    }

    for (let i = 0; i < countOfWarriors; i++) {
        const warrior = new Warrior(app, "war", xForEnemy, yForEnemy, 40, 3 + i, colorFlag);
        warriorsOfAllUser.warriorsOfIsland.push(warrior)
    }
}

export function ChoiceEndCoords(coordsBuildings, coordsOfShip, worldMatrix, cells) {
    const dimensions = {
        x: worldMatrix[0].length,
        y: worldMatrix.length,
    }
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
        cell.approximateCostPath = CalculateDistance({ x: cell.x, y: cell.y }, coordsOfShip, worldMatrix, cells, dimensions);
        cellsAround.push(cell);
    }
    let cellWithTheSmallestPath1 = cellsAround[0];
    cellsAround.forEach(cell => {
        if ((cell.approximateCostPath + cell.costPath) <= (cellWithTheSmallestPath1.costPath + cellWithTheSmallestPath1.approximateCostPath)) {
            cellWithTheSmallestPath1 = cell;
        }
    })
    if (cells[cellWithTheSmallestPath1.y * dimensions.x + cellWithTheSmallestPath1.x].__ptrTower !== -1) {
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
            if (cells[currentCoords.y * dimensions.x + currentCoords.x].__ptrTower !== -1) {
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
            cell.approximateCostPath = CalculateDistance({ x: cell.x, y: cell.y }, coordsOfShip, worldMatrix, cells, dimensions);
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

function CalculateDistanceXCoordByTheSmallestYCoord(minX, maxX, minY, worldMatrix, cells, dimensions) {
    let distanceX = 0;
    for (let iter = minX; iter < maxX; iter++) {
        let cellIndex = minY * dimensions.x + iter;
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

function CalculateDistanceXCoordByTheBiggestYCoord(minX, maxX, maxY, worldMatrix, cells, dimensions) {
    let distanceX = 0;
    for (let iter = minX; iter < maxX; iter++) {
        let cellIndex = maxY * dimensions.x + iter;
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

function CalculateDistanceYCoordByTheSmallestXCoord(minY, maxY, minX, worldMatrix, cells, dimensions) {
    let distanceY = 0;
    for (let iter = minY; iter < maxY; iter++) {
        let cellIndex = iter * dimensions.x + minX;
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

function CalculateDistanceYCoordByTheBiggestXCoord(minY, maxY, maxX, worldMatrix, cells, dimensions) {
    let distanceY = 0;
    for (let iter = minY; iter < maxY; iter++) {
        let cellIndex = iter * dimensions.x + maxX;
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

function FirstCalculateOptionForTwoStage(minX, maxX, minY, maxY, worldMatrix, cells, dimensions) {
    const distanceXFirstOption = CalculateDistanceXCoordByTheSmallestYCoord(minX, maxX, minY, worldMatrix, cells, dimensions);
    const distanceYFirstOption = CalculateDistanceYCoordByTheBiggestXCoord(minY, maxY, maxX, worldMatrix, cells, dimensions);

    const distanceXSecondOption = CalculateDistanceXCoordByTheBiggestYCoord(minX, maxX, maxY, worldMatrix, cells, dimensions);
    const distanceYSecondOption = CalculateDistanceYCoordByTheSmallestXCoord(minY, maxY, minX, worldMatrix, cells, dimensions);

    if ((distanceXFirstOption + distanceYFirstOption) > (distanceXSecondOption + distanceYSecondOption)) {
        return distanceXSecondOption + distanceYSecondOption;
    } else {
        return distanceXFirstOption + distanceYFirstOption;
    }
}

function SecondCalculateOptionForTwoStage(minX, maxX, minY, maxY, worldMatrix, cells, dimensions) {
    const distanceXFirstOption = CalculateDistanceXCoordByTheSmallestYCoord(minX, maxX, minY, worldMatrix, cells, dimensions);
    const distanceYFirstOption = CalculateDistanceYCoordByTheBiggestXCoord(minY, maxY, minX, worldMatrix, cells, dimensions);

    const distanceXSecondOption = CalculateDistanceXCoordByTheBiggestYCoord(minX, maxX, maxY, worldMatrix, cells, dimensions);
    const distanceYSecondOption = CalculateDistanceYCoordByTheSmallestXCoord(minY, maxY, maxX, worldMatrix, cells, dimensions);

    if ((distanceXFirstOption + distanceYFirstOption) > (distanceXSecondOption + distanceYSecondOption)) {
        return distanceXSecondOption + distanceYSecondOption;
    } else {
        return distanceXFirstOption + distanceYFirstOption;
    }
}

function CalculateDistance(coordsStartWar, coordsEndWar, worldMatrix, cells, dimensions) {
    if (coordsStartWar.x <= coordsEndWar.x && coordsStartWar.y <= coordsEndWar.y) {
        return FirstCalculateOptionForTwoStage(coordsStartWar.x, coordsEndWar.x, coordsStartWar.y, coordsEndWar.y, worldMatrix, cells, dimensions);
    }
    if (coordsStartWar.x >= coordsEndWar.x && coordsStartWar.y >= coordsEndWar.y) {
        return FirstCalculateOptionForTwoStage(coordsEndWar.x, coordsStartWar.x, coordsEndWar.y, coordsStartWar.y, worldMatrix, cells, dimensions);
    }
    if (coordsStartWar.x >= coordsEndWar.x && coordsStartWar.y <= coordsEndWar.y) {
        return SecondCalculateOptionForTwoStage(coordsEndWar.x, coordsStartWar.x, coordsStartWar.y, coordsEndWar.y, worldMatrix, cells, dimensions);
    }
    if (coordsStartWar.x <= coordsEndWar.x && coordsStartWar.y >= coordsEndWar.y) {
        return SecondCalculateOptionForTwoStage(coordsStartWar.x, coordsEndWar.x, coordsEndWar.y, coordsStartWar.y, worldMatrix, cells, dimensions);
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

function FindBuildingNear(cell, coordsEndWar, worldMatrix, cells) {
    const dimensions = {
        x: worldMatrix[0].length,
        y: worldMatrix.length,
    }
    const currentCoords = {
        x: 0,
        y: 0,
        diagonalMovement: false,
    }
    const centralCell = {
        x: cell.x,
        y: cell.y
    }
    const arrCellWithBuilding = [];
    for (let iter = 0; iter < 9; iter++) {
        SetCoords(currentCoords, centralCell, iter);
        const cell = CreateCellForAlg(0, -1, currentCoords.x, currentCoords.y, centralCell.x, centralCell.y);
        let costPath = 0;
        if (currentCoords.diagonalMovement) {
            costPath = 1.4;
        }
        else {
            costPath = 1;
        }
        cell.costPath = costPath;
        cell.approximateCostPath = CalculateDistance({ x: cell.x, y: cell.y }, coordsEndWar, worldMatrix, cells, dimensions);
        if (cells[currentCoords.x + currentCoords.y * dimensions.x].__ptrTower !== -1) {
            arrCellWithBuilding.push(cell);
        }
    }
    if (arrCellWithBuilding.length !== 0) {
        let cellWithTheSmallestPath = arrCellWithBuilding[0];
        arrCellWithBuilding.forEach(cell => {
            if ((cell.approximateCostPath + cell.costPath) <= (cellWithTheSmallestPath.costPath + cellWithTheSmallestPath.approximateCostPath)) {
                cellWithTheSmallestPath = cell;
            }
        })
        return {
            x: cellWithTheSmallestPath.x,
            y: cellWithTheSmallestPath.y,
            approximateCostPath: cellWithTheSmallestPath.approximateCostPath,
            hasBuildingFound: true,
        }
    }
    return {
        hasBuildingFound: false,
    }
}

function GetShortWay(coordsStartWar, coordsEndWar, worldMatrix, cells, hasAShortWayFound, dimensions) {
    const calculatedCells = [];

    const dirtyShortWay = [];
    const consideredCells = [];

    const cellStart = CreateCellForAlg(0, -1, coordsStartWar.x, coordsStartWar.y, -1, -1);
    cellStart.approximateCostPath = CalculateDistance(coordsStartWar, coordsEndWar, worldMatrix, cells, dimensions);
    dirtyShortWay.push(cellStart);

    const currentCoords = {
        x: 0,
        y: 0,
        diagonalMovement: false,
    };

    let pathHasBeenFound = false;
    while (!pathHasBeenFound) {
        console.log(123);
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
            if (cells[currentCoords.x + currentCoords.y * dimensions.x].__ptrTower !== -1) {
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
            cell.approximateCostPath = CalculateDistance({ x: cell.x, y: cell.y }, coordsEndWar, worldMatrix, cells, dimensions);
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
            hasAShortWayFound.state = true;
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
        // cells[cellWithTheSmallestPath.x + cellWithTheSmallestPath.y * 50].okField();
        if (isCellCalculated) {
            dirtyShortWay.push(calculatedCell);
        }
        else {
            dirtyShortWay.push(cellWithTheSmallestPath);
        }
    }

    const shortWay = [];
    if (!hasAShortWayFound.state) {
        for (let iter = 0; iter < dirtyShortWay.length; iter++) {
            shortWay.push(dirtyShortWay[iter]);
            if (dirtyShortWay[iter + 1]) {
                if (dirtyShortWay[iter + 1].approximateCostPath >= dirtyShortWay[iter].approximateCostPath) {
                    const infoAboutCell = FindBuildingNear(dirtyShortWay[iter], coordsEndWar, worldMatrix, cells);
                    if (infoAboutCell.hasBuildingFound) {
                        break;
                    }
                }
            }
        }

        // shortWay.forEach((cellShortWay) => {
        //     cells[cellShortWay.y * 50 + cellShortWay.x].okField();
        // });

        return shortWay;
    }
    else {
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

        // reversedShortWay.forEach((cellShortWay) => {
        //     cells[cellShortWay.y * 50 + cellShortWay.x].okField();
        // });

        return reversedShortWay;
    }
}

async function DestroyBuilding(app, buildings, clickedBuilding, warriorsOfAllUser, resolve, island, allTextResources) {
    if (clickedBuilding.building) {
        console.log(warriorsOfAllUser);
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

<<<<<<< HEAD
        const areWarriorsAttacking = {
            state: false,
        }
        
        let activeWarriorsCount = 0;
        // Рекурсивная функция для атаки воинов
        async function attackBuilding(currentHp) {
            if (currentHp <= 0) {
                return;
            }

            // Живые воины
            const aliveWarriors = warriorsOfAllUser.warriorsOfShip.filter(warrior => warrior.alive);

            if (areWarriorsAttacking.state) {
                warriorsOfAllUser.warriorsOfShip.forEach((warriorOfShip) => {
                    if (warriorsOfAllUser.warriorsOfIsland.length > 0) {
                        let targetXOfWarriorOfIsland = Infinity;
                        let targetYOfWarriorOfIsland = Infinity;
                        warriorsOfAllUser.warriorsOfIsland.forEach((warriorOfIsland) => {
                            if (warriorOfIsland.sprite.getBounds().x <= targetXOfWarriorOfIsland && warriorOfIsland.sprite.getBounds().y <= targetYOfWarriorOfIsland) {
                                targetXOfWarriorOfIsland = warriorOfIsland.sprite.getBounds().x;
                                targetYOfWarriorOfIsland = warriorOfIsland.sprite.getBounds().y;
                            }
                        });
    
                        const dxForWarriorsOfIsland = targetXOfWarriorOfIsland - warriorOfShip.x;
                        const dyForWarriorsOfIsland = targetYOfWarriorOfIsland - warriorOfShip.y;
                        const distanceForWarriorsOfIsland = Math.sqrt(dxForWarriorsOfIsland * dxForWarriorsOfIsland + dyForWarriorsOfIsland * dyForWarriorsOfIsland);
                        if (distanceForWarriorsOfIsland <= 40) {
                            areWarriorsAttacking.state = true;
                        }
                        else {
                            areWarriorsAttacking.state = false;
                        }
                    }
                });
                await attackBuilding(clickedBuilding.building.__hp);
            }

            // Если есть живые воины, продолжаем атаку
            if (aliveWarriors.length > 0) {
                for (const warrior of aliveWarriors) {
                    if (warrior.alive) { // Проверяем, жив ли воин

                        if (warriorsOfAllUser.warriorsOfIsland.length > 0) {
                            let targetXOfWarriorOfIsland = Infinity;
                            let targetYOfWarriorOfIsland = Infinity;
                            warriorsOfAllUser.warriorsOfIsland.forEach((warriorOfIsland) => {
                                if (warriorOfIsland.sprite.getBounds().x <= targetXOfWarriorOfIsland && warriorOfIsland.sprite.getBounds().y <= targetYOfWarriorOfIsland) {
                                    targetXOfWarriorOfIsland = warriorOfIsland.sprite.getBounds().x;
                                    targetYOfWarriorOfIsland = warriorOfIsland.sprite.getBounds().y;
                                }
                            });
        
                            const dxForWarriorsOfIsland = targetXOfWarriorOfIsland - warrior.x;
                            const dyForWarriorsOfIsland = targetYOfWarriorOfIsland - warrior.y;
                            const distanceForWarriorsOfIsland = Math.sqrt(dxForWarriorsOfIsland * dxForWarriorsOfIsland + dyForWarriorsOfIsland * dyForWarriorsOfIsland);
                            if (distanceForWarriorsOfIsland <= 40) {
                                areWarriorsAttacking.state = true;
                                break;
                            }
                        }

                        activeWarriorsCount++;
                        const damageToApply = Math.min(warrior.damage, currentHp);
                        await warrior.startAttack(clickedBuilding.building, damageToApply);
                        hpText.text = `${clickedBuilding.building.name}: ${clickedBuilding.building.__hp}`;

                        // Анимация урона
                        const damageText = new PIXI.Text(-damageToApply, {
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

                        if (!warrior.alive) {
                            activeWarriorsCount--;
                        }
                        // Рекурсивно вызываем функцию с оставшимся HP
                        await attackBuilding(clickedBuilding.building.__hp);
                        break;
                    }
                }
                if (areWarriorsAttacking.state) {
                    await attackBuilding(clickedBuilding.building.__hp);
=======
        while (clickedBuilding.building.__hp > 0 && clickedBuilding.building.__sprite) {
            for (const warrior of warriorsOfAllUser.warriorsOfShip) {
                // Проверяем, не больше ли урон воина, чем HP здания
                const damageToApply = Math.min(warrior.damage, clickedBuilding.building.__hp);

                await warrior.attack(clickedBuilding.building, damageToApply);
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
>>>>>>> parent of 97d43ca (fixed)
                }
            } else {
                // Если нет живых воинов, выходим из функции
                return;
            }
        }

        await attackBuilding(clickedBuilding.building.__hp);
        app.stage.removeChild(hpText);

        if (clickedBuilding.building.__hp <= 0) {
            for (const warrior of warriorsOfAllUser.warriorsOfShip) {
                warrior.sprite.visible = true;
                warrior.attackSprite.visible = false;
            }
            await animateBuildingDestruction(clickedBuilding.building.__sprite, app);


            await updateResourcesOnBuildingDestroy(clickedBuilding.building, island.resourcesOfUser, island.buildingCountsOfUser, allTextResources);

            if (island) {
                if (island.buildingsOfUserIsland.indexOf(clickedBuilding.building) !== -1)
                {
                    island.buildingsOfUserIsland.splice(island.buildingsOfUserIsland.indexOf(clickedBuilding.building), 1);
                    island.buildingCountsOfUser[clickedBuilding.building.getAlias()] -= 1;
                }
            }

            buildings.splice(buildings.indexOf(clickedBuilding), 1);
            for (const cellId in clickedBuilding.building.__cellsStatus) {
                clickedBuilding.building.__cellsStatus[cellId].setPtrTower(-1);
            }
            clickedBuilding.building.__sprite.destroy();
        }
        resolve();
    }
}

async function updateResourcesOnBuildingDestroy(building, resourcesOfUser, buildingCountsOfUser, allTextResources) {
    buildingCountsOfUser[building.getAlias()] -= 1;
    resourcesOfUser['inhabitants'] -= 1;

    UpdateNumberOfResources(allTextResources, resourcesOfUser, buildingCountsOfUser)
}

async function animateBuildingDestruction(buildingSprite, app) {
    const textureBackground = await PIXI.Texture.from(`debris.png`);
    const debrisSprite = new PIXI.Sprite(textureBackground);
    debrisSprite.anchor.set(0.5);
    debrisSprite.zIndex = 600;
    debrisSprite.x = buildingSprite.x + buildingSprite.width / 2 - debrisSprite.width / 2 + 20;
    debrisSprite.y = buildingSprite.y + buildingSprite.height / 2 - debrisSprite.height / 2;

    debrisSprite.scale.set(buildingSprite.width / debrisSprite.width, buildingSprite.height / debrisSprite.height);

    // Случайное вращение обломков
    debrisSprite.rotation = Math.random() * Math.PI * 2;

    //buildingSprite.parent.addChild(debrisSprite);
    app.stage.addChild(debrisSprite);

    // Анимация
    for (let i = 1; i >= 0; i -= 0.1) {
        buildingSprite.alpha = i;
        // Вращение обломков
        debrisSprite.rotation += 0.005;
        await new Promise(resolve => setTimeout(resolve, 50)); // Задержка 50 мс
    }
    debrisSprite.destroy();
}

function MoveSpriteToCell(xCoordMatrix, yCoordMatrix, cells, resolve, warriorsOfAllUser, areWarriorsOfShipDead, dimensions) {
    const speed = 0.6;
    const targetX = GetXCoordFromMatrixWorld(xCoordMatrix, yCoordMatrix, cells, dimensions) - 5;
    const targetY = GetYCoordFromMatrixWorld(xCoordMatrix, yCoordMatrix, cells, dimensions) - 7;

    const groupSize = 3;
    const groups = [];
    let currentGroup = [];
    for (let i = 0; i < warriorsOfAllUser.warriorsOfShip.length; i++) {
        currentGroup.push(warriorsOfAllUser.warriorsOfShip[i]);

        if (currentGroup.length === groupSize) {
            groups.push(currentGroup);
            currentGroup = [];
        }
    }
    if (currentGroup.length > 0) {
        groups.push(currentGroup);
    }

    let allWarriorsReached = false;
    let allWarriorsReachedOtherWarriors = false;
    let allWarriorsAlive = true;

    const ticker = new PIXI.Ticker();
    ticker.add((time) => {
        allWarriorsReached = true;
        allWarriorsAlive = true;

        groups.forEach((group, groupIndex) => {
            let offsetX = 0;
            let offsetY = 0;

            if (warriors.length < 5) {
                offsetX = (groupIndex % 2 === 0) ? 6 : -6;
                offsetY = (groupIndex % 2 === 0) ? 3 : -3;
            } else if (warriors.length < 10) {
                offsetX = (groupIndex % 2 === 0) ? 4 : -4;
                offsetY = (groupIndex % 2 === 0) ? 2 : -2;
            } else {
                offsetX = (groupIndex % 2 === 0) ? 2 : -2;
                offsetY = (groupIndex % 2 === 0) ? 1 : -1;
            }

            if (groupIndex > 0) {
                const previousGroup = groups[groupIndex - 1];
                const previousLeaderSprite = previousGroup[0].getSprite();
                offsetX = (groupIndex % 2 === 0) ? 5 : -5;
                offsetY = previousLeaderSprite.y - targetY + 3 * groupIndex;
            }

            group.forEach((warrior, index) => {
                if (warrior.isAlive()) {
                    allWarriorsAlive = true;

                    const sprite = warrior.getSprite();
                    // sprite.zIndex = sprite.getBounds().y - 15;
                    // console.log(sprite.zIndex);

                    let internalOffsetX = 0;
                    if (index === 0) {
                        internalOffsetX = -5;
                    } else if (index === 2) {
                        internalOffsetX = 5;
                    }

                    const dx = targetX + offsetX + internalOffsetX - sprite.x;
                    const dy = targetY + offsetY - sprite.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance > 1) {
                        sprite.x += dx / distance * speed * time.deltaTime;
                        sprite.y += dy / distance * speed * time.deltaTime;
                        allWarriorsReached = false;
                    }
                    if (warriorsOfAllUser.warriorsOfIsland.length > 0) {
                        let targetXOfWarriorOfIsland = Infinity;
                        let targetYOfWarriorOfIsland = Infinity;
                        warriorsOfAllUser.warriorsOfIsland.forEach((warriorOfIsland) => {
                            if (warriorOfIsland.sprite.getBounds().x <= targetXOfWarriorOfIsland && warriorOfIsland.sprite.getBounds().y <= targetYOfWarriorOfIsland) {
                                targetXOfWarriorOfIsland = warriorOfIsland.sprite.getBounds().x;
                                targetYOfWarriorOfIsland = warriorOfIsland.sprite.getBounds().y;
                            }
                        });

                        const dxForWarriorsOfIsland = targetXOfWarriorOfIsland + offsetX + internalOffsetX - sprite.x;
                        const dyForWarriorsOfIsland = targetYOfWarriorOfIsland + offsetY - sprite.y;
                        const distanceForWarriorsOfIsland = Math.sqrt(dxForWarriorsOfIsland * dxForWarriorsOfIsland + dyForWarriorsOfIsland * dyForWarriorsOfIsland);
                        console.log(distanceForWarriorsOfIsland);
                        if (distanceForWarriorsOfIsland <= 40) {
                            allWarriorsReachedOtherWarriors = true;
                            allWarriorsReached = false;
                            return;
                        }
                    }
                } else {
                    const index = group.indexOf(warrior);
                    if (index !== -1) {
                        group.splice(index, 1);
                    }
                }
            });
        });
        if (allWarriorsReachedOtherWarriors) {
            if (warriorsOfAllUser.warriorsOfShip.length === 0) {
                areWarriorsOfShipDead.state = true;
                ticker.destroy();
                resolve();
            }
            if (warriorsOfAllUser.warriorsOfIsland.length === 0) {
                areWarriorsOfShipDead.state = false;
                ticker.destroy();
                resolve();
            }
        }
        else {
            if (!allWarriorsAlive) {
                ticker.destroy();
                resolve();
            }
            if (allWarriorsReached) {
                ticker.destroy();
                resolve();
            }
        }
    });

    ticker.start();
}

function GetBuildingFromMatrix(buildings, infoAboutCell, cells, buildingAround, containerForMap, dimensions) {
    let minDist = 99999;
    let minDistObject = null;
    const bounds = {
        x: GetXCoordFromMatrixWorld(infoAboutCell.x, infoAboutCell.y, cells, dimensions),
        y: GetYCoordFromMatrixWorld(infoAboutCell.x, infoAboutCell.y, cells, dimensions),
        width: 1,
        height: 1,
    }
    buildings.forEach((building) => {
        if (mouseDistanceInContainer(bounds, building, containerForMap) < minDist && mouseIntersectsInContainer(bounds, building, containerForMap)) {
            console.log(building);
            minDist = mouseDistanceInContainer(bounds, building, containerForMap);
            minDistObject = building;
        }
    })
    if (minDistObject) {
        buildingAround.building = minDistObject;
    }
}

async function MoveSprite(app, shortWay, cells, buildings, isWarriorSailingBack, resolve, clickedBuilding, warriorsOfAllUser, hasAShortWayFound, coordsEndWar, worldMatrix, containerForMap, totalPath, areWarriorsOfShipDead, dimensions, island, allTextResources) {
    if (!isWarriorSailingBack) {
        let newShortWay = [];
        const hasNewPathBuilt = {
            state: false,
        }
        for (let iter = 0; iter < shortWay.length; iter++) {
            const promiseForMoveSprite = new Promise(function(resolve) {
                MoveSpriteToCell(shortWay[iter].x, shortWay[iter].y, cells, resolve, warriorsOfAllUser, areWarriorsOfShipDead, dimensions);
            });
            await Promise.all([promiseForMoveSprite]);
            if (warriorsOfAllUser.warriorsOfShip.length === 0) {
                break;
            }
            if (iter === shortWay.length - 1) {
                if (!hasAShortWayFound.state) {
                    const infoAboutCell = FindBuildingNear(shortWay[iter], coordsEndWar, worldMatrix, cells);
                    if (infoAboutCell.hasBuildingFound) {
                        const buildingAround = {
                            building: null,
                        }
                        GetBuildingFromMatrix(buildings, infoAboutCell, cells, buildingAround, containerForMap, dimensions);
                        const promiseForDestroy = new Promise(function (resolve) {
                            DestroyBuilding(app, buildings, buildingAround, warriorsOfAllUser, resolve, island, allTextResources);
                        });
                        await Promise.all([promiseForDestroy]);
                        hasAShortWayFound.state = false;

                        newShortWay = GetShortWay({ x: infoAboutCell.x, y: infoAboutCell.y }, coordsEndWar, worldMatrix, cells, hasAShortWayFound);
                        hasNewPathBuilt.state = true;
                        totalPath.way = totalPath.way.concat(newShortWay);
                        const promiseForMove = new Promise(function (resolve) {
                            MoveSprite(app, newShortWay, cells, buildings, isWarriorSailingBack, resolve, clickedBuilding, warriorsOfAllUser, hasAShortWayFound, coordsEndWar, worldMatrix, containerForMap, totalPath, island, allTextResources);
                        });
                        await Promise.all([promiseForMove]);
                    }
                }
                else {
                    const promiseForDestroy = new Promise(function (resolve) {
                        DestroyBuilding(app, buildings, clickedBuilding, warriorsOfAllUser, resolve, island, allTextResources);
                    });
                    await Promise.all([promiseForDestroy]);
                    const promiseBack = new Promise(function (resolve) {
                        MoveSprite(app, totalPath.way, cells, buildings, true, resolve, clickedBuilding, warriorsOfAllUser, hasAShortWayFound, coordsEndWar, worldMatrix, containerForMap, totalPath, island, allTextResources);
                    });
                    await Promise.all([promiseBack]);

                    for (const warrior of warriorsOfAllUser.warriorsOfShip) {
                        warrior.destroy(app);
                    }
                }

            }
        }
    } else {
        for (let iter = shortWay.length - 1; iter >= 0; iter--) {
            await new Promise(resolve => {
                MoveSpriteToCell(shortWay[iter].x, shortWay[iter].y, cells, resolve, warriorsOfAllUser, areWarriorsOfShipDead, dimensions);
            });
        }
    }
    resolve();
}

function GetIndexOfWarriors(distributionOfOtherWarriors, distributionOfWarriors, iteration) {
    if (distributionOfOtherWarriors.length > distributionOfWarriors.length) {
        // for (let iter = iteration; iter < distributionOfOtherWarriors.length; iter++) {
            if (distributionOfOtherWarriors[iteration] !== -1) {
                return {
                    iterForWarrior: distributionOfOtherWarriors[iteration],
                    iterForOtherWarrior: distributionOfWarriors[distributionOfOtherWarriors[iteration]],
                }
            }
            else {
                return {
                    iterForWarrior: -1,
                    iterForOtherWarrior: -1,
                }
            }
        // }
    }
    else {
        // for (let iter = iteration; iter < distributionOfWarriors.length; iter++) {
            if (distributionOfWarriors[iteration] !== -1) {
                return {
                    iterForWarrior: distributionOfOtherWarriors[distributionOfWarriors[iteration]],
                    iterForOtherWarrior: distributionOfWarriors[iteration],
                }
            }
            else {
                return {
                    iterForWarrior: -1,
                    iterForOtherWarrior: -1,
                }
            }
        // }
    }
}

function Sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function RedistributeIndexes(distributionOfOtherWarriors, distributionOfWarriors, iterWithMinusOne, warriorKilledInWarriors) {
    if (warriorKilledInWarriors) {
        let indexWithoutMinusOne = 0;
        for (let iter = 0; iter < distributionOfWarriors.length; iter++) {
            if (distributionOfWarriors[iter] !== -1) {
                indexWithoutMinusOne = iter;
                if (distributionOfOtherWarriors.indexOf(iter) === -1) {
                    for (let iter2 = 0; iter2 < distributionOfOtherWarriors.length; iter2++) {
                        if (distributionOfOtherWarriors[iter2] === iterWithMinusOne) {
                            distributionOfOtherWarriors[iter2] = iter;
                        }
                    }
                    break;
                }
            }
            if (iter === distributionOfWarriors.length - 1) {
                for (let iter2 = 0; iter2 < distributionOfOtherWarriors.length; iter2++) {
                    if (distributionOfOtherWarriors[iter2] === iterWithMinusOne) {
                        distributionOfOtherWarriors[iter2] = indexWithoutMinusOne;
                    }
                }
                break;
            }
        }
    }
    else {
        let indexWithoutMinusOne = 0;
        for (let iter = 0; iter < distributionOfOtherWarriors.length; iter++) {
            if (distributionOfOtherWarriors[iter] !== -1) {
                indexWithoutMinusOne = iter;
                if (distributionOfWarriors.indexOf(iter) === -1) {
                    for (let iter2 = 0; iter2 < distributionOfWarriors.length; iter2++) {
                        if (distributionOfWarriors[iter2] === iterWithMinusOne) {
                            distributionOfWarriors[iter2] = iter;
                        }
                    }
                    break;
                }
            }
            if (iter === distributionOfOtherWarriors.length - 1) {
                for (let iter2 = 0; iter2 < distributionOfWarriors.length; iter2++) {
                    if (distributionOfWarriors[iter2] === iterWithMinusOne) {
                        distributionOfWarriors[iter2] = indexWithoutMinusOne;
                    }
                }
                break;
            }
        }
    }
}

async function BattlesOfTheWarriors(warriorsOfAllUser, resolve) {
    let lengthOfWarriors = warriorsOfAllUser.warriorsOfShip.length;
    let lengthOfOtherWarriors = warriorsOfAllUser.warriorsOfIsland.length;

    const wrapperForWarriors = {
        warriors: [],
        otherWarriors: [],
    }

    const distributionOfOtherWarriors = [];
    const distributionOfWarriors = [];

    let warriorsIsDead = false;

    if (lengthOfWarriors > lengthOfOtherWarriors) {
        wrapperForWarriors.warriors = warriorsOfAllUser.warriorsOfShip;
        wrapperForWarriors.otherWarriors = warriorsOfAllUser.warriorsOfIsland;
    }
    else {
        wrapperForWarriors.warriors = warriorsOfAllUser.warriorsOfIsland;
        wrapperForWarriors.otherWarriors = warriorsOfAllUser.warriorsOfShip;
    }
    lengthOfWarriors = wrapperForWarriors.warriors.length;
    lengthOfOtherWarriors = wrapperForWarriors.otherWarriors.length;

    let indexOfOtherWarriors = 0;
    wrapperForWarriors.warriors.forEach((warrior, index) => {
        if (index < wrapperForWarriors.otherWarriors.length) {
            distributionOfWarriors.push(index);
            distributionOfOtherWarriors.push(index); 
            indexOfOtherWarriors = index;
        }
        else {
            distributionOfWarriors.push(indexOfOtherWarriors);
        }
    });
    let iteration = 0;
    while (lengthOfOtherWarriors > 0 && lengthOfWarriors > 0) {
        for (let iter = 0; iter < distributionOfWarriors.length; iter++) {
            const indexForBattle = GetIndexOfWarriors(distributionOfOtherWarriors, distributionOfWarriors, iter);
            if (indexForBattle.iterForOtherWarrior === -1 || indexForBattle.iterForWarrior === -1) {
                continue;
            }
            const damageToApplyToWarrior = Math.min(wrapperForWarriors.otherWarriors[indexForBattle.iterForOtherWarrior].damage, wrapperForWarriors.warriors[indexForBattle.iterForWarrior].__hp);
            await wrapperForWarriors.otherWarriors[indexForBattle.iterForOtherWarrior].attack(wrapperForWarriors.warriors[indexForBattle.iterForWarrior], damageToApplyToWarrior);
            Sleep(1000).then(() => { ; });
            
            if (wrapperForWarriors.warriors[indexForBattle.iterForWarrior].__hp <= 0) {
                // debugger;
                distributionOfWarriors[indexForBattle.iterForWarrior] = -1;
                RedistributeIndexes(distributionOfOtherWarriors, distributionOfWarriors, indexForBattle.iterForWarrior, true);
                lengthOfWarriors--;

                wrapperForWarriors.warriors[indexForBattle.iterForWarrior].destroy();
            }
            else {
                const damageToApplyToOtherWarrior = Math.min(wrapperForWarriors.warriors[indexForBattle.iterForWarrior].damage, wrapperForWarriors.otherWarriors[indexForBattle.iterForOtherWarrior].__hp);
                await wrapperForWarriors.warriors[indexForBattle.iterForWarrior].attack(wrapperForWarriors.otherWarriors[indexForBattle.iterForOtherWarrior], damageToApplyToOtherWarrior);

                Sleep(1000).then(() => { ; });

                if (wrapperForWarriors.otherWarriors[indexForBattle.iterForOtherWarrior].__hp <= 0) {
                    distributionOfOtherWarriors[indexForBattle.iterForOtherWarrior] = -1;
                    RedistributeIndexes(distributionOfOtherWarriors, distributionOfWarriors, indexForBattle.iterForOtherWarrior, false);
                    lengthOfOtherWarriors--;

                    wrapperForWarriors.otherWarriors[indexForBattle.iterForOtherWarrior].destroy();
                }
            }
            if (lengthOfOtherWarriors === 0) {
                // debugger;
                warriorsIsDead = true;
            }
            if (lengthOfWarriors === 0) {
                // debugger;
                warriorsIsDead = true;
            }
        }
        console.log(lengthOfOtherWarriors, lengthOfWarriors);
        iteration++;
    }
    
    if (warriorsIsDead) {
        if (warriorsOfAllUser.warriorsOfShip.length > warriorsOfAllUser.warriorsOfIsland.length) {
            warriorsOfAllUser.warriorsOfShip = wrapperForWarriors.warriors;
            warriorsOfAllUser.warriorsOfIsland = wrapperForWarriors.otherWarriors;
        }
        else {
            warriorsOfAllUser.warriorsOfShip = wrapperForWarriors.otherWarriors;
            warriorsOfAllUser.warriorsOfIsland = wrapperForWarriors.warriors;
        }

        warriorsOfAllUser.warriorsOfShip = warriorsOfAllUser.warriorsOfShip.filter((warrior) => warrior.__hp > 0);
        warriorsOfAllUser.warriorsOfIsland = warriorsOfAllUser.warriorsOfIsland.filter((otherWarrior) => otherWarrior.__hp > 0);
        
        resolve();
    }
}

<<<<<<< HEAD
export function MoveWarriorsToOtherWarriors(warriorsOfAllUser, idUser, resourcesOfAttackedPlayer, resolve) {
=======
export function MoveWarriorsToOtherWarriors(warriorsOfAllUser) {
>>>>>>> parent of 97d43ca (fixed)
    const speed = 0.8;

    const groupSize = 3;
    const groups = [];
    let currentGroup = [];
    for (let i = 0; i < warriorsOfAllUser.warriorsOfIsland.length; i++) {
        currentGroup.push(warriorsOfAllUser.warriorsOfIsland[i]);

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
    ticker.add(async (time) => {
        console.log(789);
        allWarriorsReached = false;

        let targetXOfWarriorOfIsland = Infinity;
        let targetYOfWarriorOfIsland = Infinity;
        warriorsOfAllUser.warriorsOfShip.forEach((otherWarrior) => {
            if (otherWarrior.sprite.getBounds().x <= targetXOfWarriorOfIsland && otherWarrior.sprite.getBounds().y <= targetYOfWarriorOfIsland) {
                targetXOfWarriorOfIsland = otherWarrior.sprite.getBounds().x;
                targetYOfWarriorOfIsland = otherWarrior.sprite.getBounds().y;
            }
        });

        groups.forEach((group, groupIndex) => {

            let offsetX = 0; // Смещение по X для каждой группы
            let offsetY = 0; // Смещение по Y для каждой группы

            // Смещение относительно предыдущей группы
            if (groupIndex > 0) {
                const previousGroup = groups[groupIndex - 1];
                const previousLeaderSprite = previousGroup[0].getSprite(); // Спрайт лидера предыдущей группы

                // Смещение по X в разные стороны
                offsetX = (groupIndex % 2 === 0) ? 8 : -5; // Вправо для четных, влево для нечетных групп
                offsetY = previousLeaderSprite.y - targetYOfWarriorOfIsland + 8 * groupIndex; // Смещение по Y относительно предыдущего лидера
            }

            group.forEach(async (warrior, index) => {
                const sprite = warrior.getSprite();

                // Смещение в разные стороны (внутри группы)
                let internalOffsetX = 0;
                if (index === 0) {
                    internalOffsetX = -8; // Левый воин
                } else if (index === 2) {
                    internalOffsetX = 8; // Правый воин
                }

                const dxForWarriorsOfIsland = targetXOfWarriorOfIsland + offsetX + internalOffsetX - sprite.x;
                const dyForWarriorsOfIsland = targetYOfWarriorOfIsland + offsetY - sprite.y;
                const distanceForWarriorsOfIsland = Math.sqrt(dxForWarriorsOfIsland * dxForWarriorsOfIsland + dyForWarriorsOfIsland * dyForWarriorsOfIsland);
                if (distanceForWarriorsOfIsland <= 1) {
                    allWarriorsReached = true;
                    const promise = new Promise(function(resolve) {
                        BattlesOfTheWarriors(warriorsOfAllUser, resolve);
                    });
                    await Promise.all([promise]);
                }
                else {
                    sprite.x += dxForWarriorsOfIsland / distanceForWarriorsOfIsland * speed * time.deltaTime;
                    sprite.y += dyForWarriorsOfIsland / distanceForWarriorsOfIsland * speed * time.deltaTime;
                }

            });
        });

        if (warriorsOfAllUser.warriorsOfShip.length === 0) {
            warriorsOfAllUser.warriorsOfShip.forEach((warrior) => {
                warrior.sprite.destroy();
            });
            ticker.destroy();
            resolve();
        }

        if (allWarriorsReached) {
            ticker.destroy();
        }
    });

    ticker.start();
}

<<<<<<< HEAD
export async function MoveWarrior(coordsEndWar, coordsStartWar, cells, app, worldMatrix, buildings, clickedBuilding, containerForMap, warriorsOfAllUser, countOfWarriors, island, colorFlag, idUser, towers, allTextResources, resolve) {
=======
export async function MoveWarrior(coordsEndWar, coordsStartWar, cells, app, worldMatrix, buildings, clickedBuilding, containerForMap, warriorsOfAllUser, countOfWarriors, island, colorFlag) {
>>>>>>> parent of 97d43ca (fixed)
    const dimensions = {
        x: worldMatrix[0].length,
        y: worldMatrix.length,
    }
    
    const x = GetXCoordFromMatrixWorld(coordsStartWar.x, coordsStartWar.y, cells, dimensions) - 5;
    const y = GetYCoordFromMatrixWorld(coordsStartWar.x, coordsStartWar.y, cells, dimensions) - 7;

    for (let i = 0; i < countOfWarriors; i++) {
        const warrior = new Warrior(app, "war", x, y, 40, 3 + i, colorFlag);
        warriorsOfAllUser.warriorsOfShip.push(warrior);
    }
    const areWarriorsOfShipDead = {
        state: false
    }
    const hasAShortWayFound = {
        state: false,
    }
    const totalPath = {
        way: [],
    }
    const shortWay = GetShortWay(coordsStartWar, coordsEndWar, worldMatrix, cells, hasAShortWayFound, dimensions);
    totalPath.way = shortWay;
    towers.forEach(tower => {
        tower.startAttack(warriorsOfAllUser.warriorsOfShip);
    });
    const promiseForward = new Promise(function (resolve) {
        MoveSprite(app, shortWay, cells, buildings, false, resolve, clickedBuilding, warriorsOfAllUser, hasAShortWayFound, coordsEndWar, worldMatrix, containerForMap, totalPath, areWarriorsOfShipDead, dimensions, island, towers, allTextResources);
    });
    await Promise.all([promiseForward]);
    towers.forEach(tower => {
        tower.stopAttack(warriorsOfAllUser.warriorsOfShip);
    });
    resolve();
}