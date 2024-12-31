let box_btn = document.querySelectorAll(".box");
let reset_btn = document.querySelector("#reset_game");
let new_btn = document.querySelector("#new_game");
let msg = document.querySelector(".winner_name");
let scores = document.querySelectorAll(".score");
let turnX = true; //playerX ki turn
let count = 0;
let found = false;

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
]
box_btn.forEach((box) => {
    box.addEventListener("click",() => {
        count++;
        console.log("Clicked");
        if(turnX){
            box.innerText = "X";
            turnX = false;
        }
        else{
            box.innerText = "O";
            turnX = true;
        }
        box.disabled = true;

        found = checkWinner(); 
        checkNoWinner(count,found);
    });
});

const checkNoWinner = (cnt,f) => {
    if((cnt == 9 ) && (!f)){
        msg.innerText = `No winner`;
        msg.classList.remove("hide");
    }
};

const disableAllBox = () => {
    for(box of box_btn){
        box.disabled = true;
    }
};

const displayScore = () =>{
    if(scores[0].innerText > scores[1].innerText){
        msg.innerText = `Winner is player   ${1}`;
    }
    else if(scores[0].innerText < scores[1].innerText){
        msg.innerText = `Winner is player   ${2}`;
    }
    else{
        msg.innerText = `It's a Draw!`;
    }
};
const winnerFound = (val) =>{
    msg.classList.remove("hide");
    disableAllBox();
    if(val == "X")
        scores[0].innerText++;
    
    else
    scores[1].innerText++;
    displayScore();
};

const checkWinner = () => {
    for(let pattern of winPatterns){
        let pos1Val = box_btn[pattern[0]].innerText;
        let pos2Val = box_btn[pattern[1]].innerText;
        let pos3Val = box_btn[pattern[2]].innerText;
        
        if((pos1Val != "") && (pos2Val != "") && (pos3Val != "")){
            if((pos1Val == pos2Val) && (pos2Val == pos3Val)){
                winnerFound(pos1Val);
                return true;
            }
        }
    }
};

const enableAllBox = () => {
    for(box of box_btn){
        box.disabled = false;
        box.innerText = "";
    }
};

const resetGame = () => {
    enableAllBox();
    turnX = true;
    count = 0;
    found = false;
};

reset_btn.addEventListener("click",resetGame);

const loadNewGame = () => {
    enableAllBox();
    turnX = true;
    msg.classList.add("hide");
    count = 0;
    found = false;
    for(s of scores)
            s.innerText = 0;
};

new_btn.addEventListener("click",loadNewGame);