const nrow = 15, ncol = 15;
export default function calculateWinner(squares, index) {
    /**
     * The board is 15 * 15. try to calculate horizontal, vertial, uphild & downhill
     */
    const x = index % ncol, y = Math.floor(index / nrow), player = squares[index]; 
    const expand = (x, y, dx, dy) => {
        const i = y * nrow + x;
        // Hit boundary, or 
        if (!x || x === ncol || !y || y === nrow || squares[i] !== player) return 0;
        return 1 + expand(x + dx, y + dy, dx, dy);
    }
    // console.log(x, y, player);
    // Horizontal

    if (expand(x, y, 1, 0) + expand(x, y, -1, 0) > 5) return player;
    // Vertical
    if (expand(x, y, 0, 1) + expand(x, y, 0, -1) > 5) return player;
    // Uphill
    if (expand(x, y, 1, 1) + expand(x, y, -1, -1) > 5) return player;
    // Downhill
    if (expand(x, y, -1, 1) + expand(x, y, 1, -1) > 5) return player;
    return null;
}

