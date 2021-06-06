const db = require("../model");
const Tag = db.tags;
const Article = db.articles;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

    Tag.create({title: req.body.title})
    .then(tag=>{
        Article.findByPk(7)
     .then(art =>{
         if(art){
        tag.addArticle(art);
      
         }

         res.send({message: "Success"});
     })
    
    })
    .catch(err => {res.send({message: err.message})});

     

    
    

};