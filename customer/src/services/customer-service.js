const { CustomerRepository } = require("../database");
const { GenerateSalt, GeneratePassword, FormData } = require("../utils");

class CustomerServices {
  constructor() {
    this.repository = new CustomerRepository();
  }

  async SignUp(userInputs) {
    const { email, password, phone } = userInputs;
    let salt = await GenerateSalt();
    let userPassword = await GeneratePassword(password, salt);
    const existingCustomer = await this.repository.CreateCustomer({
      email,
      password: userPassword,
      phone,
      salt,
    });
    return FormData({ id: existingCustomer });
  }

  async GetWishList(customerId) {
    const wishList = await this.repository.WishList(customerId);
    return FormData(wishList);
  }

  async AddToWishlist(customerId, product) {
    const wishListRes = await this.repository.AddWishListItem(
      customerId,
      product
    );
    return FormData(wishListRes);
  }

  async SubscribeEvent(payload) {

    const { event, data } = payload;
    const { userId, product } = data;

    switch (event) {
      case "ADD_TO_WISHLIST":
      case "REMOVE_FROM_WISHLIST":
        this.AddToWishlist(userId, product);
        break;
      default:
        break;
    }
  }
}

module.exports = CustomerServices;
