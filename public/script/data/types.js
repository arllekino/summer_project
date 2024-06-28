// enum TBuilding {
// 	Farm,
// 	Wall,
// 	HousePeasant,
// 	HouseNobles,
// 	Warehouse,
// }

// enum TResources {
// 	Wood,
// 	Wheat,
// 	Stone,
// 	Inhabitant,
// 	Hammer,
// }

// type FaceOFCube = Array<TResources>;

// type CubeOFResources = {
// 	firstFace: FaceOFCube;
// 	secondFace: FaceOFCube;
// 	thirdFace: FaceOFCube;
// 	fourthFace: FaceOFCube;
// 	fifthFace: FaceOFCube;
// 	sixthFace: FaceOFCube;
// };

// type PassiveAbility = {
// 	typeOfResources: TResources;
// 	count: number;
// };

// type Building = {
// 	id: number;
// 	HP: number;
// 	defense?: number;
// 	typeOFBuilding: TBuilding;
// 	texture: Array<any>;
// 	cube?: CubeOFResources;
// 	passiveAbility?: PassiveAbility;
// 	countOfPeople: number;
// 	width: number;
// 	height: number;
// };

// enum TCell {
// 	Water,
// 	Sand,
// 	Grass,
// 	BuildingOnGrass,
// }

// type Cell = {
// 	id: number;
// 	idBuilding: number;
// 	typeOfSurface: TCell;
// };

// type MapWorld = {
// 	Generalfield: Array<Array<Cell>>;
// 	players: Array<Player>;
// };

// type Island = {
// 	field: Array<Array<Cell>>;
// 	buildings: Array<Building>;
// };

// type Player = {
// 	island: Island;
// 	resources: Array<TResources>;
// 	availableBuildings: Array<Building>;
// };
