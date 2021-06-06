const db = require("../model");
const Comment = db.comments;
const Op = db.sequelize.Op;

exports.commentById = (req,res) =>{

// Comment.findByPk(req.params.id, {include:["article"]}).
Comment.findAll({where: {articleId: req.params.id},include:["article"]}).
then(data=> {res.send(data)})
.catch(err=>{ res.status(500).send({message: err});
})
}

exports.create = (req, res) =>{

    const commentData = {
        name : req.body.name,
        text : req.body.text,
        articleId : req.body.articleId
    }

    Comment.create(commentData).
    then((data) => res.send(data)).
    catch((err)=> { res.status(500).send({message: err.message})});

}

exports.findById = (req, res) =>{

    Comment.findByPk(req.params.id)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({message : err.message}));
};

exports.update = (req, res) => {
    Comment.update(req.body,{where: {id: req.params.id}})
    .then(num=>{ 
        if(num == 1){
            res.send({message: "Success"})
        }
        else{
            res.send({message: "Fail"})
        }
    })
    .catch(err => {res.send({message: err.message})});
};

exports.delete = (req, res) =>{

    Comment.destroy({where: {id:req.params.id}})
    .then(num=>{ 
        if(num == 1){
            res.send({message: "Success"})
        }
        else{
            res.send({message: "Fail"})
        }
    })
    .catch(err => {res.send({message: err.message})});
};


 