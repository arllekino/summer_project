import { intersects, distance } from "./CommonFunctions.js";
import { Game } from "./game.js";

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

        click(e, objects, buildings, resources)
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
            var minDistObject = null;
            objects.forEach((object) => {
                if (intersects(this.__sprite, object) && distance(this.__sprite, object) < min)
                {
                    minDistObject = object;
                    min = distance(this.__sprite, object);
                }
            })
            if (minDistObject)
            {
                this.__sprite.destroy();
                this.deactivate();
                console.log(minDistObject.__cellsStatus);
                if (minDistObject.__cellsStatus['-1'])
                {
                    minDistObject.sprite.destroy();
                    minDistObject.__cellsStatus['-1'].setPtrTower(-1)
                    resources.splice(resources.indexOf(minDistObject), 1);
                    return;
                }
                for (const cellId in minDistObject.__cellsStatus)
                {
                    minDistObject.__cellsStatus[cellId].setPtrTower(-1);
                    console.log(minDistObject.__cellsStatus);
                }
                minDistObject.__sprite.destroy();
                buildings.splice(buildings.indexOf(minDistObject), 1);
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

export function AddEventListenersForHammer(hummer, buildings, resources, buildingMoment, app) {
    console.log(resources);
    document.addEventListener('keypress', (e) => {
        const key = e.key;
        if (key === 'z' && !hummer.activation && Game.stage === 3) {
            hummer.initSprite(app);
            hummer.activate();
        }
    })
    window.addEventListener('keydown', (event) => {
        const key = event.key
        if (key === 'r' && !buildingMoment.isContctructionGoingNow && Game.stage === 3)
        {
            hummer.initSprite();
            hummer.activate();
        }
    })
    document.addEventListener('mousemove', (e) => hummer.followMouse(e), true)
    document.addEventListener('pointerdown', (e) => hummer.click(e, [...buildings, ...resources], buildings, resources))
}