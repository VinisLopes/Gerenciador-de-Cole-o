/* =========================================
   CHARTS.JS
   Dashboard de gráficos (Chart.js)
   ========================================= */

console.log("Charts.js carregado");

const Charts = {
  charts: {
    categorias: null,
    marcas: null,
    valores: null,
  },

  /* -----------------------------------------
     Atualiza todos os gráficos com base na
     lista de itens (filtrados ou totais)
  ------------------------------------------ */
  update(items) {
    if (!items || items.length === 0) {
      this.destroyAll();
      return;
    }

    // 1) Agrupamento por categoria
    const catGroup = Utils.groupBy(items, "categoria");
    const catLabels = Object.keys(catGroup);
    const catQuantidades = catLabels.map((cat) =>
      Utils.totalQuantidade(catGroup[cat])
    );

    // 2) Agrupamento por marca
    const brandGroup = Utils.groupBy(items, "marca");
    const brandLabels = Object.keys(brandGroup);
    const brandQuantidades = brandLabels.map((m) =>
      Utils.totalQuantidade(brandGroup[m])
    );

    // 3) Valor total por categoria
    const catValores = catLabels.map((cat) =>
      Utils.totalValor(catGroup[cat])
    );

    // Atualiza cada gráfico
    this.updateCategoriasChart(catLabels, catQuantidades);
    this.updateMarcasChart(brandLabels, brandQuantidades);
    this.updateValoresChart(catLabels, catValores);
  },

  /* -----------------------------------------
     Destroi todos os gráficos (se existirem)
  ------------------------------------------ */
  destroyAll() {
    Object.keys(this.charts).forEach((key) => {
      if (this.charts[key]) {
        this.charts[key].destroy();
        this.charts[key] = null;
      }
    });
  },

  /* -----------------------------------------
     Gráfico: Itens por Categoria
  ------------------------------------------ */
  updateCategoriasChart(labels, data) {
    const ctx = document.getElementById("chartCategorias");
    if (!ctx) return;

    if (this.charts.categorias) {
      this.charts.categorias.destroy();
    }

    this.charts.categorias = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Quantidade de itens",
            data,
            backgroundColor: "rgba(37, 99, 235, 0.6)",
            borderColor: "rgba(37, 99, 235, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0,
            },
          },
        },
      },
    });
  },

  /* -----------------------------------------
     Gráfico: Itens por Marca
  ------------------------------------------ */
  updateMarcasChart(labels, data) {
    const ctx = document.getElementById("chartMarcas");
    if (!ctx) return;

    if (this.charts.marcas) {
      this.charts.marcas.destroy();
    }

    this.charts.marcas = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Itens por marca",
            data,
            backgroundColor: "rgba(124, 58, 237, 0.6)",
            borderColor: "rgba(124, 58, 237, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        indexAxis: "y",
        responsive: true,
        plugins: {
          legend: {
            display: true,
          },
        },
        scales: {
          x: {
            beginAtZero: true,
            ticks: {
              precision: 0,
            },
          },
        },
      },
    });
  },

  /* -----------------------------------------
     Gráfico: Valor total por Categoria (R$)
  ------------------------------------------ */
  updateValoresChart(labels, data) {
    const ctx = document.getElementById("chartValores");
    if (!ctx) return;

    if (this.charts.valores) {
      this.charts.valores.destroy();
    }

    this.charts.valores = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Valor total por categoria (R$)",
            data,
            fill: true,
            backgroundColor: "rgba(56, 189, 248, 0.25)",
            borderColor: "rgba(56, 189, 248, 1)",
            borderWidth: 2,
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                const value = context.raw || 0;
                return Utils.formatCurrency(value);
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return Utils.formatCurrency(value);
              },
            },
          },
        },
      },
    });
  },
};
