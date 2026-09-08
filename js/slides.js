const Slides = (() => {
  const escape = (text) => String(text).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[character]));
  const imageAlt = {
    1: '운전대를 잡은 사람 옆에서 AI 로봇이 지도를 안내하는 모습',
    2: '큰 지도 위에서 주요 경로를 함께 설계하는 사람과 AI 로봇',
    3: '하나의 경로가 여러 단계에서 다양한 방향으로 갈라지는 지도를 사람과 AI가 살펴보는 모습',
    4: '하나의 목적지를 향해 선택의 기준을 확인하는 사람과 AI 로봇',
    5: '예상한 경로와 실제 흐름을 나란히 비교하는 사람과 AI 로봇',
    6: '완성된 목적지와 여러 완료 지점을 확인하는 사람과 AI 로봇',
    7: '세 가지 기준으로 하나의 결과를 함께 살펴보는 사람과 AI 로봇',
    8: '사람이 직접 경로를 실행하며 AI 로봇과 반응을 확인하는 모습',
    9: '넓은 지도에서 문제 지점을 확대해 추적하는 사람과 AI 로봇',
    10: '질문을 거듭해 더 분명한 답에 다가가는 사람과 AI 로봇',
    11: '목적과 흐름, 막힌 이유를 기록으로 남기는 사람과 AI 로봇',
    12: 'AI가 정리한 기록을 사람이 다시 대조해 검토하는 모습'
  };
  const render = (lesson, box, previous, next) => {
    const imagePath = SITE_CONFIG.imagePathPattern.replace('{number}', String(lesson.id).padStart(2, '0'));
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
      <figure class="visual-shell visual-shell--${box.accent}" style="aspect-ratio:${SITE_CONFIG.imageAspectRatio}">
        <img class="lesson-visual" src="${escape(imagePath)}" alt="${escape(imageAlt[lesson.id])}" onload="this.closest('figure').classList.add('visual-shell--loaded')" onerror="this.hidden=true;this.closest('figure').classList.add('visual-shell--fallback')">
        <div class="visual-shell__fallback" aria-hidden="true"><div class="visual-shell__halo"></div><div class="visual-shell__line visual-shell__line--one"></div><div class="visual-shell__line visual-shell__line--two"></div><div class="visual-shell__dot"></div><figcaption><span>관점의 이미지</span><small>${escape(lesson.visual)}</small></figcaption></div>
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
