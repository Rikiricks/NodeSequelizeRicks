module.exports = app =>{

    let comment = require("../controllers/comment.controller");

    var route = require("express").Router();

    route.post("/", comment.create);
    route.get("/:id", comment.findById);
    route.put("/:id", comment.update);
    route.delete("/:id", comment.delete);

    app.use("/api/comments",route );

}
