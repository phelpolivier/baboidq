const express = require("express");

const app = express();

app.use(express.json());

const funcionarioRoutes = require("./routes/funcionarios");

app.use("/funcionarios", funcionarioRoutes);

app.listen(3000, () => {
    console.log("Servidor esta rodando na porta 3000");
});
