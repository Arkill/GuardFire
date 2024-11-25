document.getElementById('voltar-btn').addEventListener('click', function() {
    window.history.back();  // Volta para a página anterior
});

document.getElementById('acessar-mensagens-btn').addEventListener('click', function() {
    const mensagensContainer = document.getElementById('mensagens-container');
    if (mensagensContainer.style.display === 'block') {
        mensagensContainer.style.display = 'none';
    } else {
        mensagensContainer.style.display = 'block';
    }
});

document.getElementById('mensagem-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtendo os valores do formulário
    const mensagem = document.getElementById('mensagem').value;
    const foto = document.getElementById('foto').files[0];

    // Criando o item da mensagem
    const li = document.createElement('li');
    li.classList.add('mensagem-item');
    
    // Adicionando a mensagem ao item
    li.textContent = mensagem;

    // Se uma foto for enviada, criar um elemento de imagem
    if (foto) {
        const img = document.createElement('img');
        img.src = URL.createObjectURL(foto);
        li.appendChild(img);
    }

    // Adicionando a nova mensagem à lista de mensagens
    document.getElementById('mensagens-list').appendChild(li);

    // Limpando o formulário
    document.getElementById('mensagem-form').reset();
});
