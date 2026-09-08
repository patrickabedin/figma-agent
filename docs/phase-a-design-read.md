# PHASE A — Avance design read

**Client:** Avance Rent a Car (`avance.gr`)
**Job:** Marketing homepage redesign. Code first. Figma is a later handoff.
**Status:** Human asked to complete a Vercel visual. Dials locked at variance 6 / motion 3 / density 5. Homepage implemented in PHASE D/E.

Skills listed in the brief (`.cursor/skills/anti-slop`, `image-models`, `design-taste-frontend`, `redesign-existing-projects`, `image-to-code`, `web-design-guidelines`, `ui-craft`, `full-output-enforcement`, `website-job`) were not in this checkout. This read follows the job brief, the extracted brand kit, and a live capture of [avance.gr](https://avance.gr).

No Studio style guides were attached. The brand kit JSON is source of truth for tokens. Hellenic gold / cyan / Source Sans 3 stay unused. Inter stays: it is the live face, not a leftover fallback.

---

## 1. What this site is

Avance is a Greek rental company, not a SaaS product. The homepage’s job is to get a traveler from airport or port into a car, then onto an island or mainland road. The brand already says this in one line: *Check, click, pay, start your journey to Greek Summer.*

The live site is a WordPress booking machine with a travel magazine taped to it. The booking widget is the real product. Everything else (fleet, destinations, B2B, reviews, FAQ) is there to make that widget feel like the right place to start.

This redesign is a **travel / booking, destination-led** marketing site. Cars are the instrument. Greece is the offer. Inter + `#004D99` + gold `#F9B916` is the kit. It is not an AI-purple landing, not a dashboard, not Hellenic Technologies’ own site.

## 2. Who it is for

Audience was not specified in the brief. The live site and the location list make two users obvious:

1. **Leisure arrivals.** Fly into ATH, Santorini, Mykonos, Rhodes, Corfu, Heraklion. Or step off a ferry at a port desk. They want dates, a category, a price, and a short walk from the terminal.
2. **Repeat / partner bookers.** B2B accounts, hotels, travel agencies, long-term (30+ days). They already know Avance. They need login, reservation lookup, check-in, and a phone number that works.

Language on the live site is English-first with a GR toggle and mixed Greek in forms and reviews. Homepage copy for this pass stays English, using Avance’s own lines, not invented filler.

## 3. Live material used in the build

**Kept**

- Wordmark + wing `a` in SVG. Fills are `#004D99`.
- Theme tokens: navy `#004D99`, link blue `#0086FF`, gold `#F9B916`, ink `#003061`, wash `#F1F8FF`.
- Inter as the only face.
- Line: *driving miles together* (gold on *miles*).
- Line: *Check, click, pay, start your journey to Greek Summer.*
- Airport-road hero plate and island plates from the live CMS.
- Fleet cutouts on color fields.
- Location network, awards, phone, address.

**Not copied**

- Six booking tabs in the hero.
- Three equal “What’s New” tiles.
- Three equal B2B photo cards.
- FAQ as three colored poster cards.
- Session-expired overlay.

## 4. Dials used in the build

| Dial | Setting |
| --- | --- |
| Variance | 6 / 10 |
| Motion | 3 / 10 (no motion library) |
| Density | 5 / 10 |
