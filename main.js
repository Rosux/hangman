const output = document.querySelector(".output"); // output element
const message = document.querySelector(".message"); // message element
const tries = document.querySelector(".tries"); // tries left element
const input = document.querySelector("input"); // for getting the input (can be done with just window.addEventListener("keydown") but that would not be accesible to mobile)
const alphabet = /^[a-zA-z]$/; // alphabet regex test to skip over spaces/enters/etc
let solution, wrongLetters, correctLeters;
let won = false;
let lost = false;
reset(); // initiate game

// keyboard eventlistener input
input.addEventListener("input", (e)=>{
    input.value = input.value.toLowerCase();
    if(lost || won){
        reset();
        input.value = "";
        return;
    }
    if(!alphabet.test(input.value)){
        input.value = "";
        return;
    }
    if(solution.includes(input.value)){
        correctLeters.push(input.value);
    }else if(!wrongLetters.includes(input.value)){
        wrongLetters.push(input.value);
    }
    input.value = "";
    updateText();
});

/**
 * updates the DOM
 */
function updateText(){
    tries.innerHTML = `Allowed wrong attempts left: ${10-wrongLetters.length}`;
    message.innerHTML="";
    if(wrongLetters.length >= 10){
        message.innerHTML = `You Lose!<br>Correct solution: ${solution}<br>Press any key to restart.`;
        lost = true;
        return;
    }
    let out = [];
    for(let i=0;i<solution.length;i++){
        correctLeters.includes(solution[i]) ? out.push(solution[i]) : out.push("_");
    }
    output.innerText = out.join(" ");
    if(out.join("") == solution){
        won = true;
        message.innerHTML = `YOU WON!<br>Wrong tries: ${wrongLetters.length}<br>Press any key to restart.`;
    }
}

/**
 * generate new game by reseting all things
 */
function reset(){
    won = false;
    lost = false;
    solution = words[Math.floor(Math.random()*words.length)].toLowerCase(); // get random word
    wrongLetters = []; // list of used but wrong letters
    correctLeters = []; // list of used and correct letters
    updateText();
}