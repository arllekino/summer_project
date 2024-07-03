// import * as PIXI from "../../../pixi/pixi.mjs";

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