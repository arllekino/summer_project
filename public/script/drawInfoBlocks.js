import { Building } from "./classes/Building.js";
import { Game } from "./classes/game.js";

async function AddIconInInfoBlock(
	container,
	percentageScreenWidth,
	percentageScreenHeight,
	pathToFile,
) {
	const textureIcon = await PIXI.Assets.load(pathToFile);
	const icon = new PIXI.Sprite(textureIcon);
	icon.x = container.width * percentageScreenWidth;
	icon.y = container.height * percentageScreenHeight;
	container.addChild(icon);
}

async function DrawBlockResources(container, app) {
	const textureBackground = await PIXI.Assets.load(
		"/../assets/textures/ResourceBlock.svg",
	);
	const resourceBlock = new PIXI.Sprite(textureBackground);
	container.addChild(resourceBlock);

	const percentageScreenWidth = 0.005;
	const percentageScreenHeight = 0.77;
	container.x = app.screen.width * percentageScreenWidth;
	container.y = app.screen.height * percentageScreenHeight;

	AddIconInInfoBlock(container, 0.03, 0.05, "/../assets/textures/SeedIcon.svg");
	AddIconInInfoBlock(container, 0.03, 0.3, "/../assets/textures/WoodIcon.svg");
	AddIconInInfoBlock(container, 0.03, 0.46, "/../assets/textures/StoneIcon.svg");
	AddIconInInfoBlock(container, 0.6, 0.05, "/../assets/textures/CitizenIcon.svg");
	AddIconInInfoBlock(container, 0.6, 0.3, "/../assets/textures/HammerIcon.svg");
}

async function DrawBlockWheelEvents(app, wheelBlock) {
	const textureBackground = await PIXI.Assets.load(
		"/../assets/textures/WheelEventsBlock.svg",
	);
	wheelBlock._texture = textureBackground;

	app.stage.addChild(wheelBlock);

	const percentageScreenWidth = 0.93;
	const percentageScreenHeight = 0.85;
	wheelBlock.x = app.screen.width * percentageScreenWidth;
	wheelBlock.y = app.screen.height * percentageScreenHeight;
	wheelBlock.pivot.x = wheelBlock.width / 2;
    wheelBlock.pivot.y = wheelBlock.height / 2;
}

async function DrawBlockAboveTheWheelEvents(container, app) {
	const textureBackground = await PIXI.Assets.load(
		"/../assets/textures/BlockAboveTheWheel.svg",
	);
	const blockAboveTheWheel = new PIXI.Sprite(textureBackground);
	container.addChild(blockAboveTheWheel);

	const percentageScreenWidth = 0.9;
	const percentageScreenHeight = 0.66;
	container.x = app.screen.width * percentageScreenWidth;
	container.y = app.screen.height * percentageScreenHeight;
}

async function DrawBlockTimer(container, app) {
	const textureBackground = await PIXI.Assets.load(
		"/../assets/textures/TimeBlock.svg",
	);
	const timerBlock = new PIXI.Sprite(textureBackground);
	container.addChild(timerBlock);

	const percentageScreenWidth = 0.45;
	const percentageScreenHeight = 0.01;
	container.x = app.screen.width * percentageScreenWidth;
	container.y = app.screen.height * percentageScreenHeight;
}

export async function DrawBlockForDiceRoll(container, app, containerCubes, blockButtonReRoll) {
	container.visible = true;
	container.zIndex = 10000;
	const textureBackgroundLeft = await PIXI.Assets.load(
		"/../assets/textures/diceRoll.svg",
	);
	const blockLeave = new PIXI.Sprite(textureBackgroundLeft);
	container.addChild(blockLeave);
	container.addChild(containerCubes);
	
	const percentageScreenWidth = 0.196;
	const percentageScreenHeight = 0.1;
	container.x = app.screen.width * percentageScreenWidth;
	container.y = app.screen.height * percentageScreenHeight;

	const percentageScreenWidthCubes = 0.56;
	const percentageScreenHeightCubes = 0.02;
	containerCubes.x = container.width * percentageScreenWidthCubes;
	containerCubes.y = container.height * percentageScreenHeightCubes;

	const textureButton = await PIXI.Assets.load(
		"/../assets/textures/buttonReRoll.svg",
	);
	blockButtonReRoll._texture = textureButton;    
    container.addChild(blockButtonReRoll);
	
    const percentageScreenWidthButtonReRoll = 0.665;
	const percentageScreenHeightButtonReRoll = 0.85;
	blockButtonReRoll.x = container.width * percentageScreenWidthButtonReRoll;
	blockButtonReRoll.y = container.height * percentageScreenHeightButtonReRoll;
}

export async function DrawBlockBuildings(container, app, island, allTextResources, blocks) {
	const textureBackground = await PIXI.Assets.load(
		"/../assets/textures/BuildingsPanel.svg",
	);
	const buildingBlock = new PIXI.Sprite(textureBackground);
	container.addChild(buildingBlock);

	const percentageScreenWidth = 0.3;
	const percentageScreenHeight = 0.77;
	container.x = app.screen.width * percentageScreenWidth;
	container.y = app.screen.height * percentageScreenHeight;

	const textures = await PIXI.Assets.load('/../imageParser/panelBuildings.json');
	let buildingX = 20;
	let buildingY = 20;

	const buildingsContainer = new PIXI.Container();
	container.addChild(buildingsContainer);

	for (const textureName in textures.textures) {
		const buildingSprite = new PIXI.Sprite(textures.textures[textureName]);

		buildingSprite.x = buildingX;
		buildingSprite.y = buildingY;

		buildingSprite.interactive = true;
		buildingSprite.buttonMode = true;

		buildingSprite.on('pointerdown', () => {
			if (Game.stage !== 3) {
				return;
			}
			if (island.buildingSprite) {
				island.buildingSprite.tint = 0xffffff;
			}
			island.buildingSprite = buildingSprite;
			island.buildingSprite.tint = 0x00ff00;

			if (island.buldingObject)
			{
				if (island.buldingObject.getStopMovingFlag())
				{
					island.buildingMoment = false;
				}
			}

			if ((textureName === 'richHouse.png') && !island.buildingMoment) {
				const requiredResources = {stone: 2, hammer: 1};
				if (Object.keys(requiredResources).every((key) => requiredResources[key] <= island.resourcesOfUser[key]))
				{
					island.buildingMoment = true
					island.buldingObject = new Building(app, island.cells, island.buildings, 'House', {}, 100, 0, 2, 5, requiredResources, island.resourcesOfUser, allTextResources);
					island.buldingObject.setMatrixPattern([
						[0, 0, 0],
						[0, 1, 0],
						[1, 1, 0],
					])
					island.buldingObject.renderMatrixPattern(app);
				}
			}
			if ((textureName === 'farm.png') && !island.buildingMoment) {
				const requiredResources = {wood: 1, hammer: 1};
				if (Object.keys(requiredResources).every((key) => requiredResources[key] <= island.resourcesOfUser[key]))
				{
					island.buildingMoment = true;
					island.buldingObject = new Building(app, island.cells, island.buildings, 'Farm', {wheat: 1}, 100, 0, 1, 1, requiredResources, island.resourcesOfUser, allTextResources);
					island.buldingObject.setMatrixPattern([
						[1, 1, 0],
						[1, 1, 0],
						[1, 1, 0],
					])
					island.buldingObject.renderMatrixPattern(app);
				}
			}
			if ((textureName === 'warehouse.png') && !island.buildingMoment) {
				const requiredResources = {wood: 4, stone: 2, hammer: 1};
				if (Object.keys(requiredResources).every((key) => requiredResources[key] <= island.resourcesOfUser[key]))
				{
					island.buildingMoment = true;
					island.buldingObject = new Building(app, island.cells, island.buildings, 'Warehouse', {}, 100, 0, 3, 9, requiredResources, island.resourcesOfUser, allTextResources);
					island.buldingObject.setMatrixPattern([
						[1, 1, 0],
						[1, 1, 0],
						[1, 1, 0],
					])
					island.buldingObject.renderMatrixPattern(app);
				}
			}
			if ((textureName === 'house.png') && !island.buildingMoment) {
				const requiredResources = {wood: 2, hammer: 1};
				if (Object.keys(requiredResources).every((key) => requiredResources[key] <= island.resourcesOfUser[key]))
				{
					island.buildingMoment = true;
					island.buldingObject = new Building(app, island.cells, island.buildings, 'Farmer House', {}, 100, 0, 3, 13, requiredResources, island.resourcesOfUser, allTextResources);
					island.buldingObject.setMatrixPattern([
						[0, 0, 0],
						[0, 1, 0],
						[0, 0, 0],
					])
					island.buldingObject.renderMatrixPattern(app);
				}
			}
		});

		buildingsContainer.addChild(buildingSprite);
		buildingX += buildingSprite.width + 20;
		if (buildingX + buildingSprite.width > buildingBlock.width) {
			buildingX = 20;
			buildingY += buildingSprite.height + 20;
		}
	}
}



export function DrawBuildingsBlock(app, island, allTextResources, blocks) {
	const containerForBuilding = new PIXI.Container();
	app.stage.addChild(containerForBuilding);
	DrawBlockBuildings(containerForBuilding, app, island, allTextResources, blocks);
}

function DrawTextOnContainer(text, containerForResources, numberOfResources, percentageScreenWidth, percentageScreenHeight) {
	containerForResources.addChild(text);
    text.style.fill = 0xFFFFFF;
	text.text = `${numberOfResources}`;

	text.x = containerForResources.width * percentageScreenWidth;
    text.y = containerForResources.height * percentageScreenHeight;
}

export function DrawNumberOfResources(containerForResources, resourcesOfUser) {
	const textForWheat = new PIXI.Text();
	DrawTextOnContainer(textForWheat, containerForResources, resourcesOfUser.wheat, 0.25, 0.05);
	const textForWood = new PIXI.Text();
	DrawTextOnContainer(textForWood, containerForResources, resourcesOfUser.wood, 0.25, 0.25);
	const textForStone = new PIXI.Text();
	DrawTextOnContainer(textForStone, containerForResources, resourcesOfUser.stone, 0.25, 0.46);
	const textForHammer = new PIXI.Text();
	DrawTextOnContainer(textForHammer, containerForResources, resourcesOfUser.hammer, 0.75, 0.3);
	const textForInhabitants = new PIXI.Text();
	DrawTextOnContainer(textForInhabitants, containerForResources, resourcesOfUser.hammer, 0.75, 0.07);
    
	const allTextResources = {
		textForWheat: textForWheat,
		textForWood: textForWood,
		textForStone: textForStone,
		textForHammer: textForHammer,
		textForInhabitants: textForInhabitants,
	}

	return allTextResources;
}

export function UpdateNumberOfResources(allTextResources, resourcesOfUser) {
	for (let key in allTextResources) {
		if (key === "textForWheat") {
			allTextResources[key].text = `${resourcesOfUser.wheat}`;
		}
		if (key === "textForWood") {
			allTextResources[key].text = `${resourcesOfUser.wood}`;
		}
		if (key === "textForStone") {
			allTextResources[key].text = `${resourcesOfUser.stone}`;
		}
		if (key === "textForHammer") {
			allTextResources[key].text = `${resourcesOfUser.hammer}`;
		}
	}
}

export function DrawInfoBlocks(app) {
	const containerForResources = new PIXI.Container();
	app.stage.addChild(containerForResources);
	DrawBlockResources(containerForResources, app);
	
	const wheelBlock = new PIXI.Sprite();
	DrawBlockWheelEvents(app, wheelBlock);

	const containerAboveTheWheel = new PIXI.Container();
	app.stage.addChild(containerAboveTheWheel);
	DrawBlockAboveTheWheelEvents(containerAboveTheWheel, app);

	const containerForTimer = new PIXI.Container();
	app.stage.addChild(containerForTimer);
	DrawBlockTimer(containerForTimer, app);

	const containerForDiceRoll = new PIXI.Container();
	app.stage.addChild(containerForDiceRoll);

	const allContainer = {
		containerForResources: containerForResources,
		wheelBlock: wheelBlock,
		containerAboveTheWheel: containerAboveTheWheel,
		containerForTimer: containerForTimer,
		containerForDiceRoll: containerForDiceRoll,
	}

	return allContainer;
}