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


const startButton        = document.getElementById("start-button");
const loginButton        = document.getElementById("login-button");
const goLoginLink        = document.getElementById("go-login");
const goRegisterLink     = document.getElementById("go-register");


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


function hideAllSections() {
  [
    registerContainer, loginContainer, menuContainer,
    quizContainer, perguntasContainer, perguntasQuizContainer,
    libraryContainer, rankingContainer, endScreen, perguntasEndScreen,
    spanishMenuContainer, spanishQuizContainer, spanishEndScreen, spanishLibraryContainer,
    frenchMenuContainer, frenchQuizContainer, frenchEndScreen, frenchLibraryContainer,
    profileContainer, exercisesContainer 
  ].forEach(sec => sec && (sec.style.display = "none"));
}


function backToMenu() {
  stopTimer(); stopPerguntasTimer(); stopSpanishTimer(); stopFrenchTimer();
  hideAllSections();
  menuContainer.style.display = "block";
}


[
  "backButtonQuiz", "backButtonPerguntas", "backButtonPerguntasQuiz",
  "backButtonLibrary", "backButtonRanking", "backButtonEndScreen", "backButtonPerguntasEndScreen",
  "backButtonSpanish", "backButtonSpanishLibrary", "backButtonSpanishEndScreen",
  "backButtonFrench", "backButtonFrenchLibrary", "backButtonFrenchEndScreen"
].forEach(id => {
  const btn = document.getElementById(id);
  if (btn) btn.addEventListener("click", backToMenu);
});


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


let currentUserName = ""; 


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


function checkFirstTimeLogin() {
  const isFirstTime = localStorage.getItem("firstTimeLogin") === null;

  if (isFirstTime) {
    
    const popup = document.getElementById("first-time-popup");
    popup.style.display = "flex";

    
    document.getElementById("go-to-profile").addEventListener("click", () => {
      popup.style.display = "none";
      hideAllSections();
      profileContainer.style.display = "block"; 
    });

    
    document.getElementById("skip-profile").addEventListener("click", () => {
      popup.style.display = "none";
      menuContainer.style.display = "block"; 
    });

    
    localStorage.setItem("firstTimeLogin", "false");
  } else {
    
    menuContainer.style.display = "block";
  }
}


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
        updateUserName(loginName, userData.photoURL); 
        hideAllSections();
        checkFirstTimeLogin(); 
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


document.getElementById("start-now").addEventListener("click", () => {
  document.getElementById("welcome-container").style.display = "none";
  document.getElementById("register-container").style.display = "block";
});


document.getElementById("login").addEventListener("click", () => {
  document.getElementById("welcome-container").style.display = "none";
  document.getElementById("login-container").style.display = "block";
});


document.getElementById("go-login").addEventListener("click", () => {
  document.getElementById("register-container").style.display = "none";
  document.getElementById("login-container").style.display = "block";
});


document.getElementById("go-register").addEventListener("click", () => {
  document.getElementById("login-container").style.display = "none";
  document.getElementById("register-container").style.display = "block";
});


goLoginLink.addEventListener("click", () => {
  registerContainer.style.display = "none";
  loginContainer.style.display = "block";
});
goRegisterLink.addEventListener("click", () => {
  loginContainer.style.display = "none";
  registerContainer.style.display = "block";
});


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
    errors.push({
      question: q.question,
      correct: q.options[q.answer],
      libraryRef: q.libraryRef, 
    });
  }

  setTimeout(() => {
    currentQuestion++;
    loadQuestion();
  }, 1500);
}
function endQuiz() {
  stopTimer();
  quizContainer.style.display = "none";

  
  const motivationalMessage = getMotivationalMessage(score, questions.length);
  congratulationsTitle.textContent = motivationalMessage.title;
  congratulationsMessage.textContent = motivationalMessage.message;

  
  errorListElement.innerHTML = errors.map((error) => `
    <li class="error-item" style="margin-bottom: 10px;">
      <p><strong>Pergunta:</strong> ${error.question}</p>
      <p><strong>Resposta Correta:</strong> ${error.correct}</p>
      <button class="aprenda-mais-button" onclick="showLibrarySection('${error.libraryRef}')">
        Aprenda Mais
      </button>
    </li>
  `).join("");

  
  congratulationsContainer.style.display = "block";

  
  saveScore(document.getElementById("name").value.trim(), score, quizTimer);

  
  saveProgress(currentUserName, { finished: true }); 
}


function showLibrarySection(libraryRef) {
  hideAllSections();
  libraryContainer.style.display = "block";
  document.getElementById(libraryRef)?.scrollIntoView({ behavior: "smooth" });
}


const congratulationsContainer = document.getElementById("congratulations-container");
const congratulationsTitle = document.getElementById("congratulations-title");
const congratulationsMessage = document.getElementById("congratulations-message");
const congratulationsBackButton = document.getElementById("congratulations-back-button");


function getMotivationalMessage(score, totalQuestions) {
  const percent = score / totalQuestions;
  let motivationalMessage;

  if (score === totalQuestions) {
    motivationalMessage = 'Você zerou! Aqui é Speak Easy, mas seu inglês tá Speak Master! 🏆🇬🇧';
  } else if (percent >= 0.95) {
    motivationalMessage = 'Só faltou o sotaque britânico! Tá quase virando lenda do Speak Easy! 👑✨';
  } else if (percent >= 0.9) {
    motivationalMessage = 'Mandou aquele GG! Já pode dar aula no Speak Easy! 😎📚';
  } else if (percent >= 0.85) {
    motivationalMessage = 'Seu inglês tá mais fácil que pedir delivery! Bora pro próximo nível no Speak Easy! 🍔🚀';
  } else if (percent >= 0.8) {
    motivationalMessage = 'Top demais! Já já tá assistindo série sem legenda, estilo Speak Easy! 📺🔥';
  } else if (percent >= 0.75) {
    motivationalMessage = 'Tá fluindo! Aqui é Speak Easy, mas você tá quase Speak Pro! 💬💪';
  } else if (percent >= 0.7) {
    motivationalMessage = 'Safe! Seu inglês tá subindo de elo no Speak Easy! 🛡️';
  } else if (percent >= 0.65) {
    motivationalMessage = 'Tá indo bem! Logo logo vai pedir café em Londres sem travar! ☕🇬🇧';
  } else if (percent >= 0.6) {
    motivationalMessage = 'Falta pouco pra virar referência no Speak Easy! Keep going! 🚦';
  } else if (percent >= 0.5) {
    motivationalMessage = 'Tá no caminho! Melhorando aqui, arrasando lá fora! 🌍😉';
  } else if (percent >= 0.4) {
    motivationalMessage = 'Não desanima! Até o Google Tradutor já errou, mas você tá aprendendo de verdade! 📱🔄';
  } else if (percent >= 0.3) {
    motivationalMessage = 'Faz parte! Todo mundo já usou legenda, mas só os brabos continuam no Speak Easy! 🎬💡';
  } else if (percent >= 0.2) {
    motivationalMessage = 'Primeiro passo já foi! No Speak Easy, cada erro é um aprendizado! 👣';
  } else if (percent >= 0.1) {
    motivationalMessage = 'Começou, já é metade do caminho! Speak Easy é pra quem não desiste! 🚀';
  } else {
    motivationalMessage = 'Zero barra todos, mas relaxa: até o dicionário começou do A! Bora tentar de novo no Speak Easy! 📖😅';
  }

  return {
    title: "Parabéns!",
    message: motivationalMessage
  };
}


congratulationsBackButton.addEventListener("click", () => {
  congratulationsContainer.style.display = "none"; 
  menuContainer.style.display = "block"; 
});


const quizWarningContainer = document.getElementById("quiz-warning-container");
const quizWarningMessage = document.getElementById("quiz-warning-message");
const quizWarningBackButton = document.getElementById("quiz-warning-back-button");


btnQuiz.addEventListener("click", async () => {
  hideAllSections();

  const savedProgress = await loadProgress(currentUserName);
  if (savedProgress) {
    
    quizWarningMessage.textContent = "Você já realizou este quiz. Você só pode fazê-lo uma vez.";
    quizWarningContainer.style.display = "block";
  } else {
    
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


quizWarningBackButton.addEventListener("click", () => {
  quizWarningContainer.style.display = "none"; 
  menuContainer.style.display = "block"; 
});

restartButton.addEventListener("click", ()=>{
  btnQuiz.click();
});


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
  perguntasQuizContainer.style.display = "none";
  perguntasEndScreen.style.display = "block";
  perguntasFinalMessageElement.textContent = `Pontuação Final: ${perguntasScore}/${perguntasQuestions.length} | Tempo: ${perguntasTimer}s`;
  perguntasErrorListElement.innerHTML = perguntasErrors.map(err => `
    <li class="error-item">
      ${err.question}<br>
      Resposta correta: ${err.correct}
      <button onclick="showLibrarySection('${err.libraryRef}')">Aprenda Mais</button>
    </li>
  `).join("");
}
function startPerguntasQuiz(dif) {
  perguntasQuestions = allQuestions.filter(q => q.difficulty === dif).sort(() => Math.random() - 0.5).slice(0,10);
  perguntasScore = 0; currentPerguntaQuestion = 0; perguntasErrors = [];
  perguntasScoreElement.textContent = perguntasScore;
  hideAllSections();
  perguntasQuizContainer.style.display = "block";
  startPerguntasTimer();
  loadPerguntasQuestion();
}
btnPerguntas.addEventListener("click", ()=>{ hideAllSections(); perguntasContainer.style.display = "block"; });
btnFacil.addEventListener("click", ()=> startPerguntasQuiz("easy"));
btnMedio.addEventListener("click", ()=> startPerguntasQuiz("medium"));
btnDificil.addEventListener("click", ()=> startPerguntasQuiz("hard"));
perguntasRestartButton.addEventListener("click", ()=> startPerguntasQuiz(perguntasQuestions[0]?.difficulty || "easy"));
perguntasMenuButton.addEventListener("click", backToMenu);


btnLibrary.addEventListener("click", ()=>{ hideAllSections(); libraryContainer.style.display = "block"; });
window.showLibrarySection = function(sectionId){
  hideAllSections();
  libraryContainer.style.display = "block";
  document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
};


function openLibraryFromLearnMore() {
  hideAllSections();
  document.getElementById('library-container').style.display = 'block';
  
  document.getElementById('backButtonLibrary').style.display = 'none';
}


function closeLibraryAndShowMenu() {
  document.getElementById('library-container').style.display = 'none';
  document.getElementById('menu-container').style.display = 'block';
  
  document.getElementById('backButtonLibrary').style.display = '';
}


const learnMoreBtn = document.getElementById('learn-more-btn');
if (learnMoreBtn) {
  learnMoreBtn.addEventListener('click', openLibraryFromLearnMore);
}


const backButtonLibrary = document.getElementById('backButtonLibrary');
if (backButtonLibrary) {
  backButtonLibrary.addEventListener('click', () => {
    
    libraryContainer.style.display = "none";
    
    if (congratulationsContainer) {
      congratulationsContainer.style.display = "none";
    }
    
    menuContainer.style.display = "block";
  });
};


async function loadRanking() {
  const rankingList = document.getElementById("ranking-list");
  rankingList.innerHTML = ""; 

  try {
    const snap = await getDocs(collection(db, "users"));
    const users = [];

    snap.forEach(doc => {
      const userData = doc.data();
      if (userData.score !== undefined && userData.time !== undefined) {
        users.push(userData);
      }
    });

    
    users.sort((a, b) => {
      if (b.score === a.score) {
        return a.time - b.time; 
      }
      return b.score - a.score; 
    });

    
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

    
    users.slice(3).forEach((user, index) => {
      const listItem = document.createElement("li");
      listItem.classList.add("ranking-item");
      
      if (user.name === currentUserName) {
        listItem.classList.add("meu-destaque");
      }
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


btnRanking.addEventListener("click", () => {
  hideAllSections();
  loadRanking();
  document.getElementById("ranking-container").style.display = "block";
});


let spanishQuestions = [], spanishScore = 0, currentSpanishQuestion = 0, spanishErrors = [], spanishTimer = 0, spanishTimerInterval;
function getRandomSpanishQuestions() {
  const all = [
    { question: "¿Cómo se dice 'Olá' en español?", options: ["Hola", "Adiós", "Gracias", "Por favor"], answer: 0 },
    { question: "¿Qué significa 'Adeus' en español?", options: ["Buenas noches", "Adiós", "Hola", "Gracias"], answer: 1 },
    { question: "¿Cómo se dice 'Obrigado' en español?", options: ["De nada", "Por favor", "Gracias", "Perdón"], answer: 2 },
    { question: "¿Cuál es el plural de 'amigo'?", options: ["Amigues", "Amigas", "Amigoes", "Amigos"], answer: 3 },
    { question: "¿Cómo se dice 'Eu estou aprendendo espanhol' en español?", options: ["Estoy aprendiendo español", "Aprendo español", "Yo español aprendo", "Aprendiendo estoy español"], answer: 0 },
    { question: "¿Qué significa 'Bom dia' en español?", options: ["Buenas tardes", "Buenos días", "Buenas noches", "Hola"], answer: 1 },
    { question: "¿Cómo se dice 'Eu gosto de comer maçãs' en español?", options: ["Yo como manzanas", "Me gusta manzanas", "Me gusta comer manzanas", "Comer manzanas me gusta"], answer: 2 },
    { question: "¿Qué significa 'Onde você mora?' en español?", options: ["¿Cuál es tu nombre?", "¿Cómo estás?", "¿Qué haces?", "¿Dónde vives?"], answer: 3 },
    { question: "¿Cómo se dice 'Que horas são?' en español?", options: ["¿Qué hora es?", "¿Dónde está?", "¿Cómo estás?", "¿Qué haces?"], answer: 0 },
    { question: "¿Qué significa 'Por favor'?", options: ["De nada", "Por favor", "Gracias", "Disculpe"], answer: 1 },
    { question: "¿Cómo se dice 'Eu sou professor' en español?", options: ["Yo soy profesor", "Profesor soy", "Soy profesor", "Soy un profesor"], answer: 2 },
    { question: "¿Qué significa 'De nada'?", options: ["Por favor", "Gracias", "Disculpe", "De nada"], answer: 3 },
    { question: "¿Cómo se dice 'Eu estou feliz' en español?", options: ["Estoy feliz", "Yo feliz", "Soy feliz", "Feliz estoy"], answer: 0 },
    { question: "¿Qué significa 'Qual é o seu nome?' en español?", options: ["¿Dónde vives?", "¿Cómo te llamas?", "¿Cómo estás?", "¿Qué haces?"], answer: 1 },
    { question: "¿Cómo se dice 'Eu estou cansado' en español?", options: ["Yo cansado", "Soy cansado", "Estoy cansado", "Cansado estoy"], answer: 2 },
    { question: "¿Qué significa 'O que você faz?' en español?", options: ["¿Dónde estás?", "¿Cómo estás?", "¿Cuál es tu nombre?", "¿Qué haces?"], answer: 3 },
    { question: "¿Cómo se dice 'Eu gosto de ler livros' en español?", options: ["Me gusta leer libros", "Yo leo libros", "Me gusta libros", "Leer libros me gusta"], answer: 0 },
    { question: "¿Qué significa 'Quanto custa?' en español?", options: ["¿Dónde está?", "¿Cuánto cuesta?", "¿Cómo estás?", "¿Qué haces?"], answer: 1 },
    { question: "¿Cómo se dice 'Eu estou aprendendo' en español?", options: ["Yo aprendo", "Aprendiendo estoy", "Estoy aprendiendo", "Aprendo"], answer: 2 },
    { question: "¿Qué significa 'Que horas são?' en español?", options: ["¿Dónde estás?", "¿Cómo estás?", "¿Qué haces?", "¿Qué hora es?"], answer: 3 },
    { question: "¿Cómo se dice 'Eu estou com fome' en español?", options: ["Tengo hambre", "Yo hambre", "Soy hambre", "Hambre tengo"], answer: 0 },
    { question: "¿Qué significa 'Você pode me ajudar?' en español?", options: ["¿Dónde estás?", "¿Puedes ayudarme?", "¿Cómo estás?", "¿Qué haces?"], answer: 1 },
    { question: "¿Cómo se dice 'Eu estou com sede' en español?", options: ["Yo sed", "Soy sed", "Tengo sed", "Sed tengo"], answer: 2 },
    { question: "¿Qué significa 'Onde fica o banheiro?' en español?", options: ["¿Cómo estás?", "¿Qué haces?", "¿Dónde vives?", "¿Dónde está el baño?"], answer: 3 },
    { question: "¿Cómo se dice 'Eu estou com frio' en español?", options: ["Tengo frío", "Yo frío", "Soy frío", "Frío tengo"], answer: 0 },
    { question: "¿Qué significa 'O que você quer comer?' en español?", options: ["¿Dónde estás?", "¿Qué quieres comer?", "¿Cómo estás?", "¿Qué haces?"], answer: 1 },
    { question: "¿Cómo se dice 'Eu estou com calor' en español?", options: ["Yo calor", "Soy calor", "Tengo calor", "Calor tengo"], answer: 2 },
    { question: "¿Qué significa 'O que você quer beber?' en español?", options: ["¿Dónde estás?", "¿Cómo estás?", "¿Qué haces?", "¿Qué quieres beber?"], answer: 3 },
    { question: "¿Cómo se dice 'Eu estou estudando' en español?", options: ["Estoy estudiando", "Yo estudio", "Estudiando estoy", "Estudio"], answer: 0 },
    { question: "¿Qué significa 'O que você está fazendo?' en español?", options: ["¿Dónde estás?", "¿Qué estás haciendo?", "¿Cómo estás?", "¿Qué haces?"], answer: 1 },
    { question: "¿Cómo se dice 'Eu estou trabalhando' en español?", options: ["Yo trabajo", "Trabajando estoy", "Estoy trabajando", "Trabajo"], answer: 2 },
    { question: "¿Qué significa 'Onde você trabalha?' en español?", options: ["¿Cómo estás?", "¿Qué haces?", "¿Dónde vives?", "¿Dónde trabajas?"], answer: 3 }
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


let frenchQuestions = [], frenchScore = 0, currentFrenchQuestion = 0, frenchErrors = [], frenchTimer = 0, frenchTimerInterval;
function getRandomFrenchQuestions() {
  const all = [
    { question: "Comment dit-on 'Hello' en français?", options: ["Merci", "Bonjour", "Au revoir", "S'il vous plaît"], answer: 1 },
    { question: "Que signifie 'Goodbye' en français?", options: ["Merci", "Au revoir", "Bonjour", "Bonne nuit"], answer: 1 },
    { question: "Comment dit-on 'Thank you' en français?", options: ["Pardon", "S'il vous plaît", "Merci", "De rien"], answer: 2 },
    { question: "Quel est le pluriel de 'ami'?", options: ["Ami", "Amies", "Amis", "Ami(e)s"], answer: 2 },
    { question: "Comment dit-on 'I am learning French' en français?", options: ["Je suis en train d'apprendre le français", "J'apprends le français", "Je français apprends", "J'apprendrai le français"], answer: 1 },
    { question: "Que signifie 'Bonne nuit' en français?", options: ["Good evening", "Goodbye", "Good night", "Good morning"], answer: 2 },
    { question: "Comment dit-on 'Je suis fatigué' en français?", options: ["Je suis heureux", "Je suis fatigué", "Je suis triste", "Je suis en colère"], answer: 1 },
    { question: "Que signifie 'Où habitez-vous?' en français?", options: ["How are you?", "Where do you live?", "What is your name?", "What do you do?"], answer: 1 },
    { question: "Comment dit-on 'Je voudrais un café' en français?", options: ["I would like a coffee", "I drink a coffee", "I want a coffee", "I need a coffee"], answer: 0 },
    { question: "Que signifie 'Quelle heure est-il?' en français?", options: ["Where are you?", "How are you?", "What are you doing?", "What time is it?"], answer: 3 },
    { question: "Comment dit-on 'Je suis étudiant' en français?", options: ["I am a doctor", "I am a student", "I am a teacher", "I am a worker"], answer: 1 },
    { question: "Que signifie 'Merci beaucoup' en français?", options: ["Thank you very much", "Excuse me", "Please", "You're welcome"], answer: 0 },
    { question: "Comment dit-on 'Je suis heureux' en français?", options: ["I am happy", "I am angry", "I am tired", "I am sad"], answer: 0 },
    { question: "Que signifie 'Quel est votre nom?' en français?", options: ["Where do you live?", "How are you?", "What is your name?", "What do you do?"], answer: 2 },
    { question: "Comment dit-on 'Je suis en colère' en français?", options: ["I am happy", "I am angry", "I am tired", "I am sad"], answer: 1 }
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


saveScore(currentUserName, score, quizTimer);



async function saveScore(userName, score, time) {
  const snap = await getDocs(collection(db, "users"));
  let userDoc = null;
  snap.forEach(doc => {
    if (doc.data().name === userName) userDoc = doc.ref;
  });
  if (userDoc) {
    await updateDoc(userDoc, { score, time });
  }
}


document.addEventListener("DOMContentLoaded", () => {
  const headers = document.querySelectorAll(".text-card .text-header");
  headers.forEach(header => {
    header.addEventListener("click", () => {
      const content = header.nextElementSibling;
      content.classList.toggle("active");
    });
  });
});


const allQuestions = [
  { question: "What is the main goal of Agile methodologies?", options: ["Deliver value to the customer quickly and iteratively", "Create detailed documentation before starting", "Follow a strict plan without changes", "Work in isolation"], answer: 0, difficulty: "medium", libraryRef: "agile" },
  { question: "Which of the following is NOT an Agile framework?", options: ["Scrum", "Waterfall", "Kanban", "XP (Extreme Programming)"], answer: 1, difficulty: "medium", libraryRef: "agile" },
  { question: "In Scrum, who is responsible for maximizing the value of the product?", options: ["Scrum Master", "Development Team", "Product Owner", "Stakeholders"], answer: 2, difficulty: "medium", libraryRef: "agile" },
  { question: "What is a 'sprint' in Scrum?", options: ["A long-term project plan", "A meeting to discuss progress", "A document describing requirements", "A fixed period to deliver a set of features"], answer: 3, difficulty: "medium", libraryRef: "agile" },
  { question: "Which Agile ceremony is used to reflect and improve the process?", options: ["Retrospective", "Sprint Planning", "Daily Standup", "Sprint Review"], answer: 0, difficulty: "medium", libraryRef: "agile" },
  { question: "What is the main artifact that lists all desired work on a product in Scrum?", options: ["Sprint Backlog", "Product Backlog", "Burndown Chart", "Definition of Done"], answer: 1, difficulty: "medium", libraryRef: "agile" },
  { question: "What is the purpose of a Kanban board?", options: ["Assign tasks to individuals", "Track time spent on each task", "Visualize workflow and limit work in progress", "Document project requirements"], answer: 2, difficulty: "medium", libraryRef: "agile" },
  { question: "Which role facilitates Scrum events and removes impediments?", options: ["Product Owner", "Developer", "Stakeholder", "Scrum Master"], answer: 3, difficulty: "medium", libraryRef: "agile" },
  { question: "What is the maximum recommended duration of a Scrum sprint?", options: ["4 weeks", "1 week", "2 weeks", "8 weeks"], answer: 0, difficulty: "medium", libraryRef: "agile" },
  { question: "What is a user story in Agile?", options: ["A detailed technical specification", "A short description of a feature from the user's perspective", "A bug report", "A project plan"], answer: 1, difficulty: "medium", libraryRef: "agile" },
  { question: "Which of the following is a key principle of Agile?", options: ["Follow a strict plan", "Deliver all features at once", "Embrace change even late in development", "Avoid customer collaboration"], answer: 2, difficulty: "medium", libraryRef: "agile" },
  { question: "Which of the following is NOT a color?", options: ["Blue", "Green", "Red", "Table"], answer: 3, difficulty: "easy", libraryRef: "vocabulary" },
  { question: "What is the correct plural form of 'box'?", options: ["Boxes", "Boxs", "Boxies", "Boxen"], answer: 0, difficulty: "easy", libraryRef: "vocabulary" },
  { question: "Choose the correct sentence:", options: ["She go to school every day.", "She goes to school every day.", "She going to school every day.", "She gone to school every day."], answer: 1, difficulty: "easy", libraryRef: "grammar" },
  { question: "Which word is an adjective?", options: ["Quickly", "Happiness", "Beautiful", "Run"], answer: 2, difficulty: "easy", libraryRef: "vocabulary" },
  { question: "What is the past tense of 'buy'?", options: ["Buyed", "Buys", "Buying", "Bought"], answer: 3, difficulty: "medium", libraryRef: "verb-tenses" },
  { question: "Which sentence is in the future tense?", options: ["I will eat breakfast.", "I eat breakfast.", "I am eating breakfast.", "I have eaten breakfast."], answer: 0, difficulty: "medium", libraryRef: "verb-tenses" },
  { question: "Which of these is a question?", options: ["He is a teacher.", "Is he a teacher?", "He a teacher.", "He teacher is."], answer: 1, difficulty: "easy", libraryRef: "grammar" },
  { question: "Which word means the opposite of 'always'?", options: ["Often", "Sometimes", "Never", "Usually"], answer: 2, difficulty: "easy", libraryRef: "vocabulary" },
  { question: "What is the correct comparative form of 'good'?", options: ["Gooder", "More good", "Best", "Better"], answer: 3, difficulty: "medium", libraryRef: "grammar" },
  { question: "Which sentence uses the Present Continuous tense?", options: ["They are playing soccer.", "They play soccer.", "They played soccer.", "They will play soccer."], answer: 0, difficulty: "medium", libraryRef: "verb-tenses" },
  { question: "Qual é a forma mais educada de pedir ajuda em inglês?", options: ["Help me!", "Can you help me, please?", "Give me help!", "You help me?"], answer: 1, difficulty: "easy", libraryRef: "politeness" },
  { question: "Como você agradece alguém de forma formal em inglês?", options: ["You're welcome", "Excuse me", "Thank you very much", "Sorry"], answer: 2, difficulty: "easy", libraryRef: "politeness" },
  { question: "Como pedir para usar o banheiro de maneira educada em inglês?", options: ["Sorry, where is the kitchen?", "Please, where is the bedroom?", "Hello, where is the office?", "Excuse me, where is the bathroom?"], answer: 3, difficulty: "easy", libraryRef: "politeness" },
  { question: "Como se diz 'Eu acordo às 7 da manhã' em inglês?", options: ["I wake up at 7 a.m.", "I go to bed at 7 a.m.", "I have lunch at 7 a.m.", "I go to work at 7 a.m."], answer: 0, difficulty: "easy", libraryRef: "daily-routine" },
  { question: "Qual frase expressa corretamente 'Eu almoço ao meio-dia' em inglês?", options: ["I eat breakfast at noon.", "I have lunch at noon.", "I have dinner at noon.", "I go home at noon."], answer: 1, difficulty: "easy", libraryRef: "daily-routine" },
  { question: "Como dizer que gosta de assistir TV à noite em inglês?", options: ["I watch TV in the morning.", "I like to read books at night.", "I like to watch TV in the evening.", "I go to bed in the evening."], answer: 2, difficulty: "easy", libraryRef: "daily-routine" },
  { question: "Como perguntar o nome de alguém em inglês?", options: ["How are you?", "Where are you from?", "Who are you?", "What is your name?"], answer: 3, difficulty: "easy", libraryRef: "personal-questions" },
  { question: "Qual frase corresponde a 'Onde você mora?' em inglês?", options: ["Where do you live?", "Where are you from?", "Where do you go?", "Where is your house?"], answer: 0, difficulty: "easy", libraryRef: "personal-questions" },
  { question: "Como perguntar sobre atividades de lazer em inglês?", options: ["How do you work?", "What do you do in your free time?", "Where do you go after work?", "Do you like weekends?"], answer: 1, difficulty: "easy", libraryRef: "personal-questions" },
  { question: "Como perguntar se alguém tem animais de estimação em inglês?", options: ["Do you like animals?", "Where is your pet?", "Do you have any pets?", "What is your pet's name?"], answer: 2, difficulty: "easy", libraryRef: "personal-questions" },
  { question: "Como se diz 'Bom dia' em inglês?", options: ["Good night", "Good evening", "Good afternoon", "Good morning"], answer: 3, difficulty: "easy", libraryRef: "greetings" },
  { question: "Qual expressão corresponde a 'Até mais' em inglês?", options: ["See you later", "Goodbye", "Good morning", "Good luck"], answer: 0, difficulty: "easy", libraryRef: "greetings" },
  { question: "O que significa a expressão 'Break the ice'?", options: ["Cometer um erro", "Começar uma conversa em um ambiente social", "Quebrar algo frágil", "Sair no inverno"], answer: 1, difficulty: "medium", libraryRef: "idioms" },
  { question: "O que significa 'Piece of cake'?", options: ["Uma sobremesa", "Uma tarefa difícil", "Algo muito fácil", "Uma comemoração"], answer: 2, difficulty: "easy", libraryRef: "idioms" },
  { question: "O que significa 'Let the cat out of the bag'?", options: ["Comprar um gato", "Cometer um erro", "Deixar um animal escapar", "Revelar um segredo"], answer: 3, difficulty: "medium", libraryRef: "idioms" },
  { question: "O que significa 'Under the weather'?", options: ["Sentindo-se mal", "Estar ao ar livre", "Previsão do tempo", "Sentindo-se feliz"], answer: 0, difficulty: "easy", libraryRef: "idioms" },
  { question: "O que significa 'To pull someone's leg'?", options: ["Ajudar alguém", "Brincar com alguém", "Machucar alguém", "Correr rápido"], answer: 1, difficulty: "medium", libraryRef: "idioms" },
  { question: "O que significa 'Spill the beans'?", options: ["Cozinhar feijão", "Fazer bagunça", "Revelar uma informação secreta", "Contar uma piada"], answer: 2, difficulty: "medium", libraryRef: "idioms" },
  { question: "O que significa 'To hit the books'?", options: ["Jogar livros", "Ler por diversão", "Escrever um livro", "Estudar bastante"], answer: 3, difficulty: "medium", libraryRef: "idioms" },
  { question: "O que significa 'Break a leg'?", options: ["Boa sorte", "Ter cuidado", "Cair", "Correr rápido"], answer: 0, difficulty: "medium", libraryRef: "idioms" },
  { question: "O que significa 'Call it a day'?", options: ["Fazer uma pausa", "Encerrar o trabalho", "Trabalhar à noite", "Começar a trabalhar"], answer: 1, difficulty: "medium", libraryRef: "idioms" },
  { question: "O que significa 'On cloud nine'?", options: ["Muito bravo", "Muito triste", "Muito feliz", "Muito cansado"], answer: 2, difficulty: "easy", libraryRef: "idioms" },
  { question: "O que significa 'To get cold feet'?", options: ["Ficar doente", "Sentir frio", "Correr rápido", "Ficar nervoso"], answer: 3, difficulty: "medium", libraryRef: "idioms" },
  { question: "O que significa 'To be in hot water'?", options: ["Estar em apuros", "Ser rico", "Estar feliz", "Tomar banho"], answer: 0, difficulty: "medium", libraryRef: "idioms" },
  { question: "O que significa 'To cut corners'?", options: ["Fazer algo perfeitamente", "Fazer algo de forma rápida ou barata", "Gastar mais dinheiro", "Pegar um caminho longo"], answer: 1, difficulty: "medium", libraryRef: "idioms" },
  { question: "O que significa 'A dime a dozen'?", options: ["Muito difícil", "Muito raro", "Muito comum", "Muito caro"], answer: 2, difficulty: "medium", libraryRef: "idioms" },
  { question: "O que significa 'To bite off more than you can chew'?", options: ["Comer demais", "Desistir", "Cometer um erro", "Assumir mais do que pode lidar"], answer: 3, difficulty: "medium", libraryRef: "idioms" },
  { question: "Qual frase está no Present Perfect?", options: ["She has finished her work", "She finishing her work", "She will finish her work", "She finish her work"], answer: 0, difficulty: "hard", libraryRef: "verb-tenses" },
  { question: "Qual frase está no Past Continuous?", options: ["I will read a book", "I was reading a book", "I have read a book", "I read a book"], answer: 1, difficulty: "medium", libraryRef: "verb-tenses" },
  { question: "Qual frase está no Future Continuous?", options: ["I work tomorrow", "I am working tomorrow", "I will be working tomorrow", "I worked tomorrow"], answer: 2, difficulty: "medium", libraryRef: "verb-tenses" },
  { question: "Qual frase está no Present Continuous?", options: ["I eat breakfast", "I will eat breakfast", "I ate breakfast", "I am eating breakfast"], answer: 3, difficulty: "medium", libraryRef: "verb-tenses" },
  { question: "Qual frase está no Past Simple?", options: ["She went to school", "She goes to school", "She go to school", "She going to school"], answer: 0, difficulty: "medium", libraryRef: "verb-tenses" },
  { question: "Qual frase está no Future Simple?", options: ["I going tomorrow", "I will go tomorrow", "I go tomorrow", "I gone tomorrow"], answer: 1, difficulty: "medium", libraryRef: "verb-tenses" },
  { question: "Qual frase está no Future Perfect?", options: ["I am graduating next year", "I graduated last year", "By next year, I will have graduated", "I will graduate next year"], answer: 2, difficulty: "hard", libraryRef: "verb-tenses" },
  { question: "Complete: She ___ going to school.", options: ["am", "are", "is", "be"], answer: 2, difficulty: "easy", libraryRef: "verb-tenses" },
  { question: "Qual é a forma correta do verbo 'to be' para 'they'?", options: ["is", "am", "be", "are"], answer: 3, difficulty: "easy", libraryRef: "verb-tenses" },
  { question: "Qual é a forma correta do verbo 'to be' em 'He ___ a doctor.'?", options: ["is", "am", "are", "be"], answer: 0, difficulty: "easy", libraryRef: "verb-tenses" }
];


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


const logoutButton = document.getElementById("logout-button");
if (logoutButton) {
  logoutButton.addEventListener("click", () => {
    currentUserName = "";
    hideAllSections();
    loginContainer.style.display = "block";
  });
}


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


const profileContainer = document.getElementById("profile-container");
const profileNameElement = document.getElementById("profile-name");
const profileScoreElement = document.getElementById("profile-score");
const profilePhotoElement = document.getElementById("profile-photo");
const avatarOptions = document.querySelectorAll(".avatar-option");
const backButtonProfile = document.getElementById("backButtonProfile");


const userNameElement = document.getElementById("user-name");
if (userNameElement) {
  userNameElement.style.cursor = "pointer";
  userNameElement.addEventListener("click", () => {
    hideAllSections();
    loadProfileData();
    profileContainer.style.display = "block";
  });
}


backButtonProfile.addEventListener("click", backToMenu);


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


const userPhotoElement = document.getElementById("user-photo");


avatarOptions.forEach(img => {
  img.addEventListener("click", async () => {
    avatarOptions.forEach(i => i.classList.remove("selected"));
    img.classList.add("selected");
    profilePhotoElement.src = img.dataset.avatar;

    
    userPhotoElement.src = img.dataset.avatar;

    
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


const btnExercises = document.getElementById("btnExercises");
const exercisesContainer = document.getElementById("exercises-container");
const exerciseQuestionElement = document.getElementById("exercise-question");
const exerciseInputElement = document.getElementById("exercise-input");
const exerciseSubmitButton = document.getElementById("exercise-submit");
const exerciseFeedbackElement = document.getElementById("exercise-feedback");
const backButtonExercises = document.getElementById("backButtonExercises");



backButtonExercises.addEventListener("click", () => {
  hideAllSections(); 
  menuContainer.style.display = "block"; 
});


const exerciseQuestions = [
  {
    question: "Qual é a capital da França?",
    answer: "Paris",
    explanation: "Paris é a capital da França e é conhecida como a Cidade Luz.",
  },
  {
    question: "What is the synonym of 'happy'?",
    answer: "Joyful",
    explanation: "A synonym for 'happy' is 'joyful', which means feeling or showing great pleasure.",
  },
  {
    question: "What is the opposite of 'big'?",
    answer: "Small",
    explanation: "The antonym of 'big' is 'small', which means of a size that is less than normal.",
  },
  {
    question: "What is the opposite of 'hot'?",
    answer: "Cold",
    explanation: "The opposite of 'hot' is 'cold', which refers to a low temperature.",
  },
  {
    question: "What is the meaning of 'apple'?",
    answer: "Fruit",
    explanation: "An apple is a fruit that is typically round, red, green, or yellow, and sweet or tart in taste.",
  },
  {
    question: "What is the opposite of 'fast'?",
    answer: "Slow",
    explanation: "The opposite of 'fast' is 'slow', which means moving or operating at a low speed.",
  },
  {
    question: "What is the meaning of 'blue'?",
    answer: "Color",
    explanation: "Blue is a primary color that is often associated with the sky and the ocean.",
  },
  {
    question: "What is the opposite of 'day'?",
    answer: "Night",
    explanation: "The opposite of 'day' is 'night', which refers to the period of darkness between sunset and sunrise.",
  },
  {
    question: "What is the meaning of 'dog'?",
    answer: "Animal",
    explanation: "A dog is a domesticated animal often kept as a pet or used for work.",
  },
  {
    question: "What is the capital of Japan?",
    answer: "Tokyo",
    explanation: "Tokyo is the capital of Japan and one of the most populous cities in the world.",
  },
  {
    question: "What is the synonym of 'smart'?",
    answer: "Intelligent",
    explanation: "A synonym for 'smart' is 'intelligent', which means having or showing a high level of intelligence.",
  },
  {
    question: "What is the opposite of 'strong'?",
    answer: "Weak",
    explanation: "The antonym of 'strong' is 'weak', which means lacking strength or power.",
  },
  {
    question: "What is the opposite of 'early'?",
    answer: "Late",
    explanation: "The opposite of 'early' is 'late', which means happening or arriving after the expected time.",
  },
  {
    question: "What is the meaning of 'car'?",
    answer: "Vehicle",
    explanation: "A car is a vehicle with four wheels, typically powered by an internal combustion engine or electric motor.",
  },
  {
    question: "What is the opposite of 'happy'?",
    answer: "Sad",
    explanation: "The opposite of 'happy' is 'sad', which means feeling or showing sorrow or unhappiness.",
  },
  {
    question: "What is the meaning of 'water'?",
    answer: "Liquid",
    explanation: "Water is a transparent, tasteless, odorless, and nearly colorless liquid essential for life.",
  },
  {
    question: "What is the opposite of 'light'?",
    answer: "Dark",
    explanation: "The opposite of 'light' is 'dark', which refers to the absence of light.",
  },
  {
    question: "What is the meaning of 'cat'?",
    answer: "Animal",
    explanation: "A cat is a small domesticated carnivorous mammal often kept as a pet.",
  },
  {
    question: "What is the opposite of 'up'?",
    answer: "Down",
    explanation: "The opposite of 'up' is 'down', which refers to a lower position or direction.",
  },
  {
    question: "What is the capital of Brazil?",
    answer: "Brasília",
    explanation: "Brasília is the capital of Brazil, known for its modernist architecture and urban planning.",
  },
];

let currentExerciseQuestionIndex = 0; 
const correctExerciseAnswers = [];
const similarityThreshold = 0.8; 


function calculateSimilarity(str1, str2) {
  const normalize = (str) => str.toLowerCase().trim();
  const [a, b] = [normalize(str1), normalize(str2)];
  let matches = 0;

  for (let i = 0; i < Math.min(a.length, b.length); i++) {
    if (a[i] === b[i]) matches++;
  }

  return matches / Math.max(a.length, b.length);
}


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


function addCorrectAnswer(question, userAnswer, correctAnswer, explanation) {
  const correctAnswersList = document.getElementById("correct-answers-list");

  
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

  
  correctAnswersList.appendChild(answerBlock);
}


document.getElementById("exercise-submit").addEventListener("click", () => {
  const userAnswer = document.getElementById("exercise-input").value.trim();
  const currentQuestion = exerciseQuestions[currentExerciseQuestionIndex];

  
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
    ); 
    currentExerciseQuestionIndex++; 
    showNextQuestion(); 
  } else {
    document.getElementById("exercise-feedback").textContent =
      "Resposta incorreta!";
  }

  document.getElementById("exercise-input").value = ""; 
});


btnExercises.addEventListener("click", () => {
  hideAllSections(); 
  exercisesContainer.style.display = "block"; 
  currentExerciseIndex = 0; 
  randomExercises = getRandomExercises(); 
  loadExercise(); 
});


showNextQuestion();

document.addEventListener('keydown', (event) => {
  const key = event.key;

  
  if (key === 'Enter') {
    
    if (document.getElementById('register-container').style.display === 'block') {
      document.getElementById('start-button').click();
    }

    
    if (document.getElementById('login-container').style.display === 'block') {
      document.getElementById('login-button').click();
    }

    
    if (document.getElementById('exercises-container').style.display === 'block') {
      document.getElementById('exercise-submit').click();
    }
  }

  
  if (key === 'Escape') {
    
    if (document.getElementById('register-container').style.display === 'block') {
      document.getElementById('go-login').click();
    }

    
    if (document.getElementById('login-container').style.display === 'block') {
      document.getElementById('go-register').click();
    }

    
    if (document.getElementById('exercises-container').style.display === 'block') {
      document.getElementById('backButtonExercises').click();
    }

    
    if (document.getElementById('quiz-warning-container').style.display === 'block') {
      document.getElementById('quiz-warning-back-button').click();
    }

    
    const quizContainers = [
      document.getElementById('quiz-container')
      
    ];

    const isInQuiz = quizContainers.some(container => container && container.style.display === 'block');
    if (!isInQuiz) {
      backToMenu(); 
    }
  }
});


const backToMenuButton = document.getElementById("backToMenuButton");
if (backToMenuButton) {
  backToMenuButton.addEventListener("click", () => {
    
    congratulationsContainer.style.display = "none";
    perguntasEndScreen.style.display = "none";
    spanishEndScreen.style.display = "none";
    frenchEndScreen.style.display = "none";
    
    menuContainer.style.display = "block";
  });
};




const skipExerciseButton = document.createElement("button");
skipExerciseButton.id = "skip-exercise-button";
skipExerciseButton.textContent = "Pular Exercício";
skipExerciseButton.style.marginLeft = "10px";


const exerciseSubmitBtn = document.getElementById("exercise-submit");
if (exerciseSubmitBtn && exerciseSubmitBtn.parentNode) {
  exerciseSubmitBtn.parentNode.insertBefore(skipExerciseButton, exerciseSubmitBtn.nextSibling);
}


skipExerciseButton.addEventListener("click", () => {
  currentExerciseQuestionIndex++;
  document.getElementById("exercise-feedback").textContent = "Exercício pulado!";
  showNextQuestion();
  document.getElementById("exercise-input").value = "";
});





