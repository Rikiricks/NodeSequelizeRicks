const db = require("../model");
const Article = db.articles;
const Tag = db.tags;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial test
exports.create = (req, res) => {

    const article = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
      };

      Article.create(article)
      .then(art => {  
       
        res.send(art);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      });


};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    // const title = req.qury.title;
    // const condition = title ? {title:{ [Op.like]: `%${title}%`}}:null;  

    Article.findAll({include:["comments"], order: db.sequelize.literal('createdAt DESC')})
    .then(data => {
        console.log(data);
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Article.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Tutorial with id=" + id
        });
      });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Article.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tutorial was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Tutorial with id=" + id
        });
      });
  
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Article.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tutorial was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tutorial with id=" + id
        });
      });
  };
// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Article.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Tutorials were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all tutorials."
        });
      });
  };

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
    
    Article.findAll({ where: { published: true } })
      .then(data => {
        console.log(data);
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };

  exports.search = async (req, res) => {
    const data = await Article.findAll({where: {
      title: {
      [Op.substring]: req.params.title
    }
    }
    });
    res.send(data);
  }