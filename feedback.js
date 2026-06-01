// ─── FEEDBACK ───────────────────────────────────────────

const btnEnviar = document.getElementById("feedback-btn");
const inputNome = document.getElementById("feedback-nome");
const inputTexto = document.getElementById("feedback-texto");
const feedbackLista = document.getElementById("feedback-lista");

const STORAGE_KEY = "diaadia_feedbacks";

let estrelasSelecionadas = 5;

// ─── CRIAR SELETOR DE ESTRELAS ─────────────────────────
function criarSeletorEstrelas() {
  const form = document.querySelector(".feedback-form");
  if (!form || document.getElementById("star-selector")) return;

  const wrapper = document.createElement("div");
  wrapper.id = "star-selector";
  wrapper.style.cssText = "display:flex; gap:4px; margin-bottom:0.25rem;";

  for (let i = 1; i <= 5; i++) {
    const star = document.createElement("span");
    star.textContent = "★";
    star.dataset.valor = i;
    star.style.cssText = `
            font-size: 1.2rem;
            cursor: pointer;
            color: ${i <= estrelasSelecionadas ? "#c8a96e" : "rgba(245,240,232,0.2)"};
            transition: color 0.2s;
        `;
    star.addEventListener("click", () => {
      estrelasSelecionadas = i;
      atualizarEstrelas();
    });
    star.addEventListener("mouseover", () => {
      document.querySelectorAll("#star-selector span").forEach((s, idx) => {
        s.style.color = idx < i ? "#e8d5b0" : "rgba(245,240,232,0.2)";
      });
    });
    star.addEventListener("mouseout", atualizarEstrelas);
    wrapper.appendChild(star);
  }

  const textarea = form.querySelector("textarea");
  form.insertBefore(wrapper, textarea);
}

function atualizarEstrelas() {
  document.querySelectorAll("#star-selector span").forEach((s, idx) => {
    s.style.color =
      idx < estrelasSelecionadas ? "#c8a96e" : "rgba(245,240,232,0.2)";
  });
}

// ─── CARREGAR FEEDBACKS DA HOME ────────────────────────
function carregarFeedbacks() {
  if (!feedbackLista) return;
  feedbackLista.innerHTML = "";
  const aprovados = JSON.parse(
    localStorage.getItem("diaadia_aprovados") || "[]",
  );
  aprovados.forEach((fb) => renderItem(fb));
}

// ─── RENDER ITEM ───────────────────────────────────────
function renderItem({ nome, texto, estrelas }) {
  const div = document.createElement("div");
  div.classList.add("feedback-item");
  const stars = "★".repeat(estrelas || 5) + "☆".repeat(5 - (estrelas || 5));
  div.innerHTML = `
        <p class="fb-nome">${escapeHtml(nome)}</p>
        <p style="color:#c8a96e;font-size:0.75rem;margin-bottom:0.2rem;">${stars}</p>
        <p class="fb-texto">${escapeHtml(texto)}</p>
    `;
  feedbackLista.prepend(div);
}

// ─── SALVAR FEEDBACK ───────────────────────────────────
function salvarFeedback(nome, texto) {
  const salvos = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  const novo = {
    id: Date.now(),
    nome: nome.trim(),
    texto: texto.trim(),
    estrelas: estrelasSelecionadas,
    data: new Date().toISOString(),
    status: "pendente",
    home: false,
  };
  salvos.unshift(novo);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(salvos));
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
  let msg = document.querySelector(".feedback-sucesso");
  if (!msg) {
    msg = document.createElement("p");
    msg.classList.add("feedback-sucesso");
    msg.textContent = "✓ Comentário enviado para análise!";
    btnEnviar.after(msg);
  }
  msg.classList.add("visivel");
  setTimeout(() => msg.classList.remove("visivel"), 3000);
}

// ─── BOTÃO ENVIAR ──────────────────────────────────────
if (btnEnviar) {
  btnEnviar.addEventListener("click", () => {
    const nome = inputNome.value.trim();
    const texto = inputTexto.value.trim();

    if (!nome || !texto) {
      inputNome.style.borderColor = nome ? "" : "var(--accent)";
      inputTexto.style.borderColor = texto ? "" : "var(--accent)";
      return;
    }

    inputNome.style.borderColor = "";
    inputTexto.style.borderColor = "";

    salvarFeedback(nome, texto);
    mostrarSucesso();

    inputNome.value = "";
    inputTexto.value = "";
    estrelasSelecionadas = 5;
    atualizarEstrelas();
  });
}

// ─── START ─────────────────────────────────────────────
criarSeletorEstrelas();
carregarFeedbacks();
