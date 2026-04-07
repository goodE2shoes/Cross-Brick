/* -----------------------------
   BRICK DATA
------------------------------ */
const bricks = [
    "SW | RFF", "TR | OE", "TW | HAL", "SIX | MAX",
    "AID | ONS", "OME | NCS", "RA | EMP", "AYS | RA",
    "NAS | PH", "ADO | LEE", "TY | MIN", "BIO | ING",
    "RE | ER", "B | IOE", "IEF | BRA", "EEP | BRA",
    "TR | CR", "OME | NES", "HAE | OOA", "EMP | SKI"
];

/* -----------------------------
   CLUES
------------------------------ */
const acrossClues = [
    "Game’s gift", "Greek letter", "Of light", "Eye section",
    "Concludes", "Liner", "Panel", "Practical", "Double mast",
    "Cupboard", "Forking", "Layered", "Achieve", "Hideous", "Dose mug"
];

const downClues = [
    "Chain weapon", "City haven", "Lover’s bird", "Anchor",
    "Command", "Barn lodge", "Africa locale", "Water drink",
    "Host", "Wolak", "Attend held", "Frightened",
    "Skirt style", "Unhappiness", "Work crew"
];

/* -----------------------------
   RENDER BRICKS
------------------------------ */
const brickContainer = document.getElementById("brickContainer");
bricks.forEach(b => {
    const div = document.createElement("div");
    div.className = "brick";
    div.textContent = b;
    brickContainer.appendChild(div);
});

/* -----------------------------
   RENDER CLUES
------------------------------ */
const acrossList = document.getElementById("acrossList");
acrossClues.forEach(c => {
    const li = document.createElement("li");
    li.textContent = c;
    acrossList.appendChild(li);
});

const downList = document.getElementById("downList");
downClues.forEach(c => {
    const li = document.createElement("li");
    li.textContent = c;
    downList.appendChild(li);
});

/* -----------------------------
   RENDER GRID (15×15)
------------------------------ */
const gridContainer = document.getElementById("gridContainer");
const colNumbers = document.getElementById("colNumbers");

// Column numbers
colNumbers.innerHTML = `<span></span>` + 
    Array.from({ length: 15 }, (_, i) => `<span>${i+1}</span>`).join("");

// Rows
for (let r = 1; r <= 15; r++) {
    const row = document.createElement("div");
    row.className = "row";

    // Row number
    const rowNum = document.createElement("span");
    rowNum.className = "row-num";
    rowNum.textContent = r;
    row.appendChild(rowNum);

    // 15 cells
    for (let c = 1; c <= 15; c++) {
        const cell = document.createElement("span");
        cell.className = "cell";

        // Pre-filled letters (example from your image)
        if (r === 1 && c <= 3) cell.textContent = "GEM"[c-1];
        if (r === 2 && c <= 4) cell.textContent = "CHUB"[c-1];
        if (r === 3 && c <= 4) cell.textContent = "BETA"[c-1];

        if (cell.textContent) cell.classList.add("filled");

        row.appendChild(cell);
    }

    gridContainer.appendChild(row);
}
