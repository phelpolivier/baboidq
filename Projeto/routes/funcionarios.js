const express = require("express");
const router = express.Router();
const controller = require("../controllers/funcionariosControllers");

router.delete("/:id", controller.deletarFuncionario);

module.exports = router;