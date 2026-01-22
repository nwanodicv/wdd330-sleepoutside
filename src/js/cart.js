// Import utility function to read from localStorage
import { getLocalStorage } from './utils.mjs';

/**
 * Renders all items currently in the cart
 */
function renderCartContents() {

  // Retrieve cart from localStorage
  // Ensure it is always an array
  const cartItems = getLocalStorage('so-cart') || [];

  // Convert each cart item into HTML
  const htmlItems = cartItems.map((item) =>
    cartItemTemplate(item)
  );

  // Replace the existing HTML (NOT append)
  document.querySelector('.product-list').innerHTML =
    htmlItems.join('');
}

/**
 * Generates HTML for a single cart item
 */
function cartItemTemplate(item) {
  return `
    <li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img src="${item.Image}" alt="${item.Name}" />
      </a>
      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${item.Colors[0].ColorName}</p>
      <p class="cart-card__quantity">qty: 1</p>
      <p class="cart-card__price">$${item.FinalPrice}</p>
    </li>
  `;
}

// Render cart immediately when page loads
renderCartContents();
