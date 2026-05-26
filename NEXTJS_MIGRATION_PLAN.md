# Next.js Migration Notes

## Current Status
The refreshed static site has been converted to a Next.js App Router project. The active routes are `/` and `/booking`.

## Structure
- Images live under `public/images`.
- Previous HTML versions remain under `legacy/`.
- Shared UI lives in `components/`.
- Global theme tokens and responsive layout rules live in `app/globals.css`.

## Routes
- `/` renders the home page.
- `/booking` renders the booking request flow.
- Optional later routes: `/services`, `/gallery`, and `/notes`.

## Palette
The booking page uses the same green, cream, gold, and orange palette as the index page through shared CSS variables.

## Next Step
Wire the booking form to a real destination once the preferred channel is chosen: email, CRM, database, or a custom API route.
