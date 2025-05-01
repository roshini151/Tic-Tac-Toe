let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn=document.querySelector("#new-btn");
let msgContainer =document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnIndicator =document.querySelector("#turn-indicator");

let scoreO=0;
let scoreX=0;
const scoreOElem =document.querySelector("#scoreO");
const scoreXElem =document.querySelector("#scoreX");

let turnO = true; 
let moveCount=0; //to track number of moves

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () =>{
    turnO = true;
    moveCount=0;  //reset move count
    enableBoxes();
    turnIndicator.innerText="Turn: Player O";
    msgContainer.classList.add("hide"); //hide 
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO) {
            //playerO
            box.innerText ="O";
            turnIndicator.innerText="Turn: Player X";
            turnO = false;
        } else {
            //playerX
            box.innerText ="X";
            turnIndicator.innerText="Turn: Player O";
            turnO = true;
        }
        box.disabled = true;
        moveCount++;
        checkWinner();
    });
});

const disableBoxes = () => {
    boxes.forEach((box) =>{
        box.disabled=true;
    });
};

const enableBoxes = () => {
    boxes.forEach((box) =>{
        box.disabled=false;
        box.innerText="";
        box.classList.remove("win-box");
   });
};


const showWinner = (winner) =>{
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");

    if(winner === "O"){
        scoreO++;
        scoreOElem.innerText=scoreO;
    }
    else{
        scoreX++;
        scoreXElem.innerText=scoreX;
    }
    disableBoxes();
};

const checkWinner = () => {
    for(let pattern of winPatterns) {
        let pos1Val =  boxes[pattern[0]].innerText;
        let pos2Val =  boxes[pattern[1]].innerText;
        let pos3Val =  boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val !="" && pos3Val !=""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){

                boxes[pattern[0]].classList.add("win-box");
                boxes[pattern[1]].classList.add("win-box");
                boxes[pattern[2]].classList.add("win-box");
                
                showWinner(pos1Val); //pass winner ("O" or "x")
                return; //stop if someone wins
            }
        }
    }
    // check for draw
    if(moveCount === 9){
        msg.innerText="It is a Draw!";
        msgContainer.classList.remove("hide");
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);