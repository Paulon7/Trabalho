document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value.trim();  // Valor do campo nome
    const cpf = document.getElementById('cpf').value.trim();    // Valor do campo cpf
    const horas = document.querySelector('.hora-button.selected')?.dataset.hora || ''; // Hora selecionada
    const cidade = document.getElementById('cidade').value;  // Valor da cidade selecionada

    // Obter elementos de loader e resultado
    const loader = document.getElementById('loader');
    const resultadoDiv = document.getElementById('resultado');

    // Verificar se os elementos existem no DOM
    if (!loader || !resultadoDiv) {
        alert('Erro: Elementos de loader ou resultado não encontrados.');
        return;
    }

    // Exibir o loader enquanto o processamento está em andamento
    loader.style.display = 'block';
    resultadoDiv.style.display = 'none';

    // Validação do CPF (apenas números e 11 dígitos)
    if (validaCPF(cpf)) {
        setTimeout(() => { // Simula um atraso no processamento

            // Exibindo os dados formatados
            const resultadoTexto = `
SOLICITAÇÃO PRIORIDADE QUALIFY
NOME: ${nome}
CPF: ${cpf}
TEMPO: ${horas ? horas : 'Nenhuma hora selecionada'}
CIDADE: ${cidade ? cidade : 'Cidade não selecionada'}
DOCUMENTOS ANEXADOS: ✅
RESPONSÁVEL PELA VENDA:
            `;

            // Exibir o resultado com os dados
            resultadoDiv.innerHTML = `<pre>${resultadoTexto}</pre>`;

            // Criar o botão de copiar
            const botaoCopiar = document.createElement('button');
            botaoCopiar.textContent = 'Copiar';
            botaoCopiar.className = 'copiar';
            botaoCopiar.addEventListener('click', function() {
                navigator.clipboard.writeText(resultadoTexto).then(() => {
                    alert("Texto copiado para a área de transferência!");
                }).catch(err => {
                    alert("Erro ao copiar o texto: " + err);
                });
            });

            // Adicionar o botão de copiar ao resultado
            resultadoDiv.appendChild(botaoCopiar);

            // Exibir o resultado e ocultar o loader
            resultadoDiv.style.display = 'block';
            loader.style.display = 'none';
        }, 1500); // Simula 1,5 segundos de espera
    } else {
        alert("CPF inválido!");
        loader.style.display = 'none';
    }
});

// Função de validação do CPF
function validaCPF(cpf) {
    // Remover caracteres não numéricos
    cpf = cpf.replace(/\D/g, '');

    // Verificar se o CPF tem 11 dígitos
    if (cpf.length !== 11) {
        return false;
    }

    // Validação do CPF (algoritmo padrão)
    let soma = 0;
    let resto;

    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.charAt(i - 1)) * (11 - i);
    }
    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) {
        resto = 0;
    }

    if (resto !== parseInt(cpf.charAt(9))) {
        return false;
    }

    soma = 0;
    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.charAt(i - 1)) * (12 - i);
    }
    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) {
        resto = 0;
    }

    return resto === parseInt(cpf.charAt(10));
}
