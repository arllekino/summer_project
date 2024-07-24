const urlRequests = {
    endGame: '/end_game',
    createIsland: '/create_island',
    updateIsland: '/update_island',
    viewIsland: '/view_island',
}

export async function endGame()
{
    const response = await fetch(urlRequests.endGame, {
        method: "POST",
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

export async function createIsland()
{
    const response = await fetch(urlRequests.createIsland, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });
    if (response.ok) {
        return 'ok';
    }
    else {
        return 'error';
    }
}

export async function viewIsland()
{
    const response = await fetch(urlRequests.viewIsland, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });
    if (response.ok) {
        const data = await response.json();
        return data;
    }

    if (!response.ok) {
        console.log(response.statusText);
        return;
    }
}

export async function updateIsland(resources)
{
    const data = {
        food: resources.wheat,
        max_food: resources.maxWheat,
        wood: resources.wood,
        max_wood: resources.maxWood,
        stones: resources.stone,
        max_stones: resources.maxStone,
        warriors: resources.wars,
        max_warriors: resources.maxWars,
        villagers: resources.inhabitants,
        hammers: resources.hammer,
        money: resources.money,
        knowledge: resources.books,
    }

    const response = await fetch(urlRequests.updateIsland, {
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