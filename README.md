# License Plate Game MVP

A web-based utility for the classic License Plate Game! Perfect for road trips where players compete to spot license plates from different states and provinces.

## How It Works

The License Plate Game is a classic road trip game where:
- Players in a car look for license plates from different states/provinces
- When someone spots a plate, they claim it and earn points
- **Rarer states = More points!** (Based on the SCORE data from your Excel file)
- The player with the most points wins!

## Features

- 👥 **Multi-Player Support**: Add multiple players and track their scores
- 🎯 **Rarity-Based Scoring**: Points are awarded based on state rarity (higher SCORE = rarer = more points)
- 🗺️ **Interactive Map**: Visual map showing all found states with markers
- 📊 **Live Leaderboard**: See who's winning in real-time
- ✅ **Found States Tracker**: Grid view of all discovered plates
- 💾 **Auto-Save**: Game state is saved in your browser
- 📱 **Responsive Design**: Works on mobile and desktop

## How to Play

1. **Add Players**: Enter player names and click "Add Player"
2. **Spot a Plate**: When someone sees a license plate:
   - Select the state/province from the dropdown
   - Select who spotted it
   - Click "Claim Plate!"
3. **Earn Points**: Points are automatically awarded based on rarity
4. **Track Progress**: Watch the leaderboard and map update in real-time

## Scoring System

Points are based on the **SCORE** column from your Excel data:
- **Higher SCORE = Rarer state = More points**
- Examples:
  - New York: 1 point (common)
  - California: 5 points
  - Hawaii: 394 points (rare!)
  - Nunavut: 11,309 points (extremely rare!)

## Setup

No installation required! Just open `index.html` in a modern web browser.

**Option 1: Direct file opening**
- Simply open `index.html` in your browser

**Option 2: Using the Python server (optional)**
```bash
python3 server.py
```
Then open `http://localhost:8000` in your browser.

## Game Controls

- **Add Player**: Add new players to the game
- **Claim Plate**: Record when a player spots a license plate
- **New Game**: Reset everything (players, scores, found states)
- **Reset Found States**: Clear found states but keep players and scores

## Data

The game includes 64 states/provinces:
- All 50 US states
- District of Columbia
- 13 Canadian provinces/territories

All data is embedded in the JavaScript file (no external dependencies needed).

## Browser Compatibility

Works in all modern browsers that support:
- ES6 JavaScript
- LocalStorage
- Leaflet.js (loaded from CDN)

## Tips

- **Rare finds are worth more!** Keep an eye out for Alaska, Hawaii, and Canadian provinces
- **First to spot gets the points** - each state can only be claimed once per game
- **Game saves automatically** - you can close and reopen without losing progress
- **Perfect for long road trips** - see how many states you can collect!
