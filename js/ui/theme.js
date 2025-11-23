/* =========================================
   THEME.JS
   Sistema de tema claro/escuro + salvamento
   ========================================= */

console.log("Theme.js carregado");

const Theme = {
  current: "light",

  /* -----------------------------------------
     Inicializa o tema ao carregar a página
  ------------------------------------------ */
  init() {
    const saved = localStorage.getItem("theme");

    if (saved === "dark") {
      this.setDark();
    } else {
      this.setLight();
    }
  },

  /* -----------------------------------------
     Aplica tema claro
  ------------------------------------------ */
  setLight() {
    document.body.classList.remove("theme-dark");
    document.body.classList.add("theme-light");

    this.current = "light";
    localStorage.setItem("theme", "light");

    this.updateToggleUI();
  },

  /* -----------------------------------------
     Aplica tema escuro
  ------------------------------------------ */
  setDark() {
    document.body.classList.remove("theme-light");
    document.body.classList.add("theme-dark");

    this.current = "dark";
    localStorage.setItem("theme", "dark");

    this.updateToggleUI();
  },

  /* -----------------------------------------
     Alterna entre claro/escuro
  ------------------------------------------ */
  toggle() {
    if (this.current === "light") {
      this.setDark();
    } else {
      this.setLight();
    }
  },

  /* -----------------------------------------
     Atualiza o botão na interface
  ------------------------------------------ */
  updateToggleUI() {
    const btn = document.getElementById("theme-toggle");

    if (!btn) return;

    btn.textContent = this.current === "light" ? "🌙 Escuro" : "☀️ Claro";
  }
};

/* -----------------------------------------
   Inicialização automática
------------------------------------------ */
document.addEventListener("DOMContentLoaded", () => {
  Theme.init();

  const btn = document.getElementById("theme-toggle");
  if (btn) {
    btn.addEventListener("click", () => Theme.toggle());
  }
});
