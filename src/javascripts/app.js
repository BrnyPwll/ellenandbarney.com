import './modules'
import onScroll from './lib/onScroll';

console.log(`app.js has loaded!`)

const menubutton = document.querySelector('#menu-button');
const menu = document.querySelector('#menu');
const sections = document.querySelectorAll('section[data-navigable]');
const pagenav = document.querySelector('#page-nav');
const pageheader = document.querySelector('#page-header');
const cover = document.querySelector('#cover');

let menuitems = menu.querySelectorAll('li');
let menulinks = menu.querySelectorAll('a');

const isMenuOpen = () => {
  return menubutton.className.indexOf('is-active') > -1;
}

const toggleCssClass = (className, element) => {
  let currentClasses = element.className;
  if (currentClasses.indexOf(className) > -1) {
    currentClasses = currentClasses.replace(className, '');
  } else {
    currentClasses += ' ' + className;
  }
  element.className = currentClasses.trim();
}


const toggleMenu = () => {
  toggleCssClass('is-active', menubutton);
  toggleCssClass('is-open', pagenav);
}

const scanForMenuItems = () => {
  // Set up the menu items
  for (let x = 0; x < sections.length; x++) {
    let currentSection = sections[x];
    const headerText = currentSection.getAttribute('data-label');//.value;//innerHTML;//"hh";
    const sectionId = currentSection.getAttribute('id');

    if (headerText) {
      const link = document.createElement('a')
      link.innerHTML = headerText;
      link.setAttribute('href', '#' + sectionId);

      const item = document.createElement('li');
      item.className = 'menu-item';

      item.appendChild(link);

      menu.appendChild(item);

    }

  }

  menuitems = menu.querySelectorAll('li');
  menulinks = menu.querySelectorAll('a');

}



menubutton.addEventListener('click', toggleMenu);
scanForMenuItems();

let isOnCover = true;

const setHeaderBackgrounds = (percent) => {
  let colour = Math.round(percent * 255);
  let inverseColour = 255 - colour;
  let opacity = percent * 0.75;
  let menuOpacity = (percent * 0.25) + 0.5;
  let backgroundColour = `rgba(255,255,255, ${opacity})`;
  let menuBackgroundColour = `rgba(${colour},${colour},${colour}, ${menuOpacity})`;
  let fontColour = `rgb(${inverseColour},${inverseColour},${inverseColour})`;

  let blur = 'blur(' + (percent * 5) + 'px)';

  pagenav.style.backgroundColor = backgroundColour;
  pagenav.style.color = fontColour;
  menubutton.style.color = fontColour;
  menu.style.backgroundColor = menuBackgroundColour;
  pageheader.style.backdropFilter = blur;
  pageheader.style.webkitBackdropFilter = blur;

  cover.style.backdropFilter = blur;
  cover.style.webkitBackdropFilter = blur;


  for (let x = 0; x < menulinks.length; x++) {
    menulinks[x].style.color = fontColour;
  }

};

const checkScrollPosForHeader = (scrollPos) => {
  if (scrollPos < window.innerHeight) {
    isOnCover = true;
    let percent = scrollPos / window.innerHeight;
    setHeaderBackgrounds(percent);

  } else if(isOnCover) {
    setHeaderBackgrounds(1);
    isOnCover = false;
  }
}

onScroll(checkScrollPosForHeader);

//cover.style.height = window.outerHeight + 'px';
//alert(window.innerHeight);
//alert('hello');
