(function(){
  const getIsInViewport = (elem) => {
    if (document.hidden) {
      return false;  
    }

    const bounding = elem.getBoundingClientRect();
    
    return (
      bounding.top >= 0 &&
      bounding.left >= 0 &&
      bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  const debounce = (fn, time) => {
    let timeout;
  
    return function() {
      const functionCall = () => fn.apply(this, arguments);
      
      clearTimeout(timeout);
      timeout = setTimeout(functionCall, time);
    }
  }

  const addVisibilityAndHandlerToEachElement = (els, handleVisibilityChange) => els
    .map(el => {
      el.onVisibilityChange = () => {
        const isVisible = getIsInViewport(el);
        if (el.isVisible !== isVisible) {
          el.isVisible = isVisible;
          handleVisibilityChange(el, isVisible)
        }
      };

      return el;
    });

    const onVisibilityChange = (els) => () => els.forEach(el =>  el.onVisibilityChange());

    const iframes = [...document.getElementsByTagName('iframe')];
    
    const handleVisibilityChange = (el, isVisible) => {
      console.log('message posted:', { isVisible });
      el.contentWindow.postMessage({ isVisible }, '*');
    };
    
    const handler = debounce(
      onVisibilityChange(
        addVisibilityAndHandlerToEachElement(iframes, handleVisibilityChange)
      ),
      500
    );

    if (window.addEventListener) {
      window.addEventListener('DOMContentLoaded', handler, false); 
      window.addEventListener('load', handler, false); 
      window.addEventListener('scroll', handler, false); 
      window.addEventListener('resize', handler, false); 
      window.addEventListener('visibilitychange', handler, false); 
    } else if (window.attachEvent)  {
      window.attachEvent('onDOMContentLoaded', handler); // IE9+ :(
      window.attachEvent('onload', handler);
      window.attachEvent('onscroll', handler);
      window.attachEvent('onresize', handler);
    }

    setTimeout(() => {
      handler();
    }, 1000);
})()