var origBoard;
// human
const huPlayer = 'O';
// Ai
const aiPlayer = 'X';
// Tổ hợp thắng 
const winCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [6, 4, 2]
    ]
    // biến cell sẽ lưu trữ một tham chiếu đến các phần tử class='cell' ở thẻ td
const cells = document.querySelectorAll('.cell');
startGame();
// Hàm startGame sẽ chạy đầu khi vào game và khi nhấn vào nút replay
function startGame() {
    document.querySelector(".endgame").style.display = "none"; //đặt lại class endgame là "none"
    origBoard = Array.from(Array(9).keys()); // Tạo Mảng gồm 9 phần tử, từ 0-8.
    for (var i = 0; i < cells.length; i++) {
        cells[i].innerText = ''; // Gán '' cho từng phần tử trong mảng origBoard để bỏ bất kỳ kí hiệu "X" hoặc "O" nào.
        cells[i].style.removeProperty('background-color'); // Xóa mọi màu trò chơi trước đó khỏi các ô.
        cells[i].addEventListener('click', turnClick, false); // Chạy hàm 'turnClick' khi ô được nhấp.
    }
}


function turnClick(square) {
    if (typeof origBoard[square.target.id] == 'number') {
        // Kiểm tra xem ô  đã được chơi chưa.
        // Kiểm tra id ô: nếu nó có số id thì ô chưa được đánh; nếu '0' hoặc 'X', ô đã được chơi.
        turn(square.target.id, huPlayer) // Gọi hàm 'turn' và chuyển 'id'.
            // người chơi thực hiện một lượt bằng cách nhấp vào một ô và gọi hàm 'turn'.
        if (!checkWin(origBoard, huPlayer) && !checkTie()) turn(bestSpot(), aiPlayer);
    }
}

function turn(squareId, player) {
    // Hàm Turn được gọi bởi cả huPayer và aiPlayer.
    origBoard[squareId] = player; // Ghi lại hình vuông mà người chơi nhấp vào.
    document.getElementById(squareId).innerText = player; // Cập nhật lại vị trí ô người chơi vừa chọn bằng kí hiệu trên origBoard mới.
    // Logic để xác định người chiến thắng và kết hợp chiến thắng.
    let gameWon = checkWin(origBoard, player)
    if (gameWon) gameOver(gameWon)
}

function checkWin(board, player) {
    // Tìm tất cả các vị trí trong bảng đã dc người chơi chơi
    let plays = board.reduce((a, e, i) => (e === player) ? a.concat(i) : a, []);
    let gameWon = null;
    for (let [index, win] of winCombos.entries()) { //winCombos.entries lấy các id và điều kiện chiến thắng từ cái mảng winCombos sử dụng nó trong vogn lặp
        if (win.every(elem => plays.indexOf(elem) > -1)) {
            gameWon = { index: index, player: player }; // Nếu không có ai thắng, gameWon = null; nếu có thắng, gameWon sẽ chứa chỉ số winCombo người nào chơi và người nào thắng.
            break;
        }
    }
    return gameWon;
}

function gameOver(gameWon) {
    // Chuyển qua các id của tổ hợp chiến thắng.
    for (let index of winCombos[gameWon.index]) {
        document.getElementById(index).style.backgroundColor =
            gameWon.player == huPlayer ? "blue" : "red"; // Đặt màu nền cho huPlayer thắng hoặc thua.
        // tô màu ô kết hợp chiến thắng là xanh, thua là đỏ
    }

    for (var i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('click', turnClick, false);
        // Ngăn người chơi nhấp vào các ô. Vì trò chơi đã kết thúc.
    }
    declareWinner(gameWon.player == huPlayer ? "You win!" : "You lose."); // Sử dụng hàm statementWinner để xác định người chiến thắng.
}

function declareWinner(who) {
    document.querySelector(".endgame").style.display = "block";
    document.querySelector(".endgame .text").innerText = who;
}

function emptySquares() {
    // Lọc mọi phần tử trong mảng origBoard để xem ô đó có phải là số hay không, sau đó trả về chỉ số số đó.
    return origBoard.filter(s => typeof s == 'number');
}

function bestSpot() {
    return minimax(origBoard, aiPlayer).index;
    // Trả về kết quả của việc gọi hàm 'minimax' truyền vào origBoard và dối tượng là aiPlayer.
}

function checkTie() {
    // Nếu độ dài của emptySquares là 0, là tất cả các ô đã được chơi và không có người chiến thắng.
    if (emptySquares().length == 0) {
        for (var i = 0; i < cells.length; i++) {
            cells[i].style.backgroundColor = "green";
            cells[i].removeEventListener('click', turnClick, false);
        }
        declareWinner("Tie Game!")
        return true;
    }
    return false;
}

function minimax(newBoard, player) {
    // các điểm có sẵn
    var availSpots = emptySquares();
    // kiểm tra các trạng thái đầu cuối như thắng, thua và hòa
    // và trả về một giá trị tương ứng
    if (checkWin(newBoard, huPlayer)) {
        return { score: -10 }; // Nếu người chơi thắng, trả về -10.
    } else if (checkWin(newBoard, aiPlayer)) {
        return { score: 10 }; // Nếu máy thắng, trả về 10.
    } else if (availSpots.length === 0) {
        return { score: 0 }; // Nếu availSpots.length()(độ dài mảng) là "0", trò chơi hòa và trả về "0".
    }
    // một mảng để thu thập tất cả các đối tượng
    var moves = [];
    // lặp qua các điểm có sẵn
    for (var i = 0; i < availSpots.length; i++) {
        // tạo một đối tượng cho từng đối tượng và lưu trữ chỉ mục của vị trí đó
        var move = {};
        move.index = newBoard[availSpots[i]];
        // đặt vị trí trống thành người chơi hiện tại
        newBoard[availSpots[i]] = player;

        /*thu thập số điểm thu được từ việc gọi minimax 
        đối thủ của người chơi hiện tại*/
        if (player == aiPlayer) {
            var result = minimax(newBoard, huPlayer);
            move.score = result.score;
        } else {
            var result = minimax(newBoard, aiPlayer);
            move.score = result.score;
        }
        // đặt lại vị trí thành trống
        newBoard[availSpots[i]] = move.index;
        // đẩy đối tượng vào mảng
        moves.push(move);
    }
    //nếu đó là vòng lặp của máy đối với các nước đi và chọn nước đi có điểm cao nhất
    var bestMove; // Đánh giá nước đi tốt nhất trong mảng.
    if (player === aiPlayer) {
        // Minimax chọn nước đi có điểm cao nhất khi aiPlayer đang chơi,
        // Nước đi có điểm thấp nhất khi huPlayer đang chơi.
        var bestScore = -10000;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                // Nếu chỉ số của đối tượng move cao hơn bestScore thì nó sẽ được lưu trong bestScore.
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        //lặp lại các bước di chuyển và chọn nước đi có điểm thấp nhất
        var bestScore = 10000;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                // Nếu chỉ số của đối tượng move thấp hơn bestScore, nó sẽ được lưu trong bestScore
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }
    // trả về bước di chuyển đã chọn (đối tượng) từ mảng di chuyển(move)
    return moves[bestMove];
}