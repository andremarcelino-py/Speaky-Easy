// Array com 10 perguntas de inglês
const questions = [
  {
    question: "What is the correct way to say 'eu sou estudante' in English?",
    options: ["I am a student", "I am student", "I student am", "A student I am"],
    answer: 0
  },
  {
    question: "Which one is the correct question form?",
    options: ["Do you like pizza?", "Like pizza you?", "Pizza do you like?", "You pizza like?"],
    answer: 0
  },
  {
    question: "What is the meaning of 'I am learning English'?",
    options: ["Eu estou aprendendo inglês", "Eu aprendi inglês", "Eu ensino inglês", "Eu amo inglês"],
    answer: 0
  },
  {
    question: "How do you say 'Onde você mora?' in English?",
    options: ["Where are you living?", "Where do you live?", "Where is you live?", "Where you live?"],
    answer: 1
  },
  {
    question: "Which sentence is in the past tense?",
    options: ["I will go to the store", "I went to the store", "I am going to the store", "I go to the store"],
    answer: 1
  },
  {
    question: "What is the plural of 'child'?",
    options: ["Childs", "Children", "Childes", "Childern"],
    answer: 1
  },
  {
    question: "Which one is the correct sentence in the future tense?",
    options: ["I am eat lunch", "I will eat lunch", "I ate lunch", "I eating lunch"],
    answer: 1
  },
  {
    question: "What does 'Can you help me?' mean?",
    options: ["Você pode me ajudar?", "Você me ajuda?", "Você pode ajudar eu?", "Você me ajudou?"],
    answer: 0
  },
  {
    question: "What is the correct way to say 'Eu gosto de estudar' in English?",
    options: ["I like study", "I like to study", "Study I like", "I like studying"],
    answer: 1
  },
  {
    question: "Which word is a verb?",
    options: ["Quickly", "Table", "Run", "Beautiful"],
    answer: 2
  }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

// Elementos da interface
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next");
const scoreElement = document.getElementById("score");
const quizContainer = document.getElementById("quiz-container");
const endScreen = document.getElementById("end-screen");
const finalMessageElement = document.getElementById("final-message");
const restartButton = document.getElementById("restart-button");

const quizTab = document.getElementById("quizTab");
const libraryTab = document.getElementById("libraryTab");
const libraryContainer = document.getElementById("library-container");

// Inicializa o botão "Próxima Pergunta" como desabilitado
nextButton.disabled = true;

// Carrega a pergunta atual
function loadQuestion() {
  selectedAnswer = null;
  nextButton.disabled = true;
  const currentQ = questions[currentQuestion];
  questionElement.textContent = currentQ.question;
  optionsElement.innerHTML = "";
  currentQ.options.forEach((option, index) => {
    const li = document.createElement("li");
    li.textContent = option;
    li.onclick = () => {
      if (nextButton.disabled) {
        checkAnswer(index);
      }
    };
    optionsElement.appendChild(li);
  });
}

// Verifica a resposta selecionada
function checkAnswer(selected) {
  const currentQ = questions[currentQuestion];
  if (selected === currentQ.answer) {
    score++;
  }
  scoreElement.textContent = score;
  selectedAnswer = selected;
  nextButton.disabled = false;
}

// Ação do botão "Próxima Pergunta"
nextButton.onclick = () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    endQuiz();
  }
};

// Finaliza o quiz e mostra a pontuação final com mensagem
function endQuiz() {
  quizContainer.style.display = "none";
  endScreen.style.display = "block";
  finalMessageElement.textContent = `Você terminou o quiz! Sua pontuação foi: ${score}/${questions.length}`;
}

// Reinicia o quiz
function restartQuiz() {
  score = 0;
  currentQuestion = 0;
  scoreElement.textContent = score;
  endScreen.style.display = "none";
  quizContainer.style.display = "block";
  loadQuestion();
}

// Função para iniciar o quiz
function startQuiz() {
  quizContainer.style.display = "block";
  libraryContainer.style.display = "none";
  endScreen.style.display = "none";
  loadQuestion();
}

// Eventos das abas
quizTab.onclick = () => {
  quizContainer.style.display = "block";
  libraryContainer.style.display = "none";
  endScreen.style.display = "none";
};
libraryTab.onclick = () => {
  libraryContainer.style.display = "block";
  quizContainer.style.display = "none";
  endScreen.style.display = "none";
};

// Evento do botão de reiniciar
restartButton.onclick = restartQuiz;

// Exibe o quiz inicialmente
startQuiz();
