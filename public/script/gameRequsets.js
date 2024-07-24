const urlRequests = {
    endGame: '/end_game'
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

export async function updateIsland(resources, userId)
{
    const data = {
        food: resources.wheat,
        max_food: resources.maxWheat,
        wood: resources.wood,
        max_wood: resources.maxWood,
        stones: resources.stone,
        max_stones: resources.maxStones,
        warriors: resources.wars,
        max_warriors: resources.maxWars,
        vilagers: resources.inhabitants,
        hammers: resources.hammer,
        money: resources.money,
        knowledge: resources.books,
        user_id: userId,
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