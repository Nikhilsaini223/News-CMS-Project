const express = require("express");
const router = express.Router();

/* This code imports (destructures) specific controller 
functions from siteController.js so they can be used 
directly in your route definitions without writing siteController.functionName each time.*/

//import Method -1
/*const {
    index,
    articleByCategories,
    singleArticle,
    search,
    author,
    addComment
} = require('../controllers/siteController');*/


/*This line imports the siteController module — a file 
containing functions (likely for handling site-related routes, 
like rendering pages, settings, or general site logic)
— from ../controllers/siteController, so this file can use those functions.*/

//import Method -2
const siteController = require('../controller/siteController');


/* These route definitions map incoming HTTP requests (URLs) 
to their respective controller functions,
 which handle the request and return the appropriate response.*/

 router.get('/', siteController.index);
router.get('/category/:name', siteController.articleByCategories);
router.get('/single/:id', siteController.singleArticle);
router.get('/search', siteController.search);
router.get('/author/:name', siteController.author);
router.post('/single/:id', siteController.addComment);

module.exports = router;