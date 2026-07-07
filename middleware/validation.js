const { body } = require('express-validator')
const User = require('../models/User')
const categoryModel = require('../models/Category')

const loginValidation = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username is required')
    .matches(/^\S+$/)
    .withMessage('Username must not contain spaces')
    .isLength({ min: 5, max: 12 })
    .withMessage('Username must be 5 to 12 characters long'),

  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 5 , max: 12 })  
    .withMessage('Password must be 5 to 12 characters long')
]

const userValidation = [
  body('fullname')
    .trim()
    .notEmpty()
    .withMessage('Fullname is required')
    .isLength({ min: 5, max: 25 })
    .withMessage('Fullname must be 5 to 25 characters long'),

  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username is required')
    .matches(/^\S+$/)
    .withMessage('Username must not contain spaces')
    .isLength({ min: 5, max: 12 })
    .withMessage('Username must be 5 to 12 characters long')
    .custom(async (value) => {
      const user = await User.findOne({ username: value });
      if (user) {
        throw new Error('Username already exists');
      }
    }),
  
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 5 , max: 12 })  
    .withMessage('Password must be 5 to 12 characters long'),

  body('role')
    .trim()
    .notEmpty()  
    .withMessage('Role is required')
    .isIn(['author', 'admin'])
    .withMessage('Role must be author or admin')
]

const userUpdateValidation = [
  body('fullname')
    .trim()
    .notEmpty()
    .withMessage('Fullname is required')
    .isLength({ min: 5, max: 25 })
    .withMessage('Fullname must be 5 to 25 characters long'),

  body('password')
    .optional({ checkFalsy: true})
    .isLength({ min: 5 , max: 12 })  
    .withMessage('Password must be 5 to 12 characters long'),

  body('role')
    .trim()
    .notEmpty()  
    .withMessage('Role is required')
    .isIn(['author', 'admin'])
    .withMessage('Role must be author or admin')
]

const categoryValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Category Name is required')
    .isLength({ min:3, max:12})
    .withMessage('Category Name must be 3 to 12 characters long')
    .custom(async (value, { req }) => {
      const category = await categoryModel.findOne({ name: value });
      if (category && category._id.toString() !== req.params.id) {
        throw new Error('Category name already exists');
      }
    })
]

const articleValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 7, max: 50 })
    .withMessage('Title must be 7 to 50 characters long'),

  body('content')
    .trim()
    .notEmpty()
    .withMessage('Content is required')
    .isLength({ min: 50 })
    .withMessage('Content must be 50 to 1500 characters long'),

  body('category')
    .trim()
    .notEmpty()
    .withMessage('Category is required')

]

module.exports = { 
  loginValidation,
  userValidation,
  userUpdateValidation,
  categoryValidation,
  articleValidation

 }