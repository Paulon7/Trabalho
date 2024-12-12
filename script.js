document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const cpf = document.getElementById('cpf').value.trim();

    // Verificar se o CPF está no formato correto (apenas números, com 11 dígitos)
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
});
