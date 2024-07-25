export class Warrior {
  constructor(app, name, x, y, hp, damage, warriorFlag) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.__hp = hp;
    this.damage = damage;
    this.sprite;
    this.attacking = false;
    this.attackDuration = 300;
    this.app = app;
    switch (warriorFlag)
    {
        case 'green':
            this.warriorPtr = 2;
            break;
        case 'red':
            this.warriorPtr = 1;
            break;
        case 'blue':
            this.warriorPtr = 3;
            break;
        case 'yellow':
            this.warriorPtr = 4;
            break;
    }

    this.initSprite(app, x, y);
  }

  initSprite(app, x, y) {
    this.sprite = new PIXI.Sprite(PIXI.Texture.from(`warrior_${this.warriorPtr}.png`));
    this.sprite.x = x;
    this.sprite.y = y;
    this.sprite.zIndex = 400;
    this.sprite.anchor.set(0.5);
    app.stage.addChild(this.sprite);

    this.attackSprite = new PIXI.Sprite(PIXI.Texture.from(`warrior_${this.warriorPtr}_2.png`));
    this.attackSprite.x = x;
    this.attackSprite.y = y;
    this.attackSprite.zIndex = 10;
    this.attackSprite.anchor.set(0.5);
    this.attackSprite.visible = false;
    app.stage.addChild(this.attackSprite);
  }

  attack(target, damage) {
    if (!this.attacking && target) {
      this.attacking = true;

      if (target) {
        target.__hp -= damage;
      }

      this.attackSprite.x = this.sprite.x;
      this.attackSprite.y = this.sprite.y;

      this.attackSprite.visible = false;
      this.sprite.visible = true;

      return new Promise(resolve => {
        setTimeout(() => {
          this.sprite.visible = false;
          this.attackSprite.visible = true;
          this.attacking = false;
          resolve();
        }, this.attackDuration);
      });
    }
  }

  getHp()
  {
    return this.__hp;
  }
  damaged(damage)
  {
    const fireTextures = []
    for (let i = 1; i <= 8; i++)
    {
      const texture = PIXI.Texture.from(`fire_${i}.png`);
      fireTextures.push(texture);
    }
    for (let i = 8; i >= 1; i--)
    {
      const texture = PIXI.Texture.from(`fire_${i}.png`);
      fireTextures.push(texture);
    }

    const fire = new PIXI.AnimatedSprite(fireTextures);
    fire.animationSpeed = 0.7;
    fire.zIndex = this.sprite.zIndex + 1;
    fire.position.set(this.sprite.getBounds().x, this.sprite.getBounds().y)
    this.app.stage.addChild(fire)
    fire.play();
    setTimeout(() => {
      fire.stop();
      this.app.stage.removeChild(fire);
      fire.destroy();
      this.__hp -= damage;
      if (this.__hp <= 0)
      {
        this.destroy(this.app);
      }
    }, 300)
  }

  destroy(app) {
    this.sprite.destroy();
    app.stage.removeChild(this.sprite);
  }

  getSprite() {
    return this.sprite;
  }
}