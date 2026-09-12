/* =========================================================================
   data.js — AI Attitude Web Deck 60 (AX Web Deck Standard v0.1)
   -------------------------------------------------------------------------
   콘텐츠는 legacy(AI_Attitude_legacy_20260911/js/data.js EXHIBITION)의 실제
   원고를 그대로 옮겼다 — title/message/takeaway/이미지/alt 전부 가공 없이
   재사용했다. 매핑 근거: docs/16_ai_attitude_webdeck60_content_map.md
   Profile: Duration 60 · sectionNavigator none · resume false · Completion Variant B
   ========================================================================= */
window.DECK = {
  meta: {
    id: "ai-attitude-webdeck60",
    title: "AI를 대하는 태도",
    titleHtml: "AI를<br>대하는 태도",
    kicker: "AI를 대하는 태도",
    subtitle: "AI에게 일을 맡기기 전에, 먼저 가져야 할 기준을 살펴봅니다.",
    note: "12가지 기준 · 약 60분"
  },
  presentation: {
    sectionNavigator: "none",
    resume: false
  },
  sections: [
    {
      id: "before", title: "맡기기 전에 세우는 기준", tagline: "주도권과 이해, 목적·흐름·완료 기준", accent: 0,
      slides: [
        {
          type: "cover", kicker: "AI가 일을 해주면, 나는 무엇을 맡아야 할까?",
          title: "맡기기 전에 세우는 기준",
          subtitle: "주도권과 이해, 그리고 목적 · 흐름 · 완료 기준"
        },
        {
          type: "image", title: "운전석은 누구인가",
          src: "assets/lessons/lesson-01.webp",
          alt: "운전대를 잡은 사람 옆에서 AI 로봇이 지도를 안내하는 모습",
          caption: "AI는 손을 돕고, 방향은 내가 정한다.",
          layout: "feature"
        },
        {
          type: "image", title: "지도부터 먼저 그립니다",
          src: "assets/lessons/lesson-02.webp",
          alt: "큰 지도 위에서 주요 경로를 함께 설계하는 사람과 AI 로봇",
          caption: "완벽한 설계보다 큰 흐름을 먼저 잡는다.",
          layout: "flow"
        },
        {
          type: "image", title: "어디까지 알면 될까",
          src: "assets/lessons/lesson-03.webp",
          alt: "하나의 경로가 여러 단계에서 다양한 방향으로 갈라지는 지도를 사람과 AI가 살펴보는 모습",
          caption: "무엇 · 순서 · 변화 지점을 설명할 수 있으면 된다.",
          layout: "statement"
        },
        {
          type: "image", title: "이유를 적어둔다",
          src: "assets/lessons/lesson-04.webp",
          alt: "하나의 목적지를 향해 선택의 기준을 확인하는 사람과 AI 로봇",
          caption: "무엇을 위한 일인지 먼저 정합니다.",
          layout: "decision",
          marker: "DECISION · PURPOSE"
        },
        {
          type: "image", title: "흐름을 말해본다",
          src: "assets/lessons/lesson-05.webp",
          alt: "예상한 경로와 실제 흐름을 나란히 비교하는 사람과 AI 로봇",
          caption: "예상한 흐름과 실제 흐름을 나란히 비교해 봅니다.",
          layout: "flow-case"
        },
        {
          type: "image", title: "끝의 모습을 정한다",
          src: "assets/lessons/lesson-06.webp",
          alt: "완성된 목적지와 여러 완료 지점을 확인하는 사람과 AI 로봇",
          caption: "완료 기준은 보거나 눌러 확인할 수 있어야 한다.",
          layout: "evidence"
        },
        {
          type: "quote", text: "이유를 알아야, 방향이 흔들리지 않는다.", by: "이유를 적어둔다"
        },
        {
          type: "bullets", title: "여기까지, 여섯 가지", subtitle: "맡기기 전에 세운 기준",
          items: [
            "방향을 정하는 사람을 잊지 않는다.",
            "작업 전, 시작과 끝을 한 문장씩 적는다.",
            "무엇 · 순서 · 변화를 내 말로 말해본다.",
            "요청 앞에 “그래서 무엇을 위해?”를 붙인다.",
            "누군가의 첫 행동부터 마지막 행동까지 따라가 본다.",
            "완료를 눈으로 확인할 수 있는 문장으로 바꾼다."
          ]
        }
      ]
    },
    {
      id: "after", title: "맡긴 뒤 확인하고 남기는 것", tagline: "검증과 원인 찾기, 이해·재질문·기록·검토", accent: 1,
      slides: [
        {
          type: "cover", kicker: "Section 2",
          title: "맡긴 뒤 확인하고 남기는 것",
          subtitle: "검증과 원인 찾기, 그리고 이해 · 재질문 · 기록 · 검토"
        },
        {
          type: "image", title: "세 가지로 확인한다",
          src: "assets/lessons/lesson-07.webp",
          alt: "세 가지 기준으로 하나의 결과를 함께 살펴보는 사람과 AI 로봇",
          caption: "목적 · 흐름 · 완료 기준, 이 세 가지를 나란히 놓고 봅니다.",
          layout: "evidence",
          marker: "EVIDENCE · 03"
        },
        {
          type: "image", title: "직접 눌러본다",
          src: "assets/lessons/lesson-08.webp",
          alt: "사람이 직접 경로를 실행하며 AI 로봇과 반응을 확인하는 모습",
          caption: "설명을 읽는 일과 직접 실행하는 일은 다르다.",
          layout: "verification"
        },
        {
          type: "image", title: "문제를 좁힌다",
          src: "assets/lessons/lesson-09.webp",
          alt: "넓은 지도에서 문제 지점을 확대해 추적하는 사람과 AI 로봇",
          caption: "기대와 실제의 차이로 범위를 먼저 좁힌다.",
          layout: "compare",
          marker: "COMPARE · EXPECTED / ACTUAL"
        },
        {
          type: "image", title: "답도 이해해야 한다",
          src: "assets/lessons/lesson-10.webp",
          alt: "질문을 거듭해 더 분명한 답에 다가가는 사람과 AI 로봇",
          caption: "이해될 때까지 다시 묻는 것이 관리의 시작입니다.",
          layout: "statement"
        },
        {
          type: "image", title: "다음의 나에게",
          src: "assets/lessons/lesson-11.webp",
          alt: "목적과 흐름, 막힌 이유를 기록으로 남기는 사람과 AI 로봇",
          caption: "목적 · 흐름 · 막힌 이유 세 가지만 남긴다.",
          layout: "record",
          marker: "RECORD · 03"
        },
        {
          type: "image", title: "기록을 검토한다",
          src: "assets/lessons/lesson-12.webp",
          alt: "AI가 정리한 기록을 사람이 다시 대조해 검토하는 모습",
          caption: "AI가 정리하고, 나는 실제와 맞는지 검토한다.",
          layout: "review"
        },
        {
          type: "quote", text: "기대와 실제의 차이로 범위를 먼저 좁힌다.", by: "문제를 좁힌다"
        },
        {
          type: "bullets", title: "여기까지, 또 여섯 가지", subtitle: "맡긴 뒤 확인하고 남긴 것",
          items: [
            "검증할 때 세 기준을 나란히 놓는다.",
            "결과를 읽기 전에 한 번 직접 움직여 본다.",
            "“기대”와 “실제”를 한 줄씩 분리해 적는다.",
            "“왜 이렇게 되는가?”를 한 번 더 묻는다.",
            "세 문장으로 오늘의 흔적을 남긴다.",
            "정리본은 항상 실제와 한 번 더 대조해 본다."
          ]
        },
        {
          type: "closing",
          title: "AI는 손을 돕고, 방향은 내가 정한다",
          teaser: "“AI가 일을 해주면, 나는 무엇을 맡아야 할까?” — 열두 가지를 지나오는 동안 답은 한 번도 바뀌지 않았습니다. 정리는 AI에게 맡기되, 실제와 맞는지 마지막으로 확인하는 사람은 나입니다."
        }
      ]
    }
  ]
};
