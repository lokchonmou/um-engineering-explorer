"use strict";
window.EXPLORER_DATA = {
  interests: [
    { id: "mechanical", label: "機械與實體系統" },
    { id: "electronics", label: "電路與感測" },
    { id: "software", label: "軟件與數據" },
    { id: "built", label: "城市與基建" },
    { id: "chips", label: "晶片與半導體" },
    { id: "autonomy", label: "自主機械人" }
  ],
  abilities: [
    { id: "math", label: "數學推導與建模" },
    { id: "coding", label: "程式與邏輯" },
    { id: "lab", label: "實驗量度與製作" },
    { id: "spatial", label: "空間理解與繪圖" }
  ],
  programmes: [
    {
      id: "eme", code: "EME", name: "機電工程", english: "Electromechanical Engineering", color: "#386d85", planned: false,
      purpose: "把機械、能源與控制整合成可運作的實體系統。",
      learn: "工程繪圖、力學、熱學與機電整合；從設計走到量度、製作與測試。",
      courses: ["Engineering Drawing I：讀懂與製作工程圖。", "Intermediate Calculus：用積分等工具描述工程量。", "Thermodynamics：理解能量轉換與熱力學定律。"],
      mathShort: "微積分與物理建模", codingShort: "工程計算與控制應用",
      math: "需要把力、運動、熱與能量轉成模型。微積分是基礎；工程數學與數值方法用來分析實體系統。",
      coding: "程式是計算、控制與實驗數據處理的工具。先學 Python 分析數據，再用微控制器連接感測器與致動器；語言建議屬本站準備建議。",
      careers: ["機械與機電系統設計", "設施、能源及設備工程", "自動化、製造與工程項目"],
      challenge: "願意反覆修改模型與設計，並用量度解釋作品為甚麼能運作。",
      ai: "AI 可協助設計工具操作、程式草稿與資料整理。重心更偏向定義工況、選材料、驗證模型及整合設備；實物的公差、能量與失效問題仍須測試。",
      aiSource: ["autodesk", "isaac"],
      misconception: "喜歡砌模型只是起點。大學機電工程需要力學、熱學與定量驗證，不止組裝。",
      interests: ["mechanical", "electronics", "autonomy"], abilities: ["math", "lab", "spatial"],
      sources: ["eme"], syllabus: "官方課程介紹；課程表須按適用入學年份查閱。"
    },
    {
      id: "ece", code: "ECE", name: "電機及電腦工程", english: "Electrical and Computer Engineering", color: "#765098", planned: false,
      purpose: "理解電力、電子與計算如何互相配合。",
      learn: "電機、電子、量度及電腦相關系統；把理論連接到電路與設備。",
      courses: ["Measurement and Instrumentation：量度、儀器與誤差。", "Electric Machines：電機與電能轉換。", "Fundamental Electronics：電子元件與電路基礎。"],
      mathShort: "工程數學與電路建模", codingShort: "硬件與程式並重",
      math: "微積分、工程數學與數值計算是基礎。電路、訊號及系統分析需要方程、向量與模型理解。",
      coding: "需要計算思維，也要理解程式如何與硬件工作。C/C++、Python 與嵌入式程式可作探索起點；不應把 ECE 理解成純軟件課程。",
      careers: ["電子、電力與控制系統", "嵌入式與電腦硬件", "通訊、儀器與系統整合"],
      challenge: "能把電路模型與量測結果對照，查出硬件、程式或假設中的問題。",
      ai: "AI 可加速程式草稿、部分設計流程與除錯搜尋。系統架構、量測品質、時序、功耗與可靠性仍是判斷重點；會生成程式不等於懂電路。",
      aiSource: ["cadence", "swe"],
      misconception: "名稱有『電腦』，不代表主要學寫網站；電力與電子基礎仍佔重要位置。",
      interests: ["electronics", "chips", "autonomy"], abilities: ["math", "coding", "lab"],
      sources: ["ece", "ece-course"], syllabus: "課程表標示適用於 2021/2022 起入學；以自己入學年份版本為準。"
    },
    {
      id: "cs", code: "CS", name: "電腦科學", english: "Computer Science", color: "#3552a0", planned: false,
      purpose: "研究如何表示、處理與計算資訊，建立可靠的軟件系統。",
      learn: "程式、離散結構、演算法與作業系統；理解軟件背後的計算原理。",
      courses: ["Discrete Structures：離散數學與計算結構。", "Algorithm Design and Analysis：設計並分析演算法。", "Principles of Operating Systems：理解系統如何管理資源。"],
      mathShort: "離散數學、線性代數", codingShort: "核心能力，持續除錯",
      math: "不只計數：需要邏輯、離散結構、線性代數與機率統計。學 AI 或數據分析時，更需要理解模型與評估。",
      coding: "編程是核心，但不能停在語法。需要資料結構、演算法、系統理解、測試與閱讀現有程式；Python 可起步，再理解另一種語言與工具鏈。",
      careers: ["軟件與系統開發", "數據、AI 與相關工程", "網絡、資訊安全與技術研發"],
      challenge: "喜歡抽象問題、追查錯誤，也願意解釋程式為甚麼正確與有效率。",
      ai: "LLM 已能生成與修補程式，改變初稿與常規任務。價值更偏向需求定義、系統設計、測試、安全與複雜整合；程式基礎讓你能審核 AI 的輸出。",
      aiSource: ["swe"],
      misconception: "使用 AI 很熟練，並不等於理解計算。課程要你分析演算法與系統，而不只是操作工具。",
      interests: ["software", "autonomy"], abilities: ["math", "coding"],
      sources: ["cs"], syllabus: "課程表標示適用於 2021/2022 起入學；以自己入學年份版本為準。"
    },
    {
      id: "civil", code: "CIVIL", name: "土木工程", english: "Civil Engineering", color: "#6b7550", planned: false,
      purpose: "用工程分析與設計，讓建築及基礎設施安全、可行。",
      learn: "工程繪圖、力學、材料與結構；延伸至地基、基建與施工問題。",
      courses: ["Civil Engineering Drawing：工程圖與空間表達。", "Kinematics and Dynamics、Mechanics of Materials：運動、受力與材料行為。", "Engineering Mathematics I / II：工程分析工具；另有結構相關選修。"],
      mathShort: "力學與工程數學", codingShort: "分析與數據處理工具",
      math: "需要用數學描述荷載、變形與材料行為。工程數學、力學推導、數值分析及統計支持設計判斷。",
      coding: "不以軟件開發為主，但 Python、試算表與分析工具可處理實驗、計算與工程數據。先懂模型與單位，再用工具。",
      careers: ["土木、結構與地基相關工程", "基建、施工與工程顧問", "工程項目與資產管理"],
      challenge: "願意處理現場條件與資料不確定性，清楚交代假設、單位及安全邊界。",
      ai: "AI 可協助圖則與文件檢索、資訊整理及施工風險提示。現場資料、荷載假設、規範核對和工程責任仍須專業判斷；工具產出必須覆核。",
      aiSource: ["autodesk"],
      misconception: "土木與建築有合作，但定位不同。土木集中工程可行性與安全；建築更集中空間設計與人的使用。",
      interests: ["built"], abilities: ["math", "spatial"],
      sources: ["civil", "civil-course"], syllabus: "課程表標示適用於 2021/2022 起入學；以自己入學年份版本為準。"
    },
    {
      id: "micro", code: "MICRO", name: "微電子", english: "Microelectronics", color: "#a26827", planned: true,
      purpose: "深入晶片內部：從半導體與電路，走向積體電路設計。",
      learn: "官方擬設課程表列有數碼系統、電路、半導體物理與模擬積體電路設計。",
      courses: ["Digital Systems、Circuit Analysis：數碼與電路基礎。", "Introduction to Computer Programming、Intermediate Calculus：程式與數學工具。", "Semiconductor Physics、Analog Integrated Circuit Design：元件物理與晶片電路設計。"],
      mathShort: "微積分與元件／電路模型", codingShort: "設計、模擬與驗證",
      math: "需要把電路與元件行為連接到物理模型。微積分及工程數學支持電路分析；不能只靠背元件名稱。",
      coding: "官方擬設課程含程式入門。準備時可用 Python 做計算與電路模擬，之後按方向接觸硬件描述與自動化工具；這些是準備建議。",
      careers: ["積體電路設計與驗證", "半導體、晶片測試及產品工程", "電子設計自動化與技術研發"],
      challenge: "對微小訊號、元件差異與設計權衡有耐性；願意反覆模擬和驗證。",
      ai: "AI 正被用於晶片設計流程優化。工程師更需理解功耗、效能、面積及電路限制，設定設計目標並檢查結果；AI 工具熟練不能代替元件與電路知識。",
      aiSource: ["cadence"],
      misconception: "做 Arduino 是有用起點，但微電子走得更深入，研究晶片內部的元件與電路。",
      interests: ["chips", "electronics"], abilities: ["math", "coding", "lab"],
      sources: ["micro", "micro-plan"], syllabus: "擬於 2028/2029 開辦，待澳門特區公報刊登後生效；課程安排仍可能調整。"
    },
    {
      id: "robotics", code: "ROBOTICS", name: "機械人", english: "Robotics", color: "#36756c", planned: true,
      purpose: "讓機器感知、決策與行動，整合機械、電子、程式與 AI。",
      learn: "官方擬設課程含嵌入式系統、Python、機械人學習、控制與移動機械人。",
      courses: ["Linear Algebra, Probability and Statistics：建模與不確定性的數學工具。", "Embedded Systems for Robotics、Python Programming、Foundation for Robot Learning：硬件、程式與學習方法。", "Control for Robotics、Mobile Robot：控制與自主移動。"],
      mathShort: "線性代數、機率與控制", codingShort: "系統整合核心能力",
      math: "需要向量、矩陣、機率及連續系統思維，描述姿態、運動與感測的不確定性。機械人控制仍須數學基礎。",
      coding: "Python、嵌入式程式與軟硬件整合都是重點。可由感測與馬達控制開始，再探索 C/C++、Linux 與 ROS 2；後者為準備建議。",
      careers: ["機械人與自動化工程", "感知、控制與自主系統", "系統整合、測試與研發"],
      challenge: "能同時追查機械、電路、程式與數據問題，用測試區分不同失效原因。",
      ai: "AI 與模擬工具擴展機械人學習、感知與測試。難點在真實世界的可靠性、延遲、碰撞和未知情況；需要把模擬結果轉成可重現的實物證據。",
      aiSource: ["isaac"],
      misconception: "不是把 LEGO 砌得更複雜。大學需要控制、程式、線性代數與整體系統驗證。",
      interests: ["autonomy", "mechanical", "electronics", "software"], abilities: ["math", "coding", "lab", "spatial"],
      sources: ["robotics", "robotics-plan"], syllabus: "擬於 2028/2029 開辦，待澳門特區公報刊登後生效；課程安排仍可能調整。"
    }
  ],
  majorTasks: {
    eme: [
      { id: "eme-draw", title: "把一個零件畫成工程圖", detail: "用 CAD 畫出尺寸與組裝關係，思考材料、加工與公差。", evidence: "驗收：另一位同學能按圖理解或製作。" },
      { id: "eme-control", title: "完成一個感測與致動的小系統", detail: "例如感測器控制馬達；逐次改變條件，記錄反應與失效。", evidence: "驗收：有預期值、量測值和修改理由。" }
    ],
    ece: [
      { id: "ece-circuit", title: "預測並量測低電壓電路", detail: "從電阻、LED 或感測器開始；先計算，再量測電壓與電流。", evidence: "驗收：說明預測與量測差異，保留接線圖。" },
      { id: "ece-embed", title: "用微控制器讀取並記錄數據", detail: "把感測資料送到電腦；思考取樣頻率、雜訊與異常值。", evidence: "驗收：資料可重現；能區分硬件及程式錯誤。" }
    ],
    cs: [
      { id: "cs-algorithm", title: "比較兩種解題方法", detail: "例如搜尋或排序；用相同輸入檢查結果與執行成本。", evidence: "驗收：解釋為何選某方法，以及其限制。" },
      { id: "cs-system", title: "做一個有測試的小工具", detail: "從真實需求開始，例如資料整理；處理缺漏、格式錯誤與邊界情況。", evidence: "交付：程式、測試、README；能審核 AI 的修改。" }
    ],
    civil: [
      { id: "civil-force", title: "畫受力圖，檢查一個結構模型", detail: "用橋樑或梁的小模型，描述荷載、支承與變形；只作學習實驗。", evidence: "驗收：能說明單位、假設及實測限制。" },
      { id: "civil-space", title: "觀察一項基建並提出工程問題", detail: "選道路、排水或施工流程，記錄可觀察條件，再查可靠資料。", evidence: "交付：觀察紀錄、問題、所需數據與分析方向。" }
    ],
    micro: [
      { id: "micro-device", title: "用元件資料解釋一個電路", detail: "讀二極管或電晶體 datasheet，以簡單電路連接元件行為與模型。", evidence: "驗收：找出工作條件，能說明模型限制。" },
      { id: "micro-sim", title: "模擬、量度，再比較", detail: "用電路模擬工具探索元件改變；做低電壓實驗對照結果。", evidence: "交付：模擬圖、實測數據與差異解釋。" }
    ],
    robotics: [
      { id: "robot-control", title: "記錄機械人的控制誤差", detail: "從巡線或定距移動開始；改變速度或控制參數，保留每次測試。", evidence: "驗收：可重現測試，解釋參數與結果的關係。" },
      { id: "robot-sense", title: "測試感測失效，而不只測成功", detail: "改變光線、路面或障礙物，觀察偵測與行動是否仍可靠。", evidence: "交付：失效情境、紀錄與修正；可再探索 Linux / ROS 2。" }
    ]
  },
  sources: [
    { id: "eme", title: "澳大：機電工程 BSc 課程介紹", url: "https://feg.um.edu.mo/eme/bsc-programme/", type: "大學官方", note: "課程定位及工程繪圖、微積分、熱力學等課程描述。適用課程表按入學年份查閱。" },
    { id: "ece", title: "澳大：ECE 課程表（2021/2022 起）", url: "https://feg.um.edu.mo/ece/bsc-programme/bsc-programme-from-2021-2022/", type: "大學官方", note: "量度與儀器、電機、電子及數值計算等內容。" },
    { id: "ece-course", title: "澳大：ECE 本科課程說明", url: "https://feg.um.edu.mo/ece/bsc-programme/bsc-course-list/", type: "大學官方", note: "電腦與電子相關課程主題及學習內容。" },
    { id: "cs", title: "澳大：CS 課程表（2021/2022 起）", url: "https://fic.um.edu.mo/programmes/bsc_computer_science/bsc_cs_from2021/", type: "大學官方", note: "離散結構、演算法分析、作業系統與線性代數等課程。" },
    { id: "civil", title: "澳大：土木課程表（2021/2022 起）", url: "https://feg.um.edu.mo/cee/studyplan/bachelor_from2021/", type: "大學官方", note: "工程繪圖、動力學、材料力學、工程數學及結構選修。" },
    { id: "civil-course", title: "澳大：土木本科課程說明", url: "https://feg.um.edu.mo/cee/courses/bsccourses_from2021/", type: "大學官方", note: "核對個別本科課程內容；勿以碩士課程代替本科要求。" },
    { id: "micro", title: "澳大：微電子學士擬開辦狀態", url: "https://fic.um.edu.mo/programmes/bsc_microelectronics/", type: "大學官方", note: "擬於 2028/2029 開辦，待澳門特區公報刊登後生效。" },
    { id: "micro-plan", title: "澳大：微電子擬設課程表（2028/2029）", url: "https://fic.um.edu.mo/programmes/bsc_microelectronics/bsc_mic_from2028/", type: "大學官方", note: "數碼系統、電路、程式、半導體物理與模擬積體電路設計。" },
    { id: "robotics", title: "澳大：機械人學士擬開辦狀態", url: "https://fic.um.edu.mo/programmes/bsc_robotics/", type: "大學官方", note: "擬於 2028/2029 開辦，待澳門特區公報刊登後生效。" },
    { id: "robotics-plan", title: "澳大：機械人擬設課程表（2028/2029）", url: "https://fic.um.edu.mo/programmes/bsc_robotics/bsc_rob_from2028/", type: "大學官方", note: "線性代數及機率統計、嵌入式系統、Python、控制與移動機械人。" },
    { id: "hku", title: "港大：建築學本科官方介紹", url: "https://www.arch.hku.hk/programmes/arch/bachelor-of-arts-in-architectural-studies/", type: "大學官方", note: "用設計工作室及文化、技術、環境等維度說明建築學定位；列明香港專業評核路徑。" },
    { id: "hku-syllabus", title: "港大：建築學課程綱要（2020/2021 版本）", url: "https://www.arch.hku.hk/media/upload/2015/01/clean-copy-2020-21-BAAS-4-year-Syllabus-AR59-721.pdf", type: "歷史官方課綱", note: "工作室、歷史理論、技術及視覺表達的具體分類。用作定位例子，不作當屆收生資料。" },
    { id: "registry", title: "澳大教務處：本地學生直接入學規則", url: "https://reg.um.edu.mo/admissions/macao-students/direct-admissions/admission-rules/", type: "招生官方", note: "正式報名前核對當屆課程、途徑及科目要求；本站準備清單不代替招生章程。" },
    { id: "restructure", title: "澳大：改組設立五大科技類學院", url: "https://www.um.edu.mo/news-and-press-releases/press-release/detail/62958/", type: "大學官方", note: "學院架構已調整；舊 FST 資料須留意適用年份與新學院頁面。" },
    { id: "swe", title: "SWE-Bench Pro：真實軟件工程任務評估", url: "https://arxiv.org/abs/2509.16941", type: "研究論文 · 2025", note: "以複雜、多檔案的程式任務研究 AI 代理。支持『生成程式與工程驗證是不同能力』；不是就業預測。" },
    { id: "cadence", title: "Cadence：AI 晶片設計流程優化", url: "https://www.cadence.com/en_US/home/tools/digital-design-and-signoff/soc-implementation-and-floorplanning/cerebrus-intelligent-chip-explorer.html", type: "工具開發者官方", note: "顯示 AI 已進入晶片設計工具。廠商產品說明不等於獨立成效研究或職位替代證據。" },
    { id: "isaac", title: "NVIDIA：Isaac Sim 機械人模擬與測試", url: "https://developer.nvidia.com/isaac/sim/", type: "工具開發者官方", note: "物理模擬、測試與合成數據的工具定位；不代表模擬能取代實物驗證。" },
    { id: "autodesk", title: "Autodesk：工程建造 AI 工作流程", url: "https://www.autodesk.com/solutions/aec/construction-ai-software", type: "工具開發者官方", note: "介紹工程資料分析及工作流程自動化。對專業判斷的影響是本站分析，不是就業數據。" }
  ]
};
