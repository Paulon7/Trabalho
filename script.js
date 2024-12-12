document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();

    const dados = document.getElementById('dados').value.trim();

    // Separando os dados (nome e CPF)
    const partes = dados.split(/[\s,]+/);  // separa por espaços ou vírgulas

    if (partes.length === 2) {
        const nome = partes[0];
        const cpf = partes[1];

        // Verificar se CPF está no formato correto (apenas números, com 11 dígitos)
        if (/^\d{11}$/.test(cpf)) {
            const resultadoDiv = document.getElementById('resultado');
            
            // Exibindo os dados formatados
            resultadoDiv.innerHTML = `
                <p><strong>SOLICITAÇÃO PRIORIDADE QUALIFY</strong></p>
                <p><strong>NOME:</strong> ${nome}</p>
                <p><strong>CPF:</strong> ${cpf}</p>
                <p><strong>DOCUMENTOS ANEXADOS:</strong> ✅</p>
            `;

            resultadoDiv.style.display = 'block';
        } else {
            alert("Por favor, insira um CPF válido (apenas números e 11 dígitos).");
        }
    } else {
        alert("Por favor, insira o nome e o CPF separados por espaço ou vírgula.");
    }
});
