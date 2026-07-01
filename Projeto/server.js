const express = require = require("express");

const app = express();

app.use(express.json());

const funcionario = require("./routes/funcionarios");

app.use("/funcionarios", funcionarioRoutes);

app.listen(3000, () => {
    console.log("Servidor esta rodando na porta 3000");
});