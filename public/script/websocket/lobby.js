//10.250.104.24 IP мой института
//10.10.24.51   IP коливинга
//172.20.10.2   телефон
//10.250.104.17 IP Лехи
document.addEventListener('DOMContentLoaded', () => {
    const ws = new WebSocket('ws://10.250.104.24:8080');

    const quitButton = document.querySelector('.logout');
    const keyRoom = document.querySelector('.intro__code').innerHTML;
    var users = [];
    
    ws.onopen = () => {
        let username = localStorage.getItem('username');
        if (username) {
            joinLobby(username);
        }
        users.push(username);
        request = setInterval(sendUserForCheck(username), 500);
        setTimeout(() => {
            checking = setInterval(checkUsersConnection(users), 1000)
        }, 5000);
    }
    
    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log(data);
        
        if (data.type === 'new_player') {
            const extantUser = document.getElementById(data.username);
            if (!extantUser) {;
                showNewPlayer(data.username, data.status, data.readiness);
            }
        } 
        if (data.type === 'player_left') {
            const extantUser = document.getElementById(data.username);
            if (extantUser) {
                deletePlayer(data.username);
            }
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

    ws.onclose = () => {
        clearInterval(request);
        clearInterval(checking);
        let response = fetch('/kick_from_lobby', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        });
    }

    function joinLobby(username) {
        ws.send(JSON.stringify({
            type: 'new_player',
            username: username
        }));
    }

    function quitLobby(username) {
        ws.send(JSON.stringify({
            type: 'player_left',
            username: username
        }));
    }
    
    function showNewPlayer(username, status, readiness) {
        const playerContainer = document.querySelector('.intro__players');
        const newPlayer = document.createElement('div');
        newPlayer.className = 'intro__player';
        newPlayer.id = username;
        newPlayer.innerHTML = `
            <img src="../images/blueFlag200x200.png" alt="Описание картинки" class="flag-image">
            <div class="block__user-name">
                <span class="user-name">${username}</span>
            </div>
			<span class="{{ user.status }}">${status}</span>
			<span class="readiness">${readiness}</span>
        `;
        playerContainer.append(newPlayer);
    }

    function deletePlayer(username) {
        const playerContainer = document.querySelector('.intro__players');
        const player = document.getElementById(username);
        playerContainer.removeChild(player);
    }

    function sendUserForCheck(username) {
        ws.send(JSON.stringify({
            type: 'checking_other_users_request',
            username: username,
            status: 'guest',
            readiness: 'not ready'
        }));
    }

    function checkUsersConnection(users) {
        const players = document.getElementsByClassName('user-name');
        for (let i = 0; i < players.length; i++) {
            let player = players[i].innerHTML
            if (!users.includes(player)) {
                deletePlayer(player);
            }
        }
        users = [];
    }
});