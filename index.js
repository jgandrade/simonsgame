let gameMechanics = {
    gamestart: false,
    level: 0,
    totalLevel: 10,
    levelArr: [],
    playerTurns: 0,
    counter: 0,
    clearedArr: ["Wellplayed!", "Keep it up!", "Good job!", "Amazing!", "Your memory is fantastic!"],
    levelKeys: ["green", "red", "yellow", "blue"],
    levelUp() {
        return this.level++;
    }
}

//INITIALIZE BUTTON CLICK EVENTS
function eventListener() {
    let buttons = document.querySelectorAll(".btn");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', e => {
            var audio = new Audio(`sounds/${buttons[i].id}.mp3`);
            audio.play();
            buttons[i].classList.add("pressed");
            setTimeout(() => buttons[i].classList.remove("pressed"), 150);

            //FUNCTIONALITY OF BUTTON
            gameMechanics.playerTurns--;
            return checkTurn(gameMechanics.levelArr[gameMechanics.counter], buttons[i].id, gameMechanics.playerTurns); //CHECK IF CORRECT
        });
    }
}
eventListener(); //START CLICK LISTENER

//INITIALIZE GAME START IF A IS PRESSED AND WILL ONLY RUN ONCE
document.addEventListener('keypress', e => levelStart(e.key), { once: true });
let levelLabel = document.getElementById("level-title");
let levelComment = document.getElementById("comment");
let levelStart = (eventKey) => {
    if (eventKey === 'A' || eventKey === 'a') {
        gameMechanics.gamestart = true;
        return play();
    } else return;
}

function play() {
    gameMechanics.levelArr.push(gameMechanics.levelKeys[Math.floor(Math.random() * 4)]);
    gameMechanics.playerTurns = gameMechanics.levelArr.length;
    gameMechanics.counter = 0;
    gameMechanics.levelUp();
    levelLabel.textContent = `Level ${gameMechanics.level} (Computer's Turn)`;
    return computerTurn(gameMechanics.levelArr.length, 0);
}

function computerTurn(roundLength, index) {
    if (roundLength == 0) {
        return levelLabel.textContent = `Level ${gameMechanics.level} (Your Turn)`;
    }
    let interval;
    let audio;
    interval = setInterval(() => {
        audio = new Audio(`sounds/${gameMechanics.levelArr[index]}.mp3`);
        audio.play();
        document.querySelector(`.${gameMechanics.levelArr[index]}`).classList.add("pressed");
        setTimeout(() => document.querySelector(`.${gameMechanics.levelArr[index]}`).classList.remove("pressed"), 200);
    }, 900);
    setInterval(() => {
        clearInterval(interval);
        roundLength--;
    }, 1200);
    setTimeout(() => {
        index++;
        computerTurn(roundLength, index);
    }, 1200);
}

function checkTurn(levelIndex, playerAnswer, playerTurn) {
    gameMechanics.counter++;
    if (levelIndex !== playerAnswer && playerTurn >= 0) {
        return restart();
    }
    if (playerTurn === 0) {
        if (gameMechanics.totalLevel === gameMechanics.level) {
            return levelLabel.textContent = `CONGRATULATIONS YOU WON!`;
        } else {
            levelComment.innerText = `${gameMechanics.clearedArr[Math.floor(Math.random()*gameMechanics.clearedArr.length)]}`;
            setTimeout(()=>levelComment.innerText ="",1000);
            return play();
        }
    }
}

function restart() {
    gameMechanics.gamestart = false;
    gameMechanics.level = 0;
    gameMechanics.levelArr = [];
    gameMechanics.playerTurns = 0;
    gameMechanics.counter = 0;
    document.addEventListener('keypress', e => levelStart(e.key), { once: true });
    let audio = new Audio("sounds/wrong.mp3");
    audio.play();
    return levelLabel.textContent = `GAME OVER PRESS 'A' KEY TO START AGAIN!`;
}

















