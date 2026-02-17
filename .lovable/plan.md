
# 💕 Jay & Zoeh's Digital Scrapbook — Valentine's Site

A stunning, animated Valentine-themed digital scrapbook website celebrating Jay and Zoeh's love story, from the courtship that began at the end of November 2025 to their mutual confession and beyond.

---

## 🎨 Design Direction
- **Scrapbook aesthetic**: Torn paper edges, polaroid frames, photo corners, ribbons, stickers, handwritten fonts, layered collage elements
- **Color palette**: Mix of deep bold tones (dark reds, burgundy, gold) and soft romantic hues (blush pink, lavender, cream)
- **Typography**: Handwritten/script fonts for love messages, vintage serif for headings
- **Vibe**: Confident masculinity meets playful tenderness — celebrating the MLM courtship journey

---

## 1. ✨ Loading Screen
- A 3D rotating heart model with "J ♥ Z" initials using Three.js
- Floating hearts and rose petals particle effects
- Progress bar styled as scrapbook pages flipping open
- GSAP-powered smooth transition into the main site after ~4 seconds
- Heartbeat sound effect as the page loads

## 2. 🏠 Hero / Landing Page
- Full-screen scrapbook cover with "Jay & Zoeh" in elegant handwritten typography
- Parallax scrolling background with blurred roses and starry sky
- Falling hearts particle system (Three.js)
- A floating 3D heart that gently follows the cursor
- Valentine's Day countdown timer with ticking animation
- "Open Our Story" button with ribbon animation to begin scrolling

## 3. 💌 Love Letter Section
- Virtual envelope on a decorated scrapbook page with doodles and stickers
- Click to open: 3D flap unfolds (GSAP), paper slides out with rustling sound
- Message types out letter-by-letter with heartbeat pulse
- Personalized text referencing Jay's pursuit since end of November 2025 and Zoeh's confession
- Floating rose petals and soft glow around the letter
- Handwritten font with ribbon border frame

## 4. 📸 Photo Gallery — "Moments of Zoeh"
- Polaroid-style grid arranged as a scrapbook page with photo corners and overlapping layers
- Placeholder images (easily swappable with real photos of Zoeh)
- GSAP transitions: fade-in with heart-shaped masks, 3D rotation zoom on click
- Hearts burst on hover, confetti particle trails
- Page-flip navigation between gallery pages
- Mobile swipe support

## 5. 💘 Love Calculator & Courting Countdown
- Styled as a scrapbook sticker/cutout with torn edges
- "Days of pursuit" counter ticking since ~end of November 2025
- Name-based love calculator with animated heart meter filling up
- Fun "mutual love percentage" result with celebratory animations
- Interactive and playful design

## 6. 💝 "Why I Love You" List
- Staggered fade-in reveals as you scroll
- Each item on a layered scrapbook card with doodles and ribbons
- Qualities celebrating both Jay's protective/masculine nature and Zoeh's playful energy
- Placeholder text that's easily customizable
- Subtle hover animations on each item

## 7. 🔒 Climactic Reveal — The Spicy Gallery
- Large chained heart icon (SVG) on the final scrapbook page
- Chains rattle subtly on hover
- Click prompts for password (default: "loveunlocks")
- On unlock: chains shatter with GSAP morphing effects, heart glows and pulses
- Dramatic curtain-parting animation with Three.js particle bursts
- Reveals a collage-style gallery of placeholder photos (Jay's pics — sweet, playful, sensual)
- Images cascade in with slow zoom, blur-to-reveal, and looping 3D heart orbit
- Confetti explosion and sound effects for immersion
- Hidden scrapbook page "unfolds" with page-flip animation

## 8. 🎁 Surprise Message Button
- Floating interactive button with sticker animation
- Click triggers confetti burst and reveals a heartfelt surprise message
- Sound cue on reveal

---

## 🔧 Technical Approach
- **Three.js** (via React Three Fiber) for 3D hearts, particles, and cursor-following effects
- **GSAP** for all complex animations (page flips, envelope opening, chain breaking, morphing)
- **Animate.css** concepts adapted via Tailwind keyframes for subtle transitions
- **Howler.js or Web Audio API** for sound effects (rustling, heartbeat, chain breaking, confetti)
- **Responsive design** with mobile-first approach, touch/swipe support
- **All client-side** — no backend, password check is simple JS
- **Placeholder content** with clear customization points for names, photos, dates, and messages
