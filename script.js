document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value.trim();  // Valor do campo nome
    const cpf = document.getElementById('cpf').value.trim();    // Valor do campo cpf

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

                DOCUMENTOS ANEXADOS: ✅
            `;
            resultadoDiv.innerHTML = `<pre>${resultadoTexto}</pre>`;

            // Criar e exibir o botão de copiar
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

            // Adicionar o botão de copiar no DOM
            resultadoDiv.appendChild(botaoCopiar);

            // Exibir o resultado e o botão "Copiar"
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
    cpf = cpf.replace(/[^\d]+/g, ''); // Remove qualquer caractere não numérico

    // Verificação de comprimento
    if (cpf.length !== 11) return false;

    // Verificar se todos os números são iguais (ex: 111.111.111.11)
    if (/^(\d)\1{10}$/.test(cpf)) return false;

    // Validação dos dois primeiros dígitos
    let soma = 0;
    let resto;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf[i - 1]) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf[9])) return false;

    // Validação do terceiro dígito
    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf[i - 1]) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf[10])) return false;

    return true;
}

// Máscara de CPF
document.getElementById('cpf').addEventListener('input', function(event) {
    let cpf = event.target.value;
    cpf = cpf.replace(/\D/g, ''); // Remove qualquer coisa que não seja número
    cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'); // Aplica a máscara
    event.target.value = cpf;
});
