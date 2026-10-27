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
        function: extractTaskText
    }, (results) => {
        if (results && results[0] && results[0].result) {
            chrome.storage.local.set({ autoPrompt: results[0].result }, () => {
                chrome.tabs.create({ url: urls[aiChoice] });
            });
        }
    });
});

function extractTaskText() {
    let textToCopy = "";
    const selection = window.getSelection().toString();

    if (selection) {
        textToCopy = selection;
    } else {
        const taskWindow = document.getElementById('taskwindow');
        textToCopy = taskWindow ? taskWindow.innerText : document.body.innerText;
    }

    const finalPrompt = "Rozwiąż to zadanie z programowania (napisz kod w C/C++). Zwróć sam czysty kod bez żadnego tekstu:\n\n" + textToCopy;

    const textArea = document.createElement("textarea");
    textArea.value = finalPrompt;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);

    return finalPrompt;
}
