
const raf = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    window.oRequestAnimationFrame;


const getScrollTop = () => {
  if(typeof pageYOffset!= 'undefined'){
    //most browsers except IE before #9
    return pageYOffset;
  }
  else
  {
    const body = document.body; //IE 'quirks'
    let doc = document.documentElement; //IE with doctype
    doc = (doc.clientHeight) ? doc : body;
    return doc.scrollTop;
  }
};

let lastScrollTop = getScrollTop();
const callbacks = [];

const loop = () => {
  const scrollTop = getScrollTop();
  if (lastScrollTop === scrollTop) {
    raf(loop);
    return;
  } else {
    lastScrollTop = scrollTop;
    for(let x = 0; x < callbacks.length; x++) {
      callbacks[x](scrollTop);
    }
    raf(loop);
    return;
  }
};

if (raf) {
    loop();
}
let isStarted = false;

export default (callback) => {

  callbacks.push(callback);

  const scrollTop = getScrollTop();
  callback(scrollTop);

  if (!isStarted) {
    if (raf) {
      isStarted = true;
      loop();
    }
  }
};
