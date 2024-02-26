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

const Game = (function() {
    const winnerDiv = document.querySelector('.winner')
    const gameOver = document.querySelector('.game-over')
    const newGameDiv = document.querySelector('.new-game')

    function play(cell, currentPlayer) {
        if (cell.getAttribute('data-mark') === '') {
            GameBoard.drawMark(cell, currentPlayer)
            Players.changePlayer()
            GameBoard.checkBoard()

            
            if (GameBoard.winner === 'Player 1' || GameBoard.winner === 'Player 2') {
                winnerDiv.textContent = `${GameBoard.winner} Won!`
                gameOver.classList.toggle('game-over-won')
                newGameDiv.classList.toggle('z-index')
            } else if (GameBoard.winner === 'Tie') {
                winnerDiv.textContent = `It's a ${GameBoard.winner}!`
                gameOver.classList.toggle('game-over-won')
                newGameDiv.classList.toggle('z-index')
            }
        }
    }

    return {
        play,
        gameOver,
        newGameDiv
    }
})();

const GameBoard = (function() {
    const gameBoardDiv = document.querySelector('.gameboard')

    const winningCombinations = [
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
                    Game.play(this, Players.currentPlayer)
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
            if (currentPlayer.playerName === 'Player 1') {
                cell.classList.toggle('p1')
            } else {
                cell.classList.toggle('p2')
            }
            cell.setAttribute('data-mark', currentPlayer.playerMark)
        }
    }

    let winner = undefined

    const cells = gameBoardDiv.querySelectorAll('.cell')

    function checkBoard() {
        const availableCells = Array.from(cells).filter(cell => cell.getAttribute('data-mark') === '').length

        winningCombinations.map(combination => {
            winningX = 0
            winningO = 0

            combination.map(xy => {
                cells.forEach(cell => {
                    if (cell.getAttribute('data-mark') !== '' && cell.getAttribute('data-xy') === xy.toString()) {
                        if (cell.getAttribute('data-mark') === 'x') {
                            winningX ++
                        } else {
                            winningO ++
                        }
                    }
                })
            })

            if (winningX === 3) {
                this.winner = 'Player 1'
            }
            
            if (winningO === 3) {
                this.winner = 'Player 2'
            }

            if (availableCells === 0) {
                this.winner = 'Tie'
            }

            if (winningX === 3 || winningO === 3 || availableCells === 0) {
                cells.forEach(cell => cell.disabled = true)
            }
        })
    }

    function reset() {
        const resetBtn = document.querySelector('.new-game-btn')
        
        resetBtn.addEventListener('click', function() {
            Array.from(cells).map(cell => {
                cell.setAttribute('data-mark', '')
                cell.disabled = false
                if (cell.classList.contains('p1')) {
                    cell.classList.remove('p1')
                } else if (cell.classList.contains('p2')) {
                    cell.classList.remove('p2')
                }
            })

            GameBoard.winner = undefined
            if (Players.currentPlayer.playerName === 'Player 2') {
                Players.changePlayer()
                Players.updateCurrentPlayerDiv()
            }

            if (Game.gameOver.classList.contains('game-over-won')) {
                Game.gameOver.classList.toggle('game-over-won')
                Game.newGameDiv.classList.toggle('z-index')
            }
        })
    }

    reset()

    return {
        winningCombinations,
        drawMark,
        checkBoard,
        winner
    }
})();