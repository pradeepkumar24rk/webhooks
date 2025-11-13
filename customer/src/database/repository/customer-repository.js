const { CustomerModel } = require("../models");
const mongoose = require("mongoose");

class CustomerRepository {
  async CreateCustomer({ email, phone, password, salt }) {
    const customer = new CustomerModel({
      email,
      phone,
      password,
      salt,
    });
    const customerRes = await customer.save();
    return customerRes;
  }
  
  async WishList(customerId) {
    const profile = await CustomerModel.findById(customerId).populate('wishlist')
    return profile.wishlist;
  }
  
  async AddWishListItem(
    customerId,
    { _id, name, desc, price, available, banner }
  ) {
    const product = {
      _id,
      name,
      desc,
      price,
      available,
      banner,
    };

    const profile = await CustomerModel.findById(customerId).populate(
      "wishlist"
    );

    if (profile) {
      let wishlist = profile.wishlist;

      if (wishlist.length > 0) {
        let isExist = false;
        wishlist.map((item) => {
          if (item._id.toString() === product._id.toString()) {
            const index = wishlist.indexOf(item);
            wishlist.splice(index, 1);
            isExist = true;
          }
        });
        if (!isExist) {
          wishlist.push(product);
        }
      } else {
        wishlist.push(product);
      }
      profile.wishlist = wishlist;
    }
    const profileResult = await profile.save();
    return profileResult.wishlist;
  }
  
}

module.exports = CustomerRepository;
