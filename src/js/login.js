function formatCpf(value) {
  return value
    .replace(/\D/g, "")
    .slice(0, 11) // Limita a 11 números
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

document.getElementById("cpf").addEventListener("input", function (e) {
  e.target.value = formatCpf(e.target.value);
});

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function generateKeyboard() {
  const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  shuffle(digits);
  const keys = digits.slice(0, 5).map((digit, index) => {
    const pair = digits[(index + 5) % 10];
    return `${digit} ou ${pair}`;
  });
  keys.push("Apagar");

  const keyboard = document.getElementById("keyboard");
  keyboard.innerHTML = "";

  keys.forEach((key) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "key";
    button.textContent = key;
    button.onclick = () => handleKeyPress(key);
    keyboard.appendChild(button);
  });
}

function handleKeyPress(key) {
  const senhaInput = document.getElementById("senha");
  if (key === "Apagar") {
    senhaInput.value = senhaInput.value.slice(0, -1);
  } else {
    if (senhaInput.value.length < 6) {
      senhaInput.value += key.split(" ou ")[Math.floor(Math.random() * 2)];
    }
  }
}

document.addEventListener("DOMContentLoaded", generateKeyboard);

document
  .getElementById("loginForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const cpf = document.getElementById("cpf").value;
    const senha = document.getElementById("senha").value;

    if (senha.length !== 6) {
      alert("A senha deve ter exatamente 6 dígitos.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cpf, senha }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Login realizado com sucesso!");
        window.location.href = "dashboard.html";
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  });
