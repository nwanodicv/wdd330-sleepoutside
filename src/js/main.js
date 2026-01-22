// main.js
import ProductData from './productData.mjs';
import ProductList from './productList.mjs';

// Path to the JSON file (IMPORTANT)
const dataSource = new ProductData('../json/tents.json');

// Select the UL where products will be rendered
const listElement = document.querySelector('.product-list');

// Create a ProductList instance
const productList = new ProductList('tents', dataSource, listElement);

// Initialize rendering
productList.init();
