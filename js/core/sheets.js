/* =========================================
   SHEETS.JS
   Conexão com Google Sheets (Apps Script)
   ========================================= */

console.log("Sheets.js carregado");

/* -----------------------------------------
   CONFIGURAÇÃO DO APPS SCRIPT
------------------------------------------ */

// SEU ENDPOINT DO APPS SCRIPT (FUNCIONA COMO UMA API)
const SHEETS_API =
  "https://script.google.com/macros/s/AKfycbylQlo6Vq3xgBkxN67YZAV25GRRHXL5sX7ALjxcLzTF6o8vBYrzU3AzoXyKbJlIA68h8Q/exec";

/* -----------------------------------------
   OBJETO PRINCIPAL
------------------------------------------ */
const Sheets = {
  data: [],

  /* -----------------------------------------
       1) CARREGAR TABELA (GET)
  ------------------------------------------ */
  async load() {
    try {
      console.log("Carregando dados da planilha...");

      const response = await fetch(SHEETS_API);
      const json = await response.json();

      Sheets.data = json.data || [];

      console.log("Dados carregados:", Sheets.data);

      // Atualiza tabela de visitante e admin
      Visitor.updateTable(Sheets.data);
      Admin.updateTable(Sheets.data);

      return Sheets.data;
    } catch (err) {
      console.error("Erro ao carregar planilha:", err);
      alert("Erro ao carregar dados da planilha.");
    }
  },

  /* -----------------------------------------
       2) ADICIONAR ITEM (POST)
  ------------------------------------------ */
  async add(item) {
    try {
      const response = await fetch(SHEETS_API, {
        method: "POST",
        body: JSON.stringify({
          action: "add",
          item,
        }),
      });

      const json = await response.json();

      if (json.success) {
        alert("Item adicionado com sucesso!");
        await Sheets.load();
      } else {
        alert("Erro ao adicionar item.");
      }
    } catch (err) {
      console.error("Erro:", err);
    }
  },

  /* -----------------------------------------
       3) EDITAR ITEM (PUT)
  ------------------------------------------ */
  async edit(id, item) {
    try {
      const response = await fetch(SHEETS_API, {
        method: "PUT",
        body: JSON.stringify({
          action: "edit",
          id,
          item,
        }),
      });

      const json = await response.json();

      if (json.success) {
        alert("Item atualizado!");
        await Sheets.load();
      } else {
        alert("Erro ao editar item.");
      }
    } catch (err) {
      console.error("Erro:", err);
    }
  },

  /* -----------------------------------------
       4) EXCLUIR ITEM (DELETE)
  ------------------------------------------ */
  async remove(id) {
    if (!confirm("Tem certeza que deseja excluir este item?")) return;

    try {
      const response = await fetch(SHEETS_API, {
        method: "DELETE",
        body: JSON.stringify({
          action: "delete",
          id,
        }),
      });

      const json = await response.json();

      if (json.success) {
        alert("Item removido!");
        await Sheets.load();
      } else {
        alert("Erro ao excluir item.");
      }
    } catch (err) {
      console.error("Erro:", err);
    }
  },

  /* -----------------------------------------
       5) SINCRONIZAR TUDO
  ------------------------------------------ */
  async sync() {
    alert("Sincronização completa! Atualizando...");
    await Sheets.load();
  },
};
