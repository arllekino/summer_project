export async function UpdateIsland(island) {
    const data = {
        island_matrix: island.matrixOfIsland,
        food: island.resourcesOfUser.wheat,
        max_food: island.resourcesOfUser.maxWheat,
        wood: island.resourcesOfUser.wood,
        max_wood: island.resourcesOfUser.maxWood,
        stones: island.resourcesOfUser.stone,
        max_stones: island.resourcesOfUser.maxStone,
        warriors: island.resourcesOfUser.wars,
        max_warriors: island.resourcesOfUser.maxWars,
        villagers: island.resourcesOfUser.inhabitants,
        hammers: island.resourcesOfUser.hammer,
        money: island.resourcesOfUser.money,
        knowledge: island.resourcesOfUser.books,
    }

    const response = await fetch("/update_island", {
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

export async function ViewAllIsland(islands) {
    const data = {
        
    }

    const response = await fetch("/view_all_island", {
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