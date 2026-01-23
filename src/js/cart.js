// cart.js
// Renders items stored in the shopping cart

import { getLocalStorage } from './utils.mjs';

// Render cart contents on page load
function renderCartContents() {

  // Retrieve cart items
  const cartItems = getLocalStorage('so-cart') || [];

  // Convert each item to HTML
  const htmlItems = cartItems.map(item =>
    cartItemTemplate(item)
  );

  // Insert into DOM
  document.querySelector('.product-list').innerHTML =
    htmlItems.join('');
}

// Template for a cart item
function cartItemTemplate(item) {
  return `
    <li class="cart-card divider">
      <img src="${item.Image}" alt="${item.Name}">
      <h2 class="card__name">${item.Name}</h2>
      <p class="cart-card__color">${item.Colors[0].ColorName}</p>
      <p class="cart-card__quantity">qty: 1</p>
      <p class="cart-card__price">$${item.FinalPrice}</p>
    </li>
  `;
}

// Run immediately
renderCartContents();
