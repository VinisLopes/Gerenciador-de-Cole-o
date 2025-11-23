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
