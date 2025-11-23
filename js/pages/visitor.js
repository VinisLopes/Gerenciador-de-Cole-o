/* =========================================
   VISITOR.JS
   Controle do modo visitante (somente leitura)
   ========================================= */

console.log("Visitor.js carregado");

const Visitor = {
    rawData: [],      // Dados originais do Sheets
    filteredData: [], // Dados filtrados para exibição
    searchValue: "",  // Busca por texto
    filters: {},      // Filtros selecionados

    /* -----------------------------------------
       Inicialização
    ------------------------------------------ */
    init() {
        console.log("Visitor.init() pronto.");
    },

    /* -----------------------------------------
       Atualiza tabela quando dados chegam
    ------------------------------------------ */
    updateTable(data) {
        if (!data || data.length === 0) {
            document.getElementById("visitor-table").innerHTML =
                "<p style='padding:1rem;'>Nenhum item encontrado.</p>";
            return;
        }

        this.rawData = data;

        // Aplica busca + filtros
        this.applyFiltering();

        // Monta HTML da tabela com os dados filtrados
        const html = TableBuilder.buildVisitorTable(this.filteredData);
        document.getElementById("visitor-table").innerHTML = html;
    },

    /* -----------------------------------------
       Carrega filtros iniciais
    ------------------------------------------ */
    loadFilters(data) {
        const html = FiltersBuilder.buildFilters(data, false); // false = visitante
        document.getElementById("visitor-filters").innerHTML = html;

        FiltersBuilder.enableListeners("visitor");
    },

    /* -----------------------------------------
       Aplica busca e filtros
    ------------------------------------------ */
    applyFiltering() {
        let items = [...this.rawData];

        // 1) Filtro de texto
        if (this.searchValue) {
            items = Utils.searchInItems(items, this.searchValue, [
                "nome",
                "categoria",
                "marca",
                "serie",
                "modelo",
                "escala"
            ]);
        }

        // 2) Filtros avançados
        items = Utils.applyFilters(items, this.filters);

        this.filteredData = items;
    },

    /* -----------------------------------------
       Atualiza busca em tempo real
    ------------------------------------------ */
    updateSearch(value) {
        this.searchValue = value;
        this.applyFiltering();

        const html = TableBuilder.buildVisitorTable(this.filteredData);
        document.getElementById("visitor-table").innerHTML = html;
    },

    /* -----------------------------------------
       Atualiza filtros selecionados
    ------------------------------------------ */
    updateFilters(key, value) {
        if (value === "Todos") {
            delete this.filters[key];
        } else {
            this.filters[key] = value;
        }

        this.applyFiltering();

        const html = TableBuilder.buildVisitorTable(this.filteredData);
        document.getElementById("visitor-table").innerHTML = html;
    }
};
