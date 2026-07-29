# Visual regression fixtures

The canonical full-page review widths are defined in `viewports.ts`: 375px, 768px, and 1440px. Capture each fixture against `/` with animations disabled and compare full-page images. These names are stable so a Playwright, Percy, or Chromatic runner can consume them without changing baselines.
