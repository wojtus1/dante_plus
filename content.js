document.addEventListener('paste', async function(event) {
    const files = (event.clipboardData || window.clipboardData).files;

    if (!files || files.length === 0) {
        console.log("Brak plików w schowku (upewnij się, że kopiujesz plik z drzewa projektu CLion, a nie sam tekst).");
        return;
    }

    console.log("Wykryto pliki w schowku! Ilość:", files.length);

    const tabs = document.querySelectorAll('a.nav-link');
    let plikiTab = null;
    for (let tab of tabs) {
        if (tab.textContent.includes('Pliki')) {
            plikiTab = tab;
            break;
        }
    }

    if (plikiTab) {
        console.log("Znaleziono zakładkę 'Pliki', klikam...");
        plikiTab.click();

        await new Promise(resolve => setTimeout(resolve, 300));
    }

    const fileInput = document.querySelector('input[type="file"]');

    if (fileInput) {
        const dataTransfer = new DataTransfer();
        for (let i = 0; i < files.length; i++) {
            dataTransfer.items.add(files[i]);
        }

        fileInput.files = dataTransfer.files;

        fileInput.dispatchEvent(new Event('change', { bubbles: true }));
        console.log("Sukces: Pliki zostały automatycznie załadowane!");
    } else {
        console.warn("Nie znaleziono pola <input type='file'>. Próba awaryjnego upuszczenia (drop).");

        const dropEvent = new DragEvent('drop', {
            bubbles: true,
            cancelable: true,
            dataTransfer: event.clipboardData
        });

        const container = document.querySelector('.tab-content') || document.body;
        container.dispatchEvent(dropEvent);
    }
});
