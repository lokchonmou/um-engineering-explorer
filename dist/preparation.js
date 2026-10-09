"use strict";
(() => {
  const data = window.EXPLORER_DATA;
  data.commonTasks = [
    { id: "prep-projects", title: "先整理我做過的 project", detail: "先寫 project 名稱，再用關鍵字整理其中的知識、技能，以及自己負責的工作。", evidence: "想一想：哪些是我學懂的概念？哪些是我能做的操作？哪些工作由我親自完成？", feedback: ["先寫下一個做過的 project，暫時只填名稱也可以。", "選一個 project，補上知識、技能和自己負責的工作。", "檢查三個欄位是否分清：概念原理、操作能力、實際責任。", "請同學追問其中一項，看看你能否用具體經歷說明。"] },
    { id: "prep-understanding", title: "分清做過與真正掌握", detail: "問自己：能否解釋原理？能否獨立完成？換了條件還能處理嗎？哪些部分仍需要老師、隊友、範例或 AI 協助？", evidence: "做過、能解釋、能獨立完成、能轉用，是不同的表現。", feedback: ["選一項你做過的工作，先說出自己能處理與需要協助的部分。", "試著用自己的話解釋一個步驟；講不清的地方就是下一個學習問題。", "找一個小改動，不看原有範例先嘗試，再比較結果。", "換一個條件再試，並用結果檢查自己的信心是否有依據。"] },
    { id: "prep-portfolio", title: "整理作品與個人貢獻", detail: "選幾件代表作，整理照片、影片、原始設計、程式及測試紀錄。說清用途、自己的貢獻、設計選擇、結果與學到的事。", evidence: "先整理一件最能說明自己能力的作品。", feedback: ["先選一件代表作，把現有檔案集中到同一個資料夾。", "補一段簡介，說明要解決甚麼問題，以及你親自負責甚麼。", "補上一次測試或改版紀錄，讓設計選擇有證據可追查。", "請沒參與的人看一次，檢查他能否理解你的貢獻和成果。"] },
    { id: "prep-foundations", title: "補強數學、物理、程式與英文基礎", detail: "例如：用函數描述兩個量的關係、用向量表示大小與方向、在計算中核對單位、把問題拆成可測試的程式步驟，並閱讀英文技術文件。", evidence: "選一項自己講不清或容易出錯的基礎，集中補強。", feedback: ["從最近遇到的困難選一個概念，請老師幫你確認起點。", "做一個簡單例題，寫清每一步的理由和仍不明白的地方。", "換一種題目或輸入再試，確認不是只記住原題的做法。", "嘗試解釋一個新情境，並檢查假設、單位或程式邊界。"] },
    { id: "prep-exams", title: "有目的地準備考試與認證", detail: "勾選已考、正在準備或正在考慮的項目，填上內容、科目、級別或成績。按目標核對考綱與要求。", evidence: "學科資格、英文測試和程式認證用途不同；選擇要配合自己的目標。", feedback: ["先勾選一項與自己目標有關的考試或認證，查看官方內容。", "填清實際名稱、科目與目標，再找出一項需要準備的內容。", "對照考綱和目前表現，安排一次練習或模擬檢查。", "核對信心的依據：已有成績、近期練習，還是仍未測試的估計？"] },
    { id: "prep-contests", title: "有目的地參加比賽", detail: "選能推進能力的挑戰。賽前訂目標與分工；賽後整理個人貢獻、評審回饋、失敗原因及改進。", evidence: "先想清楚：這次想學會甚麼？會留下甚麼證據？", feedback: ["先了解一項合適賽事的規則，找老師討論可行的學習目標。", "選一個想提升的能力，再確認時間、分工和所需資源。", "訂一項測試或展示標準，讓賽前準備有明確方向。", "把一次回饋或失敗轉成具體改進，並保留個人貢獻的紀錄。"] },
    { id: "prep-news", title: "持續追蹤科技發展", detail: "定期閱讀與自己方向相關的科技消息。遇到重要主張時追查原始來源，思考它與已學知識或正在做的事有何關係。", evidence: "可由科技媒體找入口，再查看論文或官方技術文件。", feedback: ["先選一個有興趣的科技主題，閱讀一則可靠來源的消息。", "用一句話說出發生甚麼，再指出一個自己未懂的詞或概念。", "追到原始資料，分清研究結果、產品宣傳和未確認的推測。", "與同學討論這項進展的限制，以及它可能改變甚麼做法。"] },
    { id: "prep-reflect", title: "回顧學習方法，決定下一步", detail: "回看近期經驗：原本怎樣想？哪項證據令自己改變想法？下次怎樣做？再選一個具體改進。", evidence: "每次選一個可做到的下一步。", feedback: ["先回想一次卡住的經驗，找出自己當時用了甚麼方法。", "比較原本的想法和後來的結果，說出一個需要調整的地方。", "為下一步訂一個簡單驗收方法和可行的時間。", "回查上次的改進是否有效；如果沒有，調整策略而不是只加工作量。"] }
  ];
  data.examOptions = [
    { id: "python", label: "Python 認證", placeholder: "例如 PCEP／PCAP；填實際名稱", levelPlaceholder: "填級別、結果或目標", source: "python-exam" },
    { id: "ielts", label: "IELTS", placeholder: "填測試類型／準備內容", levelPlaceholder: "填已有或目標分數", source: "ielts-exam" },
    { id: "igcse", label: "IGCSE", placeholder: "填考試局、科目／代碼", levelPlaceholder: "填已有或目標等級", source: "igcse-exam" },
    { id: "ial", label: "IAL", placeholder: "填科目／單元／考試內容", levelPlaceholder: "填 IAS／IAL、成績或目標", source: "ial-exam" }
  ];
  data.sources.push(
    { id: "python-exam", title: "Python Institute：認證路徑", url: "https://pythoninstitute.org/certification-tracks", type: "認證機構官方", note: "Python 認證有不同機構、名稱與範圍。此頁為一個認證路徑例子；填寫實際認證名稱，另核對用途與要求。" },
    { id: "ielts-exam", title: "IELTS：測試選擇與準備", url: "https://ielts.org/take-a-test", type: "測試主辦官方", note: "英文測試類型與準備入口；填清測試類型及已有或目標分數。" },
    { id: "igcse-exam", title: "Cambridge IGCSE：科目資料", url: "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-upper-secondary/cambridge-igcse/subjects/", type: "考試機構官方", note: "Cambridge IGCSE 科目與考綱入口。填清實際考試局、科目及等級，按自己的課程查閱。" },
    { id: "ial-exam", title: "Pearson Edexcel：International AS/A Levels", url: "https://qualifications.pearson.com/en/qualifications/edexcel-international-advanced-levels.html", type: "考試機構官方", note: "IAL 科目與資格資料入口；填清科目／單元及已有或目標結果。" }
  );

  window.createPreparation = ({ state, escape, references, repaint }) => {
    let nextProject = 2;
    const blankProject = id => ({ id, name: "", knowledge: "", skills: "", work: "" });
    state.projects = [blankProject("p1")]; state.confidence = {};
    state.exams = Object.fromEntries(data.examOptions.map(exam => [exam.id, { selected: false, content: "", level: "", status: "" }]));
    const levels = ["需要起步", "有部分把握", "大致有把握", "很有把握"];
    const statusOptions = [["", "請選狀態"], ["considering", "考慮中"], ["preparing", "準備中"], ["taken", "已考"]];
    const projectMarkup = () => `<div class="project-fields">${state.projects.map((project, index) => `<div class="project-entry"><div class="entry-heading"><strong>Project ${index + 1}</strong><button type="button" class="text-button" data-remove-project="${project.id}" aria-label="移除 Project ${index + 1}">移除</button></div><div class="project-inputs">${[["name", "我做過的 project"], ["knowledge", "其中的知識／原理"], ["skills", "其中的技能／操作"], ["work", "我親自負責的工作"]].map(([key, label]) => `<label for="project-${project.id}-${key}">${label}<input type="text" id="project-${project.id}-${key}" data-project="${project.id}" data-project-field="${key}" maxlength="300" value="${escape(project[key])}"></label>`).join("")}</div></div>`).join("")}<button type="button" class="secondary-button" data-add-project="true">新增 project</button></div>`;
    const examMarkup = () => `<div class="exam-fields">${data.examOptions.map(exam => {
      const row = state.exams[exam.id];
      return `<div class="exam-entry"><div class="exam-heading"><label class="check-option"><input type="checkbox" data-exam="${exam.id}" ${row.selected ? "checked" : ""}><strong>${exam.label}</strong></label><span class="source-line">${references([exam.source])}</span></div>${row.selected ? `<div class="exam-inputs"><label for="exam-${exam.id}-content">內容／科目<input type="text" id="exam-${exam.id}-content" data-exam-field="content" data-exam-id="${exam.id}" maxlength="300" value="${escape(row.content)}" placeholder="${escape(exam.placeholder)}"></label><label for="exam-${exam.id}-level">級別／成績／目標<input type="text" id="exam-${exam.id}-level" data-exam-field="level" data-exam-id="${exam.id}" maxlength="300" value="${escape(row.level)}" placeholder="${escape(exam.levelPlaceholder)}"></label><label for="exam-${exam.id}-status">目前狀態<select id="exam-${exam.id}-status" data-exam-field="status" data-exam-id="${exam.id}">${statusOptions.map(([value, label]) => `<option value="${value}" ${row.status === value ? "selected" : ""}>${label}</option>`).join("")}</select></label></div>` : ""}</div>`;
    }).join("")}</div>`;
    const feedback = id => data.commonTasks.find(task => task.id === id)?.feedback[state.confidence[id] - 1] || "";
    function markup() {
      return `<section class="check-group"><div class="check-group-heading"><h3>八項共同準備</h3><span>按自己的需要選擇</span></div><div class="prep-card-grid">${data.commonTasks.map((task, index) => `<article class="prep-card ${["prep-projects", "prep-exams"].includes(task.id) ? "wide-card" : ""}"><label class="prep-check"><input type="checkbox" data-task="${task.id}" ${state.completed.has(task.id) ? "checked" : ""}><span><small>${String(index + 1).padStart(2, "0")} / 我已開始這項準備</small><strong>${escape(task.title)}</strong></span></label><p>${escape(task.detail)}</p>${task.id === "prep-projects" ? projectMarkup() : task.id === "prep-exams" ? examMarkup() : ""}<p class="prep-hint">${escape(task.evidence)}</p><fieldset class="confidence-options"><legend>我對這項準備的信心</legend>${levels.map((label, i) => `<label><input type="radio" name="confidence-${task.id}" data-confidence="${task.id}" value="${i + 1}" ${state.confidence[task.id] === i + 1 ? "checked" : ""}><span>${i + 1}<small>${label}</small></span></label>`).join("")}</fieldset><p class="confidence-feedback" data-confidence-feedback="${task.id}" role="status" aria-live="polite" ${feedback(task.id) ? "" : "hidden"}>${feedback(task.id) ? `下一步：${escape(feedback(task.id))}` : ""}</p></article>`).join("")}</div></section>`;
    }
    function setConfidence(id, score) {
      if (!data.commonTasks.some(task => task.id === id) || !Number.isInteger(score) || score < 1 || score > 4) throw new Error("請選有效項目及 1–4 級信心");
      state.confidence[id] = score;
      document.querySelectorAll("[data-confidence]").forEach(input => { if (input.dataset.confidence === id) input.checked = Number(input.value) === score; });
      document.querySelectorAll("[data-confidence-feedback]").forEach(p => { if (p.dataset.confidenceFeedback === id) { p.hidden = false; p.textContent = `下一步：${feedback(id)}`; } });
    }
    function setProjectField(id, key, value) {
      const row = state.projects.find(project => project.id === id);
      if (!row || !["name", "knowledge", "skills", "work"].includes(key) || typeof value !== "string" || value.length > 300) throw new Error("Project 輸入無效");
      row[key] = value;
    }
    function setExamField(id, key, value) {
      const row = Object.hasOwn(state.exams, id) ? state.exams[id] : undefined;
      if (!row || !["content", "level", "status"].includes(key) || typeof value !== "string" || value.length > 300 || (key === "status" && !statusOptions.some(([status]) => status === value))) throw new Error("考試輸入無效");
      row[key] = value;
    }
    function onInput(input) {
      if (input.dataset.projectField) setProjectField(input.dataset.project, input.dataset.projectField, input.value);
      if (input.dataset.examField && input.dataset.examField !== "status") setExamField(input.dataset.examId, input.dataset.examField, input.value);
    }
    function onChange(input) {
      if (input.dataset.confidence) setConfidence(input.dataset.confidence, Number(input.value));
      if (input.dataset.exam) {
        if (!Object.hasOwn(state.exams, input.dataset.exam)) return;
        state.exams[input.dataset.exam].selected = input.checked; repaint();
        [...document.querySelectorAll("[data-exam]")].find(field => field.dataset.exam === input.dataset.exam)?.focus({ preventScroll: true });
      }
      if (input.dataset.examField === "status") setExamField(input.dataset.examId, "status", input.value);
    }
    function onClick(target) {
      if (target.closest("[data-add-project]")) {
        const id = `p${nextProject++}`; state.projects.push(blankProject(id)); repaint();
        [...document.querySelectorAll("[data-project-field]")].find(input => input.dataset.project === id && input.dataset.projectField === "name")?.focus({ preventScroll: true });
      }
      const remove = target.closest("[data-remove-project]");
      if (remove) {
        state.projects = state.projects.filter(project => project.id !== remove.dataset.removeProject);
        if (!state.projects.length) state.projects.push(blankProject(`p${nextProject++}`));
        repaint(); document.querySelectorAll("[data-add-project]")[0]?.focus({ preventScroll: true });
      }
    }
    const read = () => JSON.parse(JSON.stringify({ projects: state.projects, exams: state.exams, confidence: state.confidence, feedback: Object.fromEntries(Object.keys(state.confidence).map(id => [id, feedback(id)])) }));
    return { markup, onInput, onChange, onClick, read, setConfidence, setProjectField, setExamField };
  };
})();
