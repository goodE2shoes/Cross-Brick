const boardSize = 100;
const solution = [
  "G","E","M","","C","H","U","B","","B",
  "E","T","A","","","","","","","",
  "","","","","","","","","","",
  "","","","","","","","","","",
  "","","","","","","","","","",
  "","","","","","","","","","",
  "","","","","","","","","","",
  "","","","","","","","","","",
  "","","","","","","","","","",
  "","","","","","","","","",""
];

const bricks = [
  "IEF","TR","ISE","SW","ROFF","EEP","BRA","CAR","SLO","MAX",
  "TOW","HAL","BER","SAO","IAE","DIS","OME","GAN","NCH","AID",
  "RED","NDS","TY","ESS","NE","NSG","BLA","EDE","MI","EM",
  "EMO","AMP","ELM","SKI","LAB","EL","OOR","CA","OTI","TIN",
  "AYS","WOE","RATH","NER","CEE","STR","PH","RE","NAS","ER",
  "ADO","BIO","LEE","ING","TY","RUM"
];

function createBoard() {
  const board = document.getElementById("board");
  for (let i = 0; i < boardSize; i++) {
    const input = document.createElement("input");
    input.maxLength = 1;
    input.classList.add("cell");
    board.appendChild(input);
  }
}

function createBricks() {
  const container = document.getElementById("bricks");
  bricks.forEach(b => {
    const div = document.createElement("div");
    div.className = "brick";
    div.innerText = b;
    div.onclick = () => insertBrick(b);
    container.appendChild(div);
  });
}

function insertBrick(text) {
  const cells = document.querySelectorAll(".cell");
  let idx = [...cells].findIndex(c => c.value === "");
  if (idx === -1) return;

  for (let i = 0; i < text.length; i++) {
    if (cells[idx + i]) {
      cells[idx + i].value = text[i];
    }
  }
}

function check() {
  const cells = document.querySelectorAll(".cell");
  let correct = 0;

  cells.forEach((c, i) => {
    if (solution[i] && c.value.toUpperCase() === solution[i]) {
      correct++;
      c.style.background = "#8f8";
    } else if (solution[i]) {
      c.style.background = "#f88";
    }
  });

  alert("Correct letters: " + correct);
}

createBoard();
createBricks();
