"use strict";
(() => {
  const FORMAT = "um-engineering-explorer-save";
  const LIMIT = 1024 * 1024;
  window.createSaveManager = ({ data, read, restore, escape }) => {
    const el = id => document.getElementById(id);
    const fail = () => { throw new Error("檔案格式或內容無效；請使用本站匯出的第 1 版 JSON 儲存檔。原有資料未改動。"); };
    const object = value => value && typeof value === "object" && !Array.isArray(value);
    const exact = (value, keys) => { if (!object(value) || Object.keys(value).length !== keys.length || keys.some(key => !Object.hasOwn(value, key))) fail(); };
    const text = value => { if (typeof value !== "string" || value.length > 300) fail(); };
    const choices = (value, allowed) => { if (!Array.isArray(value) || value.length > allowed.length || new Set(value).size !== value.length || value.some(id => !allowed.includes(id))) fail(); };
    const rows = (value, prefix, fields, extra, max = 500) => {
      if (!Array.isArray(value) || !value.length || value.length > max) fail();
      const ids = new Set();
      value.forEach(row => {
        exact(row, ["id", ...fields, ...(extra ? extra.keys : [])]);
        if (typeof row.id !== "string" || !new RegExp(`^${prefix}\\d{1,8}$`).test(row.id) || ids.has(row.id)) fail();
        ids.add(row.id); fields.forEach(key => text(row[key])); if (extra) extra.check(row);
      });
    };
    function exportObject() {
      const current = read();
      const { feedback, ...preparation } = current.preparation;
      return { format: FORMAT, version: 1, savedAt: new Date().toISOString(), data: {
        comparison: current.comparison, interests: current.interests, abilities: current.abilities,
        checklistFocus: current.checklistFocus, completedTasks: current.completedTasks, preparation
      } };
    }
    function validate(file) {
      exact(file, ["format", "version", "savedAt", "data"]);
      if (file.format !== FORMAT || file.version !== 1 || typeof file.savedAt !== "string" || file.savedAt.length > 40 || !Number.isFinite(Date.parse(file.savedAt))) fail();
      const saved = file.data;
      exact(saved, ["comparison", "interests", "abilities", "checklistFocus", "completedTasks", "preparation"]);
      const programmeIds = data.programmes.map(row => row.id);
      choices(saved.comparison, programmeIds); choices(saved.interests, data.interests.map(row => row.id)); choices(saved.abilities, data.abilities.map(row => row.id));
      if (!["common", ...programmeIds].includes(saved.checklistFocus)) fail();
      choices(saved.completedTasks, [...data.commonTasks, ...Object.values(data.majorTasks).flat()].map(row => row.id));
      const p = saved.preparation;
      exact(p, ["projects", "contests", "exams", "notes", "confidence"]);
      rows(p.projects, "p", ["name", "knowledge", "skills", "work"]);
      rows(p.contests, "c", ["name", "role", "outcome", "other"], { keys: ["benefits"], check: row => choices(row.benefits, data.contestBenefits.map(item => item.id)) }, 3);
      exact(p.exams, data.examOptions.map(exam => exam.id));
      const checkExam = row => { if (!["", "considering", "preparing", "taken"].includes(row.status)) fail(); };
      data.examOptions.forEach(exam => {
        const group = p.exams[exam.id];
        exact(group, exam.repeatable ? ["selected", "entries"] : ["selected", "content", "level", "status"]);
        if (typeof group.selected !== "boolean") fail();
        if (exam.repeatable) rows(group.entries, `${exam.id}-`, ["content", "level", "status"], { keys: [], check: checkExam });
        else { ["content", "level", "status"].forEach(key => text(group[key])); checkExam(group); }
      });
      exact(p.notes, ["prep-news", "prep-reflect"]);
      rows(p.notes["prep-news"], "prep-news-", ["topic", "news", "source"]);
      rows(p.notes["prep-reflect"], "prep-reflect-", ["experience", "change", "next"]);
      if (!object(p.confidence) || Object.keys(p.confidence).some(id => !data.commonTasks.some(task => task.id === id) || !Number.isInteger(p.confidence[id]) || p.confidence[id] < 1 || p.confidence[id] > 4)) fail();
      return JSON.parse(JSON.stringify(saved));
    }
    function parse(content) {
      if (typeof content !== "string" || content.length > LIMIT) fail();
      let file; try { file = JSON.parse(content.replace(/^\uFEFF/, "")); } catch { fail(); }
      return validate(file);
    }
    function importText(content) { const clean = parse(content); restore(clean); return clean; }
    const value = content => escape(content || "未填寫");
    const table = (headings, records) => `<table><thead><tr>${headings.map(item => `<th>${escape(item)}</th>`).join("")}</tr></thead><tbody>${records.map(row => `<tr>${row.map(item => `<td>${value(item)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
    function report() {
      const saved = exportObject(), s = saved.data, p = s.preparation;
      const labels = (ids, source) => source.filter(item => ids.includes(item.id)).map(item => item.label || item.name).join("、");
      const focus = data.programmes.find(item => item.id === s.checklistFocus)?.name || "共同準備";
      const tasks = [...data.commonTasks, ...Object.values(data.majorTasks).flat().filter(task => s.completedTasks.includes(task.id) || (data.majorTasks[s.checklistFocus] || []).some(item => item.id === task.id))];
      const examRows = data.examOptions.flatMap(exam => {
        const group = p.exams[exam.id];
        const entries = group.entries || [group];
        return entries.filter(row => group.selected || row.content || row.level || row.status).map(row => [exam.label + (group.selected ? "" : "（未勾選，保留紀錄）"), row.content, row.level, ({ considering: "考慮中", preparing: "準備中", taken: "已考" })[row.status] || "未選"]);
      });
      const benefits = row => labels(row.benefits, data.contestBenefits) + (row.benefits.includes("other") && row.other ? `：${row.other}` : "");
      return `<h1>澳大工程升學探索站｜我的準備紀錄</h1><p>整理時間：${escape(new Date(saved.savedAt).toLocaleString("zh-Hant", { timeZone: "Asia/Macau" }))}（澳門時間）</p><p>探索方向：${value(focus)}<br>比較科目：${value(labels(s.comparison, data.programmes))}<br>興趣：${value(labels(s.interests, data.interests))}<br>起步能力：${value(labels(s.abilities, data.abilities))}</p><p>這是學生填寫的準備紀錄；信心是自評，不是能力評分。PDF 供閱讀，接續填寫請保留 JSON 儲存檔。</p>
        <h2>準備進度與信心</h2>${table(["準備項目", "已開始", "信心（1–4）", "下一步建議"], tasks.map(task => [task.title, s.completedTasks.includes(task.id) ? "是" : "否", String(p.confidence[task.id] || "未選"), task.feedback?.[p.confidence[task.id] - 1] || ""]))}
        <h2>Project</h2>${table(["名稱", "知識／原理", "技能／操作", "個人工作"], p.projects.map(row => [row.name, row.knowledge, row.skills, row.work]))}
        <h2>考試／認證</h2>${examRows.length ? table(["類別", "內容／科目", "級別／成績／目標", "狀態"], examRows) : "<p>尚未填寫。</p>"}
        <h2>最多三項代表性比賽</h2>${table(["比賽／年份", "項目／角色", "成果／獎項", "這個比賽如何幫助我"], p.contests.map(row => [row.name, row.role, row.outcome, benefits(row)]))}
        <h2>科技消息</h2>${table(["關注議題", "最近新聞", "來源／連結"], p.notes["prep-news"].map(row => [row.topic, row.news, row.source]))}
        <h2>學習回顧</h2>${table(["經驗", "想法改變／學到甚麼", "下一步"], p.notes["prep-reflect"].map(row => [row.experience, row.change, row.next]))}
        <p>網站：https://lokchonmou.github.io/um-engineering-explorer/<br>加分條件請核對澳大官方規則：${escape(data.sources.find(source => source.id === "um-bonus").url)}</p>`;
    }
    let pending = null;
    const status = message => { el("save-status").textContent = message; };
    const showReport = () => { el("print-report").innerHTML = report(); el("export-preview").hidden = false; el("close-report").focus(); };
    el("export-json").addEventListener("click", () => {
      const blob = new Blob([JSON.stringify(exportObject(), null, 2)], { type: "application/json;charset=utf-8" });
      const url = URL.createObjectURL(blob), anchor = document.createElement("a");
      anchor.href = url; anchor.download = `um-engineering-save-${new Date().toISOString().replace(/[:.]/g, "-")}.json`;
      document.body.appendChild(anchor); anchor.click(); anchor.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
      status("已匯出 JSON 儲存檔；下次可匯入接續。請保留最新檔案。");
    });
    el("import-json").addEventListener("click", () => el("import-file").click());
    el("import-file").addEventListener("change", async event => {
      const file = event.target.files?.[0]; if (!file) return;
      pending = null; el("import-review").hidden = true;
      try {
        if (file.size > LIMIT) throw new Error("檔案超過 1 MB，未匯入；原有資料未改動。");
        pending = parse(await file.text());
        el("import-summary").textContent = `檔案：${file.name}。有 ${pending.preparation.projects.length} 個 project、${pending.preparation.contests.length} 筆比賽紀錄、${pending.completedTasks.length} 項已開始準備。確認後會取代本次填寫內容；可先匯出目前 JSON 備份。`;
        el("import-review").hidden = false; el("confirm-import").focus();
      } catch (error) { status(error.message || "未能讀取檔案，原有資料未改動。"); }
      event.target.value = "";
    });
    el("confirm-import").addEventListener("click", () => {
      if (!pending) return;
      restore(pending); pending = null; el("import-review").hidden = true; status("JSON 儲存檔已匯入，可繼續填寫。完成後請再次匯出最新 JSON。");
    });
    el("cancel-import").addEventListener("click", () => { pending = null; el("import-review").hidden = true; status("已取消匯入，原有資料未改動。"); });
    el("export-pdf").addEventListener("click", showReport);
    el("print-pdf").addEventListener("click", () => { showReport(); window.print(); });
    const closeReport = () => { el("export-preview").hidden = true; el("export-pdf").focus(); };
    el("close-report").addEventListener("click", closeReport);
    document.addEventListener("keydown", event => {
      if (el("export-preview").hidden) return;
      if (event.key === "Escape") closeReport();
      if (event.key === "Tab") {
        const first = el("print-pdf"), last = el("close-report");
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    });
    window.addEventListener("beforeprint", showReport);
    return { exportObject, validate, parse, importText, report };
  };
})();
