class EverdellScoreApp {
    constructor() {
        this.players = [];
        this.expansions = {};
        this.playerCount = 2;
        this.currentView = 'setup';
        
        this.initializeExpansions();
        this.initializeEventListeners();
        this.updatePlayerInputs();
        this.renderExpansions();
    }

    initializeExpansions() {
        this.expansions = {};
        Object.keys(EVERDELL_DATA.expansions).forEach(key => {
            const expansion = EVERDELL_DATA.expansions[key];
            this.expansions[key] = {
                ...expansion,
                active: expansion.required || false
            };
        });
    }

    initializeEventListeners() {
        document.getElementById('count-decrease').addEventListener('click', () => {
            this.decreasePlayerCount();
        });

        document.getElementById('count-increase').addEventListener('click', () => {
            this.increasePlayerCount();
        });

        document.getElementById('start-game-btn').addEventListener('click', () => {
            this.startGame();
        });

        document.getElementById('back-to-setup-btn').addEventListener('click', () => {
            this.showView('setup');
        });

        document.getElementById('calculate-winner-btn').addEventListener('click', () => {
            this.calculateAndShowWinner();
        });

        document.getElementById('back-to-score-btn').addEventListener('click', () => {
            this.showView('score');
        });

        document.getElementById('new-game-btn').addEventListener('click', () => {
            this.resetGame();
        });
    }

    decreasePlayerCount() {
        if (this.playerCount > EVERDELL_DATA.minPlayers) {
            this.playerCount--;
            this.updatePlayerCountDisplay();
            this.updatePlayerInputs();
        }
    }

    increasePlayerCount() {
        if (this.playerCount < EVERDELL_DATA.maxPlayers) {
            this.playerCount++;
            this.updatePlayerCountDisplay();
            this.updatePlayerInputs();
        }
    }

    updatePlayerCountDisplay() {
        document.getElementById('player-count-display').textContent = this.playerCount;
    }

    updatePlayerInputs() {
        const container = document.getElementById('players-setup');
        container.innerHTML = '';

        for (let i = 1; i <= this.playerCount; i++) {
            const colorIndex = (i - 1) % EVERDELL_DATA.playerColors.length;
            const color = EVERDELL_DATA.playerColors[colorIndex];

            const playerDiv = document.createElement('div');
            playerDiv.className = 'player-name-input';
            playerDiv.innerHTML = `
                <span class="player-number">${i}.</span>
                <input type="text" 
                       class="player-name-field" 
                       id="player-name-${i}"
                       placeholder="Spielername eingeben"
                       maxlength="20"
                       autocomplete="off">
                <span class="player-color-indicator" style="background-color: ${color.color}"></span>
            `;
            container.appendChild(playerDiv);
        }
    }

    renderExpansions() {
        const container = document.getElementById('expansions-grid');
        container.innerHTML = '';

        Object.keys(this.expansions).forEach(key => {
            const expansion = this.expansions[key];
            
            const expansionDiv = document.createElement('div');
            expansionDiv.className = `expansion-toggle ${expansion.active ? 'active' : ''} ${expansion.required ? 'disabled' : ''}`;
            expansionDiv.dataset.expansion = key;
            
            expansionDiv.innerHTML = `
                <input type="checkbox" 
                       class="expansion-checkbox" 
                       id="expansion-${key}"
                       ${expansion.active ? 'checked' : ''}
                       ${expansion.required ? 'disabled' : ''}>
                <div class="expansion-info">
                    <span class="expansion-name">${expansion.name}</span>
                    ${expansion.description ? `<span class="expansion-desc">${expansion.description}</span>` : ''}
                </div>
            `;

            if (!expansion.required) {
                expansionDiv.addEventListener('click', (e) => {
                    if (e.target.type !== 'checkbox') {
                        this.toggleExpansion(key);
                    }
                });

                expansionDiv.querySelector('.expansion-checkbox').addEventListener('change', () => {
                    this.toggleExpansion(key);
                });
            }

            container.appendChild(expansionDiv);
        });
    }

    toggleExpansion(expansionKey) {
        if (this.expansions[expansionKey].required) {
            return;
        }

        this.expansions[expansionKey].active = !this.expansions[expansionKey].active;
        
        const expansionDiv = document.querySelector(`[data-expansion="${expansionKey}"]`);
        const checkbox = expansionDiv.querySelector('.expansion-checkbox');
        
        checkbox.checked = this.expansions[expansionKey].active;
        expansionDiv.classList.toggle('active', this.expansions[expansionKey].active);
    }

    startGame() {
        this.players = [];

        for (let i = 1; i <= this.playerCount; i++) {
            const nameInput = document.getElementById(`player-name-${i}`);
            const playerName = nameInput.value.trim() || `Spieler ${i}`;
            const colorIndex = (i - 1) % EVERDELL_DATA.playerColors.length;
            const color = EVERDELL_DATA.playerColors[colorIndex];

            const player = {
                id: i,
                name: playerName,
                color: color,
                scores: {}
            };

            Object.keys(EVERDELL_DATA.categories).forEach(categoryKey => {
                const category = EVERDELL_DATA.categories[categoryKey];
                if (!category.requires || this.expansions[category.requires].active) {
                    player.scores[categoryKey] = category.defaultValue;
                }
            });

            this.players.push(player);
        }

        this.renderScoreCards();
        this.updateActiveExpansionsDisplay();
        this.showView('score');
    }

    renderScoreCards() {
        const container = document.getElementById('players-grid');
        container.innerHTML = '';

        this.players.forEach((player, index) => {
            const playerCard = document.createElement('div');
            playerCard.className = 'player-card';
            playerCard.style.animationDelay = `${index * 0.1}s`;

            let categoriesHTML = '';
            Object.keys(EVERDELL_DATA.categories).forEach(categoryKey => {
                const category = EVERDELL_DATA.categories[categoryKey];
                
                if (!category.requires || this.expansions[category.requires].active) {
                    const isNegative = category.negative;
                    categoriesHTML += `
                        <div class="score-category">
                            <label class="category-label" for="score-${player.id}-${categoryKey}">
                                ${category.label}
                            </label>
                            <input type="number" 
                                   class="category-input ${isNegative ? 'negative' : ''}"
                                   id="score-${player.id}-${categoryKey}"
                                   data-player="${player.id}"
                                   data-category="${categoryKey}"
                                   value="${player.scores[categoryKey]}"
                                   min="${category.min}"
                                   max="999"
                                   step="1">
                        </div>
                    `;
                }
            });

            playerCard.innerHTML = `
                <div class="player-card-header">
                    <span class="player-color-badge" style="background-color: ${player.color.color}"></span>
                    <span class="player-name-display">${player.name}</span>
                </div>
                
                <div class="score-categories">
                    ${categoriesHTML}
                </div>
                
                <div class="player-total">
                    <span class="total-label">GESAMT:</span>
                    <span class="total-value" id="total-${player.id}">0</span>
                </div>
            `;

            container.appendChild(playerCard);

            playerCard.querySelectorAll('.category-input').forEach(input => {
                input.addEventListener('input', (e) => {
                    this.updatePlayerScore(
                        parseInt(e.target.dataset.player),
                        e.target.dataset.category,
                        parseInt(e.target.value) || 0
                    );
                });

                input.addEventListener('change', (e) => {
                    const category = EVERDELL_DATA.categories[e.target.dataset.category];
                    let value = parseInt(e.target.value) || 0;
                    
                    if (category.min !== undefined && value < category.min) {
                        value = category.min;
                        e.target.value = value;
                    }
                    
                    this.updatePlayerScore(
                        parseInt(e.target.dataset.player),
                        e.target.dataset.category,
                        value
                    );
                });
            });
        });

        this.players.forEach(player => {
            this.updatePlayerTotal(player.id);
        });
    }

    updateActiveExpansionsDisplay() {
        const container = document.getElementById('active-expansions');
        const activeExpansionsList = Object.keys(this.expansions)
            .filter(key => this.expansions[key].active)
            .map(key => this.expansions[key].name);

        if (activeExpansionsList.length > 0) {
            container.innerHTML = `
                <p class="active-expansions-text">
                    Aktive Erweiterungen: ${activeExpansionsList.join(' • ')}
                </p>
            `;
        } else {
            container.innerHTML = '';
        }
    }

    updatePlayerScore(playerId, categoryKey, value) {
        const player = this.players.find(p => p.id === playerId);
        if (player) {
            player.scores[categoryKey] = value;
            this.updatePlayerTotal(playerId);
        }
    }

    updatePlayerTotal(playerId) {
        const player = this.players.find(p => p.id === playerId);
        if (!player) return;

        let total = 0;

        Object.keys(player.scores).forEach(categoryKey => {
            const category = EVERDELL_DATA.categories[categoryKey];
            let score = player.scores[categoryKey];

            if (category.divisor) {
                score = Math.floor(score / category.divisor);
            }

            if (category.negative) {
                total -= score;
            } else {
                total += score;
            }
        });

        const totalElement = document.getElementById(`total-${playerId}`);
        if (totalElement) {
            totalElement.textContent = total;
            
            totalElement.style.transition = 'transform 0.2s ease, text-shadow 0.2s ease';
            totalElement.style.transform = 'scale(1.2)';
            totalElement.style.textShadow = '2px 2px 0 #5c4033, 0 0 20px rgba(201, 162, 39, 0.8)';
            
            setTimeout(() => {
                totalElement.style.transform = 'scale(1)';
                totalElement.style.textShadow = '1px 1px 0 #5c4033, 0 0 10px rgba(201, 162, 39, 0.3)';
            }, 200);
        }

        player.total = total;
    }

    calculateAndShowWinner() {
        const sortedPlayers = [...this.players].sort((a, b) => b.total - a.total);
        this.renderResults(sortedPlayers);
        this.showView('result');
    }

    renderResults(sortedPlayers) {
        const winnerAnnouncement = document.getElementById('winner-announcement');
        const resultsList = document.getElementById('results-list');

        if (sortedPlayers.length === 0) return;

        const winner = sortedPlayers[0];
        winnerAnnouncement.innerHTML = `
            <p class="winner-label">🏆 Gewinner</p>
            <h2 class="winner-name">${winner.name}</h2>
            <p class="winner-points">${winner.total} Punkte</p>
        `;

        resultsList.innerHTML = '';

        sortedPlayers.forEach((player, index) => {
            const rank = index + 1;
            const isWinner = rank === 1;

            const resultItem = document.createElement('div');
            resultItem.className = `result-item ${isWinner ? 'winner' : ''}`;
            
            resultItem.innerHTML = `
                <span class="result-rank">${rank}.</span>
                <div class="result-player-info">
                    <span class="player-color-badge" style="background-color: ${player.color.color}"></span>
                    <span class="result-player-name">${player.name}</span>
                    ${isWinner ? '<span class="winner-crown">👑</span>' : ''}
                </div>
                <span class="result-points">${player.total} Pkt</span>
            `;

            resultsList.appendChild(resultItem);
        });
    }

    showView(viewName) {
        const views = document.querySelectorAll('.view');
        views.forEach(view => {
            view.classList.add('hidden');
            view.classList.remove('active');
        });

        const targetView = document.getElementById(`${viewName}-view`);
        if (targetView) {
            targetView.classList.remove('hidden');
            targetView.classList.add('active');
            this.currentView = viewName;
            
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    resetGame() {
        this.players = [];
        this.playerCount = 2;
        
        this.initializeExpansions();
        
        this.updatePlayerCountDisplay();
        this.updatePlayerInputs();
        this.renderExpansions();
        
        this.showView('setup');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.app = new EverdellScoreApp();
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered:', registration.scope);
            })
            .catch(error => {
                console.log('SW registration failed:', error);
            });
    });
}
