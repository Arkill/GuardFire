<?php
session_start();

// Verificar se o usuário já está logado
if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] == true) {
    header('Location: index.php'); // Redireciona para a página inicial se já estiver logado
    exit();
}

// Processar o formulário de login
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_POST['email'];
    $senha = $_POST['senha'];

    // Substitua com a lógica de validação do banco de dados
    if ($email == 'usuario@example.com' && $senha == 'senha123') {
        // Login bem-sucedido
        $_SESSION['loggedin'] = true; // Cria a sessão
        $_SESSION['email'] = $email;  // Armazena o email na sessão
        $_SESSION['username'] = 'Usuario'; // Definindo o nome de usuário na sessão
        header('Location: index.php'); // Redireciona para a página inicial
        exit();
    } else {
        $erro = "Usuário ou senha incorretos!"; // Mensagem de erro
    }
}
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sistema de Login</title>
    <link rel="stylesheet" href="l_style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="icon" href="img/logo.png" type="image/x-icon">
</head>
<body>
   <div class="container">
        <div class="login">
            <form action="login.php" method="POST">
                <h1>Login</h1>
                <hr>
                <p>GuardFire: Sistema Inteligente de Prevenção e Respostas a Incêndio. </p>
                <div class="input-container">
                    <input type="email" placeholder="Seu E-mail" name="email" id="emailfield" required>
                </div>
                <div class="input-container">
                    <input type="password" placeholder="Sua Senha!" name="senha" id="passwordfield" required>
                </div>
                
                <!-- Exibe a mensagem de erro -->
                <?php if (isset($erro)) { echo "<p style='color:red;'>$erro</p>"; } ?>
                
                <button type="submit">Entrar</button>
                <p>
                    <a href="#">Esqueceu sua Senha?</a>
                </p>
            </form>
        </div>
        <div class="pic">
            <img src="img/logo.png">
        </div>
    </div>
</body>
</html>
