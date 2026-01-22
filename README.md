# Pixel Adventure Quiz Game 🎮

這是一個使用 React + Vite 開發的像素風 (Pixel Art) 闖關問答遊戲。玩家需要回答問題來擊敗關主，成績會自動記錄到 Google Sheets。

---

## 🛠️ 安裝與執行 (前端)

1.  **安裝 Node.js**: 確保您的電腦已安裝 [Node.js](https://nodejs.org/)。
2.  **安裝依賴**:
    ```bash
    npm install
    ```
3.  **啟動遊戲**:
    ```bash
    npm run dev
    ```
4.  開啟瀏覽器訪問 `http://localhost:5173`。

---

## ☁️ Google Sheets 與 Apps Script 設定 (後端)

本遊戲使用 Google Sheets 作為資料庫，Google Apps Script (GAS) 作為 API。請依照以下步驟設定：

### 第一步：建立 Google Sheet
1.  前往 [Google Sheets](https://sheets.google.com) 建立一個新的試算表。
2.  將試算表命名為 `Pixel Game Database` (或您喜歡的名字)。
3.  建立兩個工作表 (Tabs)，名稱必須完全一致：
    *   **工作表 1 名稱**：`題目`
    *   **工作表 2 名稱**：`回答`

### 第二步：設定「題目」工作表
在 `題目` 工作表的第一列 (Row 1)，建立以下欄位名稱：
`A1`: ID
`B1`: Question
`C1`: OptionA
`D1`: OptionB
`E1`: OptionC
`F1`: OptionD
`G1`: Answer

> 💡 **提示**：您可以直接複製本文下方的「10 題生成式 AI 題庫」貼入此工作表。

### 第二步：設定「回答」工作表
在 `回答` 工作表的第一列 (Row 1)，建立以下欄位名稱（用於紀錄玩家成績）：
`A1`: ID
`B1`: 闖關次數
`C1`: 總分
`D1`: 最高分
`E1`: 第一次通關分數
`F1`: 花了幾次通關
`G1`: 最近遊玩時間

### 第三步：設定 Google Apps Script
1.  在試算表中，點擊上方選單的 **「擴充功能 (Extensions)」** > **「Apps Script」**。
2.  會開啟一個新的程式碼編輯器視窗。
3.  將原本的 `Code.gs` 內容全部刪除，並貼上專案中的 `GAS_CODE.md` 內容（或見下方附錄）。
4.  按 `Cmd + S` (或是磁碟片圖示) 儲存專案，命名為 `PixelGameAPI`。

### 第四步：部署為 Web App
1.  點擊右上角的 **「部署 (Deploy)」** 按鈕 > **「新增部署作業 (New deployment)」**。
2.  點擊左側齒輪圖示，選擇 **「網頁應用程式 (Web app)」**。
3.  設定如下：
    *   **說明**：Pixel Game API (可隨意填)
    *   **執行身分 (Execute as)**：**「我 (Me)」** (這很重要！)
    *   **誰可以存取 (Who has access)**：**「任何人 (Anyone)」** (這也很重要，否則前端無法存取)。
4.  點擊 **「部署 (Deploy)」**。
5.  (首次部署需授權) 點擊「授權存取」，選擇您的 Google 帳號。若出現「Google 未驗證此應用程式」，點擊「進階」>「前往... (不安全)」，最後點擊「允許」。
6.  部署成功後，會看到 **「網頁應用程式網址 (Web App URL)」**。請複製這串以 `https://script.google.com/...` 開頭的網址。

### 第五步：連線前端
1.  回到本專案資料夾。
2.  開啟 `.env` 檔案。
3.  將網址貼上：
    ```env
    VITE_GOOGLE_APP_SCRIPT_URL=https://script.google.com/macros/s/您的ID/exec
    ```
4.  **重新啟動** 終端機 (`Ctrl + C` 停止，再 `npm run dev`)，設定才會生效。

---

## 📚 10 題生成式 AI 基礎知識題庫 (可直接複製)

以下內容已格式化為 CSV 格式，請複製後直接貼上到 Google Sheet 的 `題目` 工作表 **A2** 儲存格起。

| ID | 題目 | A | B | C | D | 解答 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 |「生成式 AI」的主要功能是什麼？ | 分析數據趨勢 | 僅進行搜尋 | 創造新的內容（如文字、圖片） | 儲存大量檔案 | 創造新的內容（如文字、圖片） |
| 2 | ChatGPT 背後使用的技術模型簡稱為什麼？ | CNN | LLM (大型語言模型) | SEO | HTML | LLM (大型語言模型) |
| 3 | 在與 AI 對話時，我們輸入的指令通常被稱為什麼？ | Password (密碼) | Code (代碼) | Prompt (提示詞) | Hash (雜湊) | Prompt (提示詞) |
| 4 | 下列哪一個不是生成式 AI 的常見應用？ | 撰寫電子郵件 | 生成圖片 (如 Midjourney) | 物理硬體維修 | 程式碼除錯 | 物理硬體維修 |
| 5 | AI 偶爾會自信地產生錯誤資訊，這種現象被稱為什麼？ | 幻覺 (Hallucination) | 當機 (Crash) | 睡眠 (Sleep) | 病毒 (Virus) | 幻覺 (Hallucination) |
| 6 | 生成式 AI 模型通常是透過什麼方式學習的？ | 死背字典 | 閱讀大量人類產生的資料 | 手動輸入規則 | 隨機猜測 | 閱讀大量人類產生的資料 |
| 7 | 下列哪一個是知名的圖片生成 AI 工具？ | Excel | PowerPoint | Midjourney | Notepad | Midjourney |
| 8 | 為了讓 AI 生成更好的結果，優化提示詞的技術被稱為什麼？ | 提示工程 (Prompt Engineering) | 社交工程 | 逆向工程 | 土木工程 | 提示工程 (Prompt Engineering) |
| 9 | 為什麼使用公開的生成式 AI 處理機密資料有風險？ | AI 會覺得無聊 | 資料可能會被用於訓練模型 | 電腦會過熱 | 網路會斷線 | 資料可能會被用於訓練模型 |
| 10 | 什麼是「Token」在大型語言模型中的概念？ | 一種加密貨幣 | 用來登入的代幣 | 文本處理的最小單位（類似字詞片段） | 遊戲點數 | 文本處理的最小單位（類似字詞片段） |

---

## 📂 專案結構 (Project Structure)

```
pixel-game/
├── index.html              # 網頁入口 (引入字體與 Main.jsx)
├── src/
│   ├── main.jsx            # React 進入點 (設定 GameProvider)
│   ├── App.jsx             # 主程式 (路由控制：Start -> Game -> Result)
│   ├── index.css           # 全域樣式 (定義 Pixel Art 變數與 CRT 特效)
│   ├── context/
│   │   └── GameContext.jsx # 遊戲狀態管理 (分數、題目、使用者 ID)
│   ├── services/
│   │   └── api.js          # API 服務 (負責與 Google Apps Script 溝通)
│   ├── pages/
│   │   ├── StartScreen.jsx # 首頁 (輸入 ID)
│   │   ├── GameScreen.jsx  # 遊戲頁 (答題與 DiceBear 圖片)
│   │   └── ResultScreen.jsx# 結果頁 (結算與重試)
│   └── assets/             # 靜態資源
├── .env                    # 環境變數 (存放 GAS URL)
└── README.md               # 專案說明文件
```

## 📜 可用指令 (Available Scripts)

在專案目錄下，您可以使用以下指令：

| 指令 | 說明 |
| :--- | :--- |
| `npm run dev` | **啟動開發伺服器**。開發時請用這個，預設網址 http://localhost:5173 |
| `npm run build` | **建置生產版本**。將程式打包到 `dist/` 資料夾，準備部署用 |
| `npm run preview` | **預覽生產版本**。模擬正式站的運作狀況 |

---

## 🛠️ 技術細節 (Developer Info)
- **Frontend Framework**: React 18 + Vite
- **Language**: JavaScript (ES6+)
- **State Management**: React Context API
- **Styling**: Vanilla CSS (CSS Variables for theming)
- **HTTP Client**: Axios
- **Backend (Serverless)**: Google Apps Script (GAS)

---

## 🚀 部署到 GitHub Pages (Deployment)

本專案已設定好 GitHub Actions 自動化部署流程。

### 1. 建立 GitHub Repository
將本專案上傳到 GitHub (Push)。

### 2. 設定 Secrets 與 Variables
為了讓遊戲能順利連線到您的 Google Apps Script，您需要到 GitHub 專案設定頁面配置環境變數。

1.  進入您的 GitHub Repository 頁面。
2.  點擊上方 **Settings** > 左側 **Secrets and variables** > **Actions**。
3.  **New Repository Secret** (機密資訊):
    *   Name: `VITE_GOOGLE_APP_SCRIPT_URL`
    *   Value: (填入您的 Apps Script 網址)
4.  **(選填) New Repository Variable** (一般變數):
    *   Name: `VITE_PASS_THRESHOLD` (預設 3)
    *   Name: `VITE_QUESTION_COUNT` (預設 5)

### 3. 開啟 Pages 權限
1.  還是在 **Settings** 頁面 > 左側 **Pages**。
2.  **Build and deployment** > Source: 選擇 **GitHub Actions**。

### 4. 自動部署
完成上述設定後，每當您 Push 程式碼到 `main` 分支時，GitHub Actions 就會自動打包並部署到 GitHub Pages 如 `https://您的帳號.github.io/pixel-game/`。

