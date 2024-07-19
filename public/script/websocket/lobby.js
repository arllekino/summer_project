document.addEventListener('DOMContentLoaded', () => {
    const ws = new WebSocket('ws://10.10.24.159:8080');

    const quitButton = document.querySelector('.logout');
    let keyRoom = '';
    
    let heartbeatLobby;
    ws.onopen = () => {
        joinLobby();
        heartbeatLobby = setInterval(heartbeat, 500);
    }
    
    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log(data);
        
        if (data.type === 'new_player') {
            const extantUser = document.getElementById(data.user_id);
            if (!extantUser) {;
                showNewPlayer(data.user_id, data.username, data.status, data.readiness);
            }
        } 
        if (data.type === 'player_disconnected') {
            deletePlayer(data.user_id);    
        }        
        if (data.type === 'checking_other_users_request') {
            users.push(data.username);
            ws.send(JSON.stringify({
                type: 'checking_other_users_response',
                username: username
            }));
        }
        if (data.type === 'checking_other_users_response') {
            users.push(data.username);
        }
    };

    ws.onclose = () => {
        clearInterval(heartbeatLobby);
    }

    async function joinLobby() {
        let responseUser = await fetch('/find_username', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        });
        let userData = await responseUser.json();
        
        let responseLobby = await fetch('/find_key_room', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        });
        let lobbyData = await responseLobby.json();

        ws.send(JSON.stringify({
            type: 'new_player',
            key_room: lobbyData.key_room,
            user_id: userData.id,
            username: userData.username,
            status: 'guest',
            readiness: 'not ready'
        }));
        keyRoom = lobbyData.key_room;
    }

    function showNewPlayer(userId, username, status, readiness) {
        const playerContainer = document.querySelector('.intro__players');
        const newPlayer = document.createElement('div');
        newPlayer.className = 'intro__player';
        newPlayer.id = userId;
        newPlayer.innerHTML = `
            <img src="../images/blueFlag200x200.png" alt="Описание картинки" class="flag-image">
            <div class="block__user-name">
                <span class="user-name">${username}</span>
            </div>
			<span class="${status}">${status}</span>
			<span class="readiness">${readiness}</span>
        `;
        playerContainer.append(newPlayer);
    }

    async function deletePlayer(userId) {
        const playerContainer = document.querySelector('.intro__players');
        const player = document.getElementById(userId);
        playerContainer.removeChild(player);
        let data = {
            user_id: userId
        }
        let response = await fetch('/kick_from_lobby', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        });
    }
    
    function heartbeat() {
        ws.send(JSON.stringify({
            type: 'heartbeat',
            key_room: keyRoom
        }));
    }
});