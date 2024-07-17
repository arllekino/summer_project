export async function MakePlayersNotReady() {
    const response = await fetch("/make_players_not_ready", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    })
    if (!response.ok) {
        console.log(response.status);
    }
}

export async function CheckReadinessOfPlayers() {
    const response = await fetch("/is_all_players_ready", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    })
    if (response.ok) {
        const data = await response.json();
        return data.lobby_readiness;
    } 
    else {
        console.log(response.status);
    }
}

export async function MakePlayerNotReady() {
    const response = await fetch("/make_player_not_ready", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    })
    if (!response.ok) {
        console.log(response.status);
    } 
}

export async function MakePlayerReady() {
    const response = await fetch("/make_player_ready", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    })
    if (!response.ok) {
        console.log(response.status);
    }
}