/* =========================================
   UTILS.JS
   Funções utilitárias usadas no sistema
   ========================================= */

console.log("Utils.js carregado");

const Utils = {
  /* -----------------------------------------
     GERA UM ID ALEATÓRIO (PARA ITENS LOCAIS)
  ------------------------------------------ */
  randomId(prefix = "item") {
    const rand = Math.random().toString(36).substring(2, 9);
    const time = Date.now().toString(36);
    return `${prefix}_${rand}${time}`;
  },

  /* -----------------------------------------
     FORMATA NÚMERO EM R$ 1.234,56
  ------------------------------------------ */
  formatCurrency(value) {
    const num = this.parseNumber(value);
    return num.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    });
  },

  /* -----------------------------------------
     CONVERTE TEXTO PARA NÚMERO (PT-BR)
  ------------------------------------------ */
  parseNumber(value) {
    if (typeof value === "number") return value;
    if (!value) return 0;

    let str = String(value).trim();
    // troca vírgula por ponto
    str = str.replace(".", "").replace(",", ".");

    const num = parseFloat(str);
    return isNaN(num) ? 0 : num;
  },

  /* -----------------------------------------
     DATA ATUAL EM FORMATO dd/mm/aaaa
  ------------------------------------------ */
  todayBR() {
    const d = new Date();
    const dia = String(d.getDate()).padStart(2, "0");
    const mes = String(d.getMonth() + 1).padStart(2, "0");
    const ano = d.getFullYear();
    return `${dia}/${mes}/${ano}`;
  },

  /* -----------------------------------------
     DATA ATUAL EM FORMATO ISO (aaaa-mm-dd)
  ------------------------------------------ */
  todayISO() {
    const d = new Date();
    const dia = String(d.getDate()).padStart(2, "0");
    const mes = String(d.getMonth() + 1).padStart(2, "0");
    const ano = d.getFullYear();
    return `${ano}-${mes}-${dia}`;
  },

  /* -----------------------------------------
     CLONE PROFUNDO SIMPLES (OBJ/ARRAY)
  ------------------------------------------ */
  clone(value) {
    return JSON.parse(JSON.stringify(value));
  },

  /* -----------------------------------------
     NORMALIZA TEXTO (p/ buscas e filtros)
  ------------------------------------------ */
  normalizeText(text) {
    if (!text) return "";
    return String(text)
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // remove acentos
      .trim();
  },

  /* -----------------------------------------
     FILTRO DE BUSCA SIMPLES (texto livre)
     fields = ['nome','categoria',...]
  ------------------------------------------ */
  searchInItems(items, query, fields) {
    const q = this.normalizeText(query);
    if (!q) return items;

    return items.filter((item) => {
      return fields.some((field) => {
        const value = this.normalizeText(item[field] || "");
        return value.includes(q);
      });
    });
  },

  /* -----------------------------------------
     APLICA VÁRIOS FILTROS EM CIMA DO ARRAY
     filters = { campo: 'valor', ... }
  ------------------------------------------ */
  applyFilters(items, filters) {
    let result = items;

    Object.entries(filters).forEach(([key, value]) => {
      if (!value || value === "Todos") return;

      const vNorm = this.normalizeText(value);

      result = result.filter((item) => {
        const itemVal = this.normalizeText(item[key] || "");
        return itemVal === vNorm;
      });
    });

    return result;
  },

  /* -----------------------------------------
     SOMA TOTAL DE QUANTIDADE
  ------------------------------------------ */
  totalQuantidade(items) {
    return items.reduce((acc, it) => {
      return acc + (parseInt(it.quantidade) || 0);
    }, 0);
  },

  /* -----------------------------------------
     SOMA TOTAL DE VALOR
  ------------------------------------------ */
  totalValor(items) {
    return items.reduce((acc, it) => {
      return acc + this.parseNumber(it.valor);
    }, 0);
  },

  /* -----------------------------------------
     AGRUPA POR CAMPO (ex: categoria, marca)
     retorna: { chave: [itens...] }
  ------------------------------------------ */
  groupBy(items, field) {
    return items.reduce((map, item) => {
      const key = item[field] || "Sem informação";
      if (!map[key]) map[key] = [];
      map[key].push(item);
      return map;
    }, {});
  },

  /* -----------------------------------------
     DEBOUNCE (para buscas en tempo real)
  ------------------------------------------ */
  debounce(fn, delay = 300) {
    let timer = null;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  },
};
