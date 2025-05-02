import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, updateDoc } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

// Configuração Firebase
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

// Containers principais
const registerContainer      = document.getElementById("register-container");
const loginContainer         = document.getElementById("login-container");
const menuContainer          = document.getElementById("menu-container");
const quizContainer          = document.getElementById("quiz-container");
const perguntasContainer     = document.getElementById("perguntas-container");
const perguntasQuizContainer = document.getElementById("perguntas-quiz-container");
const libraryContainer       = document.getElementById("library-container");
const rankingContainer       = document.getElementById("ranking-container");
const endScreen              = document.getElementById("end-screen");
const perguntasEndScreen     = document.getElementById("perguntas-end-screen");
const spanishMenuContainer   = document.getElementById("spanish-menu-container");
const spanishQuizContainer   = document.getElementById("spanish-container");
const spanishEndScreen       = document.getElementById("spanish-end-screen");
const spanishLibraryContainer= document.getElementById("spanish-library-container");
const frenchMenuContainer    = document.getElementById("french-menu-container");
const frenchQuizContainer    = document.getElementById("french-container");
const frenchEndScreen        = document.getElementById("french-end-screen");
const frenchLibraryContainer = document.getElementById("french-library-container");
const resultsContainer       = document.getElementById("results-container");

// Elementos de cadastro/login
const startButton        = document.getElementById("start-button");
const loginButton        = document.getElementById("login-button");
const goLoginLink        = document.getElementById("go-login");
const goRegisterLink     = document.getElementById("go-register");

// Outros botões (menu, quiz, etc.)
const btnQuiz            = document.getElementById("btnQuiz");
const btnPerguntas       = document.getElementById("btnPerguntas");
const btnLibrary         = document.getElementById("btnLibrary");
const btnRanking         = document.getElementById("btnRanking");
const btnFacil           = document.getElementById("btnFacil");
const btnMedio           = document.getElementById("btnMedio");
const btnDificil         = document.getElementById("btnDificil");
const restartButton      = document.getElementById("restart-button");
const perguntasRestartButton = document.getElementById("perguntas-restart-button");
const perguntasMenuButton    = document.getElementById("perguntas-menu-button");
const btnSpanish         = document.getElementById("btnSpanish");
const btnSpanishQuiz     = document.getElementById("btnSpanishQuiz");
const btnSpanishLibrary  = document.getElementById("btnSpanishLibrary");
const backButtonSpanishMenu = document.getElementById("backButtonSpanishMenu");
const spanishRestartButton = document.getElementById("spanish-restart-button");
const spanishMenuButton    = document.getElementById("spanish-menu-button");
const btnFrench          = document.getElementById("btnFrench");
const btnFrenchQuiz      = document.getElementById("btnFrenchQuiz");
const btnFrenchLibrary   = document.getElementById("btnFrenchLibrary");
const backButtonFrenchMenu = document.getElementById("backButtonFrenchMenu");
const frenchRestartButton  = document.getElementById("french-restart-button");
const frenchMenuButton     = document.getElementById("french-menu-button");
const resultsButton        = document.getElementById("results-button");
const learnMoreButton      = document.getElementById("learn-more-button");
const backButtonResults    = document.getElementById("backButtonResults");

// Elementos do Quiz (inglês, perguntas, español, francês)
const questionElement       = document.getElementById("question");
const optionsElement        = document.getElementById("options");
const scoreElement          = document.getElementById("score");
const timerElement          = document.getElementById("timer");
const finalMessageElement   = document.getElementById("final-message");
const errorListElement      = document.getElementById("error-list");

const perguntasQuestionElement = document.getElementById("perguntas-question");
const perguntasOptionsElement  = document.getElementById("perguntas-options");
const perguntasScoreElement    = document.getElementById("perguntas-score");
const perguntasTimerElement    = document.getElementById("perguntas-timer");
const perguntasFinalMessageElement = document.getElementById("perguntas-final-message");
const perguntasErrorListElement    = document.getElementById("perguntas-error-list");

const spanishQuestionElement = document.getElementById("spanish-question");
const spanishOptionsElement  = document.getElementById("spanish-options");
const spanishScoreElement    = document.getElementById("spanish-score");
const spanishTimerElement    = document.getElementById("spanish-timer");
const spanishFinalMessageEl  = document.getElementById("spanish-final-message");
const spanishErrorListEl     = document.getElementById("spanish-error-list");

const frenchQuestionElement = document.getElementById("french-question");
const frenchOptionsElement  = document.getElementById("french-options");
const frenchScoreElement    = document.getElementById("french-score");
const frenchTimerElement    = document.getElementById("french-timer");
const frenchFinalMessageEl  = document.getElementById("french-final-message");
const frenchErrorListEl     = document.getElementById("french-error-list");

// Função genérica para esconder todas as seções
function hideAllSections() {
  [
    registerContainer, loginContainer, menuContainer,
    quizContainer, perguntasContainer, perguntasQuizContainer,
    libraryContainer, rankingContainer, endScreen, perguntasEndScreen,
    spanishMenuContainer, spanishQuizContainer, spanishEndScreen, spanishLibraryContainer,
    frenchMenuContainer, frenchQuizContainer, frenchEndScreen, frenchLibraryContainer,
    profileContainer, exercisesContainer, resultsContainer // Inclua o contêiner de resultados aqui
  ].forEach(sec => sec && (sec.style.display = "none"));
}

// Função para voltar ao menu
function backToMenu() {
  stopTimer(); stopPerguntasTimer(); stopSpanishTimer(); stopFrenchTimer();
  hideAllSections();
  menuContainer.style.display = "block";
}

// Conecta botões de voltar
[
  "backButtonQuiz", "backButtonPerguntas", "backButtonPerguntasQuiz",
  "backButtonLibrary", "backButtonRanking", "backButtonEndScreen", "backButtonPerguntasEndScreen",
  "backButtonSpanish", "backButtonSpanishLibrary", "backButtonSpanishEndScreen",
  "backButtonFrench", "backButtonFrenchLibrary", "backButtonFrenchEndScreen",
  "backButtonResults"
].forEach(id => {
  const btn = document.getElementById(id);
  if (btn) btn.addEventListener("click", backToMenu);
});

// --- CADASTRO ---
startButton.addEventListener("click", async () => {
  const nameInput = document.getElementById("name").value.trim();
  const passwordInput = document.getElementById("register-password").value.trim();
  if (!nameInput || !passwordInput) {
    alert("Por favor, preencha todos os campos!");
    return;
  }
  try {
    await addDoc(collection(db, "users"), {
      name: nameInput,
      password: passwordInput,
      score: 0,
      photoURL: "images/default.png"
    });
    hideAllSections();
    loginContainer.style.display = "block";
  } catch (err) {
    console.error(err);
    alert("Não foi possível cadastrar. Tente novamente.");
  }
});

// --- LOGIN ---
let currentUserName = ""; // Variável para armazenar o nome do usuário logado

// Atualiza o nome do usuário no menu
function updateUserName(name, photoURL = "images/default.png") {
  currentUserName = name;
  const userNameElement = document.getElementById("user-name");
  const userPhotoElement = document.getElementById("user-photo");

  if (userNameElement) {
    userNameElement.textContent = `Bem-vindo, ${name}!`;
  }
  if (userPhotoElement) {
    userPhotoElement.src = photoURL;
  }
}

// Verifica se é a primeira vez que o usuário faz login
function checkFirstTimeLogin() {
  const isFirstTime = localStorage.getItem("firstTimeLogin") === null;

  if (isFirstTime) {
    // Exibe o popup
    const popup = document.getElementById("first-time-popup");
    popup.style.display = "flex";

    // Botão "Ir para o Perfil"
    document.getElementById("go-to-profile").addEventListener("click", () => {
      popup.style.display = "none";
      hideAllSections();
      profileContainer.style.display = "block"; // Redireciona para o perfil
    });

    // Botão "Depois"
    document.getElementById("skip-profile").addEventListener("click", () => {
      popup.style.display = "none";
      menuContainer.style.display = "block"; // Redireciona para o menu principal
    });

    // Marca que o usuário já fez login pela primeira vez
    localStorage.setItem("firstTimeLogin", "false");
  } else {
    // Redireciona diretamente para o menu principal
    menuContainer.style.display = "block";
  }
}

// Modifique o login para atualizar o nome do usuário
loginButton.addEventListener("click", async () => {
  const loginName = document.getElementById("login-name").value.trim();
  const loginPassword = document.getElementById("login-password").value.trim();

  if (!loginName || !loginPassword) {
    alert("Por favor, preencha todos os campos!");
    return;
  }

  try {
    const snap = await getDocs(collection(db, "users"));
    let userFound = false;

    snap.forEach(doc => {
      const userData = doc.data();
      if (userData.name === loginName && userData.password === loginPassword) {
        userFound = true;
        updateUserName(loginName, userData.photoURL); // Atualiza o nome e a foto do usuário
        hideAllSections();
        checkFirstTimeLogin(); // Verifica se é a primeira vez que o usuário faz login
      }
    });

    if (!userFound) {
      alert("Dados de login incorretos! Tente novamente.");
    }
  } catch (err) {
    console.error("Erro no login:", err);
    alert("Erro ao efetuar login. Tente novamente.");
  }
});

// Exibir a tela de cadastro ao clicar em "Comece Agora"
document.getElementById("start-now").addEventListener("click", () => {
  document.getElementById("welcome-container").style.display = "none";
  document.getElementById("register-container").style.display = "block";
});

// Exibir a tela de login ao clicar em "Já Tenho uma Conta"
document.getElementById("login").addEventListener("click", () => {
  document.getElementById("welcome-container").style.display = "none";
  document.getElementById("login-container").style.display = "block";
});

// Alternar para a tela de login a partir da tela de cadastro
document.getElementById("go-login").addEventListener("click", () => {
  document.getElementById("register-container").style.display = "none";
  document.getElementById("login-container").style.display = "block";
});

// Alternar para a tela de cadastro a partir da tela de login
document.getElementById("go-register").addEventListener("click", () => {
  document.getElementById("login-container").style.display = "none";
  document.getElementById("register-container").style.display = "block";
});

// Navegação entre telas de cadastro e login
goLoginLink.addEventListener("click", () => {
  registerContainer.style.display = "none";
  loginContainer.style.display = "block";
});
goRegisterLink.addEventListener("click", () => {
  loginContainer.style.display = "none";
  registerContainer.style.display = "block";
});

// --- QUIZ INGLÊS ---
let questions = [], score = 0, currentQuestion = 0, errors = [], quizTimer = 0, timerInterval;
function getRandomQuestions() {
  return [...allQuestions].sort(() => Math.random() - 0.5).slice(0,15);
}
function startTimer() {
  quizTimer = 0; timerElement.textContent = quizTimer;
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    quizTimer++; timerElement.textContent = quizTimer;
  },1000);
}
function stopTimer() { clearInterval(timerInterval); }
function loadQuestion() {
  if (currentQuestion < questions.length) {
    const q = questions[currentQuestion];
    questionElement.textContent = q.question;
    optionsElement.innerHTML = "";
    q.options.forEach((opt,i)=>{
      const li = document.createElement("li");
      li.textContent = opt;
      li.addEventListener("click", ()=> checkAnswer(i));
      optionsElement.appendChild(li);
    });
  } else endQuiz();
}

// Modifique a função `checkAnswer` para registrar as perguntas erradas
function checkAnswer(sel) {
  const q = questions[currentQuestion];
  const opts = optionsElement.querySelectorAll("li");
  opts.forEach((li, i) => {
    li.classList.remove("correct", "wrong");
    if (i === q.answer) li.classList.add("correct");
    else if (i === sel) li.classList.add("wrong");
    li.style.pointerEvents = "none";
  });

  if (sel === q.answer) {
    score++;
    scoreElement.textContent = score;
  } else {
    errors.push({ question: q.question, selectedAnswer: q.options[sel] });
  }

  saveProgress(currentUserName, { questions, score, currentQuestion, errors, quizTimer });
  setTimeout(() => {
    currentQuestion++;
    loadQuestion();
  }, 1500);
}

// Função para exibir as questões erradas com o botão "Revisar"
function displayWrongAnswers() {
  const errorList = document.getElementById("error-list");
  errorList.innerHTML = ""; // Limpa a lista antes de adicionar os itens

  errors.forEach((error) => {
    const questionData = allQuestions.find((q) => q.question === error.question);

    if (questionData) {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
        <p><strong>Pergunta:</strong> ${questionData.question}</p>
        <p><strong>Resposta Correta:</strong> ${questionData.options[questionData.answer]}</p>
        <button class="review-button" onclick="showLibrarySection('${questionData.libraryRef}')">
          Revisar
        </button>
      `;
      errorList.appendChild(listItem);
    }
  });
}

// Função para navegar até a seção da biblioteca
function showLibrarySection(sectionId) {
  hideAllSections();
  libraryContainer.style.display = "block";
  document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
}

// Modifique a função `endQuiz` para exibir as questões erradas
function endQuiz() {
  stopTimer();
  quizContainer.style.display = "none";
  endScreen.style.display = "block";
  finalMessageElement.textContent = `Pontuação Final: ${score}/${questions.length} | Tempo: ${quizTimer}s`;

  // Exibe as questões erradas
  displayWrongAnswers();

  // Exibe mensagem motivacional
  showMotivationalMessage(score, questions.length);
}

// Adicione um novo contêiner para a aba de aviso no HTML
const quizWarningContainer = document.getElementById("quiz-warning-container");
const quizWarningMessage = document.getElementById("quiz-warning-message");
const quizWarningBackButton = document.getElementById("quiz-warning-back-button");

// Modifique o evento do botão do quiz principal
btnQuiz.addEventListener("click", async () => {
  hideAllSections();

  const savedProgress = await loadProgress(currentUserName);
  if (savedProgress) {
    // Exibir a aba de aviso
    quizWarningMessage.textContent = "Você já realizou este quiz. Você só pode fazê-lo uma vez.";
    quizWarningContainer.style.display = "block";
  } else {
    // Iniciar o quiz normalmente
    quizContainer.style.display = "block";
    questions = getRandomQuestions();
    score = 0;
    currentQuestion = 0;
    errors = [];
    quizTimer = 0;
    scoreElement.textContent = score;
    startTimer();
    loadQuestion();
  }
});

// Evento para o botão de voltar ao menu na aba de aviso
quizWarningBackButton.addEventListener("click", () => {
  quizWarningContainer.style.display = "none"; // Oculta a mensagem
  menuContainer.style.display = "block"; // Retorna ao menu principal
});

restartButton.addEventListener("click", ()=>{
  btnQuiz.click();
});

// --- QUIZ PERGUNTAS ---
let perguntasQuestions = [], perguntasScore = 0, currentPerguntaQuestion = 0, perguntasErrors = [], perguntasTimer = 0, perguntasTimerInterval;
function startPerguntasTimer() {
  perguntasTimer = 0; perguntasTimerElement.textContent = perguntasTimer;
  clearInterval(perguntasTimerInterval);
  perguntasTimerInterval = setInterval(()=>{
    perguntasTimer++; perguntasTimerElement.textContent = perguntasTimer;
  },1000);
}
function stopPerguntasTimer(){ clearInterval(perguntasTimerInterval); }
function loadPerguntasQuestion(){
  if (currentPerguntaQuestion < perguntasQuestions.length) {
    const q = perguntasQuestions[currentPerguntaQuestion];
    perguntasQuestionElement.textContent = q.question;
    perguntasOptionsElement.innerHTML = "";
    q.options.forEach((opt,i)=>{
      const li = document.createElement("li");
      li.textContent = opt;
      li.addEventListener("click", ()=> checkPerguntasAnswer(i));
      perguntasOptionsElement.appendChild(li);
    });
  } else endPerguntasQuiz();
}
function checkPerguntasAnswer(sel) {
  const q = perguntasQuestions[currentPerguntaQuestion];
  const opts = perguntasOptionsElement.querySelectorAll("li");
  opts.forEach((li,i)=>{
    li.classList.remove("correct","wrong");
    if (i === q.answer) li.classList.add("correct");
    else if (i === sel) li.classList.add("wrong");
    li.style.pointerEvents = "none";
  });
  if (sel === q.answer) { perguntasScore++; perguntasScoreElement.textContent = perguntasScore; }
  else perguntasErrors.push({ question: q.question, correct: q.options[q.answer], libraryRef: q.libraryRef });
  setTimeout(()=>{
    currentPerguntaQuestion++; loadPerguntasQuestion();
  },1500);
}
function endPerguntasQuiz() {
  stopPerguntasTimer();
  perguntasQuizContainer.style.display="none";
  perguntasEndScreen.style.display="block";
  perguntasFinalMessageElement.textContent = `Pontuação Final: ${perguntasScore}/${perguntasQuestions.length} | Tempo: ${perguntasTimer}s`;
  perguntasErrorListElement.innerHTML = perguntasErrors.map(err=>`
    <li class="error-item">
      ${err.question}<br>
      Resposta correta: ${err.correct}
      <button onclick="showLibrarySection('${err.libraryRef}')">Aprenda Mais</button>
    </li>
  `).join("");

  // Exibe mensagem motivacional
  showMotivationalMessage(perguntasScore, perguntasQuestions.length);
}
function startPerguntasQuiz(dif) {
  perguntasQuestions = allQuestions.filter(q=>q.difficulty===dif).sort(()=>Math.random()-0.5).slice(0,10);
  perguntasScore=0; currentPerguntaQuestion=0; perguntasErrors=[];
  perguntasScoreElement.textContent=perguntasScore;
  hideAllSections();
  perguntasQuizContainer.style.display="block";
  startPerguntasTimer();
  loadPerguntasQuestion();
}
btnPerguntas.addEventListener("click", ()=>{ hideAllSections(); perguntasContainer.style.display="block"; });
btnFacil.addEventListener("click", ()=> startPerguntasQuiz("easy"));
btnMedio.addEventListener("click", ()=> startPerguntasQuiz("medium"));
btnDificil.addEventListener("click", ()=> startPerguntasQuiz("hard"));
perguntasRestartButton.addEventListener("click", ()=> startPerguntasQuiz(perguntasQuestions[0]?.difficulty||"easy"));
perguntasMenuButton.addEventListener("click", backToMenu);

// --- BIBLIOTECA ---
btnLibrary.addEventListener("click", ()=>{ hideAllSections(); libraryContainer.style.display="block"; });
window.showLibrarySection = function(sectionId){
  hideAllSections();
  libraryContainer.style.display="block";
  document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
};

// --- RANKING ---
async function loadRanking() {
  const rankingList = document.getElementById("ranking-list");
  rankingList.innerHTML = ""; // Limpa o ranking atual

  try {
    const snap = await getDocs(collection(db, "users"));
    const users = [];

    snap.forEach(doc => {
      const userData = doc.data();
      if (userData.score !== undefined && userData.time !== undefined) {
        users.push(userData);
      }
    });

    // Ordena os usuários pela pontuação e tempo
    users.sort((a, b) => {
      if (b.score === a.score) {
        return a.time - b.time; // Menor tempo primeiro
      }
      return b.score - a.score; // Maior pontuação primeiro
    });

    // Preenche o pódio
    if (users[0]) {
      document.getElementById("top-1-photo").src = users[0].photoURL || "images/default.png";
      document.getElementById("top-1-name").textContent = users[0].name;
      document.getElementById("top-1-score").textContent = `${users[0].score} pontos`;
      document.getElementById("top-1-time").textContent = `${users[0].time}s`;
    }
    if (users[1]) {
      document.getElementById("top-2-photo").src = users[1].photoURL || "images/default.png";
      document.getElementById("top-2-name").textContent = users[1].name;
      document.getElementById("top-2-score").textContent = `${users[1].score} pontos`;
      document.getElementById("top-2-time").textContent = `${users[1].time}s`;
    }
    if (users[2]) {
      document.getElementById("top-3-photo").src = users[2].photoURL || "images/default.png";
      document.getElementById("top-3-name").textContent = users[2].name;
      document.getElementById("top-3-score").textContent = `${users[2].score} pontos`;
      document.getElementById("top-3-time").textContent = `${users[2].time}s`;
    }

    // Preenche o restante do ranking
    users.slice(3).forEach((user, index) => {
      const listItem = document.createElement("li");
      listItem.classList.add("ranking-item");
      listItem.innerHTML = `
        <div class="ranking-photo-container">
          <img src="${user.photoURL || 'images/default.png'}" alt="Foto de Perfil" class="ranking-photo"/>
        </div>
        <span>${index + 4}. ${user.name}</span>
        <span>${user.score} pontos - ${user.time}s</span>
      `;
      rankingList.appendChild(listItem);
    });
  } catch (err) {
    console.error("Erro ao carregar o ranking:", err);
  }
}

// Evento para exibir o ranking ao clicar no botão
btnRanking.addEventListener("click", () => {
  hideAllSections();
  loadRanking();
  document.getElementById("ranking-container").style.display = "block";
});

// --- QUIZ ESPAÑOL ---
let spanishQuestions = [], spanishScore = 0, currentSpanishQuestion = 0, spanishErrors = [], spanishTimer = 0, spanishTimerInterval;
function getRandomSpanishQuestions() {
  const all = [
    { question: "¿Cómo se dice 'Olá' en español?", options: ["Hola", "Adiós", "Gracias", "Por favor"], answer: 0 },
    { question: "¿Qué significa 'Adeus' en español?", options: ["Hola", "Adiós", "Buenas noches", "Gracias"], answer: 1 },
    { question: "¿Cómo se dice 'Obrigado' en español?", options: ["Por favor", "Gracias", "De nada", "Perdón"], answer: 1 },
    { question: "¿Cuál es el plural de 'amigo'?", options: ["Amigos", "Amigas", "Amigoes", "Amigues"], answer: 0 },
    { question: "¿Cómo se dice 'Eu estou aprendendo espanhol' en español?", options: ["Estoy aprendiendo español", "Aprendo español", "Yo español aprendo", "Aprendiendo estoy español"], answer: 0 },
    { question: "¿Qué significa 'Bom dia' en español?", options: ["Buenas noches", "Buenos días", "Buenas tardes", "Hola"], answer: 1 },
    { question: "¿Cómo se dice 'Eu gosto de comer maçãs' en español?", options: ["Me gusta comer manzanas", "Yo como manzanas", "Me gusta manzanas", "Comer manzanas me gusta"], answer: 0 },
    { question: "¿Qué significa 'Onde você mora?' en español?", options: ["¿Dónde vives?", "¿Cómo estás?", "¿Cuál es tu nombre?", "¿Qué haces?"], answer: 0 },
    { question: "¿Cómo se dice 'Que horas são?' en español?", options: ["¿Qué hora es?", "¿Dónde está?", "¿Cómo estás?", "¿Qué haces?"], answer: 0 },
    { question: "¿Qué significa 'Por favor'?", options: ["Gracias", "Por favor", "Disculpe", "De nada"], answer: 1 },
    { question: "¿Cómo se dice 'Eu sou professor' en español?", options: ["Soy profesor", "Yo soy profesor", "Profesor soy", "Soy un profesor"], answer: 0 },
    { question: "¿Qué significa 'De nada'?", options: ["De nada", "Gracias", "Disculpe", "Por favor"], answer: 0 },
    { question: "¿Cómo se dice 'Eu estou feliz' en español?", options: ["Estoy feliz", "Yo feliz", "Soy feliz", "Feliz estoy"], answer: 0 },
    { question: "¿Qué significa 'Qual é o seu nome?' en español?", options: ["¿Cómo te llamas?", "¿Cómo estás?", "¿Dónde vives?", "¿Qué haces?"], answer: 0 },
    { question: "¿Cómo se dice 'Eu estou cansado' en español?", options: ["Estoy cansado", "Yo cansado", "Soy cansado", "Cansado estoy"], answer: 0 },
    { question: "¿Qué significa 'O que você faz?' en español?", options: ["¿Qué haces?", "¿Dónde estás?", "¿Cómo estás?", "¿Cuál es tu nombre?"], answer: 0 },
    { question: "¿Cómo se dice 'Eu gosto de ler livros' en español?", options: ["Me gusta leer libros", "Yo leo libros", "Me gusta libros", "Leer libros me gusta"], answer: 0 },
    { question: "¿Qué significa 'Quanto custa?' en español?", options: ["¿Cuánto cuesta?", "¿Dónde está?", "¿Cómo estás?", "¿Qué haces?"], answer: 0 },
    { question: "¿Cómo se dice 'Eu estou aprendendo' en español?", options: ["Estoy aprendiendo", "Yo aprendo", "Aprendiendo estoy", "Aprendo"], answer: 0 },
    { question: "¿Qué significa 'Que horas são?' en español?", options: ["¿Qué hora es?", "¿Dónde estás?", "¿Cómo estás?", "¿Qué haces?"], answer: 0 },
    { question: "¿Cómo se dice 'Eu estou com fome' en español?", options: ["Tengo hambre", "Yo hambre", "Soy hambre", "Hambre tengo"], answer: 0 },
    { question: "¿Qué significa 'Você pode me ajudar?' en español?", options: ["¿Puedes ayudarme?", "¿Dónde estás?", "¿Cómo estás?", "¿Qué haces?"], answer: 0 },
    { question: "¿Cómo se dice 'Eu estou com sede' en español?", options: ["Tengo sed", "Yo sed", "Soy sed", "Sed tengo"], answer: 0 },
    { question: "¿Qué significa 'Onde fica o banheiro?' en español?", options: ["¿Dónde está el baño?", "¿Cómo estás?", "¿Qué haces?", "¿Dónde vives?"], answer: 0 },
    { question: "¿Cómo se dice 'Eu estou com frio' en español?", options: ["Tengo frío", "Yo frío", "Soy frío", "Frío tengo"], answer: 0 },
    { question: "¿Qué significa 'O que você quer comer?' en español?", options: ["¿Qué quieres comer?", "¿Dónde estás?", "¿Cómo estás?", "¿Qué haces?"], answer: 0 },
    { question: "¿Cómo se dice 'Eu estou com calor' en español?", options: ["Tengo calor", "Yo calor", "Soy calor", "Calor tengo"], answer: 0 },
    { question: "¿Qué significa 'O que você quer beber?' en español?", options: ["¿Qué quieres beber?", "¿Dónde estás?", "¿Cómo estás?", "¿Qué haces?"], answer: 0 },
    { question: "¿Cómo se dice 'Eu estou estudando' en español?", options: ["Estoy estudiando", "Yo estudio", "Estudiando estoy", "Estudio"], answer: 0 },
    { question: "¿Qué significa 'O que você está fazendo?' en español?", options: ["¿Qué estás haciendo?", "¿Dónde estás?", "¿Cómo estás?", "¿Qué haces?"], answer: 0 },
    { question: "¿Cómo se dice 'Eu estou trabalhando' en español?", options: ["Estoy trabajando", "Yo trabajo", "Trabajando estoy", "Trabajo"], answer: 0 },
    { question: "¿Qué significa 'Onde você trabalha?' en español?", options: ["¿Dónde trabajas?", "¿Cómo estás?", "¿Qué haces?", "¿Dónde vives?"], answer: 0 }
  ];
  return [...all].sort(() => Math.random() - 0.5).slice(0, 15);
}
function startSpanishTimer() {
  spanishTimer=0; spanishTimerElement.textContent=spanishTimer;
  clearInterval(spanishTimerInterval);
  spanishTimerInterval=setInterval(()=>{
    spanishTimer++; spanishTimerElement.textContent=spanishTimer;
  },1000);
}
function stopSpanishTimer(){ clearInterval(spanishTimerInterval); }
function loadSpanishQuestion() {
  if (currentSpanishQuestion < spanishQuestions.length) {
    const q = spanishQuestions[currentSpanishQuestion];
    spanishQuestionElement.textContent = q.question;
    spanishOptionsElement.innerHTML = "";
    q.options.forEach((opt,i)=>{
      const li=document.createElement("li");
      li.textContent=opt;
      li.addEventListener("click", ()=> spanishCheckAnswer(i));
      spanishOptionsElement.appendChild(li);
    });
  } else endSpanishQuiz();
}
function spanishCheckAnswer(sel) {
  const q=spanishQuestions[currentSpanishQuestion];
  const opts=spanishOptionsElement.querySelectorAll("li");
  opts.forEach((li,i)=>{
    li.classList.remove("correct","wrong");
    if (i===q.answer) li.classList.add("correct");
    else if (i===sel) li.classList.add("wrong");
    li.style.pointerEvents="none";
  });
  if (sel===q.answer) { spanishScore++; spanishScoreElement.textContent=spanishScore; }
  else spanishErrors.push(`Pregunta: ${q.question} - Respuesta: ${q.options[q.answer]}`);
  setTimeout(()=>{
    currentSpanishQuestion++; loadSpanishQuestion();
  },1500);
}
function endSpanishQuiz() {
  stopSpanishTimer();
  spanishQuizContainer.style.display="none";
  spanishEndScreen.style.display="block";
  spanishFinalMessageEl.textContent = `Puntuación Final: ${spanishScore}/${spanishQuestions.length} | Tiempo: ${spanishTimer}s`;
  spanishErrorListEl.innerHTML = spanishErrors.map(e=>`
    <li class="error-item">
      ${e}<br>
      <button class="aprenda-mais-button" onclick="showLibrarySectionSpanish()">Aprenda Mais</button>
    </li>
  `).join("");

  // Exibe mensagem motivacional
  showMotivationalMessage(spanishScore, spanishQuestions.length);
}
window.showLibrarySectionSpanish = function() {
  hideAllSections();
  spanishLibraryContainer.style.display="block";
}
btnSpanish.addEventListener("click", ()=>{ hideAllSections(); spanishMenuContainer.style.display="block"; });
btnSpanishQuiz.addEventListener("click", ()=>{
  hideAllSections(); spanishQuizContainer.style.display="block";
  spanishQuestions = getRandomSpanishQuestions();
  spanishScore=0; currentSpanishQuestion=0; spanishErrors=[];
  spanishScoreElement.textContent=spanishScore;
  startSpanishTimer(); loadSpanishQuestion();
});
btnSpanishLibrary.addEventListener("click", ()=>{ hideAllSections(); spanishLibraryContainer.style.display="block"; });
backButtonSpanishMenu.addEventListener("click", backToMenu);
spanishRestartButton.addEventListener("click", ()=>{
  btnSpanishQuiz.click();
});
spanishMenuButton.addEventListener("click", backToMenu);

// --- QUIZ FRANÇAIS ---
let frenchQuestions = [], frenchScore = 0, currentFrenchQuestion = 0, frenchErrors = [], frenchTimer = 0, frenchTimerInterval;
function getRandomFrenchQuestions() {
  const all = [
    { question: "Comment dit-on 'Hello' en français?", options: ["Bonjour", "Au revoir", "Merci", "S'il vous plaît"], answer: 0 },
    { question: "Que signifie 'Goodbye' en français?", options: ["Bonjour", "Au revoir", "Bonne nuit", "Merci"], answer: 1 },
    { question: "Comment dit-on 'Thank you' en français?", options: ["S'il vous plaît", "Merci", "De rien", "Pardon"], answer: 1 },
    { question: "Quel est le pluriel de 'ami'?", options: ["Amis", "Amies", "Ami(e)s", "Ami"], answer: 0 },
    { question: "Comment dit-on 'I am learning French' en français?", options: ["J'apprends le français", "Je français apprends", "J'apprendrai le français", "Je suis en train d'apprendre le français"], answer: 0 },
    { question: "Que signifie 'Bonne nuit' en français?", options: ["Good night", "Good morning", "Goodbye", "Good evening"], answer: 0 },
    { question: "Comment dit-on 'Je suis fatigué' en français?", options: ["Je suis fatigué", "Je suis heureux", "Je suis triste", "Je suis en colère"], answer: 0 },
    { question: "Que signifie 'Où habitez-vous?' en français?", options: ["Where do you live?", "How are you?", "What is your name?", "What do you do?"], answer: 0 },
    { question: "Comment dit-on 'Je voudrais un café' en français?", options: ["I would like a coffee", "I want a coffee", "I need a coffee", "I drink a coffee"], answer: 0 },
    { question: "Que signifie 'Quelle heure est-il?' en français?", options: ["What time is it?", "Where are you?", "How are you?", "What are you doing?"], answer: 0 },
    { question: "Comment dit-on 'Je suis étudiant' en français?", options: ["I am a student", "I am a teacher", "I am a worker", "I am a doctor"], answer: 0 },
    { question: "Que signifie 'Merci beaucoup' en français?", options: ["Thank you very much", "You're welcome", "Please", "Excuse me"], answer: 0 },
    { question: "Comment dit-on 'Je suis heureux' en français?", options: ["I am happy", "I am sad", "I am tired", "I am angry"], answer: 0 },
    { question: "Que signifie 'Quel est votre nom?' en français?", options: ["What is your name?", "How are you?", "Where do you live?", "What do you do?"], answer: 0 },
    { question: "Comment dit-on 'Je suis en colère' en français?", options: ["I am angry", "I am happy", "I am sad", "I am tired"], answer: 0 }
  ];
  return [...all].sort(() => Math.random() - 0.5).slice(0, 15);
}
function startFrenchTimer() {
  frenchTimer=0; frenchTimerElement.textContent=frenchTimer;
  clearInterval(frenchTimerInterval);
  frenchTimerInterval=setInterval(()=>{
    frenchTimer++; frenchTimerElement.textContent=frenchTimer;
  },1000);
}
function stopFrenchTimer(){ clearInterval(frenchTimerInterval); }
function loadFrenchQuestion() {
  if (currentFrenchQuestion < frenchQuestions.length) {
    const q = frenchQuestions[currentFrenchQuestion];
    frenchQuestionElement.textContent = q.question;
    frenchOptionsElement.innerHTML = "";
    q.options.forEach((opt,i)=>{
      const li=document.createElement("li");
      li.textContent=opt;
      li.addEventListener("click", ()=> frenchCheckAnswer(i));
      frenchOptionsElement.appendChild(li);
    });
  } else endFrenchQuiz();
}
function frenchCheckAnswer(sel) {
  const q=frenchQuestions[currentFrenchQuestion];
  const opts=frenchOptionsElement.querySelectorAll("li");
  opts.forEach((li,i)=>{
    li.classList.remove("correct","wrong");
    if (i===q.answer) li.classList.add("correct");
    else if (i===sel) li.classList.add("wrong");
    li.style.pointerEvents="none";
  });
  if (sel===q.answer) { frenchScore++; frenchScoreElement.textContent=frenchScore; }
  else frenchErrors.push(`Question: ${q.question} - Réponse: ${q.options[q.answer]}`);
  setTimeout(()=>{
    currentFrenchQuestion++; loadFrenchQuestion();
  },1500);
}
function endFrenchQuiz() {
  stopFrenchTimer();
  frenchQuizContainer.style.display="none";
  frenchEndScreen.style.display="block";
  frenchFinalMessageEl.textContent = `Score Final: ${frenchScore}/${frenchQuestions.length} | Temps: ${frenchTimer}s`;
  frenchErrorListEl.innerHTML = frenchErrors.map(e=>`
    <li class="error-item">
      ${e}<br>
      <button class="aprenda-mais-button" onclick="showLibrarySectionFrench()">En savoir plus</button>
    </li>
  `).join("");

  // Exibe mensagem motivacional
  showMotivationalMessage(frenchScore, frenchQuestions.length);
}
window.showLibrarySectionFrench = function() {
  hideAllSections();
  frenchLibraryContainer.style.display="block";
}
btnFrench.addEventListener("click", ()=>{ hideAllSections(); frenchMenuContainer.style.display="block"; });
btnFrenchQuiz.addEventListener("click", ()=>{
  hideAllSections(); frenchQuizContainer.style.display="block";
  frenchQuestions = getRandomFrenchQuestions();
  frenchScore=0; currentFrenchQuestion=0; frenchErrors=[];
  frenchScoreElement.textContent=frenchScore;
  startFrenchTimer(); loadFrenchQuestion();
});
btnFrenchLibrary.addEventListener("click", ()=>{ hideAllSections(); frenchLibraryContainer.style.display="block"; });
backButtonFrenchMenu.addEventListener("click", backToMenu);
frenchRestartButton.addEventListener("click", ()=> btnFrenchQuiz.click());
frenchMenuButton.addEventListener("click", backToMenu);

// --- SALVAR PONTUAÇÃO ---
async function saveScore(userName, score, time) {
  const snap = await getDocs(collection(db,"users"));
  let userDoc = null;
  snap.forEach(doc=>{
    if (doc.data().name === userName) userDoc = doc.ref;
  });
  if (userDoc) {
    await updateDoc(userDoc, { score, time });
  }
}

// Alterna a visualização do conteúdo da Biblioteca (expansível)
document.addEventListener("DOMContentLoaded", () => {
  const headers = document.querySelectorAll(".text-card .text-header");
  headers.forEach(header => {
    header.addEventListener("click", () => {
      const content = header.nextElementSibling;
      content.classList.toggle("active");
    });
  });
});

// Lista de perguntas fixa
const allQuestions = [
  { question: "What does 'Burn the midnight oil' mean?", options: ["Work late into the night", "Waste time", "Sleep early", "Take a break"], answer: 0, difficulty: "hard", libraryRef: "idioms-advanced" },
  { question: "Which sentence uses the Present Perfect tense?", options: ["I have been to Paris", "I went to Paris", "I am going to Paris", "I will go to Paris"], answer: 0, difficulty: "hard", libraryRef: "verb-tenses" },
  { question: "What is the correct translation of 'Artificial Intelligence'?", options: ["Inteligência artificial", "Inteligência natural", "Inteligência computacional", "Inteligência humana"], answer: 0, difficulty: "hard", libraryRef: "technical-vocabulary" },
  { question: "Which sentence is grammatically correct?", options: ["She don't like apples", "She doesn't likes apples", "She doesn't like apples", "She not like apples"], answer: 2, difficulty: "hard", libraryRef: "grammar" },
  { question: "What does 'Throw in the towel' mean?", options: ["To give up", "To start a fight", "To clean something", "To win a competition"], answer: 0, difficulty: "hard", libraryRef: "idioms-advanced" },
  { question: "Which is an example of Future Perfect tense?", options: ["I will have finished the project by tomorrow", "I am finishing the project now", "I finished the project yesterday", "I will finish the project tomorrow"], answer: 0, difficulty: "hard", libraryRef: "verb-tenses" },
  { question: "What is the plural of 'crisis'?", options: ["Crises", "Crisis", "Crisises", "Criseses"], answer: 0, difficulty: "hard", libraryRef: "vocabulary" },
  { question: "What does 'Hit the nail on the head' mean?", options: ["To be exactly right", "To make a mistake", "To fix something", "To hurt someone"], answer: 0, difficulty: "hard", libraryRef: "idioms-advanced" },
  { question: "What is the meaning of 'Serendipity'?", options: ["A fortunate discovery", "A mistake", "A coincidence", "A disaster"], answer: 0, difficulty: "hard", libraryRef: "vocabulary" },
  { question: "Which sentence uses the Past Perfect tense?", options: ["She had finished her homework before dinner", "She finished her homework before dinner", "She finishes her homework before dinner", "She is finishing her homework before dinner"], answer: 0, difficulty: "hard", libraryRef: "verb-tenses" },
  { question: "What does 'A blessing in disguise' mean?", options: ["A hidden benefit", "A visible problem", "A curse", "A mistake"], answer: 0, difficulty: "hard", libraryRef: "idioms-advanced" },
  { question: "What is the correct form of the verb 'to be' in the sentence: 'He ___ a doctor.'?", options: ["is", "are", "am", "be"], answer: 0, difficulty: "medium", libraryRef: "grammar" },
  { question: "What does 'Cutting corners' mean?", options: ["Doing something poorly to save time or money", "Taking a shortcut", "Avoiding work", "Completing a task perfectly"], answer: 0, difficulty: "hard", libraryRef: "idioms-advanced" },
  { question: "What is the meaning of 'Eureka'?", options: ["I found it", "I lost it", "I broke it", "I fixed it"], answer: 0, difficulty: "hard", libraryRef: "vocabulary" },
  { question: "Which sentence uses the Present Continuous tense?", options: ["They are studying for the exam", "They study for the exam", "They studied for the exam", "They will study for the exam"], answer: 0, difficulty: "medium", libraryRef: "verb-tenses" },
  { question: "What does 'The ball is in your court' mean?", options: ["It's your decision now", "The game is over", "You lost the opportunity", "You need to wait"], answer: 0, difficulty: "hard", libraryRef: "idioms-advanced" },
  { question: "What is the plural of 'phenomenon'?", options: ["Phenomena", "Phenomenons", "Phenomenas", "Phenomenon"], answer: 0, difficulty: "hard", libraryRef: "vocabulary" },
  { question: "What does 'To kill two birds with one stone' mean?", options: ["To achieve two goals with one action", "To fail twice", "To waste time", "To make a mistake"], answer: 0, difficulty: "hard", libraryRef: "idioms-advanced" },
  { question: "Which sentence uses the Future Perfect tense?", options: ["By next year, I will have graduated", "I will graduate next year", "I am graduating next year", "I graduated last year"], answer: 0, difficulty: "hard", libraryRef: "verb-tenses" },
  { question: "What does 'To bite off more than you can chew' mean?", options: ["To take on more than you can handle", "To eat too much", "To make a mistake", "To give up"], answer: 0, difficulty: "hard", libraryRef: "idioms-advanced" },
  { question: "What is 'eu sou estudante' in English?", options: ["I am student", "A student I am", "I student am", "I am a student"], answer: 3, difficulty: "easy", libraryRef: "frases-basicas" },
  { question: "Which one is correct?", options: ["Pizza do you like?", "Do you like pizza?", "Like pizza you?", "You pizza like?"], answer: 1, difficulty: "easy", libraryRef: "frases-basicas" },
  { question: "What does 'I am learning English' mean?", options: ["Eu aprendi inglês", "Eu estou aprendendo inglês", "Eu ensino inglês", "Eu amo inglês"], answer: 1, difficulty: "medium", libraryRef: "frases-basicas" },
  { question: "How do you say 'Onde você mora?' in English?", options: ["Where do you live?", "Where is you live?", "Where you live?", "Where are you living?"], answer: 0, difficulty: "medium", libraryRef: "frases-basicas" },
  { question: "What is the plural of 'child'?", options: ["Children", "Childs", "Childes", "Childern"], answer: 0, difficulty: "hard", libraryRef: "verbos" },
  { question: "How do you say 'bom dia' in English?", options: ["Good night", "Good morning", "Hello", "Good evening"], answer: 1, difficulty: "easy", libraryRef: "greetings" },
  { question: "What is the past tense of 'go'?", options: ["Going", "Went", "Gone", "Go"], answer: 1, difficulty: "easy", libraryRef: "verbos" },
  { question: "Which sentence is correct?", options: ["He doesn't likes apples", "He don't like apples", "He like apples", "He doesn't like apples"], answer: 3, difficulty: "medium", libraryRef: "grammar" },
  { question: "What does 'break a leg' mean?", options: ["Run fast", "Don't trip", "Break your leg", "Good luck"], answer: 3, difficulty: "medium", libraryRef: "idioms" },
  { question: "How do you say 'obrigado' in English?", options: ["Thanks", "Hello", "Sorry", "Please"], answer: 0, difficulty: "easy", libraryRef: "greetings" },
  { question: "Which is the correct form of the verb 'to be' for 'they'?", options: ["are", "am", "is", "be"], answer: 0, difficulty: "easy", libraryRef: "verbos" },
  { question: "What does 'How old are you?' mean?", options: ["Como você está?", "Onde você mora?", "Qual é o seu nome?", "Quantos anos você tem?"], answer: 3, difficulty: "medium", libraryRef: "frases-basicas" },
  { question: "How do you say 'Estou com fome' in English?", options: ["I'm cold", "I'm tired", "I'm happy", "I'm hungry"], answer: 3, difficulty: "medium", libraryRef: "frases-basicas" },
  { question: "What is the past tense of 'eat'?", options: ["Eating", "Eated", "Ate", "Eat"], answer: 2, difficulty: "hard", libraryRef: "verbos" },
  { question: "Which one is a correct question?", options: ["What it is time?", "What is time it?", "It is what time?", "What time is it?"], answer: 3, difficulty: "medium", libraryRef: "grammar" },
  { question: "What does 'It's raining cats and dogs' mean?", options: ["Está chovendo pouco", "Animais estão caindo", "Chuva de gatos", "Está chovendo muito"], answer: 3, difficulty: "hard", libraryRef: "idioms" },
  { question: "How do you say 'Estou cansado' in English?", options: ["I'm sad", "I'm bored", "I'm tired", "I'm sleepy"], answer: 2, difficulty: "easy", libraryRef: "frases-basicas" },
  { question: "What is the opposite of 'hot'?", options: ["Boiling", "Cool", "Cold", "Warm"], answer: 2, difficulty: "easy", libraryRef: "vocabulary" },
  { question: "Which sentence uses the present continuous?", options: ["I am eating", "I eat now", "I eats", "I will eat"], answer: 0, difficulty: "medium", libraryRef: "grammar" },
  { question: "What is the plural of 'mouse'?", options: ["Mices", "Mice", "Mouse", "Mouses"], answer: 1, difficulty: "hard", libraryRef: "vocabulary" },
  { question: "How do you say 'Qual é o seu nome?' in English?", options: ["What is your name?", "How are you?", "Where are you from?", "Who are you?"], answer: 0, difficulty: "easy", libraryRef: "frases-basicas" },
  { question: "Which one is a verb?", options: ["Run", "Fast", "Blue", "Happy"], answer: 0, difficulty: "easy", libraryRef: "verbos" },
  { question: "Complete: She ___ going to school.", options: ["be", "is", "am", "are"], answer: 1, difficulty: "medium", libraryRef: "grammar" },
  { question: "What does 'piece of cake' mean?", options: ["Um pedaço de bolo", "Algo caro", "Muito fácil", "Muito difícil"], answer: 2, difficulty: "hard", libraryRef: "idioms" },
  { question: "How do you say 'Eu não entendo' in English?", options: ["Not I understand", "I understand not", "I don't understand", "I no understand"], answer: 2, difficulty: "easy", libraryRef: "frases-basicas" },
  { question: "What is the opposite of 'early'?", options: ["Now", "Fast", "Soon", "Late"], answer: 3, difficulty: "medium", libraryRef: "vocabulary" },
  { question: "Which is a correct negative sentence?", options: ["She no likes coffee", "She doesn't like coffee", "She don't like coffee", "She not like coffee"], answer: 1, difficulty: "medium", libraryRef: "grammar" },
  { question: "How do you say 'Eu gosto de música' in English?", options: ["I like music", "I like of music", "I music like", "I likes music"], answer: 0, difficulty: "easy", libraryRef: "frases-basicas" },
  { question: "What is the correct past tense of 'have'?", options: ["Haved", "Has", "Had", "Have"], answer: 2, difficulty: "medium", libraryRef: "verbos" },
  { question: "What is the synonym of 'fast'?", options: ["Quick", "Slow", "Big", "Small"], answer: 0, difficulty: "easy", libraryRef: "vocabulary" },
  { question: "What is the antonym of 'happy'?", options: ["Sad", "Joyful", "Excited", "Angry"], answer: 0, difficulty: "easy", libraryRef: "vocabulary" },
  { question: "What is the plural of 'tooth'?", options: ["Teeth", "Tooths", "Toothes", "Teeths"], answer: 0, difficulty: "medium", libraryRef: "vocabulary" },
  { question: "What is the past tense of 'run'?", options: ["Ran", "Running", "Runned", "Run"], answer: 0, difficulty: "medium", libraryRef: "verbos" },
  { question: "What is the opposite of 'cold'?", options: ["Hot", "Warm", "Cool", "Freezing"], answer: 0, difficulty: "easy", libraryRef: "vocabulary" },
  { question: "What does 'break the ice' mean?", options: ["Start a conversation", "Destroy something", "Cool down", "Make a mistake"], answer: 0, difficulty: "medium", libraryRef: "idioms" },
  { question: "What is the meaning of 'cat'?", options: ["An animal", "A fruit", "A color", "A tool"], answer: 0, difficulty: "easy", libraryRef: "vocabulary" },
  { question: "What is the capital of Canada?", options: ["Ottawa", "Toronto", "Vancouver", "Montreal"], answer: 0, difficulty: "medium", libraryRef: "geography" },
  { question: "What is the opposite of 'strong'?", options: ["Weak", "Powerful", "Big", "Fast"], answer: 0, difficulty: "easy", libraryRef: "vocabulary" },
  { question: "What is the meaning of 'red'?", options: ["A color", "A fruit", "A number", "A shape"], answer: 0, difficulty: "easy", libraryRef: "vocabulary" },
  { question: "What is the plural of 'fish'?", options: ["Fish", "Fishes", "Fishs", "Fishies"], answer: 0, difficulty: "medium", libraryRef: "vocabulary" },
  { question: "What is the past tense of 'see'?", options: ["Saw", "Seen", "Seeing", "See"], answer: 0, difficulty: "medium", libraryRef: "verbos" },
  { question: "What is the synonym of 'smart'?", options: ["Intelligent", "Dumb", "Slow", "Lazy"], answer: 0, difficulty: "easy", libraryRef: "vocabulary" },
  { question: "What is the opposite of 'day'?", options: ["Night", "Morning", "Evening", "Afternoon"], answer: 0, difficulty: "easy", libraryRef: "vocabulary" },
  { question: "What is the meaning of 'dog'?", options: ["An animal", "A fruit", "A color", "A tool"], answer: 0, difficulty: "easy", libraryRef: "vocabulary" },
];

// Adicionando funcionalidade de redefinição de senha
const resetPasswordButton = document.getElementById("reset-password-button");
if (resetPasswordButton) {
  resetPasswordButton.addEventListener("click", async () => {
    const loginName = document.getElementById("login-name").value.trim();
    if (!loginName) {
      alert("Por favor, insira seu nome para redefinir a senha.");
      return;
    }
    try {
      const snap = await getDocs(collection(db, "users"));
      let userFound = false;
      snap.forEach(doc => {
        if (doc.data().name === loginName) {
          userFound = true;
          const newPassword = prompt("Digite sua nova senha:");
          if (newPassword) {
            updateDoc(doc.ref, { password: newPassword });
            alert("Senha redefinida com sucesso!");
          }
        }
      });
      if (!userFound) alert("Usuário não encontrado.");
    } catch (err) {
      console.error(err);
      alert("Erro ao redefinir a senha. Tente novamente.");
    }
  });
}

// Adicionando funcionalidade de logout
const logoutButton = document.getElementById("logout-button");
if (logoutButton) {
  logoutButton.addEventListener("click", () => {
    currentUserName = "";
    hideAllSections();
    loginContainer.style.display = "block";
  });
}

// Função para salvar progresso do usuário
async function saveProgress(userName, progress) {
  try {
    const snap = await getDocs(collection(db, "users"));
    snap.forEach(doc => {
      if (doc.data().name === userName) {
        updateDoc(doc.ref, { progress });
      }
    });
  } catch (err) {
    console.error("Erro ao salvar progresso:", err);
  }
}

// Função para carregar progresso do usuário
async function loadProgress(userName) {
  try {
    const snap = await getDocs(collection(db, "users"));
    let userProgress = null;
    snap.forEach(doc => {
      if (doc.data().name === userName) {
        userProgress = doc.data().progress || null;
      }
    });
    return userProgress;
  } catch (err) {
    console.error("Erro ao carregar progresso:", err);
    return null;
  }
}

// Elementos da tela de perfil
const profileContainer = document.getElementById("profile-container");
const profileNameElement = document.getElementById("profile-name");
const profileScoreElement = document.getElementById("profile-score");
const profilePhotoElement = document.getElementById("profile-photo");
const avatarOptions = document.querySelectorAll(".avatar-option");
const backButtonProfile = document.getElementById("backButtonProfile");

// Exibir a tela de perfil ao clicar no nome do usuário
const userNameElement = document.getElementById("user-name");
if (userNameElement) {
  userNameElement.style.cursor = "pointer";
  userNameElement.addEventListener("click", () => {
    hideAllSections();
    loadProfileData();
    profileContainer.style.display = "block";
  });
}

// Voltar ao menu principal
backButtonProfile.addEventListener("click", backToMenu);

// Carregar dados do perfil do usuário
async function loadProfileData() {
  const snap = await getDocs(collection(db, "users"));
  snap.forEach(doc => {
    const user = doc.data();
    if (user.name === currentUserName) {
      profileNameElement.textContent = user.name;
      profileScoreElement.textContent = user.score ?? 0;
      profilePhotoElement.src = user.photoURL || "images/default.png";
      avatarOptions.forEach(img => {
        if (img.dataset.avatar === user.photoURL) img.classList.add("selected");
        else img.classList.remove("selected");
      });
    }
  });
}

// Elementos do menu principal
const userPhotoElement = document.getElementById("user-photo");

// Atualizar foto de perfil ao selecionar um avatar
avatarOptions.forEach(img => {
  img.addEventListener("click", async () => {
    avatarOptions.forEach(i => i.classList.remove("selected"));
    img.classList.add("selected");
    profilePhotoElement.src = img.dataset.avatar;

    // Atualizar avatar no menu principal
    userPhotoElement.src = img.dataset.avatar;

    // Atualizar no Firebase
    try {
      const snap = await getDocs(collection(db, "users"));
      snap.forEach(doc => {
        if (doc.data().name === currentUserName) {
          updateDoc(doc.ref, { photoURL: img.dataset.avatar });
        }
      });
      alert("Avatar atualizado com sucesso!");
    } catch (err) {
      console.error("Erro ao atualizar avatar:", err);
      alert("Erro ao salvar avatar. Tente novamente.");
    }
  });
});

// --- ABA DE EXERCÍCIOS ---
const btnExercises = document.getElementById("btnExercises");
const exercisesContainer = document.getElementById("exercises-container");
const exerciseQuestionElement = document.getElementById("exercise-question");
const exerciseInputElement = document.getElementById("exercise-input");
const exerciseSubmitButton = document.getElementById("exercise-submit");
const exerciseFeedbackElement = document.getElementById("exercise-feedback");
const backButtonExercises = document.getElementById("backButtonExercises");


// Adiciona o evento de clique para voltar ao menu principal
backButtonExercises.addEventListener("click", () => {
  hideAllSections(); // Esconde todas as seções
  menuContainer.style.display = "block"; // Mostra o menu principal
});

// Array de perguntas, respostas e explicações
const exerciseQuestions = [
  {
    question: "Qual é a capital da França?",
    answer: "Paris",
    explanation: "Paris é a capital da França e é conhecida como a Cidade Luz.",
  },
  
  // Perguntas em inglês
  {
    question: "What is the synonym of 'happy'?",
    answer: "Joyful",
    explanation: "A synonym for 'happy' is 'joyful', which means feeling or showing great pleasure.",
  },
  {
    question: "What is the antonym of 'big'?",
    answer: "Small",
    explanation: "The antonym of 'big' is 'small', which means of a size that is less than normal.",
  },
  {
    question: "What is the plural of 'child'?",
    answer: "Children",
    explanation: "The plural of 'child' is 'children', which refers to more than one child.",
  },
  {
    question: "What is the past tense of 'go'?",
    answer: "Went",
    explanation: "The past tense of 'go' is 'went', used to describe an action that happened in the past.",
  },
  {
    question: "What is the opposite of 'hot'?",
    answer: "Cold",
    explanation: "The opposite of 'hot' is 'cold', which refers to a low temperature.",
  },
  {
    question: "What is the meaning of 'apple'?",
    answer: "A fruit",
    explanation: "An apple is a fruit that is typically round, red, green, or yellow, and sweet or tart in taste.",
  },
  {
    question: "What is the capital of the United States?",
    answer: "Washington, D.C.",
    explanation: "Washington, D.C. is the capital of the United States and the seat of its federal government.",
  },
  {
    question: "What is the opposite of 'fast'?",
    answer: "Slow",
    explanation: "The opposite of 'fast' is 'slow', which means moving or operating at a low speed.",
  },
  {
    question: "What is the meaning of 'blue'?",
    answer: "A color",
    explanation: "Blue is a primary color that is often associated with the sky and the ocean.",
  },
  {
    question: "What is the plural of 'mouse'?",
    answer: "Mice",
    explanation: "The plural of 'mouse' is 'mice', which refers to more than one mouse.",
  },
  {
    question: "What is the past tense of 'eat'?",
    answer: "Ate",
    explanation: "The past tense of 'eat' is 'ate', used to describe the act of consuming food in the past.",
  },
  {
    question: "What is the synonym of 'beautiful'?",
    answer: "Pretty",
    explanation: "A synonym for 'beautiful' is 'pretty', which means pleasing to the eye or attractive.",
  },
  {
    question: "What is the opposite of 'day'?",
    answer: "Night",
    explanation: "The opposite of 'day' is 'night', which refers to the period of darkness between sunset and sunrise.",
  },
  {
    question: "What is the meaning of 'dog'?",
    answer: "An animal",
    explanation: "A dog is a domesticated animal often kept as a pet or used for work.",
  },
  {
    question: "What is the capital of England?",
    answer: "London",
    explanation: "London is the capital of England and one of the most famous cities in the world.",
  },
];

let currentExerciseQuestionIndex = 0; // Índice da pergunta atual
const correctExerciseAnswers = [];
const similarityThreshold = 0.8; // Limite de similaridade (80%)

// Função para calcular similaridade entre duas strings
function calculateSimilarity(str1, str2) {
  const normalize = (str) => str.toLowerCase().trim();
  const [a, b] = [normalize(str1), normalize(str2)];
  let matches = 0;

  for (let i = 0; i < Math.min(a.length, b.length); i++) {
    if (a[i] === b[i]) matches++;
  }

  return matches / Math.max(a.length, b.length);
}

// Função para exibir a próxima pergunta
function showNextQuestion() {
  if (currentExerciseQuestionIndex < exerciseQuestions.length) {
      const questionElement = document.getElementById("exercise-question");
      questionElement.textContent = exerciseQuestions[currentExerciseQuestionIndex].question;
    } else {
      document.getElementById("exercise-feedback").textContent =
        "Você completou todos os exercícios!";
      document.getElementById("exercise-input").disabled = true;
      document.getElementById("exercise-submit").disabled = true;
    }
}

// Função para adicionar um exercício acertado ao bloco
function addCorrectAnswer(question, userAnswer, correctAnswer, explanation) {
  const correctAnswersList = document.getElementById("correct-answers-list");

  // Cria um novo bloco para o exercício acertado
  const answerBlock = document.createElement("div");
  answerBlock.className = "correct-answer-item";
  answerBlock.style.border = "2px solid #4caf50";
  answerBlock.style.padding = "10px";
  answerBlock.style.marginBottom = "10px";
  answerBlock.style.borderRadius = "5px";
  answerBlock.style.backgroundColor = "#e8f5e9";
  answerBlock.style.color = "#2e7d32";

  answerBlock.innerHTML = `
    <p><strong>Pergunta:</strong> ${question}</p>
    <p><strong>Sua Resposta:</strong> ${userAnswer}</p>
    <p><strong>Resposta Correta:</strong> ${correctAnswer}</p>
    <p><strong>Explicação:</strong> ${explanation}</p>
  `;

  // Adiciona o bloco ao contêiner
  correctAnswersList.appendChild(answerBlock);
}

// Manipular envio de resposta
document.getElementById("exercise-submit").addEventListener("click", () => {
  const userAnswer = document.getElementById("exercise-input").value.trim();
  const currentQuestion = exerciseQuestions[currentExerciseQuestionIndex];

  // Verifica se a resposta é semelhante o suficiente
  if (
    calculateSimilarity(userAnswer, currentQuestion.answer) >=
    similarityThreshold
  ) {
    correctExerciseAnswers.push({
      question: currentQuestion.question,
      answer: userAnswer,
    });
    document.getElementById("exercise-feedback").textContent =
      "Resposta correta!";
    addCorrectAnswer(
      currentQuestion.question,
      userAnswer,
      currentQuestion.answer,
      currentQuestion.explanation
    ); // Adiciona ao bloco de acertos
    currentExerciseQuestionIndex++; // Avança para a próxima pergunta
    showNextQuestion(); // Exibe a próxima pergunta
  } else {
    document.getElementById("exercise-feedback").textContent =
      "Resposta incorreta!";
  }

  document.getElementById("exercise-input").value = ""; // Limpar entrada
});

// Função para pular para a próxima pergunta
document.getElementById("exercise-skip").addEventListener("click", () => {
  currentExerciseQuestionIndex++;
  document.getElementById("exercise-feedback").textContent = "Pergunta pulada!";
  document.getElementById("exercise-input").value = "";
  showNextQuestion();
});

// Mostra a aba de exercícios ao clicar no botão
btnExercises.addEventListener("click", () => {
  hideAllSections(); // Esconde todas as outras seções
  exercisesContainer.style.display = "block"; // Mostra o contêiner de exercícios
  currentExerciseIndex = 0; // Reinicia o índice dos exercícios
  randomExercises = getRandomExercises(); // Gera uma nova lista de exercícios aleatórios
  loadExercise(); // Carrega o primeiro exercício
});

// Inicializa a primeira pergunta
showNextQuestion();

document.addEventListener('keydown', (event) => {
  const key = event.key;

  // Ação para a tecla Enter
  if (key === 'Enter') {
    // Verifica se está na tela de Cadastro
    if (document.getElementById('register-container').style.display === 'block') {
      document.getElementById('start-button').click();
    }

    // Verifica se está na tela de Login
    if (document.getElementById('login-container').style.display === 'block') {
      document.getElementById('login-button').click();
    }

    // Verifica se está na tela de Exercícios
    if (document.getElementById('exercises-container').style.display === 'block') {
      document.getElementById('exercise-submit').click();
    }
  }

  // Ação para a tecla Esc
  if (key === 'Escape') {
    // Verifica se está na tela de Cadastro
    if (document.getElementById('register-container').style.display === 'block') {
      document.getElementById('go-login').click();
    }

    // Verifica se está na tela de Login
    if (document.getElementById('login-container').style.display === 'block') {
      document.getElementById('go-register').click();
    }

    // Verifica se está na tela de Exercícios
    if (document.getElementById('exercises-container').style.display === 'block') {
      document.getElementById('backButtonExercises').click();
    }

    // Verifica se está na tela de Aviso do Quiz
    if (document.getElementById('quiz-warning-container').style.display === 'block') {
      document.getElementById('quiz-warning-back-button').click();
    }

    // Verifica se está em qualquer outra aba (exceto Quiz)
    const quizContainers = [
      document.getElementById('quiz-container')
      
    ];

    const isInQuiz = quizContainers.some(container => container && container.style.display === 'block');
    if (!isInQuiz) {
      backToMenu(); // Volta ao menu principal
    }
  }
});

// --- RESULTADOS ---
resultsButton.addEventListener('click', () => {
  document.getElementById('end-screen').style.display = 'none';
  document.getElementById('results-container').style.display = 'block';

  const score = parseInt(document.getElementById('score').textContent, 10);
  const totalQuestions = 15; // Total de questões do quiz
  const wrongQuestions = []; // Substitua com as questões erradas do quiz

  // Exibir pontuação
  document.getElementById('score-summary').textContent = `Você acertou ${score} de ${totalQuestions} questões.`;

  // Exibir questões erradas
  const wrongQuestionsList = document.getElementById('wrong-questions-list');
  wrongQuestionsList.innerHTML = '';
  wrongQuestions.forEach((question) => {
    const li = document.createElement('li');
    li.textContent = question; // Substitua com o texto da questão errada
    wrongQuestionsList.appendChild(li);
  });
});

// Botão "Aprenda Mais"
learnMoreButton.addEventListener('click', () => {
  document.getElementById('results-container').style.display = 'none';
  document.getElementById('library-container').style.display = 'block';
});

// Botão "Voltar" nos resultados
backButtonResults.addEventListener('click', () => {
  document.getElementById('results-container').style.display = 'none';
  document.getElementById('menu-container').style.display = 'block';
});

// Função para exibir mensagem motivacional
function showMotivationalMessage(score, totalQuestions) {
  let motivationalMessage = '';
  if (score === totalQuestions) {
    motivationalMessage = 'Parabéns! Você acertou todas as questões! 🎉';
  } else if (score >= totalQuestions * 0.8) {
    motivationalMessage = 'Ótimo trabalho! Continue assim! 💪';
  } else if (score >= totalQuestions * 0.5) {
    motivationalMessage = 'Bom esforço! Você está no caminho certo! 🚀';
  } else {
    motivationalMessage = 'Não desista! Continue praticando! 🌟';
  }

  // Exibe em popup (alert) ou em um elemento HTML
  // alert(motivationalMessage); // Descomente para usar popup

  // Exibe em um elemento na tela (certifique-se de ter um elemento com id="motivational-message")
  const msgEl = document.getElementById('motivational-message');
  if (msgEl) {
    msgEl.textContent = motivationalMessage;
    msgEl.style.display = 'block';
  } else {
    alert(motivationalMessage); // Fallback para popup se o elemento não existir
  }
}
