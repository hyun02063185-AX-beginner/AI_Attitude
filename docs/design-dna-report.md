# P1-1D Step 1 — Design DNA Reverse Audit

> 분석 기준일: 2026-09-08 · 코드 변경, 리팩터링, 이미지 변경, commit, push 없음.
>
> 이 문서는 AX_Lecture를 복제하자는 제안이 아니다. 두 기존 프로젝트가 공유하는 **공간적 전시 경험의 규칙**을 분리하여, AI_Attitude의 콘텐츠·이미지·접근성 구조 위에 이식하기 위한 역감사다.

## 0. 감사 범위와 시작 Git 상태

| Repository | Branch | HEAD | `HEAD...origin/main` | 시작 working tree / untracked |
| --- | --- | --- | --- | --- |
| `AX_Lecture` | `main` | `37e5e6c90cd6a04d43d7f0e9c7cbee643821e7be` | `0 0` | untracked `order/히든코드_지시서.md` 1개 |
| `AI_First_Step` | `main` | `049a6fb52c8302b35b4ede7a249468c379c9a472` | `0 0` | clean |
| `AI_Attitude` | `main` | `6fa704fcc65b5794b86d085edc3922834a75ab24` | `0 0` | clean |

원본 소스는 수정하지 않았다. 이 보고서만 `AI_Attitude/docs/`에 새로 만든다.

## Executive summary — 가장 큰 차이 5개

1. **scene/stage 경험 → 문서형 view 경험.** 기존은 고정 viewport 위에서 scene이 `scale(1.04) → 1`로 전환되고(AX `css/style.css:295-302`, AIF `:394-401`), AI_Attitude는 `min-height:100vh`의 연속 문서 view와 hash route를 사용한다(`css/style.css:9`).
2. **절대 배치된 카드 덱 → flex 카드 배열.** 기존 fan은 중앙 하단에 카드를 겹친 뒤 부채꼴로 deal한다(AX `room.js:71-137`, AIF 동일). 현재는 `.card-fan`의 flex/gap과 세 장의 약한 회전이다(`AI_Attitude/css/style.css:10`).
3. **soft/glass/halo 경계 → 직선 border 경계.** 기존은 theme token으로 14–18px radius, glass, shadow, glow를 조합한다(AX `css/style.css:87-113, 234-261`; AIF `:137-163, 333-360`). 현재 주요 UI 표면은 `border-radius:0` 또는 radius 미지정이며 1px border가 구조를 직접 그린다(`AI_Attitude/css/style.css:10`).
4. **배경·비네트·오버레이의 깊이 → 단일 background 위의 균일한 panel.** 기존에는 `#bg-canvas`, `.vignette`, 전체 fan overlay, fixed scene layer가 있다(AX `css/style.css:280-302, 653-658`). 현재도 grain/ambient는 있으나, Room과 Card는 동일한 panel 문법으로 배치된다(`AI_Attitude/css/style.css:7-10`).
5. **HUD/전시물 navigation → topbar/UI chrome.** 기존 navigation은 stage 바깥의 absolute HUD와 하단 slide-nav다(AX `css/style.css:508-550, 793-805`). 현재 topbar의 `border-bottom`, progress button, lesson-nav가 문서 앱의 header/footer로 읽힌다(`AI_Attitude/css/style.css:10`).

### 핵심 판정

AI_Attitude가 각져 보이는 직접 원인은 ‘border가 존재한다’는 한 가지가 아니다. 기존도 border를 사용한다. 차이는 **(a) radius 0, (b) border가 surface의 주된 경계, (c) uniform grid/flex, (d) 한 흐름의 문서형 세로 구성, (e) image·takeaway·topbar의 반복적인 직사각 프레임**이 동시에 작동한다는 데 있다.

## 1. 구조 비교: Start → Warp → Room → Box → Fan → Lesson

| 단계 | AX_Lecture | AI_First_Step의 공통 DNA | AI_Attitude에서 달라진 결정 |
| --- | --- | --- | --- |
| Start | `scene-start` 안에 centered start, 화면 배경과 vignette가 독립 layer. 버튼은 pill/glass/halo(`AX css:367-394`). | 동일한 scene, start, theme token, enter motion 구조(AIF `css:394-401` 이후). | `.view--start`는 grid centered지만 단일 text frame; 사각 버튼과 수직 light가 주인공이다(`AI_Attitude css:10`). |
| Warp | viewport보다 큰 220vmax 원형 layer와 1.6s cubic-bezier warp(AX `css:501-505`). | 동일 구현(AIF `css:602-606`). | full-screen radial layer는 유지하지만 `.55s` scale 애니메이션으로 축소됐다(`AI_Attitude css:10-11`). |
| Room | canvas/vignette/scene 위 4 box, reveal stagger, overlay 진입. | 동일 scene/canvas/box model; First Step은 office/sunset skin까지 확장. | `.room-grid` 2×2 uniform cards, 공용 topbar, 숫자·theme·count의 카드 정보 구조(`AI_Attitude css:10`, `js/room.js:6-11`). |
| Box | box 자체가 glass object: radial 내부광, bottom accent bar, dot progress(`AX css:623-650`). | 동일 selector와 효과(AIF `css:724-751`). | box는 별도 object가 아니라 Room card; bordered rectangle이 정보 묶음으로 기능한다. |
| Card Fan | absolute deck + overlay + deal/hover/stacking. | 동일 코드와 동일 40° spread(AIF `room.js:61-140`). | separate overlay/deal state 없음. flex 배열에 `nth-child` rotation만 적용(`AI_Attitude css:10`). |
| Lesson | fixed slide stage, one slide가 absolute layer로 전환; top/bottom HUD가 stage 밖에 있다(AX `css:720-805`). | 동일 slide-stage/slide-nav(AIF `css:821-905`). | content article이 세로로 이어지는 lesson, 큰 image figure, takeaway, navigation 순서다(`AI_Attitude js/slides.js:21-40`). |
| Background | `#bg-canvas`, vignette, theme-specific radial background/pseudo element. | 동일 layer; office/sunset 등 additional skins. | body radial gradient + grain + 두 ambient blur blob. 깊이 레이어는 있으나 content surface와 연결되지 않는다(`AI_Attitude css:4,7-8`). |
| Navigation | HUD와 slide-nav가 scene 위에 absolute로 떠 있다. | 동일. | topbar grid 및 full-width/stacked mobile buttons로 UI chrome 비중이 높다(`AI_Attitude css:10,12`). |
| Responsive / motion | 900px에서 card 축소, 560px에서 room 1열; reduce-motion에서 fan/start/guide를 정지(AX `css:926-964`). | 동일(AIF `css:1027-1060`). | 720px에서 fan을 column으로 바꾸고 모든 회전/위치를 제거; global reduced-motion reset(`AI_Attitude css:12-13`). |

## 2. Reverse audit

### 2.1 Rectangle dominance

| AI_Attitude selector (근거) | 직사각 인상 | 기존의 동등 기능 |
| --- | --- | --- |
| `.button`, `.progress-button` (`css/style.css:10`) | `border-radius:0`, 1px line, 직선 padding box | pill radius `999px` 버튼: AX `css:380`, `798-800`; AIF `css:899-900` |
| `.topbar` (`css/style.css:10`) | `grid` + `border-bottom`가 명시적 수평 분리선 | HUD는 absolute/floating이며 자체 얇은 control만 가진다: AX `css:508-550` |
| `.room-grid`, `.room-card` (`css/style.css:10`) | 2×2 equal grid, 동일 min-height, border panel | 기존 `.boxes`도 grid지만 box 안에 radial light/bottom glow/reveal가 있어 전시 object로 읽힌다: AX `css:622-639` |
| `.lesson-card` (`css/style.css:10`) | 3개의 동일 width/min-height 카드와 border | 기존 `.card`는 absolute central stack이며 실제 overlap이 있다: AX `css:665-696` |
| `.visual-shell`, `.lesson-visual` (`css/style.css:10,16-20`) | 16:9 rigid border frame, no radius | 기존 `.s-img`도 framed지만 `var(--radius)`와 shadow를 쓴다: AX `css:768-776` |
| `.takeaway`, `.cards__return` (`css/style.css:10`) | top/bottom separator와 underline이 content를 section box로 분절 | 기존 slide의 hierarchy는 stage panel 안에서 spacing, overlay, stage transition으로 형성된다. |

### 2.2 Border dependence — 수가 아니라 역할의 변화

기존 두 프로젝트 역시 `.box`, `.card`, `.slide`, `.slide-btn`에 1px border를 쓴다. 따라서 “기존은 border가 없었다”는 결론은 사실이 아니다. 다만 기존 border는 다음과 같이 **부차적이고 soft한 glass boundary**다.

- theme마다 `--radius:14px/16px/18px`, `--glass`, `--shadow`, `--glow-*`를 함께 제공한다(AX `css:40-54, 95-113, 247-261`; AIF `css:100-114, 346-360`).
- box/card 표면에는 radial pseudo-element, accent bar, shadow/glow가 겹쳐 line 하나가 유일한 구조 신호가 되지 않는다(AX `css:632-638, 679-682`).
- AI_Attitude는 base `.button`이 0 radius, room/card/image가 1px `var(--line)` 경계로 먼저 구획된다(`css:10`). topbar/takeaway/return underline까지 선이 연속되므로, 선이 장식이 아니라 layout skeleton으로 읽힌다.

### 2.3 Border radius 실제 값

| Component | AX_Lecture / AI_First_Step | AI_Attitude | 형태적 결과 |
| --- | --- | --- | --- |
| main scene / slide | `var(--radius)`: paper 14px, neon 16px, sayu 18px; slide도 동일 | `.view`, `.lesson` radius 없음 | 기존은 전시장에 놓인 soft slab, 현재는 페이지 폭의 문서 영역 |
| room object / box | `var(--radius)` (AX `css:623-626`) | `.room-card` radius 미지정 = 0 | 현재 room이 panel grid로 읽힘 |
| card | `var(--radius)` + origin below card (AX `css:666-680`) | `.lesson-card` radius 미지정 = 0 | deck의 물성 대신 rectangular component |
| image | `var(--radius)` (AX `css:768`) | `.visual-shell` 0, 1px border (`AI_Attitude css:10`) | 사진도 UI frame처럼 보임 |
| button | pill `var(--radius-pill)=999px`가 주력 | `.button { border-radius:0 }`; text button은 border 없음 | control이 floating token이 아니라 toolbar cell이 됨 |
| badge / progress | pill / circular dots (`AX css:649, 686-693`) | progress button square, count text | 기존은 작은 object, 현재는 정보 badge |

### 2.4 Grid vs spatial composition

기존도 Room의 첫 배치는 `.boxes { grid-template-columns:repeat(4,1fr) }`다(AX `css:622`; AIF `css:723`). 즉 grid 자체가 문제는 아니다. 공간감은 그 다음 layer에서 생긴다.

- **기존 spatial layer:** fixed `scene`, canvas/vignette, absolute fan overlay, absolute card center, transform-origin 320% 아래, rotate/translate, z-index deck, staged opacity. Empty space는 fan 주변과 scene 바깥 배경이 담당한다.
- **현재 structured layer:** Room 2×2 grid, Card Fan flex `gap`, lesson-nav grid, topbar grid, mobile column. 모든 item은 가시적 정렬선과 동일한 gap에 맞춰진다(`AI_Attitude css:10,12`).

따라서 기존이 실제 3D 공간을 모델링해서가 아니라, **layout grid 위에 absolute/overlap/lighting을 추가해 grid를 지운 것**에 가깝다. AI_Attitude는 그 second layer가 약하다.

## 3. Card Fan 집중 분석

| 항목 | AX_Lecture / AI_First_Step | AI_Attitude |
| --- | --- | --- |
| container | `position:relative; width:min(1120px,97vw); height:460px` (AX `css:665`) | `display:flex; justify-content:center; gap:clamp(.65rem,2vw,1.6rem); min-height:440px` (`AI_Attitude css:10`) |
| card size | `216×304px`, `left:50%`, `bottom:0`, `margin-left:-108px` (AX `css:666-668`) | `width:min(29vw,285px); min-height:332px` |
| overlap / pivot | same origin, `transform-origin:50% 320%` | no overlap/pivot; normal flex items |
| rotation / translate | 40° spread; each `rotate(angle) translateY(-46px)` (AX `room.js:70-100`) | `-5°/+13px`, `0/-10px`, `+5°/+13px` only (`css:10`) |
| deal / selected state | start `translateY(120px) scale(.9)`, 40ms + i×60ms; `.dealt` enables pointer events; `seen` retains accent glow (AX `room.js:128-138`, `css:675-696`) | no deal state or selected visual state; seen is text label only |
| hover / z-index | rotate 유지, `translateY(-70px) scale(1.05)`, `z-index:40` (AX `room.js:97-116`) | hover는 모든 각도를 0으로 되돌리고 `translateY(-14px) scale(1.025)`, `z-index:2` |
| transition | transform `.32s cubic-bezier(.22,.61,.36,1)` (AX `css:673-674`) | `.25s ease` |
| mobile | card는 180×252로 축소되어 fan의 겹침을 유지; room grid만 1열 (AX `css:926-931`) | mobile에서 `flex-direction:column` 및 `transform:none`으로 deck를 해제 (`AI_Attitude css:12`) |

**결론:** 기존 fan은 하나의 중심점에서 출발하고, 실제 덱의 overlap·회전·stacking·dealing 시간을 갖는다. 현재 fan은 서로 간격을 둔 카드에 회전을 살짝 얹은 배열이다. `gap`과 normal flow가 overlap을 예방하고, hover가 회전을 없애므로 카드 덱의 물성이 완성되지 않는다.

## 4. Room, light/depth, shape DNA

### Room이 공간처럼 느껴지는 원인과 현재의 결손

기존 Room은 객체별 foreground/midground/background를 정교하게 모델링한 3D scene은 아니다. 그러나 `#bg-canvas`와 `.vignette`의 full-screen background, fixed scene, guide pulse, reveal stagger, glass box의 internal radial light, accent bottom bar, full-screen fan overlay가 **전경(상자/카드)·중경(overlay)·배경(canvas/vignette)**을 분리한다(AX `css:280-302, 617-658`).

AI_Attitude에는 grain, 고정 ambient blob, room-card glow가 있다(`css:7-10`). 하지만 ambient는 card의 focal point·perspective·opening motion과 결합하지 않고, Room 자체는 2×2 equal card surface다. 즉 빛이 배경 decoration에 머물고, 사용자가 ‘들어갈 장소’를 만들지 못한다.

### Light / depth 비교

| 기술 | AX_Lecture / AI_First_Step | AI_Attitude | 판정 |
| --- | --- | --- | --- |
| radial gradient / vignette | theme page background, vignette, overlay, box/card pseudo-element에 반복(AX `css:75-76, 91, 632-636, 679-680`) | body radial, visual shell radial, ambient blob (`css:4,8,10`) | 현재는 존재하나 surface hierarchy에 덜 연결 |
| shadow / glow | skin token으로 shadow와 glow가 semantics와 함께 바뀜(AX `css:95-113,242-261`) | card/image shadow는 있으나 common dark shadow; accent interaction은 border-color 중심 | glow가 boundary와 status를 만들던 역할이 약화 |
| blur / transparency | neon glass는 `backdrop-filter:blur(14px)`, overlay와 controls가 translucent | ambient만 `filter:blur(80px)`; main panels는 opaque/flat | light가 panel 뒤의 공간을 드러내지 않음 |
| pseudo element | box/card 내부 radial, accent bar, theme body overlays | grain SVG 및 fallback visual lines | 기존은 object 내부 빛, 현재는 page/placeholder 장식 |

### Shape DNA

기존 공통 언어는 pill, dot, soft rounded slab, radial halo, wide circular warp, tilted/overlapped card, vignette edge다. 반대로 AI_Attitude의 주된 shape는 0-radius rectangle, horizontal separator, equal card, 16:9 image frame이다. 현재에도 circle은 ambient·room glow·fallback halo에 있으나, 주요 interaction surface를 지배하지 않는다.

## 5. Typography, navigation, animation, mobile

### Typography

| 항목 | AX_Lecture / AI_First_Step | AI_Attitude |
| --- | --- | --- |
| display/body system | skin별 display/body/mono token; sayu는 `Nanum Myeongjo`, neon은 `Gowun Batang` 등 theme가 type와 같이 변함 (AX `css:115-117,263-265`; AIF `css:165-167,362-364`) | `ui-serif` 기반 단일 본문, small mono label, large lesson h1 (`AI_Attitude css:4,10`) |
| lesson hierarchy | absolute slide panel; big text `clamp(2.8rem,6.2vw,4.6rem)`, max-width 34ch (AX `css:720-750`) | h1은 더 큼 `clamp(2.6rem,7vw,5.2rem)`이나 question/message/body/takeaway가 한 문서 flow에 연속 |
| density/alignment | stage 내부 여백과 centered/absolute scene이 text를 전시물로 격리 | 680–720px body/header, repeated labels/separators/navigations가 문서 읽기 밀도를 높임 |

현재의 typography 자체는 문제라기보다, border-separator와 long-flow container의 조합이 ‘읽는 앱’ 인상을 강화한다.

### Button / navigation

기존 버튼은 pill, glass, blur, shadow로 scene 위에 떠 있다. navigation은 HUD/slide-nav로 stage 바깥에 absolute 배치된다(AX `css:508-550,793-805`). 현재 버튼은 0-radius `border:1px`, topbar의 border-bottom, desktop/mobile grid nav로 설계된다(`AI_Attitude css:10,12`). 따라서 기존 버튼은 공간 안의 floating control, 현재 버튼은 UI chrome이다.

### Animation

| 흐름 | 기존 | 현재 |
| --- | --- | --- |
| Start / Room | scene `.7s` opacity+scale, room box i×120ms stagger (AX `css:295-302`, `room.js:44-50`) | start `fade-in .8s`; Room/card에는 entry stagger 없음 |
| Warp | 1.6s cubic-bezier full-screen circular warp | `.55s ease-out` radial scale |
| Card | deal, hover, z-index, seen glow로 선택이 공간 이벤트가 됨 | `.25s` hover lift만 있음 |
| Lesson | absolute slide `.55s` opacity+translate+scale | hash route content replacement; no lesson transition |
| reduced motion | targeted fan/start/guide disable | 전체 animation/transition을 `.01ms`로 안전하게 축소 |

모션은 단순 장식이 아니다. 기존에서는 ‘상자가 나타나고 → 덱이 펼쳐지고 → stage로 들어가는’ 물리적 인과를 만든다. AI_Attitude에서는 warp 뒤 주요 상태 변화가 즉시 문서로 교체돼 공간적 연속성이 끊긴다.

### Mobile DNA

두 기존 프로젝트는 560px에서 room grid를 1열로 바꾸되 card fan의 overlap을 계속 유지하고 card만 180×252로 축소한다(AX `css:926-931,940-960`; AIF `css:1027-1060`). AI_Attitude는 mobile에서 카드 fan을 column으로 전환하고 모든 card transform을 제거한다(`css:12`). 이는 touch usability에는 안전하지만 desktop에서 남아 있던 유일한 spatial signal도 제거한다. 반면 AI_Attitude의 mobile navigation, image containment, swipe, keyboard, reduced motion은 유지해야 할 명확한 장점이다.

## 6. 공통 Design DNA 정의

## DNA-01 — Border보다 layered boundary

- 설명: border를 없애라는 뜻이 아니라 radius, transparency, shadow, radial light, glow 중 둘 이상으로 경계를 만든다.
- AX 근거: box/card pseudo radial과 accent bar/glow(AX `css:632-638,679-682`).
- AI_First_Step 근거: 동일 token/selector 구조(AIF `css:724-784`).
- AI_Attitude 차이: `--line` border와 separators가 primary boundary다.
- 복원 중요도: **최상**.

## DNA-02 — Grid보다 spatial composition

- 설명: grid는 시작점일 수 있지만, 최종 인상은 overlap, absolute anchor, asymmetry가 결정한다.
- AX 근거: central absolute fan and 40° spread(AX `room.js:70-137`).
- AI_First_Step 근거: 동일 fan implementation.
- AI_Attitude 차이: Room 2×2 grid와 flex fan이 normal flow에 머문다.
- 복원 중요도: **최상**.

## DNA-03 — Soft/pill geometry

- 설명: 큰 surface는 14–18px soft radius, transient control은 pill/circle을 쓴다.
- AX 근거: theme radius token(AX `css:40-42,100-103,247-249`).
- AI_First_Step 근거: office/neon/sayu 동일 계열(AIF `css:100-103,150-153,346-349`).
- AI_Attitude 차이: button 0 radius, 주요 cards/image radius 미지정.
- 복원 중요도: **최상**.

## DNA-04 — Scene 위에 떠 있는 HUD

- 설명: navigation은 content의 box가 아니라 배경/scene 위의 낮은 무게 control이어야 한다.
- AX 근거: absolute HUD와 slide-nav(AX `css:508-550,793-805`).
- AI_First_Step 근거: 동일.
- AI_Attitude 차이: topbar separator와 grid nav가 content를 app shell로 감싼다.
- 복원 중요도: **높음**.

## DNA-05 — Deck as a physical event

- 설명: 카드는 펼쳐지고, 겹치고, 떠오르고, 다시 stack order를 갖는다.
- AX 근거: transform origin, deal delay, hover z-index(AX `room.js:97-137`).
- AI_First_Step 근거: 동일.
- AI_Attitude 차이: decorative rotation이지만 no overlap/no deal/no selected state.
- 복원 중요도: **최상**.

## DNA-06 — Background is architecture

- 설명: canvas/vignette/overlay/ambient는 장식이 아니라 전경과 중경의 contrast를 만든다.
- AX 근거: `#bg-canvas`+vignette+scene layering(AX `css:280-302`).
- AI_First_Step 근거: 동일 + office/sunset palette.
- AI_Attitude 차이: ambient/grain은 있으나 Room/Box focal event와 분리.
- 복원 중요도: **높음**.

## DNA-07 — Semantic theme tokens

- 설명: light, radius, fonts, shadow, border가 하나의 skin token system으로 변한다.
- AX 근거: paper/neon/pixel/blueprint/sayu tokens.
- AI_First_Step 근거: office/sunset 확장.
- AI_Attitude 차이: 단일 amber/navy palette는 강점이지만 surface geometry token은 없다.
- 복원 중요도: **중간** — multi-skin이 아니라 최소 geometry/light token만 복원.

## DNA-08 — Typography as an exhibit object

- 설명: large title는 고립된 stage와 negative space를 받고, body는 그 아래에서 뒤로 물러난다.
- AX 근거: slide stage, watermark, max-width 34ch(AX `css:720-744`).
- AI_First_Step 근거: 동일.
- AI_Attitude 차이: title 다음 image/body/takeaway가 문서 sequence로 촘촘히 연결.
- 복원 중요도: **중간**.

## DNA-09 — Motion establishes causality

- 설명: scene enter → object reveal → deck deal → slide enter의 순서가 장소 이동을 느끼게 한다.
- AX 근거: scene/box/card/slide transitions.
- AI_First_Step 근거: 동일, calm scale 지원.
- AI_Attitude 차이: warp 이후 hash render가 즉시 교체된다.
- 복원 중요도: **높음**.

## DNA-10 — Mobile preserves the metaphor

- 설명: 화면 크기를 줄여도 핵심 metaphor(덱·floating control·soft object)는 남긴다.
- AX 근거: mobile에서도 fan card 축소/overlap 유지.
- AI_First_Step 근거: 동일.
- AI_Attitude 차이: card fan metaphor를 column list로 해제한다.
- 복원 중요도: **중간** — touch target 안전성과 함께 hybrid로 해결.

## 7. MUST RESTORE / HYBRID / KEEP CURRENT

### MUST RESTORE

1. Card Fan의 absolute anchor, overlap, rotate spread, deal stagger, hover stack order.
2. Room/Box surface의 soft geometry와 radial inner light/halo; border는 보조로 낮추기.
3. Room·Fan·Lesson을 잇는 scene-level depth와 transition choreography.
4. topbar/lesson nav의 app-like separator weight를 낮추고 floating HUD 성격 복원.
5. visual shell/image frame의 sharp 0-radius border dominance 완화.

### HYBRID

1. 기존 fan의 물성 + AI_Attitude의 semantic HTML button, keyboard focus, `aria-label`.
2. 기존 scene depth + 현재 12장의 photorealistic 16:9 imagery; 이미지를 card texture가 아니라 primary exhibit로 유지.
3. 기존 mobile metaphor + 현재 swipe/overflow safety: full overlap 대신 compact, accessible partial spread를 설계.
4. 기존 warm sayu glow token + 현재 amber/navy palette를 한 시스템으로 통합.
5. floating navigation 외관 + 현재 hash route/localStorage navigation reliability 유지.

### KEEP CURRENT

- 4 Box / 12 Lesson content architecture.
- 실사형 Lesson 이미지 12장과 natural Korean alt.
- keyboard, Escape hierarchy, swipe, focus treatment.
- `prefers-reduced-motion` global safety.
- responsive image containment/no horizontal overflow.
- localStorage progress와 public-safe static architecture.

## 8. 다음 구현 단계: 예상 영역만

구현은 이 단계에서 하지 않는다.

1. **Angular UI Audit** — `css/style.css`: `.button`, `.topbar`, `.progress-button`, `.room-card`, `.lesson-card`, `.visual-shell`, `.takeaway`의 0-radius/border/separator inventory.
2. **Start** — `css/style.css`, `js/intro.js`: `.view--start`, `.start__frame`, `.start__light`, `.warp`의 layer/transition 연결.
3. **Room** — `css/style.css`, `js/room.js`: `.room-grid`, `.room-card`, `.room-card__glow`, ambient/focal layering.
4. **Box** — `css/style.css`, `js/room.js`: box object geometry, radial pseudo-element, seen/progress state.
5. **Card Fan** — `css/style.css`, `js/room.js`: `.card-fan`, `.lesson-card`, deck transform data, stagger, selected/seen state, mobile spread.
6. **Lesson** — `css/style.css`, `js/slides.js`: `.lesson`, `.visual-shell`, `.lesson-visual`, `.lesson-nav`의 exhibition stage hierarchy.
7. **Animation / Glow** — `css/style.css`, `js/intro.js`, `js/main.js`: scene enter/exit, motion scale, `prefers-reduced-motion` parity.
8. **Final Visual QA** — desktop/tablet/mobile에서 Room, Fan, representative Lessons, keyboard/swipe/Escape, image crop/overflow 검증.

## 9. 검증 결론

AI_Attitude의 문제는 콘텐츠 구조가 아니라 **공간을 UI layout으로 번역한 방식**이다. 복원의 우선순위는 단순히 radius를 올리거나 border를 지우는 것이 아니다. `Room → Fan → Lesson`의 공간적 인과, card deck의 실제 물성, light가 만드는 layer, HUD의 낮은 시각 무게를 함께 되돌려야 기존 계열의 Design DNA가 살아난다. 동시에 현재의 이미지·접근성·안정적 navigation은 보존해야 한다.
