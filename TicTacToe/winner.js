function checkWinner(state) {
    // state is an array of 0 and 1 and null
    // representing the game state
    const win = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < win.length; i++) {
        const [a, b, c] = win[i];
        if (state[a] == state[b] && state[a] == state[c] && state[b] == state[c])
            return state[a];
    }

    return null;
}
