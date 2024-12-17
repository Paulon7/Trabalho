document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value.trim();  // Valor do campo nome
    const cpf = document.getElementById('cpf').value.trim();    // Valor do campo cpf
    const horaSelecionada = document.querySelector('.hora-button.selected')?.dataset.hora || "Não selecionado";

    // Exibir o loader enquanto o processamento está em andamento
    document.getElementById('loader').style.display = 'block';
    document.getElementById('resultado').style.display = 'none';

    // Validação do CPF (apenas números e 11 dígitos)
    if (validaCPF(cpf)) {
        setTimeout(() => { // Simula um atraso no processamento
            const resultadoDiv = document.getElementById('resultado');
            
            // Exibindo os dados formatados
            const resultadoTexto = `
SOLICITAÇÃO PRIORIDADE QUALIFY
NOME: ${nome}
CPF: ${cpf}
HORA SELECIONADA: ${horaSelecionada}
DOCUMENTOS ANEXADOS: ✅
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

            resultadoDiv.style.display = 'block';
            document.getElementById('loader').style.display = 'none'; // Ocultar o loader
        }, 1500); // Simula 1,5 segundos de processamento
    } else {
        document.getElementById('loader').style.display = 'none'; // Ocultar o loader
        alert("Por favor, insira um CPF válido (apenas números e 11 dígitos).");
    }
});

// Função para validar CPF (sem formatação)
function validaCPF(cpf) {
