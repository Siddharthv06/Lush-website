/**
 * =========================================================================
 * ⚙️ HERO SECTION CONFIGURATION (All values in PX for easy editing)
 * Change any number below and save — the homepage updates instantly!
 * =========================================================================
 */
export const HERO_CONFIG = {
  // 1. Heading Typography
  heading: {
    desktopFontSize: 56,    // Desktop headline font size in px (e.g. 52 - 64)
    tabletFontSize: 42,     // Tablet headline font size in px
    mobileFontSize: 28,     // Mobile headline font size in px
    maxWidth: 960,          // Maximum width of the headline text block in px
    marginBottom: 14,       // Space below the heading (above ship) in px
  },

  // 2. Top Enterprise Badge
  badge: {
    fontSize: 11,           // Badge font size in px
    paddingX: 14,           // Horizontal padding in px
    paddingY: 5,            // Vertical padding in px
    marginBottom: 14,       // Space below the badge (above heading) in px
  },

  // 3. Ocean Ship Dimensions & Positions (All in PX)
  ship: {
    xPosition: 0,           // Ship X position in px (+ for right, - for left)
    yPosition: 10,          // Ship Y position in px (+ for down, - for up)
    desktopWidth: 640,      // Ship width on desktop in px (e.g. 580 - 760)
    desktopHeight: 226,     // Ship height on desktop in px (width / 2.83)
    tabletWidth: 480,       // Ship width on tablets in px
    tabletHeight: 170,      // Ship height on tablets in px
    mobileWidth: 340,       // Ship width on mobile in px
    mobileHeight: 120,      // Ship height on mobile in px
    horizontalOffset: 0,    // (Alias for xPosition) Fine-tune X in px
    verticalOffset: 10,     // (Alias for yPosition) Fine-tune Y in px
    marginBottom: 8,        // Space below the ship (above buttons) in px
  },

  // 4. Subheading (Replaces buttons below the ship)
  subheading: {
    text: "Connecting Africa's farm-gate agricultural strength to the world — Exporting Grade-A Raw Cashews, Pulses, Arabica Coffee & Hardwood Timber across global maritime trade routes.",
    desktopFontSize: 17,    // Subheading font size on desktop in px
    tabletFontSize: 15,     // Subheading font size on tablet in px
    mobileFontSize: 13,     // Subheading font size on mobile in px
    maxWidth: 780,          // Maximum width of subheading text block in px
    marginTop: 6,           // Space above subheading (below ship) in px
    lineHeight: 1.6,        // Line height multiplier
  },

  // 5. Section Layout Spacing
  layout: {
    paddingTop: 80,         // Space from top navbar in px
    paddingBottom: 80,      // Space above bottom wave curve in px
    maxWidth: 1240,         // Maximum container width in px
  },
};
