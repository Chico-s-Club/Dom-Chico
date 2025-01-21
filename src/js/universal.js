let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
let iconCart = document.querySelector('.icon-cart');
const navbar = document.querySelector('#navbar');
const toggleItem = document.querySelector('#toggle-nav');
const iconArrow = document.querySelector('#icon-arrow');
let productListHTML = document.querySelector(".catalogue-products");
let cartListHTML = document.querySelector('.listCart');
let cartIconCounter = document.querySelector('.icon-cart span');
let cartFinalPrice = document.querySelector('.finalPrice span');
let productList = [];
let cartList = [];

// Função para mostrar ou esconder o carrinho
iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

// Função para alternar a visibilidade da navegação
function toggleNavbar() {
    const currentStyle = navbar.style.left;

    if (currentStyle === '0px' || currentStyle === '0') {
        navbar.style.left = '-92vw';
        iconArrow.style.transform = 'rotate(0deg)';
        iconArrow.style.fill = 'white';
        toggleItem.style.backgroundColor = 'var(--Laranja)';
    } else {
        navbar.style.left = '0';
        iconArrow.style.transform = 'rotate(180deg)';
        iconArrow.style.fill = 'var(--Laranja)';
        toggleItem.style.backgroundColor = 'white';
    }
}

// Ajusta a posição da navbar dependendo do tamanho da tela
function adjustNavBarPosition() {
    const mediaQuery = window.matchMedia('(min-width: 901px)');

    if (mediaQuery.matches) {
        navbar.style.left = '0px';
        iconArrow.style.fill = 'var(--Laranja)';
        toggleItem.style.backgroundColor = 'white';
    } else {
        navbar.style.left = '-92vw';
        iconArrow.style.fill = 'white';
        toggleItem.style.backgroundColor = 'var(--Laranja)';
    }
}

window.addEventListener('resize', adjustNavBarPosition);
adjustNavBarPosition();

const addProductListToLocalStorage = () => {
  localStorage.setItem('productList', JSON.stringify(productList));
}

// Atualiza o catálogo de produtos no HTML
const addDatatoCatalogueHTML = () => {
  if (!productListHTML) return; // Verifica se o elemento existe

  productListHTML.innerHTML = '';
  if (productList.length > 0) {
    productList.forEach((product) => {
      let newProduct = document.createElement("div");
      newProduct.classList.add("item");
      newProduct.dataset.id = product.id;
      newProduct.innerHTML = `
        <div class="product-card col mb-4">
          <div class="product">
            <img src="${product.image}" class="card-img card-img-top" alt="...">
            <div class="product-info card-body">
              <h5 class="product-name pt-2">${product.name}</h5>
              <p class="product-price card-text">R$ ${product.price.toFixed(2).replace('.', ',')}</p>
              <button class="add-cart product-cart-btn btn">Carrinho +</button>
            </div>
          </div>
        </div>
      `;
      productListHTML.appendChild(newProduct);
      addProductListToLocalStorage();
    });
  }
};

// Adiciona evento de clique no catálogo de produtos (com verificação)
if (productListHTML) {
  productListHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('add-cart')) {
      let parentProduct = positionClick.closest('.item');
      let product_id = parentProduct.dataset.id;
      addToCart(product_id);
    }
  });
}


// Adiciona um produto ao carrinho
const addToCart = (product_id) => {
  let positionProductInCart = cartList.findIndex((value) => value.product_id == product_id);
  
  // Encontre o produto completo na lista de produtos
  let positionProductInCatalogue = productList.findIndex((value) => value.id == product_id);
  let productInfo = productList[positionProductInCatalogue];

  if (cartList.length <= 0) {
    cartList = [{
      product_id: product_id,
      quantity: 1,
      name: productInfo.name,
      price: productInfo.price,
      image: productInfo.image
    }];
  } else if (positionProductInCart < 0) {
    cartList.push({
      product_id: product_id,
      quantity: 1,
      name: productInfo.name,
      price: productInfo.price,
      image: productInfo.image
    });
  } else {
    cartList[positionProductInCart].quantity += 1;
  }

  addCartToHTML();
  saveCartToLocalStorage();
};

// Função para salvar o carrinho no localStorage
const saveCartToLocalStorage = () => {
  localStorage.setItem('cartList', JSON.stringify(cartList));
};

// Função para carregar o carrinho do localStorage
const loadCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem('cartList');
  if (savedCart) {
    cartList = JSON.parse(savedCart);
  }
};

// Chamar a função para carregar o carrinho ao carregar a página
loadCartFromLocalStorage();

const addCartToHTML = () => {
  cartListHTML.innerHTML = '';
  let totalQuantity = 0;
  let totalPrice = 0;

  if (cartList.length > 0) {
    cartList.forEach(cart => {
      totalQuantity += cart.quantity;
      let newCart = document.createElement('div');
      newCart.classList.add('item');
      newCart.dataset.id = cart.product_id;
      let positionProduct = productList.findIndex((value) => value.id == cart.product_id);
      let info = productList[positionProduct];
      totalPrice += info.price * cart.quantity;

      newCart.innerHTML = `
        <div class="image">
          <img src="${info.image}">
        </div>
        <div class="name">
          ${info.name}
        </div>
        <div class="totalPrice">R$ ${(info.price * cart.quantity).toFixed(2).replace('.', ',')}</div>
        <div class="quantity">
          <span class="minus">-</span>
          <span class="totalQuantity">${cart.quantity}</span>
          <span class="plus">+</span>
        </div>
      `;

      cartListHTML.appendChild(newCart);
    });

    saveCartToLocalStorage();
  }

  cartIconCounter.innerHTML = totalQuantity;
  cartFinalPrice.innerHTML = `R$ ${totalPrice.toFixed(2).replace('.', ',')}`;
};

// Evento para alterar a quantidade de produtos no carrinho
cartListHTML.addEventListener('click', (event) => {
  let positionClick = event.target;
  if (positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
    let product_id = positionClick.parentElement.parentElement.dataset.id;
    let type = 'minus';
    if (positionClick.classList.contains('plus')) {
      type = 'plus';
    }
    changeQuantity(product_id, type);
  }
});

// Altera a quantidade de produtos no carrinho
const changeQuantity = (product_id, type) => {
  let positionThisProductInCart = cartList.findIndex((value) => value.product_id == product_id);
  if (positionThisProductInCart >= 0) {
    switch (type) {
      case 'plus':
        cartList[positionThisProductInCart].quantity += 1;
        break;

      default:
        let valueChange = cartList[positionThisProductInCart].quantity - 1;
        if (valueChange > 0) {
          cartList[positionThisProductInCart].quantity = valueChange;
        } else {
          cartList.splice(positionThisProductInCart, 1);
        }
        break;
    }
  }
  saveCartToLocalStorage();
  addCartToHTML();
};

// Inicializa os produtos e o carrinho
const initProducts = () => {
  fetch("../src/json/produtos.json")
    .then((Response) => Response.json())
    .then((data) => {
      productList = data;
      addDatatoCatalogueHTML();

      // Carrega o carrinho do localStorage
      if (localStorage.getItem('cartList')) {
        cartList = JSON.parse(localStorage.getItem('cartList'));
        addCartToHTML();
      }
    });
};

// Inicializa a aplicação
initProducts();
