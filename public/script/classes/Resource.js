export class Resource
{
    constructor(app, type, cell, dimensions)
    {
        this.sprite;
        this.resourceType = type;
        this.dimensions = dimensions;
        this.bounds;
        this.interactivity = true;
        switch (type)
        {
            case 1:
                this.__droppingResources = {wood: 1};
                break;
            case 2:
                this.__droppingResources = {stone: 1};
                break;
            default:
                this.__droppingResources = {}
        }
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

    getDroppingResources()
    {
        return this.__droppingResources;
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