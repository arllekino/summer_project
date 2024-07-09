export class Infobox
{
    constructor(app) {
        this.textContainer = [];
        this.sprite;
        this.container = new PIXI.Container()
        this.visibility = true;
        this.app = app;
        this.initSprite(app);
        window.addEventListener('mouseup', (e) => this.hide(e));
    }

    initSprite(app) {
        this.sprite = new PIXI.Sprite(PIXI.Texture.from(`infobox.png`));
        this.container.addChild(this.sprite)
        // app.stage.addChild(this.sprite);
        //this.sprite.anchor.set(0.5);
        this.sprite.scale.set(1.2, 1);
        const percentageScreenWidth = 0.3;
        const percentageScreenHeight = 0.77;
        this.sprite.position.set(app.screen.width * percentageScreenWidth, app.screen.height * percentageScreenHeight);
    }

    initInfo(building){
        const buildingSprite = new PIXI.Sprite(building.getTexture());
        buildingSprite.zIndex = this.sprite.zIndex + 1;
        buildingSprite.position.set(this.sprite.getBounds().x, this.sprite.getBounds().y + this.sprite.getBounds().height / 2 - buildingSprite.getBounds().height / 2);

        const textStyle = new PIXI.TextStyle({
            fill: 'white',
            fontSize: 14,
        });

        const text = new PIXI.Text({text: building.getName(), style: new PIXI.TextStyle({
            fill: 'white',
        })});
        text.position.set(this.sprite.getBounds().x + this.sprite.getBounds().width / 2 - text.getBounds().width / 2, this.sprite.getBounds().y);

        let diceTexture;
        switch (building.getName()) {
            case 'Castle': diceTexture = PIXI.Texture.from(`castleDice.png`); break;
            case 'House': diceTexture = PIXI.Texture.from(`houseDice.png`); break;
            case 'Farmer House': diceTexture = PIXI.Texture.from(`farmerDice.png`); break;
            default: diceTexture = null;
        }
        if (diceTexture) {
            let diceSprite = new PIXI.Sprite(diceTexture);
            diceSprite.position.set(buildingSprite.getBounds().x + buildingSprite.getBounds().width + 5, this.sprite.getBounds().y + this.sprite.getBounds().height / 2 - diceSprite.getBounds().height / 2);
            this.container.addChild(diceSprite);
            let hpText =  new PIXI.Text({text: `HP: ${building.getHp()}`, style: textStyle});
            hpText.position.set(diceSprite.getBounds().x + diceSprite.getBounds().width + 10, diceSprite.getBounds().y);
            this.container.addChild(hpText);
            let givingResourceText = new PIXI.Text({text: `Dropping resources:`, style: textStyle});
            for (const key in building.getDroppingResources()) {
                givingResourceText.text += `\n${key}: ${building.getDroppingResources()[key]}`;
            }
            givingResourceText.position.set(hpText.getBounds().x + hpText.getBounds().width + 10, hpText.getBounds().y);
            this.container.addChild(givingResourceText);
        }
        else {
            let text2 = new PIXI.Text({text: `Producing resource: ${Object.keys(building.getGivingResource())[0]}: ${Object.values(building.getGivingResource())[0]}`, style: textStyle});
            text2.position.set(buildingSprite.getBounds().x + buildingSprite.getBounds().width + 5, buildingSprite.getBounds().y);
            this.container.addChild(text2);
            let hpText =  new PIXI.Text({text: `HP: ${building.getHp()}`, style: textStyle});
            hpText.position.set(text2.getBounds().x, text2.getBounds().y + text2.getBounds().height + 5);
            this.container.addChild(hpText);
            let givingResourceText = new PIXI.Text({text: `Dropping resources:`, style: textStyle});
            console.log(building.getDroppingResources());
            for (const key in building.getDroppingResources()) {
                console.log(key, building.getDroppingResources()[key])
                givingResourceText.text += `\n${key}: ${building.getDroppingResources()[key]}`;
                console.log(givingResourceText.text)
            }
            givingResourceText.position.set(hpText.getBounds().x, hpText.getBounds().y + hpText.getBounds().height + 10);
            this.container.addChild(givingResourceText);
        }

        this.container.addChild(buildingSprite);
        this.container.addChild(text);
    }

    show(building) {
        this.hide('');
        this.visibility = true;
        this.initInfo(building);
        this.app.stage.addChild(this.container);
    }

    hide(e) {
        console.log('What');
        if (this.visibility) {
            this.visibility = false
            this.app.stage.removeChild(this.container);
            this.container.removeChildren();
            this.initSprite(this.app);
        }
    }
}