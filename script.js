
const puzzles = {
  easy: "53..7....6..195....98....6.8...6...34..8..6..1...2...6....28....419..5....8..79",
  medium: "6..874..59..2..8..5.....7.4.2..3.6.5.....9.....1.4.7..9.9.2.....7..1..4..48..653..",
  hard: "..5.....3.8..3..2...2....4..1..4..3.....9.....6..1..7..9....1...4..8..1.3.....2..",
};

const solutions = {
  easy: "534678912672195348198342567859761423426853791713924856961537284287419635345286179",
  medium: "617874235934251867528639714742183659853496172169527348396742581275318496481965723",
  hard: "195726483684359217327184956218547639439618725576932148962471395745893261831265974"
};

let currentSolution = "";
let currentImage = "";

function startGame(difficulty) {
  const puzzle = puzzles[difficulty];
  currentSolution = solutions[difficulty];
  const container = document.getElementById("sudoku-container");
  container.innerHTML = "";
  document.getElementById("puzzle-image").style.display = "none";

  for (let i = 0; i < 81; i++) {
    const input = document.createElement("input");
    input.type = "text";
    input.maxLength = 1;
    input.dataset.index = i;
    if (puzzle[i] !== ".") {
      input.value = puzzle[i];
      input.disabled = true;
    } else {
      input.addEventListener("input", checkInput);
    }
    container.appendChild(input);
  }

  // Choose a random image
  const images = ["img/image1.jpg", "img/image2.jpg", "img/image3.jpg"];
  currentImage = images[Math.floor(Math.random() * images.length)];
  document.getElementById("puzzle-image").src = currentImage;
}

function checkInput(e) {
  const input = e.target;
  const index = input.dataset.index;
  if (input.value === currentSolution[index]) {
    input.disabled = true;
    input.classList.add("correct");
    checkCompletion();
  } else {
    input.classList.add("incorrect");
    setTimeout(() => {
      input.value = "";
      input.classList.remove("incorrect");
    }, 500);
  }
}

function checkCompletion() {
  const inputs = document.querySelectorAll("#sudoku-container input");
  for (let input of inputs) {
    if (!input.disabled) return;
  }
  document.getElementById("puzzle-image").style.display = "block";
}
