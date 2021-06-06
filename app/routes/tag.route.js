module.exports = app =>{

    const tag = require("../controllers/tag.controller");
    var router = require("express").Router();

    router.post("/", tag.create);

    app.use("/api/tags", router);

}