document.getElementById('solve-btn').addEventListener('click', async () => {
    const aiChoice = document.getElementById('ai-choice').value;

    const urls = {
        'chatgpt': 'https://chatgpt.com/',
        'claude': 'https://claude.ai/new',
        'gemini': 'https://gemini.google.com/app'
    };

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab) return;

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: extractAndCopyTask
    }, () => {
        chrome.tabs.create({ url: urls[aiChoice] });
    });
});

function extractAndCopyTask() {
    let textToCopy = "";
    const selection = window.getSelection().toString();

    if (selection) {
        textToCopy = selection;
    } else {
        const taskWindow = document.getElementById('taskwindow');
        if (taskWindow) {
            textToCopy = taskWindow.innerText;
        } else {
            textToCopy = document.body.innerText;
        }
    }

    const finalPrompt = "Rozwiąż to zadanie z programowania (napisz kod w C/C++). Oto treść:\n\n" + textToCopy;

    const textArea = document.createElement("textarea");
    textArea.value = finalPrompt;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
}
