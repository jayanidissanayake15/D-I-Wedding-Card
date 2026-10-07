# Kandyan Digital Wedding Invitation

An elegant, interactive Kandyan wedding-inspired digital invitation designed for Dinithi & Isuru. 

## Features
- **Personalized Envelope**: Guests are greeted by name on a luxury chocolate-brown envelope.
- **Kandyan Aesthetics**: Pearl white paper texture, antique gold accents, and Liyawela motifs.
- **Dynamic RSVP**: Guests can choose to send their RSVP via WhatsApp to either Isuru or Dinithi. Includes direct call buttons.
- **Save the Date**: Countdown timer and downloadable `.ics` calendar file for the event.
- **Music Integration**: Optional ambient audio player.

## How to Edit Details
All wedding data is centrally configured in `src/weddingConfig.js`.

1. Open `src/weddingConfig.js`.
2. Edit names, dates, times, and venue locations.
3. Update WhatsApp numbers (must be international format, e.g., `94773571232`).

## Generating Guest Links
To create personalized links for your guests, append `?to=Guest Name` to your deployed URL.

For example, if your website is deployed at `https://dinithi-isuru.com`:
- `https://dinithi-isuru.com?to=Mr.%20K.%20Godage`
- `https://dinithi-isuru.com?to=Aunty%20Samanthi%20%26%20Uncle%20Nimal`

A small utility script is provided in `src/generateLink.js` to programmatically encode these names correctly.

## Development & Deployment

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run locally:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```
   Deploy the resulting `dist` folder to your preferred static hosting service (e.g., Vercel, Netlify, GitHub Pages).
