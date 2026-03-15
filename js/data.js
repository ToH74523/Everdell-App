const EVERDELL_DATA = {
    expansions: {
        base: {
            id: 'base',
            name: 'Grundspiel',
            active: true,
            required: true
        },
        bellfaire: {
            id: 'bellfaire',
            name: 'Bellfaire',
            active: false,
            description: 'Neue Bewohner und Fähigkeiten'
        },
        spirecrest: {
            id: 'spirecrest',
            name: 'Spirecrest',
            active: false,
            description: 'Entdeckungsplättchen und neues Gelände'
        },
        pearlbrook: {
            id: 'pearlbrook',
            name: 'Pearlbrook',
            active: false,
            description: 'Münzen und Schmuck-Features'
        },
        newleaf: {
            id: 'newleaf',
            name: 'Newleaf',
            active: false,
            description: 'Zeitung und Bahnhof'
        },
        mistwood: {
            id: 'mistwood',
            name: 'Mistwood',
            active: false,
            description: 'Versteckte Ziele'
        },
        farshore: {
            id: 'farshore',
            name: 'Farshore',
            active: false,
            description: 'Küsten-Abenteuer'
        }
    },

    categories: {
        cardPoints: {
            id: 'cardPoints',
            label: 'Kartenpunkte',
            description: 'Punkte auf Kreaturen und Bauwerken',
            defaultValue: 0,
            min: 0,
            requires: null
        },
        pointMarkers: {
            id: 'pointMarkers',
            label: 'Punktemarker',
            description: 'Gesammelte Punktemarker',
            defaultValue: 0,
            min: 0,
            requires: null
        },
        prosperityCards: {
            id: 'prosperityCards',
            label: 'Wohlstandskarten',
            description: 'Punkte von Wohlstandskarten',
            defaultValue: 0,
            min: 0,
            requires: null
        },
        journey: {
            id: 'journey',
            label: 'Reise',
            description: 'Erreichte Reisepunkte',
            defaultValue: 0,
            min: 0,
            requires: null
        },
        events: {
            id: 'events',
            label: 'Ereignisse',
            description: 'Abgeschlossene Ereignisse',
            defaultValue: 0,
            min: 0,
            requires: null
        },
        festival: {
            id: 'festival',
            label: 'Fest',
            description: 'Bellfaire: Festpunkte',
            defaultValue: 0,
            min: 0,
            requires: 'bellfaire'
        },
        pearls: {
            id: 'pearls',
            label: 'Perlen',
            description: 'Pearlbrook: Gesammelte Perlen',
            defaultValue: 0,
            min: 0,
            requires: 'pearlbrook'
        },
        wonders: {
            id: 'wonders',
            label: 'Wunder',
            description: 'Pearlbrook: Erbaute Wunder',
            defaultValue: 0,
            min: 0,
            requires: 'pearlbrook'
        },
        adornments: {
            id: 'adornments',
            label: 'Schmuckstücke',
            description: 'Pearlbrook: Gesammelte Schmuckstücke',
            defaultValue: 0,
            min: 0,
            requires: 'pearlbrook'
        },
        discoveries: {
            id: 'discoveries',
            label: 'Entdeckungen',
            description: 'Spirecrest: Entdeckungsplättchen',
            defaultValue: 0,
            min: 0,
            requires: 'spirecrest'
        },
        post: {
            id: 'post',
            label: 'Post',
            description: 'Newleaf: Postkartenpunkte',
            defaultValue: 0,
            min: 0,
            requires: 'newleaf'
        }
    },

    playerColors: [
        { name: 'Rosa', color: '#e8b4b8' },
        { name: 'Grün', color: '#a8c8b8' },
        { name: 'Gold', color: '#f4d58d' },
        { name: 'Blau', color: '#8fb8de' },
        { name: 'Bernstein', color: '#d4a574' },
        { name: 'Lavendel', color: '#b8a9c9' }
    ],

    maxPlayers: 6,
    minPlayers: 1
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = EVERDELL_DATA;
}
