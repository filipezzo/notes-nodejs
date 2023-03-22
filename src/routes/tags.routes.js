const { Router } = require("express");
const TagsController = require("../controllers/TagsController");

const tagsRoutes = Router();

const tagsControlller = new TagsController();

tagsRoutes.get("/:user_id", tagsControlller.index)

module.exports = tagsRoutes