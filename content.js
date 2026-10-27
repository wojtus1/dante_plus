window.addEventListener('paste', async function(event) {
    const clipboardData = event.clipboardData || window.clipboardData;
    if (!clipboardData) return;

    const pastedFiles = clipboardData.files;
    const pastedText = clipboardData.getData('text');

    if ((!pastedFiles || pastedFiles.length === 0) && (!pastedText || pastedText.trim().length === 0)) return;

    const dataTransfer = new DataTransfer();
    let hasFiles = false;

    if (pastedFiles && pastedFiles.length > 0) {
        for (let i = 0; i < pastedFiles.length; i++) {
            dataTransfer.items.add(pastedFiles[i]);
        }
        hasFiles = true;
    }
    else if (pastedText && pastedText.trim().length > 0) {
        const file = new File([pastedText], "main.c", {
            type: "text/plain",
            lastModified: Date.now()
        });
        dataTransfer.items.add(file);
        hasFiles = true;
        event.preventDefault();
    }

    if (!hasFiles) return;

    const tabs = document.querySelectorAll('a.nav-link');
    for (let tab of tabs) {
        if (tab.textContent.includes('Pliki')) {
            tab.click();
            break;
        }
    }

    let fileInput = null;
    for (let i = 0; i < 20; i++) {
        await new Promise(r => setTimeout(r, 100));
        fileInput = document.querySelector('input[type="file"]');
        if (fileInput) break;
    }

    if (fileInput) {
        fileInput.files = dataTransfer.files;
        fileInput.dispatchEvent(new Event('change', { bubbles: true }));
    }
}, { capture: true });
