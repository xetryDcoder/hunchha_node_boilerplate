const dbConfig = require("./../config/db.config");

const Sequelize = require("sequelize");


const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    logging: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    },
});

//custom
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Admin Model
db.Categories = require('./admin/category')(sequelize, Sequelize)

// Users Model
db.Users = require("./../model/auth/user")(sequelize, Sequelize);
db.Profile = require("./user/profile")(sequelize, Sequelize);
db.Logout = require("./auth/logout")(sequelize, Sequelize)


/* RDBMS Connection */
db.Users.hasOne(db.Profile)
db.Profile.belongsTo(db.Users)

module.exports = db;
