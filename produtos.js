const products = [
  {
    nome: "Kit Facas Inox",
    categoria: "Cozinha",
    imagem: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600",
    preco: "129,90",
    precoAntigo: "179,90",
    novo: true,
    promocao: true,
    link: "#",
  },
  {
    nome: "Organizador Multiuso",
    categoria: "Utilidades",
    imagem:
      "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=600",
    preco: "59,90",
    precoAntigo: "",
    novo: true,
    promocao: false,
    link: "#",
  },
  {
    nome: "Kit Banheiro",
    categoria: "Higiene",
    imagem:
      "https://images.unsplash.com/photo-1600857062241-98e5dba7f214?w=600",
    preco: "89,90",
    precoAntigo: "119,90",
    novo: false,
    promocao: true,
    link: "#",
  },
];

const grid = document.getElementById("productsGrid");
const buttons = document.querySelectorAll(".tab-btn");

function renderProducts(type) {
  grid.innerHTML = "";

  let filtered = [];

  if (type === "novidades") {
    filtered = products.filter((p) => p.novo);
  }
  if (type === "promocoes") {
    filtered = products.filter((p) => p.promocao);
  }

  filtered.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
            <div class="product-image" style="background-image:url('${product.imagem}')">
                ${product.novo ? `<span class="badge badge-new">Novo</span>` : ""}
                ${product.promocao ? `<span class="badge badge-sale" style="top:50px;">Promoção</span>` : ""}
            </div>
            <div class="product-info">
                <p class="product-category">${product.categoria}</p>
                <h3 class="product-name">${product.nome}</h3>
                <div class="product-price">
                    ${product.precoAntigo ? `<span class="old-price">R$ ${product.precoAntigo}</span>` : ""}
                    <span class="new-price">R$ ${product.preco}</span>
                </div>
                <a href="${product.link}" class="buy-btn">Ver produto →</a>
            </div>
        `;
    grid.appendChild(card);
  });
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buttons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    renderProducts(button.dataset.tab);
  });
});

renderProducts("novidades");
