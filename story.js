// ========================================
// MoshiMo 共通 Story Script v0.1
// ========================================

const STORAGE_KEY = "moshimo_yumeno_answers";

// ------------------------
// 回答取得
// ------------------------
function getAnswers() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch (e) {
    return [];
  }
}

// ------------------------
// 回答保存
// ------------------------
function saveAnswer(storyId, title, answer) {

  const answers = getAnswers().filter(a => a.id !== storyId);

  answers.push({
    id: storyId,
    title: title,
    answer: answer,
    time: new Date().toLocaleString("ja-JP")
  });

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(answers)
  );

  renderAnswerLog();
}

// ------------------------
// 回答ログ描画
// ------------------------
function renderAnswerLog() {

  const area = document.getElementById("answerList");

  if (!area) return;

  const answers = getAnswers();

  if (answers.length === 0) {

    area.innerHTML =
      '<div class="row">まだ回答がありません。</div>';

    return;
  }

  area.innerHTML = answers.map(a => `
    <div class="row">
      <strong>${a.title}</strong><br>
      ${a.answer}<br>
      <small>${a.time}</small>
    </div>
  `).join("");

}

// ------------------------
// アンケート初期化
// ------------------------
function initPoll(storyId, title) {

  const poll = document.getElementById("poll");

  if (!poll) return;

  const options =
    document.querySelectorAll(".option");

  const note =
    document.getElementById("note");

  const next =
    document.getElementById("nextBtn");

  options.forEach(option => {

    option.addEventListener("click", () => {

      options.forEach(o => {

        o.classList.remove("selected");

      });

      option.classList.add("selected");

      poll.classList.add("voted");

      options.forEach(o => {

        const fill =
          o.querySelector(".fill");

        if (fill) {

          fill.style.width =
            o.dataset.pct + "%";

        }

      });

      if (note) {

        note.classList.add("show");

      }

      if (next) {

        next.classList.add("show");

      }

      saveAnswer(

        storyId,

        title,

        option.dataset.text

      );

    });

  });

}

// ------------------------
// 回答ログ
// ------------------------
function initAnswerSheet() {

  const open =
    document.getElementById("answersBtn");

  const close =
    document.getElementById("closeSheet");

  const sheet =
    document.getElementById("sheet");

  if (open && sheet) {

    open.addEventListener("click", () => {

      sheet.classList.add("show");

    });

  }

  if (close && sheet) {

    close.addEventListener("click", () => {

      sheet.classList.remove("show");

    });

  }

}

// ------------------------
// ストーリー遷移
// ------------------------
function initNavigation(prevPage, nextPage) {

  const prev =
    document.getElementById("prevBtn");

  const next =
    document.getElementById("nextBtn");

  if (prev && prevPage) {

    prev.addEventListener("click", () => {

      location.href = prevPage;

    });

  }

  if (next && nextPage) {

    next.addEventListener("click", () => {

      location.href = nextPage;

    });

  }

}

// ------------------------
// 初期化
// ------------------------
function initStory(config) {

  initPoll(

    config.id,

    config.title

  );

  initAnswerSheet();

  initNavigation(

    config.prev,

    config.next

  );

  renderAnswerLog();

}