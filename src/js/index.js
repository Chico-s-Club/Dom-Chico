//parte dos clientes
// Dados mockados para simular a resposta do back-end
const mockData = [
    {
      userName: "João Silva",
      yearLoggedIn: 2021,
      comment: "Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. Donec odio urna, tempus molestie, porttitor ut, ia",
      productImage: "images/bacia-de-madeira.png",
      productName: "Madeira"
    },
    {
      userName: "Maria Oliveira",
      yearLoggedIn: 2022,
      comment: "Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. Donec odio urna, tempus molestie, porttitor ut, ia",
      productImage: "images/bacia-de-madeira.png",
      productName: "Madeira de Madeira"
    },
    {
      userName: "Carlos Souza",
      yearLoggedIn: 2023,
      comment: "A qualidade do produto superou minhas expectativas.",
      productImage: "images/bacia-de-madeira.png",
      productName: "Pé de Madeira"
    },
    {
      userName: "Maria Fernandes",
      yearLoggedIn: 2023,
      comment: "Produto excelente, superou minhas expectativas! A entrega foi rápida e o atendimento ao cliente foi impecável.",
      productImage: "images/bacia-de-madeira.png",
      productName: "Colar de Madeira"
    },
    {
      userName: "João Silva",
      yearLoggedIn: 2022,
      comment: "Qualidade incrível e o design é ainda mais bonito pessoalmente. Recomendo a todos!",
      productImage: "images/bacia-de-madeira.png",
      productName: "Relógio de Madeira"
    },
    {
      userName: "Ana Oliveira",
      yearLoggedIn: 2023,
      comment: "Gostei bastante, mas a embalagem chegou um pouco danificada. Fora isso, tudo perfeito!",
      productImage: "images/bacia-de-madeira.png",
      productName: "Bolsa de Madeira"
    },
    {
      userName: "Pedro Costa",
      yearLoggedIn: 2021,
      comment: "Atendimento excelente e o produto é exatamente como descrito. Com certeza voltarei a comprar!",
      productImage: "images/bacia-de-madeira.png",
      productName: "Tênis De Madeira"
    },
    {
      userName: "Juliana Pereira",
      yearLoggedIn: 2023,
      comment: "O produto é de ótima qualidade e chegou dentro do prazo. Muito satisfeita com a compra!",
      productImage: "images/bacia-de-madeira.png",
      productName: "Fone de Madeira"
    },
    {
      userName: "Rafael Santos",
      yearLoggedIn: 2022,
      comment: "A cor do produto é um pouco diferente da foto, mas no geral é muito bom. Recomendo!",
      productImage: "images/bacia-de-madeira.png",
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
  
  const swiper = new Swiper('.swiper', {
      loop: true,
      grabCursor:true,
      navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
      },
      pagination: {
          el: ".swiper-pagination",
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
  
  // Carregar dados mockados e adicionar ao Swiper
  const reviewsContainer = document.getElementById('reviews-container');
  mockData.forEach(review => {
    reviewsContainer.innerHTML += createReviewSlide(review);
  });
  
  // Atualizar o Swiper após adicionar os slides
  swiper.update();

  //fim dos clientes