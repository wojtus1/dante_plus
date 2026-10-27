# Dante Plus - AI Solver & Auto Uploader

Dante Plus to zaawansowane rozszerzenie do przeglądarek opartych na silniku Chromium (Chrome, Brave, Edge), które automatyzuje obieg pracy podczas rozwiązywania zadań programistycznych na uczelnianej platformie Dante.

Dodatek ułatwia przenoszenie treści zadań do asystentów AI (ChatGPT, Claude, Gemini) oraz błyskawiczne wgrywanie wygenerowanego kodu (lub plików ze środowiska CLion) z powrotem na platformę edukacyjną.

## ✨ Główne funkcje

* **Smart Extract (Przycisk SOLVE):** Automatycznie pobiera treść zadania z platformy Dante, tworzy gotowy prompt (polecenie dla AI) i otwiera nową kartę z wybranym asystentem sztucznej inteligencji.
* **AI Auto-Run:** Próbuje automatycznie wkleić i wysłać zadanie na stronie wybranego AI, oszczędzając czas na ręczne wpisywanie.
* **Magiczna wklejka (Cmd + V / Ctrl + V):**
    * **Dla tekstu:** Przechwytuje skopiowany czysty kod ze strony AI, w ułamek sekundy w tle tworzy z niego fizyczny plik `main.c`, przechodzi do zakładki "Pliki" i automatycznie go wgrywa.
    * **Dla plików:** Pozwala na bezpośrednie wklejenie plików skopiowanych z drzewa projektu w IDE (np. CLion) prosto na stronę zadania bez konieczności ich ręcznego szukania na dysku.

## 🛠 Instalacja

Ponieważ jest to rozszerzenie niestandardowe, należy je zainstalować w trybie deweloperskim:

1. Pobierz lub utwórz folder z plikami rozszerzenia (muszą się w nim znajdować: `manifest.json`, `popup.html`, `popup.js`, `content.js`, `ai_autorun.js`).
2. Otwórz przeglądarkę i w pasku adresu wpisz: `chrome://extensions/` (lub `brave://extensions/`, `edge://extensions/`).
3. W prawym górnym rogu włącz opcję **Tryb programisty** (Developer mode).
4. Kliknij przycisk **Załaduj rozpakowane** (Load unpacked) w lewym górnym rogu.
5. Wybierz folder z plikami rozszerzenia.
6. (Opcjonalnie) Kliknij ikonę puzzla na górnym pasku przeglądarki i "przypnij" rozszerzenie Dante Plus, aby było zawsze widoczne.

## 🚀 Jak z tego korzystać? (Workflow)

Cały proces został zoptymalizowany pod kątem szybkości i wygody.

### Opcja A: Rozwiązywanie z pomocą AI
1. Wejdź na stronę konkretnego zadania na platformie Dante.
2. Kliknij ikonę rozszerzenia na pasku przeglądarki.
3. Wybierz z listy preferowane AI (ChatGPT, Claude, Gemini) i kliknij przycisk **SOLVE**.
4. Otworzy się nowa karta. Skrypt automatycznie wyśle tam treść Twojego zadania.
5. Gdy AI wygeneruje odpowiedź, skopiuj sam kod (zazwyczaj służy do tego przycisk "Copy code" w rogu bloku kodu).
6. Wróć na kartę z zadaniem Dante.
7. Kliknij lewym przyciskiem myszy raz w puste (białe) tło strony i wciśnij **Cmd + V** (Mac) lub **Ctrl + V** (Windows).
8. Skrypt sam zmieni tekst w plik `main.c` i prześle go do systemu.

### Opcja B: Praca we własnym środowisku (np. CLion)
1. Napisz kod w swoim IDE.
2. Kliknij prawym przyciskiem myszy na plik z kodem (np. `main.c`) w drzewie plików i wybierz "Kopiuj" (lub zaznacz i wciśnij Cmd+C / Ctrl+C).
3. Wejdź na stronę zadania w systemie Dante.
4. Kliknij lewym przyciskiem myszy w puste tło i wciśnij **Cmd + V** / **Ctrl + V**.
5. Skrypt automatycznie otworzy zakładkę "Pliki" i wgra skopiowany plik źródłowy.

## 📂 Struktura plików

* `manifest.json` – Plik konfiguracyjny (serce rozszerzenia), zawiera uprawnienia i wskaźniki do skryptów.
* `popup.html` / `popup.js` – Interfejs i logika menu wysuwanego (wybór AI i przycisk SOLVE).
* `content.js` – Skrypt działający w tle na stronach Dante. Odpowiada za "Magiczną Wklejkę", nasłuchując zdarzenia *paste* (`Cmd + V`).
* `ai_autorun.js` – Skrypt wstrzykiwany na strony AI (ChatGPT/Claude/Gemini), który odpowiada za automatyczne wklejenie i wysłanie promptu z pamięci przeglądarki.

## ⚠️ Uwagi i rozwiązywanie problemów

* **Wklejanie nie działa na Dante:** Upewnij się, że kliknąłeś najpierw w puste tło strony. Jeśli strona była otwarta przed instalacją/aktualizacją dodatku, koniecznie ją odśwież (`Cmd + R`).
* **Przycisk SOLVE nie reaguje:** Prawdopodobnie używasz go na stronie, która nie jest platformą Dante lub karta utraciła połączenie z dodatkiem. Odśwież stronę z zadaniem.
* **Brak auto-wysyłania w ChatGPT:** Strony oparte na zaawansowanych frameworkach (jak ChatGPT) często zmieniają kod i aktywnie blokują automatyzację. W takim wypadku po kliknięciu SOLVE i otwarciu ChatGPT wystarczy kliknąć w pole czatu, wcisnąć `Cmd + V` i kliknąć Enter (treść zadania czeka już w schowku).