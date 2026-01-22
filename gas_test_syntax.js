
const SHEET_QUESTIONS = "題目";
const SHEET_ANSWERS = "回答";

function doGet(e) {
    const params = e.parameter;
    const action = params.action;

    if (action === "getQuestions") {
        return getQuestions(params.count);
    }

    return jsonResponse({ status: "error", message: "Invalid action" });
}

function doPost(e) {
    let data;
    try {
        data = JSON.parse(e.postData.contents);
    } catch (err) {
        return jsonResponse({ status: "error", message: "Invalid JSON" });
    }

    return submitResult(data);
}

function getQuestions(count) {
    // Mock SpreadsheetApp for local syntax check
    // const ss = SpreadsheetApp.getActiveSpreadsheet(); 
    return [];
}

function submitResult(data) {
    return {};
}

function jsonResponse(obj) {
    return JSON.stringify(obj);
}
