import { intersects, distance } from "./CommonFunctions.js";

export class Destroyer
    {
        constructor(app)
        {
            this.app = app;
            this.__sprite;
            this.activation = false;
        }

        initSprite()
        {
            this.__sprite = new PIXI.Sprite(PIXI.Texture.from(`hummer.png`));
            this.app.stage.addChild(this.__sprite);
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

        click(e, buildings)
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
                        console.log(minDistBuilding.__cellsStatus);
                    }
                    this.deactivate();
                    minDistBuilding.__sprite.destroy();
                    buildings.splice(buildings.indexOf(minDistBuilding), 1);
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

export function AddEventListenersForHammer(hummer, buildings, buildingMoment, app, stage) {
    document.addEventListener('keypress', (e) => {
        const key = e.key;
        if (key === 'z' && !hummer.activation && stage === 3) {
            hummer.initSprite(app);
            hummer.activate();
        }
    })
    window.addEventListener('keydown', (event) => {
        const key = event.key
        if (key === 'r' && !buildingMoment.isContctructionGoingNow && stage === 3)
        {
            hummer.initSprite();
            hummer.activate();
        }
    })
    document.addEventListener('mousemove', (e) => hummer.followMouse(e), true)
    document.addEventListener('pointerdown', (e) => hummer.click(e, buildings), true)
}