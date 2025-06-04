
const puzzle = [
  "5", "3", "", "", "7", "", "", "", "",
  "6", "", "", "1", "9", "5", "", "", "",
  "", "9", "8", "", "", "", "", "6", "",
  "8", "", "", "", "6", "", "", "", "3",
  "4", "", "", "8", "", "3", "", "", "1",
  "7", "", "", "", "2", "", "", "", "6",
  "", "6", "", "", "", "", "2", "8", "",
  "", "", "", "4", "1", "9", "", "", "5",
  "", "", "", "", "8", "", "", "7", "9"
];

let selectedNumber = null;

function renderBoard() {
  const container = document.getElementById("sudoku-container");
  container.innerHTML = "";

  for (let i = 0; i < 81; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");

    const row = Math.floor(i / 9);
    const col = i % 9;

    if (puzzle[i]) {
      cell.textContent = puzzle[i];
      cell.classList.add("fixed");
    } else {
      cell.addEventListener("click", () => handleCellClick(cell, i));
    }

    if (row % 3 === 0) cell.classList.add("box-top");
    if (col % 3 === 0) cell.classList.add("box-left");
    if (col === 8) cell.classList.add("box-right");
    if (row === 8) cell.classList.add("box-bottom");

    cell.dataset.index = i;
    container.appendChild(cell);
  }
}

function renderPicker() {
  const picker = document.getElementById("number-picker");
  picker.innerHTML = "";

  for (let i = 1; i <= 9; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.className = "num-button";
    btn.onclick = () => {
      selectedNumber = i.toString();
      document.querySelectorAll(".num-button").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
    };
    picker.appendChild(btn);
  }
}

function handleCellClick(cell, index) {
  if (!selectedNumber || cell.classList.contains("fixed")) return;

  const currentBoard = Array.from(document.querySelectorAll(".cell")).map(c => c.textContent);
  const row = Math.floor(index / 9);
  const col = index % 9;

  for (let i = 0; i < 9; i++) {
    if (currentBoard[row * 9 + i] === selectedNumber) return;
    if (currentBoard[i * 9 + col] === selectedNumber) return;
  }

  const boxStartRow = Math.floor(row / 3) * 3;
  const boxStartCol = Math.floor(col / 3) * 3;
  for (let r = boxStartRow; r < boxStartRow + 3; r++) {
    for (let c = boxStartCol; c < boxStartCol + 3; c++) {
      if (currentBoard[r * 9 + c] === selectedNumber) return;
    }
  }

  cell.textContent = selectedNumber;
  checkComplete();
}

function checkComplete() {
  const emptyCells = Array.from(document.querySelectorAll(".cell:not(.fixed)")).filter(c => !c.textContent);
  if (emptyCells.length === 0) {
    document.getElementById("puzzle-image").style.display = "block";
  }
}

renderBoard();
renderPicker();
