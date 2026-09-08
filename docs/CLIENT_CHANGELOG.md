# WRG client review — changes made

Source: `WRG WEBSITE COMMENTS and CONTENT.docx`, supplied with Bob Rai's email. Changes were made to the local website; nothing was deployed or sent to the client.

The existing green, orange, and cream palette, font families, WRG logo, header/footer structure, and main page sections have been retained. New content uses matching cards, section headings, and spacing. Local additions are styled in `css/client-updates.css`, loaded after each page's existing styles.

## Homepage — `index.html`

1. Changed the main heading to “Canadian Lentils, Peas, & Beans Supplier,” using the existing heading treatment.
2. Replaced the small hero text with the client's Canadian-owned, operated, vertically integrated company wording.
3. Removed the video from the homepage hero.
4. Added five photos in the requested order: `1141536501`, `1383100164`, `1031620134`, `1386443883`, `2225713678`.
5. Added a slow repeating sequence: eight seconds between changes and a 2.4-second crossfade, without flashing.
6. Added a Pause/Play photos control. The sequence starts paused for reduced-motion preferences and pauses its timer when the page is hidden.
7. Added a hover/click dropdown to “View Products & Specifications,” with Lentils, Peas, and Beans linking to the corresponding product specification sections. It supports keyboard use and Escape.
8. Changed quotation buttons to “Request Quotation” and retained their direct links to the contact form. Navigation occurs on activation, rather than unexpectedly redirecting a visitor on hover.
9. Changed the three trust labels to the exact requested wording: “Canada Origin,” “Whole-Dehulled-Split,” and “Bulk-Totes-Branded Bags.”
10. Removed the specified paragraph starting “From a container of red lentils to split yellow pea programs…”.
11. Expanded “Our Approach” with the client's company description, direct supply to buyers of every size, grower organization across four provinces, and integrity/honesty/trust wording.
12. Added black lentils to the product overview and lentil-card label.
13. Changed the Peas card image to `1383100164`; see the filename interpretation below.
14. Changed the Beans card image to the supplied `1211260989` photograph, using its optimized web copy.
15. Added three photographic cards for Red, Green, and Black Lentils, linked to their individual specification sections.
16. Added South America to the market icons and map, and aligned their order with the requested six regions.
17. Added FCA to the hero trade-card terms.
18. Added a linked industry-organizations section with the six requested logos.
19. Updated the homepage description metadata to include red, green, and black lentils.

## Shared navigation and quotation labels — `js/components.js`

20. Replaced the single Products link with a dropdown containing Lentils, Peas, and Beans.
21. Added a photo to each product-category menu entry, including the new Beans photograph.
22. Added an expandable Lentils entry with Red Lentils, Green Lentils, Black Lentils, and All Lentil Specifications links.
23. Marked the Products navigation group as current on product pages.
24. Added explicit dropdown control IDs and synchronized expanded/collapsed accessibility state.
25. Added desktop hover handling, focus-leave closure, and Escape focus restoration. Mobile visitors can open the navigation, expand Lentils, and follow a variety link; selecting a link closes the menu.
26. Standardized the shared desktop, mobile, and footer quotation buttons to “Request Quotation.” Matching quotation buttons on the other pages were updated as well.

## Products — `products.html` and `product-detail.html`

27. Expanded the Products introduction, lentil-card heading, and card description to include black lentils.
28. Updated Products description and social-preview metadata with red, green, and black lentils and the named bean classes.
29. Changed the Products Peas card to `1383100164` and Beans card to the optimized `1211260989` image, with matching alternative text.
30. Added the Red/Green/Black lentil-card row to the Products page.
31. Replaced “Can't Find What You're Looking For?” with “Request Quote,” retaining the request section and its button.
32. Replaced the old specification summary with the client's exact four-column table. All 20 cells, including headers, were compared against the DOCX table and match.
33. Added a caption, row and column headers, and a keyboard-focusable horizontal scrolling container for the table on narrow screens.
34. Expanded the general specifications explanation: crop-year availability, food/feed classes, recap parameters, and purity as a contract specification rather than a grade name.
35. Added a Red Lentils section with the requested photo, small/large red classes, whole/football/masoor dal formats, typical contracted moisture, destination examples, and a quotation link.
36. Added a Green Lentils section with the requested photo, Laird/Richlea/Eston classes, grading considerations, typical contracted moisture, formats, and a quotation link.
37. Added a Black Lentils section with the requested photo, specification/sample inquiry wording, contract parameters, packing options, and a quotation link. No unprovided black-lentil moisture limit was invented.
38. Retained and expanded specialty-lentil availability information.
39. Expanded the Yellow/Green Peas section with uses, colour/bleaching controls, formats, specialty/feed types, and typical contracted moisture.
40. Added the supplied Beans photograph to the detailed Beans section.
41. Expanded bean descriptions into Navy White, Pinto, Black, Kidney, Cranberry/other classes, and packing/format information.
42. Updated product-detail introduction and metadata to include black lentils.

## Contact — `contact.html` and `js/forms.js`

43. Replaced the contact hero photograph with `2221268578` and updated its alternative text.
44. Removed the “Incoterm Requested” and “Payment Instrument” fields.
45. Removed the instruction to supply those two fields from the form introduction and page/social descriptions.
46. Added optional destination-specific Halal or Kosher requirements to the inquiry guidance, without claiming WRG holds either certification.
47. Added a separate video-and-contact section with the supplied waterfall clip `2251288315`, a still poster, playback controls, and a WhatsApp button.
48. Added event-meeting links that prefill the Additional Information field for the selected event. The value is editable and uses a fixed allowlist of the two event IDs.
49. Retained the existing inquiry validation and email-app submission flow. No email or WhatsApp message was sent.

## About — `about.html`

50. Applied the requested “Canadian owned. Vertically integrated. Built on integrity.” heading and updated the page/social titles.
51. Expanded the hero lead with the Alberta company description and farm/store/process/value-enhance/package/ship scope.
52. Expanded the origin-and-relationships text with crop rotations, the four-province grower organization, and the client's integrity/honesty/trust wording.
53. Added the six “What We Do” capabilities: farming/grower organization, cleaning/grading, processed formats, packing/branding, buyers of every size, and identity-preserved lots.
54. Expanded the operating-structure section with hopper storage, specification control, residue/handling protocols, load-out, claims accountability, fewer intermediary costs, samples, and identity preservation.
55. Expanded the closing location copy with Alberta head-office, road/rail, collection-point, and export-corridor wording.
56. Adjusted the new heading's size locally so its longer wording follows the existing title style.

## Why Whodunit — `why-whodunit.html`

57. Expanded the lead with value enhancement, fewer intermediaries, and one responsible counterparty.
58. Expanded the Canadian-origin and quality descriptions with the grower organization, integrated handling, and reduced intermediary costs.
59. Expanded the value-enhancement card with specialized equipment, specified packing, and branding.
60. Clarified that programs and spot lots use the same grade, packing, and documentation standard.

## Value Enhancement — `sourcing.html`

61. Replaced the lead with the client's description of value enhancement between the bin and bill of lading.
62. Replaced the full original pulse-video source with an optimized version retaining only source seconds 0–10, slowed to half speed. Its playback lasts approximately 20 seconds.
63. Expanded the former four-stage process into the client's six stages: Inquiry; Offer; Confirmation; Processing & Packing; Documents & Load-out; Settlement & Delivery.
64. Used numbered markers in the existing process-card style and responsive columns to accommodate the six stages.
65. Expanded Cleaning & Grading with the equipment, dockage/off-types/damage/foreign-material controls, and contract-grade objective.
66. Separated Sizing & Class Separation from Dehulling & Splitting, with the client's descriptions for each.
67. Expanded Milling with application examples and conditional particle-size/protein specification.
68. Expanded Packing & Branding with bulk/tote/client-specific packs and pre-agreed branding.
69. Added Identity-Preserved Programs, including segregation and the condition that organic lots come from certified supply.
70. Added the four buyer groups: dal mills/splitters, food manufacturers/canners, feed/pet-food blenders, and importers/distributors.

## Quality — `quality.html`

71. Expanded the lead to explain matching the offered sample and shipped cargo to the contract.
72. Expanded the grading introduction with the CGC guide, buyer specifications, container inspection method, and CFIA plant-health documents.
73. Expanded export-document and destination-requirement descriptions with quality/weight certificates, phytosanitary statements, fumigation, residue limits, and labelling.
74. Expanded traceability from farm intake to load-out, including grower-group/elevator-origin identity agreed before commingling.
75. Added shipment-specific vessel grade/weight certification wording. No unverified certification badge, licence number, or unconditional licensing claim was added.

## Sustainability — `sustainability.html`

76. Expanded the lead and description metadata with nitrogen fixation, cereal disease cycles, water efficiency, rotations, and food/feed uses.
77. Expanded the farm section with nitrogen demand, reduced tillage, soil cover, and the four-province supply base.
78. Expanded product benefits with protein, fibre, low fat, traditional foods, plant-based ingredients, and Canadian-origin feed.
79. Changed “We report” to the client's forward-looking “We will report” for energy, waste, and sourcing measurements.

## Markets — `markets.html`

80. Retained the requested Vancouver-port asset `2240357496`, which was already present, and changed its treatment to show the complete photograph using contain sizing. Smaller screens place the full image below the text panel.
81. Updated the image alternative text to identify the Port of Vancouver.
82. Expanded the market introduction with the client’s buyer groups and destination/contract wording.
83. Added South America, with Colombia and other contract-based destinations, as a sixth region card.
84. Ordered the region cards and map labels: North America, South America, Europe, Asia, Middle East, Africa.
85. Added a South America map point and connecting route.
86. Changed the region count from five to six and changed the map label to “Markets We Serve.”
87. Removed Colombia from the Africa card and included it in South America.
88. Added “FCA (Free Carrier)” to the Incoterms explanation and FCA to Markets metadata.

## Resources — `resources.html`

89. Added an events section stating WRG is attending the two events identified by the client.
90. Added Pulse & Special Crops Convention 2026: September 15–17, The Westin Nova Scotian, Halifax. Includes official artwork, an organizer link, and an Arrange a Meeting button.
91. Added AgroFoodSummit 2026: September 24–25, Hilton Mersin, Mersin, Türkiye. Includes official artwork, the organizer's subject areas, an organizer link, and an Arrange a Meeting button.
92. Added visible credits for the organizer-provided event artwork and information.
93. Updated the Resources title, social title, introductory copy, and description metadata to include trade events.
94. Added structured event-list data with event names, dates, venues, cities, countries, and official URLs. WRG is presented as an attendee, not the event organizer.
95. Added FCA to the existing Markets & Logistics resource description.

## FAQ — `faq.html`

96. Added black lentils and cranberry/navy-white bean wording to the product answer and corresponding FAQ structured data.
97. Expanded the contract-form answer to identify GPC Pulses Contract No. 1 with the Global Pulse Confederation, including its structured-data version.
98. Replaced the sidebar “Can't find what you're looking for?” heading with “Request Quote.”
99. Retained the already-present sample, packing, minimum-order inquiry, inspection, export-document, and payment explanations; these already cover the main topics in the supplied FAQ copy.

## Files and media

- New stylesheet: `css/client-updates.css`.
- New optimized lentil photos: `Images/iStock/web/iStock-2287159268.webp` and `iStock-542329410.webp`.
- New video files: `Images/iStock/web/pulses-first-10s-slow.mp4`, `contact-nature.mp4`, and `contact-nature-poster.jpg`.
- Six local logo files in `Images/associations/`; two organizer-artwork files in `Images/events/`.
- The original uploaded images and videos remain intact. The previously added harvest-photo placements on Home/About and the pulses-photo Products banner remain in place.
- The prior `Images/iStock-1211260989-web.jpg` is reused wherever the new beans photo is needed.
- No new runtime library or build system was introduced to the website.

## Interpretations and remaining client details

- The document's Peas image reference `183310016` has no matching supplied file. It was treated as a transposition of the supplied `1383100164`, also named in the slideshow. The image contains peas and other pulses. This interpretation is recorded for client review.
- Other abbreviated photo/video references were matched to the supplied full filenames by their number prefixes.
- The supplied table includes dry-bean moisture wording in the Peas column. It has been preserved exactly as requested, pending any client correction.
- The first 10 seconds of source footage at half speed produces about 20 seconds of playback. No later source footage is included.
- There is no separate WhatsApp webpage in the website. The second video was placed in a Contact-page section beside a WhatsApp link.
- Unfilled facility-detail instructions, example lead-time ranges, hypothetical minimum orders, and certification placeholders were not published. The client can supply actual details during final copy review.
- Absolute country-ranking claims and broad legal/export-rule statements were not added as unqualified promises. The public copy uses the supplied business descriptions with contract- and shipment-specific wording.

## Validation

- Functional DOM checks passed for all 12 pages.
- 192 local file and anchor references passed existence checks.
- Tested Products dropdowns, expandable lentil options, Escape/focus restoration, and mobile navigation closure.
- Tested the five-photo sequence in order, looping, pause/play, and reduced-motion startup.
- Tested the homepage product quick menu and event-meeting form prefill.
- Tested required-field form validation and the existing completed-inquiry flow without sending a message.
- Checked six market regions in the requested order, both event cards, unique IDs, one H1 per page, and valid JSON metadata.
- Compared all 20 specification-table cells against the original DOCX; they match exactly.
- JavaScript syntax, current stylesheet parsing, and `git diff --check` passed.
- Inspected the supplied/new raster images and checked video metadata. Browser preview was unavailable in this session, so a rendered desktop/mobile visual review remains outstanding. The DOM checks do not establish visual layout correctness.

## Source links

- [Pulse & Special Crops Convention event details](https://cpsctrade.ca/events/pulse-special-crops-convention-2026/)
- [AgroFoodSummit event details](https://agrofoodsummit.com/)
- [Canadian Grain Commission](https://grainscanada.gc.ca/en/)
- [CGC signature artwork](https://commons.wikimedia.org/wiki/File:Signature_Commission_canadienne_des_grains_-_Canadian_Grain_Commission.svg)
- [Alberta Pulse Growers](https://albertapulse.com/)
- [Saskatchewan Pulse Growers](https://saskpulse.com/)
- [Manitoba Pulse & Soybean Growers](https://manitobapulse.ca/)
- [Ontario Bean Growers](https://ontariobeans.on.ca/growers/)
- [Pulse Canada](https://pulsecanada.com/)


## Follow-up: product-page and homepage design references

100. Restyled the product-detail page with the reference's green split hero, gold feature icons, compact spacing, cream alternating sections, and existing typography.
101. Replaced the product hero's root-level watermarked landscape with the supplied clean aerial-field image `Images/iStock/web/iStock-186310643.webp`; added a short photo caption.
102. Restyled the specification table with a cream caption and dark-green header. Kept all 20 client-provided table cells unchanged; the screenshot is a layout reference, not a replacement specification.
103. Converted red, green, and black lentils into three photo cards with concise introductions and three useful format/specification bullets each.
104. Preserved all detailed lentil text and quotation links in native, keyboard-accessible “View specifications” expandable panels. Retained the red/green/black anchor URLs.
105. Added a cream split-layout peas section with the local yellow split-pea photograph `iStock-896392140.webp` and a green circular caption. Preserved the client’s pea classes, formats, and moisture wording.
106. Reworked dry beans into a jars-photo and two-column class-information layout, retaining navy, pinto, black, kidney, cranberry/other classes, and packing details.
107. Condensed the sourcing section into heading/copy, the existing eight quotation requirements, and a local red/green lentil photograph (`iStock-2223084329.webp`).
108. Added “A partner you can count on.” above four compact benefit cards, retaining their substantive content.
109. Restyled the closing quotation banner with a local pulse photograph, readable green overlay, and both contact actions.
110. Added responsive product layouts, stacked cards/sections on small screens, and retained horizontal scrolling for the specification table.
111. Rebuilt the homepage Global Reach section with cream copy on the left, the existing local Vancouver-port photograph on the right, and a curved divider.
112. Replaced the remote map image and independent HTML pins with an inline SVG geographical schematic. Continent outlines, labels, pins, and routes now share one coordinate system.
113. Placed six distinct labels over North America, South America, Europe, Asia, the Middle East, and Africa. Added an orange Canada origin pin and dotted routes to each region.
114. Added accessible map title/description clarifying that markers represent regions, not individual ports.
115. Arranged the six region icons in a balanced three-by-two layout on desktop/mobile and a six-across layout at intermediate widths.
116. Added the “Connecting Canadian fields to global markets” caption and responsive map sizing. The map uses code-native SVG; all photographic assets in this follow-up come from the existing Images folder.
117. Isolated these visual updates in `css/product-reference.css` and `css/home-reach.css`, loaded only on their respective pages. Shared header/footer components remain in use.
118. Rechecked all 12 pages and 192 local references, JavaScript syntax, specification-table fidelity, and whitespace errors. Confirmed slow pulse video duration 19.97 seconds and nature video duration 12.77 seconds.

The in-app browser returned no available browser, so visual desktop/mobile approval is still outstanding. Functional DOM checks and CSS parsing do not substitute for a rendered visual review.


## Follow-up: clearer map and single-row region icons

119. Replaced the busy homepage port background with the existing local aerial sky-and-fields photograph `iStock-1031620134.webp`, softened by a pale overlay.
120. Increased map contrast with sage-green continents, dark-green dotted routes, and a dark-green caption; retained all region markers and labels.
121. Put all six region icons in one row at every breakpoint with compact responsive spacing.
122. Corrected stylesheet selector specificity so the homepage overrides take precedence over the older five-column region grid and port background.


## Follow-up: FAQ plus buttons

123. Removed the duplicate inline FAQ click handler from `faq.html`. It toggled each answer a second time, cancelling the shared handler in `js/main.js`. The shared handler now controls expansion exclusively; the FAQ design and answers are unchanged.
124. Reproduced the failure before the fix, then verified all eight plus buttons open their associated answers, close on another click, and allow only one expanded answer at a time.

125. Increased the homepage hero slideshow speed from one image every 8 seconds to every 4 seconds, retaining the smooth fade, pause control, and reduced-motion behavior.

126. Gave the Pulse Canada association card the same dark-green background and white caption as Alberta Pulse Growers so its white logo is visible.
