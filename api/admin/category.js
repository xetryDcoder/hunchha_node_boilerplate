const express = require('express')
const router = express.Router()

//controller call
const categoryController = require('./../../controller/admin/category')

router.post('/add-category', categoryController.postCategory)
router.post('/update-category/:id', categoryController.updateCategory)

router.get('/category', categoryController.getCategory)

router.get('/single-category/:id', categoryController.getSingleCatgeory)
router.get('/delete-category/:id', categoryController.categoryDelete)



module.exports = router