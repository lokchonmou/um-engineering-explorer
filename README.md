# 澳大工程升學探索站

以繁體中文比較澳門大學 EME、ECE、Computer Science、土木工程，以及擬開辦的微電子與機械人學士。為中學生與教師提供課程探索、並排比較、興趣／能力篩選與準備清單。

此網站為升學探索教材，並非澳門大學官方網站。官方課程資料、本站歸納與 AI 影響分析分開標示。參考來源直接連至大學官方課程、原始研究與工具開發者文件。

## 技術與功能

- 純前端 HTML、CSS、JavaScript，沒有資料庫、API 金鑰或外部套件依賴。
- `dist/data.js`：六科資料、原有方向任務與參考來源。
- `dist/preparation.js`：八項共同準備、學生自行填寫的 project、考試／認證與 1–4 級信心回饋。
- Project 預設空白，由學生填名稱、知識、技能與個人工作。
- 中國電子學會 Python 等級考試（1–6 級）、其他中國電子學會認證科目、其他認證、IELTS、IGCSE、IAL；勾選後填內容／科目、級別／成績／目標及狀態。中國電子學會其他科目、其他認證、IGCSE 及 IAL 可新增／移除多筆，切換後保留本次輸入。
- 科技消息及學習回顧各可新增／移除多筆。消息填議題、新聞及來源；回顧填經驗、想法改變及下一步。
- 信心初始未作答；依項目與級別給下一步建議，不計總分或判定能力。
- 勾選、輸入與信心只保留本次開啟；重新整理重設。
- WebMCP 支援讀取探索狀態、設定比較、更新清單與信心；未支援時網站仍可使用。

## 驗證與本機查看

Node.js 20 或以上，無須安裝套件：

```sh
node --check dist/data.js
node --check dist/preparation.js
node --check dist/app.js
node verify.mjs
```

直接用瀏覽器開啟 `dist/index.html` 可查看網站。14 組模擬 DOM 檢查涵蓋初始化、篩選、比較、導覽、清單、project、考試、信心回饋、欄位保留、文字轉義與重新開啟重設。不等同真實瀏覽器視覺、200% 放大或行動裝置驗收。WebMCP 只在模擬環境驗證。

## GitHub Pages

確認網站可公開後，在 repository 的 **Settings → Pages → Build and deployment → Source** 選擇 **GitHub Actions**。推送到 `main`，或手動執行 **Verify and deploy GitHub Pages**。

Workflow 先執行驗證，再把 `dist/` 上傳部署；測試腳本、README 不會成為網站內容。頁面資產全部用相對路徑，支援 GitHub Pages 的 repository 子路徑。

GitHub Pages 通常公開，即使 repository 是 private，亦不代表 Pages 網站私密。GitHub Free 可從 public repository 發佈；私密 Pages 的訪問控制需要符合 GitHub Enterprise Cloud 的組織條件。

## 資料限制

資料核對日期：2026-10-09。微電子與機械人官方頁均列為擬於 2028/2029 學年開辦，待澳門特區公報刊登後生效；課程安排可能調整。既有課程表按入學年份適用。

部分官方頁面全文擷取受阻，已以官方搜尋索引核對所列課名及開辦狀態，未宣稱逐項核驗當屆完整課綱。正式申請前重新核對澳大教務處招生公告。

## 部署文件

- [GitHub Pages 自訂工作流程](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [GitHub Pages 網站可見性](https://docs.github.com/enterprise-cloud@latest/pages/getting-started-with-github-pages/changing-the-visibility-of-your-github-pages-site)
