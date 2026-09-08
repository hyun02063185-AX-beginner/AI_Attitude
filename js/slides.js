const Slides = (() => {
  const escape = (text) => String(text).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[character]));
  const render = (lesson, box, previous, next) => {
    const imageName = `lesson-${String(lesson.id).padStart(2, '0')}.webp`;
    document.getElementById('lesson-box-button').textContent = `← ${box.name}`;
    document.getElementById('lesson-position').textContent = `${lesson.id} / 12`;
    document.getElementById('lesson-content').innerHTML = `
      <div class="lesson__header">
        <nav class="lesson-context-nav" aria-label="현재 카드 위치">
          <button class="text-button" type="button" data-route="#/box/${escape(box.id)}">← ${escape(box.name)}</button>
          <button class="text-button" type="button" data-route="#/room">관점의 방</button>
        </nav>
        <p class="eyebrow">${escape(box.name)} · CARD ${String(lesson.id).padStart(2, '0')}</p>
        <p class="lesson__question">${escape(lesson.question)}</p>
        <h1 id="lesson-title">${escape(lesson.title)}</h1>
        <p class="lesson__message">${escape(lesson.message)}</p>
      </div>
      <figure class="visual-shell visual-shell--${box.accent}" aria-label="${escape(lesson.visual)}. 향후 이미지 ${imageName}이 배치될 자리입니다.">
        <div class="visual-shell__halo" aria-hidden="true"></div><div class="visual-shell__line visual-shell__line--one" aria-hidden="true"></div><div class="visual-shell__line visual-shell__line--two" aria-hidden="true"></div><div class="visual-shell__dot" aria-hidden="true"></div>
        <figcaption><span>관점의 이미지</span><small>${escape(lesson.visual)}</small></figcaption>
      </figure>
      <div class="lesson__body"><p>${escape(lesson.description)}</p></div>
      <aside class="takeaway"><span class="takeaway__label">TAKEAWAY</span><p>${escape(lesson.takeaway)}</p></aside>
      <nav class="lesson-nav" aria-label="카드 이동">
        ${previous ? `<button class="button button--quiet" type="button" data-route="#/lesson/${previous.id}">← <span>${escape(previous.title)}</span></button>` : '<span></span>'}
        ${next ? `<button class="button button--next" type="button" data-route="#/lesson/${next.id}"><span>${escape(next.title)}</span> →</button>` : `<button class="button button--next" type="button" data-route="#/room"><span>관점의 방으로</span> →</button>`}
      </nav>`;
  };
  return { render };
})();
