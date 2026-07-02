const fs = require("fs");
const funcionarios = require("../funcionarios.json");

// POST /funcionarios - cria um novo funcionário
exports.criarFuncionario = (req, res) => {
    const dados = req.body;

    if (!dados || !dados.nome) {
        return res.status(400).json({ erro: "Dados inválidos" });
    }

    const novoId = funcionarios.length > 0
        ? Math.max(...funcionarios.map(f => f.id)) + 1
        : 1;

    const novoFuncionario = { id: novoId, ...dados };
    funcionarios.push(novoFuncionario);
    salvar();

    res.status(201).json(novoFuncionario);
};

// GET /funcionarios - lista todos os funcionários
exports.listarFuncionarios = (req, res) => {
    res.status(200).json(funcionarios);
};

// GET /funcionarios/:id - busca um funcionário pelo id
exports.buscarFuncionario = (req, res) => {
    const id = parseInt(req.params.id);
    const funcionario = funcionarios.find(f => f.id === id);

    if (!funcionario) {
        return res.status(404).json({ mensagem: "Funcionário não encontrado." });
    }

    res.status(200).json(funcionario);
};

// Função para atualizar um funcionário (PUT)
exports.atualizarFuncionario = (req, res) => {
    const id = parseInt(req.params.id);
    const dadosAtualizados = req.body; // Dados enviados no corpo da requisição

    // Encontrar o índice do funcionário no array
    const indice = funcionarios.findIndex(f => f.id === id);

    if (indice === -1) {
        return res.status(404).json({
            mensagem: "Funcionário não encontrado."
        });
    }

    // Atualizar os dados do funcionário
    funcionarios[indice] = { ...funcionarios[indice], ...dadosAtualizados };

    // Salvar as alterações no arquivo JSON
    fs.writeFileSync(
        "./database/funcionarios.json",
        JSON.stringify(funcionarios, null, 2)
    );

    res.status(200).json({
        mensagem: "Funcionário atualizado com sucesso.",
        funcionario: funcionarios[indice]
    });
};

// DELETE
exports.deleteFuncionario = (req, res) => {
    const id = parseInt(req.params.id);

    const indice = funcionarios.findIndex(f => f.id === id);

    if (indice === -1) {
        return res.status(404).json({
            mensagem: "Funcionário não encontrado."
        });
    }

    funcionarios.splice(indice, 1);

    fs.writeFileSync(
        "./database/funcionarios.json",
        JSON.stringify(funcionarios, null, 2)
    );

    res.status(200).json({
        mensagem: "Funcionário excluído com sucesso."
    });
};
