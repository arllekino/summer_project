const STEP_WIDTH = 0.07;
const STEP_HEIGHT = 0.12;

const POSITION_LAST_CUBE_RIGHT = {
    startX: 0.54,
    startY: 0,
    x: 0.54,
    y: 0,
    cubeInRow: 0,
}

let arrCubesRight = [];

function ChooseRandomFaceOFCube() {
    const minFace = 1;
    const maxFace = 6;
    return Math.floor(Math.random() * (maxFace - minFace) + minFace);
}

function GetResourcesFromVillage(numberFace, resources) {
    switch (numberFace) {
        case 1:
            resources.wood += 1;
            resources.stone += 1;
            break;
        case 2:
            resources.hammer += 2;
            resources.wheat += 1;
            break;
        case 3:
            resources.wheat += 1;
            resources.stone += 1;
            break;
        case 4:
            resources.wheat += 4;
            break;
        case 5:
            resources.wood += 3;
            break;
        case 6:
            resources.hammer += 1;
            resources.skulls += 1;
            resources.wood += 1;
            break;
    }
}

function DeleteResourcesFromVillage(numberFace, resources) {
    switch (numberFace) {
        case 1:
            resources.wood -= 1;
            resources.stone -= 1;
            break;
        case 2:
            resources.hammer -= 2;
            resources.wheat -= 1;
            break;
        case 3:
            resources.wheat -= 1;
            resources.stone -= 1;
            break;
        case 4:
            resources.wheat -= 4;
            break;
        case 5:
            resources.wood -= 3;
            break;
        case 6:
            resources.hammer -= 1;
            resources.skulls -= 1;
            resources.wood -= 1;
            break;
    }
}

function GetResourcesFromGrandee(numberFace, resources) {
    switch (numberFace) {
        case 1:
            resources.hammer += 3;
            break;
        case 2:
            resources.stone += 1;
            resources.money += 1;
            break;
        case 3:
            resources.wood += 1;
            resources.money += 1;
            break;
        case 4:
            resources.stone += 3;
            break;
        case 5:
            resources.money += 1;
            resources.books += 1;
            break;
        case 6:
            resources.hammer += 1;
            resources.skulls += 1;
            resources.stone += 1;
            break;
    }
}

function DeleteResourcesFromGrandee(numberFace, resources) {
    switch (numberFace) {
        case 1:
            resources.hammer -= 3;
            break;
        case 2:
            resources.stone -= 1;
            resources.money -= 1;
            break;
        case 3:
            resources.wood -= 1;
            resources.money -= 1;
            break;
        case 4:
            resources.stone -= 3;
            break;
        case 5:
            resources.money -= 1;
            resources.books -= 1;
            break;
        case 6:
            resources.hammer -= 1;
            resources.skulls -= 1;
            resources.stone -= 1;
            break;
    }
}

function GetResourcesFromMainHouse(numberFace, resources) {
    switch (numberFace) {
        case 1:
            resources.wheat += 1;
            resources.stone += 1;
            break;
        case 2:
            resources.wheat += 1;
            resources.hammer += 1;
            break;
        case 3:
            resources.wheat += 2;
            break;
        case 4:
            resources.wars += 2;
            break;
        case 5:
            resources.money += 1;
            break;
        case 6:
            resources.wars += 1;
            resources.skulls += 1;
            resources.money += 1;
            break;
    }
}

function DeleteResourcesFromMainHouse(numberFace, resources) {
    switch (numberFace) {
        case 1:
            resources.wheat -= 1;
            resources.stone -= 1;
            break;
        case 2:
            resources.wheat -= 1;
            resources.hammer -= 1;
            break;
        case 3:
            resources.wheat -= 2;
            break;
        case 4:
            resources.wars -= 2;
            break;
        case 5:
            resources.money -= 1;
            break;
        case 6:
            resources.wars -= 1;
            resources.skulls -= 1;
            resources.money -= 1;
            break;
    }
}

async function AddIconInInfoBlock(
	containerCubes,
    containerDiceRoll,
	percentageScreenWidth,
	percentageScreenHeight,
	pathToFile,
    icon,
) {
	const textureIcon = await PIXI.Assets.load(pathToFile);
    icon.texture = textureIcon;
	   
    icon.x = containerDiceRoll.width * percentageScreenWidth;
	icon.y = containerDiceRoll.height * percentageScreenHeight;
	containerCubes.addChild(icon);
}

export async function GetResources(buildings, containerCubes, containerDiceRoll, blockButtonReRoll, app) {
    const resources = {
        wheat: 0,
        wood: 0,
        stone: 0,
        wars: 0,
        inhabitants: 0,
        hammer: 0,
        money: 0,
        books: 0,
        skulls: 0,
    }

    const arrCubes = [];

    const startPositionWidth = 0;
    const startPositionHeight = 0;

    let percentageScreenWidth = startPositionWidth;
    let percentageScreenHeight = startPositionHeight;
    
    let cubesInRow = 0;

    for (let i = 0; i < buildings.houseVillage; i++) {
        let numberFace = ChooseRandomFaceOFCube();
        GetResourcesFromVillage(numberFace, resources);
        if (i != 0) {
            percentageScreenWidth += STEP_WIDTH;
        }
        cubesInRow = i;
        if (i == 6) {
            percentageScreenWidth = startPositionWidth;
            percentageScreenHeight += STEP_HEIGHT;
            cubesInRow = 0;
        }
        const icon = new PIXI.Sprite();
        arrCubes.push(icon);
        AddIconInInfoBlock(containerCubes, containerDiceRoll, percentageScreenWidth, 
            percentageScreenHeight, `/../assets/textures/cubeOfVillage/${numberFace}face.svg`, icon);
    }

    for (let i = 0; i < buildings.houseGrendee; i++) {
        let numberFace = ChooseRandomFaceOFCube();
        GetResourcesFromGrandee(numberFace, resources);

        percentageScreenWidth += STEP_WIDTH;
        cubesInRow += 1;

        if (cubesInRow == 6) {
            percentageScreenWidth = startPositionWidth;
            percentageScreenHeight += STEP_HEIGHT;
            cubesInRow = 0;
        }
        const icon = new PIXI.Sprite();
        arrCubes.push(icon);
        AddIconInInfoBlock(containerCubes, containerDiceRoll, percentageScreenWidth, 
            percentageScreenHeight, `/../assets/textures/cubeOfGrandee/${numberFace}face.svg`, icon);
    }
    const numberFace = ChooseRandomFaceOFCube();
    GetResourcesFromMainHouse(numberFace, resources);
    if (cubesInRow == 6) {
        percentageScreenWidth = startPositionWidth;
        percentageScreenHeight += STEP_HEIGHT;
        cubesInRow = 0;
    }
    else {
        percentageScreenWidth += STEP_WIDTH;
    }
    
    const icon = new PIXI.Sprite();
    arrCubes.push(icon);
    AddIconInInfoBlock(containerCubes, containerDiceRoll, percentageScreenWidth, 
        percentageScreenHeight, `/../assets/textures/cubeOfMainBuilding/${numberFace}face.svg`, icon);
    resources.wheat += buildings.farm;

    setTimeout(() => {
        containerCubesMove(containerCubes);
    }, 1000);

    setTimeout(() => {
        containerCubes.children.forEach((sprite) => {
            const index = arrCubes.findIndex(spriteIndex => spriteIndex === sprite);
            ButtonCube(sprite, containerDiceRoll, index, blockButtonReRoll);
        });
    }, 1000);

    setTimeout(() => {
        ButtonReRoll(containerDiceRoll, blockButtonReRoll, resources, app);
    }, 1000);
}

function ButtonReRoll(containerDiceRoll, blockButtonReRoll, resources, app) {
    blockButtonReRoll.interactive = true;
    blockButtonReRoll.buttonMode = true;
    blockButtonReRoll.cursor = "pointer";

    function ReRollMain() {
        ReRoll(containerDiceRoll, resources);
        setTimeout(() => {
            app.stage.removeChild(containerDiceRoll);
        }, 5000);        
    }

    blockButtonReRoll.on("pointerdown", ReRollMain);
}

function MoveCubeOnItsPosition(serialNumberInContainer, sprite, containerDiceRoll) {

    const numberOfY = Math.floor(serialNumberInContainer / 6);
    const numberOfX = serialNumberInContainer % 6;

    const limitX = containerDiceRoll.width * (STEP_WIDTH * numberOfX);
    const limitY = containerDiceRoll.height * (STEP_HEIGHT * numberOfY);

    let thisCubeBelow;
    let thisCubeSameHeight;

    if (sprite.y > limitY) {
        thisCubeBelow = true;
    }
    else if (sprite.y < limitY) {
        thisCubeBelow = false;
    }
    else if (sprite.y === limitY) {
        thisCubeSameHeight = true;
    }

    const ticker = new PIXI.Ticker;
    ticker.add((time) => {
		let condiotionOnX = (sprite.x <= limitX);
        let condiotionOnYBelow = (sprite.y <= limitY);
        let condiotionOnYNotBelow = (sprite.y >= limitY);
        let mainCondition = condiotionOnX;

        if (thisCubeBelow && !thisCubeSameHeight) {
            mainCondition = condiotionOnX && condiotionOnYBelow;
            if (!condiotionOnYBelow) {
                sprite.y -= 5 * time.deltaTime;
            }
        }
        else if (!thisCubeBelow && !thisCubeSameHeight) {
            mainCondition = condiotionOnX && condiotionOnYNotBelow;
            if (!condiotionOnYNotBelow) {
                sprite.y += 5 * time.deltaTime;
            }
        }
        if (!condiotionOnX) {
            sprite.x -= 8 * time.deltaTime;
        }

		if (mainCondition) {
			ticker.destroy();
		}
	})
    ticker.start();
}

function ReRoll(containerDiceRoll, resources) {
    arrCubesRight.forEach(el => {
        if (el.typeCube === "cubeOfVillage") {
            DeleteResourcesFromVillage(el.numberOfFace, resources);
            el.cube.visible = false;

            const numberFace = ChooseRandomFaceOFCube();
            GetResourcesFromVillage(numberFace, resources);

            setTimeout(async () => {
                const textureIconCube = await PIXI.Assets.load(`/../assets/textures/cubeOfVillage/${numberFace}face.svg`);
                el.cube.texture = textureIconCube;
                el.cube.visible = true;
            }, 1000);

            setTimeout(() => {
                MoveCubeOnItsPosition(el.serialNumberInContainer, el.cube, containerDiceRoll);
            }, 1000);
        }
        if (el.typeCube === "cubeOfGrandee") {
            DeleteResourcesFromGrandee(el.numberOfFace, resources);
            el.cube.visible = false;

            const numberFace = ChooseRandomFaceOFCube();
            GetResourcesFromVillage(numberFace, resources);

            setTimeout(async () => {
                const textureIconCube = await PIXI.Assets.load(`/../assets/textures/cubeOfGrandee/${numberFace}face.svg`);
                el.cube.texture = textureIconCube;
                el.cube.visible = true;
            }, 1000);

            setTimeout(() => {
                MoveCubeOnItsPosition(el.serialNumberInContainer, el.cube, containerDiceRoll);
            }, 1000);
        }
        if (el.typeCube === "cubeOfMainBuilding") {
            DeleteResourcesFromMainHouse(el.numberOfFace, resources);
            el.cube.visible = false;

            const numberFace = ChooseRandomFaceOFCube();
            GetResourcesFromVillage(numberFace, resources);

            setTimeout(async () => {
                const textureIconCube = await PIXI.Assets.load(`/../assets/textures/cubeOfMainBuilding/${numberFace}face.svg`);
                el.cube.texture = textureIconCube;
                el.cube.visible = true;
            }, 1000);

            setTimeout(() => {
                MoveCubeOnItsPosition(el.serialNumberInContainer, el.cube, containerDiceRoll);
            }, 1000);
        }
    });
    arrCubesRight = [];
    POSITION_LAST_CUBE_RIGHT.x = POSITION_LAST_CUBE_RIGHT.startX;
    POSITION_LAST_CUBE_RIGHT.cubeInRow = 0;
    POSITION_LAST_CUBE_RIGHT.y = POSITION_LAST_CUBE_RIGHT.startY;
}

function containerCubesMove(containerCubes) {
    const ticker = new PIXI.Ticker;
    const limit = containerCubes.x * 0.04;
    ticker.add((time) => {
		containerCubes.x -= 8 * time.deltaTime;
		if (containerCubes.x <= limit) {
			ticker.destroy();
		}
	})
    ticker.start();
}

function spriteCubeMove(spriteCube, containerDiceRoll, index, blockButtonReRoll) {
    const ticker = new PIXI.Ticker;

    const limitX = containerDiceRoll.width * POSITION_LAST_CUBE_RIGHT.x;
    const limitY = containerDiceRoll.height * POSITION_LAST_CUBE_RIGHT.y;

    POSITION_LAST_CUBE_RIGHT.x += STEP_WIDTH;
        POSITION_LAST_CUBE_RIGHT.cubeInRow += 1;

    if (POSITION_LAST_CUBE_RIGHT.cubeInRow === 6) {
        POSITION_LAST_CUBE_RIGHT.cubeInRow = 0;
        POSITION_LAST_CUBE_RIGHT.y += STEP_HEIGHT;
        POSITION_LAST_CUBE_RIGHT.x = POSITION_LAST_CUBE_RIGHT.startX;
    }
    console.log(POSITION_LAST_CUBE_RIGHT.cubeInRow, POSITION_LAST_CUBE_RIGHT.y, POSITION_LAST_CUBE_RIGHT.startY, "gthdsq");

    let thisCubeBelow;
    let thisCubeSameHeight = false;
    if (spriteCube.y > POSITION_LAST_CUBE_RIGHT.y) {
        thisCubeBelow = true;
    }
    else if (spriteCube.y < POSITION_LAST_CUBE_RIGHT.y) {
        thisCubeBelow = false;
    }
    else if (spriteCube.y === POSITION_LAST_CUBE_RIGHT.y) {
        thisCubeSameHeight = true;
    }

    const arrPathTexture = spriteCube._texture.label.split("/");
    const infoAboutCube = {
        cube: spriteCube,
        typeCube: arrPathTexture[5],
        numberOfFace: Number(arrPathTexture[6].slice(0, 1)),
        serialNumberInContainer: index,
        
    }
    arrCubesRight.push(infoAboutCube);

    ticker.add((time) => {
        let condiotionOnX = (spriteCube.x >= limitX);
        let condiotionOnYBelow = (spriteCube.y <= limitY);
        let condiotionOnYNotBelow = (spriteCube.y >= limitY);
        let mainCondition = condiotionOnX;

        if (thisCubeBelow && !thisCubeSameHeight) {
            mainCondition = condiotionOnX && condiotionOnYBelow;
            if (!condiotionOnYBelow) {
                spriteCube.y -= 5 * time.deltaTime;
            }
        }
        else if (!thisCubeBelow && !thisCubeSameHeight) {
            mainCondition = condiotionOnX && condiotionOnYNotBelow;
            if (!condiotionOnYNotBelow) {
                spriteCube.y += 5 * time.deltaTime;
            }
        }
        if (!condiotionOnX) {
            spriteCube.x += 10 * time.deltaTime;
        }

		if (mainCondition) {
            // blockButtonReRoll.interactive = true;
            // blockButtonReRoll.buttonMode = true;
            // blockButtonReRoll.cursor = "pointer";

            spriteCube.addEventListener('click', function handlerForMoveCubeOnItsPosition() {
                MoveCubeOnItsPosition(index, spriteCube, containerDiceRoll);
                // blockButtonReRoll.interactive = false;
                // blockButtonReRoll.buttonMode = false;
                // blockButtonReRoll.cursor = "default";
                arrCubesRight = arrCubesRight.filter(item => {
                    return item.serialNumberInContainer !== index;
                });
                console.log(POSITION_LAST_CUBE_RIGHT.cubeInRow, POSITION_LAST_CUBE_RIGHT.y, POSITION_LAST_CUBE_RIGHT.startY, "asdasd");
                if ((POSITION_LAST_CUBE_RIGHT.cubeInRow === 0) && (POSITION_LAST_CUBE_RIGHT.y !== POSITION_LAST_CUBE_RIGHT.startY)) {
                    POSITION_LAST_CUBE_RIGHT.x += STEP_WIDTH * 6;
                    POSITION_LAST_CUBE_RIGHT.y -= STEP_HEIGHT;
                    POSITION_LAST_CUBE_RIGHT.cubeInRow = 6;

                    POSITION_LAST_CUBE_RIGHT.x -= STEP_WIDTH;
                    POSITION_LAST_CUBE_RIGHT.cubeInRow -= 1;
                }
                else {
                    POSITION_LAST_CUBE_RIGHT.x -= STEP_WIDTH;
                    POSITION_LAST_CUBE_RIGHT.cubeInRow -= 1;
                }
                console.log(POSITION_LAST_CUBE_RIGHT.cubeInRow, POSITION_LAST_CUBE_RIGHT.y, POSITION_LAST_CUBE_RIGHT.startY, "второй");
                ButtonCube(spriteCube, containerDiceRoll, index, blockButtonReRoll);
                this.removeEventListener('click', handlerForMoveCubeOnItsPosition);
            });
            ticker.destroy();
		}
	})
    ticker.start();
}

function ButtonCube(sprite, containerDiceRoll, index, blockButtonReRoll) {
    sprite.buttonMode = true;
    sprite.interactive = true;

    // blockButtonReRoll.interactive = true;
    // blockButtonReRoll.buttonMode = true;
    // blockButtonReRoll.cursor = "pointer";

    sprite.addEventListener('click', function handlerForSpriteCubeMove() {
        spriteCubeMove(sprite, containerDiceRoll, index, blockButtonReRoll);
        // blockButtonReRoll.interactive = false;
        // blockButtonReRoll.buttonMode = false;
        // blockButtonReRoll.cursor = "default";
        this.removeEventListener('click', handlerForSpriteCubeMove);
    });
}