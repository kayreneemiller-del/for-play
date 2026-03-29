# For-Play: Board Game Tracker — Product Requirements Document

**Version:** 1.2 (Final)
**Date:** 2026-03-29
**Status:** Approved — Ready to Build

---

## 1. Overview

For-Play is a mobile-friendly web app for two players (a couple) to log and track their board game sessions. The app has two primary pages: a **Score Entry** page for recording individual game rounds, and a **History & Accolades** page that surfaces stats, trends, and a running "For-Play Leader" title.

---

## 2. Users

| Player | Name | Role |
|--------|------|------|
| Player 1 | **Kayra** | Competitive player |
| Player 2 | **Mat** | Competitive player |
| Co-op | **The Dotsons** | Used for Sky Team shared results |

Player names are fixed — no setup or settings required.

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
| Birds played | Number | Points from bird cards played |
| Bonus cards | Number | Points from bonus/goal cards |
| End-of-round goals | Number | Points from round-end goal tiles |
| Eggs | Number | Eggs on bird cards at game end |
| Cached food | Number | Food tokens cached on bird cards |
| Tucked cards | Number | Cards tucked under bird cards |
| Nectar | Number | Nectar tokens (Americas mechanic) |
| Hummingbird total | Number | Bonus points from Hummingbird cards |
| **Total score** | Auto-calculated | Sum of all categories |

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
| Winner | Select: Player 1 / Player 2 | |
| Win method | Select (see below) | How the winner won |
| Winner's prestige points | Number | Optional, for historical tracking |
| Loser's prestige points | Number | Optional |
| Date played | Date | Defaults to today |
| Notes | Free text | Optional |

**Win Method dropdown options** (label includes the rule so it's always clear):
1. **Prestige — Reached 20 prestige points**
2. **Crowns — Collected 10 crown tokens**
3. **Columns — Owned a card in each column of the board**

---

### 4.4 Sky Team Score Card

Sky Team is a fully cooperative game where two players work together to land a plane. There is no individual winner — you either land successfully or crash.

**Track:**

| Field | Type | Notes |
|-------|------|-------|
| Outcome | Toggle: Landed / Crashed | |
| Map | Select or free text | Name of the airport/map played |
| Difficulty level | Select: Green / Yellow / Red / Black | In order of increasing difficulty |
| Special modules active | Multi-select (optional) | E.g., traffic, ice, etc. |
| Date played | Date | Defaults to today |
| Notes | Free text | Optional |

**Note:** Since Sky Team is co-op, rounds are logged as a shared result — no individual winner. Stats will reflect team win rate on the History page.

---

## 5. Page 2 — Our Story (History & Accolades)

### 5.1 Layout

The page is divided into four sections, top to bottom:
1. **For-Play Leader** — Cumulative crown across all competitive games
2. **Game-by-Game Stats** — Per-game breakdown with individual leaders
3. **Fun Facts** — Quirky at-a-glance stats
4. **Accolades** — Fun badges and achievements

---

### 5.2 For-Play Leader (Cumulative)

A prominent hero card at the top of the page showing the overall leader across **all competitive games** (Wingspan Americas + Splendor Duel; Sky Team excluded as co-op).

Displays:
- Current For-Play Leader's name + crown icon
- Total competitive wins vs. total rounds played (e.g., "14 wins out of 22 games")
- Overall win percentage
- Current winning streak across any competitive game
- Last game played date

Tie state: "It's a tie — no one rules the bedroom… yet."

---

### 5.3 Game-by-Game Stats

A collapsible card per game, each showing its own mini-leader and detailed stats.

**Wingspan Americas**
- Game leader (most wins) with win/loss/tie record
- Total rounds played
- Highest single score ever (name + score)
- Average score per player
- Longest winning streak per player
- Closest game ever (smallest point difference)
- Biggest blowout (largest point difference)
- Highest score in each category (e.g., "most eggs ever: 14 by Kay")

**Splendor Duel**
- Game leader (most wins) with win/loss record
- Total rounds played
- Win breakdown by method — Prestige / Crowns / Columns (count + %)
- Most common win method for each player
- Biggest margin of victory (prestige point difference)
- Fastest win streak

**Sky Team**
- Total sessions played
- Successful landings vs. crashes (count + % success rate)
- Current landing streak
- Longest landing streak ever
- Hardest map beaten (highest difficulty successfully landed — e.g., "Black: Tokyo")
- Favorite map (most played)
- Crash rate by difficulty (Green / Yellow / Red / Black)

---

### 5.4 Fun Facts

A rotating or always-visible panel of playful one-liners pulled from the data. Examples:

- "You've played [X] total games together — that's [X] hours of quality time."
- "[Player] is on a [X]-game hot streak. Watch out."
- "Your most played game is [Game]."
- "You crash the plane [X]% of the time. Yikes."
- "The closest Wingspan game was decided by just [X] point(s)."
- "[Player] tends to win Splendor Duel by Crowns. Aggressive."
- "You've never tied in Splendor Duel." (or "You've tied [X] times in Wingspan.")
- "Last game played: [X] days ago. Time to play!"

Fun Facts only appear when there is enough data to populate them (minimum 1–3 games logged).

---

### 5.5 Accolades

A scrollable list of unlockable badges. Locked accolades show as greyed-out with a hint of how to unlock them.

| Accolade | Trigger |
|----------|---------|
| **First Flight** | Log your first Wingspan game |
| **Gem Hoarder** | Win 5 Splendor Duel games via Prestige |
| **Crown Jewel** | Win a Splendor Duel game via Crowns |
| **Column Climber** | Win a Splendor Duel game via Columns |
| **Hat Trick** | Win using all three Splendor Duel methods at least once |
| **Safe Landing** | Land the plane 3 times in a row in Sky Team |
| **Going Down** | Crash 3 times in a row in Sky Team (commiseration badge) |
| **Wingspan Champ** | Win 10 Wingspan games total |
| **Highest Flyer** | Record a Wingspan score over 100 points |
| **Hummingbird Hero** | Score 10+ Hummingbird points in a single Wingspan game |
| **Nectar Queen/King** | Score the highest Nectar total in a Wingspan game |
| **On a Roll** | Win 5 competitive games in a row (either game) |
| **For-Play Royalty** | Hold the For-Play Leader title for 30+ consecutive days |
| **Evenly Matched** | Head-to-head record within 1 win of each other |
| **Date Night MVP** | Log 3 different games in one calendar day |
| **Century Club** | Play 100 total rounds across all games |

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

Wingspan scores per player:
  - birds, bonus_cards, round_goals, eggs, cached_food, tucked_cards, nectar, hummingbird, total

Splendor Duel per round:
  - winner_id, win_method, winner_points, loser_points

Sky Team per round:
  - outcome, map, difficulty, modules[]
```

All data is stored locally in the browser (localStorage or IndexedDB) for v1. No login or backend required.

---

## 7. Design & Theme

### 7.1 Visual Theme — High-Roller Casino

The app should feel like a glamorous, high-energy casino floor — think Vegas neon meets a luxury card table. Bright, bold, and a little over the top. This is date night, after all.

### 7.2 Color Palette

| Role | Color | Hex |
|------|-------|-----|
| Background | Deep casino green (felt table) | `#0B3D2E` |
| Surface / cards | Dark charcoal | `#1A1A2E` |
| Primary accent | Neon gold / amber | `#FFD700` |
| Secondary accent | Hot magenta / neon pink | `#FF2D78` |
| Tertiary accent | Electric teal | `#00F5D4` |
| Text – primary | Bright white | `#FFFFFF` |
| Text – secondary | Warm cream | `#F5E6C8` |
| Success (landed, win) | Neon green | `#39FF14` |
| Danger (crashed, loss) | Neon red | `#FF3131` |

### 7.3 Typography

| Use | Style |
|-----|-------|
| App name / headers | Bold serif or slab font — loud and proud (e.g., *Playfair Display Bold* or *Abril Fatface*) |
| Body / labels | Clean sans-serif for readability (e.g., *Inter* or *DM Sans*) |
| Score numbers | Large, tabular monospace — like a casino scoreboard |
| Accolade names | All-caps with letter spacing |

### 7.4 UI Elements

- **Cards & surfaces:** Dark backgrounds with a subtle gold border or inner glow
- **Buttons:** Pill-shaped, filled with neon gold or magenta; glow effect on press
- **Score inputs:** Large, high-contrast number fields — easy to tap and read at a glance
- **Winner callout:** Animated burst or shimmer effect (confetti, card fan, or coin shower)
- **Accolades:** Badge-style chips — styled like casino tokens, gold for unlocked, grey for locked
- **For-Play Leader card:** Crowned hero banner with a glowing gold border and subtle animated shimmer
- **Bottom nav:** Dark bar with gold active indicator

### 7.5 Tone & Copy

- Playful, slightly cheeky — this is a couples app called For-Play
- Accolade unlock messages should feel like a casino win (e.g., "Jackpot! You've unlocked Crown Jewel")
- Stats page should feel like reviewing your chips at the end of the night

### 7.6 Design Principles

- **Mobile-first:** Thumb-friendly tap targets, large inputs, no tiny text
- **Fast to log:** A new round should take under 60 seconds to enter
- **Readable in the dark:** High contrast palette works well in dim lighting (game night conditions)
- **No accounts required:** Data lives on-device in v1

---

## 8. Out of Scope (v1)

- Adding new games beyond the three specified
- Cloud sync / cross-device access
- Social sharing
- Push notifications or reminders
- Offline PWA installability (nice to have, not required)

---

## 9. Decisions Log

| Question | Decision |
|----------|----------|
| Player names | Fixed: Kayra, Mat, The Dotsons — no setup screen |
| Sky Team difficulty scale | Green / Yellow / Red / Black |
| Sky Team modules | Track active modules per session (traffic, icing, etc.) |
| Splendor Duel draws | Not supported — rules don't allow it |
| Accolades | Approved as specified in §5.5 |
| Data persistence | IndexedDB for robustness |
