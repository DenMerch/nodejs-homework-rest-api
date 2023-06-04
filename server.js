const mongoose = require("mongoose")

const app = require('./app')

const { PORT, DB_PATH } = process.env

mongoose.connect(DB_PATH)
  .then(() => {
    app.listen(PORT);
    console.log("Database connection successful");
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1)
  })
