const { default: axios } = require("axios");  

module.exports.FormData = (data) => {
  if (data) {
    return { data };
  } else {
    throw new Error("Data Not found!");
  }
};

module.exports.PublishCustomerEvent = (payload)=>{
  axios.post('http://localhost:8001/app-events',{
    payload
  })
}