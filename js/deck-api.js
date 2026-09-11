/* =========================================================================
   deck-api.js — Sprint 3: 중립 Section/Slide 접근 경계
   -------------------------------------------------------------------------
   slides.js·fan.js가 더 이상 CURRICULUM.boxes(과정형 구조)를 알 필요가 없도록,
   fixture가 정의한 전역 DECK 객체 위에 최소 accessor 5개 + validation 1개만 둔다.
   범용 JSON schema framework나 대형 validation 라이브러리를 추가하지 않았다(§6 원칙).
   ========================================================================= */
(function () {
  "use strict";

  function getSections() { return (window.DECK && window.DECK.sections) || []; }
  function getSection(id) { return getSections().find(s => s.id === id) || null; }
  function getSectionByIndex(i) { return getSections()[i] || null; }
  function sectionIndexOf(id) { return getSections().findIndex(s => s.id === id); }
  function getSlides(sectionId) { const s = getSection(sectionId); return (s && s.slides) || []; }
  function nextSection(id) {
    const all = getSections();
    const i = sectionIndexOf(id);
    return (i >= 0 && i < all.length - 1) ? all[i + 1] : null;
  }
  function getMeta() { return (window.DECK && window.DECK.meta) || {}; }
  function getPresentation() { return (window.DECK && window.DECK.presentation) || {}; }

  /* ---------- 최소 콘텐츠 검증 (§13-14) ----------
     required 필드가 비어도 절대 크래시·undefined 노출을 만들지 않는다(렌더러 자체가 이미
     esc()/삼항 가드로 안전하다 — Sprint 1 Codyssey Lecture 감사에서 발견한 사례는 Room의
     카드 렌더 쪽 결합이었지 slide 렌더러 쪽이 아니었다, docs/07 참고). 이 함수는 그 안전망
     위에 "개발자가 놓친 필드를 콘솔에서 바로 알 수 있게" 하는 경고 레이어일 뿐이다. */
  const SLIDE_REQUIRED = {
    cover: ["title"],
    big: ["word"],
    bullets: ["title", "items"],
    quote: ["text"],
    split: ["title", "left", "right"],
    image: ["src"],
    closing: ["title"]
  };
  function validateDeck(deck) {
    const warnings = [];
    if (!deck || !deck.meta || !deck.meta.title) warnings.push("Deck.meta.title 누락");
    (deck && deck.sections || []).forEach((s, si) => {
      const tag = s.id || `sections[${si}]`;
      if (!s.id) warnings.push(`${tag}: id 누락`);
      if (!s.title) warnings.push(`${tag}: title 누락`);
      if (!Array.isArray(s.slides) || !s.slides.length) warnings.push(`${tag}: slides 비어있음`);
      (s.slides || []).forEach((sl, i) => {
        if (!sl.type) { warnings.push(`${tag} slide[${i}]: type 누락`); return; }
        const req = SLIDE_REQUIRED[sl.type];
        if (!req) { warnings.push(`${tag} slide[${i}]: 알 수 없는 type "${sl.type}"`); return; }
        req.forEach(field => {
          const v = sl[field];
          const empty = v == null || (Array.isArray(v) && v.length === 0);
          if (empty) warnings.push(`${tag} slide[${i}] (${sl.type}): 필수 필드 "${field}" 누락`);
        });
        if (sl.link && !sl.link.url) warnings.push(`${tag} slide[${i}]: link 필드에 url 없음(무시됨)`);
      });
    });
    if (warnings.length && window.console) {
      warnings.forEach(w => console.warn("[DeckValidation] " + w));
    }
    return warnings;
  }

  window.Deck = {
    getSections, getSection, getSectionByIndex, sectionIndexOf,
    getSlides, nextSection, getMeta, getPresentation, validateDeck
  };
})();
