/* =========================================
   TABLE.JS
   Monta as tabelas de Visitante e Admin
   ========================================= */

console.log("Table.js carregado");

const TableBuilder = {
  /* -----------------------------------------
     TABELA DO VISITANTE (somente leitura)
  ------------------------------------------ */
  buildVisitorTable(items) {
    if (!items || items.length === 0) {
      return "<p style='padding:1rem;'>Nenhum item encontrado.</p>";
    }

    let html = `
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Categoria</th>
            <th>Marca</th>
            <th>Série</th>
            <th>Modelo</th>
            <th>Escala</th>
            <th>Estado</th>
            <th>Qtd</th>
            <th>Localização</th>
            <th>Origem</th>
          </tr>
        </thead>
        <tbody>
    `;

    items.forEach((item) => {
      html += `
        <tr>
          <td data-label="Nome">${item.nome || "-"}</td>
          <td data-label="Categoria">${item.categoria || "-"}</td>
          <td data-label="Marca">${item.marca || "-"}</td>
          <td data-label="Série">${item.serie || "-"}</td>
          <td data-label="Modelo">${item.modelo || "-"}</td>
          <td data-label="Escala">${item.escala || "-"}</td>
          <td data-label="Estado">${item.estado || "-"}</td>
          <td data-label="Qtd">${item.quantidade || "-"}</td>
          <td data-label="Localização">${item.localizacao || "-"}</td>
          <td data-label="Origem">${item.origem || "-"}</td>
        </tr>
      `;
    });

    html += `
        </tbody>
      </table>
    `;

    return html;
  },

  /* -----------------------------------------
     TABELA DO ADMIN (com ações CRUD)
  ------------------------------------------ */
  buildAdminTable(items) {
    if (!items || items.length === 0) {
      return "<p style='padding:1rem;'>Nenhum item encontrado.</p>";
    }

    let html = `
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Categoria</th>
            <th>Marca</th>
            <th>Série</th>
            <th>Modelo</th>
            <th>Escala</th>
            <th>Estado</th>
            <th>Qtd</th>
            <th>Valor</th>
            <th>Localização</th>
            <th>Origem</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
    `;

    items.forEach((item) => {
      const valorFormatado = Utils.formatCurrency(item.valor || 0);

      html += `
        <tr>
          <td data-label="Nome">${item.nome || "-"}</td>
          <td data-label="Categoria">${item.categoria || "-"}</td>
          <td data-label="Marca">${item.marca || "-"}</td>
          <td data-label="Série">${item.serie || "-"}</td>
          <td data-label="Modelo">${item.modelo || "-"}</td>
          <td data-label="Escala">${item.escala || "-"}</td>
          <td data-label="Estado">${item.estado || "-"}</td>
          <td data-label="Qtd">${item.quantidade || "-"}</td>
          <td data-label="Valor">${valorFormatado}</td>
          <td data-label="Localização">${item.localizacao || "-"}</td>
          <td data-label="Origem">${item.origem || "-"}</td>
          <td data-label="Ações">
            <button 
              class="table-action-btn action-edit" 
              onclick="Admin.startEdit('${item.id}')"
            >
              ✏️ Editar
            </button>
            <button 
              class="table-action-btn action-delete" 
              onclick="Admin.deleteItem('${item.id}')"
            >
              🗑 Excluir
            </button>
          </td>
        </tr>
      `;
    });

    html += `
        </tbody>
      </table>
    `;

    return html;
  },
};
