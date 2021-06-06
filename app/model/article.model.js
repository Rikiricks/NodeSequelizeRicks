
module.exports = (sequelize, Sequelize) => {
    const article = sequelize.define("article", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return article;
  };