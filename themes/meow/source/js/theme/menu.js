/* 
 * hexo theme meow
 * menu (header) scripts
 */

const initMenu = () => {
  const headerElement = document.querySelector('header');
  requestAnimationFrame(() => {
    headerElement.style.background = document.body.getAttribute('data-mode') == 'light' ? '#ffffff' : '#232733';
  });

  const menuAside = document.getElementById('menu-aside');
  document.getElementById('menu-btn').addEventListener('click', function () {
    menuAside.setAttribute("open", "");
  });

  menuAside.addEventListener('click', event => {
    if (event.target === menuAside) {
      menuAside.removeAttribute('open');
    }
  });
};

export default initMenu;