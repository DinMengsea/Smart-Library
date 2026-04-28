const params = new URLSearchParams(window.location.search);
const lessonId = params.get("lesson") || "lesson1";

const quizData = {
  math11_lesson1: [
    {
      question: "Capital of Cambodia?",
      options: ["Siem Reap", "Phnom Penh"],
      correct: 1
    }
  ],

  math11_lesson2: [
    {
      question: "HTML stands for?",
      options: ["Hyper Text Markup Language", "None"],
      correct: 0
    }
  ],

  math11_lesson3: [
    {
      question: "CSS is used for?",
      options: ["Style", "Logic"],
      correct: 0
    }
  ],

  lesson1: [
    {
      question: "Capital of Cambodia?",
      options: ["Siem Reap", "Phnom Penh"],
      correct: 1
    }
  ]
};

const questions = quizData[lessonId];

let current = 0;
let score = 0;
let selected = null;

const qTitle = document.getElementById("question-title");
const aList = document.getElementById("answer-list");
const nextBtn = document.getElementById("next-btn");
const scoreEl = document.getElementById("score");

function loadQ() {
  selected = null;
  const q = questions[current];

  qTitle.textContent = q.question;
  aList.innerHTML = "";

  q.options.forEach((opt, i) => {
    const div = document.createElement("div");
    div.className = "answer-option";
    div.innerHTML = `<input type="radio" name="a"> ${opt}`;
    div.onclick = () => selected = i;
    aList.appendChild(div);
  });

  nextBtn.textContent =
    current === questions.length - 1 ? "Finish" : "Next";
}

nextBtn.onclick = () => {
  if (selected === null) return alert("Select answer");

  if (selected === questions[current].correct) score++;

  scoreEl.textContent = score;
  current++;

  if (current < questions.length) {
    loadQ();
  } else {
    finish();
  }
};

function finish() {
  document.querySelector(".question-section").style.display = "none";
  document.querySelector(".quiz-footer").style.display = "none";

  const result = document.getElementById("result-panel");
  result.classList.remove("hidden");

  document.getElementById("result-score").textContent =
    `Score: ${score}/${questions.length}`;

  localStorage.setItem(`done_${lessonId}`, "true");
}

loadQ();