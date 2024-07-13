
export class QuadTree {
    constructor(boundary, capacity) {
        this.boundary = boundary;
        this.capacity = capacity;
        this.objects = [];
        this.divided = false;
    }

    subdivide() {
        const x = this.boundary.x;
        const y = this.boundary.y;
        const w = this.boundary.width / 2;
        const h = this.boundary.height / 2;

        this.nw = new QuadTree(new Rect(x, y, w, h), this.capacity);
        this.ne = new QuadTree(new Rect(x + w, y, w, h), this.capacity);
        this.sw = new QuadTree(new Rect(x, y + h, w, h), this.capacity);
        this.se = new QuadTree(new Rect(x + w, y + h, w, h), this.capacity);

        this.divided = true;
    }

    insert(object) {
        if (!this.boundary.contains(object)) return;

        if (this.objects.length < this.capacity) {
        this.objects.push(object);
        } else {
        if (!this.divided) this.subdivide();

        this.nw.insert(object);
        this.ne.insert(object);
        this.sw.insert(object);
        this.se.insert(object);
        }
    }

    query(range) {
        const found = [];

        if (!this.boundary.intersects(range)) return found;

        for (const object of this.objects) {
        if (range.intersects(object)) found.push(object);
        }

        if (this.divided) {
        found.push(...this.nw.query(range));
        found.push(...this.ne.query(range));
        found.push(...this.sw.query(range));
        found.push(...this.se.query(range));
        }

        return found;
    }
}

export class Rect {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    contains(point) {
        return (
        this.x <= point.x &&
        point.x < this.x + this.width &&
        this.y <= point.y &&
        point.y < this.y + this.height
        );
    }

    intersects(range) {
        return !(
        this.x + this.width < range.x ||
        range.x + range.width < this.x ||
        this.y + this.height < range.y ||
        range.y + range.height < this.y
        );
    }
}