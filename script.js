
"use strict";

const $ = (selector) => document.querySelector(selector);
const money = (amount) => "₹" + amount.toLocaleString("en-IN");

const products = [
  {id:1,name:"Wireless Headphones",category:"Electronics",price:1499,rating:4.5,image:"photo-1505740420928-5e560c06d30e"},
  {id:2,name:"Bluetooth Speaker",category:"Electronics",price:1199,rating:4.4,image:"photo-1608043152269-423dbba4e7e1"},
  {id:3,name:"Smart TV",category:"Electronics",price:18999,rating:4.6,image:"photo-1593359677879-a4bb92f829d1"},
  {id:4,name:"Gaming Laptop",category:"Electronics",price:54999,rating:4.8,image:"photo-1603302576837-37561b2e2302"},
  {id:5,name:"Wireless Mouse",category:"Electronics",price:599,rating:4.3,image:"photo-1527814050087-3793815479db"},
  {id:6,name:"Mechanical Keyboard",category:"Electronics",price:1599,rating:4.5,image:"photo-1587829741301-dc798b83add3"},
  {id:7,name:"Smartphone Pro",category:"Mobiles",price:24999,rating:4.7,image:"photo-1511707171634-5f897ff02aa9"},
  {id:8,name:"Android Smartphone",category:"Mobiles",price:14999,rating:4.5,image:"photo-1598327105666-5b89351aff97"},
  {id:9,name:"Tablet",category:"Mobiles",price:17999,rating:4.4,image:"photo-1544244015-0df4b3ffc6b0"},
  {id:10,name:"Smart Watch",category:"Accessories",price:2499,rating:4.6,image:"photo-1523275335684-37898b6baf30"},
  {id:11,name:"Classic Sneakers",category:"Fashion",price:1999,rating:4.7,image:"photo-1542291026-7eec264c27ff"},
  {id:12,name:"Travel Backpack",category:"Fashion",price:1199,rating:4.4,image:"photo-1553062407-98eeb64c6a62"},
  {id:13,name:"Casual T-Shirt",category:"Fashion",price:499,rating:4.3,image:"photo-1521572163474-6864f9cf17ab"},
  {id:14,name:"Modern Table Lamp",category:"Home",price:899,rating:4.4,image:"photo-1507473885765-e6ed057f782c"},
  {id:15,name:"Coffee Mug Set",category:"Home",price:499,rating:4.2,image:"photo-1514228742587-6b1558fcca3d"},
  {id:16,name:"Sunglasses",category:"Accessories",price:699,rating:4.3,image:"photo-1511499767150-a48a237f0083"},
  {id:17,name:"Skincare Kit",category:"Beauty",price:799,rating:4.5,image:"photo-1608248543803-ba4f8c70ae0b"},
  {id:18,name:"Story Book",category:"Books",price:299,rating:4.4,image:"photo-1544947950-fa07a98d237f"},
  {id:19,name:"Travel Water Bottle",category:"Home",price:399,rating:4.2,image:"photo-1602143407151-7111542de6e8"},
  {id:20,name:"Fashion Handbag",category:"Fashion",price:1299,rating:4.6,image:"photo-1584917865442-de89df76afd3"},
  {id:21,name:"Premium Gaming Laptop",category:"Electronics",price:72999,rating:4.8,image:"photo-1496181133206-80ce9b88a853"},
  {id:22,name:"Laptop Stand",category:"Electronics",price:799,rating:4.3,image:"photo-1527864550417-7fd91fc51a46"},
  {id:23,name:"Wireless Earbuds",category:"Electronics",price:1299,rating:4.5,image:"photo-1606220945770-b5b6c2c55bf1"},
  {id:24,name:"Power Bank",category:"Electronics",price:899,rating:4.4,image:"photo-1609091839311-d5365f9ff1c5"},
  {id:25,name:"Digital Camera",category:"Electronics",price:32999,rating:4.7,image:"photo-1516035069371-29a1b244cc32"},
  {id:26,name:"Fitness Band",category:"Accessories",price:1499,rating:4.2,image:"photo-1575311373937-040b8e1fd5b6"},
  {id:27,name:"Running Shoes",category:"Fashion",price:1799,rating:4.6,image:"photo-1460353581641-37baddab0fa2"},
  {id:28,name:"Denim Jacket",category:"Fashion",price:1599,rating:4.3,image:"photo-1551028719-00167b16eac5"},
  {id:29,name:"Office Chair",category:"Home",price:5999,rating:4.5,image:"photo-158坐",},
  {id:30,name:"Desk Organizer",category:"Home",price:449,rating:4.1,image:"photo-1494438639946-1ebd1d20bf85"},
  {id:31,name:"Perfume",category:"Beauty",price:999,rating:4.5,image:"photo-1541643600914-78b084683601"},
  {id:32,name:"Makeup Brush Set",category:"Beauty",price:499,rating:4.3,image:"photo-1522335789203-aabd1fc54bc9"},
  {id:33,name:"Notebook Set",category:"Books",price:199,rating:4.2,image:"photo-1531346878377-a5be20888e57"},
  {id:34,name:"Art Sketchbook",category:"Books",price:349,rating:4.4,image:"photo-1513364776144-60967b0f800f"},
  {id:35,name:"Wall Clock",category:"Home",price:699,rating:4.1,image:"photo-1563861826100-9cb868fdbe1d"},
  {id:36,name:"Leather Wallet",category:"Accessories",price:499,rating:4.2,image:"photo-1627123424574-724758594e93"},
  {id:37,name:"Portable Projector",category:"Electronics",price:8999,rating:4.4,image:"photo-1535016120720-40c646be5580"},
  {id:38,name:"Gaming Controller",category:"Electronics",price:2499,rating:4.6,image:"photo-1592840496694-26d035b52b48"},
  {id:39,name:"Bedsheet Set",category:"Home",price:1299,rating:4.3,image:"photo-1631049307264-da0ec9d70304"},
  {id:40,name:"Scented Candle",category:"Home",price:349,rating:4.2,image:"photo-1603006905003-be475563bc59"}
];

// Fix the office-chair image ID to a valid image.
products.find(p => p.id === 29).image = "photo-1598300053653-7d9e8b9a4a7e";

const cart = new Map();
const wishlist = new Set();

let activeCategory = "All";
let searchTerm = "";
let showAllProducts = false;
let authMode = "login";
let toastTimer;
let pendingBuyId = null;

function imageURL(product) {
  return `https://images.unsplash.com/${product.image}?auto=format&fit=crop&w=600&q=80`;
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function getProduct(id) {
  return products.find(p => p.id === Number(id));
}

function filteredProducts() {
  const query = searchTerm.toLowerCase();

  return products.filter(p => {
    const categoryMatch = activeCategory === "All" || p.category === activeCategory;
    const searchMatch = `${p.name} ${p.category}`.toLowerCase().includes(query);
    return categoryMatch && searchMatch;
  });
}

function renderProducts() {
  const filtered = filteredProducts();
  const visible = showAllProducts || searchTerm || activeCategory !== "All"
    ? filtered
    : filtered.slice(0, 20);

  $("#resultCount").textContent = `${visible.length} of ${filtered.length} products`;
  $("#productGrid").hidden = visible.length === 0;
  $("#emptyMessage").hidden = visible.length !== 0;

  $("#productGrid").innerHTML = visible.map((p, index) => `
    <article class="product-card" style="animation-delay:${Math.min(index * 25, 250)}ms">
      <div class="product-image">
        <img src="${imageURL(p)}" alt="${p.name}" loading="lazy"
          onerror="this.onerror=null;this.src='https://placehold.co/600x400/eee5ff/7138ed?text=SmartCart'">
        <span class="product-badge">${p.category}</span>
        <button class="heart-btn ${wishlist.has(p.id) ? "liked" : ""}"
          data-action="wishlist" data-id="${p.id}" type="button"
          aria-label="Add ${p.name} to wishlist">${wishlist.has(p.id) ? "♥" : "♡"}</button>
      </div>
      <div class="product-info">
        <span class="product-category">${p.category}</span>
        <h3>${p.name}</h3>
        <div class="rating">★★★★★ <span>${p.rating} / 5</span></div>
        <div class="product-bottom"><span class="price">${money(p.price)}</span></div>
        <div class="product-buttons">
          <button class="add-btn" data-action="add" data-id="${p.id}" type="button">
            ${cart.has(p.id) ? "✓ Added (" + cart.get(p.id) + ")" : "+ Add to Cart"}
          </button>
          <button class="buy-btn" data-action="buy" data-id="${p.id}" type="button">Buy Now →</button>
        </div>
      </div>
    </article>
  `).join("");

  const canExplore = activeCategory === "All" && !searchTerm;
  $("#exploreMore").hidden = !canExplore || filtered.length <= 20;
  $("#exploreMore").textContent = showAllProducts ? "Show Less ↑" : "Explore More Products ↓";
  $("#moreMessage").textContent = showAllProducts
    ? "You are viewing the full collection."
    : `Showing ${visible.length} products. Explore ${Math.max(filtered.length - visible.length, 0)} more.`;
}

function updateCounts() {
  let quantity = 0;
  cart.forEach(q => quantity += q);
  $("#cartCount").textContent = quantity;
  $("#wishCount").textContent = wishlist.size;
}

function cartTotal() {
  let total = 0;
  cart.forEach((quantity, id) => {
    const p = getProduct(id);
    if (p) total += p.price * quantity;
  });
  return total;
}

function addToCart(id) {
  const p = getProduct(id);
  if (!p) return;
  cart.set(p.id, (cart.get(p.id) || 0) + 1);
  updateCounts();
  renderProducts();
  renderCart();
  showToast(`${p.name} added to cart 🛒`);
}

function toggleWishlist(id) {
  const p = getProduct(id);
  if (!p) return;

  if (wishlist.has(p.id)) {
    wishlist.delete(p.id);
    showToast("Removed from wishlist");
  } else {
    wishlist.add(p.id);
    showToast("Added to wishlist 💜");
  }

  updateCounts();
  renderProducts();
  renderWishlist();
}

function renderCart() {
  if (cart.size === 0) {
    $("#cartItems").innerHTML = `<div class="empty-cart"><div>🛒</div><h3>Your cart is empty</h3><p>Add a few products to get started!</p></div>`;
  } else {
    $("#cartItems").innerHTML = [...cart.entries()].map(([id, quantity]) => {
      const p = getProduct(id);
      return `
        <article class="cart-item">
          <img src="${imageURL(p)}" alt="${p.name}" onerror="this.src='https://placehold.co/150?text=Product'">
          <div><h4>${p.name}</h4><p>${money(p.price * quantity)}</p>
            <div class="quantity-controls">
              <button data-cart="minus" data-id="${id}" type="button">−</button>
              <span>${quantity}</span>
              <button data-cart="plus" data-id="${id}" type="button">+</button>
              <button class="remove-btn" data-cart="remove" data-id="${id}" type="button">Remove</button>
            </div>
          </div>
        </article>`;
    }).join("");
  }

  $("#cartTotal").textContent = money(cartTotal());
  $("#checkoutTotal").textContent = money(cartTotal());
  $("#qrTotal").textContent = money(cartTotal());
  $("#checkoutBtn").disabled = cart.size === 0;
}

function renderWishlist() {
  const items = products.filter(p => wishlist.has(p.id));

  $("#wishlistItems").innerHTML = items.length ? items.map(p => `
    <article class="cart-item">
      <img src="${imageURL(p)}" alt="${p.name}" onerror="this.src='https://placehold.co/150?text=Product'">
      <div><h4>${p.name}</h4><p>${money(p.price)}</p>
        <div class="quantity-controls">
          <button data-wish="add" data-id="${p.id}" type="button">+ Add to Cart</button>
          <button class="remove-btn" data-wish="remove" data-id="${p.id}" type="button">Remove</button>
        </div>
      </div>
    </article>
  `).join("") : `<div class="empty-cart"><div>💜</div><h3>Your wishlist is empty</h3><p>Tap a heart on any product to save it.</p></div>`;
}

function openPanel(id) {
  closePanels();
  $(id).classList.add("open");
  document.body.style.overflow = "hidden";
}

function closePanels() {
  document.querySelectorAll(".overlay").forEach(el => el.classList.remove("open"));
  document.body.style.overflow = "";
}

document.querySelectorAll("[data-close]").forEach(button => {
  button.addEventListener("click", closePanels);
});

document.querySelectorAll(".overlay").forEach(overlay => {
  overlay.addEventListener("click", event => {
    if (event.target === overlay) closePanels();
  });
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closePanels();
});

function chooseCategory(category) {
  activeCategory = category;
  showAllProducts = category !== "All" || Boolean(searchTerm);

  document.querySelectorAll(".category").forEach(button => {
    button.classList.toggle("active", button.dataset.category === category);
  });

  renderProducts();
  $("#productsSection").scrollIntoView({ behavior: "smooth" });
}

$("#categoryButtons").addEventListener("click", event => {
  const button = event.target.closest("[data-category]");
  if (button) chooseCategory(button.dataset.category);
});

document.querySelectorAll("[data-quick]").forEach(button => {
  button.addEventListener("click", () => chooseCategory(button.dataset.quick));
});

$("#searchInput").addEventListener("input", event => {
  searchTerm = event.target.value.trim();
  showAllProducts = Boolean(searchTerm) || activeCategory !== "All";
  renderProducts();
});

$("#searchForm").addEventListener("submit", event => {
  event.preventDefault();
  searchTerm = $("#searchInput").value.trim();
  showAllProducts = true;
  renderProducts();
  $("#productsSection").scrollIntoView({ behavior: "smooth" });
});

$("#resetSearch").addEventListener("click", () => {
  searchTerm = "";
  activeCategory = "All";
  showAllProducts = false;
  $("#searchInput").value = "";
  document.querySelectorAll(".category").forEach(b => b.classList.toggle("active", b.dataset.category === "All"));
  renderProducts();
});

$("#exploreMore").addEventListener("click", () => {
  showAllProducts = !showAllProducts;
  renderProducts();
  if (!showAllProducts) $("#productsSection").scrollIntoView({ behavior: "smooth" });
});

$("#shopNow").addEventListener("click", () => {
  $("#productsSection").scrollIntoView({ behavior: "smooth" });
});

$("#productGrid").addEventListener("click", event => {
  const button = event.target.closest("[data-action]");
  if (!button) return;

  const id = Number(button.dataset.id);
  if (button.dataset.action === "add") addToCart(id);
  if (button.dataset.action === "wishlist") toggleWishlist(id);
  if (button.dataset.action === "buy") buyNow(id);
});

$("#cartBtn").addEventListener("click", () => {
  renderCart();
  openPanel("#cartOverlay");
});

$("#wishlistBtn").addEventListener("click", () => {
  renderWishlist();
  openPanel("#wishlistOverlay");
});

$("#cartItems").addEventListener("click", event => {
  const button = event.target.closest("[data-cart]");
  if (!button) return;

  const id = Number(button.dataset.id);
  const current = cart.get(id) || 0;

  if (button.dataset.cart === "plus") cart.set(id, current + 1);
  if (button.dataset.cart === "minus") {
    if (current <= 1) cart.delete(id);
    else cart.set(id, current - 1);
  }
  if (button.dataset.cart === "remove") cart.delete(id);

  updateCounts();
  renderCart();
  renderProducts();
});

$("#wishlistItems").addEventListener("click", event => {
  const button = event.target.closest("[data-wish]");
  if (!button) return;
  if (button.dataset.wish === "add") addToCart(button.dataset.id);
  if (button.dataset.wish === "remove") toggleWishlist(button.dataset.id);
});

$("#continueShopping").addEventListener("click", closePanels);

// LOGIN AND SIGNUP: browser-local demo accounts
const ACCOUNTS_KEY = "smartcart_accounts_v1";
const SESSION_KEY = "smartcart_session_v1";

function getAccounts() {
  try { return JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || "[]"); }
  catch { return []; }
}
function getCurrentUser() {
  const email = localStorage.getItem(SESSION_KEY);
  return getAccounts().find(user => user.email === email) || null;
}
async function hashPassword(password, salt) {
  const bytes = new TextEncoder().encode(salt + password);
  const hash = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, "0")).join("");
}
function setAuthMode(mode) {
  authMode = mode;
  const signup = mode === "signup";
  $("#authTitle").textContent = signup ? "Create Your Account ✨" : "Welcome Back 👋";
  $("#nameLabel").hidden = !signup;
  $("#authName").hidden = !signup;
  $("#authName").required = signup;
  $("#authName").value = "";
  $("#authPassword").autocomplete = signup ? "new-password" : "current-password";
  $("#authSubmit").textContent = signup ? "Create Account" : "Login";
  document.querySelectorAll("[data-auth]").forEach(button => button.classList.toggle("active", button.dataset.auth === mode));
}
function updateProfileUI() {
  const user = getCurrentUser();
  $("#loginBtn").textContent = user ? "👤 " + user.name : "👤 Login / Sign Up";
  $("#profileName").textContent = user?.name || "";
  $("#profileEmail").textContent = user?.email || "";
  $("#profileModalName").textContent = user?.name || "";
  $("#profileModalEmail").textContent = user?.email || "";
  $("#profileDetailName").textContent = user?.name || "";
  $("#profileDetailEmail").textContent = user?.email || "";
  $("#profileModalAvatar").textContent = user?.name?.trim().charAt(0).toUpperCase() || "U";
  if (!user) $("#profileMenu").hidden = true;
}
$("#loginBtn").addEventListener("click", () => {
  if (getCurrentUser()) $("#profileMenu").hidden = !$("#profileMenu").hidden;
  else { setAuthMode("login"); openPanel("#loginOverlay"); }
});
document.querySelectorAll("[data-auth]").forEach(button => button.addEventListener("click", () => setAuthMode(button.dataset.auth)));
$("#authForm").addEventListener("submit", async event => {
  event.preventDefault();
  const name = $("#authName").value.trim();
  const email = $("#authEmail").value.trim().toLowerCase();
  const password = $("#authPassword").value;
  if (!email || !password || (authMode === "signup" && !name)) { showToast("Please fill in all required fields."); return; }
  if (password.length < 6) { showToast("Password must be at least 6 characters."); return; }
  const button = $("#authSubmit");
  button.disabled = true;
  try {
    const accounts = getAccounts();
    const existing = accounts.find(user => user.email === email);
    if (authMode === "signup") {
      if (existing) { showToast("Email already registered. Please login."); setAuthMode("login"); $("#authEmail").value = email; return; }
      const salt = Array.from(crypto.getRandomValues(new Uint8Array(16))).map(b => b.toString(16).padStart(2, "0")).join("");
      const passwordHash = await hashPassword(password, salt);
      accounts.push({ name, email, salt, passwordHash });
      localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
      localStorage.setItem(SESSION_KEY, email);
      showToast("Welcome, " + name + "! Profile created 🎉");
    } else {
      if (!existing) { showToast("Account not found. Please sign up first."); return; }
      const hash = await hashPassword(password, existing.salt);
      if (hash !== existing.passwordHash) { showToast("Incorrect password."); return; }
      localStorage.setItem(SESSION_KEY, email);
      showToast("Welcome back, " + existing.name + "!");
    }
    updateProfileUI(); closePanels(); $("#authForm").reset(); setAuthMode("login");
  } catch {
    showToast("Please open SmartCart with VS Code Live Server.");
  } finally { button.disabled = false; }
});
$("#myProfileBtn").addEventListener("click", () => { $("#profileMenu").hidden = true; updateProfileUI(); openPanel("#profileOverlay"); });
function logoutUser() {
  localStorage.removeItem(SESSION_KEY); updateProfileUI(); closePanels(); showToast("Logged out successfully.");
}
$("#logoutBtn").addEventListener("click", logoutUser);
$("#profileLogoutBtn").addEventListener("click", logoutUser);
document.addEventListener("click", event => {
  const area = document.querySelector(".profile-area");
  if (area && !area.contains(event.target)) $("#profileMenu").hidden = true;
});
updateProfileUI();

// BUY NOW: select one product, show processing, then checkout details
function buyNow(id) {
  const p = getProduct(id);
  if (!p) return;

  pendingBuyId = p.id;
  cart.clear();
  cart.set(p.id, 1);
  updateCounts();
  renderCart();
  renderProducts();

  showCheckoutScreen("processingScreen");
  openPanel("#checkoutOverlay");

  setTimeout(() => {
    if (!$("#checkoutOverlay").classList.contains("open")) return;
    showCheckoutScreen("checkoutForm");
    $("#checkoutTotal").textContent = money(cartTotal());
  }, 1000);
}

function showCheckoutScreen(screenId) {
  ["checkoutForm", "processingScreen", "paymentScreen", "qrScreen", "failedScreen", "successScreen"].forEach(id => {
    document.getElementById(id).hidden = id !== screenId;
  });

  $("#stepDetails").classList.toggle("step-active", screenId === "checkoutForm" || screenId === "processingScreen");
  $("#stepPayment").classList.toggle("step-active", ["paymentScreen", "qrScreen", "failedScreen"].includes(screenId));
  $("#stepDone").classList.toggle("step-active", screenId === "successScreen");
}

$("#checkoutBtn").addEventListener("click", () => {
  if (!cart.size) {
    showToast("Add a product to your cart first.");
    return;
  }
  pendingBuyId = null;
  $("#checkoutTotal").textContent = money(cartTotal());
  showCheckoutScreen("checkoutForm");
  openPanel("#checkoutOverlay");
});

$("#checkoutForm").addEventListener("submit", event => {
  event.preventDefault();
  if (!$("#checkoutForm").reportValidity()) return;

  showCheckoutScreen("processingScreen");
  setTimeout(() => {
    showCheckoutScreen("paymentScreen");
  }, 900);
});

$("#backToDetails").addEventListener("click", () => showCheckoutScreen("checkoutForm"));

function placeDemoOrder(paymentMethod) {
  if (!cart.size) {
    showToast("Your cart is empty.");
    showCheckoutScreen("checkoutForm");
    return;
  }

  const name = $("#customerName").value.trim();
  const total = money(cartTotal());
  const orderId = "SC" + Date.now().toString().slice(-8);

  $("#orderNumber").textContent = orderId;
  $("#orderMessage").textContent = `Thank you, ${name}! Your demo order total is ${total}. Payment method: ${paymentMethod}.`;
  showCheckoutScreen("successScreen");

  cart.clear();
  pendingBuyId = null;
  updateCounts();
  renderCart();
  renderProducts();
  showToast("Demo order placed successfully 🎉");
}

$("#paymentScreen").addEventListener("click", event => {
  const button = event.target.closest("[data-payment]");
  if (!button) return;

  if (button.dataset.payment === "cod") {
    placeDemoOrder("Cash on Delivery (Demo)");
  } else {
    $("#qrTotal").textContent = money(cartTotal());
    showCheckoutScreen("qrScreen");
    if (button.dataset.payment === "upi") {
      showToast("Demo UPI screen opened. No real payment is made.");
    }
  }
});

$("#simulateFail").addEventListener("click", () => showCheckoutScreen("failedScreen"));
$("#retryPayment").addEventListener("click", () => showCheckoutScreen("qrScreen"));
$("#qrBack").addEventListener("click", () => showCheckoutScreen("paymentScreen"));
$("#failedBack").addEventListener("click", () => showCheckoutScreen("paymentScreen"));
$("#failedCod").addEventListener("click", () => placeDemoOrder("Cash on Delivery (Demo)"));

$("#finishOrder").addEventListener("click", () => {
  closePanels();
  $("#checkoutForm").reset();
  showCheckoutScreen("checkoutForm");
  showToast("Thanks for shopping with SmartCart 💜");
});

$("#newsletterForm").addEventListener("submit", event => {
  event.preventDefault();
  showToast("Thanks for subscribing! (Demo only) 💌");
  event.target.reset();
});

// Initial display
renderProducts();
updateCounts();
renderCart();
renderWishlist();
