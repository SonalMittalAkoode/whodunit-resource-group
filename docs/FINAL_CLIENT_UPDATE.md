# Consolidated client update — September 10, 2026

This report supersedes the earlier CTA image/provenance notes and the earlier outstanding grammar corrections. Changes are local; the website has not been deployed.

## Changes and asset verification

- Reduced the homepage closing CTA from a 625px minimum to a 460px minimum, with smaller heading, spacing, and seal. At 1440px viewport width it renders at approximately 500px, allowing the text and controls to fit without clipping. Tablet/mobile rules are reduced proportionally.
- Replaced the generated CTA photograph with the supplied `Images/iStock/web/iStock-2221268578.webp`. The generated image is no longer referenced by the website and has been removed from the project.
- Replaced remaining external Unsplash backgrounds in active stylesheets with the already supplied `iStock-186310643.webp`. No images were downloaded or generated during this revision.
- Both Canadian Pulses hero areas (`products.html` and `product-detail.html`) now use the requested existing `iStock-1383100164.webp`, corresponding to the abbreviated 138310016 reference.
- Visually inspected the local image collection. The existing `Images/products/whole-yellow-peas.jpg` shows round whole Yellow Peas, not Lentils, and remains the Peas image. It is distinct from the mixed-Pulses hero. The photograph is not labelled as showing Green Peas or proving Canadian origin.
- Confirmed the five homepage carousel files, in order: 1141536501, 1383100164, 1031620134, 1386443883, 2225713678. All exist locally. Eight-second timing, the full loop, pause/resume, and reduced-motion startup passed browser checks. The large homepage photograph overlay remains removed.
- Retained the approved green/orange/cream/blue palette and existing structure. Slightly increased small footer text without changing its column layout.
- Both videos autoplay muted and inline. Native controls remain absent. Pause/resume is available on keyboard focus without a visible Play button in the normal presentation.
- Standardized product/colour capitalization in published text, corrected punctuation spacing, and corrected the flagged purchasing-cost, supply-chain, sizing-equipment, and Canadian-owned introductory wording without changing the intended meaning. The original source snapshot was preserved.
- Confirmed the shared footer contains no developer credit, advertising, or placeholder social links.

## Combined legal page

`legal.html` contains both Privacy Policy and Terms and Conditions, with one combined footer link across all 13 pages. It identifies WHODUNIT RESOURCE GROUP as a division of **1318982 Alberta Ltd.** Existing internal section anchors remain available.

The draft covers information categories, purposes, providers, external services, retention, security, privacy choices, inquiries, site use, quotations, intellectual property, limitations, and applicable governing-law provisions. Added explicit disclosure of Google Fonts requests and qualified protection against unlawful discrimination when exercising privacy rights. It accurately describes the current email-draft form.

The consent/privacy review used the [Canadian privacy regulator’s consent guidance](https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/p_principle/principles/p_consent/) and [California Attorney General’s CCPA guidance](https://www.oag.ca.gov/privacy/ccpa). The sector-style reference was [Viterra’s privacy notice](https://www.viterra.com/privacy-notice), for its organization of collection, purposes, sharing, retention, and rights; its company-specific claims were not copied. The draft does not assert that every US privacy statute necessarily applies to WRG.

**Client/legal-counsel review is still required before production use**, as requested. The business must confirm that its actual practices match the draft.

## QA and outstanding completion items

- CTA/footer checks at 1440px, 768px, and 390px passed without horizontal overflow or targeted contrast/link-name violations. All shared footer destinations resolve across all 13 pages.
- All 236 static local file/anchor references resolve, JSON-LD parses, and JavaScript syntax checks pass.
- The complete interaction checks passed for the carousel, desktop/mobile validation errors, video autoplay and keyboard pause/resume, product dialogs, and reduced motion. Isolated valid-form checks confirm the configured mailto recipient and draft content.
- `docs/browser-review.cjs` provides the final 13-page desktop/tablet/mobile screenshot and layout review; machine results are in `docs/visual-review/results.json`. The targeted accessibility scan is in `docs/visual-review/accessibility.json`.
- Final results: all 39 page/viewport cases passed with no page overflow, broken images, undersized audited text, developer branding, or JavaScript errors. The full-page targeted accessibility scan reported zero violations; the CTA/footer were rechecked after the final typography adjustment.
- `docs/word-content-audit.json` compares all 165 nonempty source entries in the copy section. 110 match after case/punctuation normalization; the remaining entries include editorial instructions/headings, copy split across display elements, the documented grammar corrections, and unfilled client placeholders. All 20 specification-table cells match after normalization. This is not a claim of exact character-for-character identity.

The site must **not** be labelled fully signed off yet:

1. The quotation form still opens an email draft. A receiving server/form service and recipient inbox confirmation are needed to establish successful delivery. No messages were sent.
2. The Word source leaves facility details, held certifications/licences, shipment lead times, and minimum orders unspecified. Those facts require client input; they were not invented.
3. Physical-device telephone/email-app handoff and Safari playback remain unverified. Desktop/mobile checks use Chromium viewport emulation.
4. The four external destinations previously blocking automated checks remain recorded in `external-link-review.json`. Existing WhatsApp and map redirects were verified during the earlier review; those URLs have not changed.

These are explicit pending items, not omissions from the final requirements.
