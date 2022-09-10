// Mobile Dropdown Menu
const mobileHam = document.querySelector('button')
const btnHam = document.querySelectorAll('svg')
const mobileMenu = document.querySelector('#mobile-menu')

mobileHam.addEventListener('click', () => {
  btnHam.forEach(e => e.classList.toggle('hidden'))
  mobileMenu.classList.toggle('hidden')
})