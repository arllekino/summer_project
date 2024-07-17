const urlRequests = {
    countOfUser: "/find_count_players",
    checkStatusOfUserInLobby: "/get_player_status",
    sendField: "/create_map",
    getField: "/find_map",
    getUserNumber: "/find_username",
    getPlayerIds: "/get_ids_players"
}

async function GetCountOfUsers() {
    const response = await fetch(urlRequests.countOfUser, {
        method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    })
    if (response.ok) {
        const data = await response.json();
        return data.count_players;
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
        method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    })
    if (response.ok) {
        const data = await response.json();
        return data.player_status;
    }
    else {
        console.log(response.status);
    }
}

async function CheckReadinessOfField() {
    const response = await fetch(urlRequests.getField, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    })
    if (response.ok) {
        const data = await response.json();
        return data.matrix_game_map;
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
        matrix_game_map: matrixOfField,
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

export async function getUsersIds()
{
    const response = await fetch(urlRequests.getPlayerIds, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });

    if (response.ok) {
        const data = await response.json();
        return data.ids_players.sort();
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


function MakeField(obj) {
    let widthOfField = 0;
    let heightOfField = 0;
    switch (obj.countOfUser) {
        case 1:
            widthOfField = 50;
            heightOfField = 50;
            break;
        case 2:
            widthOfField = 100;
            heightOfField = 50;
            break;
        case 3:
            widthOfField = 100;
            heightOfField = 100;
            break;
        case 4:
            widthOfField = 100;
            heightOfField = 100;
            break;
        default:
            widthOfField = 50;
            heightOfField = 50;
            break;
    }
    
    // const matrixOfField = new Array(widthOfField).fill(0).map(() => new Array(heightOfField).fill(0));
    let matrixOfField = [];
    for(let i = 0; i < widthOfField; i++)
    {
        let temp = [];
        temp.splice(0, temp.length);
        for (let j = 0; j < heightOfField; j++)
        {
            temp.push(0);
        }
        matrixOfField.push(temp)
    }
    return matrixOfField;
}

export function GetBoundsForIsland(iter, bounds) {
    switch (iter) {
        case 0:
            bounds.iterXOfField = 15;
            bounds.iterYOfField = 10;
            bounds.startXOfFiled = 15;
            bounds.startYOfFiled = 10;
            break;
        case 1:
            bounds.iterXOfField = 65;
            bounds.iterYOfField = 10;
            bounds.startXOfFiled = 65;
            bounds.startYOfFiled = 10;
            break;
        case 2:
            bounds.iterXOfField = 15;
            bounds.iterYOfField = 70;
            bounds.startXOfFiled = 15;
            bounds.startYOfFiled = 70;
            break;
        case 3:
            bounds.iterXOfField = 65;
            bounds.iterYOfField = 70;
            bounds.startXOfFiled = 65;
            bounds.startYOfFiled = 70;
            break;
        default:
            bounds.iterXOfField = 0;
            bounds.iterYOfField = 0;
            bounds.startXOfFiled = 0;
            bounds.startYOfFiled = 0;
    }
}

function InsertIslandIntoField(iter, matrixOfField) {
    console.log(iter);
    const dimensions = {
        x: islandTemplate[0].length,
        y: islandTemplate.length,
    }
    const bounds = {
        iterXOfField: 0,
        iterYOfField: 0,
        startXOfFiled: 0,
        startYOfFiled: 0,
    }
    GetBoundsForIsland(iter, bounds);
    console.log(dimensions, 'aisyhuvdghasijndkas');
    console.log(bounds, '[][][][][]]');
    for (let iterY = 0; iterY < dimensions.y; iterY++, bounds.iterYOfField++) {
        bounds.iterXOfField = bounds.startXOfFiled;
        for (let iterX = 0; iterX < dimensions.x; iterX++, bounds.iterXOfField++) {
            console.log(bounds);
            matrixOfField[bounds.iterYOfField][bounds.iterXOfField] = islandTemplate[iterY][iterX];
        }
    }
}

function InsertIslandsIntoField(obj, matrixOfField, resolve) {
    console.log(obj);
    for (let iter = 0; iter < obj.countOfUser; iter++) {
        InsertIslandIntoField(iter, matrixOfField);
    }
    resolve();
}

export async function FormationOfGame() {
    const status = await CheckStatusOfUserInLobby();
    let matrixOfField = [];
    if (status === "host") {
        const countOfUser = await GetCountOfUsers();
        const obj = {
            countOfUser: countOfUser,
        }
        matrixOfField = MakeField(obj);
        const promise = new Promise(function(resolve) {
            InsertIslandsIntoField(obj, matrixOfField, resolve);
        });
        await Promise.all([promise]);
        console.log(matrixOfField);
        SendField(matrixOfField);
    }
    else {
        const promise = new Promise(function(resolve) {
            const waitForField = setInterval(async () => {
                let worldMatrix = await CheckReadinessOfField();
                if (worldMatrix !== "NotReady") {
                    matrixOfField = worldMatrix;
                    clearInterval(waitForField);
                    resolve();
                }
            }, 2000);
        });
        await Promise.all([promise]);
    }
    const numberOfUser = await GetUserNumber();
    const userIDInLobby = await getUsersIds();
    return {
        arrOfUserIdsInLobby: userIDInLobby,
        numberOfUser: numberOfUser.id,
        matrixOfField: matrixOfField,
    };
}