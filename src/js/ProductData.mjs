// productData.mjs
export default class ProductData {
  constructor(dataSource) {
    // Store path to JSON file.
    this.dataSource = dataSource;
  }

  async getData() {
    // Fetch JSON file
    const response = await fetch(this.dataSource);

    // Stop execution if fetch fails
    if (!response.ok) {
      throw new Error('Failed to fetch product data');
    }

    // Convert response to JavaScript object
    const data = await response.json();

    //  IMPORTANT:
    // Our JSON is { "tents": [...] }
    // We must return the ARRAY inside it
    return data.tents;
  }

  async findProductById(id) {
    // Get all products
    const products = await this.getData();

    // Find product that matches ID
    return products.find(product => product.Id === id);
  }
}
