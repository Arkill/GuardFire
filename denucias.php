<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $tipoDenuncia = $_POST['tipo-denuncia'];
    $descricaoDenuncia = $_POST['descricao-denuncia'];
    $fotoDenuncia = $_FILES['foto-denuncia'];

    // Armazenar ou processar os dados conforme necessário
    // Exemplo simples de salvamento de foto
    if ($fotoDenuncia) {
        move_uploaded_file($fotoDenuncia['tmp_name'], 'uploads/' . $fotoDenuncia['name']);
    }

    // Salvar a denúncia em um banco de dados ou fazer outro processamento
    // A denúncia foi recebida com sucesso
    echo "Denúncia recebida!";
}
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Canal para Denúncias</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="style_dn.css">
</head>
<body>
    <header>
        <h1>Canal para Denúncias</h1>
        <p>Denuncie práticas ilegais ou situações de risco de forma anônima.</p>
        <button id="voltar-btn" class="voltar-btn">Voltar</button>
    </header>
    
    <main>
        <section class="denuncia-form">
            <h2>Envie sua denúncia</h2>
            <form id="denuncia-form">
                <label for="tipo-denuncia">Tipo de Denúncia:</label>
                <select id="tipo-denuncia" name="tipo-denuncia" required>
                    <option value="pratica-ilegal">Prática Ilegal</option>
                    <option value="situacao-risco">Situação de Risco</option>
                </select>

                <label for="descricao-denuncia">Descrição da Denúncia:</label>
                <textarea id="descricao-denuncia" name="descricao-denuncia" rows="4" placeholder="Descreva a situação" required></textarea>

                <label for="foto-denuncia">Enviar Foto (Opcional):</label>
                <input type="file" id="foto-denuncia" name="foto-denuncia" accept="image/*">

                <button type="submit">Enviar Denúncia</button>
            </form>
        </section>

    <script src="script_dn.js"></script>
</body>
</html>
