document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value.trim();  // Valor do campo nome
    const cpf = document.getElementById('cpf').value.trim();    // Valor do campo cpf
    const horas = document.querySelector('.hora-button.selected')?.dataset.hora || ''; // Hora selecionada

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
TEMPO: ${horas ? horas : 'Nenhuma hora selecionada'}
DOCUMENTOS ANEXADOS: ✅
CIDADE:
Responsável pela venda:
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
        }, 1500); // Simula 1,5 segundos de espera
    } else {
        alert("CPF inválido!");
        document.getElementById('loader').style.display = 'none';
    }
});

// Adicionando a funcionalidade de selecionar horas
const horaButtons = document.querySelectorAll('.hora-button');
horaButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remover a seleção de todos os botões
        horaButtons.forEach(btn => btn.classList.remove('selected'));
        // Adicionar a classe de seleção no botão clicado
        this.classList.add('selected');
    });
});

// Função para validar o CPF
function validaCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');  // Remove todos os caracteres não numéricos

    if (cpf.length !== 11) return false; // CPF deve ter 11 dígitos

    // Verificação de dígitos verificadores (básica)
    let soma = 0;
    let resto;

    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf[i]) * (10 - i);
    }

    resto = soma % 11;
    if (resto < 2) resto = 0;
    else resto = 11 - resto;

    if (parseInt(cpf[9]) !== resto) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf[i]) * (11 - i);
    }

    resto = soma % 11;
    if (resto < 2) resto = 0;
    else resto = 11 - resto;

    return parseInt(cpf[10]) === resto;
}
