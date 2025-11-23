/* =========================================
   MAIN.JS
   Controla a navegação entre telas
   ========================================= */

console.log("Main.js carregado");

const Screens = {
    // IDs corrigidos para corresponder ao index.html
    welcome: document.getElementById("welcome-screen"),
    login: document.getElementById("admin-login-screen"),
    visitor: document.getElementById("visitor-screen"),
    admin: document.getElementById("admin-screen"),
};

/* -----------------------------------------
   Função para trocar telas
------------------------------------------ */
function changeScreen(target) {
    // Adicionado o operador '?' para evitar erros caso alguma tela seja null
    Object.values(Screens).forEach(screen => screen?.classList.add("hidden"));
    Screens[target]?.classList.remove("hidden");
}

/* -----------------------------------------
   Inicialização Geral
------------------------------------------ */
document.addEventListener("DOMContentLoaded", async () => {
    console.log("Sistema iniciado");

    changeScreen("welcome");

    // Carrega dados e tabela para visitante/admin quando necessário
    Visitor.init();
    Admin.init();
});