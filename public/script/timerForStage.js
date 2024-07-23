import { Game } from "./classes/game.js";
import { SendPlayerId, WaitingForPlayers } from "./websocket/logicForStage.js";
import { getUsersIds } from "./formationOfGame.js";

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


export async function startTimerForStage(time, wheelBlock, stage, resolve, app, flags, idUser, arrPlayersId) {
    const startTime = new Date();
    const stopTime = startTime.setSeconds(startTime.getSeconds() + time);
    let waitingForPlayers = null;

    const textTimer = new PIXI.Text();
    textTimer.style.fill = 0xFFFFFF;
    const percentageScreenWidth = 0.48;
	const percentageScreenHeight = 0.02;
    textTimer.x = app.screen.width * percentageScreenWidth;
    textTimer.y = app.screen.height * percentageScreenHeight;
    textTimer.zIndex = 99999999;
    app.stage.addChild(textTimer);
    const userIDInLobby = await getUsersIds();

    function Ready(event) {
        SendPlayerId(arrPlayersId, idUser);
        Game.playerReady = true;
        flags.wheelFlag = false;
        wheelBlock.removeEventListener("pointerdown", Ready);
    }

    const timer = setInterval(async () => {
        if (!flags.wheelFlag)
        {
            console.log('first');
            flags.wheelFlag = true;
            wheelBlock.addEventListener("pointerdown", Ready);
        }
        
        if (userIDInLobby.length === arrPlayersId.arr.length && Game.playerReady) {
            Game.playerReady = false;
            Game.isAllPlayersReady = true;
            textTimer.text = "";
            setTimeout(() => {
                console.log('asd');
                clearInterval(timer);
                waitingForPlayers = null;
                RotateBlockWheelEvents(wheelBlock, stage, resolve, textTimer);
                resolve();
            }, 300)
        }

        const now = new Date();
        const remain = stopTime - now;

        textTimer.text = `${Math.ceil(remain / 1000)}`;

        if (remain <= 0) {
            if (waitingForPlayers)
            {
                clearInterval(waitingForPlayers);
            }
            Game.isAllPlayersReady = false
            clearInterval(timer);
            waitingForPlayers = null;
            RotateBlockWheelEvents(wheelBlock, stage, resolve, textTimer);
        }
    }, 1000);
}