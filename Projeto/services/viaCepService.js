const resposta = await fetch // a API externa via cep deve ser colocada e ajustada nesse código por favor verificar a documentação dela breviamente para aplica-la

    function limpa_formulário_cep() {
        document.getElementById("rua").value = "";
        document.getElementById("bairro").value = "";
        document.getElementById("cidade").value = "";
        document.getElementById("uf").value = "";
    }

    async function pesquisacep(valor) {
        const cep = valor.replace(/\D/g, "");

        if (cep === "") {
            limpa_formulário_cep();
            return;
        }

        const validacep = /^[0-9]{8}$/;

        if (!validacep.test(cep)) {
            limpa_formulário_cep();
            alert("Formato de CEP inválido.");
            return;
        }

        // Preenche os campos enquanto consulta a API
        document.getElementById("rua").value = "...";
        document.getElementById("bairro").value = "...";
        document.getElementById("cidade").value = "...";
        document.getElementById("uf").value = "...";

        try {
            const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

            if (!resposta.ok) {
                throw new Error("Erro ao consultar o CEP.");
            }

            const conteudo = await resposta.json();

            if (conteudo.erro) {
                limpa_formulário_cep();
                alert("CEP não encontrado.");
                return;
            }

            document.getElementById("rua").value = conteudo.logradouro;
            document.getElementById("bairro").value = conteudo.bairro;
            document.getElementById("cidade").value = conteudo.localidade;
            document.getElementById("uf").value = conteudo.uf;

        } catch (erro) {
            limpa_formulário_cep();
            console.error(erro);
            alert("Erro ao consultar o CEP.");
        }
    }

