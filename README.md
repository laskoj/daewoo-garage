# Daewoo Garage

Aplikacja mobilna w Expo / React Native związana z garażem i modelami Daewoo.

## Funkcje

- katalog modeli Daewoo,
- wyszukiwarka modeli,
- ekran szczegółów auta z parametrem trasy `/car/[id]`,
- ulubione auta zapisywane globalnie przez Zustand,
- zapis danych w AsyncStorage,
- dodawanie zdjęcia auta z galerii przez Expo Image Picker,
- responsywny układ listy przez `useWindowDimensions`,
- FlatList zamiast ScrollView dla listy aut,
- podstawowe testy logiki.

## Technologie

- React Native
- Expo
- Expo Router
- TypeScript
- Zustand
- AsyncStorage
- Expo Image Picker
- Jest

## Instalacja

```bash
npm install
```

## Uruchomienie

```bash
npx expo start
```

W przeglądarce:

```bash
npx expo start --web
```

## Testy

```bash
npm test
```

## Build APK przez EAS

```bash
npm install -g eas-cli
eas login
eas build --platform android --profile preview
```

## Co pokazuje projekt względem wymagań

- Architektura: podział na `app`, `components`, `constants`, `src/store`, `src/utils`.
- Stan globalny: Zustand.
- Offline/persist: AsyncStorage.
- Funkcje natywne: galeria zdjęć przez Image Picker.
- Nawigacja: tabs + stack + dynamic route.
- UI/UX: spójne karty, kolory i spacing.
- Responsywność: `useWindowDimensions` i liczba kolumn zależna od szerokości.
