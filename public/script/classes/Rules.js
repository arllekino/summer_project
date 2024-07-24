export class Rules
{
    constructor(app) {
        this.spriteRuleBox;
        this.spriteBuildingsBox;
        this.spriteButton;
        this.buttonText;
        this.container = new PIXI.Container();
        this.container.zIndex = 999999999;
        this.visibility = false;
        this.app = app;
        this.initSprite(app);
        this.initBuildingsSprites(app);
        this.initRuleButton(app);
    }

    initSprite(app) {
        this.spriteRuleBox = new PIXI.Sprite(PIXI.Texture.from(`infobox.png`));
        this.spriteRuleBox.scale.set(1.55, 4);
        let percentageScreenWidth = 0.15;
        let percentageScreenHeight = 0.01;
        this.spriteRuleBox.position.set(app.screen.width * percentageScreenWidth, app.screen.height * percentageScreenHeight);

        const textStyle = new PIXI.TextStyle({
            fill: 'white',
            fontSize: 14,
        });

        let givingResourceText = new PIXI.Text({text: `ПРАВИЛА:\n
Цель: уничтожить замки противников.\n
4 СТАДИИ:\n
 1 Стадия – Сбор урожая: в появившемся вы видите два блока\n(первый справа, второй слева). В левом окне лежат кубики, на гранях кубиков\n видно сколько каких ресурсов вы получите с кубиков, если не перебросите их.\n Нажимая на кубики вы перемещаете их в правый блок в котором отображаются\n кубики, которые выбраны для переброса. Нажимая кнопку под правым\n блоком кубики перебрасываются и отправляются обратно в правый блок.\n Перебросить кубики можно лишь 1 раз.\n Игра продолжается, если все игроки нажали готов или все игроки\n истратили свои попытки, либо если все игроки нажали кнопку готовности\n в правом нижнем углу экрана.\n
 2 Стадия – Стадия катастрофы:\n 
 3 Стадия – Стадия строительства: выбирая здания на плашке снизу вы можете\n построить выбранное здание, наведя мышь на место на вашем острове.\n Здание можно строить только на незанятые клетки с землёй. Если здание\n можно построить то клетки под зданием загораются зелёным, иначе красным.\n Для удобства постройки здания можно крутить нажимая на ‘f’ и ‘g’. Строя\n здания вы тратите ресурсы. Каждое здание даёт своё преимущество. Во время\n строительства игрок может ломать здания и ресурсы, выбрав молоток,\n нажав на ‘z’. Стадия заканчивается по истечению времени или, если все игроки\n нажали кнопку готовности.\n
 4 Стадия – Стадия войны: во время войны игроки отправляют свою\n армию (если есть) на острова противников. Для этого игрок выбирает\n здание на острове противника нажимая на него. Затем корабль с армией едет\n до острова и начинается битва. Игрок в это время просто следит за боем,\n никак не влияя на борьбу.\n
После конца 4-ой стадии начинается 1 стадия\n
Игра начинается с фазы строительства, где вы ставите своё главное здание\n и продолжается 1-ой Стадией.\n`, style: textStyle});
        givingResourceText.position.set(this.spriteRuleBox.getBounds().x + 5, this.spriteRuleBox.getBounds().y + 10);
        // this.app.stage.addChild(givingResourceText);

        this.container.addChild(this.spriteRuleBox)
        this.container.addChild(givingResourceText)

    }

    initRuleButton(app)
    {
        this.spriteButton = new PIXI.Sprite(PIXI.Texture.from('infobox.png'));
        app.stage.addChild(this.spriteButton);
        this.spriteButton.scale.set(0.3, 0.3);
        const percentageScreenWidth = 0.93;
        const percentageScreenHeight = 0.01;
        this.spriteButton.position.set(app.screen.width * percentageScreenWidth, app.screen.height * percentageScreenHeight);
        this.spriteButton.interactive = true;
        this.buttonText = new PIXI.Text({text: 'ПРАВИЛА', style: new PIXI.TextStyle({
            fill: 'white',
            fontSize: 20,
        })});
        this.buttonText.position.set(this.spriteButton.getBounds().x + 7, this.spriteButton.getBounds().y + 10);
        this.app.stage.addChild(this.buttonText);
        this.buttonText.interactive = true;
        this.spriteButton.zIndex = 9999999;
        this.buttonText.zIndex = 9999999;
        this.spriteButton.on('click', (a) => this.click());
        this.buttonText.on('click', (a) => this.click());
    }

    initBuildingsSprites(app)
    {
        const textStyle = new PIXI.TextStyle({
            fill: 'white',
            fontSize: 14,
        });
        
        this.spriteBuildingsBox = new PIXI.Sprite(PIXI.Texture.from(`infobox.png`));
        this.spriteBuildingsBox.scale.set(1.55, 4);
        const percentageScreenWidth = 0.53;
        const percentageScreenHeight = 0.01;
        this.spriteBuildingsBox.position.set(app.screen.width * percentageScreenWidth, app.screen.height * percentageScreenHeight);

        const castle  = new PIXI.Sprite(PIXI.Texture.from(`building_17.png`));
        castle.position.set(this.spriteBuildingsBox.getBounds().x + 10, this.spriteBuildingsBox.getBounds().y + 20);

        const castleDice  = new PIXI.Sprite(PIXI.Texture.from(`castleDice.png`));
        castleDice.position.set(castle.getBounds().x + castle.getBounds().width + 20, castle.getBounds().y + 10);

        const farm = new PIXI.Sprite(PIXI.Texture.from(`building_1.png`));
        farm.position.set(castle.getBounds().x, castle.getBounds().y + castle.getBounds().height);

        const grendeHouse = new PIXI.Sprite(PIXI.Texture.from(`building_5.png`));
        grendeHouse.position.set(farm.getBounds().x, farm.getBounds().y + farm.getBounds().height - 10);

        const grendeHouseDice  = new PIXI.Sprite(PIXI.Texture.from(`houseDice.png`));
        grendeHouseDice.position.set(castle.getBounds().x + castle.getBounds().width + 20, grendeHouse.getBounds().y + 10);

        const warehouse  = new PIXI.Sprite(PIXI.Texture.from(`building_9.png`));
        warehouse.position.set(grendeHouse.getBounds().x, grendeHouse.getBounds().y + grendeHouse.getBounds().height);

        const farmerHouse  = new PIXI.Sprite(PIXI.Texture.from(`building_13.png`));
        farmerHouse.position.set(warehouse.getBounds().x, warehouse.getBounds().y + warehouse.getBounds().height + 20);

        const farmerHouseDice  = new PIXI.Sprite(PIXI.Texture.from(`farmerDice.png`));
        farmerHouseDice.position.set(castle.getBounds().x + castle.getBounds().width + 20, farmerHouse.getBounds().y + 10);

        const barrack  = new PIXI.Sprite(PIXI.Texture.from(`building_28.png`));
        barrack.position.set(farmerHouse.getBounds().x, farmerHouse.getBounds().y + farmerHouse.getBounds().height + 5);

        const barrackDice  = new PIXI.Sprite(PIXI.Texture.from(`barrackDice.png`));
        barrackDice.position.set(castle.getBounds().x + castle.getBounds().width + 20, barrack.getBounds().y + 10);

        const givingResourceText = new PIXI.Text({text: ` Главное здание\n Даёт кубик замка. Выпускает стрелы\n во врагов во время сражения\n\n
 Ферма\n Даёт 1 ед пищи\n Стоимость постройки:\n 1) 1 молоток\n 2) 1 дерево\n
 Дом знати\n Даёт кубик\n Стоимость постройки:\n 1) 1 молоток\n 2) 2 камня\n
 Хранилище\n Увеличивает максимальное количество\n всех ресурсов(кроме воинов)\n Стоимость постройки:\n 1) 1 молоток\n 2) 2 камня\n 3) 2 дерево\n
 Дом фермера\n Даёт кубик\n Стоимость постройки:\n 1) 1 молоток\n 2) 2 дерева\n
 Барак\n Даёт кубик\n Стоимость постройки:\n 1) 1 молоток\n 2) 1 дерево\n 2 камень\n 2 монеты\n`, style: textStyle});
        givingResourceText.position.set(castleDice.getBounds().x + castleDice.getBounds().width + 15, castle.getBounds().y + 10);

        this.container.addChild(this.spriteBuildingsBox);
        this.container.addChild(farm);
        this.container.addChild(grendeHouse);
        this.container.addChild(warehouse);
        this.container.addChild(farmerHouse);
        this.container.addChild(castle);
        this.container.addChild(givingResourceText);
        this.container.addChild(castleDice);
        this.container.addChild(grendeHouseDice);
        this.container.addChild(farmerHouseDice);
        this.container.addChild(barrack);
        this.container.addChild(barrackDice);
    }

    click()
    {
        if (!this.visibility)
        {
            this.app.stage.addChild(this.container);
            this.visibility = true;
            this.buttonText.text = 'ЗАКРЫТЬ'
        }
        else
        {
            this.app.stage.removeChild(this.container);
            this.visibility = false;
            this.buttonText.text = 'ПРАВИЛА'
        }
    }

}