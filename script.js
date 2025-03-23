const questions = [
    {
        question: "Como se diz 'Olá' em inglês?",
        options: ["Hello", "Bye", "Thanks", "Sorry"],
        answer: "Hello"
    },
    {
        question: "Como se diz 'Obrigado' em francês?",
        options: ["Merci", "Bonjour", "Au revoir", "Pardon"],
        answer: "Merci"
    },
    {
        question: "Como se diz 'Desculpa' em espanhol?",
        options: ["Perdón", "Gracias", "Hola", "Adiós"],
        answer: "Perdón"
    }
];

let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
    const questionElement = document.getElementById("question");
    const optionsContainer = document.getElementById("options");
    const feedbackElement = document.getElementById("feedback");
    const nextButton = document.getElementById("next-btn");

    // Limpar a área de resposta
    optionsContainer.innerHTML = "";
    feedbackElement.innerText = "";
    nextButton.style.display = "none";

    // Carregar pergunta
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    // Criar botões de resposta
    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("option");
        button.onclick = () => checkAnswer(button, currentQuestion.answer);
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(button, correctAnswer) {
    const feedbackElement = document.getElementById("feedback");
    const nextButton = document.getElementById("next-btn");

    if (button.innerText === correctAnswer) {
        button.classList.add("correct");
        feedbackElement.innerText = "Correto!";
        score++;
        document.getElementById("score").innerText = score;
    } else {
        button.classList.add("wrong");
        feedbackElement.innerText = "Errado! A resposta correta é: " + correctAnswer;
    }

    // Desativar botões após resposta
    document.querySelectorAll(".option").forEach(btn => btn.disabled = true);

    nextButton.style.display = "block";
}

function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        document.querySelector(".container").innerHTML = `<h1>Fim do Jogo!</h1>
            <p>Você acertou ${score} de ${questions.length} perguntas.</p>`;
    }
}

// Carregar primeira pergunta ao iniciar
loadQuestion();
