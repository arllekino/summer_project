import { MakePlayerReady } from "../requestsForMainGame.js";
import { webSocketObject } from "./lobby.js";

export async function WaitingForPlayers(arrPlayersId) {
    if (webSocketObject.webSocket) {
        webSocketObject.webSocket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            arrPlayersId.arr = data.arrPlayersId;
        };
    }
    else {
        console.log("соединение разорвалось");
    }
}

export async function SendPlayerId(arrPlayersId, idPlayer) {
    if (webSocketObject.webSocket) {
        arrPlayersId.arr.push(idPlayer);
        arrPlayersId.arr.sort();

        let responseLobby = await fetch('/find_key_room', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        });
        let lobbyData = await responseLobby.json();

        const data = {
            type: 'waiting',
            arrPlayersId: arrPlayersId.arr,
            key_room: lobbyData.key_room,
        }
        webSocketObject.webSocket.send(JSON.stringify(data));
        MakePlayerReady();
    }
    else {
        console.log("соединение разорвалось");
    }
}