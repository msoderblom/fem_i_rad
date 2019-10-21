// globala variabler


const playSymbol1 = 'x'
const playSymbol2 = 'o'
const body = document.querySelector('body')
const gameSection = document.querySelector('#game_section')
const weclomeScreen = document.querySelector('#welcome_screen')
const endSection = document.querySelector('#end_section')
const gameBoard = document.querySelector('#game_board')
const moveTurn = body.querySelector('#move_turn > span')
const moveCounterParagraph = body.querySelector('#move_counter > span')
const squares = []

let player1 = playSymbol1
let player2 = playSymbol2
let nowPlaying = player1
let moveCounter = 0
let boardSize = 25


// Funktioner

function squareClick(event) {
    const clickedSquare = event.currentTarget
    clickedSquare.disabled = true
    clickedSquare.textContent = nowPlaying
  
    moveCounter++
    moveCounterParagraph.textContent = moveCounter

    if (hasWonCheck(clickedSquare)) {
        endScreen()
    }
    moveTurn.textContent = playTurn(nowPlaying)

}

function playTurn(myPlaying) {
    if (myPlaying === player1) {
        nowPlaying = player2
        return nowPlaying
    }
    else {
        nowPlaying = player1
        return nowPlaying
    }
}
function hasWonCheck(myClickedSquare) {
    const horisontal = hasWonHorizontal(myClickedSquare)
    const vertical = hasWonVertical(myClickedSquare)
    const diagonalDown = hasWonDiagonalDown(myClickedSquare)        
    const diagonalUp = hasWonDiagonalUp(myClickedSquare)

    

    if (horisontal || vertical || diagonalDown || diagonalUp) {
        return true 
    }
    else {
        return false
    }
}

function hasWonHorizontal(mySquare) {
    const col = parseInt(mySquare.dataset.col)
    const row = parseInt(mySquare.dataset.row)
    let counter = 0

    for (let x = col-4; x < col+4; x++) {    
        if (typeof squares[x] !== 'undefined') {
            if (squares[row][x].textContent === mySquare.textContent) {
                counter++
                
                if (counter === 5) {
                    break
                }
            }
            else {
                counter = 0
            }
        }
        } 
        

    if (counter === 5) {
        return true
    }
    else {
        return false
    }
}
function hasWonVertical(mySquare) {
    const col = parseInt(mySquare.dataset.col)
    const row = parseInt(mySquare.dataset.row)
    let counter = 0

    for (let y = row-4; y < row+4; y++) {    
        if (typeof squares[y] !== 'undefined') {
            if (squares[y][col].textContent === mySquare.textContent) {
                counter++
                
                if (counter === 5) {
                    break
                }
            }
            else {
                counter = 0
            }
        }
        } 
    if (counter === 5) {
        return true
    }
    else {
        return false
    }
}
function hasWonDiagonalDown(mySquare) {
    const col = parseInt(mySquare.dataset.col)
    const row = parseInt(mySquare.dataset.row)
    let counter = 0
    for (let i = -4; i<= 4; i++) {

        if (typeof squares[row+i] !== 'undefined' && typeof squares[row+i][col+i] !== 'undefined') {
            if (squares[row+i][col+i].textContent === mySquare.textContent) {    
                counter++

                if (counter === 5) {
                    break
                }
            }
            else {
                counter = 0
            }
        }
    }
    
    const myReturn = (counter === 5) ? true : false
    return myReturn
}
function hasWonDiagonalUp(mySquare) {
    const col = parseInt(mySquare.dataset.col)
    const row = parseInt(mySquare.dataset.row)
    let counter = 0

  
    
    for (let i = -4; i<= 4; i++) {
        
        if (typeof squares[row-i] !== 'undefined' && typeof squares[row-i][col+i] !== 'undefined') {
            if (squares[row-i][col+i].textContent === mySquare.textContent) {    
                counter++
    
                if (counter === 5) {
                    break
                }
            }
            else {
                counter = 0
            }
        }
    }
    const myReturn = (counter === 5) ? true : false
    return myReturn
}



// states


function initWelcome() {
    const startBtn = document.querySelector('#start_game')
    const playerXRadioBtn = document.querySelector('input[value="x"]')
    const playerORadioBtn = document.querySelector('input[value="o"]')
    

    startBtn.addEventListener('click', function(event) {

        if (playerXRadioBtn.checked || playerORadioBtn.checked) {
            boardSize = document.querySelector('option:checked').value            

            if (playerXRadioBtn.checked) {
                player1 = playSymbol1
                player2 = playSymbol2
            }
            else {
                player1 = playSymbol2
                player2 = playSymbol1
            }
            initGame()

        }
        else {
            alert('Välj om ❌ eller ⭕️ ska börja')
        }

        
          
    })
    
    
}


function initGame() {
    nowPlaying = player1    
    moveTurn.textContent = nowPlaying
    moveCounterParagraph.textContent = moveCounter


    // Skapar alla knappar och lägger in dem i gameBoard
    for (let i = 0; i < boardSize; i++) {  
        squares[i] = []  
        const row = document.createElement('div')
        row.classList.add('row')
        
        for (let j = 0; j < boardSize; j++) {
            squares[i][j] = document.createElement('button')
            const square = squares[i][j]
            square.dataset.row = i
            square.dataset.col = j
            square.classList.add('square')
            square.addEventListener('click', squareClick)
            square.textContent = 'e'
            row.appendChild(square)
        }
        gameBoard.appendChild(row)
    }
    gameSection.prepend(gameBoard)


    weclomeScreen.classList.add('hide')
    gameSection.classList.remove('hide')
}

function endScreen() {
    const winner = body.querySelector('#winner')
    winner.textContent = nowPlaying 
    endSection.classList.remove('hide')
    const resetBtn = endSection.querySelector('#reset')
    resetBtn.addEventListener('click', function (event) {
        window.location.reload()
    })
}


initWelcome()





