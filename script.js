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
HORA SELECIONADA: ${h
