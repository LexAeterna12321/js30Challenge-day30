const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
let lasthole, score;
let timeUp = false;

function randTime(min, max) {
  const randT = Math.round(Math.random() * (max - min) + min);
  return randT;
}

function randHole(holes) {
  const index = Math.floor(Math.random() * holes.length);
  const hole = holes[index];
  // prevents the repetition of holes
  if (lasthole === hole) {
    return randHole(holes);
  }
  lasthole = hole;
  //
  return hole;
}

function riseOfMoles() {
  const time = randTime(200, 1000);
  const hole = randHole(holes);
  hole.classList.add("up");
  setTimeout(() => {
    hole.classList.remove("up");
    if (!timeUp) riseOfMoles();
  }, time);
}

function smackAMole(e) {
  if (!e.isTrusted) return;
  score++;
  this.classList.remove("up");
  scoreBoard.textContent = score;
}

function startGame() {
  score = 0;
  scoreBoard.textContent = score;
  riseOfMoles();
  timeUp = false;
  setTimeout(() => (timeUp = true), 10000);
}

moles.forEach(mole => {
  mole.addEventListener("click", smackAMole);
});
