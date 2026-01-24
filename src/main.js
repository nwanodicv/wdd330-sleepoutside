// main.js

// Import ProductData class (handles fetching JSON)
import ProductData from '../src/js/productData.mjs';

// Import ProductList class (handles rendering products)
import ProductList from '../src/js/productList.mjs';

// Create data source using path to tents.json
const dataSource = new ProductData('./json/tents.json');

// Select the UL element where products will be rendered
const listElement = document.querySelector('.product-list');

// Create ProductList instance
const productList = new ProductList('tents', dataSource, listElement);

// Fetch products and render them to the UI
productList.init();
