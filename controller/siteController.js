const mongoose = require("mongoose");
const categoryModel = require('../models/category');
const newsModel = require('../models/news');
const userModel = require('../models/user');
const commentModel = require('../models/comments');

// Controller functions for handling site-related requests
const index = async (req, res) => { }
const articleByCategories = async (req, res) => { }
const singleArticle = async (req, res) => { }
const search = async (req, res) => { }
const author = async (req, res) => { }
const addComment = async (req, res) => { }

module.exports = {
    index,
    articleByCategories,
    singleArticle,
    search,
    author,
    addComment
}