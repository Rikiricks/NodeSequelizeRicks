const dbConfig = require("../../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
  
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
  });

  const db = {};
  db.Sequelize = Sequelize;
  db.sequelize = sequelize;

  db.articles = require("./article.model")(sequelize, Sequelize);
  db.comments = require("./comment.model")(sequelize,Sequelize);
  db.tags = require("./tag.model")(sequelize,Sequelize);

  db.articles.hasMany(db.comments, {as: "comments"});
  db.comments.belongsTo(db.articles,{
    foreignKey: "articleId",
    as: "article"
  })

  db.articles.belongsToMany(db.tags,{ through: 'article_tag',as: 'tags', foreignKey: 'tagId'});
  db.tags.belongsToMany(db.articles, {through: 'article_tag', as : 'articles', foreignKey: 'articleId'});


  module.exports = db;