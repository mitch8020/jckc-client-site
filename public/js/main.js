// Mobile Dropdown Menu
const mobileHam = document.querySelector('#mobile-button')
const btnHam = document.querySelectorAll('.ham-icon')
const mobileMenu = document.querySelector('#mobile-menu')

mobileHam.addEventListener('click', () => {
  btnHam.forEach(e => e.classList.toggle('hidden'))
  mobileMenu.classList.toggle('hidden')
})

// Search Filter Function
function searchFilterGuardians() {
  // Declare variables
  let input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('guardianNameSearch');
  filter = input.value.toUpperCase();
  ul = document.getElementById("dropdownGuardianNames");
  li = ul.getElementsByTagName('li');

  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}