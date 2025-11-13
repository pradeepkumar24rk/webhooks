const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CustomerSchema = new Schema(
  {
    email: String,
    password: String,
    salt: String,
    phone: String,
    wishlist: [
      {
        _id: { type: String, require: true },
        name: { type: String },
        description: { type: String },
        banner: { type: String },
        avalable: { type: Boolean },
        price: { type: Number },
      },
    ],
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.salt;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

module.exports = mongoose.model("customer", CustomerSchema);
