const Room = (() => {
  const roomGrid = () => document.getElementById('room-grid');
  const fan = () => document.getElementById('card-fan');
  const roomMarkup = (box, seen) => {
    const viewed = box.lessons.filter((lesson) => seen.has(lesson.id)).length;
    return `<button class="room-card room-card--${box.accent}" type="button" data-route="#/box/${box.id}" aria-label="${box.name}, ${box.theme}, 카드 ${viewed}장 봄">
      <span class="room-card__number">ROOM ${String(EXHIBITION.boxes.indexOf(box) + 1).padStart(2, '0')}</span>
      <span class="room-card__glow" aria-hidden="true"></span>
      <span class="room-card__name">${box.name}</span>
      <span class="room-card__theme">${box.theme}</span>
      <span class="room-card__count">${viewed} / 3 본 카드 <span aria-hidden="true">→</span></span>
    </button>`;
  };
  const renderRoom = (seen) => {
    roomGrid().innerHTML = EXHIBITION.boxes.map((box) => roomMarkup(box, seen)).join('');
  };
  const renderCards = (box, seen) => {
    document.getElementById('cards-eyebrow').textContent = `ROOM ${String(EXHIBITION.boxes.indexOf(box) + 1).padStart(2, '0')}`;
    document.getElementById('cards-title').textContent = box.name;
    document.getElementById('cards-theme').textContent = box.theme;
    fan().innerHTML = box.lessons.map((lesson, index) => `<button class="lesson-card lesson-card--${box.accent}" type="button" data-route="#/lesson/${lesson.id}" style="--i:${index}" aria-label="${lesson.id}번 카드, ${lesson.title}${seen.has(lesson.id) ? ', 이미 봄' : ''}">
      <span class="lesson-card__top"><span>0${lesson.id}</span><span>${seen.has(lesson.id) ? '본 카드' : 'CARD'}</span></span>
      <span class="lesson-card__title">${lesson.title}</span>
      <span class="lesson-card__message">${lesson.message}</span>
      <span class="lesson-card__open">열어보기 <span aria-hidden="true">↗</span></span>
    </button>`).join('');
  };
  return { renderRoom, renderCards };
})();
