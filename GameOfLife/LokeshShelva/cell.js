class Cell {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.isAlive = false;
        this.aliveTime = 0;
    }

    draw() {
        let newx = this.x * this.size;
        let newy = this.y * this.size;
        if (!this.isAlive) {
            fill(0);
            rect(newx, newy, this.size, this.size);
        } else {
            fill(255, 156, 156);
            rect(newx, newy, this.size, this.size);
        }
    }
}
