// productData.mjs
export default class ProductData {
  constructor(dataSource) {
    this.dataSource = dataSource;
  }

  // Fetch all products
  async getData() {
    const response = await fetch(this.dataSource);
    const data = await response.json();

    // IMPORTANT: return the "tents" array
    return data.tents;
  }

  // Find a product by ID (used on detail pages)
  async findProductById(id) {
    const products = await this.getData();
    return products.find(product => product.Id === id);
  }
}
