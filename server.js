require("dotenv").config();
const req = require("express/lib/request");
const mongoose = require("mongoose");
const express = require("express");
const workoutes = require("./routes/workoutes");
const app = express();

//routes
app.use("/api/workoutes", workoutes);

//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listening port
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
