const questions = [
  {
    questionText: "Commonly used data types DO NOT include:",
    options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    answer: "3. alerts",
  },
  {
    questionText: "Arrays in JavaScript can be used to store ______.",
    options: [
      "1. numbers and strings",
      "2. other arrays",
      "3. booleans",
      "4. all of the above",
    ],
    answer: "4. all of the above",
  },
  {
    questionText:
      "String values must be enclosed within _____ when being assigned to variables.",
    options: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
    answer: "3. quotes",
  },
  {
    questionText:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    options: [
      "1. JavaScript",
      "2. terminal/bash",
      "3. for loops",
      "4. console.log",
    ],
    answer: "4. console.log",
  },
  {
    questionText:
      "Which of the following is a statement that can be used to terminate a loop, switch or label statement?",
    options: ["1. break", "2. stop", "3. halt", "4. exit"],
    answer: "1. break",
  },
];
display = document.querySelector("span");
//highscore
const highScoreCard = document.querySelector("#highscore-card");
const highScoreBtn = document.querySelector(".highscore-btn");
const hsBack = document.querySelector(".hs-back");
const hsClear = document.querySelector(".hs-clear");
// start
const startCard = document.querySelector("#start");
const startBtn = document.querySelector("#strt-quiz");
//quiz
const quiz = document.querySelector(".quiz");

// result after quiz
const scoresheet = document.querySelector(".scoresheet");
const res = document.querySelector("#res");
const subBtn = document.querySelector("#sub");
//form

//global values
let index = 0;
let score = 0;
var users = JSON.parse(localStorage.getItem("users") || "[]");
let intervalId;
const timervalue = 45;
var timer = timervalue;
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
function removeChildNodes(parent) {
  parent.removeChild(parent.firstChild);
}
// result related

//highscore viewer remover and backer
function fillHighScore() {
  const ol = document.querySelector("#list");
  users.forEach((o) => {
    let li = document.createElement("li");
    li.innerText = `${o.username} - ${o.score} `;
    ol.appendChild(li);
  });
}
function removeHighscore() {
  const ul = document.querySelector("#list");
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
}
let clicked = false;
// highscore btn
highScoreBtn.addEventListener("click", () => {
  if (clicked == true) return;
  timer = timervalue;
  removeAllChildNodes(quiz);
  clearInterval(intervalId);
  display.innerText = "";
  highScoreCard.classList.remove("card-hide");
  startCard.classList.add("card-hide");
  quiz.classList.add("card-hide");
  scoresheet.classList.add("card-hide");
  fillHighScore();
  clicked = true;
});
hsBack.addEventListener("click", () => {
  clicked = false;
  highScoreCard.classList.add("card-hide");
  startCard.classList.remove("card-hide");
  quiz.classList.add("card-hide");
  scoresheet.classList.add("card-hide");
  removeHighscore();
});

hsClear.addEventListener("click", () => {
  localStorage.removeItem("users");
  users = [];
  clicked = false;
  highScoreCard.classList.add("card-hide");
  startCard.classList.remove("card-hide");
  quiz.classList.add("card-hide");
  scoresheet.classList.add("card-hide");
  removeHighscore();
});

// quiz start
// countdown timer
function startTimer() {
  intervalId = setInterval(function () {
    display.innerText = timer + " sec";
    score = timer;
    if (--timer < 0) {
      showResult(intervalId, display);
    }
  }, 1000);
}
function showQuestion(index) {
  if (index > questions.length - 1) {
    showResult(intervalId, display);
    return;
  }
  const q = questions[index];
  const div = document.createElement("div");
  div.classList.add("card-spc");
  const h2 = document.createElement("h2");
  h2.innerText = q.questionText;
  div.appendChild(h2);
  let p = document.createElement("p");
  p.classList.add("card-hide");

  q.options.forEach((o) => {
    let button = document.createElement("button");
    button.classList.add("card-btn-spl");
    button.innerText = o;
    div.appendChild(button);
    button.addEventListener("click", () => {
      if (button.innerText == q.answer) {
        p.innerText = "Correct!";
        p.classList.remove("card-hide");
      } else {
        p.innerText = "Incorrect!";
        p.classList.remove("card-hide");
        timer = timer - 10;
      }

      index++;

      setTimeout(() => {
        removeChildNodes(quiz);
        showQuestion(index);
      }, 500);
    });
  });
  div.appendChild(p);
  quiz.appendChild(div);
}
startBtn.addEventListener("click", () => {
  startTimer(timer);

  highScoreCard.classList.add("card-hide");
  startCard.classList.add("card-hide");
  quiz.classList.remove("card-hide");
  scoresheet.classList.add("card-hide");
  showQuestion(index);
});

//quiz end
function showResult(interval, display) {
  clearInterval(interval);
  display.innerText = "";
  quiz.classList.toggle("card-hide");
  scoresheet.classList.toggle("card-hide");
  res.innerText = score;
  if (score < 0) {
    res.innerText = 0;
  }
  timer = timervalue;
}
function handleSubmit(e) {
  e.preventDefault();
  const form = document.querySelector("#form");
  const username = form.elements[0].value;
  const user = { username, score };
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
}
subBtn.addEventListener("click", (e) => {
  highScoreCard.classList.add("card-hide");
  startCard.classList.remove("card-hide");
  quiz.classList.add("card-hide");
  scoresheet.classList.add("card-hide");
  handleSubmit(e);
});
