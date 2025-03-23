// Firebase configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "speaky-easy.firebaseapp.com",
  databaseURL: "https://speaky-easy.firebaseio.com",
  projectId: "speaky-easy",
  storageBucket: "speaky-easy.appspot.com",
  messagingSenderId: "522004854120",
  appId: "1:522004854120:web:1de713d6ed885c104712dd",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Exemplo: Salvar um usuário no Firebase
function salvarUsuario(nome, telefone) {
  database.ref("usuarios/").push({
    nome: nome,
    telefone: telefone,
    pontuacao: 0, // Inicializando com 0 pontos
  });
}

// Perguntas do quiz
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

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next");
const scoreElement = document.getElementById("score");
const registerContainer = document.getElementById("register-container");
const quizContainer = document.getElementById("quiz-container");

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
    nextButton.textContent = "End of Quiz!";
    nextButton.disabled = true;
    showMessage();
  }
}

function showMessage() {
  let message = '';
  if (score === questions.length) {
    message = "Parabéns! Você acertou todas as perguntas!";
  } else if (score >= questions.length / 2) {
    message = "Bom trabalho! Você tem um bom conhecimento!";
  } else {
    message = "Você pode melhorar, continue praticando!";
  }

  scoreElement.innerHTML = `Pontuação: ${score}<br>${message}`;

  // Exibe a tela de cadastro após a pontuação
  setTimeout(() => {
    quizContainer.style.display = 'none';
    registerContainer.style.display = 'block';
  }, 2000);
}

nextButton.addEventListener("click", () => {
  loadQuestion();
  nextButton.disabled = true; // Disable the button until an answer is selected
});

document.getElementById("register-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;

  // Salva os dados no Firebase
  const newUserRef = ref(database, 'users/' + Date.now());
  set(newUserRef, {
    name: name,
    phone: phone
  });

  alert("Cadastro realizado com sucesso!");

  // Limpa o formulário e esconde a tela de cadastro
  document.getElementById("name").value = '';
  document.getElementById("phone").value = '';
  registerContainer.style.display = 'none';
  quizContainer.style.display = 'block';
  score = 0;
  currentQuestion = 0;
  loadQuestion();
});

loadQuestion(); // Load the first question

 // notas 
async function getData() {
  const querySnapshot = await getDocs(collection(db, "numero"));
  querySnapshot.forEach((doc) => {
    // doc.data() é nunca indefinido para documentos querySnapshot não vazios
    console.log(doc.id, " => ", doc.data());
  });
}

getData();

