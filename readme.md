# Dante Auto Paster 🚀

Proste, ale potężne rozszerzenie do przeglądarek opartych na Chromium (Chrome, Edge, Brave), które automatyzuje proces dodawania plików z kodem (np. z IDE takich jak CLion) na uczelnianą platformę Dante.

## 🌟 Funkcje

- **Nasłuchiwanie schowka:** Automatycznie wykrywa skopiowane pliki po użyciu skrótu `Cmd+V` / `Ctrl+V` na stronie zadania.
- **Inteligentna nawigacja:** Rozszerzenie samo znajduje i otwiera zakładkę "Pliki" w interfejsie Dante (Vue.js).
- **Automatyczny upload:** Bezpośrednio wstrzykuje pliki ze schowka do ukrytego mechanizmu wgrywania platformy, oszczędzając czas na ręczne przeciąganie i upuszczanie (Drag & Drop).

## 🛠 Instalacja

Ponieważ jest to rozszerzenie niestandardowe, należy zainstalować je w tzw. **Trybie programisty**.

1. Pobierz ten folder na swój dysk (np. `dante_plus`).
2. Otwórz swoją przeglądarkę i w pasku adresu wpisz: `chrome://extensions/` (lub odpowiednio `brave://extensions/`, `edge://extensions/`).
3. W prawym górnym rogu ekranu włącz **Tryb programisty** (Developer mode).
4. W lewym górnym rogu kliknij przycisk **Załaduj rozpakowane** (Load unpacked).
5. Z okna dialogowego wybierz folder zawierający pliki rozszerzenia (`manifest.json` oraz `content.js`).
6. Gotowe! Rozszerzenie jest aktywne.

## 💻 Jak używać?

1. Przejdź do swojego środowiska programistycznego (np. CLion).
2. W drzewie projektu kliknij na plik, który chcesz wgrać, i skopiuj go standardowym skrótem **`Cmd + C`** (Mac) lub **`Ctrl + C`** (Windows/Linux). *Uwaga: kopiujesz cały plik, a nie tekst w nim zawarty.*
3. Przejdź do przeglądarki na stronę konkretnego zadania w systemie Dante.
4. Kliknij lewym przyciskiem myszy w dowolne puste miejsce na stronie zadania, by upewnić się, że okno jest aktywne.
5. Wciśnij **`Cmd + V`** (Mac) lub **`Ctrl + V`** (Windows/Linux).
6. Rozszerzenie automatycznie przełączy zakładkę i wgra Twój kod!

## 🔧 Rozwiązywanie problemów

- **Błąd: "Manifest is not valid JSON" podczas instalacji:** Upewnij się, że plik `manifest.json` zaczyna się od znaku `{` i nie zawiera na początku ani na końcu ukrytych znaków czy znaczników z czatu (np. ````json`).
- **Skrypt nie reaguje po wciśnięciu `Cmd+V`:** Upewnij się, że skopiowałeś z IDE *plik* (jako obiekt), a nie sam zaznaczony tekst kodu wewnątrz pliku.
- **Zakładka "Pliki" się otwiera, ale plik się nie dodaje:** Upewnij się, że strona w pełni się załadowała przed wklejeniem. Jeśli uczelnia zmieniła strukturę HTML systemu Dante, konieczna może być aktualizacja selektorów w pliku `content.js`.

---
*Stworzone w celu ułatwienia i przyspieszenia pracy studentów.*