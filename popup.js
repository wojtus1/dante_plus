document.getElementById('solve-btn').addEventListener('click', async () => {
    const aiChoice = document.getElementById('ai-choice').value;

    const urls = {
        'gemini': 'https://gemini.google.com/app',
        'claude': 'https://claude.ai/new',
        'chatgpt': 'https://chatgpt.com/'

    };

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab) return;

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: extractTaskText
    }, (results) => {
        if (results && results[0] && results[0].result) {
            const finalPrompt = results[0].result;

            // Zapisujemy prompt w pamięci przeglądarki i otwieramy AI
            chrome.storage.local.set({ autoPrompt: finalPrompt }, () => {
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
        if (taskWindow) {
            textToCopy = taskWindow.innerText;
        } else {
            textToCopy = document.body.innerText;
        }
    }

    const finalPrompt = "Rozwiąż to zadanie z programowania (napisz kod w C). Oto treść:\n\n" + textToCopy;

    const textArea = document.createElement("textarea");
    textArea.value = finalPrompt;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);

    return finalPrompt;
}
