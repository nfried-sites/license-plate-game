// Game state
let gameState = {
    states: [],
    players: [],
    foundStates: new Set(),
    stateClaims: {},
    selectedState: null,
    selectedPlayer: null
};

// Initialize map
let map;
let stateMarkers = {};

// States data (embedded to avoid CORS issues)
const STATES_DATA = [
  {"State Name": "Alabama", "Lat": 32.318231, "Long": -86.902298, "Pop": 15.04, "SCORE": 14.0},
  {"State Name": "Alaska", "Lat": 63.588753, "Long": -154.493062, "Pop": 2.16, "SCORE": 371.0},
  {"State Name": "Arizona", "Lat": 34.048928, "Long": -111.093731, "Pop": 22.11, "SCORE": 21.0},
  {"State Name": "Arkansas", "Lat": 35.20105, "Long": -91.831833, "Pop": 9.0, "SCORE": 25.0},
  {"State Name": "California", "Lat": 36.778261, "Long": -119.417932, "Pop": 114.96, "SCORE": 5.0},
  {"State Name": "Colorado", "Lat": 39.550051, "Long": -105.782067, "Pop": 17.37, "SCORE": 20.0},
  {"State Name": "Connecticut", "Lat": 41.603221, "Long": -73.087749, "Pop": 10.71, "SCORE": 7.0},
  {"State Name": "Delaware", "Lat": 38.910832, "Long": -75.52767, "Pop": 3.07, "SCORE": 27.0},
  {"State Name": "District of Columbia", "Lat": 38.905985, "Long": -77.033418, "Pop": 2.05, "SCORE": 36.0},
  {"State Name": "Florida", "Lat": 27.664827, "Long": -81.515754, "Pop": 68.14, "SCORE": 4.0},
  {"State Name": "Georgia", "Lat": 32.157435, "Long": -82.907123, "Pop": 32.6, "SCORE": 6.0},
  {"State Name": "Hawaii", "Lat": 19.898682, "Long": -155.665857, "Pop": 4.22, "SCORE": 394.0},
  {"State Name": "Idaho", "Lat": 44.068202, "Long": -114.742041, "Pop": 5.84, "SCORE": 77.0},
  {"State Name": "Illinois", "Lat": 40.633125, "Long": -89.398528, "Pop": 37.06, "SCORE": 4.0},
  {"State Name": "Indiana", "Lat": 40.551217, "Long": -85.602364, "Pop": 20.19, "SCORE": 5.0},
  {"State Name": "Iowa", "Lat": 41.878003, "Long": -93.097702, "Pop": 9.45, "SCORE": 19.0},
  {"State Name": "Kansas", "Lat": 39.011902, "Long": -98.484246, "Pop": 8.66, "SCORE": 31.0},
  {"State Name": "Kentucky", "Lat": 37.839333, "Long": -84.270018, "Pop": 13.38, "SCORE": 9.0},
  {"State Name": "Louisiana", "Lat": 31.244823, "Long": -92.145024, "Pop": 13.4, "SCORE": 20.0},
  {"State Name": "Maine", "Lat": 45.253783, "Long": -69.445469, "Pop": 4.1, "SCORE": 30.0},
  {"State Name": "Maryland", "Lat": 39.045755, "Long": -76.641271, "Pop": 18.26, "SCORE": 4.0},
  {"State Name": "Massachusetts", "Lat": 42.407211, "Long": -71.382437, "Pop": 20.81, "SCORE": 5.0},
  {"State Name": "Michigan", "Lat": 44.314844, "Long": -85.602364, "Pop": 29.56, "SCORE": 3.0},
  {"State Name": "Minnesota", "Lat": 46.729553, "Long": -94.6859, "Pop": 16.89, "SCORE": 12.0},
  {"State Name": "Mississippi", "Lat": 32.354668, "Long": -89.398528, "Pop": 8.58, "SCORE": 27.0},
  {"State Name": "Missouri", "Lat": 37.964253, "Long": -91.831833, "Pop": 18.21, "SCORE": 11.0},
  {"State Name": "Montana", "Lat": 46.879682, "Long": -110.362566, "Pop": 3.32, "SCORE": 117.0},
  {"State Name": "Nebraska", "Lat": 41.492537, "Long": -99.901813, "Pop": 5.85, "SCORE": 46.0},
  {"State Name": "Nevada", "Lat": 38.80261, "Long": -116.419389, "Pop": 9.53, "SCORE": 52.0},
  {"State Name": "New Hampshire", "Lat": 43.193852, "Long": -71.572395, "Pop": 4.11, "SCORE": 22.0},
  {"State Name": "New Jersey", "Lat": 40.058324, "Long": -74.405661, "Pop": 27.7, "SCORE": 3.0},
  {"State Name": "New Mexico", "Lat": 34.97273, "Long": -105.032363, "Pop": 6.21, "SCORE": 61.0},
  {"State Name": "New York", "Lat": 43.299428, "Long": -74.217933, "Pop": 57.92, "SCORE": 1.0},
  {"State Name": "North Carolina", "Lat": 35.759573, "Long": -79.0193, "Pop": 32.2, "SCORE": 4.0},
  {"State Name": "North Dakota", "Lat": 47.551493, "Long": -101.002012, "Pop": 2.32, "SCORE": 121.0},
  {"State Name": "Ohio", "Lat": 40.417287, "Long": -82.907123, "Pop": 34.65, "SCORE": 2.0},
  {"State Name": "Oklahoma", "Lat": 35.007752, "Long": -97.092877, "Pop": 11.94, "SCORE": 24.0},
  {"State Name": "Oregon", "Lat": 43.804133, "Long": -120.554201, "Pop": 12.46, "SCORE": 42.0},
  {"State Name": "Pennsylvania", "Lat": 41.203322, "Long": -77.194525, "Pop": 38.13, "SCORE": 1.0},
  {"State Name": "Rhode Island", "Lat": 41.580095, "Long": -71.477429, "Pop": 3.24, "SCORE": 30.0},
  {"State Name": "South Carolina", "Lat": 33.836081, "Long": -81.163725, "Pop": 15.97, "SCORE": 10.0},
  {"State Name": "South Dakota", "Lat": 43.969515, "Long": -99.901813, "Pop": 2.7, "SCORE": 98.0},
  {"State Name": "Tennessee", "Lat": 35.517491, "Long": -86.580447, "Pop": 21.07, "SCORE": 8.0},
  {"State Name": "Texas", "Lat": 31.968599, "Long": -99.901813, "Pop": 91.23, "SCORE": 4.0},
  {"State Name": "Utah", "Lat": 39.32098, "Long": -111.093731, "Pop": 10.21, "SCORE": 41.0},
  {"State Name": "Vermont", "Lat": 44.558803, "Long": -72.577841, "Pop": 1.89, "SCORE": 43.0},
  {"State Name": "Virginia", "Lat": 37.431573, "Long": -78.656894, "Pop": 25.69, "SCORE": 4.0},
  {"State Name": "Washington", "Lat": 47.751074, "Long": -120.740139, "Pop": 23.2, "SCORE": 22.0},
  {"State Name": "West Virginia", "Lat": 38.597626, "Long": -80.454903, "Pop": 5.16, "SCORE": 15.0},
  {"State Name": "Wisconsin", "Lat": 43.78444, "Long": -88.787868, "Pop": 17.38, "SCORE": 7.0},
  {"State Name": "Wyoming", "Lat": 43.075968, "Long": -107.290284, "Pop": 1.71, "SCORE": 210.0},
  {"State Name": "Alberta", "Lat": 55.000001, "Long": -115.000001, "Pop": 12.44, "SCORE": 36.0},
  {"State Name": "British Columbia", "Lat": 53.726669, "Long": -127.647621, "Pop": 14.6, "SCORE": 40.0},
  {"State Name": "Manitoba", "Lat": 56.415211, "Long": -98.739075, "Pop": 3.92, "SCORE": 82.0},
  {"State Name": "New Brunswich", "Lat": 46.49839, "Long": -66.159668, "Pop": 2.26, "SCORE": 73.0},
  {"State Name": "Newfoundland and Labrador", "Lat": 53.135509, "Long": -57.660435, "Pop": 1.49, "SCORE": 200.0},
  {"State Name": "Northwest Territories", "Lat": 63.5888, "Long": -115.5069, "Pop": 0.12, "SCORE": 4234.0},
  {"State Name": "Nova Scotia", "Lat": 45.000001, "Long": -63.000001, "Pop": 2.83, "SCORE": 70.0},
  {"State Name": "Nunavut", "Lat": 64.248, "Long": 84.8896, "Pop": 0.11, "SCORE": 11309.0},
  {"State Name": "Ontario", "Lat": 50.000001, "Long": -85.000001, "Pop": 41.52, "SCORE": 3.0},
  {"State Name": "Prince Edward Island", "Lat": 46.250001, "Long": -63.000001, "Pop": 0.45, "SCORE": 447.0},
  {"State Name": "Quebec", "Lat": 53.000001, "Long": -70.000001, "Pop": 24.82, "SCORE": 8.0},
  {"State Name": "Saskatchewan", "Lat": 55.000001, "Long": -106.000001, "Pop": 3.31, "SCORE": 111.0},
  {"State Name": "Yukon", "Lat": 64.28, "Long": -135.0, "Pop": 0.12, "SCORE": 5438.0}
];

// Initialize the game
function initGame() {
    gameState.states = STATES_DATA;
    console.log(`Loaded ${gameState.states.length} states/provinces`);

    // Initialize map
    map = L.map('map').setView([50.0, -100.0], 4);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 10
    }).addTo(map);

    // Setup modal event listeners
    setupPlayerModal();
    setupPlateModal();

    // Event listeners
    document.getElementById('add-found-plate-btn').addEventListener('click', openPlateModal);
    
    // Setup hamburger menu
    setupHamburgerMenu();

    // Try to load saved game state
    const hasSavedState = loadGameState();
    
    if (hasSavedState && gameState.players.length > 0) {
        // Game state loaded, hide modal and render leaderboard
        document.getElementById('setup-modal').style.display = 'none';
        renderLeaderboard();
    } else {
        // No saved state, show setup modal
        document.getElementById('setup-modal').style.display = 'flex';
    }
}

// Setup hamburger menu
function setupHamburgerMenu() {
    const hamburgerBtn = document.getElementById('hamburger-menu-btn');
    const menuDropdown = document.getElementById('menu-dropdown');
    const restartBtn = document.getElementById('restart-game-btn');
    
    // Toggle menu on hamburger click
    hamburgerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        hamburgerBtn.classList.toggle('active');
        menuDropdown.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburgerBtn.contains(e.target) && !menuDropdown.contains(e.target)) {
            hamburgerBtn.classList.remove('active');
            menuDropdown.classList.remove('active');
        }
    });
    
    // Restart game functionality
    restartBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to restart the game? This will clear all progress.')) {
            restartGame();
        }
        hamburgerBtn.classList.remove('active');
        menuDropdown.classList.remove('active');
    });
}

// Restart game function
function restartGame() {
    // Clear game state
    gameState.players = [];
    gameState.foundStates.clear();
    gameState.stateClaims = {};
    gameState.selectedState = null;
    gameState.selectedPlayer = null;
    
    // Remove all map markers
    Object.values(stateMarkers).forEach(marker => map.removeLayer(marker));
    stateMarkers = {};
    
    // Clear saved state
    deleteCookie('licensePlateGame');
    
    // Show setup modal
    document.getElementById('setup-modal').style.display = 'flex';
    
    // Clear player inputs
    const container = document.getElementById('players-input-container');
    container.innerHTML = '';
    addPlayerInput();
    updateRemoveButtonsVisibility();
    updateStartButton();
    
    // Clear leaderboard
    renderLeaderboard();
}

// Setup player modal
function setupPlayerModal() {
    const container = document.getElementById('players-input-container');
    const addMoreBtn = document.getElementById('add-more-players-btn');
    const startBtn = document.getElementById('start-game-btn');

    // Add initial input
    addPlayerInput();
    // Ensure remove buttons are hidden initially (only 1 player)
    updateRemoveButtonsVisibility();

    addMoreBtn.addEventListener('click', () => {
        addPlayerInput();
        updateStartButton();
    });

    startBtn.addEventListener('click', () => {
        const inputs = container.querySelectorAll('.player-input');
        const names = Array.from(inputs)
            .map(input => input.value.trim())
            .filter(name => name.length > 0);

        if (names.length === 0) {
            alert('Please add at least one player');
            return;
        }

        // Check for duplicates
        const uniqueNames = [...new Set(names)];
        if (uniqueNames.length !== names.length) {
            alert('Player names must be unique');
            return;
        }

        // Clear any existing game state
        gameState.foundStates.clear();
        gameState.stateClaims = {};
        Object.values(stateMarkers).forEach(marker => map.removeLayer(marker));
        stateMarkers = {};

        // Create players
        gameState.players = names.map(name => ({
            name: name,
            score: 0,
            platesFound: 0
        }));

        // Clear saved state and start fresh
        deleteCookie('licensePlateGame');

        // Hide modal and start game
        document.getElementById('setup-modal').style.display = 'none';
        renderLeaderboard();
        saveGameState();
    });

    // Update start button on input changes
    container.addEventListener('input', updateStartButton);
}

function addPlayerInput() {
    const container = document.getElementById('players-input-container');
    const row = document.createElement('div');
    row.className = 'player-input-row';
    
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'player-input';
    input.placeholder = 'Player name';
    input.maxLength = 20;

    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-player-btn';
    removeBtn.textContent = '×';
    removeBtn.addEventListener('click', () => {
        row.remove();
        updateRemoveButtonsVisibility();
        updateStartButton();
    });

    row.appendChild(input);
    row.appendChild(removeBtn);
    container.appendChild(row);

    // Update visibility of all remove buttons
    updateRemoveButtonsVisibility();
}

function updateRemoveButtonsVisibility() {
    const container = document.getElementById('players-input-container');
    const removeButtons = container.querySelectorAll('.remove-player-btn');
    const playerCount = container.children.length;
    
    // Only show remove buttons when there are 3 or more players
    removeButtons.forEach(btn => {
        btn.style.display = playerCount >= 3 ? 'block' : 'none';
    });
}

function updateStartButton() {
    const container = document.getElementById('players-input-container');
    const inputs = container.querySelectorAll('.player-input');
    const hasValidNames = Array.from(inputs).some(input => input.value.trim().length > 0);
    document.getElementById('start-game-btn').disabled = !hasValidNames;
}

// Setup plate selection modal
function setupPlateModal() {
    const modal = document.getElementById('plate-modal');
    const stateList = document.getElementById('state-list');
    const searchInput = document.getElementById('state-search-input');
    const cancelBtn = document.getElementById('cancel-plate-btn');

    // Populate state list
    renderStateList();

    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const options = stateList.querySelectorAll('.state-option');
        options.forEach(option => {
            const stateName = option.dataset.stateName.toLowerCase();
            option.style.display = stateName.includes(searchTerm) ? 'flex' : 'none';
        });
    });

    // State selection
    stateList.addEventListener('click', (e) => {
        const option = e.target.closest('.state-option');
        if (!option) return;

        const stateName = option.dataset.stateName;
        
        // DISABLED: Check if already found - saved for later
        // if (gameState.foundStates.has(stateName)) {
        //     alert('This plate has already been found!');
        //     return;
        // }

        // Select state
        stateList.querySelectorAll('.state-option').forEach(opt => {
            opt.classList.remove('selected');
        });
        option.classList.add('selected');
        gameState.selectedState = stateName;

        // Show player selection
        showPlayerSelection();
    });

    cancelBtn.addEventListener('click', () => {
        closePlateModal();
    });

    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closePlateModal();
        }
    });
}

function renderStateList() {
    const stateList = document.getElementById('state-list');
    stateList.innerHTML = '';

    // Sort states by name
    const sortedStates = [...gameState.states].sort((a, b) => 
        a['State Name'].localeCompare(b['State Name'])
    );

    sortedStates.forEach(state => {
        const option = document.createElement('div');
        option.className = 'state-option';
        option.dataset.stateName = state['State Name'];
        
        // DISABLED: Visual styling for found states - saved for later
        const isFound = gameState.foundStates.has(state['State Name']);
        
        option.innerHTML = `
            <span class="state-option-name" style="${/* DISABLED: isFound ? 'text-decoration: line-through; color: #999;' : '' */ ''}">
                ${state['State Name']}
            </span>
            <span class="state-option-points">${Math.round(state.SCORE)} pts</span>
        `;

        // DISABLED: Make found states look disabled - saved for later
        // if (isFound) {
        //     option.style.opacity = '0.5';
        //     option.style.cursor = 'not-allowed';
        // }

        stateList.appendChild(option);
    });
}

function showPlayerSelection() {
    const stateList = document.getElementById('state-list');
    const existingSelection = stateList.querySelector('.player-selection');
    if (existingSelection) {
        existingSelection.remove();
    }

    const selectionDiv = document.createElement('div');
    selectionDiv.className = 'player-selection';
    selectionDiv.style.cssText = 'padding: 20px; background: #f0f0f0; border-top: 2px solid #ddd; margin-top: 10px;';

    const title = document.createElement('div');
    title.style.cssText = 'font-weight: bold; margin-bottom: 15px; font-size: 16px;';
    title.textContent = 'Who spotted it?';

    const playerButtons = document.createElement('div');
    playerButtons.style.cssText = 'display: flex; flex-direction: column; gap: 10px;';

    gameState.players.forEach(player => {
        const btn = document.createElement('button');
        btn.className = 'btn-primary';
        btn.style.cssText = 'width: 100%; padding: 12px;';
        btn.textContent = player.name;
        btn.addEventListener('click', () => {
            gameState.selectedPlayer = player.name;
            // Automatically submit the plate
            submitPlate();
        });
        playerButtons.appendChild(btn);
    });

    selectionDiv.appendChild(title);
    selectionDiv.appendChild(playerButtons);
    stateList.appendChild(selectionDiv);
    selectionDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function openPlateModal() {
    gameState.selectedState = null;
    gameState.selectedPlayer = null;
    document.getElementById('plate-modal').style.display = 'flex';
    document.getElementById('state-search-input').value = '';
    document.getElementById('state-search-input').focus();
    renderStateList();
}

function closePlateModal() {
    document.getElementById('plate-modal').style.display = 'none';
}

function submitPlate() {
    if (!gameState.selectedState || !gameState.selectedPlayer) return;

    // DISABLED: Check if already found - saved for later
    // if (gameState.foundStates.has(gameState.selectedState)) {
    //     alert('This plate has already been found!');
    //     return;
    // }

    const state = gameState.states.find(s => s['State Name'] === gameState.selectedState);
    const player = gameState.players.find(p => p.name === gameState.selectedPlayer);

    if (!state || !player) return;

    // Award points
    const points = Math.round(state.SCORE);
    player.score += points;
    player.platesFound += 1;

    // Store for notification before clearing
    const playerName = gameState.selectedPlayer;
    const stateName = gameState.selectedState;

    // Mark as found
    gameState.foundStates.add(stateName);
    gameState.stateClaims[stateName] = playerName;

    // Add marker to map
    addStateMarker(state, playerName);

    // Reset selection
    gameState.selectedState = null;
    gameState.selectedPlayer = null;

    // Close the modal
    closePlateModal();

    // Update UI
    renderLeaderboard();
    saveGameState();

    // Show notification
    showNotification(`${playerName} found ${stateName} and earned ${points} points! 🎉`);
}

function addStateMarker(state, playerName) {
    if (stateMarkers[state['State Name']]) {
        map.removeLayer(stateMarkers[state['State Name']]);
    }

    const marker = L.marker([state.Lat, state.Long], {
        icon: L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        })
    }).addTo(map);

    marker.bindPopup(`<strong>${state['State Name']}</strong><br>Found by: ${playerName}<br>Points: ${Math.round(state.SCORE)}`);
    stateMarkers[state['State Name']] = marker;
}

function renderLeaderboard() {
    const leaderboard = document.getElementById('leaderboard');
    leaderboard.innerHTML = '';

    if (gameState.players.length === 0) {
        leaderboard.innerHTML = '<p style="color: #666; text-align: center; padding: 20px;">No players</p>';
        return;
    }

    // Sort players by score (descending)
    const sortedPlayers = [...gameState.players].sort((a, b) => b.score - a.score);

    sortedPlayers.forEach((player, index) => {
        const item = document.createElement('div');
        item.className = 'leaderboard-item';
        
        if (index === 0) item.classList.add('first');
        else if (index === 1) item.classList.add('second');
        else if (index === 2) item.classList.add('third');

        // Get first letter for avatar
        const initial = player.name.charAt(0).toUpperCase();

        item.innerHTML = `
            <div class="player-avatar">${initial}</div>
            <div class="player-info">
                <div class="player-name">${player.name}</div>
            </div>
            <div class="player-score">${player.score} pts</div>
        `;
        leaderboard.appendChild(item);
    });
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.3);
        z-index: 10001;
        font-weight: 600;
        animation: slideDown 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideUp 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Cookie utility functions
function setCookie(name, value, days = 365) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/`;
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
}

function deleteCookie(name) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
}

function saveGameState() {
    const saveData = {
        players: gameState.players,
        foundStates: Array.from(gameState.foundStates),
        stateClaims: gameState.stateClaims
    };
    setCookie('licensePlateGame', JSON.stringify(saveData));
}

function loadGameState() {
    const saved = getCookie('licensePlateGame');
    if (saved) {
        try {
            const data = JSON.parse(saved);
            gameState.players = data.players || [];
            gameState.foundStates = new Set(data.foundStates || []);
            gameState.stateClaims = data.stateClaims || {};

            // Restore map markers
            gameState.foundStates.forEach(stateName => {
                const state = gameState.states.find(s => s['State Name'] === stateName);
                const playerName = gameState.stateClaims[stateName];
                if (state && playerName) {
                    addStateMarker(state, playerName);
                }
            });
            
            return true; // Indicate that game state was loaded
        } catch (e) {
            console.error('Error loading saved game:', e);
        }
    }
    return false; // No saved state found
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            transform: translateX(-50%) translateY(-100px);
            opacity: 0;
        }
        to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
    }
    @keyframes slideUp {
        from {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
        to {
            transform: translateX(-50%) translateY(-100px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize when page loads
window.addEventListener('DOMContentLoaded', initGame);
