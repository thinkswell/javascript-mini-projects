function GetNextEmptyIndex (arr) {
    for (let y=0; y<arr.length; y++) {
        for (let x=0; x<arr[y].length; x++) {
            if (arr[y][x] == 0) return ([y, x]);
        }
    }
    return false;
}

function IsPlacementCorrect (arr, num, pos) {
    let y = pos[0], x = pos[1];
    let yCheck = y - (y%3);
    let xCheck = x - (x%3);
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (pos != [yCheck+i, xCheck+j]) {
                if (arr[yCheck+i][xCheck+j] == num) return false;
            }
        }
    }
    for (let i = 0; i < 9; i++) {
        if (
            (arr[y][i] == num && x != i)
            ||
            (arr[i][x] == num && y != i)
        ) return false
    }
    return true;
}

function solve (arr) {
    let emptyIndex = GetNextEmptyIndex(arr);
    let x, y;
    if (!emptyIndex) return true;
    else { y = emptyIndex[0], x = emptyIndex[1]; }

    for (let i = 0; i<=9; i++) {
        if (IsPlacementCorrect(arr, i, [y, x])) {
            arr[y][x] = i;

            if (solve(arr)) return true;
            arr[y][x] = 0;
        }
    }
    return false;
}

module.exports = {solve};



/* TEST */

let testBoard = [
    [0, 0, 0, 6, 0, 3, 0, 2, 9],
    [0, 2, 0, 0, 0, 0, 3, 1, 0],
    [0, 3, 8, 0, 2, 9, 0, 0, 0],
    
    [0, 0, 0, 0, 0, 0, 0, 0, 5],
    [0, 0, 0, 4, 1, 5, 9, 8, 2],
    [4, 0, 5, 0, 0, 0, 0, 0, 1],

    [0, 4, 0, 5, 7, 0, 2, 0, 3],
    [0, 5, 0, 0, 0, 6, 0, 0, 0],
    [0, 0, 1, 8, 0, 2, 0, 5, 0],
]

function log_ (arr) { //for better distinction
    arr.forEach((item, ind) => {
        let str = ` ${(ind%3==0 && ind!=0)?'---------------------\n ':''}`;
        item.map((val, i) => {str+=`${val} ${(i%3==2 && i!=8)?'| ':''}`});
        console.log(str);
    });
}
console.log(`Unsolved board below: `);
log_(testBoard);
console.log(`\n`);
solve(testBoard);
console.log(`Solved board below: `);
log_(testBoard);