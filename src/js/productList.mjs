// productList.mjs
// Responsible for rendering a list of products on the page

export default class ProductList {

  constructor(category, dataSource, element) {
    this.category = category;     // Product category
    this.dataSource = dataSource; // ProductData instance
    this.element = element;       // UL element
  }

  // Initialize the product list
  async init() {

    // Fetch product data
    const products = await this.dataSource.getData();

    // Render products to the UI
    this.renderList(products);
  }

  // Render products as HTML
  renderList(products) {
    console.log(products)
    // Convert product objects into HTML list items
    this.element.innerHTML = products
      .map(product => productCardTemplate(product))
      .join('');
  }
}

// Template for one product card
function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="../product_pages/?product=${product.Id}">
        <img src="${product.Image}" alt="${product.NameWithoutBrand}">
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.NameWithoutBrand}</h2>
        <p class="product-card__price">$${product.FinalPrice}</p>

        <div class="product-detail__add">
          <button id="addToCart" data-id="productId">Add to Cart</button>
        </div>
      </a>
    </li>
  `;
  
}
