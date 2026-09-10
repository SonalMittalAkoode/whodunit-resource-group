# CTA and footer reference implementation

The larger supplied reference is the design target. The homepage CTA now uses a full-width field photograph, a curved olive panel, a large cream heading, two working contact actions, three trust icons, a circular Canadian-fields seal, and a script-style slogan. The shared footer uses an overlapping rounded cream panel, olive logo, separated columns, orange contact icons, a blue quotation card, botanical/mountain line details, and a legal row.

The site’s existing company number, mailing address, telephone, email, and current copyright year are retained. Reference-only contact details were not substituted. Existing site pages provide the navigation destinations.

The photograph is a newly generated interpretation of the supplied reference, not its original source image. All interface text, navigation, buttons, ornaments, and badges are live HTML/CSS/SVG. The footer adapts to two columns on tablet and mobile; the CTA stacks its actions and exposes the photograph below its copy on phones. Floating controls hide while the CTA or footer is visible.

## Asset provenance

- Tool: built-in ImageGen, using the user’s larger screenshot as a reference.
- Project asset: `Images/cta/canadian-pulses-field.webp`.
- Prompt: “Create a photographic background asset for the CTA website design shown in the supplied large reference image. Match ONLY its upper-right photographic scene: a rustic shallow wooden bowl generously filled with clearly separated red lentils, green peas, yellow peas, and dark beans, in a sunlit green Canadian agricultural field with distant dramatic Canadian Rocky Mountains and blue sky. Bowl dominates lower RIGHT quadrant, slightly cropped right and bottom; distant mountains across upper third. Wide landscape 2.3:1 composition. Entire LEFT 55 percent is soft field scenery with no subject, it will be covered by a real HTML olive shape. Natural realistic photography with the same warm daylight and composition as reference. NO text, NO typography, NO badges, NO logos, NO buttons, NO UI, NO footer, NO border. Generate just the clean underlying photograph, not a website screenshot. Save output for website use.”

## Validation

`docs/check-cta-footer.cjs` verifies the CTA and footer at 1440px, 768px, and 390px widths, checks targeted contrast and accessible link names, and resolves shared footer links across all 13 pages. The initial pass found no overflow or targeted accessibility violations. Screenshots and results are in `docs/visual-review/`.

The implementation is local and has not been deployed. The form-delivery and original-copy sign-off items from the earlier review remain separate outstanding work.
