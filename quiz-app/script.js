
function loadQuiz() {
  deSelectAnswers();
  var currentQuizData = quizData[currentQuiz];
  questionElement.innerText = currentQuizData.question;
  aText.innerText = currentQuizData.a;
  bText.innerText = currentQuizData.b;
  cText.innerText = currentQuizData.c;
  dText.innerText = currentQuizData.d;
}

function getSelected() {
  var solution = undefined;
  answers.forEach(function processEachAnswers(answer) {
    if (answer.checked) {
      solution = answer.id;
    }
  });
  return solution;
}

function deSelectAnswers() {
  answers.forEach(function processEachAnswers(answer) {
    answer.checked = false;
  });
}

var quizData = [
  {
    question: "How old is Jason?",
    a: "10",
    b: "23",
    c: "52",
    d: "118",
    correct: "b",
  },
  {
    question: "What is the best season in Beijing?",
    a: "Spring",
    b: "Summer",
    c: "Fall",
    d: "Winter",
    correct: "c",
  },
  {
    question: "Why Python is so popular?",
    a: "People use it to make popular games",
    b: "People use it to clean dishes",
    c: "Because of Machine Learning and AI",
    d: "Because the nerds love it",
    correct: "c",
  },
  {
    question: "What does URL mean in the world of the Internet",
    a: "Uniform Resource Locator",
    b: "Unique Rainbow Lights",
    c: "Uniformed Regional Labour",
    d: "Unusual Rain Longing",
    correct: "a",
  },
  {
    question: "What happens when your computer over heats",
    a: "It grows plants",
    b: "Can be used for cooking eggs",
    c: "It shuts down and could damage your hardware",
    d: "It'll keep you hands warm during winter time",
    correct: "c",
  },
];

var answers = document.querySelectorAll(".answer");
var quiz = document.getElementById("quiz");
var questionElement = document.getElementById("question");
var aText = document.getElementById("a-text");
var bText = document.getElementById("b-text");
var cText = document.getElementById("c-text");
var dText = document.getElementById("d-text");
var submitBtn = document.getElementById("submit");
var currentQuiz = 0;
var score = 0;

loadQuiz();

submitBtn.addEventListener("click", function handleSubmit() {
  var answer = getSelected();

  if (answer) {
    if (answer == quizData[currentQuiz].correct) {
      score++;
    }
    currentQuiz++;
    if (currentQuiz < quizData.length) {
      loadQuiz();
    } else {
      quiz.innerHTML = `<div class="quiz-header"><h2>You answered ${score} correctly</h2><Button onclick="location.reload()">Start Again</Button></div>`;
    }
  }
});
