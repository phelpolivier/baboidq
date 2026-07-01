const express = require("express");
const router = express.Router();
const controller = require("../controllers/funcionariosControllers");

router.delete("/:id", controller.deletarFuncionario);

router.put("/:id", controller.atualizarFuncionario);

module.exports = router;
