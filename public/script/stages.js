import { DrawBlockForDiceRoll } from "./drawInfoBlocks.js";
import { startTimerForStage } from "./timerForStage.js";
import { GetResources } from "./stages/resources.js";
import { Destroyer, AddEventListenersForHammer } from "./classes/destroyer.js"; 
import { Game } from "./classes/game.js";

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

export async function stageBuilding(app, selectedBuilding, cells, buildings, buildingMoment, t, resources) {

    const hummer = new Destroyer(app)
    AddEventListenersForHammer(hummer, buildings, buildingMoment, app, Game.stage, resources);

    const handleKeyDown = (event) => {
        const key = event.key;
        if (selectedBuilding.buildingSprite) {
            if (key === 'f' && buildingMoment.isContctructionGoingNow && t.buldingObject && Game.stage === 3) {
                t.buldingObject.clearPatterns();
                t.buldingObject.clearCellsStatus()
                t.buldingObject.rotateMatrix(-1);
                t.buldingObject.renderMatrixPattern(app);
            } 
            else if (key === 'g' && buildingMoment.isContctructionGoingNow && t.buldingObject && Game.stage === 3) {
                t.buldingObject.clearPatterns();
                t.buldingObject.clearCellsStatus();
                t.buldingObject.rotateMatrix(1);
                t.buldingObject.renderMatrixPattern(app);
            }
        }
    };

    window.addEventListener('keydown', handleKeyDown);

    document.addEventListener("pointerdown", function(event) {
        if (event.button === 2 && buildingMoment.isContctructionGoingNow && Game.stage === 3) 
        {
            event.preventDefault();
            selectedBuilding.buildingSprite.tint = 0xffffff;
            t.buldingObject.clearPatterns();
            t.buldingObject.clearCellsStatus();
            app.stage.on('pointermove', (event) => t.buldingObject.startMouseFollowing(event)).off('pointermove');
            app.stage.removeChild(t.buldingObject.__sprite);
            t.buldingObject.__sprite.destroy();
            buildingMoment.isContctructionGoingNow = false;
        }
      });
}

export function stageBattles() {
    console.log("battles");
}

export async function main(allContainer, app, selectedBuilding, cells, buildings, buildingMoment, t, resources) {
    allContainer.wheelBlock.interactive = true;
    allContainer.wheelBlock.buttonMode = true;
    allContainer.wheelBlock.cursor = "pointer";

    const handleKeyDown = (event) => {
        const key = event.key;
        if (key === 'a' && Game.stage !== 1) {
            cells.forEach(cell => {
                cell.setDirectPositions(cell.getBounds().x - 50, cell.getBounds().y)
            })
            buildings.forEach(build => {
                build.setPosition(build.getBounds().x - 50, build.getBounds().y)
            })
            resources.forEach(resource => {
                resource.setAnchor(0);
                resource.setPosition(resource.getBounds().x - 50, resource.getBounds().y);
                resource.setAnchor(0.5);
            })
        }
        else if (key === 'w' && Game.stage !== 1) {
            cells.forEach(cell => {
                cell.setDirectPositions(cell.getBounds().x, cell.getBounds().y - 50)
            })
            buildings.forEach(build => {
                build.setPosition(build.getBounds().x, build.getBounds().y - 50)
            })
            resources.forEach(resource => {
                resource.setAnchor(0);
                resource.setPosition(resource.getBounds().x, resource.getBounds().y - 50)
                resource.setAnchor(0.5);
            })
        }
        else if (key === 'd' && Game.stage !== 1) {
            cells.forEach(cell => {
                cell.setDirectPositions(cell.getBounds().x + 50, cell.getBounds().y)
            })
            buildings.forEach(build => {
                build.setPosition(build.getBounds().x + 50, build.getBounds().y)
            })
            resources.forEach(resource => {
                resource.setAnchor(0);
                resource.setPosition(resource.getBounds().x + 50, resource.getBounds().y)
                resource.setAnchor(0.5);
            })
        }
        else if (key === 's' && Game.stage !== 1) {
            cells.forEach(cell => {
                cell.setDirectPositions(cell.getBounds().x, cell.getBounds().y + 50)
            })
            buildings.forEach(build => {
                build.setPosition(build.getBounds().x, build.getBounds().y + 50)
            })
            resources.forEach(resource => {
                resource.setAnchor(0);
                resource.setPosition(resource.getBounds().x, resource.getBounds().y + 50)
                resource.setAnchor(0.5);
            })
        }
    }

    window.addEventListener('keydown', handleKeyDown);

    while (true) {
        stageResources(allContainer.containerForDiceRoll, app);
        const promiseForResources = new Promise(function(resolve) {
            startTimerForStage(Game.timeStageForResources, allContainer.wheelBlock, Game.stage, resolve, app);
        });
        await Promise.all([promiseForResources]);

        if (Game.playerReady) {
            const promiseForReady = new Promise(function(resolve) {
                startTimerForStage(5, allContainer.wheelBlock, Game.stage, resolve, app);
            });
            await Promise.all([promiseForReady]);
            Game.playerReady = false;
        }
        
        allContainer.containerForDiceRoll.visible = false;
        Game.stage++;

        stageDisasters();
        const promiseForDisasters = new Promise(function(resolve) {
            startTimerForStage(Game.timeStageForDisasters, allContainer.wheelBlock, Game.stage, resolve, app);
        })
        await Promise.all([promiseForDisasters]);

        if (Game.playerReady) {
            const promiseForReady = new Promise(function(resolve) {
                startTimerForStage(5, allContainer.wheelBlock, Game.stage, resolve, app);
            });
            await Promise.all([promiseForReady]);
            Game.playerReady = false;
        }

        Game.stage++;

        stageBuilding(app, selectedBuilding, cells, buildings, buildingMoment, t, resources);
        const promiseForBuildings = new Promise(function(resolve) {
            startTimerForStage(Game.timeStageForBuildings, allContainer.wheelBlock, Game.stage, resolve, app);
        })
        await Promise.all([promiseForBuildings]);

        if (Game.playerReady) {
            const promiseForReady = new Promise(function(resolve) {
                startTimerForStage(5, allContainer.wheelBlock, Game.stage, resolve, app);
            });
            await Promise.all([promiseForReady]);
            Game.playerReady = false;
        }

        Game.stage++;

        stageBattles();
        const promiseForBattles = new Promise(function(resolve) {
            startTimerForStage(Game.timeStageForBattles, allContainer.wheelBlock, Game.stage, resolve, app);
        })
        await Promise.all([promiseForBattles]);

        if (Game.playerReady) {
            const promiseForReady = new Promise(function(resolve) {
                startTimerForStage(5, allContainer.wheelBlock, Game.stage, resolve, app);
            });
            await Promise.all([promiseForReady]);
            Game.playerReady = false;
        }

        Game.stage = 1;
    }
}