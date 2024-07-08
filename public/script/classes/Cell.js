import { cartesianToIsometric } from "./CommonFunctions.js";
export class Cell {
    constructor(app, ptrTower, placeType) {
        this.__ptrTower = ptrTower;
        this.__placeType = placeType;
        this.__sprite;
        this.__bounds;
        this.__active = false;
        this.__cellId = 0;
        this.initSprite(app)
    }

    intersectWithCell(object) {
        const bounds = object.getBounds();
        return (
            this.__bounds.x + this.__bounds.width / 2.37 < bounds.x + bounds.width / 1.72
            && this.__bounds.x + this.__bounds.width / 1.72 > bounds.x + bounds.width / 2.37
            && this.__bounds.y + this.__bounds.height / 2.46 < bounds.y + bounds.height / 2
            && this.__bounds.y + this.__bounds.height / 2 > bounds.y + bounds.height / 2.46
        );
    }

    getSprite() {
        return this.__sprite;
    }

    setCellId(id) {
        this.__cellId = id;
    }

    getCellId() {
        return this.__cellId;
    }

    activate() {
        this.__active = true;
    }

    deactivate() {
        this.__active = false;
    }

    getActive() {
        return this.__active;
    }

    getPtrTower() {
        return this.__ptrTower;
    }

    setPtrTower(newPtr) {
        this.__ptrTower = newPtr;
    }

    initSprite(app) {
        this.__sprite = new PIXI.Sprite(PIXI.Texture.from(`ground_${this.__placeType}.png`));
        //this.__sprite.texture.rotate = 1;
        //this.__sprite.texture.updateUvs();
        //this.__sprite.height /= 2;
        app.stage.addChild(this.__sprite);
    }

    changeType(type) {
        this.__placeType = type;
        this.__sprite.texture = PIXI.Texture.from(`ground_${type}.png`);
        //this.__sprite.texture.rotate = 1;
        //this.__sprite.texture.updateUvs();
    }

    errorField() {
        this.__sprite.texture = PIXI.Texture.from(`ground_${3}.png`);
        //this.__sprite.texture.rotate = 1;
        //this.__sprite.texture.updateUvs();
    }

    okField() {
        this.__sprite.texture = PIXI.Texture.from(`ground_${4}.png`);
        //this.__sprite.texture.rotate = 1;
        //this.__sprite.texture.updateUvs();
    }

    setPositionsInIsometric(x, y) {
        const isoPos = cartesianToIsometric(x, y);
        this.__sprite.position.set(isoPos.x, isoPos.y);
        this.__bounds = this.__sprite.getBounds();
    }

    setDirectPositions(x, y) {
        this.__sprite.position.set(x, y);
        this.__bounds = this.__sprite.getBounds();
    }

    getPositions() {
        const x = this.__sprite.position.x;
        const y = this.__sprite.position.y;
        return { x, y };
    }

    getBounds() {
        return this.__sprite.getBounds();
    }

    getType() {
        return this.__placeType;
    }
}
