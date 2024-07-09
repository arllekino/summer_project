
function intersects(object1, object2) 
{
    const bounds1 = object1.getBounds();
    const bounds2 = object2.getBounds();
    return (
        bounds1.x + bounds1.width < bounds2.x + bounds2.width
        && bounds1.x + bounds1.width > bounds2.x
        && bounds1.y + bounds1.height < bounds2.y + bounds2.height
        && bounds1.y + bounds1.height > bounds2.y
    );
}

function mouseDistance(mouseData, object)
{
    const bounds1 = mouseData;
    const bounds2 = object.getBounds();

    return Math.sqrt(((bounds2.x + bounds2.width / 2) - (bounds1.x + bounds1.width / 2)) ** 2 + ((bounds2.y + bounds2.height / 2) - (bounds1.y + bounds1.height / 2)) ** 2);
}

function mouseIntersects(mouseData, object)
{
    const bounds1 = mouseData;
    const bounds2 = object.getBounds();
    
    return (
        bounds1.x + bounds1.width < bounds2.x + bounds2.width
        && bounds1.x + bounds1.width > bounds2.x
        && bounds1.y + bounds1.height < bounds2.y + bounds2.height
        && bounds1.y + bounds1.height > bounds2.y
    );
}

function distance(object1, object2)
{
    const bounds1 = object1.getBounds();
    const bounds2 = object2.getBounds();

    return Math.sqrt(((bounds2.x + bounds2.width / 2) - (bounds1.x + bounds1.width / 2)) ** 2 + ((bounds2.y + bounds2.height / 2) - (bounds1.y + bounds1.height / 2)) ** 2);
}

function cartesianToIsometric(cartX, cartY) {
    return {
        x: cartX - cartY,
        y: (cartX + cartY) / 2
    };
}

export {intersects, distance, cartesianToIsometric, mouseDistance, mouseIntersects};
