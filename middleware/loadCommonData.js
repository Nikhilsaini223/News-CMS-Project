const categoryModel = require("../models/Category");
const newsModel = require("../models/News");
const settingModel = require("../models/Setting");

const loadCommonData = async (req, res, next) => {
  try {
    const settings = (await settingModel.findOne()) || {
      website_title: "News",
      website_logo: "",
      footer_description: "© Copyright 2026 News | Powered by Nikhil Saini",
    };

    const latestNews = await newsModel
      .find()
      .populate("category", { name: 1, slug: 1 })
      .populate("author", "fullname")
      .sort({ createdAt: -1 })
      .limit(5);

    const categoriesInUse = await newsModel.distinct("category");
    const categories = await categoryModel.find({
      _id: { $in: categoriesInUse },
    });

    res.locals.settings = settings;
    res.locals.latestNews = latestNews;
    res.locals.categories = categories;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = loadCommonData;
