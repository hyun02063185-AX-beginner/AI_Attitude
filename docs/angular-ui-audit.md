# P1-1D Step 2 — Angular UI Audit

> 구현 전 정밀 감사 · 2026-09-08
>
> 허용 변경은 이 문서 하나다. HTML/CSS/JS/이미지 수정, format, stage, commit, push는 수행하지 않았다.

## 0. 시작 상태와 감사 원칙

| Repository | Branch / HEAD | `HEAD...origin/main` | 시작 상태 |
| --- | --- | --- | --- |
| AX_Lecture | `main` / `37e5e6c90cd6a04d43d7f0e9c7cbee643821e7be` | `0 0` | 기존 untracked `order/히든코드_지시서.md` 1개 — 미변경 |
| AI_First_Step | `main` / `049a6fb52c8302b35b4ede7a249468c379c9a472` | `0 0` | clean |
| AI_Attitude | `main` / `6fa704fcc65b5794b86d085edc3922834a75ab24` | `0 0` | 기존 `docs/design-dna-report.md` untracked — 보존 |

이 문서는 승인된 Design DNA 10개를 실제 selector/DOM/JS 결합점으로 내린 Blueprint다. `Soft / Organic Geometry`는 모든 surface를 둥글게 하라는 지시가 아니다. **공간적 의미가 있는 곳에만 curve, circle, overlap, floating layer를 써서 rectangular dominance를 낮추는 것**이 목표다.

## 1. 결론: Angularity의 주된 발생 지점

AI_Attitude의 각진 인상은 단일 selector가 아니라 다음 흐름에서 생성된다.

`topbar separator → equal room grid → equal card flex row → rectangular visual frame → takeaway separator → full-width nav buttons`

각 node가 독립적으로는 합리적이지만, 한 화면 안에서 동일한 1px line·0 radius·equal gap·column flow를 반복한다. 이 감사의 우선순위는 이미지나 콘텐츠를 바꾸는 것이 아니라, 이 반복 문법을 **scene, object, deck, exhibit** 문법으로 교체하는 데 있다.

## 2. Angularity inventory

`AI_Attitude/css/style.css`는 주요 rule이 한 줄에 압축되어 있어 대부분의 CSS 근거는 `:10`, mobile은 `:12`, motion은 `:13`, image fallback은 `:16-20`으로 표기한다.

| Type | File:line | Selector | 현재 역할 / 화면 위치 | Angularity 근거 |
| --- | --- | --- | --- | --- |
| A Sharp Geometry | `css/style.css:10` | `.button` | Start CTA, prev/next | `border-radius:0`, 1px border. CTA와 nav 모두 toolbar cell처럼 읽힘. |
| A Sharp Geometry | `css/style.css:10` | `.room-card` | Room 2×2의 box | radius 미지정(0), 동일 min-height 230px의 panel. |
| A Sharp Geometry | `css/style.css:10` | `.lesson-card` | Box의 fan cards | radius 미지정(0), sharp border와 equal min-height 332px. |
| A Sharp Geometry | `css/style.css:10,16` | `.visual-shell`, `.lesson-visual` | Lesson hero image | 16:9 rectangular border frame; image는 containment만 수행. |
| A Sharp Geometry | `css/style.css:10` | `.progress-button` | Room topbar 우측 | 1px rectangular counter. |
| B Border Dominance | `css/style.css:10` | `.topbar` | Room/Box/Lesson 상단 | `border-bottom`이 매 route를 header/content로 절단. |
| B Border Dominance | `css/style.css:10` | `.room-card`, `.lesson-card` | Room/Box primary surface | `border:1px solid var(--line)`이 object identity의 주된 신호. |
| B Border Dominance | `css/style.css:10` | `.takeaway` | Lesson body 아래 | top/bottom border가 핵심 문장을 boxed subsection으로 만듦. |
| B Border Dominance | `css/style.css:10` | `.cards__return` | Box 아래 | border-bottom underline이 별도 UI control임을 강조. |
| B Border Dominance | `css/style.css:10` | `.lesson-nav .button` | Lesson 하단 | 두 개의 bordered control이 footer toolbar처럼 보임. |
| C Grid Dominance | `css/style.css:10` | `.room-grid` | Room 중심 | rigid `repeat(2,1fr)` + uniform `1rem` gap. |
| C Grid Dominance | `css/style.css:10` | `.card-fan` | Box 중심 | `display:flex; justify-content:center; gap`이 overlap을 원천 차단. |
| C Grid Dominance | `css/style.css:10` | `.lesson-nav` | Lesson bottom | `grid-template-columns:1fr 1fr`, equal navigation rhythm. |
| C Grid Dominance | `css/style.css:10` | `.topbar` | all route header | 3-column grid is stable but visibly application-like. |
| D Nested Panel | `js/slides.js:21-40`, `css:10` | `.lesson > .visual-shell > img` | Lesson | article 안 framed image; image가 scene의 layer가 아니라 panel content. |
| D Nested Panel | `js/slides.js:36-38`, `css:10` | `.lesson__body`, `.takeaway`, `.lesson-nav` | Lesson | image/body/takeaway/nav가 sequential subpanel pattern. |
| D Nested Panel | `js/room.js:21-25`, `css:10` | `.lesson-card__top/title/message/open` | Box | card 내부에 metadata, title, message, CTA를 동일 vertical template로 쌓음. |
| E UI Chrome | `index.html:30-33`, `css:10` | `.topbar`, `.progress-button` | Room header | home/title/progress가 conventional app header 구성. |
| E UI Chrome | `index.html:41-48`, `css:10` | `.cards__intro`, `.cards__return` | Box | header + centered intro + return link이 section page pattern. |
| E UI Chrome | `index.html:52-57`, `js/slides.js:22-25` | `.topbar--lesson`, `.lesson-context-nav` | Lesson header/mobile breadcrumb | two navigation systems가 동시에 존재; functional 필요성은 있으나 visual weight가 큼. |
| E UI Chrome | `css/style.css:10` | `.room-card__count`, `.lesson-card__top` | Room/Box card meta | persistent counts/labels가 object보다 dashboard card의 인상을 강화. |

## 3. Selector Intervention Matrix

| Priority | Screen | Selector / DOM | Current problem | Target DNA | Intervention Blueprint | Risk |
| --- | --- | --- | --- | --- | --- | --- |
| P0 | Room | `.room-grid` | 2×2 equal grid가 첫 인상을 dashboard로 고정 | Grid보다 Spatial Composition | DOM `#room-grid`는 유지하고 CSS를 central `room-stage` 성격의 relative canvas로 변경. 4개 `.room-card`를 desktop에서 비대칭 anchor(좌상/우상/좌하/우하, 서로 다른 translate/scale)로 배치; overlap은 최소화하되 equal baseline 제거. | medium |
| P0 | Room | `.room-card` | sharp bordered panel | Layered Boundary, Soft Geometry | border opacity를 낮추고 selective 18–28px radius/organic corner, radial inner pool, pseudo-element halo, depth별 shadow로 object화. 모든 card를 동일 radius로만 처리하지 말고 anchor/scale과 연동. | low |
| P0 | Box | `.card-fan` | flex gap이 physical deck을 방해 | Physical Card Deck | `position:relative` stage로 전환. card의 normal-flow gap 제거, central bottom anchor 및 absolute stacking 도입. | high |
| P0 | Box | `.lesson-card` | decorative rotation뿐, no overlap/deal/state | Physical Card Deck, Causal Motion | JS가 card별 final transform/z-index를 제공하도록 하고 CSS는 absolute card, transform-origin, depth shadow를 수용. 현재 `data-route`, aria-label, button semantics는 보존. | high |
| P0 | Lesson | `.visual-shell` / `.lesson-visual` | rigid framed content image | Exhibit Typography, Background as Architecture | image 12장은 유지. sharp border를 low-opacity vignette/edge glow/bleed layer로 대체; image root는 clip/contain 안전성 유지. fallback layer는 보존. | medium |
| P1 | Global | `.view` | same max-width padded document shell for every scene | Background as Architecture | Start/Room/Box/Lesson별 scene modifier를 두어 단일 document shell을 scene viewport로 분화. HTML global `view`/`hidden` 계약은 유지. | medium |
| P1 | Start | `.view--start`, `.start__frame`, `.button--enter` | centered landing page + rectangular CTA | Soft Geometry, Causal Motion | central focal pool/halo와 entrance object를 만들고 CTA를 pill/edge object로 재배치. title text는 유지; interaction hit area는 유지/확장. | low |
| P1 | Warp | `.warp`, `.warp--active` | 0.55s scale decoration이 room opening과 연결되지 않음 | Causal Motion | start exit → warp focal expansion → room reveal을 state class/timing으로 연결. reduced-motion은 instant crossfade. | medium |
| P1 | Navigation | `.topbar`, `.topbar--lesson` | bottom separator + three-column app chrome | Floating HUD | `header` DOM은 유지하고 border-bottom 제거/약화; translucent pill/edge controls로 분해. title/progress는 low-opacity floating HUD. | medium |
| P1 | Navigation | `.progress-button` | rectangular counter badge | Soft Geometry, Floating HUD | min 44px hit area 유지, pill 또는 circular progress object로 restyle; `#progress-count`와 route는 불변. | low |
| P1 | Lesson | `.takeaway` | two separator lines가 content box를 만듦 | Layered Boundary | aside DOM과 text는 유지. border pair 제거 또는 한쪽 fade rule로 축소하고, offset glow/soft field로 takeaway를 float. | low |
| P1 | Lesson | `.lesson-nav`, `.button--quiet`, `.button--next` | 2-column footer toolbar | Floating HUD | DOM 순서와 buttons 유지. Desktop edge controls로 absolute/overlay 배치, mobile은 stacked pill/edge controls. | medium |
| P1 | Box | `.cards__intro`, `.cards__return` | title/return이 fan stage와 분절 | Scene / Causal Motion | intro text를 overlay caption으로 흡수하고 return을 floating close/edge control로 restyle. `data-route="#/room"`은 유지. | low |
| P2 | Room | `.room-card__number/theme/count` | metadata가 dashboard density를 높임 | Exhibit Typography | text content는 보존. number/count는 object peripheral label, theme는 low-density caption으로 위치/opacity 차등. | low |
| P2 | Box | `.lesson-card__top/message/open` | every card의 equal internal template | Exhibit Typography | no content removal. title 우선 hierarchy, message optical de-density, open affordance는 hover/focus-only halo. | low |
| P2 | Lesson | `.lesson__body`, `.lesson__header` | long single-column prose follows large hero | Exhibit Typography | readable max width 유지. heading/body vertical rhythm을 widen하고 body start를 visual scene의 shadow/edge로 연결. | low |
| P2 | Global | `.ambient`, `.grain` | atmosphere가 content events와 독립 | Background as Architecture | existing ambient nodes를 유지하되 scene/box accent variable에 연결해 focal area를 지원. grain은 readability 보장 범위 유지. | low |
| P2 | Responsive | mobile `.card-fan`, `.lesson-card:nth-child(n)` | fan을 column+`transform:none`으로 완전 해제 | Mobile Metaphor Preservation | mobile에서도 2–3 card partial overlap을 유지: smaller scale, limited side rotation, horizontal-safe stage. keyboard DOM order는 바꾸지 않음. | high |

## 4. 변경 유형 분류

### REMOVE

- `.topbar`의 full-width `border-bottom` 시각 역할. header 자체는 제거하지 않는다.
- `.takeaway`의 상·하 double separator 시각 역할. aside와 text는 유지한다.
- `.cards__return`의 underline-as-page-link 표현. route control은 유지한다.
- `.card-fan`의 positive `gap`에 의존하는 배열 표현.

### RESTYLE

- `.button`, `.button--enter`, `.progress-button`, `.text-button`: pill/circle/edge control과 translucent HUD로 restyle.
- `.room-card`, `.lesson-card`: selective organic geometry, radial pool, shadow depth, accent halo.
- `.visual-shell`, `.lesson-visual`: vignette/glow/edge bleed로 restyle; source/aspect/fallback은 유지.
- `.room-card__*`, `.lesson-card__*`, `.lesson__header/body`: typography density, alignment, opacity hierarchy.

### RECOMPOSE

- `.room-grid`: equal 2×2 → central spatial stage 안의 four anchor objects.
- `.card-fan` + `.lesson-card`: flex list → absolute physical deck/deal state.
- `.lesson-nav`: footer grid → desktop edge/floating controls; mobile stack remains a deliberate adaptation.
- Start → Warp → Room and Box → Lesson: independent route paint → causal scene transition choreography.

### PRESERVE

- `#room-grid`, `#card-fan`, `#lesson-content` id and DOM insertion points.
- Lesson image files, 16:9 source ratio, Korean text and all alt text.
- `.lesson-context-nav` mobile-only context pattern; visual restyle permitted.
- existing `ambient`, `grain`, `warp` DOM nodes; they are useful building blocks.

### PROTECT

- all `[data-route]` buttons; DOM order and reachable controls.
- `#progress-count`, `SITE_CONFIG.storageKey`, seen state.
- `article#lesson-content[tabindex="-1"]` focus landing.
- image `onload` / `onerror` fallback contract.
- media queries, `prefers-reduced-motion`, mobile no-overflow behavior.

## 5. Screen Blueprint

### 5.1 Global shell

**Current:** `body` supplies one radial gradient, `.grain` fixed texture, `.ambient` two large blur circles, then every route gets the same `.view` document wrapper (`css:4,7-10`).

**Intervention:** do not add image assets. Treat the existing nodes as a three-layer atmospheric system:

1. base radial pool/vignette (background);
2. scene-specific low-opacity ambient anchors (midground);
3. room object/card/image halo (foreground).

Add scene modifier classes or route-driven root classes rather than changing `body` per component. This creates architecture without duplicating the page shell.

### 5.2 Start

**Current issue:** `.start__frame` is a centered content block and `.button--enter` is a rectangular form CTA (`css:10`). The vertical `.start__light` is a focal cue, but it does not materially change the surrounding scene.

**Blueprint:** preserve semantic h1, lead, button and its focus. Make the light an anchor for a radial pool/soft opening; give the CTA a pill/oval or edge-object silhouette and halo rather than a generic bordered rectangle. The title remains readable and centered, but the perceived unit becomes an entrance object, not a landing-page form.

### 5.3 Warp

**Current issue:** `.warp` is visually strong but lasts `.55s` and does not guarantee a room reveal state (`css:10-11`; `js/intro.js:2-10`).

**Blueprint:** retain the existing node and class. Give the route transition a three-step causal sequence: CTA commits → focal warp expands → Room objects fade/translate into their anchors. Under reduced motion, skip scale/flash but preserve the state order through opacity.

### 5.4 Room — highest visual priority

**Current selectors:** `.room-grid`, `.room-card`, `.room-card__glow`, `.room-card__number/name/theme/count` (`css:10`); generated by `js/room.js:4-14`.

**Current issue:** semantic Boxes are generated as buttons, but their equal grid, equal dimensions, text template and border make them dashboard cards. The circular glow exists but is clipped inside each rectangle, so it reads as decoration rather than spatial light.

**Blueprint for four viewpoint objects:**

- Keep four buttons and their order/ARIA labels.
- Introduce a relative Room stage at desktop widths. Place the four buttons with asymmetric anchors and restrained transforms; use different scale/vertical offsets rather than a random collage.
- A useful initial spatial range: object scale `0.88–1.10`, vertical offset `-4vh–7vh`, horizontal offset `-6vw–6vw`; preserve a central empty focal zone.
- Put a radial pool/pseudo-element behind each object; let one or two pools overlap softly at low opacity. Do not replace every card edge with a huge radius.
- Make metadata peripheral. The name remains dominant; number and count become smaller edge labels, and theme becomes a quiet subtitle.
- Hover/focus should raise the selected object by roughly `8–16px` and strengthen halo/shadow, not merely recolor its border.

### 5.5 Box

**Current selectors/DOM:** Box is the `#cards-view` page: `.cards__intro`, `#card-fan`, `.cards__return` (`index.html:41-48`); cards are created in `js/room.js:17-25`.

**Current issue:** the header, centered intro, regular fan row and return underline are separate page sections. This suppresses the impression that the user opened one box and released its cards.

**Blueprint:** keep all routes and text. Treat `#cards-view` as one stage: title as low-opacity stage caption, fan as central physical action, return as floating close control. On box entry, the stage should be visible before cards settle; on card selection, the chosen card should lift into the Lesson transition.

### 5.6 Card Fan — P0 implementation specification

**Existing reference:** AX_Lecture and AI_First_Step use `width:min(1120px,97vw); height:460px`, absolute 216×304px cards, `transform-origin:50% 320%`, total 40° spread, final `rotate(angle) translateY(-46px)`, initial `translateY(120px) scale(.9)`, i×60ms deal delay, hover `translateY(-70px) scale(1.05)` and z-index 40 (AX `css/style.css:665-696`, `js/room.js:70-137`; AIF same implementation).

**Current:** three normal-flow cards, width `min(29vw,285px)`, min-height 332px, ±5° decorative transforms, and hover that resets rotation (`AI_Attitude css:10`).

**Recommended starting ranges, not final fixed values:**

| Parameter | Desktop recommendation | Tablet | Mobile |
| --- | --- | --- | --- |
| side rotation | approximately `±5–9deg` for 3 cards | `±4–7deg` | `±2–5deg` |
| overlap | card width `20–35%` | `16–28%` | `12–22%` partial overlap |
| vertical fan lift | `-28–56px` from baseline | `-20–42px` | `-10–28px` |
| transform origin | below-card origin, approximately `50% 220–320%` | `50% 180–260%` | `50% 130–190%` |
| hover/focus lift | `-14–28px`, `scale(1.02–1.05)` | `-12–22px` | focus/tap selected `-8–16px` |
| selected lift | `-36–72px`, top z-index | `-28–56px` | `-18–36px`, no overflow |
| shadow | base broad dark shadow + accent halo at low opacity | reduced blur | compact shadow only |
| deal | opacity 0 + `translateY(50–120px) scale(.92–.97)` then settle; `45–90ms` stagger | shorter stage | reduced spread, preserve causal settle |
| transition | transform `280–420ms`, ease-out cubic-bezier | same or slightly faster | honor reduced motion with opacity-only / instant settle |

**Functional constraint:** cards are currently actual `<button>` elements with `data-route` and aria labels. Recomposition must not turn them into inaccessible divs, reorder DOM for visual z-index, or make overlapped cards unreachable by keyboard. Use CSS visual stacking or per-card style properties while preserving source order.

### 5.7 Lesson

**Current selectors/DOM:** `article#lesson-content` is populated in `js/slides.js:21-40`. Its sequence is header → `.visual-shell`/image/fallback → `.lesson__body` → `.takeaway` → `.lesson-nav`.

**Current issue:** the image is correct but sits in a sharp `border:1px` frame; body/takeaway/nav make the route read as a web article with a boxed illustration.

**Blueprint:** preserve all 12 images and `object-fit:contain`. The appropriate restoration is **CSS layered image treatment**, not a new image asset:

- use a low-opacity vignette/edge glow behind or above the figure;
- allow controlled visual bleed into the stage background on desktop while the actual image box remains clipped and ratio-safe;
- use a soft edge or masked fade instead of a high-contrast rectangular border;
- position lesson title/message as exhibit caption near the visual rather than adding extra textual panels;
- restyle takeaway as a floating editorial annotation, not a bordered subsection;
- make prev/next edge controls visually subordinate to the visual, while retaining normal DOM order and mobile stacked controls.

### 5.8 Floating navigation / HUD

| Current target | Recommended visual role | Must keep |
| --- | --- | --- |
| `.topbar` | low-opacity, translucent floating HUD; no full-width separator | all buttons, current labels, responsive visibility |
| `.text-button` | edge/pill control with 44px effective hit area | data-route, keyboard focus-visible |
| `.progress-button` | compact pill/circular counter object | `#progress-count`, room route |
| `.lesson-context-nav` | mobile contextual edge controls, not extra toolbar | mobile-only route access |
| `.lesson-nav` | desktop stage-edge previous/next; mobile stacked controls | previous/next route buttons and names |

### 5.9 Typography intervention

| Classification | Selector | Direction |
| --- | --- | --- |
| KEEP | `.lesson__body`, `.lesson__question` | retain readable Korean line-height and maximum text measure. |
| ENLARGE | `.room-card__name`, `.lesson-card__title`, lesson h1 | reinforce primary exhibit/object name; do not enlarge labels/counts. |
| DE-DENSIFY | `.room-card__number/theme/count`, `.lesson-card__top/message/open`, `.topbar__quiet` | lower opacity, move to edge/periphery, increase negative space. |
| FLOAT | `.cards__intro`, `.takeaway`, `.lesson-nav`, `.progress-button` | detach visually from panel rails and place as scene captions/controls. |

Text content is protected. Density reduction means hierarchy, position, opacity and spacing — never deleting authored lesson meaning.

## 6. Functional Protection Map

| Function | Current contract / source | Design-change protection |
| --- | --- | --- |
| Hash navigation | delegated `[data-route]` click in `js/main.js:41`; route parser/render `:15-38` | retain buttons and `data-route` values. Never replace route UI with non-semantic decorative nodes. |
| Browser back | `hashchange` listener `js/main.js:44` | no direct history rewrite during animation; route state must remain source of truth. |
| localStorage progress | load/save in `js/main.js:7-11`; seen update on Lesson route `:29-34` | retain lesson id/data and `#progress-count`; visual seen state can change but state write timing cannot. |
| Keyboard/focus | `#lesson-content tabindex="-1"` (`index.html:57`), focus on render (`main.js:34`), global Escape (`:45-47`) | no loss of focus target. Preserve `button` elements, `:focus-visible`, Escape Lesson → Box → Room order. |
| Swipe | touch start/end and 70px threshold (`js/main.js:49-57`) | overlapping fan must not install touch handlers that prevent Lesson swipe or cause horizontal page scroll. |
| ARIA | Room button labels in `js/room.js:6`; card aria labels `:21`; image alt via `js/slides.js:2-16,32-34` | keep source order, labels, alt and accessible names when restyling/absolute positioning. |
| Image fallback | image `onload` and `onerror` classes (`js/slides.js:32-34`), fallback CSS (`css:16-20`) | preserve `<img>` and fallback sibling; visual bleed must not hide fallback on error. |
| Reduced motion | global CSS reset (`css:13`), Intro conditional motion (`js/intro.js:2-10`) | new causal sequences need explicit reduced-motion state; do not rely only on long CSS animations. |
| Prev/next | buttons generated in `js/slides.js:38-40` | preserve DOM order and visible accessible labels even if desktop controls float at edges. |
| Responsive safety | mobile rules `css:12,21` | all absolute/overlap rules require explicit desktop/tablet/mobile fallbacks and `overflow-x: hidden` verification. |

## 7. Motion classification

| Transition | Current state | Classification | Required causal improvement |
| --- | --- | --- | --- |
| Start → Warp | CTA activates `.warp--active` (`js/intro.js:4-10`) | partly cosmetic | make CTA focal point commit to the warp and delay Room object reveal until warp resolves. |
| Warp → Room | route callback after fixed timeout | cosmetic / abrupt | scene background and objects crossfade/settle as one opening event. |
| Room → Box | direct hash route/card render | causal cue absent | selected Room object should lift/glow, then fan stage appears. |
| Box → Lesson | direct card route | causal cue absent | selected card gets top z-index/lift; transition visually hands off to Lesson image/stage. |
| Lesson → Box | direct route / Escape | functional only | reverse fade or card-stage restore, while maintaining immediate Escape route semantics. |

Motion must never delay keyboard confirmation, route update, or reduced-motion state. The URL and focus can update immediately; visual choreography may follow as non-blocking presentation.

## 8. Desktop, tablet, mobile intervention

| Screen | Desktop metaphor | Tablet adaptation | Mobile adaptation |
| --- | --- | --- | --- |
| Start | central entrance object + ambient focal pool | reduce pool spread, retain CTA object | keep one focal axis; no peripheral overflow |
| Room | asymmetric four-object stage with central empty space | tighten anchors, reduce scale variance | vertical scene flow acceptable, but objects keep halo/soft geometry rather than becoming identical cards |
| Box/Fan | full three-card deck overlap | smaller deck and reduced rotation | compact partial overlap, visible primary card and side-card edges; never plain column list |
| Lesson | image-led exhibit with edge controls | reduce bleed/edge offsets | contain image, retain vignette/soft boundary; nav stacks only after preserving accessible labels |
| HUD | floating edge/pill controls | compact controls | 44px touch targets, no decorative hover dependency |

## 9. Implementation Sprints

### Sprint A — Start + Global Scene

- Files: `css/style.css`, `js/intro.js`, potentially class hooks in `js/main.js`.
- Targets: `.view`, `.view--start`, `.start__frame`, `.start__light`, `.button--enter`, `.ambient`, `.warp`.
- Functional risk: Intro callback / reduced-motion timing.
- QA: entry button keyboard focus, motion-reduced route entry, no flash/overflow at 1440/768/375.

### Sprint B — Room + Box

- Files: `css/style.css`, `js/room.js`, possibly `index.html` only if an explicit stage wrapper is truly needed.
- Targets: `.room-grid`, `.room-card*`, `.cards__intro`, `.cards__return`, route view class hooks.
- Functional risk: Room button DOM order, click delegation, seen count and ARIA labels.
- QA: all four Rooms reachable via mouse/keyboard, box return/room return, no overlap occluding controls.

### Sprint C — Card Fan

- Files: `css/style.css`, `js/room.js`.
- Targets: `.card-fan`, `.lesson-card*`, selected/dealt state classes or CSS custom properties.
- Functional risk: highest — button hit targets, DOM order, `data-route`, focus-visible, mobile touch collision.
- QA: each Box shows three selectable cards; Tab reaches all three; Enter activates; hover/focus lift; mobile partial deck, no horizontal overflow.

### Sprint D — Lesson

- Files: `css/style.css`, `js/slides.js` only for additive classes/wrappers if CSS cannot achieve layers.
- Targets: `.lesson`, `.visual-shell*`, `.lesson__header/body`, `.takeaway`, `.lesson-nav`, `.topbar--lesson`.
- Functional risk: image onload/onerror fallback, alt, lesson focus, prev/next, Escape.
- QA: Lessons 01–12 image load/fallback, alt exposure, aspect/crop, keyboard/focus, Box/Room return.

### Sprint E — Animation / Glow / Navigation Polish

- Files: `css/style.css`, `js/intro.js`, `js/main.js`, `js/room.js` as required by the implemented state machine.
- Targets: transition classes, ambient layers, HUD controls, reduced-motion overrides.
- Functional risk: route animation race conditions, Escape/swipe, browser back.
- QA: desktop/tablet/mobile visual pass; reduced motion; fast route switching; console 0; broken image 0; horizontal overflow 0.

Order rationale: Scene/Room must establish the visual language before Fan; Fan needs that stage to be judged; Lesson comes after the shared light/boundary grammar exists; polish is last to avoid animating a geometry that will change.

# Claude Code Implementation Handoff

## DO

- Work Sprint A → E in order; verify functional contracts at every sprint.
- Preserve real `<button>` controls, `data-route`, DOM order, IDs, `aria-label`, image `alt`, and fallback behavior.
- Use CSS custom properties/classes for spatial anchors and card transforms; derive per-card visual state without changing semantic order.
- Build depth with CSS radial gradients, pseudo-elements, shadows, opacity and existing ambient nodes before requesting new assets.
- Keep the 12 photorealistic images primary and maintain their natural 16:9 containment.

## DO NOT

- Do not mass-add large border-radius to every element.
- Do not convert fan cards into inaccessible divs or use visual z-index changes that hide keyboard-reachable cards.
- Do not remove `localStorage`, hash routing, focus placement, Escape, swipe, ARIA, fallback, or reduced-motion support.
- Do not turn mobile into a plain column list merely to avoid overlap.
- Do not change lesson text, alt text, source images, or file naming pattern as a visual shortcut.

## PROTECT

`data-route`, `#room-grid`, `#card-fan`, `#lesson-content`, `#progress-count`, `SITE_CONFIG.storageKey`, global hashchange, Escape hierarchy, touch swipe threshold, image onload/onerror, and `prefers-reduced-motion` are implementation contracts.

## VISUAL TARGET

A warm amber/navy exhibition space: four asymmetric viewpoint objects hover in one Room; opening one releases a physical three-card deck; choosing a card leads into an image-led exhibit slide. Boundaries are made chiefly by light, depth, translucency, soft/selective geometry and overlap — not by repeated square lines. The result must remain calm, cinematic, accessible and mobile-safe rather than decorative or game-like.

## FIRST SPRINT FILES

1. `css/style.css`
2. `js/intro.js`
3. `js/main.js` only if scene-state class hooks are necessary

Do not start Card Fan implementation until the Start/Room scene has a visible spatial focal point and reduced-motion behavior has been checked.
