import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";  
import { getFirestore, collection, addDoc, getDocs, updateDoc } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";  

const firebaseConfig = {  
  apiKey: "AIzaSyBCVGQk1Ctp1IZJrHQdM6YUSItaD3pypjg",  
  authDomain: "testspeakeasy.firebaseapp.com",  
  projectId: "testspeakeasy",  
  storageBucket: "testspeakeasy.appspot.com",  
  messagingSenderId: "732379388945",  
  appId: "1:732379388945:web:a46304dd51b10e2850e5b0",  
  measurementId: "G-WNB4XS2YJB"  
};  

const app = initializeApp(firebaseConfig);  
const db = getFirestore(app);

// Elementos da interface
const registerContainer = document.getElementById("register-container");
const menuContainer = document.getElementById("menu-container");
const quizContainer = document.getElementById("quiz-container");
const perguntasContainer = document.getElementById("perguntas-container");
const perguntasQuizContainer = document.getElementById("perguntas-quiz-container");
const libraryContainer = document.getElementById("library-container");
const rankingContainer = document.getElementById("ranking-container");
const endScreen = document.getElementById("end-screen");
const perguntasEndScreen = document.getElementById("perguntas-end-screen");

// Botões
const startButton = document.getElementById("start-button");
const btnQuiz = document.getElementById("btnQuiz");
const btnPerguntas = document.getElementById("btnPerguntas");
const btnLibrary = document.getElementById("btnLibrary");
const btnRanking = document.getElementById("btnRanking");
const btnFacil = document.getElementById("btnFacil");
const btnMedio = document.getElementById("btnMedio");
const btnDificil = document.getElementById("btnDificil");
const restartButton = document.getElementById("restart-button");
const perguntasRestartButton = document.getElementById("perguntas-restart-button");
const perguntasMenuButton = document.getElementById("perguntas-menu-button");

// Elementos do quiz
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");
const finalMessageElement = document.getElementById("final-message");
const errorListElement = document.getElementById("error-list");
const rankingList = document.getElementById("ranking-list");

// Elementos do quiz de perguntas
const perguntasQuestionElement = document.getElementById("perguntas-question");
const perguntasOptionsElement = document.getElementById("perguntas-options");
const perguntasScoreElement = document.getElementById("perguntas-score");
const perguntasTimerElement = document.getElementById("perguntas-timer");
const perguntasFinalMessageElement = document.getElementById("perguntas-final-message");
const perguntasErrorListElement = document.getElementById("perguntas-error-list");

// Botões de voltar
const backButtons = {
  quiz: document.getElementById("backButtonQuiz"),
  perguntas: document.getElementById("backButtonPerguntas"),
  perguntasQuiz: document.getElementById("backButtonPerguntasQuiz"),
  library: document.getElementById("backButtonLibrary"),
  ranking: document.getElementById("backButtonRanking"),
  endScreen: document.getElementById("backButtonEndScreen"),
  perguntasEndScreen: document.getElementById("backButtonPerguntasEndScreen")
};

// Configuração dos eventos dos botões de voltar
Object.values(backButtons).forEach(button => {
  if (button) {
    button.addEventListener('click', backToMenu);
  }
});

// Função atualizada para voltar ao menu (para garantir que os timers sejam parados)
function backToMenu() {
  stopTimer();
  stopPerguntasTimer();
  hideAllSections();
  menuContainer.style.display = "block";
}

function hideAllSections() {
  const sections = [
    registerContainer,
    quizContainer,
    perguntasContainer,
    perguntasQuizContainer,
    libraryContainer,
    rankingContainer,
    endScreen,
    perguntasEndScreen
  ];
  
  sections.forEach(section => {
    if (section) section.style.display = "none";
  });
}

// Perguntas do quiz (mais perguntas adicionadas)
let allQuestions = [
  { 
    question: "What is 'eu sou estudante' in English?", 
    options: ["I am a student", "I am student", "I student am", "A student I am"], 
    answer: 0,
    difficulty: "easy",
    libraryRef: "frases-basicas"
  },
  { 
    question: "Which one is correct?", 
    options: ["Do you like pizza?", "Like pizza you?", "Pizza do you like?", "You pizza like?"], 
    answer: 0,
    difficulty: "easy",
    libraryRef: "frases-basicas"
  },
  { 
    question: "What does 'I am learning English' mean?", 
    options: ["Eu estou aprendendo inglês", "Eu aprendi inglês", "Eu ensino inglês", "Eu amo inglês"], 
    answer: 0,
    difficulty: "medium",
    libraryRef: "frases-basicas"
  },
  { 
    question: "How do you say 'Onde você mora?' in English?", 
    options: ["Where are you living?", "Where do you live?", "Where is you live?", "Where you live?"], 
    answer: 1,
    difficulty: "medium",
    libraryRef: "frases-basicas"
  },
  { 
    question: "What is the plural of 'child'?", 
    options: ["Childs", "Children", "Childes", "Childern"], 
    answer: 1,
    difficulty: "hard",
    libraryRef: "verbos"
  },
  // Novas perguntas adicionadas:
  { 
    question: "How do you say 'bom dia' in English?", 
    options: ["Good morning", "Good evening", "Good night", "Hello"], 
    answer: 0,
    difficulty: "easy",
    libraryRef: "greetings"
  },
  {
    question: "What is the past tense of 'go'?",
    options: ["Go", "Went", "Gone", "Going"],
    answer: 1,
    difficulty: "easy",
    libraryRef: "verbos"
  },
  {
    question: "Which sentence is correct?",
    options: ["He don't like apples", "He doesn't like apples", "He like apples", "He doesn't likes apples"],
    answer: 1,
    difficulty: "medium",
    libraryRef: "grammar"
  },
  {
    question: "What does 'break a leg' mean?",
    options: ["Good luck", "Break your leg", "Run fast", "Don't trip"],
    answer: 0,
    difficulty: "medium",
    libraryRef: "idioms"
  }
];

let questions = [];
let perguntasQuestions = [];
let score = 0;
let perguntasScore = 0;
let currentQuestion = 0;
let currentPerguntaQuestion = 0;
let errors = [];
let perguntasErrors = [];
let quizTimer = 0;
let perguntasTimer = 0;
let timerInterval;
let perguntasTimerInterval;

// Funções do Quiz Principal
function getRandomQuestions() {
  const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 15);
}

function startTimer() {
  quizTimer = 0;
  timerElement.textContent = quizTimer;
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    quizTimer++;
    timerElement.textContent = quizTimer;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function loadQuestion() {
  if (currentQuestion < questions.length) {
    const q = questions[currentQuestion];
    questionElement.textContent = q.question;
    optionsElement.innerHTML = "";
    q.options.forEach((option, index) => {
      const li = document.createElement("li");
      li.textContent = option;
      li.addEventListener('click', () => checkAnswer(index));
      optionsElement.appendChild(li);
    });
  } else {
    endQuiz();
  }
}

function checkAnswer(selected) {
  const q = questions[currentQuestion];
  const options = optionsElement.querySelectorAll('li');
  
  options.forEach((option, index) => {
    option.classList.remove("correct", "wrong");
    if (index === q.answer) {
      option.classList.add("correct");
    } else if (index === selected) {
      option.classList.add("wrong");
    }
    option.style.pointerEvents = "none";
  });
  
  if (selected === q.answer) {
    score++;
    updateScore();
  } else {
    errors.push(`Pergunta: ${q.question} - Resposta correta: ${q.options[q.answer]}`);
  }
  
  setTimeout(() => {
    currentQuestion++;
    loadQuestion();
  }, 1500);
}

function updateScore() {
  scoreElement.textContent = score;
}

function endQuiz() {
  stopTimer();
  quizContainer.style.display = "none";
  endScreen.style.display = "block";
  finalMessageElement.textContent = `Pontuação Final: ${score}/15 | Tempo: ${quizTimer}s`;
  errorListElement.innerHTML = errors.map(err => `<li class="error-item">${err}</li>`).join("");
  const userName = document.getElementById("name").value;
  saveScore(userName, score, quizTimer);
}

// Funções do Quiz de Perguntas
function startPerguntasTimer() {
  perguntasTimer = 0;
  perguntasTimerElement.textContent = perguntasTimer;
  clearInterval(perguntasTimerInterval);
  perguntasTimerInterval = setInterval(() => {
    perguntasTimer++;
    perguntasTimerElement.textContent = perguntasTimer;
  }, 1000);
}

function stopPerguntasTimer() {
  clearInterval(perguntasTimerInterval);
}

function loadPerguntasQuestion() {
  if (currentPerguntaQuestion < perguntasQuestions.length) {
    const q = perguntasQuestions[currentPerguntaQuestion];
    perguntasQuestionElement.textContent = q.question;
    perguntasOptionsElement.innerHTML = "";
    q.options.forEach((option, index) => {
      const li = document.createElement("li");
      li.textContent = option;
      li.addEventListener('click', () => checkPerguntasAnswer(index));
      perguntasOptionsElement.appendChild(li);
    });
  } else {
    endPerguntasQuiz();
  }
}

function checkPerguntasAnswer(selected) {
  const q = perguntasQuestions[currentPerguntaQuestion];
  const options = perguntasOptionsElement.querySelectorAll('li');
  
  options.forEach((option, index) => {
    option.classList.remove("correct", "wrong");
    if (index === q.answer) {
      option.classList.add("correct");
    } else if (index === selected) {
      option.classList.add("wrong");
    }
    option.style.pointerEvents = "none";
  });
  
  if (selected === q.answer) {
    perguntasScore++;
    updatePerguntasScore();
  } else {
    perguntasErrors.push({
      question: q.question,
      correct: q.options[q.answer],
      libraryRef: q.libraryRef
    });
  }
  
  setTimeout(() => {
    currentPerguntaQuestion++;
    loadPerguntasQuestion();
  }, 1500);
}

function updatePerguntasScore() {
  perguntasScoreElement.textContent = perguntasScore;
}

function endPerguntasQuiz() {
  stopPerguntasTimer();
  perguntasQuizContainer.style.display = "none";
  perguntasEndScreen.style.display = "block";
  perguntasFinalMessageElement.textContent = `Pontuação Final: ${perguntasScore}/10 | Tempo: ${perguntasTimer}s`;
  
  perguntasErrorListElement.innerHTML = perguntasErrors.map(err => `
    <li class="error-item">
      ${err.question}<br>
      Resposta correta: ${err.correct}
      <button onclick="showLibrarySection('${err.libraryRef}')">Aprenda Mais</button>
    </li>
  `).join("");
}

window.showLibrarySection = function(sectionId) {
  hideAllSections();
  libraryContainer.style.display = "block";
  document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
};

// Inicia o Quiz de Perguntas por nível
function startPerguntasQuiz(difficulty) {
  perguntasQuestions = allQuestions
    .filter(q => q.difficulty === difficulty)
    .sort(() => Math.random() - 0.5)
    .slice(0, 10);
  
  perguntasScore = 0;
  currentPerguntaQuestion = 0;
  perguntasErrors = [];
  updatePerguntasScore();
  
  hideAllSections();
  perguntasQuizContainer.style.display = "block";
  startPerguntasTimer();
  loadPerguntasQuestion();
}

// Event Listeners
restartButton.addEventListener('click', () => {
  score = 0;
  currentQuestion = 0;
  errors = [];
  questions = getRandomQuestions();
  endScreen.style.display = "none";
  quizContainer.style.display = "block";
  updateScore();
  startTimer();
  loadQuestion();
});

perguntasRestartButton.addEventListener('click', () => {
  const currentDifficulty = perguntasQuestions[0]?.difficulty || 'easy';
  startPerguntasQuiz(currentDifficulty);
});

perguntasMenuButton.addEventListener('click', backToMenu);

btnQuiz.addEventListener('click', () => {
  hideAllSections();
  quizContainer.style.display = "block";
  questions = getRandomQuestions();
  score = 0;
  currentQuestion = 0;
  errors = [];
  updateScore();
  startTimer();
  loadQuestion();
});

btnPerguntas.addEventListener('click', () => {
  hideAllSections();
  perguntasContainer.style.display = "block";
});

btnFacil.addEventListener('click', () => startPerguntasQuiz('easy'));
btnMedio.addEventListener('click', () => startPerguntasQuiz('medium'));
btnDificil.addEventListener('click', () => startPerguntasQuiz('hard'));

btnLibrary.addEventListener('click', () => {
  hideAllSections();
  libraryContainer.style.display = "block";
});

btnRanking.addEventListener('click', async () => {
  hideAllSections();
  rankingContainer.style.display = "block";
  rankingList.innerHTML = "";
  const querySnapshot = await getDocs(collection(db, "users"));
  let users = [];
  querySnapshot.forEach(doc => {
    let userData = doc.data();
    users.push({ name: userData.name, score: userData.score || 0, time: userData.time || 9999 });
  });



users = users.filter(user => user.time !== 9999);


  users.sort((a, b) => {
    if(a.score === b.score) {
      return a.time - b.time;
    }
    return b.score - a.score;
  });
  users.forEach((user, index) => {
    const li = document.createElement("li");
    li.className = "animate-in";
    li.style.animationDelay = `${index * 0.1}s`;
    li.innerHTML = `<span>${index + 1}. ${user.name}</span><span>Pontos: ${user.score} | Tempo: ${user.time}s</span>`;
    rankingList.appendChild(li);
  });
});

// Lógica de cadastro
startButton.addEventListener("click", async () => {
  const name = document.getElementById("name").value;
  const number = document.getElementById("number").value;
  if (name && number) {
    try {
      await addDoc(collection(db, "users"), { name, number });
      registerContainer.style.display = "none";
      menuContainer.style.display = "block";
    } catch (error) {
      console.error("Erro ao salvar no Firestore: ", error);
    }
  } else {
    alert("Preencha todos os campos!");
  }
});

// Salva pontuação e tempo no Firestore
async function saveScore(userName, score, time) {
  const querySnapshot = await getDocs(collection(db, "users"));
  let userDoc;
  querySnapshot.forEach((doc) => {
    if (doc.data().name === userName) {
      userDoc = doc.ref;
    }
  });
  if (userDoc) {
    await updateDoc(userDoc, { score, time });
  }
}