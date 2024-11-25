<?php
session_start();

// Verificar se o usuário está logado
if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] != true) {
    header('Location: login.php'); // Redireciona para o login se não estiver logado
    exit();
}

?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GuardFire - Sistema para Bombeiros</title>
    <link rel="stylesheet" href="incendio.css">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
    <link rel="icon" href="img/logo.png" type="image/x-icon">
</head>
<body>

<header>
    <img src="img/logo.png" alt="Logo GuardFire" class="logo">
    <h1>GuardFire</h1>
    <p>Sistema Completo de Combate a Incêndios para Bombeiros</p>

    <!-- Exibindo informações do usuário -->
    <?php if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] === true): ?>
        <div class="user-profile">
            <p>Bem-vindo, <?php echo htmlspecialchars($_SESSION['username']); ?>!</p>
            <a href="logout.php" class="logout-button">Sair</a>
        </div>
    <?php endif; ?>
</header>

<nav>
    <ul>
        <li><a href="emergencias.html">Chamados de Emergência</a></li>
        <li><a href="relatorio.html">Relatórios</a></li>
        <li><a href="comunicacao.html">Comunicação</a></li>
    </ul>
</nav>

<section class="hero">
    <h1>Apoio e Agilidade para Bombeiros</h1>
</section>

<!-- Seção de Monitoramento com o Mapa -->
<section id="monitoramento" class="map-container">
    <div id="map"></div>
</section>

<!-- Seção de Depoimentos -->
<section class="depoimentos">
    <h2>Depoimentos</h2>
    <div class="depoimento">
        <img src="img/realistic_male_firefighter_profile_picture.png" alt="Bombeiro João">
        <blockquote>
            "A equipe foi incrível e salvou muitas vidas durante o incêndio."
        </blockquote>
        <footer>- Bombeiro João</footer>
    </div>
    
    <div class="depoimento">
        <img src="img/female_firefighter_profile_picture.png" alt="Bombeiro Maria">
        <blockquote>
            "A agilidade da resposta foi fundamental para conter o incêndio."
        </blockquote>
        <footer>- Bombeiro Maria</footer>
    </div>
    
    <div class="mais-depoimentos">
        <a href="#">Ver mais depoimentos</a>
    </div>
</section>

<!-- Seção de Notícias e Atualizações -->
<section id="noticias">
    <h2>Notícias e Atualizações</h2>
    <p>Fique por dentro das últimas notícias relacionadas a incêndios e campanhas de conscientização.</p>
</section>

<!-- Seção de Contato -->
<section id="contato">
    <h2>Contato</h2>
    <form>
        <label for="nome">Nome:</label>
        <input type="text" id="nome" name="nome" required>
        <label for="email">E-mail:</label>
        <input type="email" id="email" name="email" required>
        <label for="mensagem">Mensagem:</label>
        <textarea id="mensagem" name="mensagem" required></textarea>
        <button type="submit">Enviar</button>
    </form>
</section>

<!-- Seção de Informações Climáticas -->
<section class="weather">
    <h2>Informações Climáticas</h2>
    <div class="weather-info" id="weather-info">
        <img id="weather-icon" src="" alt="Condição do Tempo" style="display: none;">
        <p>Carregando...</p>
    </div>
</section>

<!-- Rodapé -->
<footer>
    <div class="footer-content">
        <p>© 2024 GuardFire. Todos os direitos reservados.</p>
        <!-- Link de e-mail com novo estilo -->
        <p>
            <a href="mailto:contato@guardfire.com" class="footer-email">contato@guardfire.com</a>
        </p>

        <!-- Redes sociais com links personalizados -->
        <ul class="social-links">
            <li><a href="https://facebook.com" target="_blank" class="facebook-link"><img src="img/face.svg" alt="Facebook"></a></li>
            <li><a href="https://twitter.com" target="_blank" class="twitter-link"><img src="img/x.svg" alt="Twitter"></a></li>
            <li><a href="https://instagram.com" target="_blank" class="instagram-link"><img src="img/insta.svg" alt="Instagram"></a></li>
        </ul>
    </div>
</footer>

<!-- Scripts -->
<script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
<script src="mapa_script.js"></script>
<script src="script.js"></script>
<script src="script_ic.js"></script>

</body>
</html>
