const App = (() => {
  const allLessons = EXHIBITION.boxes.flatMap((box) => box.lessons.map((lesson) => ({ ...lesson, box })));
  const views = ['start-view', 'room-view', 'cards-view', 'lesson-view'];
  let seen = new Set();
  let currentBox = null;
  const getLesson = (id) => allLessons.find((lesson) => lesson.id === Number(id));
  const announce = (message) => { document.getElementById('announcer').textContent = message; };
  const setProgress = () => { document.getElementById('progress-count').textContent = seen.size; };
  const loadProgress = () => {
    try { seen = new Set(JSON.parse(localStorage.getItem(SITE_CONFIG.storageKey) || '[]').filter(Number.isInteger)); }
    catch { seen = new Set(); }
    setProgress();
  };
  const saveProgress = () => { localStorage.setItem(SITE_CONFIG.storageKey, JSON.stringify([...seen])); setProgress(); };
  const show = (id) => views.forEach((viewId) => { document.getElementById(viewId).hidden = viewId !== id; });
  const setRoute = (route) => { window.location.hash = route; };
  const parseRoute = () => (window.location.hash || '#/').replace(/^#\/?/, '').split('/').filter(Boolean);
  const isRoute = (name) => parseRoute()[0] === name;
  const render = () => {
    const [kind, value] = parseRoute();
    if (!kind) { show('start-view'); document.getElementById('enter-button').focus(); announce('AI를 대하는 태도 입장 화면'); return; }
    if (kind === 'room') { Room.renderRoom(seen); show('room-view'); announce(`관점의 방, ${seen.size}장의 본 카드`); return; }
    if (kind === 'box') {
      const box = EXHIBITION.boxes.find((candidate) => candidate.id === value);
      if (!box) { setRoute('#/room'); return; }
      currentBox = box; Room.renderCards(box, seen); show('cards-view'); announce(`${box.name}, 세 장의 카드`); return;
    }
    if (kind === 'lesson') {
      const lesson = getLesson(value);
      if (!lesson) { setRoute('#/room'); return; }
      currentBox = lesson.box; seen.add(lesson.id); saveProgress();
      const index = allLessons.findIndex((candidate) => candidate.id === lesson.id);
      Slides.render(lesson, lesson.box, allLessons[index - 1], allLessons[index + 1]); show('lesson-view');
      document.getElementById('lesson-content').focus(); announce(`${lesson.id}번 카드, ${lesson.title}`); return;
    }
    setRoute('#/');
  };
  const navigate = (route) => { if (route) setRoute(route); };
  const enter = () => Intro.enter(() => setRoute('#/room'));
  const bind = () => {
    document.getElementById('enter-button').addEventListener('click', enter);
    document.addEventListener('click', (event) => { const target = event.target.closest('[data-route]'); if (target) navigate(target.dataset.route); });
    document.getElementById('lesson-box-button').addEventListener('click', () => { if (currentBox) setRoute(`#/box/${currentBox.id}`); });
    window.addEventListener('hashchange', render);
    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && isRoute('lesson') && currentBox) setRoute(`#/box/${currentBox.id}`);
      if (event.key === 'Escape' && isRoute('box')) setRoute('#/room');
    });
    let touchStart = null;
    document.addEventListener('touchstart', (event) => { touchStart = event.changedTouches[0]?.clientX; }, { passive: true });
    document.addEventListener('touchend', (event) => {
      const end = event.changedTouches[0]?.clientX;
      if (!isRoute('lesson') || touchStart === null || end === undefined || Math.abs(end - touchStart) < 70) return;
      const lesson = getLesson(parseRoute()[1]); const index = allLessons.findIndex((candidate) => candidate.id === lesson.id);
      if (end < touchStart && allLessons[index + 1]) setRoute(`#/lesson/${allLessons[index + 1].id}`);
      if (end > touchStart && allLessons[index - 1]) setRoute(`#/lesson/${allLessons[index - 1].id}`);
    }, { passive: true });
  };
  const init = () => { loadProgress(); bind(); render(); };
  return { init, allLessons, getLesson, setRoute };
})();
document.addEventListener('DOMContentLoaded', App.init);
