/* =========================================
   AUTH.JS
   Controle de autenticação do Administrador
   ========================================= */

console.log("Auth.js carregado");

// 🔐 Senha do administrador (pode trocar quando quiser)
const ADMIN_PASSWORD = "admin123";

/* -----------------------------------------
   LOGIN
------------------------------------------ */
const Auth = {
    login() {
        // ID do input de senha corrigido para "admin-password-input"
        const input = document.getElementById("admin-password-input");
        const password = input.value.trim();

        if (password === "") {
            alert("Digite a senha.");
            return;
        }

        if (password !== ADMIN_PASSWORD) {
            alert("Senha incorreta!");
            input.value = "";
            return;
        }

        console.log("Login bem-sucedido como ADMIN.");
        input.value = "";

        changeScreen("admin");
        Admin.loadAdminData(); // Carrega tabela, filtros e dashboard
    },

    /* -----------------------------------------
       LOGOUT
    ------------------------------------------ */
    logout() {
        console.log("Administrador saiu.");
        changeScreen("welcome");
    }
};

/* -----------------------------------------
   Inicializa listeners
------------------------------------------ */
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btn-admin-login")?.addEventListener("click", Auth.login);
});