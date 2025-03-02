document.addEventListener("DOMContentLoaded", () => {
  const cliente = {
    nome: "Fulano de Tal",
    agencia: "1234",
    conta: "56789-0",
    saldo: "1.234,56",
  };

  document.getElementById("nomeCliente").textContent = cliente.nome;
  document.getElementById("agencia").textContent = cliente.agencia;
  document.getElementById("conta").textContent = cliente.conta;
  document.getElementById("saldo").textContent = cliente.saldo;

  function updateDateTime() {
    const now = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    const formattedDate = now.toLocaleDateString("pt-BR", options);
    document.getElementById("current-date").textContent = formattedDate;
  }

  function startTimer(duration, display) {
    let timer = duration,
      minutes,
      seconds;
    const interval = setInterval(() => {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;

      if (--timer < 0) {
        clearInterval(interval);
        window.location.href = "home.html";
      }
    }, 1000);
  }

  updateDateTime();
  setInterval(updateDateTime, 1000);
  const tenMinutes = 60 * 10,
    display = document.querySelector("#timer");
  startTimer(tenMinutes, display);
});
