let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
let iconCart = document.querySelector('.icon-cart');
let iconCartSpan = document.querySelector('icon-cart span')
const navbar = document.querySelector('#navbar');
const toggleItem = document.querySelector('#toggle-nav');
const iconArrow = document.querySelector('#icon-arrow');
const currentStyle = navbar.style.left;

iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

function toggleNavbar() {
    const currentStyle = navbar.style.left;

    // Faz a navbar desaparecer
    if (currentStyle === '0px' || currentStyle === '0') {
        navbar.style.left = '-92vw';
        iconArrow.style.transform = 'rotate(0deg)';
        iconArrow.style.fill = 'white';
        toggleItem.style.backgroundColor = 'var(--Laranja)';
    
      // Faz a navbar aparecer  
    } else {
        navbar.style.left = '0';
        iconArrow.style.transform = 'rotate(180deg)';
        iconArrow.style.fill = 'var(--Laranja)';
        toggleItem.style.backgroundColor = 'white';
    }
}

function adjustNavBarPosition() {
    const navbar = document.querySelector('#navbar');
    const toggleItem = document.querySelector('#toggle-nav');
    const iconArrow = document.querySelector('#icon-arrow');
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