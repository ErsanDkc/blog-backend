const mongoose = require("mongoose");

const api =
  "mongodb+srv://root:1@blog.k1kdhis.mongodb.net/?retryWrites=true&w=majority";

const connection = () => {
  mongoose
    .connect(api, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDb connection is successfull!"))
    .catch((error) => console.log(error));
};

module.exports = connection;