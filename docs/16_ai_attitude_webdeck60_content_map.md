# AI Attitude — AX Web Deck 60 Content Map

> Canonical Application Record · 2026-09-11

## Application

| Field | Canonical value |
| --- | --- |
| Format | AX Web Deck 60 |
| Section Navigator | `none` |
| Resume | `false` |
| Completion | Callback |
| Golden Base | Direction A |

The current implementation is a two-section, 19-slide deck with a separate Opening scene. `sectionNavigator: "none"` and `resume: false` are the values consumed by `js/deck-main.js` and `js/slides.js`.

## Content source and preservation rule

The canonical content source is `js/data.js`; `js/slides.js` is the auxiliary renderer and consumes each supplied `alt` field. The current source does not contain a separate image-alt dictionary, so the per-slide `alt` values in `js/data.js` are the canonical image-alt record. The twelve original lesson assets in `assets/lessons/lesson-01.webp` through `lesson-12.webp` remain the visual source.

The preservation baseline is each lesson's title, message/caption, takeaway/recap wording, image, and alt text. Presentation layout may change hierarchy, line breaks, and image treatment, but it must not change a lesson's meaning or invent a new case.

## Opening and Callback

Opening seed, as implemented by the first section cover:

> AI가 일을 해주면, 나는 무엇을 맡아야 할까?

The Closing is a callback, not a new claim. Its title returns to Lesson 1's message: “AI는 손을 돕고, 방향은 내가 정한다.” Its implemented teaser recalls the opening seed and Lesson 12's review principle: AI may organize, while the person checks whether it matches reality.

## Confirmed 19-slide rhythm

| # | Content | Target type |
| ---: | --- | --- |
| 1 | 맡기기 전에 세우는 기준 | Section |
| 2 | 운전석은 누구인가 | Image-led Concept |
| 3 | 먼저 그려야 할 지도 | Map / Flow Concept |
| 4 | 이해의 최소선 | Statement |
| 5 | 이유를 적어둔다 | Decision Point |
| 6 | 흐름을 말해본다 | Flow Case |
| 7 | 끝의 모습을 정한다 | Evidence / Checklist |
| 8 | 목적은 모든 선택의 기준점이다 | Key Message |
| 9 | 여기까지, 여섯 가지 | Recap |
| 10 | 맡긴 뒤 확인하고 남기는 것 | Section |
| 11 | 세 개의 잣대 | Evidence |
| 12 | 직접 눌러본다 | Verification Case |
| 13 | 문제를 좁힌다 | Compare / Case |
| 14 | 답도 이해해야 한다 | Statement |
| 15 | 다음의 나에게 | Record |
| 16 | 기록을 검토한다 | Evidence / Review |
| 17 | 기대와 실제의 차이로 범위를 먼저 좁힌다 | Key Message |
| 18 | 여기까지, 또 여섯 가지 | Recap |
| 19 | AI는 손을 돕고, 방향은 내가 정한다 | Closing |

The Opening scene sits before slide 1. The presentation rhythm is therefore Opening → Section 1 → slides 2–9 → Section 2 → slides 11–18 → Closing.

## Why 19 slides remain

The Canonical 60 Profile's 10–14 range is a recommendation, not a forced limit. The existing twelve lesson messages take priority; one lesson is not required to equal one slide, and slide count is not lecture duration. No lesson is deleted to fit a count. Any compression decision is deferred until an actual 60-minute rehearsal.
