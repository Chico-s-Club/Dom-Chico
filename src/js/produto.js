//trocar as imagens

function changeMainImage(thumbnail) {
  // Atualiza a imagem principal
  var mainImage = document.getElementById('main-image');
  mainImage.src = thumbnail.src;
  mainImage.alt = thumbnail.alt;

  // Remove a classe 'active' de todas as miniaturas
  var thumbnails = document.querySelectorAll('.thumbnail-images img');
  thumbnails.forEach(function(img) {
      img.classList.remove('active');
  });

  // Adiciona a classe 'active' à miniatura clicada
  thumbnail.classList.add('active');
}

//cacular o frete

document.querySelector('.btn-calculate').addEventListener('click', function () {
  const cepInput = document.querySelector('#cep').value;
  if (cepInput) {
    const shippingOptions = document.querySelector('.shipping-options');
    shippingOptions.classList.remove('hidden');
  } else {
    alert('Por favor, insira um CEP válido!');
  }
});

// Fechar as opções de frete ao clicar fora (opcional)
document.addEventListener('click', function (e) {
  const shippingOptions = document.querySelector('.shipping-options');
  const calculator = document.querySelector('.shipping-calculator');

  if (!calculator.contains(e.target)) {
    shippingOptions.classList.add('hidden');
  }
});

