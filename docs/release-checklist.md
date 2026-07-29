# JAY Builders release checklist

This checklist is a release gate, not evidence that unverified values are true. Any item marked **BLOCKED** must be resolved by the business owner before production.

## Identity, content and legal

- [ ] **BLOCKED:** obtain written confirmation of the trading name, canonical production origin, service area, phone number, email address, company number and insurance status. The values labelled `placeholder` in `src/content/11-footer.ts` must not be treated as verified facts.
- [ ] **BLOCKED:** obtain evidence and publication consent for every testimonial, rating, customer name, platform attribution and customer video. Only records explicitly marked `verified: true` may be passed to `structuredDataFor` as Review schema.
- [ ] Confirm every service and geographical claim with the business owner; re-run the content tests after approved edits.
- [ ] **BLOCKED:** publish reviewed Privacy Policy and Terms & Conditions destinations and replace the footer's non-link labels.
- [ ] Document the lawful basis, retention period, deletion workflow and data-subject contact for enquiry and upload data.

## Environment and spreadsheet operations

- [ ] Set `GOOGLE_SHEETS_SPREADSHEET_ID`, `GOOGLE_SHEETS_TAB_NAME`, `GOOGLE_SERVICE_ACCOUNT_EMAIL` and `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`; never commit their values.
- [ ] Share only the intended spreadsheet with the service-account email and grant the minimum required access.
- [ ] Confirm the A–N headers match `ENQUIRY_COLUMNS`, submit a synthetic enquiry and verify exactly one row is created.
- [ ] Configure private upload storage, malware scanning, retention/deletion, access control and expiring references before enabling attachments.
- [ ] Route structured `enquiry_store_failed` events to monitored alerts; verify retry, rate-limit and duplicate-id behaviour and document the manual recovery owner.
- [ ] Back up the spreadsheet and uploaded media on a tested schedule; record restoration results and recovery objectives.

## Quality and deployment gates

- [ ] Set the production origin and verify the rendered canonical and `og:url` are absolute HTTPS URLs.
- [ ] Validate the rendered JSON-LD with Schema.org/Google tooling. Confirm no placeholder phone, email, company number, reviews or ratings appear.
- [ ] Run lint, strict type checking, coverage, production build, keyboard/accessibility checks, and visual regression at 375, 768 and 1440 pixels.
- [ ] Confirm no horizontal overflow, overlap, clipped controls or urgent-card obstruction at all three widths and at 200% zoom.
- [ ] Measure production LCP (target ≤2.5 s) and CLS (target ≤0.1) on representative mobile hardware/network conditions.

## Downloadable ZIP hand-off

- [ ] Build the deliverable ZIP and inspect its manifest: production source, generated responsive assets, setup documentation, spreadsheet guide, environment-variable names, release checklist and licence/attribution notes.
- [ ] Confirm the ZIP excludes `.env`, credentials, real enquiry data, raw customer uploads, `node_modules`, test coverage output and reference-only assets unless explicitly requested.
- [ ] Extract into a clean directory, install from the lockfile, build and start it, then record the ZIP checksum and release tag.
