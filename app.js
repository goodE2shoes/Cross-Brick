const answers = [
  "G","E","M","","C","H","U","B","","B","E","T","A"
];

function createGrid() {
  const grid = document.getElementById("grid");
  for (let i = 0; i < 100; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");

    const input = document.createElement("input");
    input.maxLength = 1;

    cell.appendChild(input);
    grid.appendChild(cell);
  }
}

function checkAnswers() {
  alert("This is a demo. You can expand logic.");
}

createGrid();
