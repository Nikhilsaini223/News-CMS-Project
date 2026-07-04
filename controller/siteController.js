const mongoose = require("mongoose");
const categoryModel = require('../models/category');
const newsModel = require('../models/news');
const userModel = require('../models/user');
const commentModel = require('../models/comments');

// Controller functions for handling site-related requests
const index = async (req, res) => { 
    res.render('frontend/index')
}
const articleByCategories = async (req, res) => { 
    res.render('frontend/category')
}
const singleArticle = async (req, res) => { 
    res.render('frontend/single')
}
const search = async (req, res) => { 
    res.render('frontend/search')
}
const author = async (req, res) => { 
    res.render('frontend/author')
}
const addComment = async (req, res) => { 
   
}

module.exports = {
    index,
    articleByCategories,
    singleArticle,
    search,
    author,
    addComment
}