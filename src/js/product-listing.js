//import { loadHeaderFooter, getParam } from './utils.mjs';
//import ProductData from './productData.mjs';
//import ProductList from './productList.mjs';
//
//loadHeaderFooter();
//
//const category = getParam('category');
//const dataSource = new ProductData();
//const element = document.querySelector('.product-list');
//const listing = new ProductList(category, dataSource, element);
//
//listing.init();


// main.js
//import { loadHeaderFooter, getParam } from './utils.mjs';
// Import ProductData class (handles fetching JSON)
import ProductData from '../js/productData.mjs';

// Import ProductList class (handles rendering products)
import ProductList from '../js/productList.mjs';

//loadHeaderFooter();
//
//const category = getParam('category');

// Create data source using path to tents.json
const dataSource = new ProductData('../json/tents.json');

// Select the UL element where products will be rendered
const listElement = document.querySelector('.product-list');

// Create ProductList instance
const productList = new ProductList('tents', dataSource, listElement);

// Fetch products and render them to the UI
productList.init();
