const Intro = (() => {
  const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const enter = (done) => {
    const warp = document.getElementById('warp');
    if (reducedMotion()) { done(); return; }
    warp.classList.remove('warp--active');
    void warp.offsetWidth;
    warp.classList.add('warp--active');
    window.setTimeout(done, 520);
  };
  return { enter, reducedMotion };
})();
