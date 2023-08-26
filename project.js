const gameCells=document.querySelectorAll('.cell');
const player1 = document.querySelector('.player1');
const player2 = document.querySelector('.player2');
const restartBtn = document.querySelector('.restartBtn');
const alertBox = document.querySelector('.alertBox');

let currentPlayer = 'X';
let nextPlayer = 'O';
let playerTurn = currentPlayer;

player1.textContent = `Player 1: ${currentPlayer}`;
player2.textContent = `Player 2: ${nextPlayer}`;

const startGame = () => {
    gameCells.forEach(cell =>{
        cell.addEventListener('click',handleClick);
    });
}
const handleClick = (e) => {
    if(e.target.textContent === ''){
        e.target.textContent = playerTurn;
        if(checkWin()){
            //console.log(`${playerTurn} is a winner!`);
            showAlert(`${playerTurn} is a winner!`);

            disableCells();
        }
        else if(checkTie()){
            //console.log(`It's a tie`);
            showAlert(`It's a tie`);
            disableCells();
        }
        else{
            
            changePlayerTurn();
            showAlert(` Turn for player : ${playerTurn} `);
    
        }
        

    }
}

const changePlayerTurn = () =>{
    if(playerTurn === currentPlayer){
        playerTurn = nextPlayer;
    }
    else{
        playerTurn = currentPlayer;
    }
}

const checkWin = () =>{
    const WinningConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],

    ];
    for(let i = 0; i<WinningConditions.length; i++){
        const [pos1,pos2,pos3] = WinningConditions[i];
        if(gameCells[pos1].textContent !== '' &&
        gameCells[pos1].textContent === gameCells[pos2].textContent &&
        gameCells[pos2].textContent === gameCells[pos3].textContent){
            return true;
        } 

    }
    return false;
}

const checkTie = () =>{
    let emptyCellsCount = 0;
    gameCells.forEach(cell =>{
        if(cell.textContent === ''){
            emptyCellsCount++;
        }
    });
    return emptyCellsCount === 0 && !checkWin();
}
const disableCells = () => {
    gameCells.forEach(cell => {
        cell.removeEventListener('click',handleClick);
        cell.classList.add('disabled');
    })
}

const restartGame = () => {
    gameCells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('disabled');
    });
    startGame();
}

const showAlert = (msg) => {
   
    alertBox.textContent = msg;
    alertBox.style.display = "block";
    setTimeout(() => {
        alertBox.style.display = none;
    },3000);
}
restartBtn.addEventListener('click',restartGame);
startGame();
