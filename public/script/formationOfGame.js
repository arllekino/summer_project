const urlRequests = {
    countOfUser: "/find_count_players",
    checkStatusOfUserInLobby: "/get_player_status",
    sendField: "/create_map",
    getField: "/find_map",
    getUserNumber: "/find_username",
}

async function GetCountOfUsers() {
    const response = await fetch(urlRequests.countOfUser, {
        method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
    })
    if (response.ok) {
        const data = await response.json();
        return data;
    }
    else {
        console.log(response.status);
    }
}

async function GetUserNumber() {
    const response = await fetch(urlRequests.getUserNumber, {
        method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
    })
    if (response.ok) {
        const data = await response.json();
        return data;
    }
    else {
        console.log(response.status);
    }
}

async function CheckStatusOfUserInLobby() {
    const response = await fetch(urlRequests.checkStatusOfUserInLobby, {
        method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
    })
    if (response.ok) {
        const data = await response.json();
        return data;
    }
    else {
        console.log(response.status);
    }
}

async function CheckReadinessOfField() {
    const response = await fetch(urlRequests.checkReadinessOfField, {
        method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
    })
    if (response.ok) {
        const data = await response.json();
        return data;
    }
    else {
        if (response.status === 404) {
            const data = "NotReady";
            return data;
        }
        console.log(response.status);
    }
}

async function SendField(matrixOfField) {
    const data = {
        field: matrixOfField,
    }

    const response = await fetch(urlRequests.sendField, {
        method: "POST",
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
    });

    if (!response.ok) {
        console.log(response.statusText);
        return;
    }
}

async function GetField() {
    const response = await fetch(urlRequests.getField, {
        method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
    })
    if (response.ok) {
        const data = await response.json();
        return data;
    }
    else {
        console.log(response.status);
    }
}

export const islandTemplate = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 3, 4, 4, 4, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0,],
    [0, 0, 0, 3, 3, 3, 3, 4, 4, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0,],
    [0, 0, 3, 3, 3, 3, 3, 4, 4, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 0, 0,],
    [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 2, 2, 2, 2, 2, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0,],
    [0, 1, 1, 0, 0, 0, 0, 0, 0, 2, 2, 2, 1, 1, 1, 1, 1, 2, 0, 0,],
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 0, 0, 0,],
    [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0,],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0,],
    [0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0,],
    [0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0,],
];

function MakeField(countOfUser) {
    const widthOfField = countOfUser >= 2 ? 100 : 50;
    const heightOfField = countOfUser >= 3 ? 100 : 50;
    const matrixOfField = [];
    for (let iterY = 0; iterY < heightOfField; iterY++) {
        matrixOfField[iterY] = [];
        for (let iterX = 0; iterX < widthOfField; iterX++) {
            matrixOfField[iterY][iterX] = 0;
        }
    }
    return matrixOfField;
}

export function GetBoundsForIsland(numberOfUser, bounds) {
    switch (numberOfUser) {
        case 1:
            bounds.iterXOfField = 15;
            bounds.iterYOfField = 10;
            break;
        case 2:
            bounds.iterXOfField = 65;
            bounds.iterYOfField = 10;
            break;
        case 3:
            bounds.iterXOfField = 15;
            bounds.iterYOfField = 70;
            break;
        case 4:
            bounds.iterXOfField = 65;
            bounds.iterYOfField = 70;
            break;
        default:
            bounds.iterXOfField = 0;
            bounds.iterYOfField = 0;
    }
}

function InsertIslandIntoField(numberOfUser, matrixOfField) {
    const dimensions = {
        x: matrixOfField[0].length,
        y: matrixOfField.length,
    }
    const bounds = {
        iterXOfField: 0,
        iterYOfField: 0,
    }
    GetBoundsForIsland(numberOfUser, bounds);
    for (let iterY = 0; iterY < dimensions.y; iterY++, bounds.iterYOfField++) {
        matrixOfField[iterY] = [];
        for (let iterX = 0; iterX < dimensions.x; iterX++, bounds.iterXOfField++) {
            matrixOfField[bounds.iterYOfField][bounds.iterXOfField] = islandTemplate[iterY][iterX];
        }
    }
}

function InsertIslandsIntoField(countOfUser, matrixOfField) {
    for (let iter = 0; iter < countOfUser; iter++) {
        InsertIslandIntoField(iter, matrixOfField);
    }
}

export function FormationOfGame() {
    const status = CheckStatusOfUserInLobby();
    const matrixOfField = [];
    if (status === "host") {
        const countOfUser = GetCountOfUsers();
        matrixOfField = MakeField(countOfUser);
        InsertIslandsIntoField(countOfUser, matrixOfField);
        SendField(matrixOfField);
    }
    else {
        let worldMatrix;
        const waitForField = setInterval(() => {
            const worldMatrix = CheckReadinessOfField();
            if (worldMatrix !== "NotReady") {
                clearInterval(waitForField);
            }
        }, 2000);
        matrixOfField = worldMatrix;
    }
    const numberOfUser = GetUserNumber();
    return {
        numberOfUser: numberOfUser,
        matrixOfField: matrixOfField,
    };
}