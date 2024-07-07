import { DrawBlockForDiceRoll, UpdateNumberOfResources, DrawNumberOfResources, DrawBuildingsBlock } from "./drawInfoBlocks.js";
import { startTimerForStage } from "./timerForStage.js";
import { GetResources } from "./stages/resources.js";
import { Destroyer, AddEventListenersForHammer } from "./classes/destroyer.js"; 
import { Game } from "./classes/game.js";

export function stageResources(containerForDiceRoll, app, resources) {
    const containerCubes = new PIXI.Container();
    const blockButtonReRoll = new PIXI.Sprite();
    console.log(resources, "asohgdyaushdjias");

    DrawBlockForDiceRoll(containerForDiceRoll, app, containerCubes, blockButtonReRoll);
    const buildings = {
        houseVillage: 4,
        houseGrendee: 7,
        farm: 3,
    }
    GetResources(buildings, containerCubes, containerForDiceRoll, blockButtonReRoll, resources);
}

export function stageDisasters() {
    console.log("disasters");
}

export async function stageBuilding(app, island, allTextResources, flags) {
    if (!flags['hummer'])
    {
        const hummer = new Destroyer(app)
        AddEventListenersForHammer(hummer, island.buildings, island.resourcesOnIsland, island.buildingMoment, app, island.resourcesOfUser, allTextResources);
        flags['hummer'] = true;
    }
      const handleKeyDown = (event) => {
        const key = event.key;

        if (island.buildingSprite) {
            if (island.buldingObject.getStopMovingFlag())
            {
                island.buildingMoment = false;
            }
            if (key === 'f' && island.buildingMoment && island.buldingObject && Game.stage === 3) {
                island.buldingObject.clearPatterns();
                island.buldingObject.clearCellsStatus()
                island.buldingObject.rotateMatrix(-1); 
                island.buldingObject.renderMatrixPattern(app);
            } 
            else if (key === 'g' && island.buildingMoment && island.buldingObject && Game.stage === 3) {
                island.buldingObject.clearPatterns();
                island.buldingObject.clearCellsStatus();
                island.buldingObject.rotateMatrix(1);
                island.buldingObject.renderMatrixPattern(app);
            }
        }
    };

    if (!flags['rotations'])
    {
        window.addEventListener('keydown', handleKeyDown);
        flags['rotations'] = true;
    }

    document.addEventListener("pointerdown", function(event) {
        if (event.button === 2 && island.buildingMoment && Game.stage === 3) 
        {
            event.preventDefault();
            island.buildingSprite.tint = 0xffffff;
            island.buldingObject.clearPatterns();
            island.buldingObject.clearCellsStatus();
            app.stage.on('pointermove', (event) => island.buldingObject.startMouseFollowing(event)).off('pointermove');
            app.stage.removeChild(island.buldingObject.__sprite);
            island.buldingObject.__sprite.destroy();
            island.buildingMoment = false;
        }
      });
}

export function stageBattles() {
    console.log("battles");
}

export async function main(allContainer, app, island) {
    console.log(island.resourcesOfUser, "mnbvcxzsdfghj");

    allContainer.wheelBlock.interactive = true;
    allContainer.wheelBlock.buttonMode = true;
    allContainer.wheelBlock.cursor = "pointer";

    const handleKeyDown = (event) => {
        const key = event.key;
        if (key === 'a' && Game.stage !== 1) {
            island.cells.forEach(cell => {
                cell.setDirectPositions(cell.getBounds().x - 50, cell.getBounds().y)
            })
            island.buildings.forEach(build => {
                build.setPosition(build.getBounds().x - 50, build.getBounds().y)
            })
            island.resourcesOnIsland.forEach(resource => {
                resource.setAnchor(0);
                resource.setPosition(resource.getBounds().x - 50, resource.getBounds().y);
                resource.setAnchor(0.5);
            })
        }
        else if (key === 'w' && Game.stage !== 1) {
            island.cells.forEach(cell => {
                cell.setDirectPositions(cell.getBounds().x, cell.getBounds().y - 50)
            })
            island.buildings.forEach(build => {
                build.setPosition(build.getBounds().x, build.getBounds().y - 50)
            })
            island.resourcesOnIsland.forEach(resource => {
                resource.setAnchor(0);
                resource.setPosition(resource.getBounds().x, resource.getBounds().y - 50)
                resource.setAnchor(0.5);
            })
        }
        else if (key === 'd' && Game.stage !== 1) {
            island.cells.forEach(cell => {
                cell.setDirectPositions(cell.getBounds().x + 50, cell.getBounds().y)
            })
            island.buildings.forEach(build => {
                build.setPosition(build.getBounds().x + 50, build.getBounds().y)
            })
            island.resourcesOnIsland.forEach(resource => {
                resource.setAnchor(0);
                resource.setPosition(resource.getBounds().x + 50, resource.getBounds().y)
                resource.setAnchor(0.5);
            })
        }
        else if (key === 's' && Game.stage !== 1) {
            island.cells.forEach(cell => {
                cell.setDirectPositions(cell.getBounds().x, cell.getBounds().y + 50)
            })
            island.buildings.forEach(build => {
                build.setPosition(build.getBounds().x, build.getBounds().y + 50)
            })
            island.resourcesOnIsland.forEach(resource => {
                resource.setAnchor(0);
                resource.setPosition(resource.getBounds().x, resource.getBounds().y + 50)
                resource.setAnchor(0.5);
            })
        }
    }

    window.addEventListener('keydown', handleKeyDown);

    const allTextResources = DrawNumberOfResources(allContainer.containerForResources, island.resourcesOfUser, app);
    DrawBuildingsBlock(app, island, allTextResources);

    let flags = {
        hummer: false,
        rotations: false,
    };

    while (true) {
        console.log(island.resourcesOfUser, "qwertyui");
        stageResources(allContainer.containerForDiceRoll, app, island.resourcesOfUser);
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
        UpdateNumberOfResources(allTextResources, island.resourcesOfUser);
        setTimeout(() => {
            allContainer.containerForDiceRoll.visible = false;
        }, 1500);
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
        console.log(island.resourcesOfUser, "HELLO");
        stageBuilding(app, island, allTextResources, flags);
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