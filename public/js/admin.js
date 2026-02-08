async function loadTopCustomers() {
  const data = await apiRequest("/analytics/top-customers", "GET", null, true);
  const container = document.getElementById("top-customers");
  container.innerHTML = "";

  data.forEach(c => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h4>User ID</h4>
      <p>${c._id}</p>
      <p>Orders: ${c.ordersCount}</p>
      <p>Total Spent: $${c.totalSpent}</p>
    `;
    container.appendChild(card);
  });
}

async function loadBestProducts() {
  const data = await apiRequest("/analytics/best-products", "GET", null, true);
  const container = document.getElementById("best-products");
  container.innerHTML = "";

  data.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h4>${p.name}</h4>
      <p>Sold: ${p.totalSold}</p>
      <p>Revenue: $${p.revenue}</p>
    `;
    container.appendChild(card);
  });
}

async function loadRevenue() {
  const data = await apiRequest("/analytics/revenue", "GET", null, true);
  const div = document.getElementById("revenue");

  div.innerHTML = `
    <h4>Total Revenue</h4>
    <p>$${data.totalRevenue}</p>
    <p>Total Orders: ${data.ordersCount}</p>
  `;
}

loadTopCustomers();
loadBestProducts();
loadRevenue();
