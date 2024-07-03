const Resources = {
    Wheat: 0,
    Wood: 1,
    Stone: 2,
    Inhabitant: 3,
    Hammer: 4,
}

const FirstFaceOfCubeHouseVillage = [Resources.Wheat, Resources.Wheat, Resources.Wheat, Resources.Wheat];
const SecondFaceOfCubeHouseVillage = [Resources.Wood, Resources.Wood, Resources.Wood];
const ThirdFaceOfCubeHouseVillage = [Resources.Wood, Resources.Stone];
const FourthFaceOfCubeHouseVillage = [Resources.Wheat, Resources.Hammer, Resources.Hammer];
const FifthFaceOfCubeHouseVillage = [Resources.Wheat, Resources.Stone];
const SixthFaceOfCubeHouseVillage = [Resources.Wood, Resources.Hammer];

const CubeHouseVillage = {
    FirstFace: FirstFaceOfCubeHouseVillage,
    SecondFace: SecondFaceOfCubeHouseVillage,
    ThirdFace: ThirdFaceOfCubeHouseVillage,
    FourthFace: FourthFaceOfCubeHouseVillage,
    FifthFace: FifthFaceOfCubeHouseVillage,
    SixthFace: SixthFaceOfCubeHouseVillage,
}

const FirstFaceOfCubeHouseGrandee = [Resources.Stone, Resources.Stone, Resources.Stone];
const SecondFaceOfCubeHouseGrandee = [Resources.Hammer, Resources.Hammer, Resources.Hammer];
const ThirdFaceOfCubeHouseGrandee = [Resources.Stone];
const FourthFaceOfCubeHouseGrandee = [Resources.Wood];
const FifthFaceOfCubeHouseGrandee = [Resources.Wheat];
const SixthFaceOfCubeHouseGrandee = [Resources.Stone, Resources.Hammer];

const CubeHouseGrandee = {
    FirstFace: FirstFaceOfCubeHouseGrandee,
    SecondFace: SecondFaceOfCubeHouseGrandee,
    ThirdFace: ThirdFaceOfCubeHouseGrandee,
    FourthFace: FourthFaceOfCubeHouseGrandee,
    FifthFace: FifthFaceOfCubeHouseGrandee,
    SixthFace: SixthFaceOfCubeHouseGrandee,
}