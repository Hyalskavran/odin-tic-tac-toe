const Players = (function() {
    let players = []

    function _createPlayer(player, color, mark, bg) {
        return {
            playerName: player,
            playerColor: color,
            playerMark: mark,
            playerBg: bg
        }
    }

    function _addPlayers(p1, p2) {
        players.push(p1, p2)
    }

    _addPlayers(
        _createPlayer("Player 1", "Blue", "x", "img/X.svg"),
        _createPlayer("Player 2", "Red", "o", "img/O.svg")
    )

    let currentPlayer = players[0]

    let currentPlayerDiv = document.querySelector('.current')

    function updateCurrentPlayerDiv() {
        currentPlayerDiv.textContent = Players.currentPlayer.playerName
        currentPlayerDiv.style.color = Players.currentPlayer.playerColor
    }

    function changePlayer() {
        Players.currentPlayer = (Players.currentPlayer === players[0]) ?
        players[1] : players[0];
    }

    return {
        currentPlayer,
        changePlayer,
        updateCurrentPlayerDiv
    }
})();

// const Game = (function() {
//     let 
// })();

const GameBoard = (function() {
    const gameBoardDiv = document.querySelector('.gameboard')

    const winningCells = [
        // Rows
        [11, 12, 13],
        [21, 22, 23],
        [31, 32, 33],
        // Cols
        [11, 21, 31],
        [12, 22, 32],
        [13, 23, 33],
        // Diagonals
        [11, 22, 33],
        [13, 22, 31]
    ]

    function _renderBoard() {
        for (let x = 1 ; x < 4 ; x++) {
            for (let y = 1 ; y < 4 ; y++) {
                let gameCell = document.createElement('button')
                gameCell.setAttribute('data-xy', `${x}${y}`)
                gameCell.setAttribute('data-mark', '')
                gameCell.classList.add('cell')
                gameCell.onclick = function() {
                    drawMark(this, Players.currentPlayer)
                    Players.updateCurrentPlayerDiv()
                }
    
                if (x === 2) {
                    gameCell.classList.add('middle-row')
                }
    
                if (y === 2) {
                    gameCell.classList.add('middle-col')
                }
    
                gameBoardDiv.appendChild(gameCell)
            }
        }
    }

    _renderBoard()
    Players.updateCurrentPlayerDiv()


    function drawMark(cell, currentPlayer) {
        if (cell.getAttribute('data-mark') === '') {
            cell.style.backgroundImage = `url(${currentPlayer.playerBg})`
            if (currentPlayer.playerName === 'Player 1') {
                cell.style.backgroundSize = '90%'
            } else {
                cell.style.backgroundSize = '70%'
            }
            cell.style.backgroundRepeat = 'no-repeat'
            cell.style.backgroundPosition = 'center'
            cell.setAttribute('data-mark', currentPlayer.playerMark)
    
            Players.changePlayer()
        }
    }

    return {
        winningCells
    }
})();