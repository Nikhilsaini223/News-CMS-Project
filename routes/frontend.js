const express = require("express");
const router = express.Router();

/* This code imports (destructures) specific controller 
functions from siteController.js so they can be used 
directly in your route definitions without writing siteController.functionName each time.*/
const {
    index,
    articleByCategories,
    singleArticle,
    search,
    author,
    addComment
} = require('../controllers/siteController');

/* These route definitions map incoming HTTP requests (URLs) 
to their respective controller functions,
 which handle the request and return the appropriate response.*/
router.get('/', index);
router.get('/category/:name', articleByCategories);
router.get('/single/:id', singleArticle);
router.get('/search', search);
router.get('/author/:name', author);
router.post('/single/:id', addComment);

module.exports = router;