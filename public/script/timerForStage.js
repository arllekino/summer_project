import { Game } from "./classes/game.js";

function RotateBlockWheelEvents(wheelBlock, stage, resolve, textTimer) {
    const ticker = new PIXI.Ticker;
    let rotation = 0;
    switch (stage) {
        case 1:
            rotation = -Math.PI / 2;
            break;
        case 2:
            rotation = -Math.PI;
            break;
        case 3:
            rotation = -Math.PI * 1.5;
            break;
        case 4:
            rotation = -Math.PI * 2;
            break;
        default:
            rotation = wheelBlock.rotation;
    }
	ticker.add((time) => {
        if (wheelBlock.rotation > rotation)
        {
            wheelBlock.rotation -= 0.03 * time.deltaTime;
        }
		else
        {
            if (stage == 4) {
                wheelBlock.rotation = 0;
            }
			ticker.destroy();
            resolve();
            textTimer.text = "";
		}
	})
    ticker.start();
}

export function startTimerForStage(time, wheelBlock, stage, resolve, app, flags) {
    const startTime = new Date();
    const stopTime = startTime.setSeconds(startTime.getSeconds() + time);

    const textTimer = new PIXI.Text();
    textTimer.style.fill = 0xFFFFFF;
    const percentageScreenWidth = 0.494;
	const percentageScreenHeight = 0.02;
    textTimer.x = app.screen.width * percentageScreenWidth;
    textTimer.y = app.screen.height * percentageScreenHeight;
    app.stage.addChild(textTimer);

    function Ready(event) {
        clearInterval(timer);
        RotateBlockWheelEvents(wheelBlock, stage, resolve, textTimer);
        textTimer.text = "";
        Game.playerReady = true;
        flags.wheelFlag = false;
        wheelBlock.removeEventListener("pointerdown", Ready);
        resolve();
    }

    const timer = setInterval(() => {
        if (!flags.wheelFlag)
        {
            console.log('first');
            flags.wheelFlag = true;
            wheelBlock.addEventListener("pointerdown", Ready);
        }

        const now = new Date();
        const remain = stopTime - now;

        textTimer.text = `${Math.ceil(remain / 1000)}`;

        if (remain <= 0) {
            clearInterval(timer);
            RotateBlockWheelEvents(wheelBlock, stage, resolve, textTimer);
        }
    }, 1000);
}