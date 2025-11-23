/* =========================================
   ADMIN.JS
   Painel do Administrador (CRUD completo)
   ========================================= */

console.log("Admin.js carregado");

const Admin = {
    rawData: [],
    filteredData: [],
    searchValue: "",
    filters: {},
    editingId: null,

    /* -----------------------------------------
       Inicialização
    ------------------------------------------ */
    init() {
        console.log("Admin.init() pronto.");
    },

    /* -----------------------------------------
       Carrega dados quando o admin entra
    ------------------------------------------ */
    loadAdminData() {
        Sheets.load().then(() => {
            this.updateTable(Sheets.data);
            this.loadFilters(Sheets.data);
            this.loadForm();
            Charts.update(Sheets.data);
        });
    },

    /* -----------------------------------------
       Atualiza tabela do admin
    ------------------------------------------ */
    updateTable(data) {
        if (!data || data.length === 0) {
            document.getElementById("admin-table").innerHTML =
                "<p style='padding:1rem;'>Nenhum item encontrado.</p>";
            return;
        }

        this.rawData = data;

        // Aplica filtros + busca
        this.applyFiltering();

        const html = TableBuilder.buildAdminTable(this.filteredData);
        document.getElementById("admin-table").innerHTML = html;
    },

    /* -----------------------------------------
       Carrega filtros visuais
    ------------------------------------------ */
    loadFilters(data) {
        const html = FiltersBuilder.buildFilters(data, true); // true = admin
        document.getElementById("admin-filters").innerHTML = html;
        FiltersBuilder.enableListeners("admin");
    },

    /* -----------------------------------------
       Monta o formulário de adicionar/editar
    ------------------------------------------ */
    loadForm() {
        const html = `
            <h2>${this.editingId ? "Editar Item" : "Adicionar Item"}</h2>

            <div class="form-grid">
                ${this.formField("nome", "Nome")}
                ${this.formField("categoria", "Categoria")}
                ${this.formField("marca", "Marca")}
                ${this.formField("serie", "Série")}
                ${this.formField("modelo", "Modelo")}
                ${this.formField("escala", "Escala")}
                ${this.formField("estado", "Estado")}
                ${this.formField("quantidade", "Quantidade", "number")}
                ${this.formField("valor", "Valor (R$)")}
                ${this.textAreaField("observacoes", "Observações")}
            </div>

            <div class="form-actions">
                ${this.editingId ? `
                    <button class="btn btn-purple" onclick="Admin.saveEdit()">Salvar</button>
                    <button class="btn btn-gray" onclick="Admin.cancelEdit()">Cancelar</button>
                ` : `
                    <button class="btn btn-primary" onclick="Admin.addItem()">Adicionar</button>
                `}
            </div>
        `;

        document.getElementById("admin-add-form").innerHTML = html;
    },

    /* -----------------------------------------
       Campos do formulário
    ------------------------------------------ */
    formField(name, label, type = "text") {
        return `
            <div class="form-field">
                <label>${label}</label>
                <input id="form-${name}" type="${type}" />
            </div>
        `;
    },

    textAreaField(name, label) {
        return `
            <div class="form-field" style="grid-column: span 3;">
                <label>${label}</label>
                <textarea id="form-${name}" rows="2"></textarea>
            </div>
        `;
    },

    /* -----------------------------------------
       Lê valores do formulário
    ------------------------------------------ */
    readForm() {
        return {
            nome: document.getElementById("form-nome").value.trim(),
            categoria: document.getElementById("form-categoria").value.trim(),
            marca: document.getElementById("form-marca").value.trim(),
            serie: document.getElementById("form-serie").value.trim(),
            modelo: document.getElementById("form-modelo").value.trim(),
            escala: document.getElementById("form-escala").value.trim(),
            estado: document.getElementById("form-estado").value.trim(),
            quantidade: document.getElementById("form-quantidade").value.trim(),
            valor: document.getElementById("form-valor").value.trim(),
            observacoes: document.getElementById("form-observacoes").value.trim(),
        };
    },

    /* -----------------------------------------
       Limpa os campos do formulário
    ------------------------------------------ */
    clearForm() {
        document.querySelectorAll("#admin-add-form input, #admin-add-form textarea")
            .forEach((el) => (el.value = ""));
    },

    /* -----------------------------------------
       ADICIONAR ITEM
    ------------------------------------------ */
    async addItem() {
        const item = this.readForm();

        if (!item.nome || !item.categoria) {
            alert("Nome e Categoria são obrigatórios.");
            return;
        }

        await Sheets.add(item);
        this.clearForm();
        this.loadAdminData();
    },

    /* -----------------------------------------
       EDITAR ITEM
    ------------------------------------------ */
    startEdit(id) {
        this.editingId = id;

        const item = Sheets.data.find((i) => i.id == id);
        if (!item) return alert("Erro ao carregar item.");

        // Preenche form
        Object.keys(item).forEach((key) => {
            const input = document.getElementById(`form-${key}`);
            if (input) input.value = item[key];
        });

        this.loadForm();
        window.scrollTo({ top: 0, behavior: "smooth" });
    },

    async saveEdit() {
        const item = this.readForm();

        await Sheets.edit(this.editingId, item);

        this.editingId = null;
        this.clearForm();
        this.loadAdminData();
    },

    cancelEdit() {
        this.editingId = null;
        this.clearForm();
        this.loadForm();
    },

    /* -----------------------------------------
       EXCLUIR ITEM
    ------------------------------------------ */
    deleteItem(id) {
        Sheets.remove(id);
    },

    /* -----------------------------------------
       APLICA FILTROS + BUSCAS
    ------------------------------------------ */
    applyFiltering() {
        let items = [...this.rawData];

        // Busca
        if (this.searchValue) {
            items = Utils.searchInItems(items, this.searchValue, [
                "nome",
                "categoria",
                "marca",
                "serie",
                "modelo",
                "escala",
            ]);
        }

        // Filtros
        items = Utils.applyFilters(items, this.filters);

        this.filteredData = items;

        // Atualiza tabela
        const html = TableBuilder.buildAdminTable(items);
        document.getElementById("admin-table").innerHTML = html;

        // Atualiza gráficos
        Charts.update(items);
    },

    updateSearch(value) {
        this.searchValue = value;
        this.applyFiltering();
    },

    updateFilters(key, value) {
        if (value === "Todos") delete this.filters[key];
        else this.filters[key] = value;

        this.applyFiltering();
    },
};
