const DATA = {
  product: {
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
  },
  collection: [
    {
      id: 1,
      name: "First Product Name",
      price: 1500,
      image: "assets/ring1.png",
    },
    {
      id: 2,
      name: "Second Product Name",
      price: 1500,
      image: "assets/ring2.png",
    },
    {
      id: 3,
      name: "Third Product Name",
      price: 1500,
      image: "assets/ring3.png",
    },
    {
      id: 4,
      name: "Fourth Product Name",
      price: 1500,
      image: "assets/ring4.png",
    },
  ],
};

class StoreApp {
  constructor() {
    this.cartCount = 0;
    this.selectedColor = DATA.product.options.colors[0].id;
    this.selectedSize = DATA.product.options.sizes[4];

    this.init();
  }

  init() {
    this.render();
    this.setupEvents();
  }

  render() {
    const product = DATA.product;
    const container = document.getElementById("product-container");
    const collectionList = document.getElementById("collection-list");

    // Product Content
    container.innerHTML = `
      <div class="product__gallery">
        <div class="gallery__item gallery__item--main">
          <img src="${
            product.gallery[0]
          }" class="gallery__img" id="main-image" alt="Product">
        </div>
        <div class="gallery__item gallery__item--vertical">
          <img src="${product.gallery[1]}" class="gallery__img" alt="Detail 1">
        </div>
        <div class="gallery__item gallery__item--square">
          <img src="${product.gallery[2]}" class="gallery__img" alt="Detail 2">
        </div>
        <div class="gallery__item gallery__item--square">
          <img src="${product.gallery[3]}" class="gallery__img" alt="Detail 3">
        </div>
      </div>

      <div class="product__thumbnails">
        ${product.gallery
          .map(
            (img, i) => `
          <img src="${img}" class="product__thumbnail ${
              i === 0 ? "product__thumbnail--active" : ""
            }">
        `
          )
          .join("")}
      </div>

      <div class="product__info">
        <h1 class="product__title title-underline">${product.name}</h1>
        <div class="product__price">${
          product.currency
        }${product.price.toLocaleString()}</div>
        
        <p class="product__desc">${product.description}</p>
        <span class="product__specs-link">Piece Specifications</span>
        <p class="product__desc">${product.specifications}</p>

        <div class="product__features">
          ${product.features
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
            ${product.options.colors
              .map(
                (c) => `
              <div class="swatch ${
                this.selectedColor === c.id ? "swatch--active" : ""
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
            ${product.options.sizes
              .map(
                (s) => `
              <button class="size-btn ${
                this.selectedSize === s ? "size-btn--active" : ""
              }">${s}</button>
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

    // Collection Grid
    collectionList.innerHTML = `
      <div class="collection__grid">
        ${DATA.collection
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

  setupEvents() {
    const container = document.getElementById("product-container");

    container.addEventListener("click", (e) => {
      // Swatches selection
      const swatch = e.target.closest(".swatch");
      if (swatch) {
        this.selectedColor = swatch.dataset.color;
        document
          .querySelectorAll(".swatch")
          .forEach((s) => s.classList.remove("swatch--active"));
        swatch.classList.add("swatch--active");
      }

      // Size Selection
      if (e.target.classList.contains("size-btn")) {
        this.selectedSize = e.target.textContent;
        document
          .querySelectorAll(".size-btn")
          .forEach((b) => b.classList.remove("size-btn--active"));
        e.target.classList.add("size-btn--active");
      }

      // Add To Cart
      if (e.target.id === "add-to-cart") {
        this.cartCount++;
        document.getElementById("cart-counter").textContent = this.cartCount;

        const btn = e.target;
        btn.textContent = "Added to Cart";
        btn.style.backgroundColor = "#FFFFFF";
        btn.style.color = "#000000";
        setTimeout(() => {
          btn.textContent = "Add To Cart";
          btn.style.backgroundColor = "";
          btn.style.color = "";
        }, 2000);
      }

      // Thumbnails & Gallery Swapping
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
        const temp = main.src;
        main.src = e.target.src;
        e.target.src = temp;
      }
    });

    // Sticky UI States
    window.addEventListener("scroll", () => {
      const header = document.querySelector(".header");
      header.classList.toggle("header--sticky", window.scrollY > 50);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => new StoreApp());
