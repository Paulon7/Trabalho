document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value.trim();  // Valor do campo nome
    const cpf = document.getElementById('cpf').value.trim();    // Valor do campo cpf
    const horas = document.querySelector('.hora-button.selected')?.dataset.hora || ''; // Hora selecionada
    const cidade = document.getElementById('cidade').value;  // Valor da cidade selecionada

    // Exibir o loader enquanto o processamento está em andamento
    const loader = document.getElementById('loader');
    const resultadoDiv = document.getElementById('resultado');

    if (!loader || !resultadoDiv) {
        alert('Erro: Elementos de loader ou resultado não encontrados.');
        return;
    }

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

            resultadoDiv.innerHTML = `<pre>${resultadoTexto}</pre>`;

            // Exibir o botão de copiar
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

            // Garantir que o botão "Copiar" apareça após o conteúdo ser gerado
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

