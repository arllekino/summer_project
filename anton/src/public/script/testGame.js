import * as PIXI from "../../../pixi/pixi.mjs";

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
		"../textures/ResourceBlock.svg",
	);
	const resourceBlock = new PIXI.Sprite(textureBackground);
	container.addChild(resourceBlock);

	const percentageScreenWidth = 0.005;
	const percentageScreenHeight = 0.77;
	container.x = app.screen.width * percentageScreenWidth;
	container.y = app.screen.height * percentageScreenHeight;

	AddIconInInfoBlock(container, 0.03, 0.05, "../textures/SeedIcon.svg");
	AddIconInInfoBlock(container, 0.03, 0.3, "../textures/WoodIcon.svg");
	AddIconInInfoBlock(container, 0.03, 0.46, "../textures/StoneIcon.svg");
	AddIconInInfoBlock(container, 0.6, 0.05, "../textures/CitizenIcon.svg");
	AddIconInInfoBlock(container, 0.6, 0.3, "../textures/HammerIcon.svg");
}

async function DrawBlockWheelEvents(container, app) {
	const textureBackground = await PIXI.Assets.load(
		"../textures/WheelEventsBlock.svg",
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
		"../textures/BlockAboveTheWheel.svg",
	);
}

const app = new PIXI.Application();

await app.init({ background: "#029CD2", resizeTo: window });

document.body.appendChild(app.canvas);

const containerForResources = new PIXI.Container();
app.stage.addChild(containerForResources);
DrawBlockResources(containerForResources, app);

const containerForWheel = new PIXI.Container();
app.stage.addChild(containerForWheel);
DrawBlockWheelEvents(containerForWheel, app);
