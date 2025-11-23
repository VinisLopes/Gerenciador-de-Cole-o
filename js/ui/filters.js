/* =========================================
   FILTERS.JS
   Monta e controla filtros e busca
   ========================================= */

console.log("Filters.js carregado");

const FiltersBuilder = {
  /* -----------------------------------------
     MONTA O HTML DOS FILTROS
     data   = array de itens da coleção
     isAdmin = true (admin) | false (visitor)
  ------------------------------------------ */
  buildFilters(data, isAdmin = false) {
    if (!data || data.length === 0) {
      return "<p>Nenhum dado para filtrar.</p>";
    }

    // Coleta valores únicos para cada filtro
    const categorias = this.uniqueValues(data, "categoria");
    const marcas = this.uniqueValues(data, "marca");
    const escalas = this.uniqueValues(data, "escala");
    const estados = this.uniqueValues(data, "estado");
    const origens = this.uniqueValues(data, "origem");
    const locais = this.uniqueValues(data, "localizacao");

    const mode = isAdmin ? "admin" : "visitor";

    return `
      <div class="filters-inner">
        
        <!-- Busca -->
        <div class="filter-group" style="flex:2;">
          <label>Busca</label>
          <input 
            id="search-${mode}" 
            type="text" 
            placeholder="Buscar por nome, categoria, série, modelo..." 
          />
        </div>

        <!-- Categoria -->
        <div class="filter-group">
          <label>Categoria</label>
          <select id="filter-${mode}-categoria" data-field="categoria">
            ${this.optionsHTML(categorias)}
          </select>
        </div>

        <!-- Marca -->
        <div class="filter-group">
          <label>Marca</label>
          <select id="filter-${mode}-marca" data-field="marca">
            ${this.optionsHTML(marcas)}
          </select>
        </div>

        <!-- Escala -->
        <div class="filter-group">
          <label>Escala</label>
          <select id="filter-${mode}-escala" data-field="escala">
            ${this.optionsHTML(escalas)}
          </select>
        </div>

        <!-- Estado -->
        <div class="filter-group">
          <label>Estado</label>
          <select id="filter-${mode}-estado" data-field="estado">
            ${this.optionsHTML(estados)}
          </select>
        </div>

        <!-- Origem -->
        <div class="filter-group">
          <label>Origem</label>
          <select id="filter-${mode}-origem" data-field="origem">
            ${this.optionsHTML(origens)}
          </select>
        </div>

        <!-- Localização -->
        <div class="filter-group">
          <label>Localização</label>
          <select id="filter-${mode}-localizacao" data-field="localizacao">
            ${this.optionsHTML(locais)}
          </select>
        </div>

      </div>
    `;
  },

  /* -----------------------------------------
     GERA OPTIONS (incluindo "Todos")
  ------------------------------------------ */
  optionsHTML(values) {
    let html = `<option value="Todos">Todos</option>`;
    values.forEach((v) => {
      html += `<option value="${v}">${v}</option>`;
    });
    return html;
  },

  /* -----------------------------------------
     RETORNA ARRAY DE VALORES ÚNICOS
  ------------------------------------------ */
  uniqueValues(data, field) {
    const set = new Set();
    data.forEach((item) => {
      const v = item[field];
      if (v && String(v).trim() !== "") {
        set.add(String(v).trim());
      }
    });
    return Array.from(set).sort((a, b) =>
      a.localeCompare(b, "pt-BR", { sensitivity: "base" })
    );
  },

  /* -----------------------------------------
     LIGA OS EVENTOS DE BUSCA E FILTROS
     mode = "visitor" | "admin"
  ------------------------------------------ */
  enableListeners(mode) {
    const isAdmin = mode === "admin";
    const controller = isAdmin ? Admin : Visitor;

    // Busca (com debounce)
    const searchInput = document.getElementById(`search-${mode}`);
    if (searchInput) {
      const debounced = Utils.debounce((e) => {
        controller.updateSearch(e.target.value);
      }, 300);

      searchInput.addEventListener("input", debounced);
    }

    // Todos os selects de filtro desse modo
    const containerId = isAdmin ? "admin-filters" : "visitor-filters";
    const container = document.getElementById(containerId);

    if (!container) return;

    const selects = container.querySelectorAll("select[data-field]");
    selects.forEach((sel) => {
      sel.addEventListener("change", (e) => {
        const field = e.target.dataset.field;
        const value = e.target.value;
        controller.updateFilters(field, value);
      });
    });
  },
};
