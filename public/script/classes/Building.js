import { Cell } from "./Cell.js"; 
import { UpdateNumberOfResources } from "../drawInfoBlocks.js";
import { Rect } from "./Quadtree.js";
import { SendBuilding } from "../websocket/logicForStage.js";
import { Sound } from "./Sound.js";
import { createIslandBuilding } from "../gameRequsets.js";

export class Building
{
    constructor(app, cells, userBuildings, buildings, quadTree, name, alias, givingResource, peopleCount, hp, defense, buildType, buildPtr, requiredResources, resources, allTextResources, buildingCountsOfUser, containerForMap, dimensions, anotherBuilding, damage)
    {
        this.id = -1;
        this.__hp = hp;
        this.__defense = defense;
        this.name = name;
        this.alias = alias;
        this.__buildType = buildType;
        this.__buildPtr = buildPtr;
        this.givingResource = givingResource;
        this.__sprite;
        this.__peopleCount = peopleCount;
        this.interactivity = true;
        this.requiredResources = requiredResources;
        this.__droppingResources = {}
        this.id = -1;
        this.dimensions = dimensions;
        this.damage = damage;
        this.attackTimer = null;
        Object.entries(requiredResources).forEach(([key, value]) => { 
            if (value !== 1) { value = Math.floor(value / 2); } 
            if (key == 'hammer') { value = 0}
            if (value !== 0) {this.__droppingResources[key] = value;} 
        });
        this.__matrixPattern = [];
        this.__eCells = [];
        this.__cellsStatus = {};
        this.cellsBefore = [null, null, null, null, null, null, null, null, null]
        this.__stopMovingFlag = false;
        this.__bounds;
        this.hitChance = 100;
        this.initSprite(app);
        if (!anotherBuilding) {
            window.addEventListener('click', () => this.mouseClick(app, userBuildings, buildings, resources, allTextResources, buildingCountsOfUser, containerForMap, cells, dimensions));
            app.stage.on('pointermove', (event) => this.startMouseFollowing(event, cells, quadTree));
        }
        //app.stage.off('pointermove', (event) => this.startMouseFollowing(event))
    }

    getAlias()
    {
        return this.alias;
    }

    getStopMovingFlag() {
        return this.__stopMovingFlag;
    }

    getGivingResource() {
        return this.givingResource;
    }

    getHp() {
        return this.__hp;
    }
    getName() {
        return this.name;
    }
    setHp(hp) 
    {
        this.__hp = hp;
    }
    getECells() {
        return this.__eCells;
    }
    getDefense() {
        return this.__defense;
    }
    setDefense(defense) {
        this.__defense = defense;
    }
    getTypeTower() {
        return this.__buildType;
    }
    setTowerType(buildType) {
        this.__buildType = buildType;
    }
    getTexture() {
        return PIXI.Texture.from(`building_${this.__buildPtr}.png`);
    }
    initSprite(app) {
        this.__sprite = new PIXI.Sprite(PIXI.Texture.from(`building_${this.__buildPtr}.png`));
        this.__sprite.zIndex = 500;
        this.__sprite.alpha = 0.3;
        app.stage.addChild(this.__sprite);
    }

    changeTexture(ptr) {
        this.__buildPtr = ptr;
        this.__sprite.texture = PIXI.Texture.from(`building_${ptr}.png`);
    }

    setPosition(x, y) {
        this.__sprite.position.set(x, y);
        this.__sprite.zIndex = y;
        this.__bounds = this.__sprite.getBounds();
    }
    getBounds() {
        return this.__bounds;
    }
    setPeopleCount(count) {
        this.__peopleCount = count;
    }
    getPeopleCount() {
        return this.__peopleCount;
    }
    getDroppingResources() {
        return this.__droppingResources;
    }
    setDroppingResources(droppingResources) {
        this.__droppingResources = droppingResources;
    }
    getMatrixPattern() {
        return this.__matrixPattern;
    }
    setMatrixPattern(matrix) {
        this.__matrixPattern = matrix;
    }
    getBuildingPtr()
    {
        return this.__buildPtr;
    }
    renderMatrixPattern(app) {
        let i = 0;
        let j = 0;
        let count = 0;
        this.__matrixPattern.forEach((row) => {
            row.forEach((num) => {
                var cell = null;
                if (num === 1) {
                    cell = new Cell(app, this.__buildType, 5, 0, 0);
                    cell.activate();
                    this.__cellsStatus[count] = null;
                    cell.setCellId(count);
                }
                this.__eCells.push(cell);
                j += 1
                count += 1;
            })
            j = 0;
            i += 1;
        })
    }

    startMouseFollowing(event, cells, quadTree) {
        let position = event.data.global;
        if (this.__eCells[0]) {this.__eCells[0].setDirectPositions(position.x + 20 - 50, position.y - 50);}
        if (this.__eCells[1]) {this.__eCells[1].setDirectPositions(position.x - 50, position.y + 10 - 50);}
        if (this.__eCells[2]) {this.__eCells[2].setDirectPositions(position.x - 20 - 50, position.y + 20 - 50);}
        if (this.__eCells[3]) {this.__eCells[3].setDirectPositions(position.x + 40 - 50, position.y + 10 - 50);}
        if (this.__eCells[4]) {this.__eCells[4].setDirectPositions(position.x + 20 - 50, position.y + 20 - 50);}
        if (this.__eCells[5]) {this.__eCells[5].setDirectPositions(position.x - 50, position.y + 30 - 50);}
        if (this.__eCells[6]) {this.__eCells[6].setDirectPositions(position.x + 60 - 50, position.y + 20 - 50);}
        if (this.__eCells[7]) {this.__eCells[7].setDirectPositions(position.x + 40 - 50, position.y + 30 - 50);}
        if (this.__eCells[8]) {this.__eCells[8].setDirectPositions(position.x + 20 - 50, position.y + 40 - 50);}
        this.__sprite.x = position.x - this.__sprite.getBounds().width / 2;
        this.__sprite.y = position.y - this.__sprite.getBounds().height / 2;
        // cells.forEach((cell) => {
        //     cell.changeType(cell.getType());
        //     this.__eCells.forEach((eCell => {
        //         // this.__cellsStatus[eCell.getCellId()] = null
        //         if ((eCell !== null) && (cell.intersectWithCell(eCell))) {
        //             cell.errorField();
        //             this.__cellsStatus[eCell.getCellId()] = null
        //             if ((cell.getType() == 1) && (cell.getTypeTower() == -1)) {
        //                 cell.okField();
        //             }
        //             this.__cellsStatus[eCell.getCellId()] = cell;
        //         }
        //     }));
        // });
        this.__eCells.filter(eCell => eCell !== null).forEach( (eCell) => {
            const cell = quadTree.query(new Rect(eCell.x + 7, eCell.y + 4, 5, 5));
            if (cell.length > 0) {
                if (cell[0] !== this.cellsBefore[eCell.getCellId()])
                {
                    if (this.cellsBefore[eCell.getCellId()] !== null)
                    {
                        this.cellsBefore[eCell.getCellId()].changeType(this.cellsBefore[eCell.getCellId()].getType());   
                    }
                }
                this.cellsBefore[eCell.getCellId()] = cell[0];
                cell[0].errorField();
                this.__cellsStatus[eCell.getCellId()] = null;
                if ((cell[0].getType() == 1) && (cell[0].getPtrTower() == -1)) {
                    cell[0].okField();
                }
                this.__cellsStatus[eCell.getCellId()] = cell[0];
            } 
            else 
            {
                if (this.cellsBefore[eCell.getCellId()] !== null)
                {
                    this.cellsBefore[eCell.getCellId()].changeType(this.cellsBefore[eCell.getCellId()].getType());
                    this.cellsBefore[eCell.getCellId()] = null;
                }
            }
        })
    }
        

    rotateMatrix(direction) {
        if (direction == 1) {
            const rotatedMatrix = [];
            for (let i = 0; i < this.__matrixPattern[0].length; i++) {
                const column = this.__matrixPattern.map(row => row[i]);
                rotatedMatrix.push(column.reverse());
            }
            this.__matrixPattern = rotatedMatrix;
            if (this.__buildPtr % 4 == 0) {
                this.__buildPtr -= 3;
                this.changeTexture(this.__buildPtr)
            }
            else {
                this.__buildPtr += 1;
                this.changeTexture(this.__buildPtr);
            }
        }
        else if (direction == -1) {
            const rotatedMatrix = [];
            for (let i = this.__matrixPattern[0].length - 1; i >= 0; i--) {
                const column = this.__matrixPattern.map(row => row[i]);
                rotatedMatrix.push(column);
            }
            this.__matrixPattern = rotatedMatrix;
            if ((this.__buildPtr - 1) % 4 == 0) {
                this.__buildPtr += 3;
                this.changeTexture(this.__buildPtr)
            }
            else {
                this.__buildPtr -= 1;
                this.changeTexture(this.__buildPtr);
            }
        }
    }

    displayBuildingOtherPlayer(buildings, resources, allTextResources, containerForMap, id) {
        const sum = Object.values(this.__cellsStatus).filter(value => (value !== null && value.getType() !== 0 && value.getType() !== 2 && value.getPtrTower() === -1)).length;
        if (sum === Object.keys(this.__cellsStatus).length && sum !== 0) {
            Object.values(this.__cellsStatus).forEach(element => {
                element.setPtrTower(this.getTypeTower());
            });
            this.__stopMovingFlag = true;
            // this.setPosition(this.__cellsStatus[4].getBounds().x + this.__cellsStatus[4].getBounds().width / 2 - 52.5, this.__cellsStatus[4].getBounds().y - this.__sprite.getBounds().height / 3 + 5);
            this.setPosition(this.__cellsStatus[4].__sprite.getBounds().x - containerForMap.x  + this.__cellsStatus[4].getBounds().width / 2 - 52.5, this.__cellsStatus[4].__sprite.getBounds().y - containerForMap.y - this.__sprite.getBounds().height / 3 + 5);
            this.clearPatterns();
            this.__sprite.zIndex = this.__sprite.y;
            this.__sprite.alpha = 1;
            this.id = buildings.length + 1;
            buildings.push(this);
            containerForMap.addChild(this.__sprite);
            // selectedBuilding.tint = 0xffffff;
            this.id = id;
        }
    }

    displayMyBuilding(userBuildings, buildings, buildingCountsOfUser, containerForMap, id)
    {
        Object.values(this.__cellsStatus).forEach(element => {
            element.setPtrTower(this.getTypeTower());
        });
        this.__stopMovingFlag = true;
        // this.setPosition(this.__cellsStatus[4].getBounds().x + this.__cellsStatus[4].getBounds().width / 2 - 52.5, this.__cellsStatus[4].getBounds().y - this.__sprite.getBounds().height / 3 + 5);
        this.setPosition(this.__cellsStatus[4].__sprite.getBounds().x - containerForMap.x  + this.__cellsStatus[4].getBounds().width / 2 - 52.5, this.__cellsStatus[4].__sprite.getBounds().y - containerForMap.y - this.__sprite.getBounds().height / 3 + 5);
        this.clearPatterns();
        this.__sprite.zIndex = this.__sprite.y;
        this.__sprite.alpha = 1;
        this.id = buildings.length + 1;
        buildings.push(this);
        userBuildings.push(this);
        buildingCountsOfUser[this.getAlias()] += 1;
        containerForMap.addChild(this.__sprite);
        this.id = id;
    }

    async buildBuilding(app, userBuildings, buildings, resources, allTextResources, buildingCountsOfUser, containerForMap, cells, dimensions) {
        const sum = Object.values(this.__cellsStatus).filter(value => (value !== null && value.getType() !== 0 && value.getType() !== 2 && value.getPtrTower() === -1)).length;
        if (sum === Object.keys(this.__cellsStatus).length && sum !== 0) {
            const buildSound = new Sound('buildingSound', 0.03, false);
            buildSound.repeating(false);
            await buildSound.play();
            Object.values(this.__cellsStatus).forEach(element => {
                element.setPtrTower(this.getTypeTower());
            });
            this.__stopMovingFlag = true;
            app.stage.on('pointermove', (event) => this.startMouseFollowing(event)).off('pointermove');
            // this.setPosition(this.__cellsStatus[4].getBounds().x + this.__cellsStatus[4].getBounds().width / 2 - 52.5, this.__cellsStatus[4].getBounds().y - this.__sprite.getBounds().height / 3 + 5);
            this.setPosition(this.__cellsStatus[4].__sprite.getBounds().x - containerForMap.x  + this.__cellsStatus[4].getBounds().width / 2 - 52.5, this.__cellsStatus[4].__sprite.getBounds().y - containerForMap.y - this.__sprite.getBounds().height / 3 + 5);
            this.clearPatterns();
            this.__sprite.zIndex = this.__sprite.y;
            this.__sprite.alpha = 1;
            this.id = buildings.length + 1;
            buildings.push(this);
            userBuildings.push(this);
            containerForMap.addChild(this.__sprite);
            for (const resource in this.requiredResources)
            {
                resources[resource] -= this.requiredResources[resource];
            }
            resources['inhabitants'] += this.__peopleCount;
            buildingCountsOfUser[this.getAlias()] += 1;
            UpdateNumberOfResources(allTextResources, resources, buildingCountsOfUser);
            SendBuilding(this, cells, dimensions);
            this.id = await createIslandBuilding(this, cells);
            // selectedBuilding.tint = 0xffffff;
        }
    }

    clearPatterns() {
        this.__eCells.forEach(cell => {
            if (cell !== null) {
                //cell.getSprite().parent.removeChild(cell.getSprite());
                for (let property in cell) {
                    delete cell[property]
                }
                cell = null;
            }
        })
        Object.values(this.__cellsStatus).forEach(cell => {
            if (cell !== null) { cell.changeType(cell.getType());}
        })
        this.__eCells = [];
    }

    clearCellsStatus()
    {
        this.__cellsStatus = {};
    }

    mouseClick(app, userBuildings, buildings, resources, allTextResources, buildingCountsOfUser, containerForMap, cells, dimensions) {
        if (!this.__stopMovingFlag) {
            this.buildBuilding(app, userBuildings, buildings, resources, allTextResources, buildingCountsOfUser, containerForMap, cells, dimensions);
        }
    }

    startAttack(enemiesArray)
    {
        let targetEnemy = null;
        this.attackTimer = setInterval(()=> {
            if (!targetEnemy && enemiesArray != [])
            {
                targetEnemy = enemiesArray[Math.floor(Math.random() * enemiesArray.length)]
            }
            if (!targetEnemy)
            {
                this.stopAttack()
                return;
            }
            if (Math.random() * 100 >= this.hitChance)
            {
                console.log('Мимо')
                return;
            }
            if (targetEnemy.getHp() - this.damage <= 0)
            {
                targetEnemy.damaged(this.damage);
                enemiesArray.splice(enemiesArray.indexOf(targetEnemy), 1); 
                targetEnemy = null;
            }
            else
            {
                targetEnemy.damaged(this.damage);
            }
        }, 2000)
    }

    stopAttack()
    {
        clearInterval(this.attackTimer);
    }

}