# 🌲 Everdell Score Calculator

Eine Progressive Web App (PWA) zum einfachen Auswerten von Everdell-Spielen mit allen Erweiterungen.

## Features

- **Alle Erweiterungen unterstützt**: Grundspiel, Bellfaire, Spirecrest, Pearlbrook, Newleaf, Mistwood, Farshore
- **Automatische Punktberechnung**: Kartenpunkte, Basispunkte, Bonuspunkte, Münzen, Abzüge
- **Gewinnerermittlung**: Automatische Sortierung und Anzeige des Gewinners
- **Mobile-optimiert**: Funktioniert perfekt auf iPhone und iPad
- **Offline-fähig**: PWA kann auf dem Home-Screen installiert werden
- **Everdell-Design**: Authentisches Farbschema und Typografie

## Installation

### Lokal testen

1. Repository klonen oder herunterladen
2. `index.html` in einem modernen Browser öffnen
3. Für vollständige PWA-Features (Service Worker) einen lokalen Server starten:

```bash
# Mit Python
python -m http.server 8000

# Mit Node.js
npx serve

# Mit PHP
php -S localhost:8000
```

4. Browser öffnen: `http://localhost:8000`

### Auf GitHub Pages deployen

1. Neues GitHub Repository erstellen
2. Alle Dateien hochladen:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/[username]/everdell-score.git
   git push -u origin main
   ```

3. GitHub Pages aktivieren:
   - Repository → Settings → Pages
   - Source: "Deploy from a branch"
   - Branch: `main` / `(root)`
   - Save

4. Warten bis Deployment fertig ist (ca. 1-2 Minuten)
5. URL: `https://[username].github.io/everdell-score/`

### Auf iPhone/iPad installieren

1. Safari öffnen und die URL aufrufen
2. Teilen-Button ( quadratischer Pfeil nach oben) antippen
3. "Zum Home-Bildschirm" wählen
4. Name bestätigen und hinzufügen
5. App ist jetzt wie eine native App verfügbar!

## Nutzung

### 1. Spielvorbereitung
- Spieleranzahl wählen (1-6 Spieler)
- Spielernamen eingeben
- Gewünschte Erweiterungen aktivieren

### 2. Punkte eingeben
- Pro Spieler Punkte eintragen:
  - **Kartenpunkte**: Kreaturen + Bauwerke
  - **Basispunkte**: Plättchen etc.
  - **Bonuspunkte**: Ziele & Ereignisse
  - **Münzen** (Pearlbrook): 3 Münzen = 1 Punkt
  - **Reisepunkte** (Spirecrest): Reise-Karten
  - **Abzüge**: Strafpunkte abziehen
- Gesamtsumme wird automatisch berechnet

### 3. Gewinner ermitteln
- "Gewinner ermitteln" klicken
- Rangliste mit Punkten wird angezeigt
- Gewinner wird hervorgehoben

### 4. Neues Spiel
- "Neues Spiel" startet eine neue Runde

## Technologie

- **HTML5** - Struktur
- **CSS3** - Everdell-Design mit CSS Variables
- **Vanilla JavaScript** - Keine Dependencies
- **Service Worker** - Offline-Unterstützung
- **PWA Manifest** - Installierbarkeit

## Erweiterungen

| Erweiterung | Spezielle Features |
|------------|-------------------|
| Grundspiel | Basis-Punktekategorien |
| Bellfaire | Besucher-Bonus |
| Spirecrest | Reisepunkte, Entdeckungsplättchen |
| Pearlbrook | Münzen (÷3), Schmuck |
| Newleaf | Zeitung, Bahnhof |
| Mistwood | Versteckte Ziele |
| Farshore | Küsten-Abenteuer |

## Browser-Unterstützung

- ✅ Safari (iOS 12+)
- ✅ Chrome (Android & Desktop)
- ✅ Firefox
- ✅ Edge
- ✅ Opera

## Icons erstellen

Für ein vollständiges PWA-Erlebnis sollten Icons im Ordner `icons/` erstellt werden:

- icon-72.png (72x72)
- icon-96.png (96x96)
- icon-128.png (128x128)
- icon-144.png (144x144)
- icon-152.png (152x152)
- icon-192.png (192x192)
- icon-384.png (384x384)
- icon-512.png (512x512)

**Tipp**: Nutze Tools wie [RealFaviconGenerator](https://realfavicongenerator.net/) oder [PWA Asset Generator](https://github.com/nicholasalx/pwa-asset-generator).

## Customization

### Farben ändern

In `css/style.css` die CSS Variables anpassen:

```css
:root {
    --bg-cream: #f7f3e9;
    --accent-gold: #c9a227;
    --forest-green: #4a7c59;
    /* ... */
}
```

### Neue Erweiterungen hinzufügen

In `js/data.js` neue Expansion definieren:

```javascript
myExpansion: {
    id: 'myExpansion',
    name: 'Meine Erweiterung',
    active: false,
    description: 'Beschreibung'
}
```

Und entsprechende Punktekategorie:

```javascript
myPoints: {
    id: 'myPoints',
    label: 'Meine Punkte',
    defaultValue: 0,
    min: 0,
    requires: 'myExpansion' // Optional
}
```

## Lizenz

MIT License - Freie Nutzung für persönliche und kommerzielle Projekte.

## Credits

- Design inspiriert von **Everdell** (Starling Games)
- Fonts: [Cinzel Decorative](https://fonts.google.com/specimen/Cinzel+Decorative) & [Crimson Text](https://fonts.google.com/specimen/Crimson+Text)

---

**Viel Spaß beim Spielen! 🌲🦊🍂**
