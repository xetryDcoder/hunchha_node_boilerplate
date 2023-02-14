const db = require('./../../model/index')
const Catgeory = db.Categories

//Response Sender
let resposneSender = (res, statusCode, message, data) => {
    res.status(statusCode).send({
        message,
        data
    })
}

//Response Generator
let resposeGenerator = (res, dbOperation) => {
    if (dbOperation) {
        resposneSender(res, 200, "success", dbOperation)
    }

    if (!dbOperation) {
        resposneSender(res, 400, "Error", dbOperation)
    }
}

//Adding Data
exports.postCategory = async (req, res) => {
    let dbOperation = await Catgeory.findOrCreate({
        where: {
            name: req.body.name
        },
        defaults: {
            ...req.body
        }
    })
    resposeGenerator(res, dbOperation)
}

//Geting Category
exports.getCategory = async (req, res) => {
    let dbOperation = await Catgeory.findAll()
    resposeGenerator(res, dbOperation)
}

//Getting single data
exports.getSingleCatgeory = async (req, res) => {
    let dbOperation = await Catgeory.findByPk(req.params.id)
    resposeGenerator(res, dbOperation)

}

exports.categoryDelete = async (req, res) => {
    let dbOperation = await Catgeory.destroy({
        where: {
            id: req.params.id
        }
    })
    resposeGenerator(res, dbOperation)

}

exports.updateCategory = async (req, res) => {
    let dbOperation = await Catgeory.update({...req.body}, {where: {id: req.params.id}} )
    resposeGenerator(res, dbOperation)
}