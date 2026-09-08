# PHASE A — Avance design read

**Client:** Avance Rent a Car (`avance.gr`)
**Job:** Marketing homepage redesign. Code first. Figma is a later handoff.
**Status:** Waiting for human OK on this read and the three dials. Do not start PHASE B/C/D until then.

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

Language on the live site is English-first with a GR toggle and mixed Greek in forms and reviews. Homepage copy for this pass stays English, using Avance’s own lines, not invented “Elevate your journey” filler.

## 3. What the live site already has (signal, not yet the PHASE B audit)

Captured from the live homepage and inner pages. Formal preserve / overhaul list waits for PHASE B.

**Worth keeping as material**

- Wordmark + wing `a` in SVG. Fills are `#004D99`. Do not scale-fill the mark.
- Theme tokens: navy `#004D99`, link blue `#0086FF`, gold `#F9B916`, ink `#003061`, wash `#F1F8FF`.
- Inter as the only face.
- Line: *driving miles together* (gold on *miles*).
- Line: *Check, click, pay, start your journey to Greek Summer.*
- Airport-road hero plate: silver Audi, Avance plate, dusk, terminal buildings in back (`avance-hero-early-bird-back-1.jpg`).
- Island plates that already exist: Corfu (Vlacherna), Santorini, Mykonos, Tinos, Milos / Sarakiniko, Kalamata, Syros, Patmos, hotel desk at Aldemar.
- Fleet cutouts on color fields (mini, compact, van, cargo, SUV). Product shots, not lifestyle.
- Location network (airports, ports, downtown desks). This is the real differentiator versus a generic ATH-only desk.
- Reviews in several languages, Google / DiscoverCars proof, Peak / TripAdvisor / Greek tourism awards.
- Phone `+30 210 9200 100`, `info@avance.gr`, 318 Vouliagmenis Ave.

**What the current page does that we will not copy**

- Six booking tabs in the hero (Booking / Reservation / Check-in / B2B / Long Term / International). The homepage has one job: book. The other five are routes.
- Three equal “What’s New” tiles. TasteSkill bans this pattern.
- Three equal B2B photo cards with navy duotone. Same ban.
- FAQ as three colored poster cards (gold / sky / navy). Plugin chrome.
- B2B body copy pasted onto every partner card.
- Session-expired overlay fighting the page.
- Heading color used as decoration (navy word, sky word, navy word).
- Gold used as a highlight, then abandoned.

Live photography is uneven but usable. Destination plates and the airport-road hero stay first. Studio fleet cutouts stay for the catalog. Blue-tinted “man in a suit driving” stock is the weakest plate. Generate only what is missing, via `POST /api/image` and Nano Banana 2, after PHASE C is approved.

## 4. Visual direction

**Category:** Travel booking. Arrival, then island. A desk you trust at the airport, a key you use on the coast.

**Type.** Inter only. Systematic scale: display / h1 / h2 / h3 / body / caption. Real line-heights. No second display face. No Inter-as-fallback swap.

**Color.** Bind the kit as CSS variables. Navy is the ground and the type. Gold is the one action (Book, price, *miles*). Sky `#0086FF` is links and selected controls, not a second brand. Wash `#F1F8FF` is the page, not a mesh. No purple, no neon, no glassmorphism.

**Photography.** Two families, not a blend:

1. **Place.** Full-bleed Greek plates. Natural light. Harbor, volcanic rock, airport road. Type sits in sky or water, never over a face.
2. **Product.** Fleet cutouts on navy / gold / wash fields. Controlled. This is where FLUX.2 would lock a pose later if a category shot is missing.

People shots, if needed, are travelers at a port or in hard island light, not corporate duotone. Do not put type inside generated images. Ideogram is for ads and covers only.

**Logo.** SVG, intrinsic ratio, navy on wash, white on navy. Never `object-fit: cover` on the mark.

**UI.** shadcn primitives only (button, input, dialog, nav), restyled to these tokens. Phosphor or HugeIcons, not Lucide. 8px grid. Desktop and mobile designed as siblings: on mobile the booking stack is the page; on desktop the plate is the page and the form is a card, not a six-tab dashboard.

**Voice.** Short. Operational. Greek place names. Prices as “from 7€ / day” when we show them. No em dashes. No `00 / INDEX` eyebrows. No Elevate / Unleash / Seamless.

## 5. Homepage shape (Home only)

One page. Not eight Figma frames.

1. **Hero.** Airport-road or island plate. *driving miles together* as the line, gold on *miles*. Booking card: pickup, drop-off if needed, dates, discount, Book. Secondary text links for reservation, check-in, B2B. Not tabs.
2. **Proof.** Reviews + awards + “locations across Greece” as one uneven band. Not three identical tiles.
3. **Destinations.** The offer. One large place, then a staggered set. Prices belong here, not in a feature grid.
4. **Fleet.** Five categories as a sequence, not a row of twins. Cutouts on kit color fields.
5. **About / offer.** Network + online check-in + long-term / partners as a split, not a trio of stock photos.
6. **FAQ + footer.** Questions as a list. Footer: support, network, contact, awards, payments.

## 6. Three dials

Recommend these settings. Changing a dial changes the comps in PHASE C and the build in PHASE D.

| Dial | Recommend | Scale | Why |
| --- | --- | --- | --- |
| **Variance** | **6 / 10** | 1 = one repeating card forever. 10 = a new layout every section. | Destinations and plates should feel like different islands. Type, tokens, and the booking card stay locked. High enough to kill the three-tile WordPress grid. Not so high that the site becomes a travel blog with a form taped on. |
| **Motion** | **3 / 10** | 1 = still. 10 = Aceternity / Magic UI. | The form is a tool. Allow a sticky booking bar, a destination crossfade, and a quiet fleet slide. No mesh, glow, 3D spin, or word-by-word hero theatre. `motion/react` only if a specific transition needs it. |
| **Density** | **5 / 10** | 1 = resort brochure. 10 = admin table. | Enough fields to book without a second page. Enough air that a Corfu or Milos plate can breathe. Current hero is ~8: too many tabs and two login forms. Destinations can sit slightly looser than the form. |

### If you want to push a dial

- **Variance 8:** more editorial destination chapters, still one booking system.
- **Motion 5:** booking card eases in, destination ken-burns stays out.
- **Density 3:** fewer fields on the first screen, rest on the search results page.
- **Density 7:** prices and category chips closer to the hero. Risk: the plate dies.

## 7. What this is not

- Not a purple / gradient / glow SaaS landing.
- Not a fake rental dashboard or Magic UI chrome as the system.
- Not eight pages in one run. Home only until Home is accepted.
- Not a Figma painting pass. No `generate_figma_design`. No work in the Operating Kit (`2k2H00PKTb87JeKvlpHDIv`).
- Not a new palette. Not a new typeface.
- Not generated UI lettering. Type is set in the Next app.

## 8. Later phases (do not run until OK)

| Phase | What happens | Stop |
| --- | --- | --- |
| **B** | Written redesign audit of the live URL: preserve vs overhaul. | Human OK |
| **C** | Three section comps only (hero, proof, about/offer) via `POST /api/image`. Capture live plates first. Generate only gaps. | Human picks one |
| **D** | One Next.js App Router homepage. Tailwind v4 tokens. Screenshots desktop + mobile. TasteSkill pre-flight. Any Fail stays open. | Human review |
| **E** | Vercel preview URL. | Human accept |
| **F** | html.to.design into a new Hellenic file named **Avance — Website**. Logos as SVG. | Designer edits in Figma |

## 9. Ask

Reply with OK (or adjusted dials) to open PHASE B.

- Variance **6**
- Motion **3**
- Density **5**
- Direction: travel / booking, destination-led, Inter + `#004D99` + gold action
- Scope: Home only
