let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector("#reset-button");
let newGBtn=document.querySelector("#newGame-button");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");

let turnO=true;
let count=0;  //for draw cases

let winPatterns=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

const resetGame = () => {
    for(let box of boxes) {
        turnO=true;
        count=0;
        box.disabled=false;
        msgContainer.classList.add("hide");
        box.classList.remove("xturn_color");
        box.classList.remove("oturn_color");
        box.classList.add("box");
        box.innerText="";
    }
}

const drawFunction=() => {
    msg.innerText="Match tie";
    msgContainer.classList.remove("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click", ()=> {
        if(turnO) {
            box.innerText="O";
            box.classList.remove("xturn_color");
            box.classList.remove("box");
            box.classList.add("oturn_color");
            turnO=false;
            count++;
        }
        else {
            box.innerText="X";
            box.classList.add("xturn_color");
            box.classList.remove("oturn_color");
            box.classList.remove("box");
            turnO=true;
            count++;
        }
        box.disabled=true;
        
        checkWinnner();  
    })   
});

const showWinner=(winner) => {
    msg.innerHTML=`<p>Congratulations!! Winner <i class="fa-solid fa-trophy"></i>: ${winner}</p>`;
    msgContainer.classList.remove("hide");
}

let checkWinnner=()=>{
    let draw=true;
    for(let pattern of winPatterns) {
        let pos1=boxes[pattern[0]].innerText;
        let pos2=boxes[pattern[1]].innerText;
        let pos3=boxes[pattern[2]].innerText;

        if(pos1!="" && pos2!="" && pos3!="") {
            if(pos1==pos2 && pos2==pos3) {
                // console.log("Winner:", pos1);
                boxes.forEach((box) => {
                    box.disabled=true;
                } )
                draw=false;
                showWinner(pos1);
            }
        }
    }
    if(draw) {
        if(count==9) {
            console.log("Tie")
            drawFunction();
        }
    }
}

resetBtn.addEventListener("click", resetGame);
newGBtn.addEventListener("click", resetGame);