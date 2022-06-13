//needed variables
const cats = ["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg"]
const dogs = ["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg"]
//player choice record
moves =["", "", "", "", "", "", "", "", "",]
let playerTurn = "cat"
let gameOver = false
let turns = 0
const announce = document.getElementById("announce")
const winCondition = [
    [0, 1, 2], 
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
//check for win
function win () {
    let roundWin = false
    for ( let i=0; i<=7; i++){
        const temp = winCondition[i]
        if(moves[temp[0]] === "" || moves[temp[1]] === "" || moves[temp[2]] === ""){
            continue;
        }
        if(moves[temp[0]] === moves[temp[1]] && moves[temp[1]] === moves[temp[2]]){
            return roundWin = true;
        }
    }
}
//cat/dog image selector
function catSelect() {
    const catNum = cats[Math.floor(Math.random()*6)]
    return `cat/${catNum}`
}
function dogSelect() {
    const dogNum = dogs[Math.floor(Math.random()*6)]
    return `dog/${dogNum}`
}
//draw board
const container = document.getElementById("container")
function drawBoard (){
    while(container.firstChild){
        container.removeChild(container.firstChild)
    }
    for(let i=0; i<9; i++){
        const block = document.createElement("div")
        block.classList.add('block')
        block.setAttribute("id", `${i}`)
        block.style.backgroundColor = "white"
        container.appendChild(block)
    }
}
document.addEventListener("DOMContentLoaded", drawBoard)

//event listener for block on-click
document.addEventListener("click",(event)=>{
    if(gameOver === false){
        const currentP = playerTurn
        //check for cat turn
        if(event.target.classList[0] === "block" && playerTurn === "cat" && gameOver=== false){
            event.target.innerHTML = `<img src="${catSelect()}">`
            moves[event.target.id] += "cat"
            turns += 1
            playerTurn = "dog"
            announce.innerText = `${playerTurn} turn`
        }
        //check for dog turn
        else if(event.target.classList[0] === "block" && playerTurn === "dog" && gameOver=== false){
            event.target.innerHTML = `<img src="${dogSelect()}">`
            moves[event.target.id] += "dog"
            turns += 1
            playerTurn = "cat"
            announce.innerText = `${playerTurn} turn`
        }
        //check for tie
        if(turns === 9 && gameOver === false){
            gameOver === true
            announce.innerText = "It's a tie !!!"
        }
        //check for win
        if(win()){
            announce.innerText = `${currentP} win !!!`
            gameOver = true
        }  
    }
})

//reset game
document.getElementById("reset").addEventListener("click", ()=>{
    announce.innerText = "cat start"
    gameOver = false
    turns = 0
    for(let i=0; i<moves.length; i++){
        moves[i] = ""
    }
    playerTurn = "cat"
    drawBoard()
})