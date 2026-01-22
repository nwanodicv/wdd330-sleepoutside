// Import utility functions for localStorage
import { getLocalStorage, setLocalStorage } from './utils.mjs';

// Import ProductData class
import ProductData from './productData.mjs';

// Create a data source for tent products
const dataSource = new ProductData('tents');

/**
 * Adds a product to the shopping cart.
 * The cart is stored as an ARRAY in localStorage.
 */
function addProductToCart(product) {

  // 1️⃣ Read the cart from localStorage
  let cart = getLocalStorage('so-cart');

  // 2️⃣ If cart does not exist OR is not an array, initialize it
  if (!Array.isArray(cart)) {
    cart = [];
  }

  // 3️⃣ Add the selected product to the cart array
  cart.push(product);

  // 4️⃣ Save the updated cart back to localStorage
  setLocalStorage('so-cart', cart);
}

/**
 * Event handler for the Add to Cart button
 */
async function addToCartHandler(e) {

  // Get product ID from the button's data-id attribute
  const productId = e.target.dataset.id;

  // Fetch the full product object from JSON
  const product = await dataSource.findProductById(productId);

  // Add the product to cart
  addProductToCart(product);
}

// Attach click listener to Add to Cart button
document
  .getElementById('addToCart')
  .addEventListener('click', addToCartHandler);
