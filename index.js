const options = {
  aroma: "Pleasing smell",
  pepper: "Salt's partner",
  halt: "Put a stop to",
  jump: "Rise suddenly",
  shuffle: "Mix cards up",
  combine: "Add; Mix",
  chaos: "Total disorder",
  labyrinth: "Maze",
  disturb: "Interrupt; upset",
  shift: "Move; Period of work",
  machine: "Device or appliance",
  flicker: "Unsteady light",
  bliss: "Perfect happiness",
  ember: "Glowing piece of coal",
  frenzy: "Wild excitement",
  glitch: "Minor malfunction",
  oasis: "Desert water source",
  quest: "Journey or search",
  realm: "Kingdom or domain",
  rustle: "Soft, crackling sound",
  spiral: "Winding shape",
  vanish: "Disappear suddenly",
  zest: "Great enthusiasm",
  tumble: "Fall suddenly",
  voyage: "Long journey",
  whisper: "Soft speech",
  mirage: "Optical illusion",
  puzzle: "Confusing problem",
  echo: "Repeat sound",
};
const words = Object.keys(options);
const genRandomValue = (arr) => {
  return Math.floor(Math.random() * arr.length);
};
const hint = document.querySelector(".hint-ref");
const message = document.getElementById("message");
const letterContainer = document.getElementById("letters-container");
const word = document.getElementById("word");
const result = document.getElementById("result");
const startBtn = document.getElementById("start");
const controls = document.querySelector(".controls");
const userInpSection = document.getElementById("user-input");

let rndmWord = "",
  rndmHint = "";
let winCount = 0,
  LossCount = 0;

startBtn.addEventListener("click", () => {
  controls.classList.add("hide");
  init();
});
const genRandomWord = () => {
  letterContainer.classList.remove("hide");
  userInpSection.innerText = "";
  rndmWord = words[genRandomValue(words)];
  rndmHint = options[rndmWord];

  hint.innerHTML = `<div id="wordHint"><span>Hint: </span>${rndmHint}</div>`;
  let displayItem = "";
  rndmWord.split("").forEach(() => {
    displayItem += `<span class="inputSpace">_ </span>`;
  });
  userInpSection.innerHTML = displayItem;
  userInpSection.innerHTML += `<div id="chanceCount">Chances Left: ${LossCount}</div>`;
};
const init = () => {
  winCount = 0;
  LossCount = 5;
  rndmWord = "";
  rndmHint = "";
  word.innerText = "";
  message.innerText = "";
  userInpSection.innerHTML = "";
  letterContainer.classList.add("hide");
  letterContainer.innerHTML = "";
  genRandomWord();
  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");
    button.innerText = String.fromCharCode(i);
    button.addEventListener("click", () => {
      handleClick(button);
    });
    letterContainer.appendChild(button);
  }
};
const handleClick = (button) => {
  let charArray = rndmWord.toUpperCase().split("");
  let inpSpace = document.getElementsByClassName("inputSpace");
  if (charArray.includes(button.innerText)) {
    message.innerText = "Correct Letter";
    message.style.color = "#008000";
    charArray.forEach((el, i) => {
      if (el === button.innerText) {
        inpSpace[i].innerText = el;
        winCount += 1;
        button.classList.add("correct");
        if (winCount === rndmWord.length) {
          result.innerText = "You Won!";
          startBtn.innerText = "Restart";
          blocker();
        }
      }
    });
  } else {
    button.classList.add("incorrect");
    LossCount -= 1;
    document.getElementById(
      "chanceCount"
    ).innerText = `Chances Left: ${LossCount}`;
    message.innerText = "Incorrect Answer";
    message.style.color = "#ff0000";
    if (LossCount === 0) {
        word.innerHTML = `The word was: <span>${rndmWord}</span>`;
      result.innerText = "Game over";

      blocker();
    }
  }
  button.disabled = true;
};
const blocker = () => {
  let letterbtn = document.querySelectorAll(".letters");
  letterbtn.forEach((btn) => {
    btn.disabled = true;
  });
  stopGame();
};
const stopGame = () => {
  controls.classList.remove("hide");
};

window.onload = () => {
  init();
};
