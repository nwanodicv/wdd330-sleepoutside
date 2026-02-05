//import { loadHeaderFooter } from './utils.mjs';
//
//loadHeaderFooter();
let product_categories = []

async function fetchProductCategory() {
    const response = await fetch('./json/product-category.json');
    const data = await response.json();
    product_categories = data.product_category;
    //console.log(product_categories);
    displayProductCategories(product_categories);
    
}
fetchProductCategory();

const productList = document.querySelector('.product-list');

function displayProductCategories() {
    product_categories.forEach((product) => {
        let card = document.createElement('aside');
        let productName = document.createElement('h2');
        let productImage = document.createElement('img');

         // Set the content and attributes// Set the content and attributes
        productName.textContent = product.name;
        productImage.setAttribute('src', product.image);
        productImage.setAttribute('alt', `Image of ${product.name}`);
        productImage.setAttribute('loading', 'lazy');
        productImage.setAttribute('width', '300');
        productImage.setAttribute('height', '300');

        // Append elements to the card
        card.appendChild(productImage);
        card.appendChild(productName);

        // Append the card to the container
        productList.appendChild(card);

        if(product.name === 'Tents') {
            card.addEventListener('click', () => {
                window.location.href = './product_listing/index.html';
            })
        }
        if(product.name === 'Backpacks') {
            card.addEventListener('click', () => {
                window.location.href = './product_listing/backpackProducts.html';
            })
        }
        if(product.name === 'Sleeping bags') {
            card.addEventListener('click', () => {
                window.location.href = './product_listing/sleeping-bags.html';
            })
        }
        if(product.name === 'Hammocks') {
            card.addEventListener('click', () => {
                window.location.href = './product_listing/hammocks.html';
            })
        }

    });
    
}
displayProductCategories(product_categories);