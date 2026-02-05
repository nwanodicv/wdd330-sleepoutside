import ProductData from './productData.mjs';

// Import ProductList class (handles rendering products)
import ProductList from './productList.mjs';


//loadHeaderFooter();
//
//const category = getParam('category');

// Create data source using path to tents.json
const dataSource = new ProductData('../json/backpacks.json');

// Select the UL element where products will be rendered
const listElement = document.querySelector('.product-list');


// Create ProductList instance
const productList = new ProductList('backpacks', dataSource, listElement);

// Fetch products and render them to the UI
productList.init();