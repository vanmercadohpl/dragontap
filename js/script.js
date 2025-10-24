const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const hamburger = document.querySelector('.hamburgerMenuImg');
const closeBtn = document.getElementById('closeSidebar');

hamburger.addEventListener('click', () => {
  sidebar.classList.add('active');
  overlay.classList.add('active');
  hamburger.classList.add('hide');
});

closeBtn.addEventListener('click', () => {
  sidebar.classList.remove('active');
  overlay.classList.remove('active');
  hamburger.classList.remove('hide');
});

overlay.addEventListener('click', () => {
  sidebar.classList.remove('active');
  overlay.classList.remove('active');
  hamburger.classList.remove('hide');
});
