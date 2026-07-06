const categoryModel = require('../models/category');
const newsModel = require('../models/news');
const userModel = require('../models/user');

// Controller functions for handling article-related requests
const allArticle = async (req, res) => { 
    res.render('admin/articles',{role: req.role})
}
const addArticlePage = async (req, res) => { 
    res.render('admin/articles/create', {role: req.role})
}
const addArticle = async (req, res) => { }
const updateArticlePage = async (req, res) => { 
    res.render('admin/articles/update')
}
const updateArticle = async (req, res) => { }
const deleteArticle = async (req, res) => { }

module.exports = {
    allArticle,
    addArticlePage,
    addArticle,
    updateArticlePage,
    updateArticle,
    deleteArticle
}