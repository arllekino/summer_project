import { DrawBlockForDiceRoll } from "./drawInfoBlocks.js";
import { startTimerForStage } from "./timerForStage.js";
import { GetResources } from "./stages/resources.js";

export function stageResources(containerForDiceRoll, app) {
    const containerCubes = new PIXI.Container();
    const blockButtonReRoll = new PIXI.Sprite();
    DrawBlockForDiceRoll(containerForDiceRoll, app, containerCubes, blockButtonReRoll);
    const buildings = {
        houseVillage: 4,
        houseGrendee: 7,
    }
    GetResources(buildings, containerCubes, containerForDiceRoll, blockButtonReRoll, app);
}

export function stageDisasters() {
    console.log("disasters");
}

export function stageBuilding() {
    console.log("building");
}

export function stageBattles() {
    console.log("battles");
}

export const Game = {
    stage: 1,
}

export async function main(allContainer, app) {
    if (Game.stage == 1) {
        const timeStage = 3;
        const promise = new Promise(function(resolve) {
            startTimerForStage(timeStage, allContainer.wheelBlock, Game.stage, resolve, app);
        }); 
        await Promise.all([promise]);
        stageResources(allContainer.containerForDiceRoll, app);
    }
}