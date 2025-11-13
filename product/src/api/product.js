const ProductServices = require("../services/product-service");
const { PublishCustomerEvent } = require("../utils");

module.exports = (app) => {
  const service = new ProductServices();
  
  app.post('/product/create',async(req,res)=>{
    const {name,desc,type,unit,price, available,suplier,banner} = req.body;
    const {data} = await service.CreateProduct({name,desc,type,unit,price,available,suplier,banner})
    return res.json(data);
  })
  
  app.put('/wishlist',async(req,res)=>{
      const _id = "6913f7102cff9bda10b5cb5c";
      const {data} = await service.GetProductPayload(_id,{productId:req.body._id},"ADD_TO_WISHLIST")
      PublishCustomerEvent(data)
      res.status(200).json(data)
  })
  

  app.get("/whoami", (req, res) => {
    return res.status(200).json({
      msg: "/product: I am product",
    });
  });
};
