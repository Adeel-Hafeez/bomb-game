document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.getElementById("game-board");
    const statusMessage = document.getElementById("status-message");
    const restartButton = document.getElementById("restart-button");
    const scoreCounter = document.getElementById("score-counter");

    const boardSize = 8; // 8x8 grid
    const totalTiles = boardSize * boardSize;
    const bombCount = 10;
    let safeboxesClicked = 0;
    let score = 0;

    const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF", "#33FFF5"];
    const emojis = ["🎉", "🌟", "✨", "🔥", "🍀", "💎"];
    let bombPositions = [];

    // Initialize the game
    function initGame() {
        gameBoard.innerHTML = "";
        statusMessage.textContent = "Game in Progress...";
        scoreCounter.textContent = "Score: 0";
        bombPositions = generateBombPositions();
        safeboxesClicked = 0;
        score = 0;

        for (let i = 0; i < totalTiles; i++) {
            const tile = document.createElement("button");
            tile.classList.add("tile");
            tile.dataset.index = i;
            tile.addEventListener("click", () => handleTileClick(i, tile));
            gameBoard.appendChild(tile);
        }
    }

    // Generate bomb positions
    function generateBombPositions() {
        const positions = new Set();
        while (positions.size < bombCount) {
            const position = Math.floor(Math.random() * totalTiles);
            positions.add(position);
        }
        return positions;
    }

    // Handle tile click
    function handleTileClick(index, tile) {
        if (tile.classList.contains("revealed")) return;

        tile.classList.add("revealed");

        if (bombPositions.has(index)) {
            tile.classList.add("bomb");
            tile.textContent = "💣";
            statusMessage.textContent = "Game Over! You hit a bomb.";
            revealBombs();
        } else {
            safeboxesClicked++;
            score += 10; // Add 10 points for each safe tile
            scoreCounter.textContent = `Score: ${score}`;
            const randomIndex = Math.floor(Math.random() * colors.length);
            tile.style.backgroundColor = colors[randomIndex];
            tile.textContent = emojis[randomIndex];
            if (safeboxesClicked === totalTiles - bombCount) {
                statusMessage.textContent = "Congratulations! You won!";
                revealBombs(true);
            }
        }
    }

    // Reveal all bombs
    function revealBombs(win = false) {
        const tiles = document.querySelectorAll(".tile");
        tiles.forEach((tile, index) => {
            tile.classList.add("revealed");
            if (bombPositions.has(index)) {
                tile.classList.add("bomb");
                tile.textContent = "💣";
            }
        });
        if (!win) {
            tiles.forEach((tile) => tile.setAttribute("disabled", true));
        }
    }

    // Restart game
    restartButton.addEventListener("click", initGame);

    // Start the game on page load
    initGame();
});
