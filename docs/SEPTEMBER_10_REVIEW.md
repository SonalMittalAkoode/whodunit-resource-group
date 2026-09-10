# September 10 website revision review

Changes are in the local website project. They have not been deployed. Final client sign-off remains open for the items below.

## Implemented

- Removed the Akoode credit, heart advertisement, external developer link, tooltip, and associated styling from the shared footer.
- Removed the entire “From Farm to Shipment” overlay from the homepage photograph. Its delivery terms are still explained elsewhere on the site.
- Preserved the exact supplied image order: 1141536501 → 1383100164 → 1031620134 → 1386443883 → 2225713678. These filenames match the abbreviated client references. Each photo changes after eight seconds with a 2.4-second crossfade. Images preload, the sequence loops, pause/resume works, and reduced-motion preferences start it paused.
- Both videos now autoplay muted and inline, loop, and omit native playback controls. A small accessible pause/resume button remains. A blocked autoplay attempt shows a usable play fallback. The existing slowed, first-ten-source-seconds pulse video is retained.
- Applied #819639 to prominent green panels and the shared footer. Other green treatments now use the same olive hue; darker shades support text and photographic overlays. Dark text on the primary green and deeper orange text on pale backgrounds maintain contrast. The supplied orange, cream, and blue remain brand accents.
- Enlarged small labels to at least 14px in active stylesheets and improved paragraph, form, table, and specification text. Fixed cramped FAQ columns on mobile and spacing around its questions.
- Removed spaces before punctuation in published HTML copy and corrected the inquiry email subject. Capitalized sentence openings in the order process and standardized the “Why Whodunit” navigation label.
- Restored the approved company operating summary, complete Red/Green Lentil specification paragraphs, Lentil formats, buyer-group descriptions, destination descriptions, and container/bulk storage copy. Removed a duplicated additional-cost paragraph.
- Removed LinkedIn and X icons with placeholder destinations. Email and WhatsApp remain available.
- The form now says “Prepare Email Inquiry” and explicitly states that the inquiry has not been sent. It retains entered information and field-specific validation; it does not claim successful server delivery.

## Verification

The local Chromium browser reviewed all **13 pages** at **1440px, 768px, and 390px** widths. Screenshots are under `docs/visual-review/` (excluded from Git). Each page was scrolled to load images and reveal animated sections.

- No horizontal page overflow, broken loaded images, duplicate page IDs, or browser JavaScript errors in the page checks. The decorative leaf on the sourcing page extends beyond its clipped container; it does not cause page overflow.
- All 221 static local file and anchor references resolved. JSON-LD parsed and JavaScript syntax checks passed.
- Final results: 39 page/viewport combinations without reported layout, image, small-text, branding, or JavaScript failures. The full-page axe scan reported zero violations for color contrast, link names, button names, and form labels; this is a targeted scan, not a complete accessibility certification.
- Verified the entire five-photo loop, eight-second timing, pause/resume, and reduced-motion startup.
- Both videos were actually playing automatically at all three viewport widths. Pause/resume passed at desktop and mobile widths.
- Product specification dialogs opened and closed with Escape on desktop and mobile.
- Empty forms produced visible errors at desktop and mobile widths. Country, national/international telephone, and email validation passed isolated functional checks. A valid inquiry generated the expected recipient, subject, and country name in a mailto draft; invalid submissions were blocked and focused.
- Contact URLs use `tel:+14036649864`, `mailto:info@whodunitresourcegroup.com`, and WhatsApp number `14036649864`. Both WhatsApp URLs returned HTTP 200 and redirected to that number. Google Maps resolved successfully to the configured location. These checks do not establish number ownership or message receipt.
- External association/event/source destinations were checked with HTTP HEAD. Four destinations blocked or reset automated requests: both Canadian Grain Commission links, Saskatchewan Pulse Growers, and Natural Earth terms. Their existing URLs were retained; see `external-link-review.json`. A blocked automated request is not classified as a broken link.

Browser emulation is not a physical iPhone/Android or Safari test. Telephone/email application handoff, actual calls, message delivery, and inbox receipt were not tested. No messages were sent.

## Original Word document and remaining decisions

Source: `C:/Users/Admin/Downloads/WRG WEBSITE COMMENTS and CONTENT.docx`. The generated `word-content-audit.json` retains each nonempty source paragraph from the copy section and identifies page matches. Matching ignores case, whitespace, and punctuation, and includes specification-dialog content; it is **not a claim of exact character-for-character identity**. All 20 supplied table cells are present after that normalization.

The audit contains 165 nonempty source entries: 113 match after normalization, and 52 remain explicitly listed for editorial review. The 52 are not all missing website content; the categories and examples below explain the distinction.

The remaining nonmatching entries include editorial headings, numbered instructions, copy split across headings and descriptions, and outstanding client placeholders. Examples of represented-but-reformatted copy include the Bean classes (97–100), order steps (132–134), quality checklist (144–148), the FAQ packing question (192), and the expanded FCA definition (187). These differences remain visible in the audit for client review; they have not been silently certified as word-for-word matches.

The following require input before final sign-off:

1. **Form delivery:** provide the intended server endpoint or form service. The current static site has no mail delivery backend. Then run a controlled submission and confirm recipient receipt. A mailto draft cannot satisfy this requirement.
2. **Client facts:** source paragraphs 71, 153–159, 189, and 197 leave facility details, held certifications/licences, shipment lead times, and minimum orders unspecified. Supply approved values before publishing claims. SEO suggestions mentioning certification-related farming in paragraph 212 also need factual confirmation.
3. **Final copy approval:** the approved source itself contains wording such as “This saves the purchaser buyer costs” (47), “not a discount slogan, a shorter chain” (59), and “Calibrated screens and length graders so a lot meets a size band” (114). These have not been substantively rewritten because the request requires confirmation for changes to intended wording. Review the source-to-page audit alongside these corrections.
4. **Social profiles:** provide official LinkedIn/X destinations if the client wants those icons reinstated.
5. **External/device checks:** verify the four automation-blocked external destinations and telephone/email handoff on actual desktop/mobile devices.

## Repeatable checks

- `python docs/check-content.py <client.docx>` requires BeautifulSoup.
- Serve the project at `http://127.0.0.1:8765`.
- `node docs/browser-review.cjs` requires Playwright. Set `PLAYWRIGHT_MODULE` to its module path and `CHROMIUM_PATH` to a local Chromium executable when they are outside the project.
- `node docs/check-interactions.cjs` additionally uses `AXE_PATH` for an installed `axe-core/axe.min.js`. `CONTRAST_ONLY=1` runs the page accessibility scan without repeating functional checks.

Do not mark all client requirements complete until the delivery and content decisions above are resolved.
