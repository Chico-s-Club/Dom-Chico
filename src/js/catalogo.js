// catalogo.js: Lógica para carregar e filtrar os itens do catálogo
document.addEventListener('DOMContentLoaded', async () => {
    const catalogue = await loadCatalogue(); // Carrega os itens do JSON
    localStorage.setItem('catalogue', JSON.stringify(catalogue)); // Armazena no Local Storage
    renderProducts(catalogue); // Renderiza os itens inicialmente
  
    // Adiciona eventos aos checkboxes para aplicar os filtros
    document.querySelectorAll('.filter input[type="checkbox"]').forEach((checkbox) => {
      checkbox.addEventListener('change', () => applyFilters());
    });
  });
  
  // Carrega os produtos do JSON
  async function loadCatalogue() {
    try {
      const response = await fetch('./catalogo.json'); // Caminho do JSON
      if (!response.ok) throw new Error('Erro ao carregar o catálogo');
      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  }
  
  // Renderiza os produtos na página
  function renderProducts(products) {
    const productList = document.querySelector('.product-list');
    productList.innerHTML = ''; // Limpa os itens anteriores
  
    if (products.length === 0) {
      productList.innerHTML = '<p>Nenhum item encontrado.</p>';
      return;
    }
  
    products.forEach((product) => {
      const productHTML = `
        <div class="product">
          <img src="${product.image}" alt="${product.name}" />
          <h3>${product.name}</h3>
          <p>Preço: R$ ${product.price}</p>
          <p>Estoque: ${product.stock}</p>
        </div>
      `;
      productList.innerHTML += productHTML;
    });
  }
  
  // Aplica os filtros selecionados
  function applyFilters() {
    const catalogue = JSON.parse(localStorage.getItem('catalogue')) || [];
  
    const selectedPrices = Array.from(
      document.querySelectorAll('input[name="preco"]:checked')
    ).map((input) => input.value);
  
    const filteredProducts = catalogue.filter((product) => {
      // Filtra por preço
      const matchesPrice = !selectedPrices.length || selectedPrices.some((range) => {
        const [min, max] = range.split('a').map(Number);
        return product.price >= min && product.price <= max;
      });
  
      return matchesPrice;
    });
  
    renderProducts(filteredProducts); // Atualiza os itens renderizados
  }
  