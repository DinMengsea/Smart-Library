const params = new URLSearchParams(window.location.search);
const courseName = params.get("course") || "Math Advance Grade 11";

const quizzes = {
  "Math Advance Grade 11": [
    {
      question: "What is 2x + 3 = 11?",
      options: ["x = 2", "x = 3", "x = 4", "x = 5"],
      correct: 2
    },
    {
      question: "What is the value of 5²?",
      options: ["10", "15", "20", "25"],
      correct: 3
    },
    {
      question: "Which symbol means greater than?",
      options: ["<", ">", "=", "!="],
      correct: 1
    }
  ],

  "Math grade 9 corrections": [
    {
      question: "What is 12 + 8?",
      options: ["18", "19", "20", "21"],
      correct: 2
    },
    {
      question: "What is 9 × 6?",
      options: ["45", "54", "63", "72"],
      correct: 1
    },
    {
      question: "What is 100 ÷ 10?",
      options: ["1", "5", "10", "20"],
      correct: 2
    }
  ],

  "Math grade 6": [
    {
      question: "What is 7 + 5?",
      options: ["10", "11", "12", "13"],
      correct: 2
    },
    {
      question: "What shape has 3 sides?",
      options: ["Circle", "Square", "Triangle", "Rectangle"],
      correct: 2
    },
    {
      question: "What is half of 20?",
      options: ["5", "10", "15", "20"],
      correct: 1
    }
  ],

  "Physics grade 11": [
    {
      question: "What is the unit of force?",
      options: ["Newton", "Joule", "Watt", "Meter"],
      correct: 0
    },
    {
      question: "Which formula is for speed?",
      options: ["speed = distance / time", "speed = mass × volume", "speed = force / area", "speed = time / distance"],
      correct: 0
    },
    {
      question: "Gravity pulls objects toward the...",
      options: ["Sky", "Earth", "Sun only", "Moon only"],
      correct: 1
    }
  ],

  "History grade 11": [
    {
      question: "History mainly studies...",
      options: ["Past events", "Future events", "Only numbers", "Only animals"],
      correct: 0
    },
    {
      question: "A timeline is used to show...",
      options: ["Colors", "Events in order", "Music", "Maps only"],
      correct: 1
    },
    {
      question: "A primary source can be...",
      options: ["A diary", "A fictional movie", "A random guess", "A cartoon"],
      correct: 0
    }
  ],

  "Geography grade 11": [
    {
      question: "Geography studies...",
      options: ["Earth and places", "Only computers", "Only grammar", "Only music"],
      correct: 0
    },
    {
      question: "Which one is a continent?",
      options: ["Asia", "Cambodia", "Phnom Penh", "Mekong"],
      correct: 0
    },
    {
      question: "A map is used to...",
      options: ["Cook food", "Find locations", "Play music", "Write code"],
      correct: 1
    }
  ],

  "Khmer Literature grade 11": [
    {
      question: "Literature includes...",
      options: ["Stories and poems", "Only numbers", "Only maps", "Only sports"],
      correct: 0
    },
    {
      question: "A poem usually uses...",
      options: ["Rhythm", "Only formulas", "Only code", "Only tables"],
      correct: 0
    },
    {
      question: "A character is a...",
      options: ["Person in a story", "Book cover", "Page number", "Font size"],
      correct: 0
    }
  ],

  "Khmer Literature grade 4": [
    {
      question: "A story has...",
      options: ["Characters", "Only numbers", "Only maps", "Only prices"],
      correct: 0
    },
    {
      question: "The title tells us...",
      options: ["The name of the story", "The page color", "The pencil size", "The weather only"],
      correct: 0
    },
    {
      question: "Reading helps us...",
      options: ["Learn new ideas", "Forget words", "Break books", "Skip school"],
      correct: 0
    }
  ],

  "Economics grade 11": [
    {
      question: "Economics studies...",
      options: ["Goods and services", "Only planets", "Only poems", "Only animals"],
      correct: 0
    },
    {
      question: "Money is used to...",
      options: ["Exchange value", "Measure height", "Draw maps", "Clean water"],
      correct: 0
    },
    {
      question: "Demand means...",
      options: ["People want to buy", "People sleep", "People run", "People write"],
      correct: 0
    }
  ],

  "Social Studies grade 11": [
    {
      question: "Social studies learns about...",
      options: ["People and society", "Only coding", "Only insects", "Only games"],
      correct: 0
    },
    {
      question: "Community means...",
      options: ["A group of people living together", "A single book", "A computer", "A color"],
      correct: 0
    },
    {
      question: "Rules help society to...",
      options: ["Stay organized", "Become messy", "Stop learning", "Hide information"],
      correct: 0
    }
  ]
};

const quizData = quizzes[courseName] || quizzes["Math Advance Grade 11"];

let current = 0;
let score = 0;
let selected = null;
let userAnswers = [];

const qTitle = document.getElementById("question-title");
const aList = document.getElementById("answer-list");
const nextBtn = document.getElementById("next-btn");
const scoreEl = document.getElementById("score");
const qCounter = document.getElementById("question-count");
const questionSection = document.querySelector(".question-section");
const quizFooter = document.querySelector(".quiz-footer");
const resultPanel = document.getElementById("result-panel");
const resultScore = document.getElementById("result-score");
const correctAnswerList = document.getElementById("correct-answer-list");
const backBtn = document.getElementById("back-btn");

document.querySelector(".quiz-header h1").textContent = `${courseName} Quiz`;

function loadQuestion() {
  selected = null;

  const q = quizData[current];
  qTitle.textContent = q.question;
  qCounter.textContent = `Question ${current + 1} of ${quizData.length}`;
  aList.innerHTML = "";

  q.options.forEach((opt, i) => {
    const label = document.createElement("label");
    label.className = "answer-option";

    label.innerHTML = `
      <input type="radio" name="answer" value="${i}">
      <span>${opt}</span>
    `;

    label.addEventListener("click", () => {
      selected = i;

      document.querySelectorAll(".answer-option")
        .forEach(option => option.classList.remove("selected"));

      label.classList.add("selected");
      label.querySelector("input").checked = true;
    });

    aList.appendChild(label);
  });

  nextBtn.textContent = current === quizData.length - 1 ? "Finish" : "Next ❯";
}

nextBtn.addEventListener("click", () => {
  if (selected === null) {
    alert("Please select an answer");
    return;
  }

  userAnswers[current] = selected;

  if (selected === quizData[current].correct) {
    score++;
  }

  scoreEl.textContent = score;
  current++;

  if (current < quizData.length) {
    loadQuestion();
  } else {
    finishQuiz();
  }
});

function finishQuiz() {
  questionSection.classList.add("hidden");
  quizFooter.classList.add("hidden");
  resultPanel.classList.remove("hidden");

  resultScore.textContent = `Score: ${score} / ${quizData.length}`;
  correctAnswerList.innerHTML = "";

  quizData.forEach((q, index) => {
    const item = document.createElement("div");
    item.className = "correct-answer-item";

    const userAnswer = q.options[userAnswers[index]];
    const correctAnswer = q.options[q.correct];

    item.innerHTML = `
      <p><strong>Q${index + 1}:</strong> ${q.question}</p>
      <p>Your answer: ${userAnswer}</p>
      <p>Correct answer: ${correctAnswer}</p>
    `;

    correctAnswerList.appendChild(item);
  });
}

backBtn.addEventListener("click", () => {
  window.history.back();
});

loadQuestion();