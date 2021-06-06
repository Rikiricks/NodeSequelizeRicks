const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const db = require("./app/model");
db.sequelize.sync().then(() => {
  console.log("Drop and re-sync db.");
});

var corsOptions = {
    origin: "http://localhost:8081"
  };
app.use(cors(corsOptions));

app.use(bodyParser.json()); //application/json
app.use(bodyParser.urlencoded({ extended: true })); //application/x-www-form-urlencoded

app.get("/",(req, res)=>{
    res.json({ message: "Welcome to NodeJs application." });
});

require("./app/routes/article.route")(app);
require("./app/routes/comment.route")(app);
require("./app/routes/tag.route")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });