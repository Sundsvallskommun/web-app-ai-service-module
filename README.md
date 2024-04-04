# Dokumentation för AI-assistentklient

Dokumentation för en react-baserad klient för AI-assistent. Denna applikation är designad för att enkelt integreras i befintliga webbsidor eller agera som en fristående chattjänst genom användning av webbkomponenter. Nedan följer en guide för att sätta upp, konfigurera och använda applikationen.

## Översikt

Klienten är utvecklad med React och Vite, och designad för att kommunicera med en backend via Server-Sent Events (SSE), med hjälp av `@microsoft/fetch-event-source`. Den kan inbäddas som en isolerad webbkomponent, vilket förhindrar CSS-kollisioner med värdwebbplatsen, men går också att inkluderas som en komponent direkt på sidan. Appen positioneras där det inbäddande elementet är placerat på sidan.

Appen använder tailwindcss samt Sundsvalls kommuns komponentbibliotek.

## Installation och Integration

### Integration som Webbkomponent

För att använda klienten som en webbkomponent och därmed isolera dess CSS, använd följande kod:

```html
<script type="module" crossorigin="" src="path/to/servicemodule.js"></script>
<div id="servicemodulewrapper">
  <template id="apptemplate">
    <div
      id="servicemoduleroot"
      data-user="..."
      data-hash="..."
      data-assistant="..."
    ></div>
    <link rel="stylesheet" crossorigin="" href="path/to/servicemodule.css" />
  </template>
</div>
```

Detta gör att klientens stil inte påverkar eller påverkas av den omgivande webbsidans CSS, genom att klienten körs i en shadow dom. Undantaget är den omgivande sidan basfontstorlek, som antingen sätts med font-size på <html>-taggen eller använder webläsarens standard (ofta 16px). Klienten är designad för en basfontstorlek på 10px.

Ersätt `path/to/servicemodule.js` och `path/to/servicemodule.css` med de faktiska sökvägarna till applikationens JavaScript och CSS-filer. Parametrarna `data-user`, `data-hash`, och `data-assistant` ska fyllas i med relevanta värden för användaren.

`data-user` är i praktiken användarnamnet för den inloggade användaren om den omgivande sidan är t ex intranätet, och annars en tom sträng.

`data-assistant` är ett guid som anger vilken assistent backend skall använda.

### Direkt Integration i Webbsida

För att integrera klienten direkt, använd följande kodsnutt:

```html
<div
  id="servicemoduleroot"
  data-user="..."
  data-hash="..."
  data-assistant="..."
></div>
<script type="module" src="path/to/servicemodule.js"></script>
<link rel="stylesheet" href="path/to/servicemodule.css" />
```

### Konfiguration

#### Applikationslägen

Innan applikationen kan startas/byggas behöver en fil `index.html` skapas utifrån mallen `index.html.example` och värden för username, assistent-id och hash fyllas i.

Applikationen kan köras i olika lägen som specificeras genom miljövariabler. För att starta applikationen i ett visst läge, skapa en `.env`-fil (t.ex., `.env.foobar.local`) med lämpliga konfigurationer och starta applikationen med:

```bash
yarn dev --mode=foobar
```

Använd det lämpliga `appName` t ex `FOOBAR` för det valda läget. Detta används då vid generering av hashvärdet.

I skrivande stund för versioner för Vuxenutbildning samt Servanet.

#### Generering av `data-hash`

För att generera `data-hash` värdet, använd följande pseudokod:

```pseudocode
input = `${data-user}${data-assistant}${appName}${salt}`
hash = sha256(input).toBase64()
```

Ersätt `data-user`, `data-assistant`, `appName`, och `salt` med dina specifika värden. `appName` och `salt` är konfigurerbara parametrar som specificeras vid uppstart av applikationen.

### Backendkommunikation

Vid varje anrop till backend, ska `data-user`, `data-hash`, `data-assistant`, och `appName` skickas som anpassade headers: `_skuser`, `_skhash`, `_skassistant`, samt `_skapp`. Backend använder dessa värden för att generera och verifiera ett matchande hashvärde. Vid icke matchande värde returneras HTTP 401.
