export class Rules
{
    constructor(app) {
        this.textContainer = [];
        this.sprite;
        this.container = new PIXI.Container()
        this.visibility = true;
        this.app = app;
        this.initSprite(app);
        console.log('HAHAHAHAHHAH');
        this.show();
        // window.addEventListener('mouseup', (e) => this.hide(e));
    }

    initSprite(app) {
        this.sprite = new PIXI.Sprite(PIXI.Texture.from(`infobox.png`));
        this.container.addChild(this.sprite)
        app.stage.addChild(this.sprite);
        //this.sprite.anchor.set(0.5);
        this.sprite.scale.set(1.2, 4);
        const percentageScreenWidth = 0.35;
        const percentageScreenHeight = 0.01;
        this.sprite.position.set(app.screen.width * percentageScreenWidth, app.screen.height * percentageScreenHeight);

        const textStyle = new PIXI.TextStyle({
            fill: 'white',
            fontSize: 14,
        });

        let givingResourceText = new PIXI.Text({text: `ПРАВИЛА:\n
Цель: уничтожить замки противников.\n
4 СТДАИИ:\n
	1 Стадия – Сбор урожая: в появившемся вы видите два блока\n(первый справа, второй слева). В левом окне лежат кубики,\n на гранях кубиков видно сколько каких ресурсов вы получите\n с кубиков если не перебросите их. Нажимая на кубики вы\n перемещаете их в правый блок в котором отображаются кубики\n которые выбраны для переброса. Нажимая кнопку под правым\n блоком кубики перебрасываются и отправляются обратно\n правый блок. Перебросить кубики можно лишь 1 раз.\n Игра продолжается если\n все игроки нажали готов или если все игроки истратили\n свои попытки, либо если все игроки нажали кнопку готовности\n в правом нижнем углу экрана.\n
	2 Стадия – Стадия катастрофы:\n 
	3 Стадия – Стадия строительства: выбирая здания на плашке снизу вы можете построить выбранное здание, наведя мышь\n на место на вашем острове. Здание можно строить только на незанятые клетки\n с землёй. Если здание можно построить то клетки под зданием загораются зелёным,\n иначе красным. Для удобства стройки здания можно крутить нажимая\n на ‘f’ и ‘g’ Строя здания вы тратите ресурсы. Каждое здание даёт своё преимущество. Во время\n строительсва игрок может ломать здания и ресурсы, выбрав молоток, нажав на ‘z’.\n Стадия заканчивается по истечению времени или, если все игроки нажали кнопку готовности.\n
	4 Стадия – Стадия войны: во время войны игроки отправляют\n свою армию(если есть) на острова противников. Для этого игрок выбирает здание на острове\n противника нажимая на него. Затем корабль с армией едет до острова и начинается битва. Игрок в это\n время просто следит за боем, никак не влияя на борьбу.\n
После конца 4ой стадии начинается 1 стадия\n
Игра начинается с фазы строительства, где вы ставите своё главное здание и продолжается 1-ой Стадией.\n`, style: textStyle});
        givingResourceText.position.set(this.sprite.getBounds().x, this.sprite.getBounds().y);
        this.app.stage.addChild(givingResourceText);
    }

    show()
    {
        // this.app.stage.addChild(this.textContainer);
    }
}