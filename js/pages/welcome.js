/* =========================================
   WELCOME.JS
   Controle da tela inicial
   ========================================= */

console.log("Welcome.js carregado");

const Welcome = {
    /* -----------------------------------------
       ENTRAR COMO VISITANTE
    ------------------------------------------ */
    enterVisitor() {
        console.log("Entrando como visitante...");

        changeScreen("visitor");

        // Carrega dados para o visitante
        Sheets.load().then(() => {
            Visitor.updateTable(Sheets.data);
            Visitor.loadFilters(Sheets.data);
        });
    },

    /* -----------------------------------------
       MOSTRAR LOGIN DO ADMINISTRADOR
    ------------------------------------------ */
    showAdminLogin() {
        console.log("Abrindo tela de login admin...");
        changeScreen("login");
    },

    /* -----------------------------------------
       VOLTAR PARA A TELA INICIAL
    ------------------------------------------ */
    backToMain() {
        console.log("Voltando à tela inicial...");
        changeScreen("welcome");
    }
};

// Adiciona listeners para os botões da tela inicial
document.addEventListener("DOMContentLoaded", () => {
    // Botões da tela de Boas-Vindas
    document.getElementById("btn-visitor")?.addEventListener("click", Welcome.enterVisitor);
    document.getElementById("btn-admin")?.addEventListener("click", Welcome.showAdminLogin);

    // Botão Voltar da tela de Login
    document.getElementById("btn-admin-back")?.addEventListener("click", Welcome.backToMain);
});