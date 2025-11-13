const CustomerServices = require("../services/customer-service");

module.exports = (app) => {
  const service = new CustomerServices();

  app.post("/signup", async (req, res) => {
    const { email, password, phone } = req.body;
    const { data } = await service.SignUp({ email, password, phone });
    return res.json(data);
  });

  app.get("/wishlist", async (req, res) => {
    const _id = "6913f7102cff9bda10b5cb5c";
    const { data } = await service.GetWishList(_id);
    return res.status(200).json(data);
  });

  app.get("/whoami", (req, res) => {
    return res.status(200).json({
      msg: "/customer: I am customer",
    });
  });
};
