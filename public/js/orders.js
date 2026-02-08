async function loadOrders() {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Please login first");
    location.href = "/pages/Login.html";
    return;
  }

  const container = document.getElementById("orders");
  container.innerHTML = "";

  try {
    const orders = await API.myOrders();

    if (orders.length === 0) {
      container.innerHTML = "<p>No orders yet.</p>";
      return;
    }

    orders.forEach((o) => {
      const div = document.createElement("div");
      div.className = "card";

      const itemsHtml = o.items
        .map((it) => `<li>${it.nameSnapshot} — $${it.priceSnapshot} × ${it.quantity}</li>`)
        .join("");

      div.innerHTML = `
        <h3>Order ID: ${o._id}</h3>
        <p>Status: <b>${o.status}</b></p>
        <ul>${itemsHtml}</ul>
        <p><b>Total:</b> $${o.totalPrice.toFixed(2)}</p>
        <div style="display:flex; gap:8px;">
          <button class="btn-danger">Delete</button>
          <button class="btn-secondary">Cancel</button>
        </div>
      `;

      const [delBtn, cancelBtn] = div.querySelectorAll("button");

      delBtn.onclick = async () => {
        await API.deleteOrder(o._id);
        loadOrders();
      };

      cancelBtn.onclick = async () => {
        try {
          await API.cancelOrder(o._id);
          loadOrders();
        } catch (e) {
          alert(e.message);
        }
      };

      container.appendChild(div);
    });
  } catch (e) {
    alert(e.message);
  }
}

loadOrders();
