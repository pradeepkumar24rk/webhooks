const { ProductRepository } = require("../database");
const { FormData } = require("../utils");

class ProductServices {
  constructor() {
    this.repository = new ProductRepository();
  }

  async CreateProduct(productInput) {
    const productRes = await this.repository.CreateProduct(productInput);
    // console.log("service " + FormData(productRes));
    return FormData(productRes);
  }

  async GetProductPayload(userId, { productId }, event) {
    const product = await this.repository.FindById(productId);

    if (product) {
      const payload = {
        event,
        data: { userId, product },
      };
      return FormData(payload);
    } else {
      return FormData({
        error: "No Product available",
      });
    }
  }
}

module.exports = ProductServices;
