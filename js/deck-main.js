/* =========================================================================
   deck-main.js — AI Attitude Web Deck 60 오케스트레이터
   -------------------------------------------------------------------------
   AX Web Deck Standard v0.1(AX_Lecture_Standard/docs/14) 기준. Room/Box 없음.
   presentation.sectionNavigator는 항상 "none"으로 소비한다 — 이 파일이
   Section 개수를 세어 Fan을 켜고 끄는 조건문은 어디에도 없다(Standard §9).
   ========================================================================= */
(function () {
  "use strict";

  Deck.validateDeck(window.DECK); // 콘솔 경고만 — 렌더링을 막지 않는다

  const Router = {
    go(path) { location.hash = "#/" + path; },
    replace(path) { history.replaceState(null, "", "#/" + path); },
    back() { history.back(); }
  };

  /* Presentation Progress(세션 한정, 항상 CORE — docs/14 §5) */
  const seen = new Set();
  window.Progress = {
    mark(id) { seen.add(id); },
    has(id) { return seen.has(id); }
  };

  /* Resume — DECK.presentation.resume을 실제로 읽는다(docs/09 계약 준수).
     이 Deck은 resume:false이므로 App.Resume이 만들어지지 않고,
     slides.js는 `if (activeSection && App.Resume)`로만 접근해 크래시 없이 동작한다. */
  let AppResume;
  if (Deck.getPresentation().resume === true) {
    const KEY = "webdeck_resume_" + (Deck.getMeta().id || "default");
    const readAll = () => { try { return JSON.parse(localStorage.getItem(KEY) || "{}"); } catch (e) { return {}; } };
    const writeAll = (o) => { try { localStorage.setItem(KEY, JSON.stringify(o)); } catch (e) {} };
    AppResume = {
      get(sectionId) { return readAll()[sectionId]; },
      set(sectionId, slideIndex) { const all = readAll(); all[sectionId] = slideIndex; writeAll(all); },
      clear(sectionId) { const all = readAll(); delete all[sectionId]; writeAll(all); }
    };
  }
  window.App = { Router, Resume: AppResume, goScene };

  const scenes = {
    start: document.getElementById("scene-start"),
    slides: document.getElementById("scene-slides")
  };
  function goScene(name) {
    Object.values(scenes).forEach((s) => s && s.classList.remove("is-active"));
    if (scenes[name]) scenes[name].classList.add("is-active");
    document.documentElement.dataset.route = name;
  }
  window.App.goScene = goScene;

  function handleHash() {
    const parts = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
    if (!parts.length || parts[0] === "start") { goScene("start"); return; }
    if (parts[0] === "deck") {
      const sec = Deck.getSectionByIndex(Number(parts[1] || 0));
      if (sec) window.openSection(sec, sec.accent != null ? sec.accent : 0, Number(parts[2] || 0));
      return;
    }
    goScene("start");
  }
  window.addEventListener("hashchange", handleHash);

  function applyMeta() {
    const meta = Deck.getMeta();
    document.title = meta.title || "AI를 대하는 태도";
    const kicker = document.querySelector(".start-kicker");
    if (kicker) kicker.textContent = meta.kicker || "";
    const title = document.querySelector(".start-title");
    if (title) title.innerHTML = meta.titleHtml || meta.title || "";
    const sub = document.querySelector(".start-sub");
    if (sub) sub.textContent = meta.subtitle || "";
    const note = document.querySelector(".start-note");
    if (note) note.textContent = meta.note || "";
  }

  document.addEventListener("DOMContentLoaded", () => {
    applyMeta();
    window.initSlides();

    const enterBtn = document.getElementById("enter-btn");
    if (enterBtn) enterBtn.addEventListener("click", () => {
      Intro.enter(() => Router.go("deck/0"));
    });

    handleHash();
  });
})();
