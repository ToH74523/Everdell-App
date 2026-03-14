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
            description: 'Punkte von Kreaturen und Bauwerken',
            defaultValue: 0,
            min: 0,
            requires: null
        },
        basePoints: {
            id: 'basePoints',
            label: 'Basispunkte',
            description: 'Punkte von Plättchen und anderen Quellen',
            defaultValue: 0,
            min: 0,
            requires: null
        },
        bonusPoints: {
            id: 'bonusPoints',
            label: 'Bonuspunkte',
            description: 'Punkte von Zielen und Ereignissen',
            defaultValue: 0,
            min: 0,
            requires: null
        },
        coins: {
            id: 'coins',
            label: 'Münzen (÷3)',
            description: 'Nur Pearlbrook: 3 Münzen = 1 Punkt',
            defaultValue: 0,
            min: 0,
            divisor: 3,
            requires: 'pearlbrook'
        },
        journeyPoints: {
            id: 'journeyPoints',
            label: 'Reisepunkte',
            description: 'Punkte von Reise-Karten',
            defaultValue: 0,
            min: 0,
            requires: 'spirecrest'
        },
        deductions: {
            id: 'deductions',
            label: 'Abzüge',
            description: 'Strafpunkte abziehen',
            defaultValue: 0,
            min: 0,
            negative: true,
            requires: null
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
