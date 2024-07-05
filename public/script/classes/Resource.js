export class Resource
{
    constructor(app, type, cell)
    {
        this.sprite;
        this.resourceType = type;
        this.bounds;
        this.__cellsStatus = {
            '-1': cell,
        }
        this.initSprite(app);
    }

    initSprite(app)
    {
        this.sprite = new PIXI.Sprite(PIXI.Texture.from(`resource_${this.resourceType}.png`));
        app.stage.addChild(this.sprite);
        this.bounds = this.sprite.getBounds();
        this.sprite.anchor.set(0.5);
        
        this.sprite.scale = Math.random() * (1 - 0.7) + 0.6;
    }

    setResourceType(type)
    {
        this.resourceType = type;
    }

    getResourceType()
    {
        return this.resourceType;
    }

    updateBounds()
    {
        this.bounds = this.sprite.getBounds();
    }

    getBounds()
    {
        return this.sprite.getBounds();
    }

    setPosition(x, y)
    {
        this.sprite.position.set(x, y);
        this.sprite.zIndex = y + 15;
        this.updateBounds();
    }

    setZIndex(zIndex)
    {
        this.sprite.zIndex = zIndex;
    }

    setAnchor(value)
    {
        this.sprite.anchor.set(value);
    }
}