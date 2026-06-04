# Daewoo Garage

Aplikacja mobilna w Expo / React Native związana z garażem i modelami Daewoo.

## Screenshoty
screenshots/home.png
screenshots/details.png
screenshots/favorites.png
screenshots/garage.png
screenshots/darkmode.png

## Funkcje

- katalog modeli Daewoo,
- wyszukiwarka modeli,
- ekran szczegółów auta z parametrem trasy `/car/[id]`,
- ulubione auta zapisywane globalnie przez Zustand,
- zapis danych w AsyncStorage,
- dodawanie zdjęcia auta z galerii przez Expo Image Picker,
- responsywny układ listy przez `useWindowDimensions`,
- FlatList zamiast ScrollView dla listy aut,
- 22 testy jednostkowe sprawdzające logikę aplikacji, store Zustand, AsyncStorage, SecureStore oraz komponenty UI.
- Build wykonany za pomocą EAS Build (Android Preview).

## Technologie

- React Native
- Expo
- Expo Router
- TypeScript
- Zustand
- AsyncStorage
- Expo Image Picker
- Jest


## Przed uruchomieniem projketu należy zainstalować:
- node.js 20 lub nowszy
- npm 
- expo go na Android lub iOS

Sprawdzenie wersji: 
- node -v
- npm -v

## 1. Sklonuj repozytorium:
Korzystamy z górnej belki wyszukiwania Quick Access
```bash
git clone <https://github.com/laskoj/daewoo-garage>
```
## 2. Instalacja npm
Musimy mieć uruchmiony terminal, możemy go uruchomić CTRL + J
```bash
npm install
```
## 3. Uruchomienie projektu

```bash
npx expo start
```
## 4. Zeskanuj kod QR aplikacją Expo Go na telefonie.
```bash
W terminalu wyświetla się kod QR. 
```


W przeglądarce:
```bash
npx expo start --web
```
## Uruchomienie Testów

```bash
npm test
```
## Weryfikacja jakości kodu
```bash
npm run lint
```

## Build APK przez EAS

```bash
npm install -g eas-cli
eas login
eas build --platform android --profile preview
```

## Struktura projektu
app/                - ekrany aplikacji i routing Expo Router
components/         - komponenty wielokrotnego użytku
constants/          - dane modeli Daewoo
src/store/          - Zustand Store
src/utils/          - filtrowanie i sortowanie
__tests__/          - testy jednostkowe
assets/             - obrazy i ikony


## Co pokazuje projekt względem wymagań

- Architektura: podział na `app`, `components`, `constants`, `src/store`, `src/utils`.
- Stan globalny: Zustand.
- Offline/persist: AsyncStorage.
- Funkcje natywne: galeria zdjęć przez Image Picker.
- Nawigacja: tabs + stack + dynamic route.
- UI/UX: spójne karty, kolory i spacing.
- Responsywność: `useWindowDimensions` i liczba kolumn zależna od szerokości.
