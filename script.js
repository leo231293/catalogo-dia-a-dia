// ─── CAROUSEL ───────────────────────────────────────────
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const progress = document.getElementById("progress");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let current = 0;
let timer;

function goTo(index) {
  slides[current].classList.remove("active");
  dots[current].classList.remove("active");

  current = (index + slides.length) % slides.length;

  slides[current].classList.add("active");
  dots[current].classList.add("active");

  // Reinicia barra de progresso
  progress.style.animation = "none";
  progress.offsetHeight; // forçar reflow
  progress.style.animation = "progress 5s linear infinite";
}

function autoPlay() {
  timer = setInterval(() => goTo(current + 1), 5000);
}

function resetPlay(index) {
  clearInterval(timer);
  goTo(index);
  autoPlay();
}

nextBtn.addEventListener("click", () => resetPlay(current + 1));
prevBtn.addEventListener("click", () => resetPlay(current - 1));

dots.forEach((dot, i) => {
  dot.addEventListener("click", () => resetPlay(i));
});

// Suporte a teclado
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") resetPlay(current + 1);
  if (e.key === "ArrowLeft") resetPlay(current - 1);
});

autoPlay();
const btnMobile = document.getElementById("btn-mobile");

function toggleMenu(event) {
  if (event.type === "touchstart") event.preventDefault();

  const navbar = document.querySelector(".navbar");
  navbar.classList.toggle("active");

  const active = navbar.classList.contains("active");
  document.body.style.overflow = active ? "hidden" : "";
  event.currentTarget.setAttribute("aria-expanded", active);
  event.currentTarget.setAttribute(
    "aria-label",
    active ? "Fechar menu" : "Abrir menu",
  );
}

btnMobile.addEventListener("click", toggleMenu);
btnMobile.addEventListener("touchstart", toggleMenu);

// Fechar ao clicar nos links
const menuLinks = document.querySelectorAll(".nav-links a");
menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const navbar = document.querySelector(".navbar");
    navbar.classList.remove("active");
    document.body.style.overflow = "";
    btnMobile.setAttribute("aria-expanded", false);
    btnMobile.setAttribute("aria-label", "Abrir menu");
  });
});

// Fechar ao clicar fora
document.addEventListener("click", (event) => {
  const navbar = document.querySelector(".navbar");
  const clickDentro = navbar.contains(event.target);

  if (!clickDentro && navbar.classList.contains("active")) {
    navbar.classList.remove("active");
    document.body.style.overflow = "";
    btnMobile.setAttribute("aria-expanded", false);
    btnMobile.setAttribute("aria-label", "Abrir menu");
  }
});
