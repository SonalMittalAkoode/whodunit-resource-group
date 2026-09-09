# September 9 client updates

## Changes made

1. Standardized commodity names and product-class capitalization across all 12 HTML pages, image descriptions, relevant metadata, FAQ structured data, and the shared footer. URL slugs and navigation targets remain stable.
2. Added shared brand tokens in `css/style.css`: Orange #E07800, Cream #FFFAF0, Light Blue #B3E7FF, Agricultural Green #819639. Existing page-level accent/background variables now refer to these tokens. Deep green remains for contrast. Orange homepage buttons now use dark text for readability.
3. Added shared body, section-heading, card-heading, and label size tokens. Improved FAQ and detailed product-copy readability; paragraphs are not globally bolded.
4. Changed the Products / Canadian Pulses right-hand hero to supplied `Images/iStock/web/iStock-1383100164.webp` (matching the client's abbreviated 138310016 reference). Preserved cover sizing and aspect ratio.
5. Replaced the incorrect Peas imagery in the Home product card, Products card, product-detail Peas section, and shared Products dropdown with a separate photograph of whole Yellow Peas. The source shows actual round Peas, not Lentils or Chickpeas.
6. Added the replacement as `Images/products/whole-yellow-peas.jpg` (1920 x 1272). The client-reference screenshot was visible in chat but no corresponding local image file was found. Used a separately sourced photograph, not an extracted screenshot or placeholder. Resources includes attribution and the license; the product badge now identifies Whole Yellow Peas without claiming the photographed lot is Canadian.
7. Kept the supplied Lentil photographs for Red, Green, and Black classes after visual inspection. Kept the supplied bean-jar imagery for the general Dry Beans category, with descriptions acknowledging mixed Pulses where appropriate.
8. Changed Europe card image rendering to `object-fit: contain` with centered positioning, so the full supplied 4490852 vessel photograph is visible without distortion.
9. Replaced the simplified home-map continent polygons with Natural Earth geographic outlines. Applied the same coordinate-based map to the Markets page and removed its remote map image and independent pins.
10. Added westbound Pacific routing from Canada to Asia using continuity at the map edges, alongside eastbound Atlantic routes to Europe, the Middle East, and Africa. North and South American routes remain. Added Pacific/West and Atlantic/East labels.
11. Preserved the Canada origin pin and six destination markers. Added numbered marker keys for narrow screens so destination names remain readable without overlapping SVG labels. No extra animation was introduced.
12. Reduced the From Farm to Shipment card from 315px to 245px wide, reduced padding from 34px to 20px, reduced the icon and heading, and tightened vertical spacing. The estimated overall footprint is approximately 40% smaller; final rendered dimensions require browser verification. Retained legible copy and positioned the pause control below it.
13. Added the complete purchasing section immediately after the homepage product range: CANADIAN SOURCING, Always Ready to Purchase, the exact introductory sentence, both Lentil/Pea groups, all seven Bean classes, and the exact closing paragraph. Send Your Offer links to the existing Contact form.
14. Restored the original client's full About lead, Origin and Relationships paragraphs, How We Work paragraph, all six capabilities, and location paragraph. Product-name capitalization is the only wording-formatting adjustment.
15. Restored approved product/specification introduction, detailed Red and Green Lentil copy, specialty-class note, Pea descriptions/formats, and Dry Bean introduction/formats. Specification numbers and the client-provided table's values are retained.
16. Restored approved Value Enhancement descriptions and order-process copy, Quality/Traceability copy, Sustainability copy, Markets introduction, selected Why Whodunit paragraphs, and available approved FAQ answers. Left unfilled facility/MOQ/certification instructions unpublished.
17. Restored the approved company description in the homepage approach and shared footer. Navbar and footer component structures were preserved.
18. Included FCA first in delivery-term explanations across relevant About, Products, Product Detail, Sourcing, Quality, Resources, Why Whodunit, Contact, and FAQ areas. Updated concise homepage/process wording where relevant. Preserved approved paragraphs by adding separate delivery-term notes instead of inserting FCA into lists of certificates or rewriting those paragraphs. COA and CFIA remain intact.
19. Added the Resources card: Canadian Grain Commission / Official Grain Grading Guide (2026), with a real same-origin Download Guide link, download attribute, accessible label, edition, and file size. Added relevant Resources metadata and a link to check the current CGC edition.
20. Stored the unmodified official August 1, 2026 PDF at `resources/downloads/canadian-grain-commission-official-grain-grading-guide-2026.pdf`. It is 544 pages and 10,433,376 bytes. The file is downloaded only when requested; it is not embedded/preloaded into the page.
21. Retained the previously requested four-second hero slideshow, working FAQ accordion, dark Pulse Canada logo background, quotation flow, and navigation.

## Validation

- All 12 pages use HTML standards mode, have one H1, unique IDs, valid JSON metadata, and existing local targets.
- 195 local file/anchor references passed checks.
- Products dropdown, nested Lentil navigation, mobile navigation, slideshow order/pause/reduced-motion handling, contact validation, and event prefill passed functional DOM checks.
- All eight FAQ buttons open and close their associated answers; only one remains expanded.
- Exact new purchasing paragraph, complete seven-Bean list, and section placement passed checks.
- Five core About paragraphs were compared to the approved DOCX: only capitalization/whitespace differ.
- Both maps contain six markers, westbound Pacific paths, geographic outlines, and six-item mobile keys.
- Product hero and Peas images are distinct, and all image paths resolve.
- The PDF header and August 1, 2026 edition were verified. Live Server returned HTTP 200 with `Content-Type: application/pdf` for its download URL.
- JavaScript syntax, CSS parsing, and whitespace checks passed.
- The in-app browser returned no available browser. Rendered large-desktop/laptop/tablet/mobile layout, contrast across every component, and horizontal-overflow checks remain unverified. Source/DOM checks are not visual QA.

## Sources and assumptions

- Approved company copy: `C:/Users/Admin/Downloads/WRG WEBSITE COMMENTS and CONTENT.docx`; paragraph-index reference retained in `docs/approved-copy-source.json`.
- Latest change request: supplied September 9 pasted text and screenshots.
- [Whole Yellow Peas photograph](https://commons.wikimedia.org/wiki/File:Raw_(dried)_yellow_peas.jpg), Billjones94, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). Original file unchanged; fitted/cropped only in the browser. This is illustrative product photography, not a WRG-origin photo.
- [Natural Earth land geometry](https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_land.geojson), [public-domain terms](https://www.naturalearthdata.com/about/terms-of-use/).
- [Official CGC August 2026 PDF](https://grainscanada.gc.ca/en/grain-quality/official-grain-grading-guide/pdf/oggg-2026-27.pdf). No client-supplied manual was found locally, so this verified official edition was used.
