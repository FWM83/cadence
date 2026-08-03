# Cadence

**Discipline · Rhythm · License**

A gamified CPA-exam study command center (currently: FAR track, built around Becker).
Retro-terminal PWA — installable on iOS via Safari → Add to Home Screen, works offline.

## Features
- 13-phase plan: Week 0 pre-season + 12 study weeks with learning objectives
- Engagement-aware scheduling (day types, midday sprints, busy-period exceptions)
- Day-scoped knowledge checks + adaptive 171-question practice bank with weak-area targeting
- AI coach (built-in Claude inside Cowork, or BYO Anthropic/OpenAI API key)
- Derived XP/rank system (Intern → CPA Legend), streaks, arcade popups, audio reward ladder
- All data in localStorage; Export/Import for cross-device transfer

## Stack
Single-file vanilla HTML/CSS/JS + Chart.js (CDN). Service worker for offline. No build step.

## Deploy
Linked to Netlify — every push to `main` auto-deploys.
test
