// ?Array of boxes
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let ding = new Audio("./sounds/ting.mp3");


let count = 0;
// Player O
let turnO = true;

// 2D Array
let winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
];

// *Add event listener to all the boxes
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        }
        else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        const winner = checkWin();
        count++;
        console.log(count)

        if (winner) {
            document.querySelector("#gif").innerHTML = `<img src="img/excited.gif">`
        }
        if (count === 9 && !winner) {

            drawGame();
            document.querySelector("#gif").innerHTML = `<img src="img/draw.gif">`
        }
        ding.play();
        ding.playbackRate = 2.5;
    });
})

// ?Display the winner
const showWinner = (winner) => {
    disableBox();
    result();
    setTimeout(() => {
        document.querySelector(".msg-container").classList.remove("hide");
        msg.innerText = `Winner is ${winner}`;
    }, 100);


}


// TODO: Display the result
const result = () => {
    setTimeout(() => {
        document.querySelector(".msg-container").style.top = "20" + "%"
    }, 500);
    document.querySelector(".game").style.top = "210" + "%"
    document.querySelector("#reset-btn").classList.add("hide");
}

// ?Display the draw
const drawGame = () => {
    setInterval(() => {
        document.querySelector(".msg-container").style.top = "20" + "%"
    }, 500);
    setTimeout(() => {
        msgContainer.classList.remove("hide");
        msg.innerText = "Game Was a Draw";
    }, 100);
    disableBox();
    result();
}



// ?Enable the Boxes
const enableBox = () => {
    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
        count = 0;
    })
}


// ?Disable the Boxes
const disableBox = () => {
    boxes.forEach((box) => {
        box.disabled = true;
        count = 0;
    })
}

// *Check who won
const checkWin = () => {
    for (const patterns of winPatterns) {
        let pos1 = boxes[patterns[0]].innerText
        let pos2 = boxes[patterns[1]].innerText
        let pos3 = boxes[patterns[2]].innerText

        if (pos1 != "" && pos2 != "" && pos3 != "") {
            if (pos1 === pos2 && pos2 === pos3) {
                showWinner(pos1)
                return true
            }
        }
    }
}



// *Add event listener to reset button
const resetButton = () => {
    msgContainer.classList.add("hide");
    turnO = true;
    enableBox();
    document.querySelector(".game").style.top = "0" + "%"
    document.querySelector(".msg-container").style.top = "0" + "%"
    document.querySelector("#reset-btn").classList.remove("hide");
}

resetBtn.addEventListener("click", resetButton);
newGameBtn.addEventListener("click", resetButton);



