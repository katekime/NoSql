const cartKey = "cart";

function getCart() {
  return JSON.parse(localStorage.getItem(cartKey) || "[]");
}

function setCart(cart) {
  localStorage.setItem(cartKey, JSON.stringify(cart));
}

function addToCart(product) {
  const cart = getCart();
  const found = cart.find((x) => x.productId === product._id);
  if (found) found.quantity += 1;
  else cart.push({ productId: product._id, name: product.name, price: product.price, imageUrl: product.imageUrl, quantity: 1 });
  setCart(cart);
  alert("Added to cart ");
}

async function loadMenu() {
  const list = document.getElementById("menu-list");
  list.innerHTML = "";

  const products = await API.products();

  products.forEach((p) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img class="product-img" src="${p.imageUrl || "/images/default.jpg"}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>$${p.price}</p>
      <button class="btn-primary">Add to cart</button>
    `;

    card.querySelector("button").onclick = () => addToCart(p);
    list.appendChild(card);
  });
}

loadMenu();
