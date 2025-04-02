import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";  
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";  

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

document.getElementById("start-button").addEventListener("click", async () => {  
  const name = document.getElementById("name").value;  
  const number = document.getElementById("number").value;  

  if (name && number) {  
    try {  
      await addDoc(collection(db, "users"), { name, number });  
      document.getElementById("register-container").style.display = "none";  
      document.getElementById("main-container").style.display = "block";  
      document.getElementById("quiz-container").style.display = "block";  
    } catch (error) {  
      console.error("Erro ao salvar no Firestore: ", error);  
    }  
  } else {  
    alert("Preencha todos os campos!");  
  }  
});  

// Alternar entre abas  
document.getElementById("quizTab").onclick = () => {  
  document.getElementById("quiz-container").style.display = "block";  
  document.getElementById("library-container").style.display = "none";  
  document.getElementById("ranking-container").style.display = "none";  
  document.getElementById("end-screen").style.display = "none";  
};  

document.getElementById("libraryTab").onclick = () => {  
  document.getElementById("library-container").style.display = "block";  
  document.getElementById("quiz-container").style.display = "none";  
  document.getElementById("ranking-container").style.display = "none";  
  document.getElementById("end-screen").style.display = "none";  
};  

document.getElementById("rankingTab").onclick = async () => {  
  document.getElementById("ranking-container").style.display = "block";  
  document.getElementById("quiz-container").style.display = "none";  
  document.getElementById("library-container").style.display = "none";  
  document.getElementById("end-screen").style.display = "none";  

  const rankingList = document.getElementById("ranking-list");  
  rankingList.innerHTML = "";  

  const querySnapshot = await getDocs(collection(db, "users"));  
  const users = [];  

  querySnapshot.forEach(doc => {  
    let userData = doc.data();  
    users.push({  
      name: userData.name,  
      score: userData.score || 0 // Se não existir, assume 0  
    });  
  });  

  users.sort((a, b) => b.score - a.score);  

  users.forEach((user, index) => {  
    const li = document.createElement("li");  
    li.className = "animate-in";
    li.style.animationDelay = `${index * 0.1}s`;
    li.innerHTML = `
      <span>${index + 1}. ${user.name}</span>
      <span>Pontos: ${user.score}</span>
    `;  
    rankingList.appendChild(li);  
  });  
};  

async function saveScore(userName, score) {  
  const querySnapshot = await getDocs(collection(db, "users"));  
  let userDoc;  

  querySnapshot.forEach((doc) => {  
    if (doc.data().name === userName) {  
      userDoc = doc.ref;  
    }  
  });  

  if (userDoc) {  
    await updateDoc(userDoc, { score: score });  
  }  
}  

const allQuestions = [  
  { question: "What is 'eu sou estudante' in English?", options: ["I am a student", "I am student", "I student am", "A student I am"], answer: 0 },  
  { question: "Which one is correct?", options: ["Do you like pizza?", "Like pizza you?", "Pizza do you like?", "You pizza like?"], answer: 0 },  
  { question: "What does 'I am learning English' mean?", options: ["Eu estou aprendendo inglês", "Eu aprendi inglês", "Eu ensino inglês", "Eu amo inglês"], answer: 0 },  
  { question: "How do you say 'Onde você mora?' in English?", options: ["Where are you living?", "Where do you live?", "Where is you live?", "Where you live?"], answer: 1 },  
  { question: "What is the plural of 'child'?", options: ["Childs", "Children", "Childes", "Childern"], answer: 1 },  
  { question: "What does 'She is my sister' mean?", options: ["Ela é minha irmã", "Ela é minha prima", "Ela é minha mãe", "Ela é minha amiga"], answer: 0 },  
  { question: "Which sentence is correct?", options: ["He have a car", "He has a car", "He are a car", "He do have car"], answer: 1 },  
  { question: "How do you say 'Eu gosto de ler livros' in English?", options: ["I like to read books", "I likes to read books", "I am like to read books", "I reading books"], answer: 0 },  
  { question: "What is 'yesterday' in Portuguese?", options: ["Amanhã", "Ontem", "Hoje", "Depois"], answer: 1 },  
  { question: "Which one is correct?", options: ["She don't like coffee", "She doesn't like coffee", "She not like coffee", "She no like coffee"], answer: 1 },  
  { question: "Translate: 'They are my friends'", options: ["Eles são meus amigos", "Eles foram meus amigos", "Eles estavam meus amigos", "Eles é meus amigos"], answer: 0 },  
  { question: "What does 'goodbye' mean?", options: ["Olá", "Obrigado", "Adeus", "Por favor"], answer: 2 },  
  { question: "What is the opposite of 'cold'?", options: ["Hot", "Warm", "Cool", "Frozen"], answer: 0 },  
  { question: "Choose the correct sentence", options: ["She go to school", "She goes to school", "She going to school", "She is go to school"], answer: 1 },  
  { question: "How do you say 'Nós estamos felizes' in English?", options: ["We is happy", "We are happy", "We am happy", "We do happy"], answer: 1 },  
  { question: "What is the past of 'eat'?", options: ["Ate", "Eaten", "Eating", "Eats"], answer: 0 },  
  { question: "What is 'verde' in English?", options: ["Red", "Blue", "Green", "Yellow"], answer: 2 },  
  { question: "Which is correct?", options: ["She have a dog", "She has a dog", "She do has a dog", "She has dog"], answer: 1 },  
  { question: "How do you say 'Me ajuda, por favor' in English?", options: ["Help me, please", "Please me help", "Me help please", "Please, I need help"], answer: 0 },  
  { question: "What does 'tired' mean?", options: ["Feliz", "Cansado", "Bravo", "Triste"], answer: 1 }  
];  

function getRandomQuestions() {  
  const shuffled = allQuestions.sort(() => Math.random() - 0.5);  
  return shuffled.slice(0, 10);  
}  

let questions = getRandomQuestions();  
let score = 0;  
let currentQuestion = 0;  
let errors = [];  

const questionElement = document.getElementById("question");  
const optionsElement = document.getElementById("options");  
const quizContainer = document.getElementById("quiz-container");  
const endScreen = document.getElementById("end-screen");  
const finalMessageElement = document.getElementById("final-message");  
const errorListElement = document.getElementById("error-list");  
const restartButton = document.getElementById("restart-button");  
const progressBar = document.querySelector(".progress");  

function loadQuestion() {  
  // Atualizar barra de progresso
  const progress = (currentQuestion / questions.length) * 100;
  progressBar.style.width = `${progress}%`;
  
  if (currentQuestion < questions.length) {  
    const q = questions[currentQuestion];  
    questionElement.textContent = q.question;  
    optionsElement.innerHTML = "";  
    
    q.options.forEach((option, index) => {  
      const li = document.createElement("li");  
      li.textContent = option;  
      li.onclick = () => checkAnswer(index);  
      optionsElement.appendChild(li);  
    });  
  } else {  
    endQuiz();  
  }  
}  

function checkAnswer(selected) {  
  const q = questions[currentQuestion];  
  const options = optionsElement.getElementsByTagName("li");  

  for (let i = 0; i < options.length; i++) {  
    options[i].classList.remove("correct", "wrong");
    if (i === q.answer) {
      options[i].classList.add("correct");
    } else if (i === selected) {
      options[i].classList.add("wrong");
    }
    options[i].style.pointerEvents = "none";  
  }  

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
  document.getElementById("score").textContent = score;  
}  

function endQuiz() {  
  quizContainer.style.display = "none";  
  endScreen.style.display = "block";  
  finalMessageElement.textContent = `Pontuação Final: ${score}/10`;  

  errorListElement.innerHTML = errors  
    .map(err => `<li class="error-item">${err}</li>`)  
    .join("");  
    
  // Salvar pontuação
  const userName = document.getElementById("name").value;
  saveScore(userName, score);
}  

restartButton.onclick = () => {  
  score = 0;  
  currentQuestion = 0;  
  errors = [];  
  questions = getRandomQuestions();  
  quizContainer.style.display = "block";  
  endScreen.style.display = "none";  
  updateScore();
  progressBar.style.width = "0%";
  loadQuestion();  
};  

// Efeitos de hover dinâmicos para os botões
document.querySelectorAll('.tab-button, .restart-button').forEach(button => {
  button.addEventListener('mousemove', (e) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    button.style.setProperty('--x', `${x}px`);
    button.style.setProperty('--y', `${y}px`);
  });
});

loadQuestion();