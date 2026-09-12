// AX Entry Warp — MyPage Golden Transition(js/motion/pageTransition.js)과 같은 리듬이다.
// 원이 화면을 완전히 덮은 뒤(820ms/1600ms)에 다음 화면으로 전환해, 전환이 장면 전환처럼 느껴지게 한다.
const Intro = (() => {
  const NAVIGATION_DELAY_MS = 820;
  const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const enter = (done) => {
    const warp = document.getElementById('warp');
    if (reducedMotion()) { done(); return; }
    warp.classList.remove('warp--active');
    void warp.offsetWidth;
    requestAnimationFrame(() => warp.classList.add('warp--active'));
    window.setTimeout(() => {
      // 화면이 warp로 완전히 덮인 순간이다. scene 전환 자체의 크로스페이드(.scene 700ms
      // transition)가 warp 애니메이션과 동시에 돌면, 두 개의 전체화면 애니메이션이 겹치며
      // 합성 단계에서 아래 장면이 옅게 비쳐 보이는 렌더링 오류가 생긴다. 덮인 순간 동안만
      // scene 전환을 즉시 처리해 이 겹침을 없앤다 — 사용자에게는 어차피 warp에 가려 보이지 않는다.
      document.documentElement.classList.add('is-warping');
      done();
      requestAnimationFrame(() => requestAnimationFrame(() => {
        document.documentElement.classList.remove('is-warping');
      }));
    }, NAVIGATION_DELAY_MS);
  };
  return { enter, reducedMotion };
})();
