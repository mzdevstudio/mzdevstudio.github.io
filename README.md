# MZDevStudio

Strona wizytówkowa i portfolio **MZDevStudio** (React 19, Vite, TypeScript, Tailwind CSS v4, Motion).

## Wymagania

- Node.js (zalecana wersja LTS 20+)

## Uruchomienie lokalne

1. Zainstaluj zależności:
   ```bash
   npm install
   ```
2. Uruchom serwer deweloperski:
   ```bash
   npm run dev
   ```
3. Sprawdź typy TypeScript:
   ```bash
   npm run lint
   ```
4. Zbuduj paczkę produkcyjną (`dist/`):
   ```bash
   npm run build
   ```

## Konfiguracja adresu e-mail (opcjonalna)

Domyślny adres docelowy formularza kontaktowego (`mzdrowy@gmail.com`) można nadpisać zmienną środowiskową `VITE_CONTACT_EMAIL` w pliku `.env.local` (wzór znajduje się w `.env.example`).

## Wdrożenie na GitHub Pages

Automatyczne wdrożenie uruchamia workflow `.github/workflows/deploy.yml` po każdym pushu na gałąź `main`. W repozytorium `mzdevstudio/mzdevstudio.github.io` strona publikuje się pod adresem `https://mzdevstudio.github.io/`, a po dodaniu własnej domeny (`mzdevstudio.pl`) w ustawieniach repozytorium (**Settings → Pages → Custom domain**) i ponownym uruchomieniu workflow automatycznie aktualizuje adresy kanoniczne i mapę witryny.
