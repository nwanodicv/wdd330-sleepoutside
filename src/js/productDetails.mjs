// productDetails.mjs
// Handles rendering individual product details

import { getLocalStorage, setLocalStorage } from './utils.mjs';

export default class ProductDetails {

  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  // Initialize product details page
  async init() {

    // Fetch product details
    this.product = await this.dataSource.findProductById(this.productId);

    // Render product details
    this.renderProductDetails();

    // Attach Add to Cart handler
    document
      .getElementById('addToCart')
      .addEventListener('click', this.addProductToCart.bind(this));
  }

  // Add product to cart
  addProductToCart() {

    // Retrieve cart
    const cartItems = getLocalStorage('so-cart') || [];

    // Add product
    cartItems.push(this.product);

    // Save updated cart
    setLocalStorage('so-cart', cartItems);
  }

  // Render product details HTML
  renderProductDetails() {
    document.querySelector('main').innerHTML +=
      productDetailsTemplate(this.product);
  }
}

// Template for product detail view
function productDetailsTemplate(product) {
  return `
    <section class="product-detail">
      <h3>${product.Brand.Name}</h3>
      <h2 class="divider">${product.NameWithoutBrand}</h2>
      <img src="${product.Image}" alt="${product.NameWithoutBrand}" />
      <p class="product-card__price">$${product.FinalPrice}</p>
      <p class="product__color">${product.Colors[0].ColorName}</p>
      <p class="product__description">
        ${product.DescriptionHtmlSimple}
      </p>
      <div class="product-detail__add">
        <button id="addToCart" data-id="${product.Id}">
          Add to Cart
        </button>
      </div>
    </section>
  `;
}