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

// Botões
const startButton        = document.getElementById("start-button");
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

// Elementos do Quiz Inglês
const questionElement = document.getElementById("question");
const optionsElement  = document.getElementById("options");
const scoreElement    = document.getElementById("score");
const timerElement    = document.getElementById("timer");
const finalMessageElement = document.getElementById("final-message");
const errorListElement   = document.getElementById("error-list");
const rankingList        = document.getElementById("ranking-list");

// Elementos do Quiz Perguntas
const perguntasQuestionElement = document.getElementById("perguntas-question");
const perguntasOptionsElement  = document.getElementById("perguntas-options");
const perguntasScoreElement    = document.getElementById("perguntas-score");
const perguntasTimerElement    = document.getElementById("perguntas-timer");
const perguntasFinalMessageElement = document.getElementById("perguntas-final-message");
const perguntasErrorListElement   = document.getElementById("perguntas-error-list");

// Elementos Espanhol
const spanishQuestionElement = document.getElementById("spanish-question");
const spanishOptionsElement  = document.getElementById("spanish-options");
const spanishScoreElement    = document.getElementById("spanish-score");
const spanishTimerElement    = document.getElementById("spanish-timer");
const spanishFinalMessageEl  = document.getElementById("spanish-final-message");
const spanishErrorListEl     = document.getElementById("spanish-error-list");

// Elementos Francês
const frenchQuestionElement = document.getElementById("french-question");
const frenchOptionsElement  = document.getElementById("french-options");
const frenchScoreElement    = document.getElementById("french-score");
const frenchTimerElement    = document.getElementById("french-timer");
const frenchFinalMessageEl  = document.getElementById("french-final-message");
const frenchErrorListEl     = document.getElementById("french-error-list");

// Função genérica para esconder todas as seções
function hideAllSections() {
  [
    registerContainer, menuContainer,
    quizContainer, perguntasContainer, perguntasQuizContainer,
    libraryContainer, rankingContainer, endScreen, perguntasEndScreen,
    spanishMenuContainer, spanishQuizContainer, spanishEndScreen, spanishLibraryContainer,
    frenchMenuContainer, frenchQuizContainer, frenchEndScreen, frenchLibraryContainer
  ].forEach(sec => sec && (sec.style.display = "none"));
}

// Função de voltar ao menu
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
  "backButtonFrench", "backButtonFrenchLibrary", "backButtonFrenchEndScreen"
].forEach(id => {
  const btn = document.getElementById(id);
  if (btn) btn.addEventListener("click", backToMenu);
});

// --- CADASTRO ---
startButton.addEventListener("click", async () => {
  const nameInput   = document.getElementById("name").value.trim();
  const numberInput = document.getElementById("number").value.trim();

  if (!nameInput || !numberInput) {
    alert("Por favor, preencha todos os campos!");
    return;
  }

  hideAllSections();
  try {
    await addDoc(collection(db, "users"), { name: nameInput, number: numberInput });
    menuContainer.style.display = "block";
  } catch (err) {
    console.error("Erro ao salvar no Firestore:", err);
    alert("Não foi possível cadastrar. Tente novamente.");
    registerContainer.style.display = "block";
  }
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
function checkAnswer(sel) {
  const q = questions[currentQuestion];
  const opts = optionsElement.querySelectorAll("li");
  opts.forEach((li,i)=>{
    li.classList.remove("correct","wrong");
    if (i===q.answer) li.classList.add("correct");
    else if (i===sel) li.classList.add("wrong");
    li.style.pointerEvents="none";
  });
  if (sel===q.answer) { score++; scoreElement.textContent = score; }
  else errors.push(`Pergunta: ${q.question} - Resposta: ${q.options[q.answer]}`);
  setTimeout(()=>{
    currentQuestion++; loadQuestion();
  },1500);
}
function endQuiz() {
  stopTimer();
  quizContainer.style.display = "none";
  endScreen.style.display = "block";
  finalMessageElement.textContent = `Pontuação Final: ${score}/${questions.length} | Tempo: ${quizTimer}s`;
  errorListElement.innerHTML = errors.map(e=>`<li class="error-item">${e}</li>`).join("");
  saveScore(document.getElementById("name").value.trim(), score, quizTimer);
}

// Listener quiz
btnQuiz.addEventListener("click", ()=>{
  hideAllSections();
  quizContainer.style.display = "block";
  questions = getRandomQuestions();
  score = 0; currentQuestion = 0; errors = [];
  scoreElement.textContent = score;
  startTimer();
  loadQuestion();
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
    if (i===q.answer) li.classList.add("correct");
    else if (i===sel) li.classList.add("wrong");
    li.style.pointerEvents="none";
  });
  if (sel===q.answer) { perguntasScore++; perguntasScoreElement.textContent=perguntasScore; }
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
btnRanking.addEventListener("click", async ()=>{
  hideAllSections();
  rankingContainer.style.display="block";
  rankingList.innerHTML="";
  const snap = await getDocs(collection(db,"users"));
  let users = [];
  snap.forEach(doc=> users.push({ name: doc.data().name, score: doc.data().score||0, time: doc.data().time||9999 }));
  users = users.filter(u=>u.time!==9999).sort((a,b)=>(b.score-a.score)|| (a.time-b.time));
  users.forEach((u,i)=>{
    const li = document.createElement("li");
    li.className="animate-in";
    li.style.animationDelay=`${i*0.1}s`;
    li.innerHTML=`<span>${i+1}. ${u.name}</span><span>Pontos: ${u.score} | Tempo: ${u.time}s</span>`;
    rankingList.appendChild(li);
  });
});

// --- QUIZ ESPAÑOL ---
let spanishQuestions = [], spanishScore = 0, currentSpanishQuestion = 0, spanishErrors = [], spanishTimer = 0, spanishTimerInterval;
function getRandomSpanishQuestions() {
  const all = [
    { question: "¿Cómo se dice 'Hello' en español?", options:["Hola","Adiós","Gracias","Por favor"], answer:0 },
    { question: "¿Qué significa 'Goodbye' en español?", options:["Hola","Adiós","Buenas noches","Gracias"], answer:1 },
    { question: "¿Cómo se dice 'Thank you' en español?", options:["Por favor","Gracias","De nada","Perdón"], answer:1 },
    { question: "¿Cuál es el plural de 'amigo'?", options:["Amigos","Amigas","Amigoes","Amigues"], answer:0 },
    { question: "¿Cómo se dice 'I am learning Spanish' en español?", options:["Estoy aprendiendo español","Aprendo español","Yo español aprendo","Aprendiendo estoy español"], answer:0 }
  ];
  return [...all].sort(()=>Math.random()-0.5).slice(0,15);
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
    spanishQuestionElement.textContent=q.question;
    spanishOptionsElement.innerHTML="";
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

// --- QUIZ FRANÇAIS ---
let frenchQuestions = [], frenchScore = 0, currentFrenchQuestion = 0, frenchErrors = [], frenchTimer = 0, frenchTimerInterval;
function getRandomFrenchQuestions() {
  const all = [
    { question: "Comment dit-on 'Hello' en français?", options:["Bonjour","Au revoir","Merci","S'il vous plaît"], answer:0 },
    { question: "Que signifie 'Goodbye' en français?", options:["Bonjour","Au revoir","Bonne nuit","Merci"], answer:1 },
    { question: "Comment dit-on 'Thank you' en français?", options:["S'il vous plaît","Merci","De rien","Pardon"], answer:1 },
    { question: "Quel est le pluriel de 'ami'?", options:["Amis","Amies","Amis","Ami(e)s"], answer:0 },
    { question: "Comment dit-on 'I am learning French' en français?", options:["J'apprends le français","Je français apprends","J'apprendrai le français","Je suis en train d'apprendre le français"], answer:0 }
  ];
  return [...all].sort(()=>Math.random()-0.5).slice(0,15);
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
    frenchQuestionElement.textContent=q.question;
    frenchOptionsElement.innerHTML="";
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


// Aguarda o DOM carregar para garantir que os elementos existam
document.addEventListener("DOMContentLoaded", () => {
  // Seleciona todos os headers das seções da biblioteca
  const headers = document.querySelectorAll(".text-card .text-header");

  headers.forEach(header => {
    // Adiciona um listener de clique em cada header
    header.addEventListener("click", () => {
      // O próximo elemento do header é o .text-content correspondente
      const content = header.nextElementSibling;
      // Alterna a classe 'active' para mostrar/ocultar o conteúdo
      content.classList.toggle("active");
    });
  });
});

// --- DADOS FIXOS ---
const allQuestions = [
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
  { question: "Whatés the opposite of 'hot'?", options: ["Boiling", "Cool", "Cold", "Warm"], answer: 2, difficulty: "easy", libraryRef: "vocabulary" },
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
];
