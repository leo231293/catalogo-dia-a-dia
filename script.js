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
