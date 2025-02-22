import { mouseDistanceInContainer, mouseIntersectsInContainer, mouseIntersects, contains, mouseDistance } from "./CommonFunctions.js";
import { Game } from "./game.js";
import { UpdateNumberOfResources } from "../drawInfoBlocks.js";
import { SendDestroyBuilding } from "../websocket/logicForStage.js";
import { Sound } from "./Sound.js";
import { deleteIslandBuilding } from "../gameRequsets.js";

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

        click(e, objects, buildings, resources, resourcesOfUser, allTextResources, buildingCountsOfUser, containerForMap, cells)
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
                if (((mouseIntersectsInContainer(e, object, containerForMap) && mouseDistanceInContainer(e, object, containerForMap) < min && contains(buildings, object)) ||
                (mouseIntersects(e, object) && mouseDistance(e, object) < min && contains(resources, object))) && object.interactivity)
                {
                    minDistObject = object;
                    min = mouseDistanceInContainer(e, object, containerForMap);
                    if (contains(resources, object))
                    {
                        min = mouseDistance(e, object);
                    }
                }
            })
            if (minDistObject)
            {
                SendDestroyBuilding(minDistObject, cells);
                deleteIslandBuilding(minDistObject.id);
                this.__sprite.destroy();
                this.deactivate();
                resourcesOfUser['hammer'] -= 1;
                let destroySound = new Sound('woodSound', 0.03, false);
                if (minDistObject.constructor.name !== 'Resource')
                {
                    buildingCountsOfUser[minDistObject.getAlias()] -= 1;
                    resourcesOfUser['inhabitants'] -= 1;
                    destroySound = new Sound('stoneBuildingDestroy', 0.03, false);
                }
                for (const resource in minDistObject.getDroppingResources())
                {
                    resourcesOfUser[resource] += minDistObject.getDroppingResources()[resource];
                }
                destroySound.repeating(false);
                destroySound.play();
                UpdateNumberOfResources(allTextResources, resourcesOfUser, buildingCountsOfUser)
                if (minDistObject.__cellsStatus['-1'])
                {
                    minDistObject.sprite.destroy();
                    minDistObject.__cellsStatus['-1'].setPtrTower(-1);
                    resources.splice(resources.indexOf(minDistObject), 1);
                    
                    return;
                }
                for (const cellId in minDistObject.__cellsStatus)
                {
                    minDistObject.__cellsStatus[cellId].setPtrTower(-1);
                }
                minDistObject.__sprite.destroy();
                buildings.splice(buildings.indexOf(minDistObject), 1); 
                return;
            }
        }

        destroyObject(object, buildings, resources)
        {
            this.__sprite.destroy();
            if (object.__cellsStatus['-1'])
            {
                object.sprite.destroy();
                object.__cellsStatus['-1'].setPtrTower(-1);
                resources.splice(resources.indexOf(object), 1);
                
                return;
            }
            for (const cellId in object.__cellsStatus)
            {
                object.__cellsStatus[cellId].setPtrTower(-1);
            }
            object.__sprite.destroy();
            buildings.splice(buildings.indexOf(object), 1); 
            return;
        }

        followMouse(e)
        {
            if (this.activation)
            {
                const position = {'x': e.clientX, 'y': e.clientY};
                this.__sprite.x = position.x - this.__sprite.getBounds().width;
                this.__sprite.y = position.y - this.__sprite.getBounds().height / 2;
            }
        }
}

export function AddEventListenersForHammer(hummer, buildings, resources, cells, app, resourcesOfUser, allTextResources, buildingCountsOfUser, containerForMap) {
    document.addEventListener('keypress', (e) => {
        const key = e.key;
        if (key === 'z' && !hummer.activation && Game.stage === 3 && resourcesOfUser['hammer'] > 0) {
            hummer.initSprite(app);
            hummer.activate();
        }
    })
    // window.addEventListener('keydown', (event) => {
    //     const key = event.key
    //     if (key === 'r' && !buildingMoment && Game.stage === 3)
    //     {
    //         hummer.initSprite();
    //         hummer.activate();
    //     }
    // })
    document.addEventListener('mousemove', (e) => hummer.followMouse(e), true)
    document.addEventListener('pointerdown', (e) => hummer.click(e, [...buildings, ...resources], buildings, resources, resourcesOfUser, allTextResources, buildingCountsOfUser, containerForMap, cells))
}