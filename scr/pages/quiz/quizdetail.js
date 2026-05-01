const quizData = [
{
question: "What is the capital city of Cambodia?",
options: ["Siem Reap","Phnom Penh","Battambang","Kampot"],
correct: 1
},
{
question: "HTML stands for?",
options: [
"Hyper Text Markup Language",
"High Tool Mark Language",
"Hyper Transfer Machine Language",
"None"
],
correct: 0
},
{
question: "CSS is used for?",
options: [
"Styling website",
"Database",
"Server logic",
"Operating system"
],
correct: 0
}
];

let current = 0;
let score = 0;
let selected = null;

const qTitle = document.getElementById("question-title");
const aList = document.getElementById("answer-list");
const nextBtn = document.getElementById("next-btn");
const scoreEl = document.getElementById("score");
const qCounter = document.getElementById("qestion-count");

function loadQuestion(){

selected = null;

const q = quizData[current];

qTitle.textContent = q.question;

qCounter.textContent =
`Question ${current + 1} of ${quizData.length}`;

aList.innerHTML = "";

q.options.forEach((opt,i)=>{

const div = document.createElement("div");
div.className = "answer-option";

div.innerHTML =
`<input type="radio" name="answer"> ${opt}`;

div.onclick = () =>{

selected = i;

document.querySelectorAll(".answer-option")
.forEach(o=>o.classList.remove("selected"));

div.classList.add("selected");

};

aList.appendChild(div);

});

nextBtn.textContent =
current === quizData.length - 1 ? "Finish" : "Next";

}

nextBtn.onclick = ()=>{

if(selected === null){
alert("Please select an answer");
return;
}

if(selected === quizData[current].correct){
score++;
}

scoreEl.textContent = score;

current++;

if(current < quizData.length){

loadQuestion();

}else{

finishQuiz();

}

};

function finishQuiz(){

document.getElementById("quiz-flow").style.display="none";

const result = document.getElementById("result-panel");

result.classList.remove("hidden");

document.getElementById("result-score")
.textContent = `Score: ${score} / ${quizData.length}`;

}

loadQuestion();