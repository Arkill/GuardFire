document.getElementById('voltar-btn').addEventListener('click', function() {
    window.history.back();  // Volta para a página anterior
});

document.getElementById('denuncia-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio real do formulário

    // Coletando os dados do formulário
    const tipoDenuncia = document.getElementById('tipo-denuncia').value;
    const descricaoDenuncia = document.getElementById('descricao-denuncia').value;
    const fotoDenuncia = document.getElementById('foto-denuncia').files[0];

    // Mostrando os dados na tela (você pode substituir isso por um envio para um servidor)
    alert('Denúncia Enviada com Sucesso! \n' + 
          'Tipo: ' + tipoDenuncia + '\n' + 
          'Descrição: ' + descricaoDenuncia);

    // Se houver foto, podemos simular o envio
    if (fotoDenuncia) {
        alert('Foto anexada: ' + fotoDenuncia.name);
    }

    // Limpando o formulário
    document.getElementById('denuncia-form').reset();
});
