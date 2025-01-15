let productListHTML = document.querySelector(".catalogue-products");
let cartListHTML = document.querySelector('.listCart');
let cartIconCounter = document.querySelector('.icon-cart span');
let productList = [];
let cartList = [];

const addDatatoCatalogueHTML = () => {
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
                          <p class="product-price card-text">R$   ${product.price.toFixed(2).replace('.', ',')}</p>
                          <button class="add-cart product-cart-btn btn">Carrinho +</button>
                      </div>
                  </div>
            </div>
            `;
            productListHTML.appendChild(newProduct)
    });
  }
};

productListHTML.addEventListener('click', (event) => {
  let positionClick = event.target;
  if (positionClick.classList.contains('add-cart')) {
    let parentProduct = positionClick.closest('.item'); // Encontra o elemento ancestral com a classe 'item'
    let product_id = parentProduct.dataset.id;
    addToCart(product_id);
  }
});

const addToCart = (product_id) => {
  let positionProductInCart = cartList.findIndex((value) => value.product_id == product_id)
  if(cartList.length <= 0){
    cartList = [{
      product_id: product_id,
      quantity: 1
    }]
  }else if(positionProductInCart < 0){
      cartList.push({
          product_id: product_id,
          quantity: 1
      });
  }else{
    cartList[positionProductInCart].quantity += 1
  }
  addCartToHTML();
  addCartToMemory();
};

const addCartToMemory = () => {
  localStorage.setItem('cart', JSON.stringify(cartList));
}

const addCartToHTML = () => {
  cartListHTML.innerHTML = '';
  let totalQuantity = 0
  if(cartList.length > 0){
      cartList.forEach(cart => {
        totalQuantity = totalQuantity + cart.quantity;
        let newCart = document.createElement('div');
        newCart.classList.add('item');
        newCart.dataset.id = cart.product_id;
        let positionProduct = productList.findIndex((value) => value.id == cart.product_id);
        let info = productList[positionProduct];
        newCart.innerHTML = `
          <div class="image">
                    <img src="${info.image}">
                </div>
                <div class="name">
                ${info.name}
                </div>
                <div class="totalPrice">R$ ${info.price * cart.quantity}</div>
                <div class="quantity">
                    <span class="minus">-</span>
                    <span class="totalQuantity">${cart.quantity}</span>
                    <span class="plus">+</span>
                </div>
        `;
      cartListHTML.appendChild(newCart);
      })
  }
  cartIconCounter.innerHTML = totalQuantity;
}

cartListHTML.addEventListener('click', (event) => {
  let positionClick = event.target;
  if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
    let product_id = positionClick.parentElement.parentElement.dataset.id;
    let type = 'minus';
    if(positionClick.classList.contains('plus')){
      type = 'plus';
    }
    changeQuantity(product_id, type)
  }
})
const changeQuantity = (product_id, type) => {
  let positionThisProductInCart = cartList.findIndex((value) => value.product_id == product_id);
  if(positionThisProductInCart >= 0){
    switch (type) {
      case 'plus':
          cartList[positionThisProductInCart].quantity += 1;
          break;

      default:
          let valueChange = cartList[positionThisProductInCart].quantity - 1;
          if(valueChange > 0){
            cartList[positionThisProductInCart].quantity = valueChange;
          }else{
            cartList.splice(positionThisProductInCart, 1);
          }
          break;
    }
  }
  addCartToMemory();
  addCartToHTML();
}
const initProducts = () => {
  // No caso, vai pegar os dados do arquivo .json, mas depois vai pegar do backend
  fetch("../src/json/produtos.json")
    .then((Response) => Response.json())
    .then((data) => {
      productList = data;
      addDatatoCatalogueHTML();

      // Pega os dados do carrinho do local storage
      if(localStorage.getItem('cart')){
        cartList = JSON.parse(localStorage.getItem('cart'));
        addCartToHTML();
      }
    });
};

initProducts();
