/* =========================================
   MODALS.JS
   Sistema simples de modais customizados
   ========================================= */

console.log("Modals.js carregado");

const Modal = {
  container: null,

  init() {
    this.container = document.getElementById("modal-container");
    if (!this.container) {
      console.warn("⚠ #modal-container não encontrado no HTML.");
    }
  },

  /* -----------------------------------------
     Abre um modal com HTML customizado
  ------------------------------------------ */
  open(htmlContent) {
    if (!this.container) this.init();
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="modal-backdrop" onclick="Modal.close()"></div>
      <div class="modal">
        ${htmlContent}
      </div>
    `;

    this.container.classList.add("active");
  },

  /* -----------------------------------------
     Fecha o modal
  ------------------------------------------ */
  close() {
    if (!this.container) this.init();
    if (!this.container) return;

    this.container.classList.remove("active");
    this.container.innerHTML = "";
  },

  /* -----------------------------------------
     Modal de confirmação "bonito"
     options = {
       title: 'Título',
       message: 'Mensagem',
       confirmText: 'OK',
       cancelText: 'Cancelar',
       onConfirm: () => {}
     }
  ------------------------------------------ */
  confirm(options = {}) {
    const {
      title = "Confirmação",
      message = "Tem certeza?",
      confirmText = "Confirmar",
      cancelText = "Cancelar",
      onConfirm = () => {},
    } = options;

    const html = `
      <h2 style="font-size:1.2rem; margin-bottom:0.5rem;">${title}</h2>
      <p style="font-size:0.95rem; margin-bottom:1.4rem;">${message}</p>

      <div style="display:flex; gap:0.6rem; justify-content:flex-end;">
        <button 
          class="btn btn-gray" 
          type="button"
          onclick="Modal.close()"
        >
          ${cancelText}
        </button>
        <button 
          class="btn btn-purple" 
          type="button"
          onclick="(function(){
            Modal.close();
            (${onConfirm.toString()})();
          })()"
        >
          ${confirmText}
        </button>
      </div>
    `;

    this.open(html);
  },
};

// Inicializa ao carregar
document.addEventListener("DOMContentLoaded", () => {
  Modal.init();
});
