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
		wheelBlock.rotation -= 0.03 * time.deltaTime;
		if (wheelBlock.rotation <= rotation) {
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

export function startTimerForStage(time, wheelBlock, stage, resolve, app) {
    const startTime = new Date();
    const stopTime = startTime.setSeconds(startTime.getSeconds() + time);

    const textTimer = new PIXI.Text();
    textTimer.style.fill = 0xFFFFFF;
    const percentageScreenWidthLeft = 0.494;
	const percentageScreenHeightLeft = 0.02;
    textTimer.x = app.screen.width * percentageScreenWidthLeft;
    textTimer.y = app.screen.height * percentageScreenHeightLeft;
    app.stage.addChild(textTimer);

    const timer = setInterval(() => {

        wheelBlock.addEventListener("click", function Ready() {
            clearInterval(timer);
            resolve();
            textTimer.text = "";
            Game.playerReady = true;
            this.removeEventListener("click", Ready);
        })

        const now = new Date();
        const remain = stopTime - now;

        textTimer.text = `${Math.ceil(remain / 1000)}`;

        if (remain <= 0) {
            clearInterval(timer);
            RotateBlockWheelEvents(wheelBlock, stage, resolve, textTimer);
        }
    }, 1000);
}