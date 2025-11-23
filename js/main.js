/* =========================================
   MAIN.JS
   Controla a navegação entre telas
   ========================================= */

console.log("Main.js carregado");

const Screens = {
    welcome: document.getElementById("screen-welcome"),
    login: document.getElementById("screen-login"),
    visitor: document.getElementById("screen-visitor"),
    admin: document.getElementById("screen-admin"),
};

/* -----------------------------------------
   Função para trocar telas
------------------------------------------ */
function changeScreen(target) {
    Object.values(Screens).forEach(screen => screen.classList.add("hidden"));
    Screens[target].classList.remove("hidden");
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
