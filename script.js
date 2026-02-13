const productData = {
  id: "lexic-cuf-ring",
  name: "The Lexic Cuf Ring",
  price: 6990,
  currency: "$",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  specifications:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  features: [
    { label: "Gold", value: "18k", desc: "Lorem ipsum dolor sit amet" },
    { label: "Diamond", value: "2.4c", desc: "Lorem ipsum dolor sit amet" },
    { label: "Clarity", value: "92%", desc: "Lorem ipsum dolor sit amet" },
  ],
  gallery: [
    "assets/The Luxe Cut Ring.png",
    "assets/The Lexical Cuf Ring.png",
    "assets/Screenshot 2025-12-27 at 1.57.06 PM 3.png",
    "assets/Screenshot 2025-12-27 at 11.27.12 PM 1.png",
  ],
  options: {
    colors: [
      { id: "color1", name: "Gold", image: "assets/masa.png" },
      { id: "color2", name: "Silver", image: "assets/masa.png" },
      { id: "color3", name: "Rose Gold", image: "assets/masa.png" },
    ],
    sizes: ["S", "5.5", "6", "6.5", "7", "7.5", "8", "8.5"],
  },
};

const collectionData = [
  { id: 1, name: "First Product Name", price: 1500, image: "assets/ring1.png" },
  {
    id: 2,
    name: "Second Product Name",
    price: 1500,
    image: "assets/ring2.png",
  },
  { id: 3, name: "Third Product Name", price: 1500, image: "assets/ring3.png" },
  {
    id: 4,
    name: "Fourth Product Name",
    price: 1500,
    image: "assets/ring4.png",
  },
];

let cartCount = 0;
let selectedColor = productData.options.colors[0].id;
let selectedSize = productData.options.sizes[4];

function init() {
  renderMainProduct();
  renderSmallCollection();
  handleAllClicks();
}

function renderMainProduct() {
  const container = document.getElementById("product-container");
  const d = productData;

  let galleryMarkup = `
    <div class="product__gallery">
      <div class="gallery__item gallery__item--main">
        <img src="${d.gallery[0]}" class="gallery__img" id="main-image" alt="${
    d.name
  }">
      </div>
      <div class="gallery__item gallery__item--vertical">
        <img src="${d.gallery[1]}" class="gallery__img" alt="Detail 1">
      </div>
      <div class="gallery__item gallery__item--square">
        <img src="${d.gallery[2]}" class="gallery__img" alt="Detail 2">
      </div>
      <div class="gallery__item gallery__item--square">
        <img src="${d.gallery[3]}" class="gallery__img" alt="Detail 3">
      </div>
    </div>
    <div class="product__thumbnails">
      ${d.gallery
        .map(
          (img, i) => `
        <img src="${img}" class="product__thumbnail ${
            i === 0 ? "product__thumbnail--active" : ""
          }" data-index="${i}">
      `
        )
        .join("")}
    </div>
  `;

  let infoMarkup = `
    <div class="product__info">
      <h1 class="product__title title-underline">${d.name}</h1>
      <p class="product__price">${d.currency}${d.price.toLocaleString()}</p>
      
      <p class="product__desc">${d.description}</p>
      <a class="product__specs-link">Piece Specifications</a>
      <p class="product__desc">${d.specifications}</p>

      <div class="product__features">
        ${d.features
          .map(
            (f) => `
          <div class="feature">
            <span class="feature__label">${f.label}</span>
            <span class="feature__value">${f.value}</span>
            <span class="feature__desc">${f.desc}</span>
          </div>
        `
          )
          .join("")}
      </div>

      <div class="selector">
        <span class="selector__label">Color</span>
        <div class="selector__list">
          ${d.options.colors
            .map(
              (c) => `
            <div class="swatch ${
              selectedColor === c.id ? "swatch--active" : ""
            }" data-color="${c.id}">
              <img src="${c.image}" alt="${c.name}">
            </div>
          `
            )
            .join("")}
        </div>
      </div>

      <div class="selector">
        <span class="selector__label">Size</span>
        <div class="selector__list">
          ${d.options.sizes
            .map(
              (s) => `
            <button class="size-btn ${
              selectedSize === s ? "size-btn--active" : ""
            }" data-size="${s}">${s}</button>
          `
            )
            .join("")}
        </div>
      </div>

      <div class="product__actions">
        <button id="add-to-cart" class="btn-add">Add To Cart</button>
        <button class="btn-wish">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" stroke="black" stroke-width="1.2"/>
          </svg>
        </button>
      </div>
    </div>
  `;

  container.innerHTML = galleryMarkup + infoMarkup;
}

function renderSmallCollection() {
  const collectionList = document.getElementById("collection-list");
  collectionList.innerHTML = `
    <div class="collection__grid">
      ${collectionData
        .map(
          (item) => `
        <div class="card">
          <div class="card__img-box">
            <img src="${item.image}" class="card__img" alt="${item.name}">
          </div>
          <span class="card__name">${item.name}</span>
          <span class="card__price">$${item.price.toLocaleString()}</span>
        </div>
      `
        )
        .join("")}
    </div>
  `;
}

function handleAllClicks() {
  document
    .getElementById("product-container")
    .addEventListener("click", function (e) {
      const swatch = e.target.closest(".swatch");
      if (swatch) {
        selectedColor = swatch.getAttribute("data-color");
        document
          .querySelectorAll(".swatch")
          .forEach((s) => s.classList.remove("swatch--active"));
        swatch.classList.add("swatch--active");
      }

      if (e.target.classList.contains("size-btn")) {
        selectedSize = e.target.getAttribute("data-size");
        document
          .querySelectorAll(".size-btn")
          .forEach((b) => b.classList.remove("size-btn--active"));
        e.target.classList.add("size-btn--active");
      }

      if (e.target.id === "add-to-cart") {
        cartCount++;
        document.getElementById("cart-counter").innerText = cartCount;
        const btn = e.target;
        btn.innerText = "Added to Cart";
        btn.style.backgroundColor = "#FFFFFF";
        btn.style.color = "#000000";
        setTimeout(function () {
          btn.innerText = "Add To Cart";
          btn.style.backgroundColor = "";
          btn.style.color = "";
        }, 2000);
      }

      const thumb = e.target.closest(".product__thumbnail");
      if (thumb) {
        document.getElementById("main-image").src = thumb.src;
        document
          .querySelectorAll(".product__thumbnail")
          .forEach((t) => t.classList.remove("product__thumbnail--active"));
        thumb.classList.add("product__thumbnail--active");
      }

      if (
        e.target.classList.contains("gallery__img") &&
        e.target.id !== "main-image"
      ) {
        const main = document.getElementById("main-image");
        const clickedSrc = e.target.src;
        e.target.src = main.src;
        main.src = clickedSrc;
      }
    });

  window.addEventListener("scroll", function () {
    const header = document.querySelector(".header");
    if (window.scrollY > 50) {
      header.style.background = "rgba(0,0,0,0.9)";
      header.style.padding = "20px 0";
    } else {
      header.style.background = "transparent";
      header.style.padding = "40px 0";
    }
  });
}

document.addEventListener("DOMContentLoaded", init);
