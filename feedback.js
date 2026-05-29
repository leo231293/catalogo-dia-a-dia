// ─── FEEDBACK ───────────────────────────────────────────

const btnEnviar = document.getElementById("feedback-btn");
const inputNome = document.getElementById("feedback-nome");
const inputTexto = document.getElementById("feedback-texto");
const feedbackLista = document.getElementById("feedback-lista");

const STORAGE_KEY = "diaadia_feedbacks";

// ─── CARREGAR FEEDBACKS DA HOME ────────────────────────

function carregarFeedbacks() {

  if (!feedbackLista) return;

  const salvos =
    JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

  feedbackLista.innerHTML = "";

  const aprovados = salvos.filter(
    (fb) =>
      fb.status === "aprovado" &&
      fb.home === true
  );

  aprovados.forEach((fb) => renderItem(fb));
}

// ─── RENDER ITEM ───────────────────────────────────────

function renderItem({ nome, texto }) {

  const div = document.createElement("div");

  div.classList.add("feedback-item");

  div.innerHTML = `
    <p class="fb-nome">${escapeHtml(nome)}</p>
    <p class="fb-texto">${escapeHtml(texto)}</p>
  `;

  feedbackLista.prepend(div);
}

// ─── SALVAR FEEDBACK ───────────────────────────────────

function salvarFeedback(nome, texto) {

  const salvos =
    JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

  const novo = {

    id: Date.now(),

    nome: nome.trim(),

    texto: texto.trim(),

    data: new Date().toISOString(),

    status: "pendente",

    home: false,
  };

  salvos.unshift(novo);

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(salvos)
  );
}

// ─── ESCAPE HTML ───────────────────────────────────────

function escapeHtml(str) {

  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ─── SUCESSO ───────────────────────────────────────────

function mostrarSucesso() {

  let msg =
    document.querySelector(".feedback-sucesso");

  if (!msg) {

    msg = document.createElement("p");

    msg.classList.add("feedback-sucesso");

    msg.textContent =
      "✓ Comentário enviado para análise!";

    btnEnviar.after(msg);
  }

  msg.classList.add("visivel");

  setTimeout(() => {
    msg.classList.remove("visivel");
  }, 3000);
}

// ─── BOTÃO ENVIAR ──────────────────────────────────────

if (btnEnviar) {

  btnEnviar.addEventListener("click", () => {

    const nome = inputNome.value.trim();

    const texto = inputTexto.value.trim();

    if (!nome || !texto) {

      inputNome.style.borderColor =
        nome ? "" : "red";

      inputTexto.style.borderColor =
        texto ? "" : "red";

      return;
    }

    inputNome.style.borderColor = "";
    inputTexto.style.borderColor = "";

    salvarFeedback(nome, texto);

    mostrarSucesso();

    inputNome.value = "";

    inputTexto.value = "";
  });
}

// ─── START ─────────────────────────────────────────────

carregarFeedbacks();