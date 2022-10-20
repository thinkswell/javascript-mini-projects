
let cells = [];
let newCells = []
const width = 900;
const height = 900;
const size = 10;
let del = false;
let play = false;

function setup() {
    createCanvas(width, height);
    background(51);

    const row = floor(width / size);
    const col = floor(height / size);

    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            let c = new Cell(j, i, size)
            if (Math.random() < 0.1)
                c.isAlive = true;
            cells.push(c);
            newCells.push(c);
        }
    }
    frameRate(30);
    //     const del = createButton('delete');
    //     del.mousePressed(() => { if (del) { del = false } else { del = true } });
}

function draw() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].draw();
    }

    if (play) {
        //console.log(play);
        for (let i = 0; i < cells.length; i++) {
            cells[i].aliveTime += 2;
            no = noOfNeig(cells[i].x, cells[i].y);
            console.log(no);
            if (no > 3 && cells[i].isAlive) {
                newCells[i].isAlive = false;
                cells[i].aliveTime = 0;
            } else if (no < 2 && cells[i].isAlive) {
                newCells[i].isAlive = false;
                cells[i].aliveTime = 0;
            } else if (no == 3 && (!cells[i].isAlive)) {
                newCells[i].isAlive = true;
            }
        }
        console.log(cells, newCells)

        for (let i = 0; i < cells.length; i++) {
            if (newCells[i].isAlive) {
                cells[i].isAlive = true;
            } else {
                cells[i].isAlive = false;
            }
        }
        // cells = newCells
    }
    // play = false;
}

function mouseClicked() {
    if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) return

    let x = floor(constrain(mouseX, 0, width) / size);
    let y = floor(constrain(mouseY, 0, height) / size);
    if (del) {
        cells[x + (y * (width / size))].isAlive = false;
        newCells[x + (y * (width / size))].isAlive = false;
    } else {
        cells[x + (y * (width / size))].isAlive = true;
        newCells[x + (y * (width / size))].isAlive = true;
    }
}

function handleDelete() {
    if (del) { del = false } else { del = true }
}

function handlePlay() {
    if (play) { play = false } else { play = true }
}

function noOfNeig(x, y) {
    let no = 0;
    let coor = x + (y * (width / size));
    if (cells[coor - 1] && cells[coor - 1].isAlive) {
        no = no + 1;
    }
    if (cells[coor + 1] && cells[coor + 1].isAlive) {
        no = no + 1;
    }
    if (cells[coor - (width / size)] && cells[coor - (width / size)].isAlive) {
        no = no + 1;
    }
    if (cells[coor - ((width / size) - 1)] && cells[coor - ((width / size) - 1)].isAlive) {
        no = no + 1;
    }
    if (cells[coor - ((width / size) + 1)] && cells[coor - ((width / size) + 1)].isAlive) {
        no = no + 1;
    }
    if (cells[coor + ((width / size) - 1)] && cells[coor + ((width / size) - 1)].isAlive) {
        no = no + 1;
    }
    if (cells[coor + (width / size)] && cells[coor + (width / size)].isAlive) {
        no = no + 1;
    }
    if (cells[coor + ((width / size) + 1)] && cells[coor + ((width / size) + 1)].isAlive) {
        no = no + 1;
    }
    return no;
}

