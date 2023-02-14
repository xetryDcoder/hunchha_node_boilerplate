
const db = require("../../model/index");
const User = db.Users;
const Logout = db.Logout;

var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const authConfig = require('./../../config/auth.config')

exports.register = (req, res, next) => {
    // Validate request
    if (!req.body.name && !req.body.email && !req.body.password && !req.body.role) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
        return;
    }

    //Creating data to database
    User.findOrCreate({
        where: { email: req.body.email },
        defaults: {
            email: req.body.email,
            role: req.body.role,
            password: bcrypt.hashSync(req.body.password, 8),
        }
    })
        .then(result => {
            res.status(200).send({
                result,
                message: "success",
            });
        })
        .catch(err => {
            res.status(400).send({
                err,
                message: "failed",
            });
        })
}

exports.login = async (req, res, next) => {
    //validating the data
    if (!req.body.email && !!req.body.password) {
        res.status(400).send({
            message: 'Please Check the input field'
        })
        return;
    }
    //finding the user
    let login = await User.findOne({ where: { 'email': req.body.email } })

    //Checking the user
    if (!login) {
        res.status(200).send({
            message: 'Invalid login Credential id'
        })
        return
    }

    //password checking
    if (bcrypt.compareSync(req.body.password, login.password)) {

        //Setting up sucurity Token
        var token = jwt.sign({ id: login.id }, authConfig.secret, {
            expiresIn: 86400, // 24 hours
        });

        let newData = {
            id: login.id,
            name: login.name,
            email: login.email,
            token
        }

        res.status(200).send({
            message: 'success',
            newData
        })
    } else {
        res.status(200).send({
            message: 'Invalid login Credential password'
        })
    }

}

exports.logout = async (req, res) => {
    let token = req.headers['x-access-token']
    let logout = await Logout.create({token})
    console.log(logout)
    res.status(200).send({
        message: 'Success'
    })
}