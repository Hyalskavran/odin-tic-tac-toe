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
    function play(cell, currentPlayer) {
        GameBoard.drawMark(cell, currentPlayer)
        Players.changePlayer()
        GameBoard.checkBoard()

        console.log(GameBoard.winner)
        
        // if (winner === 'Player 1' || winner === 'Player 2') {
        //     const winnerDiv = document.querySelector('.winner')
        //     const gameOver = document.querySelector('.game-over')

        //     winnerDiv.textContent = GameBoard.checkBoard()
        //     gameOver.style.visibility = 'visible'
        // }
    }

    return {
        play
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
            cell.style.backgroundImage = `url(${currentPlayer.playerBg})`
            if (currentPlayer.playerName === 'Player 1') {
                cell.style.backgroundSize = '90%'
            } else {
                cell.style.backgroundSize = '70%'
            }
            cell.style.backgroundRepeat = 'no-repeat'
            cell.style.backgroundPosition = 'center'
            cell.setAttribute('data-mark', currentPlayer.playerMark)
        }
    }

    let winner = undefined

    function checkBoard() {
        const cells = gameBoardDiv.querySelectorAll('.cell')

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
                winner = 'Player 1'
            }
            
            if (winningO === 3) {
                winner = 'Player 2'
            }
        })
    }

    return {
        winningCombinations,
        drawMark,
        checkBoard,
        winner
    }
})();