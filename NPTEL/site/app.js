/* ---------- helpers ---------- */
const $ = (s, r = document) => r.querySelector(s);
const app = $("#app");
const LS = {
  get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { } }
};
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const LET = "abcdefgh";
const LEVELS = { 1: "Easy", 2: "Medium", 3: "Hard" };
const TOPIC_BY_ID = Object.fromEntries(TOPICS.map(t => [t.id, t]));
const ASSIGN = QUESTIONS.filter(q => !q.x);

/* text formatter: escapes HTML, renders {{matrix}} blocks and newlines */
function fmt(s) {
  let h = esc(s);
  h = h.replace(/\{\{([^}]*)\}\}/g, (_, body) => {
    const rows = body.split("|").map(r => r.trim().split(/\s+/).filter(Boolean));
    const cols = Math.max(...rows.map(r => r.length));
    return '<span class="mat" style="grid-template-columns:repeat(' + cols + ',auto)">' + rows.map(r => r.map(c => "<i>" + c + "</i>").join("")).join("") + "</span>";
  });
  return h.replace(/\n/g, "<br>");
}
function shuffle(a) {
  a = a.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
const label = q => q.x ? "Extra" : "W" + q.w + " · Q" + q.id.replace(/^w\d+q/, "");
const answerText = q => {
  if (q.t === "NUM") return String(q.a);
  const idx = q.t === "MCQ" ? [q.a] : q.a;
  return idx.map(i => LET[i] + ") ").map((l, k) => l + fmt(q.o[idx[k]])).join("<br>");
};
const answerShort = q => q.t === "NUM" ? String(q.a) : (q.t === "MCQ" ? [q.a] : q.a).map(i => LET[i]).join(", ");

/* ---------- sub-title / routing ---------- */
$("#sub").textContent = ASSIGN.length + " assignment questions with solutions · " + (QUESTIONS.length - ASSIGN.length) + " extra practice · " + TOPICS.length + " key topics";
function route() {
  const r = (location.hash.replace(/^#\//, "") || "questions").split("?")[0];
  document.querySelectorAll("#tabs a").forEach(a => a.classList.toggle("on", a.dataset.tab === r));
  window.scrollTo(0, 0);
  stopTimer();
  if (r === "quiz") renderQuizHome();
  else if (r === "topics") renderTopics();
  else renderQuestions();
}
window.addEventListener("hashchange", route);

/* ====================================================================
   Question card (static display, used by All Questions + Topics)
   ==================================================================== */
function cardHTML(q, opts) {
  opts = opts || {};
  const ms = q.t === "MSQ";
  let h = '<div class="q card' + (opts.mini ? " mini" : "") + '" id="c-' + q.id + '" data-id="' + q.id + '">';
  h += '<div class="q-head"><span class="chip' + (q.x ? " extra" : "") + '">' + label(q) + '</span>' +
    '<span class="chip">' + q.t + '</span><span class="chip l' + q.d + '">' + LEVELS[q.d] + '</span>' +
    (TOPIC_BY_ID[q.tp] && !opts.noTopic ? '<span class="chip" style="background:transparent;color:var(--muted)">' + esc(TOPIC_BY_ID[q.tp].title.split(/[:,&]/)[0]) + '</span>' : "") + '</div>';
  h += '<p class="q-text">' + fmt(q.q) + '</p>';
  if (ms) h += '<div class="hint-line">One or more options may be correct.</div>';
  if (q.o) {
    h += '<ul class="opts">';
    q.o.forEach((o, i) => {
      h += '<li class="opt" data-i="' + i + '"><span class="lt">' + LET[i] + ')</span><span class="tx">' + fmt(o) + '</span><span class="mk"></span></li>';
    });
    h += "</ul>";
  }
  h += '<div style="margin-top:12px"><button class="btn primary" data-act="toggle">Show answer</button></div>';
  h += '<div class="sol hide"><b>Correct answer: <span class="ans">' + (q.t === "NUM" ? esc(String(q.a)) : esc(answerShort(q))) + '</span></b><br><br>' +
    fmt(q.s) + (q.note ? '<div class="note">⚠ ' + esc(q.note) + '</div>' : "") + '</div>';
  return h + "</div>";
}
function wireCards(root) {
  root.addEventListener("click", e => {
    const b = e.target.closest('[data-act="toggle"]');
    if (!b) return;
    const card = b.closest(".q");
    setReveal(card, card.querySelector(".sol").classList.contains("hide"));
  });
}
function setReveal(card, show) {
  const q = QUESTIONS.find(x => x.id === card.dataset.id);
  card.querySelector(".sol").classList.toggle("hide", !show);
  const btn = card.querySelector('[data-act="toggle"]');
  if (btn) btn.textContent = show ? "Hide answer" : "Show answer";
  const correct = q.t === "MCQ" ? [q.a] : (q.t === "MSQ" ? q.a : []);
  card.querySelectorAll(".opt").forEach(o => {
    const ok = correct.includes(+o.dataset.i);
    o.classList.toggle("right", show && ok);
    o.querySelector(".mk").textContent = show && ok ? "✓" : "";
  });
}

/* ====================================================================
   ALL QUESTIONS
   ==================================================================== */
const QS = { week: "all", type: "all", text: "", extra: false, all: false };
function renderQuestions() {
  app.innerHTML = '<h2>All Questions with Answers</h2>' +
    '<p class="lead">Every question from Weeks 1–12 of your assignments, with the correct option and the detailed solution.</p>' +
    '<div class="weekchips" id="wk"></div>' +
    '<div class="bar card">' +
    '<input type="search" id="qs" placeholder="Search questions (e.g. homography, SIFT, PCA)…" value="' + esc(QS.text) + '">' +
    '<select id="qt"><option value="all">All types</option><option>MCQ</option><option>MSQ</option><option>NUM</option></select>' +
    '<label><input type="checkbox" id="qx"> Include extra practice</label>' +
    '<label><input type="checkbox" id="qa"> Show all answers</label>' +
    '</div><div class="count" id="qc"></div><div id="ql"></div>';
  const wk = $("#wk");
  const weeks = ["all"].concat(Array.from({ length: 12 }, (_, i) => i + 1));
  wk.innerHTML = weeks.map(w => '<button data-w="' + w + '" class="' + (String(w) === String(QS.week) ? "on" : "") + '">' + (w === "all" ? "All weeks" : "Week " + w) + '</button>').join("");
  wk.onclick = e => { const b = e.target.closest("button"); if (!b) return; QS.week = b.dataset.w; wk.querySelectorAll("button").forEach(x => x.classList.toggle("on", x === b)); draw(); };
  $("#qt").value = QS.type; $("#qx").checked = QS.extra; $("#qa").checked = QS.all;
  $("#qs").oninput = e => { QS.text = e.target.value; draw(); };
  $("#qt").onchange = e => { QS.type = e.target.value; draw(); };
  $("#qx").onchange = e => { QS.extra = e.target.checked; draw(); };
  $("#qa").onchange = e => { QS.all = e.target.checked; draw(); };
  wireCards($("#ql"));
  draw();
  function draw() {
    const t = QS.text.trim().toLowerCase();
    const list = QUESTIONS.filter(q =>
      (QS.extra || !q.x) &&
      (QS.week === "all" || q.w === +QS.week) &&
      (QS.type === "all" || q.t === QS.type) &&
      (!t || (q.q + " " + (q.o || []).join(" ") + " " + q.s).toLowerCase().includes(t)));
    $("#qc").textContent = list.length + " question" + (list.length === 1 ? "" : "s");
    const STEP = 20;
    let shown = 0;
    const box = $("#ql");
    box.innerHTML = list.length ? "" : '<div class="card q">No questions match your filter.</div>';
    const more = document.createElement("div");
    more.style.textAlign = "center";
    function addChunk() {
      const part = list.slice(shown, shown + STEP);
      shown += part.length;
      more.remove();
      const tmp = document.createElement("div");
      tmp.innerHTML = part.map(q => cardHTML(q)).join("");
      const cards = Array.from(tmp.children);
      cards.forEach(c => { box.appendChild(c); if (QS.all) setReveal(c, true); });
      if (shown < list.length) {
        more.innerHTML = '<button class="btn primary">Show next ' + Math.min(STEP, list.length - shown) + ' of ' + (list.length - shown) + ' remaining</button>';
        more.firstChild.onclick = addChunk;
        box.appendChild(more);
      }
    }
    if (list.length) addChunk();
  }
}

/* ====================================================================
   IMPORTANT TOPICS
   ==================================================================== */
const TS = { only3: false };
function renderTopics() {
  app.innerHTML = '<h2>Important Topics with Practice Questions</h2>' +
    '<p class="lead">Topics ordered week by week. ★★★ = highest exam priority. Open a topic to see key points, formulas and its questions (assignment questions first, then extra practice).</p>' +
    '<div class="bar card"><label><input type="checkbox" id="t3"> Show only ★★★ topics</label>' +
    '<button class="btn" id="tall">Expand all</button><button class="btn" id="tnone">Collapse all</button></div><div id="tl"></div>';
  $("#t3").checked = TS.only3;
  $("#t3").onchange = e => { TS.only3 = e.target.checked; draw(); };
  $("#tall").onclick = () => document.querySelectorAll("#tl details").forEach(d => d.open = true);
  $("#tnone").onclick = () => document.querySelectorAll("#tl details").forEach(d => d.open = false);
  wireCards($("#tl"));
  draw();
  function draw() {
    $("#tl").innerHTML = TOPICS.filter(t => !TS.only3 || t.stars === 3).map(t => {
      const qs = QUESTIONS.filter(q => q.tp === t.id).sort((a, b) => (a.x ? 1 : 0) - (b.x ? 1 : 0) || a.w - b.w);
      return '<details class="topic card"><summary><span class="t-title">' + esc(t.title) + '</span>' +
        '<span class="chip">' + esc(t.weeks) + '</span><span class="stars">' + "★".repeat(t.stars) + "☆".repeat(3 - t.stars) + '</span>' +
        '<span class="chip">' + qs.length + ' Qs</span></summary><div class="body">' +
        '<div class="why">' + esc(t.why) + '</div>' +
        '<h4>Key points</h4><ul>' + t.points.map(p => "<li>" + esc(p) + "</li>").join("") + '</ul>' +
        '<h4>Formulas</h4><div class="formulas">' + t.formulas.map(f => "<code>" + esc(f) + "</code>").join("") + '</div>' +
        (t.tip ? '<div class="tip">💡 ' + esc(t.tip) + '</div>' : "") +
        '<h4>Practice questions (' + qs.length + ')</h4>' + qs.map(q => cardHTML(q, { mini: true, noTopic: true })).join("") +
        '</div></details>';
    }).join("");
  }
}

/* ====================================================================
   QUIZ
   ==================================================================== */
let timer = null;
function stopTimer() { if (timer) { clearInterval(timer); timer = null; } }
const mmss = s => String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0");

function renderQuizHome() {
  const best = LS.get("cv_best", {});
  const size = LS.get("cv_size", 10);
  const pool = l => QUESTIONS.filter(q => q.d === l).length;
  const desc = {
    1: "Definitions, formula recall and quick one-step calculations.",
    2: "Typical assignment-style problems: one or two calculation steps.",
    3: "Multi-step numericals (matrices, Otsu, equalization, epipolar geometry…)."
  };
  app.innerHTML = '<h2>Mini NPTEL-style Quiz</h2>' +
    '<p class="lead">Pick a level. Every attempt draws a fresh random set from the question bank and shuffles both the question order and the options. Each question carries 2 marks (MSQ: all-or-nothing, numeric: within tolerance), no negative marking.</p>' +
    '<div class="setup card"><b>Questions per run:</b> <select id="sz">' + [10, 15, 20, 30].map(n => '<option' + (n === size ? " selected" : "") + '>' + n + '</option>').join("") + '</select>' +
    '<span class="count" style="margin:0">Questions you answered correctly are shown less often until the pool is used up.</span></div>' +
    '<div class="levels">' + [1, 2, 3].map(l =>
      '<div class="card level"><span class="chip l' + l + '" style="align-self:flex-start">Level ' + l + '</span><h3>' + LEVELS[l] + '</h3><p>' + desc[l] + '</p>' +
      '<div class="best">Pool: ' + pool(l) + ' questions' + (best[l] ? ' · Best: ' + best[l].pct + '%' : "") + (best[l] ? ' · Attempts: ' + best[l].n : "") + '</div>' +
      '<button class="btn primary" data-lv="' + l + '">Start Level ' + l + '</button></div>').join("") + '</div>';
  $("#sz").onchange = e => LS.set("cv_size", +e.target.value);
  app.querySelectorAll("[data-lv]").forEach(b => b.onclick = () => startQuiz(+b.dataset.lv, +$("#sz").value));
}

let Z = null;   // current quiz state
function startQuiz(level, n) {
  const seen = LS.get("cv_seen", {});
  let pool = QUESTIONS.filter(q => q.d === level);
  const fresh = pool.filter(q => !seen[q.id]);
  const old = pool.filter(q => seen[q.id]);
  let pick = shuffle(fresh).slice(0, n);
  if (pick.length < n) {
    // pool of unseen exhausted -> reset memory for this level and top up
    pick = pick.concat(shuffle(old).slice(0, n - pick.length));
    pool.forEach(q => delete seen[q.id]);
    LS.set("cv_seen", seen);
  }
  pick = shuffle(pick);
  Z = {
    level, start: Date.now(), cur: 0, done: false,
    items: pick.map(q => {
      const pin = q.o && q.o.some(o => /above|both|neither|all of/i.test(o)) || (q.o && q.o.length < 3);
      const order = q.o ? (pin ? q.o.map((_, i) => i) : shuffle(q.o.map((_, i) => i))) : null;
      return { q, order, sel: [], num: "", flag: false };
    })
  };
  timer = setInterval(() => { const e = $("#tm"); if (e && Z && !Z.done) e.textContent = mmss(Math.floor((Date.now() - Z.start) / 1000)); }, 1000);
  drawQuiz();
}

function isCorrect(it) {
  const q = it.q;
  if (q.t === "NUM") {
    const v = parseFloat(String(it.num).replace(",", "."));
    if (isNaN(v)) return false;
    return Math.abs(v - q.a) <= (q.tol != null ? q.tol : 0.011);
  }
  const given = it.sel.map(p => it.order[p]).sort().join(",");
  const want = (q.t === "MCQ" ? [q.a] : q.a).slice().sort().join(",");
  return given === want;
}
const answered = it => it.q.t === "NUM" ? String(it.num).trim() !== "" : it.sel.length > 0;

function drawQuiz() {
  const it = Z.items[Z.cur], q = it.q, n = Z.items.length;
  const doneCount = Z.items.filter(answered).length;
  let h = '<div class="qz-top"><div><span class="chip l' + Z.level + '">Level ' + Z.level + ' · ' + LEVELS[Z.level] + '</span><b>Question ' + (Z.cur + 1) + ' of ' + n + '</b></div>' +
    '<div><span class="chip" id="tm">' + mmss(Math.floor((Date.now() - Z.start) / 1000)) + '</span><span class="chip">' + doneCount + '/' + n + ' answered</span></div></div>' +
    '<div class="progress"><i style="width:' + (doneCount / n * 100) + '%"></i></div>' +
    '<div class="qz-grid"><div>';
  h += '<div class="q card"><div class="q-head"><span class="chip">' + q.t + '</span><span class="chip">2 marks</span>' +
    (TOPIC_BY_ID[q.tp] ? '<span class="chip" style="background:transparent;color:var(--muted)">' + esc(TOPIC_BY_ID[q.tp].title.split(/[:,&]/)[0]) + '</span>' : "") + '</div>' +
    '<p class="q-text">' + fmt(q.q) + '</p>';
  if (q.t === "MSQ") h += '<div class="hint-line">Select ALL correct options.</div>';
  if (q.t === "NUM") {
    h += '<input class="num-in" id="num" inputmode="decimal" placeholder="Type your answer" value="' + esc(it.num) + '">';
  } else {
    h += '<ul class="opts">' + it.order.map((oi, p) =>
      '<li class="opt pick' + (it.sel.includes(p) ? " sel" : "") + '" data-p="' + p + '"><span class="lt">' + LET[p] + ')</span><span class="tx">' + fmt(q.o[oi]) + '</span></li>').join("") + '</ul>';
  }
  h += '</div><div class="qz-nav"><button class="btn" id="prev"' + (Z.cur === 0 ? " disabled" : "") + '>← Previous</button>' +
    '<button class="btn ghost" id="clr">Clear</button><button class="btn ghost" id="flg">' + (it.flag ? "★ Marked" : "☆ Mark for review") + '</button><span class="sp"></span>' +
    (Z.cur < n - 1 ? '<button class="btn primary" id="next">Next →</button>' : "") +
    '<button class="btn ' + (Z.cur === n - 1 ? "primary" : "") + '" id="fin">Submit quiz</button></div></div>';
  h += '<aside class="card pal"><h4>Question palette</h4><div class="cells">' + Z.items.map((x, i) =>
    '<button data-g="' + i + '" class="' + (answered(x) ? "done " : "") + (x.flag ? "flag " : "") + (i === Z.cur ? "cur" : "") + '">' + (i + 1) + '</button>').join("") + '</div>' +
    '<div class="legend">Green = answered · Orange = marked for review</div></aside></div>';
  app.innerHTML = h;
  window.scrollTo(0, 0);

  app.querySelectorAll(".opt.pick").forEach(o => o.onclick = () => {
    const p = +o.dataset.p;
    if (q.t === "MCQ") it.sel = [p];
    else it.sel = it.sel.includes(p) ? it.sel.filter(x => x !== p) : it.sel.concat(p);
    keepScroll(drawQuiz);
  });
  const ni = $("#num"); if (ni) ni.oninput = e => { it.num = e.target.value; refreshPalette(); };
  $("#prev").onclick = () => { Z.cur--; drawQuiz(); };
  const nx = $("#next"); if (nx) nx.onclick = () => { Z.cur++; drawQuiz(); };
  $("#clr").onclick = () => { it.sel = []; it.num = ""; drawQuiz(); };
  $("#flg").onclick = () => { it.flag = !it.flag; keepScroll(drawQuiz); };
  $("#fin").onclick = () => {
    const left = Z.items.filter(x => !answered(x)).length;
    if (left && !confirm(left + " question(s) are unanswered. Submit anyway?")) return;
    finishQuiz();
  };
  app.querySelectorAll("[data-g]").forEach(b => b.onclick = () => { Z.cur = +b.dataset.g; drawQuiz(); });
}
function keepScroll(fn) { const y = window.scrollY; fn(); window.scrollTo(0, y); }
function refreshPalette() {
  const it = Z.items[Z.cur];
  const b = app.querySelector('[data-g="' + Z.cur + '"]'); if (b) b.classList.toggle("done", answered(it));
}

function finishQuiz() {
  Z.done = true; stopTimer();
  const secs = Math.floor((Date.now() - Z.start) / 1000);
  const n = Z.items.length;
  const ok = Z.items.filter(isCorrect).length;
  const pct = Math.round(ok / n * 100);
  const skipped = Z.items.filter(x => !answered(x)).length;
  // remember which questions were answered correctly
  const seen = LS.get("cv_seen", {});
  Z.items.forEach(it => { if (isCorrect(it)) seen[it.q.id] = 1; });
  LS.set("cv_seen", seen);
  const best = LS.get("cv_best", {});
  const b = best[Z.level] || { pct: 0, n: 0 };
  best[Z.level] = { pct: Math.max(b.pct, pct), n: b.n + 1 };
  LS.set("cv_best", best);

  const msg = pct >= 80 ? "Excellent! You are exam-ready for this level." : pct >= 50 ? "Good progress – review the mistakes below." : "Keep going – revise the topics and retry.";
  let h = '<div class="score-box card"><div class="meta">Level ' + Z.level + ' · ' + LEVELS[Z.level] + '</div><div class="big">' + ok * 2 + ' / ' + n * 2 + '</div>' +
    '<div class="meta">' + pct + '% · ' + msg + '</div><div class="stats"><span class="chip ok">' + ok + ' correct</span><span class="chip bad">' + (n - ok - skipped) + ' wrong</span>' +
    '<span class="chip">' + skipped + ' skipped</span><span class="chip">⏱ ' + mmss(secs) + '</span></div>' +
    '<div class="qz-nav" style="justify-content:center"><button class="btn primary" id="again">Retry Level ' + Z.level + ' (new random set)</button><button class="btn" id="home">Choose another level</button></div></div>';
  h += '<h2>Review</h2>';
  Z.items.forEach((it, i) => {
    const q = it.q, good = isCorrect(it), want = q.t === "MCQ" ? [q.a] : (q.t === "MSQ" ? q.a : []);
    h += '<div class="q card"><div class="q-head"><span class="chip">Q' + (i + 1) + '</span><span class="chip">' + q.t + '</span>' +
      '<span class="chip ' + (good ? "ok" : "bad") + '">' + (good ? "Correct" : (answered(it) ? "Wrong" : "Skipped")) + '</span>' +
      '<span class="chip' + (q.x ? " extra" : "") + '">' + label(q) + '</span></div><p class="q-text">' + fmt(q.q) + '</p>';
    if (q.t === "NUM") {
      h += '<div class="opt ' + (good ? "right" : "wrong") + '"><span class="tx">Your answer: <b>' + (esc(String(it.num).trim()) || "—") + '</b></span></div>';
    } else {
      h += '<ul class="opts">' + it.order.map((oi, p) => {
        const isW = want.includes(oi), isS = it.sel.includes(p);
        const cls = isW ? "right" : (isS ? "wrong" : "");
        return '<li class="opt ' + cls + '"><span class="lt">' + LET[p] + ')</span><span class="tx">' + fmt(q.o[oi]) + '</span><span class="mk">' + (isW ? "✓" : "") + (isS ? (isW ? " (yours)" : "✗ (yours)") : "") + '</span></li>';
      }).join("") + '</ul>';
    }
    h += '<div class="sol"><b>Correct answer: <span class="ans">' + (q.t === "NUM" ? esc(String(q.a)) : esc(it.order.map((oi, p) => want.includes(oi) ? LET[p] : "").filter(Boolean).join(", "))) + '</span></b><br><br>' +
      fmt(q.s) + (q.note ? '<div class="note">⚠ ' + esc(q.note) + '</div>' : "") + '</div></div>';
  });
  app.innerHTML = h;
  window.scrollTo(0, 0);
  $("#again").onclick = () => startQuiz(Z.level, n);
  $("#home").onclick = () => { location.hash = "#/quiz"; renderQuizHome(); };
}

route();
