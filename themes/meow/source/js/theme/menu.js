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

  // English grouped navigation uses disclosures; the Chinese menu stays unchanged.
  if (document.documentElement.lang !== 'en') return;
  const groups = [...document.querySelectorAll('#nav-menu .menu-disclosure')];
  const setOpen = (group, open) => {
    group.querySelector('button').setAttribute('aria-expanded', String(open));
    group.querySelector('ul').hidden = !open;
  };
  const closeOthers = current => groups.forEach(group => {
    if (group !== current) setOpen(group, false);
  });
  groups.forEach(group => {
    const button = group.querySelector('button');
    const links = [...group.querySelectorAll('ul a')];
    button.addEventListener('click', () => {
      const open = button.getAttribute('aria-expanded') !== 'true';
      closeOthers(group);
      setOpen(group, open);
    });
    group.addEventListener('focusout', event => {
      if (!group.contains(event.relatedTarget)) setOpen(group, false);
    });
    group.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        setOpen(group, false);
        button.focus();
      } else if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
        closeOthers(group);
        setOpen(group, true);
        const index = links.indexOf(document.activeElement);
        const target = event.key === 'Home' ? 0 : event.key === 'End' ? links.length - 1
          : event.key === 'ArrowDown' ? (index + 1) % links.length
          : index < 0 ? links.length - 1 : (index - 1 + links.length) % links.length;
        links[target].focus();
      } else return;
      event.preventDefault();
    });
  });
  document.addEventListener('pointerdown', event => {
    if (!event.target.closest('#nav-menu .menu-disclosure')) closeOthers();
  });
  window.addEventListener('resize', () => closeOthers());
};

export default initMenu;
