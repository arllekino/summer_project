
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

function mouseDistanceInContainer(mouseData, object, container)
{
    const bounds1 = mouseData;
    const bounds2 = {
        x: object.getBounds().x,
        y: object.getBounds().y,
        width: object.getBounds().width,
        height: object.getBounds().height,
    };
    bounds2.x += container.x;
    bounds2.y += container.y;

    return Math.sqrt(((bounds2.x + bounds2.width / 2) - (bounds1.x + bounds1.width / 2)) ** 2 + ((bounds2.y + bounds2.height / 2) - (bounds1.y + bounds1.height / 2)) ** 2);
}

function mouseIntersectsInContainer(mouseData, object, container)
{
    const bounds1 = mouseData;
    const bounds2 = {
        x: object.getBounds().x,
        y: object.getBounds().y,
        width: object.getBounds().width,
        height: object.getBounds().height,
    };
    bounds2.x += container.x;
    bounds2.y += container.y;
    
    return (
        bounds1.x + bounds1.width < bounds2.x + bounds2.width
        && bounds1.x + bounds1.width > bounds2.x
        && bounds1.y + bounds1.height < bounds2.y + bounds2.height
        && bounds1.y + bounds1.height > bounds2.y
    );
}

function cellDistanceInContainer(bounds, object, container)
{
    const bounds1 = bounds;
    const bounds2 = {
        x: object.getBounds().x,
        y: object.getBounds().y,
        width: object.getBounds().width,
        height: object.getBounds().height,
    };
    bounds2.x += container.x;
    bounds2.y += container.y;

    return Math.sqrt(((bounds2.x + bounds2.width / 2) - (bounds1.x + bounds1.width / 2)) ** 2 + ((bounds2.y + bounds2.height / 2) - (bounds1.y + bounds1.height / 2)) ** 2);
}

function cellIntersectsInContainer(bounds, object, container)
{
    const bounds1 = bounds;
    const bounds2 = {
        x: object.getBounds().x,
        y: object.getBounds().y,
        width: object.getBounds().width,
        height: object.getBounds().height,
    };
    bounds2.x += container.x;
    bounds2.y += container.y;
    
    return (
        bounds1.x + bounds1.width < bounds2.x + bounds2.width
        && bounds1.x + bounds1.width > bounds2.x
        && bounds1.y + bounds1.height < bounds2.y + bounds2.height
        && bounds1.y + bounds1.height > bounds2.y
    );
}

function getRandomElementFormList(list)
{
    const randomIndex = Math.floor(Math.random() * list.length);
    return list[randomIndex]
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

function contains(arr, elem) {
    return arr.indexOf(elem) != -1;
 }

export {intersects, distance, cartesianToIsometric, mouseDistance, mouseIntersects, mouseDistanceInContainer, mouseIntersectsInContainer, getRandomElementFormList, contains};
