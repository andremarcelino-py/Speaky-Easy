const questions = [
  {
    question: "Qual é a capital do Brasil?",
    options: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador"],
    answer: 2
  },
  {
    question: "Qual é o maior planeta do nosso sistema solar?",
    options: ["Terra", "Júpiter", "Saturno", "Marte"],
    answer: 1
  },
  {
    question: "Quem foi o primeiro presidente dos Estados Unidos?",
    options: ["George Washington", "Abraham Lincoln", "Thomas Jefferson", "John Adams"],
    answer: 0
  },
  {
    question: "Qual é a fórmula da água?",
    options: ["CO2", "H2O", "O2", "N2O"],
    answer: 1
  },
  {
    question: "Em que ano o homem foi à Lua pela primeira vez?",
    options: ["1969", "1970", "1965", "1959"],
    answer: 0
  },
  {
    question: "Qual é o continente onde a pirâmide de Gizé está localizada?",
    options: ["África", "América", "Ásia", "Europa"],
    answer: 0
  }
];

let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next");
const scoreElement = document.getElementById("score");

function loadQuestion() {
  const current = questions[currentQuestion];
  questionElement.textContent = current.question;
  optionsElement.innerHTML = '';
  
  current.options.forEach((option, index) => {
    const li = document.createElement("li");
    li.textContent = option;
    li.onclick = () => checkAnswer(index);
    optionsElement.appendChild(li);
  });
}

function checkAnswer(selectedIndex) {
  const correctAnswer = questions[currentQuestion].answer;
  if (selectedIndex === correctAnswer) {
    score++;
    scoreElement.textContent = score;
  }
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    nextButton.textContent = "Fim do Quiz!";
    nextButton.disabled = true;
  }
}

nextButton.addEventListener("click", () => {
  loadQuestion();
  nextButton.disabled = true; // Desabilita o botão até que uma resposta seja dada
});

loadQuestion(); // Carregar a primeira pergunta
