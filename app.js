const express =  require('express')
const app  = express()

//Db connection building with sql / sequilize
const db = require('./model/index');

db.sequelize.sync({ force: 0 });

//Data transfering configuration from frontend to backend
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Seeding initial Database with Admin
const ADMIN_SEEDER = require('./seeder')
app.use(ADMIN_SEEDER)

//api calling
const authApi = require('./api/auth/auth')
const userApi = require('./api/user/user')

const categoryApi = require("./api/admin/category")

//api integration
app.use('/api', authApi)
app.use('/api', userApi)

app.use('/api', categoryApi)

app.listen(3000, ()=> {
    console.log("App is running on port 3000")
})