const fs = require("fs");

// try {
//     if (!fs.existsSync("uploads")) {
//       fs.mkdirSync("uploads");
      
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }


  console.log(fs.existsSync("uploads"));