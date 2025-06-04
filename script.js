
const puzzles = {
  easy: [
    "53..7....6..195....98....6.8...6...34..8..6..1...2...6....28....419..5....8..79",
    "...26.7.168..7..9.19...45..82.1...4..46.29..5...3.28..93...74.4..5..367.2.67..8.."
  ],
  medium: [
    "6..874..59..2..8..5.....7.4.2..3.6.5.....9.....1.4.7..9.9.2.....7..1..4..48..653..",
    "8.2..7..5..9..8.2.3..6.....6.5..2....3.9.1.7....8..3.6.....2..1.4.7..3..5..6..8.1"
  ],
  hard: [
    "..5.....3.8..3..2...2....4..1..4..3.....9.....6..1..7..9....1...4..8..1.3.....2..",
    ".3.6.9.2..6..3...8....5...1.7.4...2..4..1..7..8...5.9.3...8....3...6..4..9.2.3.5."
  ]
};

const solutions = {
  easy: [
    "534678912672195348198342567859761423426853791713924856961537284287419635345286179",
    "435269781682173594197854326821597643346928157759341268913682475548715963276439812"
  ],
  medium: [
    "617874235934251867528639714742183659853496172169527348396742581275318496481965723",
    "842317695759648231316925874695472183234891576187563942978256413421739658563184729"
  ],
  hard: [
    "195726483684359217327184956218547639439618725576932148962471395745893261831265974",
    "134679528562831947987254631179463852345128796628795413413982765856317249792546318"
  ]
};

let selectedNumber = null;
let currentSolution = "";

function startGame(difficulty) {
  const index = Math.floor(Math.random() * puzzles[difficulty].length);
  const puzzle = puzzles[difficulty][index];
  currentSolution = solutions[difficulty][index];
  const container = document.getElementById("sudoku-container");
  container.innerHTML = "";
  document.getElementById("puzzle-image").style.display = "none";

  for (let i = 0; i < 81; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;

    if (puzzle[i] !== ".") {
      cell.textContent = puzzle[i];
      cell.classList.add("fixed");
    } else {
      cell.addEventListener("click", () => handleCellClick(cell));
    }

    container.appendChild(cell);
  }

  const images = ["img/image1.jpg", "img/image2.jpg", "img/image3.jpg"];
  const selected = images[Math.floor(Math.random() * images.length)];
  document.getElementById("puzzle-image").src = selected;
}

function handleCellClick(cell) {
  if (!selectedNumber || cell.classList.contains("fixed")) return;

  const index = cell.dataset.index;
  if (selectedNumber === currentSolution[index]) {
    cell.textContent = selectedNumber;
    cell.classList.add("correct");
    cell.removeEventListener("click", () => handleCellClick(cell));
    checkCompletion();
  } else {
    cell.classList.add("incorrect");
    setTimeout(() => cell.classList.remove("incorrect"), 500);
  }
}

function createNumberPicker() {
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

function checkCompletion() {
  const cells = document.querySelectorAll(".cell:not(.fixed)");
  for (let cell of cells) {
    if (!cell.classList.contains("correct")) return;
  }
  document.getElementById("puzzle-image").style.display = "block";
}

createNumberPicker();
