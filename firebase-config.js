import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBCVGQk1Ctp1IZJrHQdM6YUSItaD3pypjg",
  authDomain: "testspeakeasy.firebaseapp.com",
  projectId: "testspeakeasy",
  storageBucket: "testspeakeasy.firebasestorage.app",
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
};

document.getElementById("libraryTab").onclick = () => {
  document.getElementById("library-container").style.display = "block";
  document.getElementById("quiz-container").style.display = "none";
  document.getElementById("ranking-container").style.display = "none";
};

document.getElementById("rankingTab").onclick = async () => {
  document.getElementById("ranking-container").style.display = "block";
  document.getElementById("quiz-container").style.display = "none";
  document.getElementById("library-container").style.display = "none";

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
    li.textContent = `${index + 1}. ${user.name} - Pontos: ${user.score}`;
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

// Chame esta função quando o quiz terminar
document.getElementById("restart-button").addEventListener("click", () => {
  const userName = document.getElementById("name").value;
  const finalScore = parseInt(document.getElementById("score").textContent, 10);

  saveScore(userName, finalScore);
});
