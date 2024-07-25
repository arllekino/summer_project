//10.250.104.24 IP мой института
//10.10.24.51   IP коливинга
//172.20.10.2   телефон
//10.250.104.17 IP Лехи
document.addEventListener('DOMContentLoaded', () => {
    const ws = new WebSocket('ws://10.10.29.33:8080');

    const quitButton = document.getElementById('quit_button');
    const readinessButton = document.getElementById('button_readiness');
    const readiness = document.getElementById('readiness');
    const infoBlock = document.querySelector('.intro__block');
    let startGameButton = document.getElementById('button_start_game');

    const ready = 'Готов';
    const notReady = 'Не готов';
    const host = 'host';
    const guest = 'guest';

    let keyRoom;
    let userId;
    let userStatus;
    
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
                showNewPlayer(data.user_id, data.username, data.status, data.readiness, data.color_flag);
            }
        } 
        if (data.type === 'player_disconnected') {
            deletePlayer(data.user_id);    
        }  
        if (data.type === 'player_left') {
            deletePlayer(data.user_id);
        }
        if (data.type === 'user_readiness') {
            changeReadiness(data.user_id, data.readiness)
        }      
        if (data.type === 'game_started') {
            redirectToGame()
        }
        if (data.type === 'new_host') {
            showNewHost(data.user_id)
        }
    };

    ws.onclose = () => {
        clearInterval(heartbeatLobby);
    }

    readinessButton.addEventListener('click', setReadiness);
    quitButton.addEventListener('click', quitLobby);

    async function setReadiness() {
        const userReadiness = document.getElementById(`readiness_${userId}`);

        let urlRequest;
        if (userReadiness.innerText === notReady) {
            urlRequest = '/make_player_ready';
        } else {
            urlRequest = '/make_player_not_ready';
        }
        
        let response = await fetch(urlRequest, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        });
        if (response.ok) {
            if (userReadiness.innerText === notReady) {
                userReadiness.innerText = ready;
                readiness.innerText = ready;
            } else {
                userReadiness.innerText = notReady;
                readiness.innerText = notReady;
            }
            changeReadiness(userId, readiness.innerText);

            ws.send(JSON.stringify({
                from: 'lobby',
                type: 'user_readiness',
                key_room: keyRoom,
                user_id: userId,
                readiness: userReadiness.innerText 
            }));
        }
    }

    async function startGame() {
        let postData = {
            key_room: keyRoom
        };

        let response = await fetch('/start_game', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(postData)
        });

        let getData = await response.json();
        if (response.ok) {
            if (getData.readiness) {
                ws.send(JSON.stringify({
                    from: 'lobby',
                    type: 'game_started',
                    key_room: keyRoom
                }));
    
                window.location.href = `/main_game/${keyRoom}`;
            } else {
                console.log(123);
            }
        }
    }

    async function redirectToGame() {
        let postData = {
            key_room: keyRoom
        }

        let response = await fetch('/add_user_to_game', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body : JSON.stringify(postData)
        });

        if (response.ok) {
            window.location.href = `/main_game/${keyRoom}`;
        }
    }

    function changeReadiness(id, readiness) {
        const userCard = document.getElementById(`readiness_${id}`);
        userCard.innerText = readiness;
        if (readiness === 'Не готов') {
            userCard.classList.remove('ready');
            userCard.classList.add('not_ready');
        } else {
            userCard.classList.remove('not_ready');
            userCard.classList.add('ready');
        }

        if (startGameButton) {
            lobbyReadiness();
        }
    }
    
    async function lobbyReadiness() {
        let postData = {
            key_room: keyRoom
        };

        let response = await fetch('/is_all_players_ready', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(postData)
        });
        if (response.ok) {
            let getData = await response.json();
            if (getData.lobby_readiness) {
                startGameButton.addEventListener('click', startGame);
                startGameButton.style.opacity = 1;
            } else {
                startGameButton.removeEventListener('click', startGame);
                startGameButton.style.opacity = 0.7;
            }
        }
    }

    async function quitLobby() {
        let response = await fetch('/quit_lobby', {
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        });

        if (response.ok) {
            ws.send(JSON.stringify({
                from: 'lobby',
                type: 'player_left',
                key_room: keyRoom,
                user_id: userId
            }));

            window.location.href = '/start_lobby_page';
        }
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

        let responseColorFlag = await fetch('/get_color_flag', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        });
        let colorFlag = await responseColorFlag.json();

        if (startGameButton) {
            userStatus = host;
        } else {
            userStatus = guest
        }

        ws.send(JSON.stringify({
            from: 'lobby',
            type: 'new_player',
            key_room: lobbyData.key_room,
            user_id: userData.id,
            username: userData.username,
            color_flag: colorFlag.color_flag,
            status: userStatus,
            readiness: 'Не готов'
        }));
        userId = userData.id;
        keyRoom = lobbyData.key_room;

        if (startGameButton) {
            lobbyReadiness();
        }
    }

    function showNewPlayer(userID, username, status, readiness, colorFlag) {
        const playerContainer = document.querySelector('.intro__players');
        const newPlayer = document.createElement('div');
        newPlayer.className = 'intro__player';
        newPlayer.id = userID;
        newPlayer.innerHTML = `
            <img src="../images/${colorFlag}Flag200x200.png" alt="Описание картинки" class="flag-image">
            <div class="block__user-name">
                <span class="user-name">${username}</span>
            </div>
			<span class="player__status player__status_${status}">${status}</span>
			<span class="readiness not_ready" id="readiness_${userID}">${readiness}</span>
        `;
        playerContainer.append(newPlayer);
    }

    async function deletePlayer(userID) {
        const playerContainer = document.querySelector('.intro__players');
        const player = document.getElementById(userID);
        if (player) {
            playerContainer.removeChild(player);
        }
        let userData = {
            user_id: userID
        };
        let responseKick = await fetch('/kick_from_lobby', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(userData)
        });

        let lobbyData = {
            key_room: keyRoom
        };
        let responseHostExist = await fetch('/is_host_exist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(lobbyData)
        });
        if (responseHostExist.ok) {
            let getHostData = await responseHostExist.json();
            if(!getHostData.host_existing) {
                let responseMakeHost = await fetch('/make_guest_host', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(lobbyData)
                });

                if (responseMakeHost.ok) {
                    let getMakeHostData = await responseMakeHost.json();
                    if (getMakeHostData.success) {
                        showNewHost(userId);
                        sendNewHost(userId);
                        showStartGameButton();
                    }
                }
            }
        }
    }
    
    function showNewHost(id) {
        const userCard = document.getElementById(id);
        const playerStatus = userCard.querySelector('.player__status_guest');

        playerStatus.innerText = host;
        playerStatus.classList.remove('player__status_guest');
        playerStatus.classList.add('player__status_host');
    }

    function sendNewHost(id) {
        ws.send(JSON.stringify({
            from: 'lobby',
            type: 'new_host',
            key_room: keyRoom,
            user_id: id
        }));
    }

    function showStartGameButton() {
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'intro__play';
        buttonContainer.innerHTML = `						
            <button type="submit" class="intro__but play" id="button_start_game">
				<span class="button-text2">Начать игру</span>
				<img src="../images/sword.svg" alt="Описание картинки" class="button-image2">
			</button>`;
        infoBlock.append(buttonContainer);
        startGameButton = document.getElementById('button_start_game');
    }

    function heartbeat() {
        ws.send(JSON.stringify({
            from: 'lobby',
            type: 'heartbeat',
            key_room: keyRoom
        }));
    }
});