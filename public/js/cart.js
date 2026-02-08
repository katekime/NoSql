const cartKey = "cart";

function getCart() {
  return JSON.parse(localStorage.getItem(cartKey) || "[]");
}

function setCart(cart) {
  localStorage.setItem(cartKey, JSON.stringify(cart));
}

function renderCart() {
  const cartDiv = document.getElementById("cart");
  const totalEl = document.getElementById("totalPrice");
  const cart = getCart();

  cartDiv.innerHTML = "";

  let total = 0;

  cart.forEach((item, idx) => {
    total += item.price * item.quantity;

    const row = document.createElement("div");
    row.className = "card cart-row";
    row.innerHTML = `
      <img class="cart-img" src="${item.imageUrl || "/images/default.jpg"}" alt="">
      <h3>${item.name}</h3>
      <p>$${item.price} × ${item.quantity}</p>
      <div style="display:flex; gap:8px;">
        <button>-</button>
        <button>+</button>
        <button>Remove</button>
      </div>
    `;

    const [minusBtn, plusBtn, removeBtn] = row.querySelectorAll("button");

    minusBtn.onclick = () => {
      if (item.quantity > 1) item.quantity--;
      else cart.splice(idx, 1);
      setCart(cart);
      renderCart();
    };

    plusBtn.onclick = () => {
      item.quantity++;
      setCart(cart);
      renderCart();
    };

    removeBtn.onclick = () => {
      cart.splice(idx, 1);
      setCart(cart);
      renderCart();
    };

    cartDiv.appendChild(row);
  });

  totalEl.textContent = `Total: $${total.toFixed(2)}`;
}

async function placeOrder() {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Please login first");
    location.href = "/pages/Login.html";
    return;
  }

  const cart = getCart();
  if (cart.length === 0) return alert("Cart is empty");

  const items = cart.map((x) => ({ productId: x.productId, quantity: x.quantity }));

  try {
    await API.createOrder(items);
    localStorage.removeItem(cartKey);
    alert("Order placed ");
    location.href = "/pages/Orders.html";
  } catch (e) {
    alert(e.message);
  }
}

renderCart();
