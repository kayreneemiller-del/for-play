# For-Play: Board Game Tracker — Product Requirements Document

**Version:** 1.0 (Draft)
**Date:** 2026-03-29
**Status:** Awaiting Review

---

## 1. Overview

For-Play is a mobile-friendly web app for two players (a couple) to log and track their board game sessions. The app has two primary pages: a **Score Entry** page for recording individual game rounds, and a **History & Accolades** page that surfaces stats, trends, and a running "Leader of For-Play" title.

---

## 2. Users

| Player | Role |
|--------|------|
| Player 1 | One half of the couple (e.g., "Kay") |
| Player 2 | Other half of the couple (e.g., "Husband") |

Player names should be configurable on first launch and editable in settings.

---

## 3. Pages & Navigation

The app has two top-level views accessible via a bottom navigation bar (mobile-friendly):

| Tab | Icon | Description |
|-----|------|-------------|
| **Log Game** | 🎲 | Record a new round for any supported game |
| **Our Story** | 🏆 | History, stats, and accolades |

---

## 4. Page 1 — Log Game

### 4.1 Game Selection

On entering the Log Game tab, the user selects one of the supported games:

- Wingspan Americas
- Splendor Duel
- Sky Team

After selecting a game, the appropriate score card form appears.

---

### 4.2 Wingspan Americas Score Card

Wingspan Americas is a competitive engine-building game. Each player scores independently across multiple categories.

**For each player, track:**

| Category | Type | Notes |
|----------|------|-------|
| Birds played | Number | Count of bird cards played |
| Bonus cards | Number | Points from bonus/goal cards |
| End-of-round goals | Number | Points from round-end goal tiles |
| Eggs | Number | Eggs on bird cards at game end |
| Cached food | Number | Food tokens cached on bird cards |
| Tucked cards | Number | Cards tucked under bird cards |
| Nectar (Americas mechanic) | Number | Nectar tokens remaining |
| **Total score** | Auto-calculated | Sum of all categories |

**Nectar Expansion Add-on Toggle:**
A toggle labeled "Playing with Nectar?" that shows/hides the Nectar row. Defaults to off. Setting is remembered per session.

**Outcome:** Winner is determined by highest total score. Ties are noted as a tie.

**Additional fields:**
- Date played (defaults to today)
- Notes / memorable moment (optional, free text)

---

### 4.3 Splendor Duel Score Card

Splendor Duel is a two-player competitive gem-drafting game with three possible win conditions.

**Track:**

| Field | Type | Notes |
|-------|------|-------|
| Winner | Select: Player 1 / Player 2 / Draw | |
| Win method | Select (see below) | How the winner won |
| Winner's prestige points | Number | Optional, for historical tracking |
| Loser's prestige points | Number | Optional |
| Date played | Date | Defaults to today |
| Notes | Free text | Optional |

**Win Methods:**
1. **Prestige** — First to 20 prestige points
2. **Crowns** — First to 10 crown tokens
3. **Columns** — First to own a card in each column of the board

---

### 4.4 Sky Team Score Card

Sky Team is a fully cooperative game where two players work together to land a plane. There is no individual winner — you either land successfully or crash.

**Track:**

| Field | Type | Notes |
|-------|------|-------|
| Outcome | Toggle: Landed / Crashed | |
| Map | Select or free text | Name of the airport/map played |
| Difficulty level | Select: 1–5 (or per game's scale) | |
| Special modules active | Multi-select (optional) | E.g., traffic, ice, etc. |
| Date played | Date | Defaults to today |
| Notes | Free text | Optional |

**Note:** Since Sky Team is co-op, rounds are logged as a shared result — no individual winner. Stats will reflect team win rate on the History page.

---

## 5. Page 2 — Our Story (History & Accolades)

### 5.1 Layout

The page is divided into three sections:
1. **Leader Board** — The current "Leader of For-Play" crown
2. **Game-by-Game Stats** — Per-game breakdown
3. **Accolades** — Fun badges and achievements

---

### 5.2 Leader of For-Play

A prominent hero card at the top of the page showing:

- Current leader's name and a crown icon
- Their overall win percentage across all competitive games (Wingspan + Splendor Duel; Sky Team excluded as co-op)
- Number of wins vs. total rounds played
- Last updated date

Tie state: if wins are equal, the card reads "It's a tie — no one rules the bedroom… yet."

---

### 5.3 Game-by-Game Stats

A card per game showing:

**Wingspan Americas**
- Total rounds played
- Player 1 wins / Player 2 wins / Ties
- Highest single score (by either player)
- Average score per player
- Longest winning streak per player

**Splendor Duel**
- Total rounds played
- Player 1 wins / Player 2 wins
- Win breakdown by method (Prestige / Crowns / Columns) as a small chart or count
- Biggest margin of victory (point difference)

**Sky Team**
- Total sessions played
- Successful landings vs. crashes (and % success)
- Hardest map beaten (highest difficulty landed)
- Favorite map (most played)
- Current win streak

---

### 5.4 Accolades

A scrollable list of unlockable badges. Examples:

| Accolade | Trigger |
|----------|---------|
| **First Flight** | Log your first Wingspan game |
| **Gem Hoarder** | Win 5 Splendor Duel games via Prestige |
| **Crown Jewel** | Win a Splendor Duel game via Crowns |
| **Column Climber** | Win a Splendor Duel game via Columns |
| **Safe Landing** | Land the plane 3 times in a row in Sky Team |
| **Going Down** | Crash 3 times in a row in Sky Team (commiseration badge) |
| **Wingspan Champ** | Win 10 Wingspan games total |
| **Highest Flyer** | Record a Wingspan score over 100 points |
| **Nectar Nerd** | Log 5 Wingspan games with the Nectar expansion |
| **On a Roll** | Win 5 competitive games in a row (either game) |
| **For-Play Royalty** | Hold the Leader title for 30+ consecutive days |
| **Evenly Matched** | Have a head-to-head record within 1 win of each other |

Locked accolades show as greyed-out with a hint of how to unlock.

---

## 6. Data Model (High-Level)

```
Players
  - id, name

Games
  - id, name, type (competitive | cooperative)

Rounds
  - id, game_id, date, notes
  - scores: [ { player_id, ...game-specific fields } ]
  - outcome: winner_id | "tie" | "landed" | "crashed"
```

All data is stored locally in the browser (localStorage or IndexedDB) for v1. No login or backend required.

---

## 7. Design Principles

- **Mobile-first:** All interactions should be comfortable on a phone screen (thumb-friendly tap targets, large inputs).
- **Playful but readable:** Fun tone in copy and accolades without sacrificing clarity.
- **Fast to log:** A new round should take under 60 seconds to enter.
- **No accounts required:** Data lives on-device in v1.

---

## 8. Out of Scope (v1)

- Adding new games beyond the three specified
- Cloud sync / cross-device access
- Social sharing
- Push notifications or reminders
- Offline PWA installability (nice to have, not required)

---

## 9. Open Questions for Review

1. **Player names:** Should these be set once in a settings screen, or entered per session? Recommend: set once.
2. **Splendor Duel draws:** Can the game end in a draw? Rules suggest not, but should we support it anyway?
3. **Sky Team difficulty scale:** The game uses a symbol/difficulty system per airport — should we use the game's native difficulty labels or a simplified 1–5 scale?
4. **Sky Team modules:** Do you want to track which special modules (traffic, ice, etc.) were active per session, or keep it simple?
5. **Accolades scope:** Are the example accolades on the right track, or are there specific achievements you have in mind?
6. **Data persistence:** LocalStorage (simpler, limited space) or IndexedDB (more robust for large history)?
