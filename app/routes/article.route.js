module.exports = app =>{

    const article = require("../controllers/article.controller");
    const comment = require("../controllers/comment.controller");

    var router = require("express").Router();

    router.post("/", article.create);
    router.get("/", article.findAll);
    router.get("/search/:title", article.search);
    router.get("/published", article.findAllPublished);
    router.get("/comment/:id", comment.commentById);

    
    router.get("/:id", article.findOne);
    router.put("/:id", article.update);
    router.delete("/:id", article.delete);
    router.delete("/", article.deleteAll);
    

    app.use('/api/articles', router);
}