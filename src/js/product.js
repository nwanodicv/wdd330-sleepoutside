// product.js
// Handles Add to Cart functionality

import { getLocalStorage, setLocalStorage } from './utils.mjs';
import ProductData from './productData.mjs';

// Create a ProductData instance pointing to the JSON file
const dataSource = new ProductData('../json/tents.json');

// Add a product to localStorage cart
function addProductToCart(product) {

  // Retrieve existing cart
  let cart = getLocalStorage('so-cart');

  // Ensure cart is an array
  if (!Array.isArray(cart)) {
    cart = [];
  }

  // Add product
  cart.push(product);

  // Save updated cart
  setLocalStorage('so-cart', cart);
}

// Handle Add to Cart button click
async function addToCartHandler(e) {

  // Get product ID from button
  const productId = e.target.dataset.id;

  // Fetch full product object
  const product = await dataSource.findProductById(productId);

  // Save product to cart
  addProductToCart(product);
}

// Attach event listener
document.getElementById('addToCart').addEventListener('click', addToCartHandler)