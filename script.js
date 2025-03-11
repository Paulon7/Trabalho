const solicitacoes = [];  // Array para armazenar as solicitações

document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const cpf = document.getElementById('cpf').value.trim();
    const responsavel = document.getElementById('responsavel').value.trim();
    const tipoTempo = document.getElementById('tipo-tempo').value;
    const cidade = document.getElementById('cidade').value;

    let tempoSelecionado = '';
    if (tipoTempo === 'hora') {
        tempoSelecionado = document.querySelector('.hora-button.selected')?.dataset.hora || '';
    } else {
        tempoSelecionado = document.querySelector('.hora-button.selected')?.dataset.minuto || '';
    }

    // Verificação de CPF
    if (!validaCPF(cpf)) {
        alert("CPF inválido!");
        return;
    }

    // Armazenar solicitação
    solicitacoes.push({
        nome,
        cpf,
        responsavel,
        tempo: tempoSelecionado,
        tipoTempo,
        cidade,
    });

    alert("Solicitação registrada com sucesso!");
});

document.getElementById('tipo-tempo').addEventListener('change', function() {
    const tipo = this.value;
    const horaButtons = document.getElementById('hora-buttons');
    const minutoButtons = document.getElementById('minuto-buttons');
    const minutoContainer = document.getElementById('minuto-container');

    if (tipo === 'hora') {
        horaButtons.style.display = 'block';
        minutoButtons.style.display = 'none';
    } else {
        horaButtons.style.display = 'none';
        minutoButtons.style.display = 'block';

        // Criar botões de minutos de 1 a 60
        minutoContainer.innerHTML = '';  // Limpar os botões de minutos anteriores
        for (let i = 1; i <= 60; i++) {
            const button = document.createElement('button');
            button.type = 'button';
            button.classList.add('hora-button');
            button.dataset.minuto = i;
            button.textContent = `+${i} Minuto(s)`;

            // Adicionar evento de seleção
            button.addEventListener('click', function() {
                document.querySelectorAll('.hora-button').forEach(btn => {
                    btn.classList.remove('selected');
                });
                this.classList.add('selected');
            });

            minutoContainer.appendChild(button);
        }
    }
});

// Seleção de tempo (hora ou minuto)
document.querySelectorAll('.hora-button').forEach(button => {
    button.addEventListener('click', function() {
        document.querySelectorAll('.hora-button').forEach(btn => {
            btn.classList.remove('selected');
        });
        this.classList.add('selected');
    });
});

function validaCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11) return false;

    let soma = 0;
    let resto;

    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.charAt(i - 1)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.charAt(i - 1)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf.charAt(10));
}

// Gerar o relatório completo
function gerarRelatorio() {
    const relatorioConteudo = document.getElementById('relatorio-conteudo');
    relatorioConteudo.innerHTML = '';

    solicitacoes.forEach(solicitacao => {
        const { nome, cpf, responsavel, tempo, tipoTempo, cidade } = solicitacao;

        const formatoSolicitacao = tipoTempo === 'hora' 
            ? `+${tempo} Hora(s)`
            : `+${tempo} Minuto(s)`;

        const relatorioTexto = `
SOLICITAÇÃO PRIORIDADE QUALIFY        
NOME: ${nome}
CPF: ${cpf}
TEMPO: ${formatoSolicitacao}
CIDADE: ${cidade}
DOCUMENTOS ANEXADOS: ✅
RESPONSÁVEL PELA VENDA: ${responsavel}
        `;

        const relatorioDiv = document.createElement('div');
        relatorioDiv.classList.add('relatorio-item');
        relatorioDiv.innerHTML = `<pre>${relatorioTexto}</pre>`;
        relatorioConteudo.appendChild(relatorioDiv);
    });
}

// Função para copiar o relatório completo
document.getElementById('copiar-relatorio').addEventListener('click', function() {
    if (solicitacoes.length === 0) {
        alert('Nenhum registro encontrado para copiar!');
        return;
    }

    let relatorioCompleto = '';
    solicitacoes.forEach((solicitacao, index) => {
        const { nome, cpf, responsavel, tempo, tipoTempo, cidade } = solicitacao;

        const formatoSolicitacao = tipoTempo === 'hora' 
            ? `+${tempo} Hora(s)`
            : `+${tempo} Minuto(s)`;

        relatorioCompleto += `
SOLICITAÇÃO PRIORIDADE QUALIFY
NOME: ${nome}
CPF: ${cpf}
TEMPO: ${formatoSolicitacao}
CIDADE: ${cidade}
DOCUMENTOS ANEXADOS: ✅
RESPONSÁVEL PELA VENDA: ${responsavel}
        `;
    });

    navigator.clipboard.writeText(relatorioCompleto).then(() => {
        alert("Relatório completo copiado para a área de transferência!");
    }).catch(err => {
        alert("Erro ao copiar o relatório: " + err);
    });
});
