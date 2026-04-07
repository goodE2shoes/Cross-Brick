// Puzzle definitions
const puzzles = [
  {
    id: "p1",
    title: "Starter Stack",
    difficulty: "Easy",
    size: 7,
    grid: [
      ["#", "#", "#", "#", "#", "#", "#"],
      ["#", ".", ".", ".", "#", ".", "#"],
      ["#", ".", "#", ".", ".", ".", "#"],
      ["#", ".", "#", ".", "#", ".", "#"],
      ["#", ".", ".", ".", "#", ".", "#"],
      ["#", "#", "#", "#", "#", "#", "#"],
      ["#", "#", "#", "#", "#", "#", "#"]
    ],
    bricks: ["CAT", "DOG", "SUN", "MAP", "PEN", "RUG"],
    acrossClues: [
      "1. Feline friend",
      "2. Common pet",
      "3. Bright sky body",
      "4. Navigation aid",
      "5. Writing tool",
      "6. Floor covering"
    ],
    downClues: [
      "1. Small animal",
      "2. Opposite of moon",
      "3. Household item",
      "4. Used in school",
      "5. On the floor",
      "6. Four-legged friend"
    ],
    solution: [
      ["#", "#", "#", "#", "#", "#", "#"],
      ["#", "C", "A", "T", "#", "D", "#"],
      ["#", "O", "#", "O", "U", "N", "#"],
      ["#", "G", "#", "G", "#", "P", "#"],
      ["#", "M", "A", "P", "#", "E", "#"],
      ["#", "#", "#", "#", "#", "#", "#"],
      ["#", "#", "#", "#", "#", "#", "#"]
    ]
  },
  {
    id: "p2",
    title: "Mini Cross",
    difficulty: "Medium",
    size: 9,
    grid: [
      ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
      ["#", ".", ".", ".", "#", ".", ".", ".", "#"],
      ["#", ".", "#", ".", ".", ".", "#", ".", "#"],
      ["#", ".", "#", ".", "#", ".", "#", ".", "#"],
      ["#", ".", ".", ".", "#", ".", ".", ".", "#"],
      ["#", ".", "#", ".", "#", ".", "#", ".", "#"],
      ["#", ".", "#", ".", ".", ".", "#", ".", "#"],
      ["#", ".", ".", ".", "#", ".", ".", ".", "#"],
      ["#", "#", "#", "#", "#", "#", "#", "#", "#"]
    ],
    bricks: ["TREE", "BIRD", "LAKE", "ROAD", "CLOUD", "HILL"],
    acrossClues: [
      "1. Tall plant",
      "2. Flying animal",
      "3. Body of water",
      "4. Path for cars",
      "5. In the sky",
      "6. Raised land"
    ],
    downClues: [
      "1. Grows in forest",
      "2. Has wings",
      "3. You can swim in it",
      "4. You drive on it",
      "5. White and fluffy",
      "6. You can hike it"
    ],
    solution: [
      ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
      ["#", "T", "R", "E", "#", "B", "I", "R", "#"],
      ["#", "R", "#", "E", "A", "K", "#", "D", "#"],
      ["#", "E", "#", "E", "#", "I", "#", "D", "#"],
      ["#", "E", "A", "K", "#", "R", "O", "A", "#"],
      ["#", "L", "#", "E", "#", "L", "#", "E", "#"],
      ["#", "A", "#", "K", "E", "C", "#", "K", "#"],
      ["#", "K", "E", "E", "#", "L", "A", "K", "#"],
      ["#", "#", "#", "#", "#", "#", "#", "#", "#"]
    ]
  },
  {
    id: "p3",
    title: "Full Grid Demo",
    difficulty: "Hard",
    size: 15,
    grid: Array.from({ length: 15 }, (_, r) =>
      Array.from({ length: 15 }, (_, c) =>
        r === 0 || r === 14 || c === 0 || c === 14 ? "#" : "."
      )
    ),
    bricks: ["ALPHA", "BETA", "GAMMA", "DELTA", "OMEGA", "LOGIC", "BRICK", "STACK", "CROSS", "WORD"],
    acrossClues: [
      "1. First Greek letter",
      "2. Second Greek letter",
      "3. Third Greek letter",
      "4. Fourth Greek letter",
      "5. Last Greek letter",
      "6. Reasoning",
      "7. Building unit",
      "8. Pile of items",
      "9. Intersect",
      "10. Puzzle type"
    ],
    downClues: [
      "1. Opposite of end",
      "2. Comes after alpha",
      "3. Comes after beta",
      "4. Comes after gamma",
      "5. Final symbol",
      "6. Thought process",
      "7. Used in walls",
      "8. Vertical pile",
      "9. Meet at right angles",
      "10. Uses clues"
    ],
    solution: Array.from({ length: 15 }, (_, r) =>
      Array.from({ length: 15 }, (_, c) =>
        r === 0 || r === 14 || c === 0 || c === 14 ? "#" : "."
      )
    )
  }
];

let currentPuzzle = null;
let currentGrid = [];
let selectedBrickIndex = null;
let orientation = "across"; // "across" or "down"

const puzzleTitleEl = document.getElementById("puzzleTitle");
const puzzleDifficultyEl = document.getElementById("puzzleDifficulty");
const brickContainer = document.getElementById("brickContainer");
const acrossList = document.getElementById("acrossList");
const downList = document.getElementById("downList");
const colNumbers = document.getElementById("colNumbers");
const gridContainer = document.getElementById("gridContainer");
const statusMessage = document.getElementById("statusMessage");
const solvedCountEl = document.getElementById("solvedCount");
const orientationLabel = document.getElementById("orientationLabel");

const newPuzzleBtn = document.getElementById("newPuzzleBtn");
const clearBtn = document.getElementById("clearBtn");
const checkBtn = document.getElementById("checkBtn");
const revealBtn = document.getElementById("revealBtn");
const orientationBtn = document.getElementById("orientationBtn");
const darkModeBtn = document.getElementById("darkModeBtn");

function randomPuzzle() {
  const idx = Math.floor(Math.random() * puzzles.length);
  return puzzles[idx];
}

function saveProgress() {
  if (!currentPuzzle) return;
  const key = `crossbrick_${currentPuzzle.id}`;
  const data = { grid: currentGrid };
  localStorage.setItem(key, JSON.stringify(data));
}

function loadProgress(puzzle) {
  const key = `crossbrick_${puzzle.id}`;
  const raw = localStorage.getItem(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function getSolvedCount() {
  const raw = localStorage.getItem("crossbrick_solved_count");
  return raw ? Number(raw) || 0 : 0;
}

function setSolvedCount(n) {
  localStorage.setItem("crossbrick_solved_count", String(n));
  solvedCountEl.textContent = n;
}

function loadPuzzle(puzzle) {
  currentPuzzle = puzzle;
  selectedBrickIndex = null;
  statusMessage.textContent = "";

  puzzleTitleEl.textContent = puzzle.title;
  puzzleDifficultyEl.textContent = puzzle.difficulty;

  currentGrid = puzzle.grid.map(row => row.map(ch => (ch === "#" ? "#" : "")));

  const saved = loadProgress(puzzle);
  if (saved && saved.grid && saved.grid.length === puzzle.size) {
    currentGrid = saved.grid;
  }

  renderBricks();
  renderClues();
  renderGrid();
}

function renderBricks() {
  brickContainer.innerHTML = "";
  currentPuzzle.bricks.forEach((b, idx) => {
    const div = document.createElement("div");
    div.className = "brick";
    div.textContent = b;
    div.dataset.index = idx;

    div.addEventListener("click", () => {
      if (selectedBrickIndex === idx) {
        selectedBrickIndex = null;
      } else {
        selectedBrickIndex = idx;
      }
      updateBrickSelection();
    });

    div.draggable = true;
    div.addEventListener("dragstart", e => {
      selectedBrickIndex = idx;
      updateBrickSelection();
      e.dataTransfer.setData("text/plain", String(idx));
      div.classList.add("dragging");
    });
    div.addEventListener("dragend", () => {
      div.classList.remove("dragging");
      clearDropHighlights();
    });

    brickContainer.appendChild(div);
  });
  updateBrickSelection();
}

function updateBrickSelection() {
  const brickEls = brickContainer.querySelectorAll(".brick");
  brickEls.forEach(el => {
    const idx = Number(el.dataset.index);
    el.classList.toggle("selected", idx === selectedBrickIndex);
  });
}

function renderClues() {
  acrossList.innerHTML = "";
  downList.innerHTML = "";

  currentPuzzle.acrossClues.forEach(text => {
    const li = document.createElement("li");
    li.textContent = text;
    acrossList.appendChild(li);
  });

  currentPuzzle.downClues.forEach(text => {
    const li = document.createElement("li");
    li.textContent = text;
    downList.appendChild(li);
  });
}

function renderGrid() {
  const size = currentPuzzle.size;

  colNumbers.innerHTML = "<span></span>" +
    Array.from({ length: size }, (_, i) => `<span>${i + 1}</span>`).join("");

  gridContainer.innerHTML = "";

  for (let r = 0; r < size; r++) {
    const rowDiv = document.createElement("div");
    rowDiv.className = "row";

    const rowNum = document.createElement("span");
    rowNum.className = "row-num";
    rowNum.textContent = r + 1;
    rowDiv.appendChild(rowNum);

    for (let c = 0; c < size; c++) {
      const cell = document.createElement("span");
      cell.className = "cell";
      const base = currentPuzzle.grid[r][c];

      if (base === "#") {
        cell.classList.add("block");
      } else {
        const val = currentGrid[r][c];
        cell.textContent = val || "";
        if (val) cell.classList.add("filled");

        cell.addEventListener("click", () => {
          handleCellClick(r, c);
          highlightClueForCell(r, c);
        });

        cell.addEventListener("dragover", e => {
          e.preventDefault();
          const idx = selectedBrickIndex;
          if (idx == null) return;
          highlightDrop(r, c, idx);
        });

        cell.addEventListener("dragleave", () => {
          clearDropHighlights();
        });

        cell.addEventListener("drop", e => {
          e.preventDefault();
          const brickIndex = Number(e.dataTransfer.getData("text/plain"));
          dropBrick(brickIndex, r, c);
        });
      }

      rowDiv.appendChild(cell);
    }

    gridContainer.appendChild(rowDiv);
  }
}

function handleCellClick(r, c) {
  if (!currentPuzzle) return;
  if (currentPuzzle.grid[r][c] === "#") return;
  if (selectedBrickIndex == null) return;

  const brick = currentPuzzle.bricks[selectedBrickIndex];
  if (!brick) return;

  if (!placeBrickAt(brick, r, c)) {
    statusMessage.textContent = "Cannot place brick there.";
  } else {
    statusMessage.textContent = "";
  }
}

function placeBrickAt(brick, r, c) {
  const size = currentPuzzle.size;

  if (orientation === "across") {
    if (c + brick.length > size) return false;
    for (let i = 0; i < brick.length; i++) {
      if (currentPuzzle.grid[r][c + i] === "#") return false;
    }
    for (let i = 0; i < brick.length; i++) {
      currentGrid[r][c + i] = brick[i];
    }
  } else {
    if (r + brick.length > size) return false;
    for (let i = 0; i < brick.length; i++) {
      if (currentPuzzle.grid[r + i][c] === "#") return false;
    }
    for (let i = 0; i < brick.length; i++) {
      currentGrid[r + i][c] = brick[i];
    }
  }

  saveProgress();
  renderGrid();
  return true;
}

function clearBoard() {
  if (!currentPuzzle) return;
  currentGrid = currentPuzzle.grid.map(row => row.map(ch => (ch === "#" ? "#" : "")));
  saveProgress();
  statusMessage.textContent = "Board cleared.";
  renderGrid();
}

function checkAnswers() {
  if (!currentPuzzle || !currentPuzzle.solution) {
    statusMessage.textContent = "No solution data for this puzzle.";
    return;
  }

  const size = currentPuzzle.size;
  let allCorrect = true;

  const rows = gridContainer.querySelectorAll(".row");
  for (let r = 0; r < size; r++) {
    const rowCells = rows[r].querySelectorAll(".cell");
    for (let c = 0; c < size; c++) {
      const sol = currentPuzzle.solution[r][c];
      const base = currentPuzzle.grid[r][c];
      const val = currentGrid[r][c];
      const cellEl = rowCells[c];

      cellEl.classList.remove("incorrect");
      if (base === "#") continue;
      if (sol === "." || sol === "") continue;

      if ((val || "").toUpperCase() !== sol.toUpperCase()) {
        allCorrect = false;
        cellEl.classList.add("incorrect");
      }
    }
  }

  if (allCorrect) {
    statusMessage.textContent = "Perfect! All bricks are correctly placed.";
    const count = getSolvedCount() + 1;
    setSolvedCount(count);
  } else {
    statusMessage.textContent = "Some entries are incorrect. Incorrect cells are highlighted.";
  }
}

function revealSolution() {
  if (!currentPuzzle || !currentPuzzle.solution) {
    statusMessage.textContent = "No solution data for this puzzle.";
    return;
  }

  currentGrid = currentPuzzle.solution.map(row =>
    row.map(ch => (ch === "#" ? "#" : ch === "." ? "" : ch))
  );

  saveProgress();
  renderGrid();
  statusMessage.textContent = "Solution revealed.";
}

function getCellElement(r, c) {
  const row = gridContainer.children[r];
  if (!row) return null;
  return row.children[c + 1];
}

function highlightDrop(r, c, brickIndex) {
  clearDropHighlights();
  const brick = currentPuzzle.bricks[brickIndex];
  const size = currentPuzzle.size;

  let valid = true;
  if (orientation === "across") {
    if (c + brick.length > size) valid = false;
    for (let i = 0; i < brick.length && valid; i++) {
      if (currentPuzzle.grid[r][c + i] === "#") valid = false;
    }
  } else {
    if (r + brick.length > size) valid = false;
    for (let i = 0; i < brick.length && valid; i++) {
      if (currentPuzzle.grid[r + i][c] === "#") valid = false;
    }
  }

  for (let i = 0; i < brick.length; i++) {
    const rr = orientation === "across" ? r : r + i;
    const cc = orientation === "across" ? c + i : c;
    const cell = getCellElement(rr, cc);
    if (!cell) continue;
    cell.classList.add(valid ? "drop-target" : "drop-invalid");
  }
}

function clearDropHighlights() {
  document
    .querySelectorAll(".drop-target, .drop-invalid")
    .forEach(el => el.classList.remove("drop-target", "drop-invalid"));
}

function dropBrick(brickIndex, r, c) {
  const brick = currentPuzzle.bricks[brickIndex];
  if (!brick) return;
  if (!placeBrickAt(brick, r, c)) {
    flashInvalidDrop(r, c, brick.length);
  }
  clearDropHighlights();
}

function flashInvalidDrop(r, c, length) {
  for (let i = 0; i < length; i++) {
    const rr = orientation === "across" ? r : r + i;
    const cc = orientation === "across" ? c + i : c;
    const cell = getCellElement(rr, cc);
    if (!cell) continue;
    cell.classList.add("drop-invalid");
    setTimeout(() => cell.classList.remove("drop-invalid"), 250);
  }
}

function toggleOrientation() {
  orientation = orientation === "across" ? "down" : "across";
  orientationLabel.textContent = orientation === "across" ? "Across" : "Down";
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("crossbrick_dark", isDark ? "1" : "0");
}

function loadDarkMode() {
  const raw = localStorage.getItem("crossbrick_dark");
  if (raw === "1") {
    document.body.classList.add("dark");
  }
}

function highlightClueForCell(r, c) {
  document
    .querySelectorAll(".clue-active")
    .forEach(el => el.classList.remove("clue-active"));

  const size = currentPuzzle.size;

  let startC = c;
  while (startC > 0 && currentPuzzle.grid[r][startC - 1] !== "#") startC--;
  let endC = c;
  while (endC + 1 < size && currentPuzzle.grid[r][endC + 1] !== "#") endC++;
  const acrossIndex = r * size + startC;
  const acrossLi = acrossList.children[acrossIndex] || null;
  if (acrossLi) acrossLi.classList.add("clue-active");

  let startR = r;
  while (startR > 0 && currentPuzzle.grid[startR - 1][c] !== "#") startR--;
  let endR = r;
  while (endR + 1 < size && currentPuzzle.grid[endR + 1][c] !== "#") endR++;
  const downIndex = c * size + startR;
  const downLi = downList.children[downIndex] || null;
  if (downLi) downLi.classList.add("clue-active");
}

newPuzzleBtn.addEventListener("click", () => {
  loadPuzzle(randomPuzzle());
});

clearBtn.addEventListener("click", clearBoard);
checkBtn.addEventListener("click", checkAnswers);
revealBtn.addEventListener("click", revealSolution);
orientationBtn.addEventListener("click", toggleOrientation);
darkModeBtn.addEventListener("click", toggleDarkMode);

(function init() {
  loadDarkMode();
  setSolvedCount(getSolvedCount());
  loadPuzzle(randomPuzzle());
})();
