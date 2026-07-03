const express = require("express");
const router = express.Router();

/* These lines import controller modules (functions handling business logic for articles, 
categories, comments, and users) from their
 respective files so this file can use them to handle requests. */
const articleController = require('../controllers/articleController');
const categoryController = require('../controllers/categoryController');
const commentController = require('../controllers/commentController');
const UserController = require('../controllers/UserController');

// Login Routes
router.get('/', loginPage);
router.post('/index', adminLogin);
router.get('/logout', logout);

// User CRUD Routes
router.get('/users', allUser);
router.get('/add-user', addUserPage);
router.post('/add-user', addUser);
router.get('/update-user/:id', updateUserPage);
router.post('/update-user/:id', updateUser);
router.get('/delete-user/:id', deleteUser);

// Category CRUD Routes
router.get('/category', allCategory);
router.get('/add-category', addCategoryPage);
router.post('/add-category', addCategory);
router.get('/update-category/:id', updateCategoryPage);
router.post('/update-category/:id', updateCategory);
router.get('/delete-category/:id', deleteCategory);

// Article CRUD Routes
router.get('/article', allArticle);
router.get('/add-article', addArticlePage);
router.post('/add-article', addArticle);
router.get('/update-article/:id', updateArticlePage);
router.post('/update-article/:id', updateArticle);
router.post('/delete-article/:id', deleteArticle);

//comments routes
router.get('/comments', allComments);

module.exports = router;