//10.250.104.24 IP мой института
//10.10.24.51   IP коливинга
//172.20.10.2   телефон
//10.250.104.17 IP Лехи
document.addEventListener('DOMContentLoaded', () => {
    const ws = new WebSocket('ws://10.250.104.24:8080');

    const quitButton = document.querySelector('.logout');
    
    ws.onopen = () => {
        joinLobby();
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
    
    quitButton.addEventListener('click', function quitUser() {
        let username = localStorage.getItem('username');
        if (username) {
            quitLobby(username);
        }
        this.removeEventListener('click', quitUser);
    });

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
    }

    function quitLobby(username) {
        ws.send(JSON.stringify({
            type: 'player_left',
            username: username
        }));
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

    function deletePlayer(username) {
        const playerContainer = document.querySelector('.intro__players');
        const player = document.getElementById(username);
        playerContainer.removeChild(player);
    }
});