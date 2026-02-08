const API = {
  token: () => localStorage.getItem("token"),

  async request(url, options = {}) {
    const headers = options.headers || {};
    if (API.token()) headers.Authorization = `Bearer ${API.token()}`;

    const res = await fetch(url, { ...options, headers });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.message || "Request failed");
    return data;
  },

  me() {
    return API.request("/api/auth/me");
  },

  products() {
    return API.request("/api/products");
  },

  createOrder(items) {
    return API.request("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items })
    });
  },

  myOrders() {
    return API.request("/api/orders/my");
  },

  deleteOrder(id) {
    return API.request(`/api/orders/${id}`, { method: "DELETE" });
  },

  cancelOrder(id) {
    return API.request(`/api/orders/${id}/cancel`, { method: "PATCH" });
  }
};

document.addEventListener("DOMContentLoaded", async () => {
  const loginLink = document.getElementById("login-link");
  const registerLink = document.getElementById("register-link");
  const logoutBtn = document.getElementById("logout-btn");
  const userName = document.getElementById("user-name");

  const token = API.token();
  if (!token) return;

  try {
    const me = await API.me();
    if (loginLink) loginLink.style.display = "none";
    if (registerLink) registerLink.style.display = "none";
    if (logoutBtn) logoutBtn.style.display = "inline-block";
  } catch {
    localStorage.removeItem("token");
  }

  if (logoutBtn) {
    logoutBtn.onclick = () => {
      localStorage.removeItem("token");
      location.href = "/";
    };
  }
});
