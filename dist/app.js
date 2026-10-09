"use strict";
(() => {
  const data = window.EXPLORER_DATA;
  const state = { view: "explore", selected: new Set(["eme", "ece"]), interests: new Set(), abilities: new Set(), completed: new Set(), focus: "common" };
  const el = id => document.getElementById(id);
  const escape = value => String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  const byId = id => data.programmes.find(p => p.id === id);
  const sourceById = id => data.sources.find(s => s.id === id);
  const list = items => `<ul>${items.map(item => `<li>${escape(item)}</li>`).join("")}</ul>`;
  const link = (source, label = source.title) => `<a href="${escape(source.url)}" target="_blank" rel="noopener noreferrer">${escape(label)}</a>`;
  const references = ids => ids.map(id => link(sourceById(id))).join(" · ");
  const filtered = () => data.programmes.filter(p =>
    (!state.interests.size || p.interests.some(id => state.interests.has(id))) &&
    (!state.abilities.size || p.abilities.some(id => state.abilities.has(id)))
  );
  const visibleTasks = () => [...data.commonTasks, ...(data.majorTasks[state.focus] || [])];
  const preparation = window.createPreparation({ state, escape, references, repaint: renderChecklist });

  function renderFilterOptions() {
    for (const group of ["interests", "abilities"]) {
      el(group === "interests" ? "interest-options" : "ability-options").innerHTML = data[group].map(item =>
        `<label class="check-option"><input type="checkbox" data-filter="${group}" value="${item.id}" ${state[group].has(item.id) ? "checked" : ""}><span>${escape(item.label)}</span></label>`
      ).join("");
    }
  }

  function renderProgrammes() {
    const programmes = filtered();
    el("result-count").textContent = `顯示 ${programmes.length} / ${data.programmes.length} 科`;
    el("empty-state").hidden = programmes.length !== 0;
    el("programme-grid").innerHTML = programmes.map(p => `<article class="programme-card" style="--card-color:${p.color}">
      <div class="card-top"><span class="course-code">${p.code}</span><span class="state-tag ${p.planned ? "planned" : ""}">${p.planned ? "擬開辦 · 2028/29" : "既有課程"}</span></div>
      <h3>${escape(p.name)}</h3><p class="english-name">${escape(p.english)}</p>
      <p class="course-purpose">${escape(p.purpose)}</p><p class="course-learn">${escape(p.learn)}</p>
      <dl class="course-requirements"><dt>數學</dt><dd>${escape(p.mathShort)}</dd><dt>程式</dt><dd>${escape(p.codingShort)}</dd></dl>
      <details><summary>課程、出路與 AI 影響</summary><div class="detail-body">
        <h4>官方課程例子</h4>${list(p.courses)}<p class="source-line">${escape(p.syllabus)}<br>${references(p.sources)}</p>
        <h4>數學與程式需求 · 本站歸納</h4><p>${escape(p.math)}</p><p>${escape(p.coding)}</p>
        <h4>典型出路 · 方向歸納</h4>${list(p.careers)}<p class="source-line">不是職位、薪酬或專業資格保證；具體路徑視專修、經驗及所在地要求而定。</p>
        <div class="inference"><strong>AI / LLM 影響 · 分析判斷</strong>${escape(p.ai)}<p class="source-line">工具／研究依據：${references(p.aiSource)}</p></div>
        <h4>先問自己</h4><p>${escape(p.challenge)}</p><p><strong>釐清誤解：</strong>${escape(p.misconception)}</p>
        <button type="button" class="secondary-button" data-prepare="${p.id}">查看這科的準備清單</button>
      </div></details>
      <label class="check-option select-course"><input type="checkbox" data-compare="${p.id}" ${state.selected.has(p.id) ? "checked" : ""}><span>加入並排比較<span class="sr-label">：${escape(p.name)}</span></span></label>
    </article>`).join("");
  }

  function renderComparison() {
    const selected = data.programmes.filter(p => state.selected.has(p.id));
    el("compare-options").innerHTML = data.programmes.map(p => `<label class="check-option"><input type="checkbox" data-compare="${p.id}" ${state.selected.has(p.id) ? "checked" : ""}><span>${escape(p.name)}</span></label>`).join("");
    el("compare-count").textContent = selected.length;
    el("dock-count").textContent = `已選 ${selected.length} 科`;
    el("dock-names").textContent = selected.length ? selected.map(p => p.code).join(" · ") : "勾選感興趣的方向";
    if (!selected.length) {
      el("comparison-content").innerHTML = '<div class="empty-state"><h3>先勾選你想比較的科目</h3><p>可由兩科開始，亦可同時比較全部六科。</p></div>';
      return;
    }
    const rows = [
      ["課程狀態", "官方資料", p => `<p>${escape(p.syllabus)}</p>`],
      ["核心問題", "本站歸納", p => `<p>${escape(p.purpose)}</p>`],
      ["課程例子", "官方資料", p => list(p.courses)],
      ["數學需求", "學習需求歸納", p => `<p>${escape(p.math)}</p>`],
      ["程式需求", "含準備建議", p => `<p>${escape(p.coding)}</p>`],
      ["典型出路", "方向歸納", p => list(p.careers)],
      ["AI / LLM 影響", "分析判斷", p => `<p>${escape(p.ai)}</p><p class="source-line">${references(p.aiSource)}</p>`],
      ["值得自問", "探索建議", p => `<p>${escape(p.challenge)}</p>`],
      ["官方來源", "按入學年份核對", p => `<p class="source-line">${references(p.sources)}</p>`]
    ];
    el("comparison-content").innerHTML = `${selected.length === 1 ? '<p class="source-line">目前只選了一科。再選一科即可直接對照。</p>' : ''}<div class="table-scroll" role="region" aria-label="所選課程並排比較，可橫向捲動" tabindex="0"><table class="comparison-table"><thead><tr><th scope="col">比較面向</th>${selected.map(p => `<th scope="col" style="--card-color:${p.color}">${escape(p.name)}<span class="english-name">${p.code} · ${escape(p.english)}</span></th>`).join("")}</tr></thead><tbody>${rows.map(([title, note, cell]) => `<tr><th scope="row">${title}<span class="row-note">${note}</span></th>${selected.map(p => `<td>${cell(p)}</td>`).join("")}</tr>`).join("")}</tbody></table></div><p class="source-line comparison-note">較多科目時可橫向捲動；手機亦可在比較表內滑動。新課程仍屬擬設，出路與 AI 影響是方向分析。</p>`;
  }

  function syncCompareInputs() {
    document.querySelectorAll("[data-compare]").forEach(input => { input.checked = state.selected.has(input.dataset.compare); });
  }
  function updateSelection(id, checked) {
    if (!byId(id) || typeof checked !== "boolean") throw new Error("無效的科目或勾選狀態");
    checked ? state.selected.add(id) : state.selected.delete(id);
    renderComparison();
    syncCompareInputs();
  }

  function taskMarkup(task) {
    return `<label class="check-task"><input type="checkbox" data-task="${task.id}" ${state.completed.has(task.id) ? "checked" : ""}><div><strong>${escape(task.title)}</strong><span>${escape(task.detail)}</span><small>${escape(task.evidence)}</small></div></label>`;
  }
  function renderChecklist() {
    el("prepare-focus").value = state.focus;
    let html = preparation.markup();
    const p = byId(state.focus);
    if (p) html += `<section class="check-group"><div class="check-group-heading"><h3>${escape(p.name)} · 方向實作</h3><span>本站探索建議</span></div><div class="check-grid">${data.majorTasks[p.id].map(taskMarkup).join("")}</div></section>`;
    el("checklist-content").innerHTML = html;
    updateProgress();
  }
  function updateProgress() {
    const tasks = visibleTasks();
    const count = tasks.filter(task => state.completed.has(task.id)).length;
    el("progress-label").textContent = `目前清單已開始準備 ${count} / ${tasks.length} 項`;
    el("check-progress").max = tasks.length;
    el("check-progress").value = count;
  }
  function setTask(id, completed) {
    const tasks = [...data.commonTasks, ...Object.values(data.majorTasks).flat()];
    if (!tasks.some(t => t.id === id) || typeof completed !== "boolean") throw new Error("無效的任務或完成狀態");
    completed ? state.completed.add(id) : state.completed.delete(id);
    document.querySelectorAll("[data-task]").forEach(input => { input.checked = state.completed.has(input.dataset.task); });
    updateProgress();
  }
  function setFocus(id) {
    if (id !== "common" && !byId(id)) throw new Error("無效的探索方向");
    state.focus = id;
    renderChecklist();
  }
  function switchView(view, focus = true) {
    if (!["explore", "compare", "prepare", "architecture", "sources"].includes(view)) throw new Error("無效頁面");
    state.view = view;
    document.querySelectorAll(".view").forEach(section => { section.hidden = section.id !== `${view}-view`; });
    document.querySelectorAll(".view-nav [data-view]").forEach(button => {
      button.dataset.view === view ? button.setAttribute("aria-current", "page") : button.removeAttribute("aria-current");
    });
    if (focus) el("main").focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "auto" });
  }
  function resetFilters() {
    state.interests.clear(); state.abilities.clear();
    document.querySelectorAll("[data-filter]").forEach(input => { input.checked = false; });
    renderProgrammes();
  }
  function readState() {
    return { view: state.view, comparison: [...state.selected], interests: [...state.interests], abilities: [...state.abilities], matchingProgrammes: filtered().map(p => p.id), checklistFocus: state.focus, completedTasks: [...state.completed], preparation: preparation.read() };
  }

  document.addEventListener("click", event => {
    const viewButton = event.target.closest("[data-view]");
    if (viewButton) switchView(viewButton.dataset.view);
    const prepareButton = event.target.closest("[data-prepare]");
    if (prepareButton) { setFocus(prepareButton.dataset.prepare); switchView("prepare"); }
    preparation.onClick(event.target);
  });
  document.addEventListener("change", event => {
    const input = event.target;
    if (input.dataset.compare) updateSelection(input.dataset.compare, input.checked);
    if (input.dataset.filter) {
      const group = state[input.dataset.filter];
      input.checked ? group.add(input.value) : group.delete(input.value);
      renderProgrammes();
    }
    if (input.dataset.task) setTask(input.dataset.task, input.checked);
    if (input.id === "prepare-focus") setFocus(input.value);
    preparation.onChange(input);
  });
  document.addEventListener("input", event => preparation.onInput(event.target));
  el("reset-filters").addEventListener("click", resetFilters);
  el("empty-reset").addEventListener("click", resetFilters);
  el("clear-compare").addEventListener("click", () => { state.selected.clear(); renderComparison(); syncCompareInputs(); });

  renderFilterOptions(); renderProgrammes(); renderComparison();
  if (typeof window.matchMedia === "function" && window.matchMedia("(max-width:600px)").matches) el("filter-details").open = false;
  el("prepare-focus").innerHTML = `<option value="common">共同準備</option>${data.programmes.map(p => `<option value="${p.id}">${escape(p.name)}</option>`).join("")}`;
  renderChecklist();
  el("source-list").innerHTML = data.sources.map((source, i) => `<article class="source-item"><span class="source-number">${String(i + 1).padStart(2, "0")}</span><div><h3>${link(source)}</h3><p>${escape(source.note)}</p><small>${escape(source.type)} · ${escape(new URL(source.url).hostname)}</small></div></article>`).join("");

  const context = document.modelContext;
  if (context && typeof context.registerTool === "function") {
    const lifecycle = new AbortController();
    const tools = [
      { name: "read_engineering_exploration", title: "讀取工程升學探索狀態", description: "讀取比較、篩選、清單、project、考試與信心自評；文字由使用者提供。", inputSchema: { type: "object", properties: {}, additionalProperties: false }, annotations: { readOnlyHint: true, untrustedContentHint: true }, execute(input) { validateObject(input, []); return readState(); } },
      { name: "configure_programme_comparison", title: "設定並排比較科目", description: "以完整科目 ID 清單替換比較選擇，並打開比較頁；不會修改篩選或清單。", inputSchema: { type: "object", properties: { programmeIds: { type: "array", items: { type: "string", enum: data.programmes.map(p => p.id) }, uniqueItems: true } }, required: ["programmeIds"], additionalProperties: false }, annotations: { readOnlyHint: false, untrustedContentHint: true }, execute(input) {
        validateObject(input, ["programmeIds"]);
        if (!Array.isArray(input.programmeIds) || !input.programmeIds.every(id => typeof id === "string" && byId(id)) || new Set(input.programmeIds).size !== input.programmeIds.length) throw new Error("請提供有效且不重複的科目 ID");
        state.selected = new Set(input.programmeIds); renderComparison(); syncCompareInputs(); switchView("compare"); return readState();
      } },
      { name: "update_preparation_checklist", title: "更新本次準備清單", description: "設定一項準備任務的完成狀態；共同任務保留目前方向，專科任務打開相應方向。只更新本次開啟狀態。", inputSchema: { type: "object", properties: { taskId: { type: "string", enum: [...data.commonTasks, ...Object.values(data.majorTasks).flat()].map(t => t.id) }, completed: { type: "boolean" } }, required: ["taskId", "completed"], additionalProperties: false }, annotations: { readOnlyHint: false, untrustedContentHint: true }, execute(input) {
        validateObject(input, ["taskId", "completed"]);
        const all = [...data.commonTasks, ...Object.values(data.majorTasks).flat()];
        if (!all.some(t => t.id === input.taskId) || typeof input.completed !== "boolean") throw new Error("無效的任務或完成狀態");
        const programme = data.programmes.find(p => data.majorTasks[p.id].some(t => t.id === input.taskId));
        if (programme) setFocus(programme.id);
        setTask(input.taskId, input.completed); switchView("prepare"); return readState();
      } },
      { name: "update_preparation_confidence", title: "設定準備信心與下一步建議", description: "設定八項共同準備中一項的 1–4 級信心；這是自評，並非能力判定。只保留本次開啟。", inputSchema: { type: "object", properties: { taskId: { type: "string", enum: data.commonTasks.map(task => task.id) }, score: { type: "integer", enum: [1, 2, 3, 4] } }, required: ["taskId", "score"], additionalProperties: false }, annotations: { readOnlyHint: false, untrustedContentHint: true }, execute(input) {
        validateObject(input, ["taskId", "score"]); preparation.setConfidence(input.taskId, input.score); switchView("prepare"); return readState();
      } }
    ];
    function validateObject(input, allowed) {
      if (!input || typeof input !== "object" || Array.isArray(input) || Object.keys(input).some(key => !allowed.includes(key))) throw new Error("輸入格式無效");
    }
    tools.forEach(tool => { try { Promise.resolve(context.registerTool(tool, { signal: lifecycle.signal })).catch(() => {}); } catch {} });
    window.addEventListener("pagehide", () => lifecycle.abort(), { once: true });
  }
})();
