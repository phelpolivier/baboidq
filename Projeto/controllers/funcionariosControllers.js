
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