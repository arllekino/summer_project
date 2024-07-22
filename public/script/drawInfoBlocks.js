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
	container.zIndex = 9999999;

	AddIconInInfoBlock(container, 0.03, 0.05, "/../assets/textures/SeedIcon.svg");
	AddIconInInfoBlock(container, 0.03, 0.3, "/../assets/textures/WoodIcon.svg");
	AddIconInInfoBlock(container, 0.03, 0.46, "/../assets/textures/StoneIcon.svg");
	AddIconInInfoBlock(container, 0.03, 0.65, "/../assets/textures/SwordIcon.svg");
	AddIconInInfoBlock(container, 0.6, 0.05, "/../assets/textures/CitizenIcon.svg");
	AddIconInInfoBlock(container, 0.6, 0.3, "/../assets/textures/HammerIcon.svg");
	AddIconInInfoBlock(container, 0.6, 0.57, "/../assets/textures/MoneyIcon.svg");
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
	container.zIndex = 999999;
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
	container.zIndex = 99999999;
}

export async function DrawBlockForDiceRoll(container, app, containerCubes, blockButtonReRoll, resolve) {
	container.visible = true;
	container.zIndex = 10000;
	const textureBackgroundLeft = await PIXI.Assets.load(
		"/../assets/textures/diceRoll.png",
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
		"/../assets/textures/buttonReRoll.png",
	);
	blockButtonReRoll._texture = textureButton;    
    container.addChild(blockButtonReRoll);
	
    const percentageScreenWidthButtonReRoll = 0.665;
	const percentageScreenHeightButtonReRoll = 0.85;
	blockButtonReRoll.x = container.width * percentageScreenWidthButtonReRoll;
	blockButtonReRoll.y = container.height * percentageScreenHeightButtonReRoll;

	console.log(container.width, "45678765456789");
	resolve();
}

export async function DrawBlockBuildings(container, app, island, allTextResources, containerForMap) {
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
			const dimensions = {
				x: island.matrixOfIsland[0].length,
				y: island.matrixOfIsland.length,
			}
			if ((textureName === 'richHouse.png') && !island.buildingMoment) {
				const requiredResources = {stone: 2, hammer: 1};
				if (Object.keys(requiredResources).every((key) => requiredResources[key] <= island.resourcesOfUser[key]))
				{
					island.buildingMoment = true
					island.buldingObject = new Building(app, island.cells, island.buildingsOfUserIsland, island.buildings, island.quadTreeOfUserIsland, 'House', 'houseGrendee', {}, 1, 100, 0, 2, 5, requiredResources, island.resourcesOfUser, allTextResources, island.buildingCountsOfUser, containerForMap, dimensions, false, 0);
					island.buldingObject.setMatrixPattern([
						[0, 0, 0],
						[0, 1, 0],
						[1, 1, 0],
					])
					island.buldingObject.renderMatrixPattern(app);
				}
			}
			if ((textureName === 'barracks.png') && !island.buildingMoment) {
				const requiredResources = {stone: 2, wood: 1, money: 2, hammer: 1};
				if (Object.keys(requiredResources).every((key) => requiredResources[key] <= island.resourcesOfUser[key]))
				{
					island.buildingMoment = true
					island.buldingObject = new Building(app, island.cells, island.buildingsOfUserIsland, island.buildings, island.quadTreeOfUserIsland, 'Barrack', 'barrack', {}, 1, 100, 0, 2, 25, requiredResources, island.resourcesOfUser, allTextResources, island.buildingCountsOfUser, containerForMap, dimensions, false, 0);
					island.buldingObject.setMatrixPattern([
						[1, 1, 0],
						[0, 1, 1],
						[0, 1, 1],
					])
					island.buldingObject.renderMatrixPattern(app);
				}
			}
			if ((textureName === 'tower.png') && !island.buildingMoment) {
				const requiredResources = {}; //{stone: 2, wood: 2, money: 1, hammer: 1}
				if (Object.keys(requiredResources).every((key) => requiredResources[key] <= island.resourcesOfUser[key]))
				{
					island.buildingMoment = true
					island.buldingObject = new Building(app, island.cells, island.buildingsOfUserIsland, island.buildings, island.quadTreeOfUserIsland, 'Tower', 'tower', {}, 1, 100, 0, 2, 29, requiredResources, island.resourcesOfUser, allTextResources, island.buildingCountsOfUser, containerForMap, dimensions, false, 20);
					island.buldingObject.setMatrixPattern([
						[0, 0, 0],
						[0, 1, 0],
						[0, 0, 0],
					])
					island.buldingObject.renderMatrixPattern(app);
				}
			}
			if ((textureName === 'farm.png') && !island.buildingMoment) {
				const requiredResources = {wood: 1, hammer: 1};
				if (Object.keys(requiredResources).every((key) => requiredResources[key] <= island.resourcesOfUser[key]))
				{
					island.buildingMoment = true;
					island.buldingObject = new Building(app, island.cells, island.buildingsOfUserIsland, island.buildings, island.quadTreeOfUserIsland, 'Farm', 'farm', {wheat: 1}, 1, 100, 0, 1, 1, requiredResources, island.resourcesOfUser, allTextResources, island.buildingCountsOfUser, containerForMap, dimensions, false, 0);
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
					island.buldingObject = new Building(app, island.cells, island.buildingsOfUserIsland, island.buildings, island.quadTreeOfUserIsland, 'Warehouse', 'warehouse', {}, 1, 100, 0, 3, 9, requiredResources, island.resourcesOfUser, allTextResources, island.buildingCountsOfUser, containerForMap, dimensions, false, 0);
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
					island.buldingObject = new Building(app, island.cells, island.buildingsOfUserIsland, island.buildings, island.quadTreeOfUserIsland, 'Farmer House', 'houseVillage', {}, 1, 100, 50, 3, 13, requiredResources, island.resourcesOfUser, allTextResources, island.buildingCountsOfUser, containerForMap, dimensions, false, 0);
					island.buldingObject.setMatrixPattern([
						[0, 0, 0],
						[0, 1, 0],
						[0, 0, 0],
					])
					island.buldingObject.renderMatrixPattern(app);
				}
			}
			if ((textureName === 'wall.png') && !island.buildingMoment) {
				const requiredResources = {stone: 1};
				if (Object.keys(requiredResources).every((key) => requiredResources[key] <= island.resourcesOfUser[key]))
				{
					island.buildingMoment = true
					island.buldingObject = new Building(app, island.cells, island.buildingsOfUserIsland, island.buildings, island.quadTreeOfUserIsland, 'Wall', 'wall', {}, 0, 100, 0, 2, 21, requiredResources, island.resourcesOfUser, allTextResources, island.buildingCountsOfUser, containerForMap, dimensions, false, 0);
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



export function DrawBuildingsBlock(app, island, allTextResources, containerForMap) {
	const containerForBuilding = new PIXI.Container();
	app.stage.addChild(containerForBuilding);
	DrawBlockBuildings(containerForBuilding, app, island, allTextResources, containerForMap);
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
	const textForWars = new PIXI.Text();
	DrawTextOnContainer(textForWars, containerForResources, resourcesOfUser.money, 0.25, 0.70);
	const textForHammer = new PIXI.Text();
	DrawTextOnContainer(textForHammer, containerForResources, resourcesOfUser.hammer, 0.75, 0.3);
	const textForInhabitants = new PIXI.Text();
	DrawTextOnContainer(textForInhabitants, containerForResources, resourcesOfUser.inhabitants, 0.75, 0.07);
	const textForMoney = new PIXI.Text();
	DrawTextOnContainer(textForMoney, containerForResources, resourcesOfUser.inhabitants, 0.75, 0.58);

    
	const allTextResources = {
		textForWheat: textForWheat,
		textForWood: textForWood,
		textForStone: textForStone,
		textForHammer: textForHammer,
		textForInhabitants: textForInhabitants,
		textForMoney: textForMoney,
		textForWars: textForWars,
	}

	return allTextResources;
}

export function UpdateNumberOfResources(allTextResources, resourcesOfUser, buildings) {
	for (let key in allTextResources) {
		if (key === "textForWheat") {
			if (resourcesOfUser.wheat > resourcesOfUser.maxWheat + Game.warehouseAmountOfAdding * buildings.warehouse) {
				resourcesOfUser.wheat = resourcesOfUser.maxWheat + Game.warehouseAmountOfAdding * buildings.warehouse;
			}
			allTextResources[key].text = `${resourcesOfUser.wheat}/${resourcesOfUser.maxWheat + Game.warehouseAmountOfAdding * buildings.warehouse}`;
		}
		if (key === "textForMoney") {
			allTextResources[key].text = `${resourcesOfUser.money}`;
		}
		if (key === "textForWood") {
			if (resourcesOfUser.wood > resourcesOfUser.maxWood + Game.warehouseAmountOfAdding * buildings.warehouse) {
				resourcesOfUser.wood = resourcesOfUser.maxWood + Game.warehouseAmountOfAdding * buildings.warehouse;
			}
			allTextResources[key].text = `${resourcesOfUser.wood}/${resourcesOfUser.maxWood + Game.warehouseAmountOfAdding * buildings.warehouse}`;
		}
		if (key === "textForWars") {
			if (resourcesOfUser.wars > resourcesOfUser.maxWars + Game.barracksAmountOfAdding * buildings.barrack) {
				resourcesOfUser.wars = resourcesOfUser.maxWars + Game.barracksAmountOfAdding * buildings.barrack;
			}
			allTextResources[key].text = `${resourcesOfUser.wars}/${resourcesOfUser.maxWars + Game.barracksAmountOfAdding * buildings.barrack}`;
		}
		if (key === "textForStone") {
			if (resourcesOfUser.stone > resourcesOfUser.maxStone + Game.warehouseAmountOfAdding * buildings.warehouse) {
				resourcesOfUser.stone = resourcesOfUser.maxStone + Game.warehouseAmountOfAdding * buildings.warehouse;
			}
			allTextResources[key].text = `${resourcesOfUser.stone}/${resourcesOfUser.maxStone + Game.warehouseAmountOfAdding * buildings.warehouse}`;
		}
		if (key === "textForHammer") {
			allTextResources[key].text = `${resourcesOfUser.hammer}`;
		}
		if (key === "textForInhabitants") {
			allTextResources[key].text = `${resourcesOfUser.inhabitants}`;
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

	const containerForMap = new PIXI.Container();
	app.stage.addChild(containerForMap);

	const allContainer = {
		containerForResources: containerForResources,
		wheelBlock: wheelBlock,
		containerAboveTheWheel: containerAboveTheWheel,
		containerForTimer: containerForTimer,
		containerForDiceRoll: containerForDiceRoll,
		containerForMap: containerForMap,
	}

	return allContainer;
}