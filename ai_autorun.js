window.addEventListener('load', () => {
    chrome.storage.local.get(['autoPrompt'], (result) => {
        if (!result.autoPrompt) return;

        const prompt = result.autoPrompt;
        chrome.storage.local.remove('autoPrompt');

        let attempts = 0;
        const interval = setInterval(() => {
            attempts++;
            if (attempts > 30) { // Czekamy maksymalnie 15 sekund
                clearInterval(interval);
                return;
            }

            let inputElement = null;
            let sendButton = null;
            const url = window.location.href;

            if (url.includes('chatgpt.com')) {
                inputElement = document.querySelector('#prompt-textarea');
            } else if (url.includes('claude.ai')) {
                inputElement = document.querySelector('div[contenteditable="true"]');
            } else if (url.includes('gemini.google.com')) {
                inputElement = document.querySelector('rich-textarea div[contenteditable="true"]') || document.querySelector('.ql-editor');
            }

            if (inputElement) {
                clearInterval(interval);

                // 1. Aktywacja pola
                inputElement.focus();
                inputElement.click();

                // 2. Wklejenie tekstu
                document.execCommand('insertText', false, prompt);

                // 3. Symulacja dla React.js (oszukujemy, że użytkownik pisze ręcznie)
                inputElement.dispatchEvent(new Event('input', { bubbles: true }));
                inputElement.dispatchEvent(new Event('change', { bubbles: true }));
                inputElement.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true, key: ' ' }));

                // 4. Odczekanie sekundy na przetworzenie przez stronę
                setTimeout(() => {
                    if (url.includes('chatgpt.com')) {
                        sendButton = document.querySelector('[data-testid="send-button"]');
                    } else if (url.includes('claude.ai')) {
                        sendButton = document.querySelector('button[aria-label="Send message"]');
                    } else if (url.includes('gemini.google.com')) {
                        sendButton = document.querySelector('button.send-button') || document.querySelector('button[aria-label="Send message"]') || document.querySelector('button[aria-label="Wyślij wiadomość"]');
                    }

                    if (sendButton) {
                        // Agresywne odblokowanie przycisku dla ChatGPT przed kliknięciem
                        sendButton.removeAttribute('disabled');
                        sendButton.click();
                    } else {
                        // Awaryjny Enter
                        const enterEvent = new KeyboardEvent('keydown', {
                            bubbles: true, cancelable: true, keyCode: 13, key: 'Enter', code: 'Enter'
                        });
                        inputElement.dispatchEvent(enterEvent);
                    }
                }, 1000);
            }
        }, 500);
    });
});
