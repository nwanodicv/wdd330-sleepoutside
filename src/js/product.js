// Import utility functions for localStorage
import { getLocalStorage, setLocalStorage } from "./utils.mjs";

// Import ProductData class
import ProductData from "./ProductData.mjs";

// Create a data source for tent products
const dataSource = new ProductData("tents");

/**
 * Adds a product to the shopping cart.
 * The cart is stored as an ARRAY in localStorage.
 */
function addProductToCart(product) {

  //  Read the cart from localStorage
  let cart = getLocalStorage("so-cart");

  // If cart does not exist OR is not an array, initialize it
  if (!Array.isArray(cart)) {
    cart = [];
  }

  // Add the selected product to the cart array
  cart.push(product);

  //  Save the updated cart back to localStorage
  setLocalStorage("so-cart", cart);
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
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);




//import { setLocalStorage} from "./utils.mjs";
//import ProductData from "./ProductData.mjs";
//
//const dataSource = new ProductData("tents");
//
//function addProductToCart(product) {
//  // read cart from localStorage
//  setLocalStorage("so-cart", product);
//  let cart = getLocalStorage("so-cart");// Read cart from localStorage
//
//// If cart does not exist OR is not an array,
//  // reset it to an empty array
//  if (!Array.isArray(cart)) {
//    cart = [];
//  }
//
//  // add product to the array
//  cart.push(product);
//
//  // save updated cart back to localStorage
//  setLocalStorage("so-cart", cart);
//
//}
//// add to cart button event handler
//async function addToCartHandler(e) {
//  const product = await dataSource.findProductById(e.target.dataset.id);
//  addProductToCart(product);
//}
//
//// add listener to Add to Cart button
//document
//  .getElementById("addToCart")
//  .addEventListener("click", addToCartHandler);