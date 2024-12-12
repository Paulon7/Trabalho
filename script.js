document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value.trim();  // Valor do campo nome
    const cpf = document.getElementById('cpf').value.trim();    // Valor do campo cpf

    // Verificar se o CPF está no formato correto (apenas números e 11 dígitos)
    if (/^\d{11}$/.test(cpf)) {
        const resultadoDiv = document.getElementById('resultado');
        
        // Exibindo os dados formatados
        resultadoDiv.innerHTML = `
            <p><strong>SOLICITAÇÃO PRIORIDADE QUALIFY</strong></p>
            <p><strong>NOME:</strong> ${nome}</p>
            <p><strong>CPF:</strong> ${cpf}</p>
            <p><strong>DOCUMENTOS ANEXADOS:</strong> ✅</p>
        `;

        resultadoDiv.style.display = 'block';  // Exibe o resultado
    } else {
        alert("Por favor, insira um CPF válido (apenas números e 11 dígitos).");
    }
});
