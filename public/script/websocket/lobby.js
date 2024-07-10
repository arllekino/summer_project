//10.250.104.24 IP института
//10.10.24.51   IP коливинга
document.addEventListener('DOMContentLoaded', () => {
    const ws = new WebSocket('ws://10.250.104.24:8080');

    const quitButton = document.querySelector('.logout');
    
    ws.onopen = () => {
        let username = localStorage.getItem('username');
        if (username) {
            joinLobby(username);
        }
    }
    
    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        
        if (data.type === 'new_player') {
            const extantUser = document.getElementById(data.username);
            if (!extantUser) {
                showNewPlayer(data.username);
            }
        } 
        
        if (data.type === 'player_left') {
            const extantUser = document.getElementById(data.username);
            console.log(data);
            if (extantUser) {
                deletePlayer(data.username);
            }
        }
    };

    quitButton.addEventListener('click', function quitUser() {
        let username = localStorage.getItem('username');
        if (username) {
            quitLobby(username);
        }
        this.removeEventListener('click', quitUser);
    });

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
    
    function showNewPlayer(username) {
        const playerContainer = document.querySelector('.intro__players');
        const newPlayer = document.createElement('div');
        newPlayer.className = 'intro__player';
        newPlayer.id = username;
        newPlayer.innerHTML = `
            <img src="../images/blueFlag200x200.png" alt="Описание картинки" class="flag-image">
            <div class="block__user-name">
                <span class="user-name">${username}</span>
            </div>
        `;
        playerContainer.append(newPlayer);
    }

    function deletePlayer(username) {
        const playerContainer = document.querySelector('.intro__players');
        const player = document.getElementById(username);
        playerContainer.removeChild(player);
    }
});