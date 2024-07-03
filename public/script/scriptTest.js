// const { setPositionsInIsometric } = require("./pixi");

// import * as PIXI from './pixi.mjs';
import { DrawInfoBlock } from "./testGame.js";

(async () =>
    {
        const app = new PIXI.Application();
        await app.init({ background: '#00aeff', resizeTo: window });
        app.stage.interactive = true;
        document.body.appendChild(app.canvas);
        let buildings = [];
        let buildingMoment = false;
        let t;

        DrawInfoBlock(app);

    function cartesianToIsometric(cartX, cartY)
    {
        return {
            x: cartX - cartY,
            y: (cartX + cartY) / 2
        };
    }

    function cartesianToScreenFromIsometric(cartX, cartY)
    {
        return {
            x: cartX + cartY,
            y: (cartX - cartY) * 2
        };
    }


    function intersects(object1, object2)
    {
        const bounds1 = object1.getBounds();
        const bounds2 = object2.getBounds();
        return (
            bounds1.x + bounds1.width < bounds2.x + bounds2.width
            && bounds1.x + bounds1.width > bounds2.x
            && bounds1.y + bounds1.height < bounds2.y + bounds2.height
            && bounds1.y + bounds1.height > bounds2.y 
        );
    }

    function distance(object1, object2)
    {
        const bounds1 = object1.getBounds();
        const bounds2 = object2.getBounds();

        return Math.sqrt(((bounds2.x + bounds2.width / 2) - (bounds1.x + bounds1.width / 2)) ** 2 + ((bounds2.y + bounds2.height / 2) - (bounds1.y + bounds1.height / 2)) ** 2);
    }

    let textures = await PIXI.Assets.load('/../imageParser/grounds.json');
    let texturess = await PIXI.Assets.load('/../imageParser/buildings.json');
    texturess = await PIXI.Assets.load('/../imageParser/farmParser.json');
    texturess = await PIXI.Assets.load('/../imageParser/playingHouse.json');
    texturess = await PIXI.Assets.load('/../imageParser/wareHouse.json');
    texturess = await PIXI.Assets.load('/../imageParser/farmerHouse.json');
    texturess = await PIXI.Assets.load('/../imageParser/greenCastle.json');
    texturess = await PIXI.Assets.load('/../imageParser/Icons.json');

    class Cell {
        constructor(ptrTower, placeType)
        {
            this.__ptrTower = ptrTower;
            this.__placeType = placeType;
            this.__sprite;
            this.__bounds;
            this.__active = false;
            this.__cellId = 0;
            this.initSprite()
        }

        intersectWithCell(object) 
        {
            const bounds = object.getBounds();
            return (
                this.__bounds.x + this.__bounds.width / 2.37 < bounds.x + bounds.width / 1.72
                && this.__bounds.x + this.__bounds.width / 1.72 > bounds.x + bounds.width / 2.37
                && this.__bounds.y + this.__bounds.height / 2.46 < bounds.y + bounds.height / 2
                && this.__bounds.y + this.__bounds.height / 2 > bounds.y + bounds.height / 2.46
            );
        }

        getSprite()
        {
            return this.__sprite;
        }

        setCellId(id)
        {
            this.__cellId = id;
        }

        getCellId()
        {
            return this.__cellId;
        }

        activate()
        {
            this.__active = true;
        }

        deactivate()
        {
            this.__active = false;
        }

        getActive()
        {
            return this.__active;
        }

        getPtrTower()
        {
            return this.__ptrTower;
        }

        setPtrTower(newPtr)
        {
            this.__ptrTower = newPtr;
        }

        initSprite()
        {
            this.__sprite = new PIXI.Sprite(PIXI.Texture.from(`ground_${this.__placeType}.png`));
            //this.__sprite.texture.rotate = 1;
            //this.__sprite.texture.updateUvs();
            //this.__sprite.height /= 2;
            app.stage.addChild(this.__sprite);
        }

        changeType(type)
        {
            this.__placeType = type;
            this.__sprite.texture = PIXI.Texture.from(`ground_${type}.png`);
            //this.__sprite.texture.rotate = 1;
            //this.__sprite.texture.updateUvs();
        }

        errorField()
        {
            this.__sprite.texture = PIXI.Texture.from(`ground_${3}.png`);
            //this.__sprite.texture.rotate = 1;
            //this.__sprite.texture.updateUvs();
        }

        okField()
        {
            this.__sprite.texture = PIXI.Texture.from(`ground_${4}.png`);
            //this.__sprite.texture.rotate = 1;
            //this.__sprite.texture.updateUvs();
        }

        setPositionsInIsometric(x, y)
        {
            const isoPos = cartesianToIsometric(x, y);
            this.__sprite.position.set(isoPos.x, isoPos.y);
            this.__bounds = this.__sprite.getBounds();
        }

        setDirectPositions(x, y)
        {
            this.__sprite.position.set(x, y);
            this.__bounds = this.__sprite.getBounds();
        }

        getPositions()
        {
            const x = this.__sprite.position.x;
            const y = this.__sprite.position.y;
            return {x, y};
        }

        getBounds()
        {
            return this.__sprite.getBounds();
        }

        getType()
        {
            return this.__placeType;
        }
    }

    class Destroyer
    {
        constructor()
        {
            this.__sprite;
            this.activation = false;
        }

        initSprite()
        {
            this.__sprite = new PIXI.Sprite(PIXI.Texture.from(`hummer.png`));
            app.stage.addChild(this.__sprite);
            this.__sprite.scale = 0.8
            this.__sprite.zIndex = 999999999;
        }

        activate()
        {
            this.activation = true;
        }

        deactivate()
        {
            this.activation = false;
        }

        click(e)
        {
            if (!this.activation)
            {
                return;
            }
            if (e.buttons === 2 && this.activation)
            {
                this.deactivate();
                this.__sprite.destroy();
                return;
            }
            var min = 999999999999;
            var minDistBuilding = null;
            buildings.forEach((building) => {
                if (intersects(this.__sprite, building) && distance(this.__sprite, building) < min)
                {
                    minDistBuilding = building;
                    min = distance(this.__sprite, building);
                }
            })
            if (minDistBuilding)
            {
                for (const cellId in minDistBuilding.__cellsStatus)
                    {
                        minDistBuilding.__cellsStatus[cellId].setPtrTower(-1);
                    }
                    this.deactivate();
                    minDistBuilding.__sprite.destroy();
                    buildings = buildings.filter(item => item !== minDistBuilding);
                    this.__sprite.destroy();
                    return;
            }
        }

        followMouse(e)
        {
            if (this.activation)
            {
                const position = {'x': e.clientX, 'y': e.clientY};
                this.__sprite.x = position.x - this.__sprite.getBounds().width - 10;
                this.__sprite.y = position.y - this.__sprite.getBounds().height - 25;
            }
        }


    }

    class build
    {
        constructor(hp, defense, buildType, buildPtr)
        {
            this.__hp = hp;
            this.__defense = defense;
            this.__buildType = buildType;
            this.__buildPtr = buildPtr;
            this.__sprite;
            this.__peopleCount;
            this.__droppingResources = [];
            this.__matrixPattern = [];
            this.__eCells = [];
            this.__cellsStatus = {};
            this.__stopMovingFlag = false;
            this.__bounds;
            this.initSprite();
            window.addEventListener('click',() => this.mouseClick());
            app.stage.on('pointermove', (event) => this.startMouseFollowing(event));
            //app.stage.off('pointermove', (event) => this.startMouseFollowing(event))
        }
        getHp()
        {
            return this.__hp;
        }
        setHp(hp)
        {
            this.__hp = hp;
        }
        getECells()
        {
            return this.__eCells;
        }
        getDefense()
        {
            return this.__defense;
        }
        setDefense(defense)
        {
            this.__defense = defense;
        }
        getPtrTower()
        {
            return this.__buildType;
        }
        setTowerType(buildType)
        {
            this.__buildType = buildType;
        }
        initSprite()
        {
            this.__sprite = new PIXI.Sprite(PIXI.Texture.from(`building_${this.__buildPtr}.png`));
            this.__sprite.zIndex = 10000;
            this.__sprite.alpha = 0.3;
            app.stage.addChild(this.__sprite);
        }

        changeTexture(ptr)
        {
            this.__sprite.texture = PIXI.Texture.from(`building_${ptr}.png`);
        }
        setPosition(x, y)
        {
            this.__sprite.position.set(x, y);
            this.__sprite.zIndex = y;
            this.__bounds = this.__sprite.getBounds();
        }
        getBounds()
        {
            return this.__bounds;
        }
        setPeopleCount(count)
        {
            this.__peopleCount = count;
        }
        getPeopleCount()
        {
            return this.__peopleCount;
        }
        getDroppingResources()
        {
            return this.__droppingResources;
        }
        setDroppingResources(droppingResources)
        {
            this.__droppingResources = droppingResources;
        }
        getMatrixPattern()
        {
            return this.__matrixPattern;
        }
        setMatrixPattern(matrix)
        {
            this.__matrixPattern = matrix;
        }
        renderMatrixPattern()
        {
            let i = 0;
            let j = 0;
            let count = 0;
            this.__matrixPattern.forEach((row) => {
                row.forEach((num) => {
                    var cell = null;
                    if (num === 1)
                    {
                        cell = new Cell(this.__buildType, 5);
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

        startMouseFollowing(event)
        {
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
            cells.forEach((cell) => {
                cell.changeType(cell.getType());
                this.__eCells.forEach((eCell => {
                    // this.__cellsStatus[eCell.getCellId()] = null
                    if ((eCell !== null) && (cell.intersectWithCell(eCell)))
                    {
                        cell.errorField();
                        this.__cellsStatus[eCell.getCellId()] = null
                        if ((cell.getType() == 1) && (cell.getPtrTower() == -1))
                        {
                            cell.okField();
                            this.__cellsStatus[eCell.getCellId()] = cell;
                        }
                    }
                }));
            });
        }

        rotateMatrix(direction)
        {
            if (direction == 1)
            {
                const rotatedMatrix = [];
                for (let i = 0; i < this.__matrixPattern[0].length; i++) {
                    const column = this.__matrixPattern.map(row => row[i]);
                    rotatedMatrix.push(column.reverse());
                }
                this.__matrixPattern = rotatedMatrix;
                if (this.__buildPtr % 4 == 0)
                {
                    this.__buildPtr -= 3;
                    this.changeTexture(this.__buildPtr)
                }
                else
                {
                    this.__buildPtr += 1;
                    this.changeTexture(this.__buildPtr);
                }
            }
            else if (direction = -1)
            {
                const rotatedMatrix = [];
                for (let i = this.__matrixPattern[0].length - 1; i >= 0; i--) {
                    const column = this.__matrixPattern.map(row => row[i]);
                    rotatedMatrix.push(column);
                }
                this.__matrixPattern = rotatedMatrix;
                if ((this.__buildPtr - 1) % 4 == 0)
                {
                    this.__buildPtr += 3;
                    this.changeTexture(this.__buildPtr)
                }
                else
                {
                    this.__buildPtr -= 1;
                    this.changeTexture(this.__buildPtr);
                }
            }
        }

        buildBuilding()
        {
            const sum =  Object.values(this.__cellsStatus).filter(value => value !== null).length;
            if (sum === Object.keys(this.__cellsStatus).length && sum !== 0)
            {
                Object.values(this.__cellsStatus).forEach(element => {
                    element.setPtrTower(this.__buildType);
                    element.setPtrTower(this.getPtrTower());
                });
                this.__stopMovingFlag = true;
                app.stage.on('pointermove', (event) => this.startMouseFollowing(event)).off('pointermove');
                this.setPosition(this.__cellsStatus[4].getBounds().x + this.__cellsStatus[4].getBounds().width / 2 - 52.5, this.__cellsStatus[4].getBounds().y - this.__sprite.getBounds().height / 3 + 5);
                this.clearPatterns();
                this.__sprite.zIndex = this.__sprite.y;
                this.__sprite.alpha = 1;
                buildingMoment = false;
                buildings.push(this);
            }
        }

        clearPatterns()
        {
            this.__eCells.forEach(cell => {
                if (cell !== null)
                {
                    //cell.getSprite().parent.removeChild(cell.getSprite());
                    for (let property in cell)
                    {
                        delete cell[property]
                    }
                    cell = null;
                }
            })
            Object.values(this.__cellsStatus).forEach(cell => {
                if (cell !== null) {cell.changeType(cell.getType());}
            })
            this.__eCells = [];
        }

        clearCellsStatus()
        {
            this.__cellsStatus = {};
        }

        mouseClick()
        {
            if (!this.__stopMovingFlag)
            {
                this.buildBuilding();
            }
        }
    }

    class game
    {
        constructor()
        {
            this.status = ''; // R - бросок кубиков,  W - драка, B - Постройка, D - несчастье
        }
    }

    class Timer {
        constructor(duration) 
        {
          this.__paused = false;
          this.__startTime;
          this.__duration = duration;
          this.reset();
        }
      
        reset()
        {
          this.__startTime = Date.now();
        }
      
        update(delta)
        {
          if (!this.__paused) {
            this.__duration -= delta;
          }
        }
      
        isExpired()
        {
          return this.__duration <= 0;
        }
      
        get remainingTime()
        {
          return Math.max(0, this.__duration);
        }
      
        pause() {
          this.__paused = true;
        }
      
        resume() {
          this.__paused = false;
        }
      }

    let worldMatrix = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
        [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, ],
        [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, ],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, ],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, ],
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 0, 0, ],
        [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 0, ],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, ],
        [0, 1, 1, 0, 0, 0, 0, 0, 0, 2, 2, 2, 1, 1, 1, 1, 1, 2, 0, 0, ],
        [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 0, 0, 0, ],
        [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, ],
        [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, ],
        [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, ],
        [0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
        [0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, ],
        [0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, ],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, ],
    ];
      

    let cells = [];
    function mapReader(worldMatrix)
    {
        let i = 0;
        let j = 0;
        worldMatrix.forEach((row) => {
            row.forEach((num) => {
                var cell = new Cell(-1, num);
                cell.__sprite.zIndex = -999;
                cell.setPositionsInIsometric(500 + 20 * i, -500 + 20 * j);
                if (i % 2 == 0)
                {   
                    cell.setPositionsInIsometric(500 + 20 * i, -500 + 20 * j);
                }
                cells.push(cell);
                j += 1
            })
            j = 0;
            i += 1;
        })
    }
    mapReader(worldMatrix)

    const hummer = new Destroyer()
    document.addEventListener('keypress', (e) => {
        const key = e.key;
        if (key === 'z' && !hummer.activation)
        {
            hummer.initSprite();
            hummer.activate();
            document.addEventListener('mousemove', (e) => hummer.followMouse(e))
            document.addEventListener('pointerdown', (e) => hummer.click(e))
        }
    })

    window.addEventListener('keydown', (event) => {
        var key = event.key
        if (key === 'r' && !buildingMoment)
        {
            t = new build(100, 0, 2 , 5);
            t.setMatrixPattern([
                [0, 0, 0],
                [0, 1, 0],
                [1, 1, 0],
            ])
            t.renderMatrixPattern();
            buildingMoment = true
        }
        if (key === 't' && !buildingMoment)
        {
            t = new build(100, 0, 1, 1);
            t.setMatrixPattern([
                [1, 1, 0],
                [1, 1, 0],
                [1, 1, 0], 
            ])
            t.renderMatrixPattern();
            buildingMoment = true
        }
        if (key === 'y' && !buildingMoment)
        {
            t = new build(100, 0, 3, 9);
            t.setMatrixPattern([
                [1, 1, 0],
                [1, 1, 0],
                [1, 1, 0], 
            ])
            t.renderMatrixPattern();
            buildingMoment = true
        }
        if (key === 'u' && !buildingMoment)
        {
            t = new build(100, 0, 4, 13);
            t.setMatrixPattern([
                [0, 0, 0],
                [0, 1, 0],
                [0, 0, 0], 
            ])
            t.renderMatrixPattern();
            buildingMoment = true
        }
        if (key === 'i' && !buildingMoment)
        {
            t = new build(100, 0, 5, 17);
            t.setMatrixPattern([
                [1, 1, 1],
                [1, 1, 1],
                [1, 1, 1], 
            ])
            t.renderMatrixPattern();
            buildingMoment = true
        }
        else if(key === 'a')
        {
            cells.forEach(cell => {
                cell.setDirectPositions(cell.getBounds().x - 50, cell.getBounds().y)
            })
            buildings.forEach(build => {
                build.setPosition(build.getBounds().x - 50, build.getBounds().y)
            })
        }
        else if(key === 'w')
        {
            cells.forEach(cell => {
                cell.setDirectPositions(cell.getBounds().x, cell.getBounds().y - 50)
            })
            buildings.forEach(build => {
                build.setPosition(build.getBounds().x, build.getBounds().y  - 50)
            })
        }
        else if(key === 'l')
        {
            cells.forEach(cell => {
                console.log(123321123);
            })
            buildings.forEach(build => {
                build.setPosition(build.getBounds().x + 50, build.getBounds().y)
            })
        }
        else if(key === 's')
        {
            cells.forEach(cell => {
                cell.setDirectPositions(cell.getBounds().x, cell.getBounds().y + 50)
            })
            buildings.forEach(build => {
                build.setPosition(build.getBounds().x, build.getBounds().y  + 50)
            })
        }
        if(key === 'g' && buildingMoment)
        {
            if (t)
            {
                t.clearPatterns();
                t.clearCellsStatus();
                t.rotateMatrix(1);
                t.renderMatrixPattern();
            }
        }
        if(key === 'f' && buildingMoment)
        {
            if (t)
            {
                t.clearPatterns();
                t.clearCellsStatus();
                t.rotateMatrix(-1);
                t.renderMatrixPattern();
            }
        }
    })

    // window.addEventListener('oncontextmenu', (e) => {
    //     console.log('asdsad');
    //     e.preventDefault();
    //     t.clearPatterns();
    //     delete t.__sprite;
    // })

    document.addEventListener("pointerdown", function(event) {
        if (event.button === 2 && buildingMoment) 
        {
            event.preventDefault();
            t.clearPatterns();
            t.clearCellsStatus();
            app.stage.on('pointermove', (event) => t.startMouseFollowing(event)).off('pointermove');
            app.stage.removeChild(t.__sprite);
            t.__sprite.destroy();
            buildingMoment = false;
        }
      });


    const timer = new Timer(5000);

    app.ticker.add(() => {
        timer.update(app.ticker.elapsedMS);

        if (timer.isExpired()) {
            timer.pause();
        }
    });

    return {
        stage: app.stage,
    };
})();


