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
  { question: "Which one is correct?", options: ["She don’t like coffee", "She doesn’t like coffee", "She not like coffee", "She no like coffee"], answer: 1 },
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

// Função para embaralhar as perguntas e selecionar 5 aleatórias
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

function loadQuestion() {
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
  if (selected === q.answer) {
    score++;
  } else {
    errors.push(`Q: ${q.question} - R: ${q.options[q.answer]}`);
  }
  currentQuestion++;
  loadQuestion();
}

function endQuiz() {
  quizContainer.style.display = "none";
  endScreen.style.display = "block";
  finalMessageElement.textContent = `Pontuação: ${score}/10`;

  errorListElement.innerHTML = errors
    .map(err => `<li class="error-item">${err}</li>`)
    .join("");
}

restartButton.onclick = () => {
  score = 0;
  currentQuestion = 0;
  errors = [];
  questions = getRandomQuestions(); // Nova seleção aleatória de perguntas
  quizContainer.style.display = "block";
  endScreen.style.display = "none";
  loadQuestion();
};

document.getElementById("quizTab").onclick = () => {
  quizContainer.style.display = "block";
  document.getElementById("library-container").style.display = "none";
  endScreen.style.display = "none";
  questions = getRandomQuestions(); // Garante novas perguntas ao acessar
  loadQuestion();
};

document.getElementById("libraryTab").onclick = () => {
  document.getElementById("library-container").style.display = "block";
  quizContainer.style.display = "none";
  endScreen.style.display = "none";
};

loadQuestion();

function checkAnswer(selected) {
  const q = questions[currentQuestion];
  
  // Obter todas as opções para atualizá-las visualmente
  const options = optionsElement.getElementsByTagName('li');
  
  // Marcar a opção correta em verde e a errada em vermelho
  for (let i = 0; i < options.length; i++) {
    options[i].style.backgroundColor = i === q.answer ? 'green' : (i === selected ? 'red' : '#9B59B6');
    options[i].style.pointerEvents = 'none'; // Desabilitar o clique nas opções após a seleção
  }

  // Se a resposta selecionada estiver correta, incrementa o score
  if (selected === q.answer) {
    score++;
  } else {
    errors.push(`Q: ${q.question} - R: ${q.options[q.answer]}`);
  }

  // Atraso antes de carregar a próxima pergunta
  setTimeout(() => {
    currentQuestion++;
    loadQuestion();
  }, 1000); // 1 segundo de delay para visualização do feedback
}

// Função para atualizar o contador de acertos
function updateScore() {
  const scoreElement = document.getElementById("score");
  scoreElement.textContent = score; // Atualiza a pontuação exibida
}

function checkAnswer(selected) {
  const q = questions[currentQuestion];
  
  // Obter todas as opções para atualizá-las visualmente
  const options = optionsElement.getElementsByTagName('li');
  
  // Marcar a opção correta em verde e a errada em vermelho
  for (let i = 0; i < options.length; i++) {
    options[i].style.backgroundColor = i === q.answer ? 'green' : (i === selected ? 'red' : '#9B59B6');
    options[i].style.pointerEvents = 'none'; // Desabilitar o clique nas opções após a seleção
  }

  // Se a resposta selecionada estiver correta, incrementa o score
  if (selected === q.answer) {
    score++;
    updateScore(); // Atualiza o contador de acertos
  } else {
    errors.push(`Q: ${q.question} - R: ${q.options[q.answer]}`);
  }

  // Atraso antes de carregar a próxima pergunta
  setTimeout(() => {
    currentQuestion++;
    loadQuestion();
  }, 1000); // 1 segundo de delay para visualização do feedback
}
