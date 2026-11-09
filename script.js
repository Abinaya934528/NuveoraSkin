// ========================================
// NuveoraSkin - Home Page Controller
// frontend/js/home.js
// ========================================

document.addEventListener("DOMContentLoaded", () => {
  initHomePage();
});

async function initHomePage() {
  window.updateAuthUI();
  window.updateHeaderCartCount();

  setupMobileMenu();
  setupNewsletter();
  await loadHomeProducts();
}

function setupMobileMenu() {
  const toggleBtn = document.getElementById("mobileToggle");
  const nav = document.querySelector(".desktop-nav");
  if (!toggleBtn || !nav) return;

  toggleBtn.onclick = () => {
    const isShowing = nav.style.display === "flex";
    nav.style.display = isShowing ? "none" : "flex";
    if (!isShowing) {
      nav.style.flexDirection = "column";
      nav.style.position = "absolute";
      nav.style.top = "80px";
      nav.style.left = "0";
      nav.style.width = "100%";
      nav.style.backgroundColor = "#FFFFFF";
      nav.style.padding = "20px 5vw";
      nav.style.boxShadow = "var(--shadow-md)";
    }
  };
}

async function loadHomeProducts() {
  const featuredGrid = document.getElementById("featuredGrid");
  const bestsellerGrid = document.getElementById("bestsellerGrid");

  try {
    const data = await window.api.get("/products");
    const products = data.products || [];

    // Render Featured Products (first 4 featured)
    if (featuredGrid) {
      const featured = products.filter(p => p.is_featured).slice(0, 4);
      featuredGrid.innerHTML = featured.map(p => renderProductCardHTML(p)).join('');
    }

    // Render Bestsellers (first 4 best sellers)
    if (bestsellerGrid) {
      const bestsellers = products.filter(p => p.is_best_seller).slice(0, 4);
      bestsellerGrid.innerHTML = bestsellers.map(p => renderProductCardHTML(p)).join('');
    }
  } catch (err) {
    console.error("Home products load error:", err.message);
  }
}

function renderProductCardHTML(p) {
  const price = Number(p.price);
  const origPrice = p.original_price ? Number(p.original_price) : null;
  const rating = Number(p.rating || 4.8).toFixed(1);
  const imgSrc = window.api.resolveImage(p.image);
  const discountPercent = origPrice && origPrice > price ? Math.round(((origPrice - price) / origPrice) * 100) : null;

  return `
    <article class="product-card">
      <div class="product-badges-row">
        ${p.is_best_seller ? `<span class="badge badge-bestseller">Bestseller</span>` : ''}
        ${p.is_featured ? `<span class="badge badge-featured">Featured</span>` : ''}
        ${discountPercent ? `<span class="badge badge-discount">-${discountPercent}%</span>` : ''}
      </div>

      <button type="button" class="btn-wishlist-heart" onclick="toggleWishlist(${p.product_id}, this)" title="Add to Wishlist">
        ♡
      </button>

      <a href="product-details.html?id=${p.product_id}" class="product-image-container">
        <img src="${imgSrc}" alt="${p.name}" loading="lazy" class="product-card-img" onerror="this.src='images/placeholder.jpg'">
      </a>

      <div class="product-content">
        <span class="product-category">${p.category_name || 'Skincare'}</span>
        <h3 class="product-title">
          <a href="product-details.html?id=${p.product_id}">${p.name}</a>
        </h3>

        <div class="product-rating-row">
          <span class="stars">★★★★★</span>
          <span class="rating-val">${rating}</span>
        </div>

        <div class="product-pricing">
          <span class="product-price">${window.api.formatPrice(price)}</span>
          ${origPrice ? `<span class="product-orig-price">${window.api.formatPrice(origPrice)}</span>` : ''}
        </div>

        <div class="product-card-actions">
          <button type="button" class="btn btn-primary btn-sm" onclick="addToCart(${p.product_id}, 1)">Add to Bag</button>
          <button type="button" class="btn btn-secondary btn-sm" onclick="quickBuy(${p.product_id})">Buy Now</button>
        </div>
      </div>
    </article>
  `;
}

function setupNewsletter() {
  const form = document.getElementById("newsletterForm");
  if (!form) return;

  form.onsubmit = async (e) => {
    e.preventDefault();
    const input = document.getElementById("newsletterEmail");
    if (!input || !input.value.trim()) return;

    try {
      const res = await window.api.post("/marketing/newsletter", { email: input.value.trim() });
      window.api.showToast(res.message || "Subscribed successfully!", "success");
      input.value = "";
    } catch (err) {
      window.api.showToast(err.message || "Failed to subscribe.", "error");
    }
  };
}

async function quickBuy(productId) {
  await window.addToCart(productId, 1, { openDrawer: false });
  window.location.href = "checkout.html";
}

async function toggleWishlist(productId, btn) {
  const token = window.api.getAuthToken();
  if (!token) {
    window.api.showToast("Please log in to save items to your wishlist.", "info");
    return;
  }

  try {
    if (btn.classList.contains("active")) {
      await window.api.delete(`/wishlist/items/${productId}`);
      btn.classList.remove("active");
      btn.textContent = "♡";
      window.api.showToast("Removed from Wishlist", "info");
    } else {
      await window.api.post("/wishlist/items", { product_id: productId });
      btn.classList.add("active");
      btn.textContent = "♥";
      window.api.showToast("Saved to Wishlist ♥", "success");
    }
  } catch (e) {
    window.api.showToast(e.message || "Could not update wishlist", "error");
  }
}

window.quickBuy = quickBuy;
window.toggleWishlist = toggleWishlist;
