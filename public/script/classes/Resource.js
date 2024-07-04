export class Resource
{
    constructor(app, type)
    {
        this.sprite;
        this.resourceType = type;
        this.bounds;
        this.initSprite(app);
    }

    initSprite(app)
    {
        this.sprite = new PIXI.Sprite(PIXI.Texture.from(`hummer.png`));
        this.app.stage.addChild(this.__sprite);
        this.sprite.scale = 0.8
        this.sprite.zIndex = 999999999;
    }

    setResourceType()
    {

    }

    getResourceType()
    {

    }

    setBounds()
    {

    }

    getBounds()
    {

    }
}