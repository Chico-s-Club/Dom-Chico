//parte dos clientes
// Dados mockados para simular a resposta do back-end
const mockData = [
    {
      userName: "João Silva",
      yearLoggedIn: 2021,
      comment: "Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. Donec odio urna, tempus molestie, porttitor ut, ia",
      productImage: "src/elements/catalogue/bacia-de-madeira-avaliacoes.png",
      productName: "Madeira"
    },
    {
      userName: "Maria Oliveira",
      yearLoggedIn: 2022,
      comment: "Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. Donec odio urna, tempus molestie, porttitor ut, ia",
      productImage: "src/elements/catalogue/bacia-de-madeira-avaliacoes.png",
      productName: "Madeira de Madeira"
    },
    {
      userName: "Carlos Souza",
      yearLoggedIn: 2023,
      comment: "A qualidade do produto superou minhas expectativas.",
      productImage: "src/elements/catalogue/bacia-de-madeira-avaliacoes.png",
      productName: "Pé de Madeira"
    },
    {
      userName: "Maria Fernandes",
      yearLoggedIn: 2023,
      comment: "Produto excelente, superou minhas expectativas! A entrega foi rápida e o atendimento ao cliente foi impecável.",
      productImage: "src/elements/catalogue/bacia-de-madeira-avaliacoes.png",
      productName: "Colar de Madeira"
    },
    {
      userName: "João Silva",
      yearLoggedIn: 2022,
      comment: "Qualidade incrível e o design é ainda mais bonito pessoalmente. Recomendo a todos!",
      productImage: "src/elements/catalogue/bacia-de-madeira-avaliacoes.png",
      productName: "Relógio de Madeira"
    },
    {
      userName: "Ana Oliveira",
      yearLoggedIn: 2023,
      comment: "Gostei bastante, mas a embalagem chegou um pouco danificada. Fora isso, tudo perfeito!",
      productImage: "src/elements/catalogue/bacia-de-madeira-avaliacoes.png",
      productName: "Bolsa de Madeira"
    },
    {
      userName: "Pedro Costa",
      yearLoggedIn: 2021,
      comment: "Atendimento excelente e o produto é exatamente como descrito. Com certeza voltarei a comprar!",
      productImage: "src/elements/catalogue/bacia-de-madeira-avaliacoes.png",
      productName: "Tênis De Madeira"
    },
    {
      userName: "Juliana Pereira",
      yearLoggedIn: 2023,
      comment: "O produto é de ótima qualidade e chegou dentro do prazo. Muito satisfeita com a compra!",
      productImage: "src/elements/catalogue/bacia-de-madeira-avaliacoes.png",
      productName: "Fone de Madeira"
    },
    {
      userName: "Rafael Santos",
      yearLoggedIn: 2022,
      comment: "A cor do produto é um pouco diferente da foto, mas no geral é muito bom. Recomendo!",
      productImage: "src/elements/catalogue/bacia-de-madeira-avaliacoes.png",
      productName: "Mochila de Madeira"
    }
  ];
  
  function createReviewSlide(review) {
    return `
      <div class="swiper-slide">
          <div class="testimonial-author">
              <div class="author-avatar">
                  <div class="user-icon"></div>
              </div>
              <div class="author-info">
                  <h3>${review.userName}</h3>
                  <p>Cliente desde ${review.yearLoggedIn}</p>
              </div>
          </div>
          
          <blockquote class="testimonial-quote">
              ${review.comment}
          </blockquote>
  
          <div class="testimonial-product">
              <img src="${review.productImage}" alt="Produto" class="product-image">
              <span class="product-name">${review.productName}</span>
          </div>
      </div> 
    `;
  }

// Função para carregar slides de avaliação
function createReviewSlide(review) {
  return `
    <div class="swiper-slide">
        <div class="testimonial-author">
            <div class="author-avatar">
                <div class="user-icon"></div>
            </div>
            <div class="author-info">
                <h3>${review.userName}</h3>
                <p>Cliente desde ${review.yearLoggedIn}</p>
            </div>
        </div>
        
        <blockquote class="testimonial-quote">
            ${review.comment}
        </blockquote>

        <div class="testimonial-product">
            <img src="${review.productImage}" alt="Produto" class="product-image">
            <span class="product-name">${review.productName}</span>
        </div>
    </div> 
  `;
}

const swiperTestimonials = new Swiper('.testimonials-swiper', {
  loop: true,
  grabCursor: true,
  navigation: {
    nextEl: ".testimonials-button-next",
    prevEl: ".testimonials-button-prev",
  },
  pagination: {
    el: ".testimonials-pagination",
    clickable: true
  },
  breakpoints: {
    640: {
      slidesPerView: 1,
      spaceBetween: 18
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 18
    },
    1188: {
      slidesPerView: 3,
      spaceBetween: 24
    }
  }
});

// Carregar dados mockados e adicionar ao Swiper de Avaliações
const reviewsContainer = document.getElementById('testimonials-container');
mockData.forEach(review => {
  reviewsContainer.innerHTML += createReviewSlide(review);
});

//atualizar o swiper
swiperTestimonials.update();

//fim dos clientes

// Inicializando o Swiper de Produtos
const swiperProducts = new Swiper('.products-swiper', {
  navigation: {
    nextEl: ".button-next",
    prevEl: ".button-prev",
  },
  autoplay: { //ajustar isso aqui se quiser que passa
    delay: 9000, 
    disableOnInteraction: false, 
  },
  slidesPerView: 1,
  effect: "slide",
  speed: 900,
  loop: true,
  grabCursor: true,
});