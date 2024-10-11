const express = require("express");
const app = express();
app.use("/uploads", express.static("uploads"));
require("dotenv").config();
 const authRoute = require("./src/routes/authRoute");
 const  blogRoute = require("./src/routes/blogRoute");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const fs = require("fs");

 // to store photo, Check if the uploads directory exists and create it if it doesn't
 try {
  if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
  }
} catch (error) {
  console.log(error);
  
}




app.use("/", blogRoute);         //blog route
app.use("/", authRoute);          //auth route


app.listen(3000, () => console.log("Server running on port 3000"));
