const { Router } = require("express");
const NotesControlller = require("../controllers/NotesController");

const notesRoutes = Router();


const notesControlller = new NotesControlller();
notesRoutes.get("/", notesControlller.index)
notesRoutes.post("/:user_id", notesControlller.create)
notesRoutes.get("/:id", notesControlller.show)
notesRoutes.delete("/:id", notesControlller.delete)

module.exports = notesRoutes