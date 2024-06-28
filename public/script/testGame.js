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

async function DrawBlockWheelEvents(container, app) {
	const textureBackground = await PIXI.Assets.load(
		"/../assets/textures/WheelEventsBlock.svg",
	);
	const wheelBlock = new PIXI.Sprite(textureBackground);
	container.addChild(wheelBlock);

	const percentageScreenWidth = 0.87;
	const percentageScreenHeight = 0.72;
	container.x = app.screen.width * percentageScreenWidth;
	container.y = app.screen.height * percentageScreenHeight;

	AddIconInInfoBlock(
		container,
		0.24,
		-0.22,
		"/../assets/textures/BlockAboveTheWheel.svg",
	);
}

export function DrawInfoBlock(app) {
	const containerForResources = new PIXI.Container();
	app.stage.addChild(containerForResources);
	DrawBlockResources(containerForResources, app);
	
	const containerForWheel = new PIXI.Container();
	app.stage.addChild(containerForWheel);
	DrawBlockWheelEvents(containerForWheel, app);
}