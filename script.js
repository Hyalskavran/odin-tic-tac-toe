const createGameBoard = () => {
    const gameBoard = document.querySelector('.gameboard')

    for (let x = 1 ; x < 4 ; x++) {
        for (let y = 1 ; y < 4 ; y++) {
            let gameCell = document.createElement('div')
            gameCell.setAttribute('data-xy', `${x}${y}`)
            gameCell.classList.add('cell')

            if (x === 2) {
                gameCell.classList.add('middle-row')
            }

            if (y === 2) {
                gameCell.classList.add('middle-col')
            }

            gameBoard.appendChild(gameCell)
        }
    }
}

createGameBoard()
