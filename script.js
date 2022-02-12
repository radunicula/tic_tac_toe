const game = document.getElementById("game");
const btn_reset = document.getElementById("reset");
let player = "X", mouves = 0;
let table = [[null, null, null],
             [null, null, null],
             [null, null, null]]
table_generate();
btn_reset.addEventListener('click', reset_game);

game.addEventListener('click', (e) => {
    const tg = e.target;
    let line = parseInt(tg.getAttribute('line'));
    let col = parseInt(tg.getAttribute('col'));
    if (table[line][col])
        return;
    table[line][col] = player;
    tg.innerHTML = player;
    ++mouves;
    if (game_over(line, col, player)) {
        alert(`Congrats ${player}! You won`);
        btn_reset.disabled = false;
    } else if (mouves == 9) {
        alert('The game is draw!');
        btn_reset.disabled = false;
    } else {
        change_player();
    }
});

function table_generate() {
    let line, col;
    for (let i = 0; i < 9; ++i) {
        let e = document.createElement("div");
        line = Math.round((i + 2) / 3) - 1;
        col = Math.round(i % 3);
        e.setAttribute('line', line);
        e.setAttribute('col', col);
        game.appendChild(e);
    }
}

function change_player() {
    if (player == "X")
        player = "0";
    else
        player = "X";
    document.getElementById("player").textContent = player;
}

function reset_game() {
    for (let i = 0; i < 3; ++i) {
        for (let j = 0; j < 3; ++j) {
            table[i][j] = null;
        }
    }
    Array.from(document.querySelectorAll('div[line]')).forEach(e => {
        e.textContent = null;
    });
    document.getElementById("player").textContent = player;
    mouves = 0;
}

function game_over(line, col, player) {
    let count = 0;
    for (let i = 0; i < 3; ++i) {          // check line
        if (table[line][i] == player)
            ++count;
    }
    if (count == 3) return true;
    count = 0;
    for (let i = 0; i < 3; ++i) {          // check column
        if (table[i][col] == player)
            ++count;
    }
    if (count == 3) return true;
    count = 0;
    if (line == col) {
        for (let i = 0; i < 3; ++i) {     // check the main diagonal 
            if (table[i][i] == player)
                ++count;
        }
    } else if (line + col == 2) {              // check the second diagonal
        for (let i = 0; i < 3; ++i) {
            if (table[i][3 - i - 1] == player)
                ++count;
        }
    }
    if (count == 3) return true;
    return false;
}