const mobileHam = document.querySelector('button')
const btnHam = document.querySelectorAll('svg')
const mobileMenu = document.querySelector('#mobile-menu')

mobileHam.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden')
})