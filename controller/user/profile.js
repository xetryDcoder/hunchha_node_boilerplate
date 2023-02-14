const db = require('./../../model/index')
const Profile = db.Profile
const Users = db.Users

//Dispalying Profile Information
exports.getProfile = async (req, res, next) => {
   let profile = await Profile.findOne(
    {
        where: {
            userId: req.userId
        },
        include: [{
            model: Users
        }]
    }
    )

    res.status(200).send({
        profile
    })
}

//Adding Profile
exports.postProfile = async (req, res, next) => {
    if(!req.file){
        res.status(400).send({
            message: 'No file was Uploaded'
        })
        return
    }
    
    let data = {
        userId: req.userId,
        image: req.file.filename
    }

    let profile = await Profile.create(data)
    res.status(200).send({
        profile
    })
}