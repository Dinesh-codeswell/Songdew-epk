const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");

// ─── BRAND COLORS ─────────────────────────────────────────────────────────────
const C = {
  NAVY:    "0B1021",
  BLUE:    "007BFF",
  BLUE2:   "0056CC",
  WHITE:   "FFFFFF",
  OFFWH:   "F9F9F9",
  GRAY:    "6C757D",
  LGRAY:   "EEF4FF",
  DKGRAY:  "374151",
  RED:     "F44336",
  GREEN:   "22C55E",
  AMBER:   "F59E0B",
  SLATE:   "94A3B8",
  CARD:    "FFFFFF",
};

// ─── ICON HELPER ──────────────────────────────────────────────────────────────
const { FaSearch, FaUsers, FaLightbulb, FaPencilRuler, FaCode, FaRocket,
        FaChartLine, FaBullhorn, FaCheckCircle, FaStar, FaMusic,
        FaUserCircle, FaLayerGroup, FaBolt } = require("react-icons/fa");
const { MdTimeline } = require("react-icons/md");

function svgOf(IconComp, color = "#FFFFFF", size = 256) {
  return ReactDOMServer.renderToStaticMarkup(
    React.createElement(IconComp, { color, size: String(size) })
  );
}
async function iconPng(IconComp, color = "#FFFFFF") {
  const buf = await sharp(Buffer.from(svgOf(IconComp, color))).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

// ─── SHADOW FACTORY ───────────────────────────────────────────────────────────
const sh = () => ({ type: "outer", blur: 8, offset: 3, angle: 135, color: "000000", opacity: 0.10 });

// ─── REUSABLE HELPERS ─────────────────────────────────────────────────────────
function darkSlide(slide) { slide.background = { color: C.NAVY }; }
function lightSlide(slide) { slide.background = { color: C.OFFWH }; }

function sectionLabel(slide, text) {
  slide.addText(text.toUpperCase(), {
    x: 0.5, y: 0.18, w: 9, h: 0.28,
    fontSize: 9, color: C.BLUE, bold: true, charSpacing: 3, margin: 0
  });
}

function slideTitle(slide, text, color = C.NAVY) {
  slide.addText(text, {
    x: 0.5, y: 0.5, w: 9, h: 0.65,
    fontSize: 30, fontFace: "Calibri", bold: true, color, margin: 0
  });
}

function subtitle(slide, text, y = 1.22, color = C.GRAY) {
  slide.addText(text, {
    x: 0.5, y, w: 9, h: 0.35,
    fontSize: 13, color, margin: 0, italic: true
  });
}

// Card with optional accent left bar
function card(slide, x, y, w, h, fillColor = C.CARD, accent = null) {
  if (accent) {
    slide.addShape("rect", { x, y, w: 0.06, h, fill: { color: accent } });
    slide.addShape("rect", { x: x + 0.06, y, w: w - 0.06, h, fill: { color: fillColor }, shadow: sh() });
  } else {
    slide.addShape("rect", { x, y, w, h, fill: { color: fillColor }, shadow: sh() });
  }
}

// Phase pill chip
function phasePill(slide, x, y, label, color = C.BLUE) {
  slide.addShape("roundRect", { x, y, w: 1.6, h: 0.3, fill: { color }, rectRadius: 0.15 });
  slide.addText(label, { x, y, w: 1.6, h: 0.3, fontSize: 9, color: C.WHITE, bold: true, align: "center", valign: "middle", margin: 0 });
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
async function main() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "Dinesh — PM Intern";
  pres.title = "Songdew EPK Module — Strategy & Timeline";

  // Pre-render icons
  const icons = {
    search:   await iconPng(FaSearch,    "#007BFF"),
    users:    await iconPng(FaUsers,     "#007BFF"),
    bulb:     await iconPng(FaLightbulb, "#007BFF"),
    pencil:   await iconPng(FaPencilRuler,"#007BFF"),
    code:     await iconPng(FaCode,      "#007BFF"),
    rocket:   await iconPng(FaRocket,    "#FFFFFF"),
    chart:    await iconPng(FaChartLine, "#007BFF"),
    bull:     await iconPng(FaBullhorn,  "#007BFF"),
    check:    await iconPng(FaCheckCircle,"#22C55E"),
    star:     await iconPng(FaStar,      "#F59E0B"),
    music:    await iconPng(FaMusic,     "#FFFFFF"),
    user:     await iconPng(FaUserCircle,"#007BFF"),
    layer:    await iconPng(FaLayerGroup,"#FFFFFF"),
    bolt:     await iconPng(FaBolt,      "#007BFF"),
    checkWh:  await iconPng(FaCheckCircle,"#FFFFFF"),
  };

  // ════════════════════════════════════════════════════════════
  // SLIDE 1 — COVER
  // ════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    darkSlide(s);

    // Big left accent bar
    s.addShape("rect", { x: 0, y: 0, w: 0.12, h: 5.625, fill: { color: C.BLUE } });

    // Company tag
    s.addText("SONGDEW  ·  INTERNAL STRATEGY DECK", {
      x: 0.35, y: 0.38, w: 8, h: 0.28,
      fontSize: 9, color: C.BLUE, bold: true, charSpacing: 3, margin: 0
    });

    // Main title
    s.addText([
      { text: "EPK Module", options: { breakLine: true, color: C.WHITE, fontSize: 42, bold: true } },
      { text: "Strategy & Timeline", options: { color: "5599FF", fontSize: 42, bold: true } }
    ], { x: 0.35, y: 1.0, w: 6.5, h: 1.6, fontFace: "Calibri", margin: 0 });

    // Tagline
    s.addText('"Songdew for Artists — what LinkedIn is for Professionals"', {
      x: 0.35, y: 2.75, w: 7, h: 0.45,
      fontSize: 14, color: C.SLATE, italic: true, margin: 0
    });

    // Meta info cards
    const metas = [
      ["Author",   "Dinesh — PM Intern"],
      ["Module",   "Songdew Artist EPK"],
      ["Date",     "June 2026"],
      ["Version",  "v1.0"],
    ];
    metas.forEach(([k, v], i) => {
      const x = 0.35 + i * 2.42;
      s.addShape("rect", { x, y: 3.45, w: 2.2, h: 0.78, fill: { color: "121C35" }, shadow: sh() });
      s.addText(k.toUpperCase(), { x, y: 3.52, w: 2.2, h: 0.22, fontSize: 7.5, color: C.SLATE, align: "center", charSpacing: 2, margin: 0, bold: true });
      s.addText(v, { x, y: 3.75, w: 2.2, h: 0.3, fontSize: 10, color: C.WHITE, align: "center", bold: true, margin: 0 });
    });

    // Music note icon
    s.addImage({ data: icons.music, x: 8.5, y: 0.7, w: 1.1, h: 1.1 });

    // Bottom line
    s.addText("CONFIDENTIAL — INTERNAL USE ONLY", {
      x: 0, y: 5.3, w: 10, h: 0.25,
      fontSize: 8, color: C.SLATE, align: "center", margin: 0
    });
  }

  // ════════════════════════════════════════════════════════════
  // SLIDE 2 — THE PROBLEM (CURRENT STATE)
  // ════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    lightSlide(s);
    sectionLabel(s, "Problem Statement");
    slideTitle(s, "The Current Gap in the Platform");
    subtitle(s, "Why artists and listeners are both underserved today");

    // Problem image reference note
    s.addShape("rect", { x: 0.5, y: 1.65, w: 4.5, h: 3.5, fill: { color: "FFF3CD" }, shadow: sh() });
    s.addText("CURRENT STATE", {
      x: 0.5, y: 1.68, w: 4.5, h: 0.3,
      fontSize: 8, color: C.AMBER, bold: true, charSpacing: 2, align: "center", margin: 0
    });
    s.addText([
      { text: "Artists + Listeners share the same dashboard\n", options: { bold: true, color: C.DKGRAY, breakLine: true } },
      { text: "→  A curator landing on the platform sees the same \n    navigation as a casual music fan\n\n", options: { color: C.DKGRAY, breakLine: true } },
      { text: "→  Sidebar has: Release, Analytics, Finance, \n    Promo Tools, Opportunities — all mixed\n\n", options: { color: C.DKGRAY, breakLine: true } },
      { text: "→  The e-Press Kit is buried inside a workstation \n    that was designed for artists, not for\n    the curators viewing it", options: { color: C.DKGRAY } },
    ], { x: 0.65, y: 2.05, w: 4.15, h: 2.9, fontSize: 11, margin: 0 });

    // Right: The 3 pains
    const pains = [
      { title: "No Dedicated Discovery Feed", body: "Listeners land on an artist-management dashboard — wrong context, wrong CTA, wrong experience.", c: C.RED },
      { title: "EPK is Hidden, Not Highlighted", body: "The e-Press Kit is a sub-menu item. Industry stakeholders can't find it without guidance.", c: C.AMBER },
      { title: "One URL = Two Audiences", body: "A single songdew.com profile tries to serve the working artist AND the curious fan. Neither wins.", c: C.BLUE },
    ];
    pains.forEach((p, i) => {
      const y = 1.65 + i * 1.18;
      card(s, 5.3, y, 4.3, 1.05, C.CARD, p.c);
      s.addText(p.title, { x: 5.5, y: y + 0.08, w: 4.0, h: 0.28, fontSize: 11, bold: true, color: C.NAVY, margin: 0 });
      s.addText(p.body, { x: 5.5, y: y + 0.38, w: 4.0, h: 0.52, fontSize: 10, color: C.GRAY, margin: 0 });
    });
  }

  // ════════════════════════════════════════════════════════════
  // SLIDE 3 — THE VISION
  // ════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    darkSlide(s);

    s.addText("THE VISION", {
      x: 0.5, y: 0.3, w: 9, h: 0.28,
      fontSize: 9, color: C.BLUE, bold: true, charSpacing: 3, margin: 0
    });
    s.addText('"Make Songdew for Artists what LinkedIn is for Professionals"', {
      x: 0.5, y: 0.75, w: 9, h: 0.9,
      fontSize: 26, color: C.WHITE, bold: true, align: "center", fontFace: "Calibri", margin: 0
    });

    // 3 analogy cards
    const analogies = [
      { platform: "LinkedIn",  for: "Working Professionals", what: "Professional credibility + networking + job discovery", color: "0077B5" },
      { platform: "Dribbble",  for: "UI/UX Designers",       what: "Portfolio showcase + skill discovery + client pitching", color: "EA4C89" },
      { platform: "Songdew EPK", for: "Music Artists", what: "Professional identity + industry discovery + booking", color: C.BLUE },
    ];
    analogies.forEach((a, i) => {
      const x = 0.4 + i * 3.08;
      const isSongdew = i === 2;
      s.addShape("rect", { x, y: 1.85, w: 2.85, h: 2.85,
        fill: { color: isSongdew ? C.BLUE : "141E35" },
        shadow: isSongdew ? { type: "outer", blur: 16, offset: 4, angle: 135, color: "007BFF", opacity: 0.5 } : sh()
      });
      if (isSongdew) {
        s.addShape("rect", { x, y: 1.85, w: 2.85, h: 0.07, fill: { color: "FFFFFF" } });
      }
      s.addText(a.platform, { x, y: 2.05, w: 2.85, h: 0.4, fontSize: 16, color: C.WHITE, bold: true, align: "center", margin: 0 });
      s.addText("for", { x, y: 2.48, w: 2.85, h: 0.22, fontSize: 9, color: "7799CC", align: "center", margin: 0 });
      s.addText(a.for, { x, y: 2.7, w: 2.85, h: 0.35, fontSize: 12, color: isSongdew ? "CCFFCC" : C.SLATE, bold: true, align: "center", margin: 0 });
      s.addShape("line", { x: x + 0.5, y: 3.12, w: 1.85, h: 0, line: { color: isSongdew ? "FFFFFF" : "243058", width: 1 } });
      s.addText(a.what, { x: x + 0.12, y: 3.22, w: 2.6, h: 0.82, fontSize: 9.5, color: isSongdew ? "DDEEFF" : C.SLATE, align: "center", margin: 0 });
    });

    s.addText("The EPK Module is the first step toward splitting the platform into two purpose-built experiences: one for the working artist, one for the industry professional discovering them.", {
      x: 0.5, y: 4.9, w: 9, h: 0.55,
      fontSize: 10.5, color: C.SLATE, align: "center", margin: 0, italic: true
    });
  }

  // ════════════════════════════════════════════════════════════
  // SLIDE 4 — PRODUCT SPLIT STRATEGY
  // ════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    lightSlide(s);
    sectionLabel(s, "Core Strategy");
    slideTitle(s, "Platform Split: Two Distinct Experiences");
    subtitle(s, "Inspired by Instagram (creator) / Facebook (social discovery) model");

    // Left: Artist Mode
    card(s, 0.4, 1.55, 4.3, 3.65, "EEF4FF", C.BLUE);
    s.addImage({ data: icons.layer, x: 0.55, y: 1.7, w: 0.42, h: 0.42 });
    s.addText("ARTIST MODE", { x: 1.05, y: 1.75, w: 3.5, h: 0.32, fontSize: 13, color: C.NAVY, bold: true, margin: 0 });
    s.addText("songdew.com/dashboard", { x: 1.05, y: 2.1, w: 3.5, h: 0.22, fontSize: 9, color: C.BLUE, margin: 0 });
    const artistFeats = [
      "EPK Builder + Edit Mode",
      "Release & Distribution tools",
      "Analytics & Finance dashboard",
      "Promotion tools & Opportunities",
      "Profile Strength gamification",
      "Section Visibility Management",
    ];
    artistFeats.forEach((f, i) => {
      s.addImage({ data: icons.check, x: 0.6, y: 2.45 + i * 0.38, w: 0.22, h: 0.22 });
      s.addText(f, { x: 0.9, y: 2.45 + i * 0.38, w: 3.65, h: 0.26, fontSize: 11, color: C.DKGRAY, margin: 0 });
    });
    s.addText("Primary: Independent Artists", { x: 0.55, y: 4.9, w: 4.0, h: 0.22, fontSize: 9, color: C.BLUE, bold: true, margin: 0 });

    // Arrow
    s.addShape("rect", { x: 4.82, y: 3.1, w: 0.36, h: 0.4, fill: { color: C.BLUE } });
    s.addText("VS", { x: 4.82, y: 3.1, w: 0.36, h: 0.4, fontSize: 10, color: C.WHITE, bold: true, align: "center", valign: "middle", margin: 0 });

    // Right: Discovery Mode
    card(s, 5.3, 1.55, 4.3, 3.65, "F0FFF4", C.GREEN);
    s.addImage({ data: icons.search, x: 5.45, y: 1.7, w: 0.42, h: 0.42 });
    s.addText("DISCOVERY MODE", { x: 5.95, y: 1.75, w: 3.5, h: 0.32, fontSize: 13, color: C.NAVY, bold: true, margin: 0 });
    s.addText("songdew.com/discover", { x: 5.95, y: 2.1, w: 3.5, h: 0.22, fontSize: 9, color: "22C55E", margin: 0 });
    const discoverFeats = [
      "Artist profile (EPK view — read-only)",
      "Curated genre & mood playlists",
      "Songdew TV + editorial picks",
      "Artist search + filter by genre/city",
      "Follow artists + get updates",
      "Direct booking / enquiry CTA",
    ];
    discoverFeats.forEach((f, i) => {
      s.addImage({ data: icons.check, x: 5.5, y: 2.45 + i * 0.38, w: 0.22, h: 0.22 });
      s.addText(f, { x: 5.8, y: 2.45 + i * 0.38, w: 3.65, h: 0.26, fontSize: 11, color: C.DKGRAY, margin: 0 });
    });
    s.addText("Primary: Fans, Labels, Curators, Brands", { x: 5.45, y: 4.9, w: 4.0, h: 0.22, fontSize: 9, color: "22C55E", bold: true, margin: 0 });
  }

  // ════════════════════════════════════════════════════════════
  // SLIDE 5 — PROJECT PHASES OVERVIEW
  // ════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    lightSlide(s);
    sectionLabel(s, "Project Overview");
    slideTitle(s, "EPK Module — 6 Phases to Launch");
    subtitle(s, "Total duration: ~5.5 weeks | Modern tooling + AI-assisted research compresses timelines");

    const phases = [
      { num: "01", name: "Market Research", dur: "2 days", color: "6366F1", desc: "Competitive landscape, India music tech trends" },
      { num: "02", name: "User Personas", dur: "1 day",  color: C.BLUE,  desc: "Artist, Curator, Brand Manager, Fan profiles" },
      { num: "03", name: "Feature Mapping", dur: "2 days", color: "0EA5E9", desc: "EPK sections, split architecture, priority matrix" },
      { num: "04", name: "UX / UI Design", dur: "1 week", color: "8B5CF6", desc: "Wireframes, hi-fi mockups, design system" },
      { num: "05", name: "Development", dur: "2.5 weeks", color: "059669", desc: "Next.js, React Context, all 14 features" },
      { num: "06", name: "QA + Launch", dur: "3 days", color: C.AMBER,  desc: "Testing, stakeholder review, Songdew Pro bundle" },
    ];

    // Timeline bar
    const barY = 1.72;
    s.addShape("rect", { x: 0.5, y: barY + 0.14, w: 9.0, h: 0.05, fill: { color: "DDE3EA" } });

    phases.forEach((p, i) => {
      const x = 0.5 + i * 1.52;
      // Dot on timeline
      s.addShape("oval", { x: x + 0.55, y: barY + 0.07, w: 0.18, h: 0.18, fill: { color: p.color } });
      // Phase card
      s.addShape("rect", { x, y: barY + 0.4, w: 1.42, h: 2.85,
        fill: { color: C.CARD }, shadow: sh()
      });
      s.addShape("rect", { x, y: barY + 0.4, w: 1.42, h: 0.38, fill: { color: p.color } });
      s.addText(p.num, { x, y: barY + 0.4, w: 1.42, h: 0.38, fontSize: 16, color: C.WHITE, bold: true, align: "center", valign: "middle", margin: 0 });
      s.addText(p.name, { x: x + 0.06, y: barY + 0.85, w: 1.3, h: 0.52, fontSize: 10, bold: true, color: C.NAVY, margin: 0 });
      s.addShape("rect", { x: x + 0.22, y: barY + 1.44, w: 0.98, h: 0.28, fill: { color: p.color + "22" } });
      s.addText(p.dur, { x: x + 0.22, y: barY + 1.44, w: 0.98, h: 0.28, fontSize: 9.5, color: p.color, bold: true, align: "center", valign: "middle", margin: 0 });
      s.addText(p.desc, { x: x + 0.06, y: barY + 1.82, w: 1.3, h: 0.9, fontSize: 8.5, color: C.GRAY, margin: 0 });
    });

    // Total duration chip
    s.addShape("rect", { x: 3.5, y: 5.08, w: 3.0, h: 0.36, fill: { color: C.NAVY } });
    s.addText("⏱  Total: ~5.5 Weeks  |  EPK v1.0 Launch Ready", {
      x: 3.5, y: 5.08, w: 3.0, h: 0.36,
      fontSize: 9.5, color: C.WHITE, bold: true, align: "center", valign: "middle", margin: 0
    });
  }

  // ════════════════════════════════════════════════════════════
  // SLIDE 6 — MARKET RESEARCH + COMPETITOR ANALYSIS
  // ════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    lightSlide(s);
    sectionLabel(s, "Phase 01 · Market Research");
    slideTitle(s, "Competitive Landscape & Market Opportunity");
    subtitle(s, "Duration: 2 days  |  Method: Desk research + AI-assisted synthesis");

    // Market stat callouts
    const stats = [
      { n: "70K+", l: "Artists on\nSongdew today" },
      { n: "5+", l: "Platforms\neach artist manages" },
      { n: "60 sec", l: "Curator avg.\neval time target" },
      { n: "0", l: "Unified EPK\ntools in India" },
    ];
    stats.forEach((st, i) => {
      const x = 0.4 + i * 2.32;
      s.addShape("rect", { x, y: 1.55, w: 2.1, h: 1.05, fill: { color: "EEF4FF" }, shadow: sh() });
      s.addText(st.n, { x, y: 1.62, w: 2.1, h: 0.48, fontSize: 28, color: C.BLUE, bold: true, align: "center", margin: 0 });
      s.addText(st.l, { x, y: 2.1, w: 2.1, h: 0.44, fontSize: 8.5, color: C.GRAY, align: "center", margin: 0 });
    });

    // Competitor table
    s.addText("Competitor Landscape", { x: 0.4, y: 2.78, w: 5, h: 0.28, fontSize: 12, bold: true, color: C.NAVY, margin: 0 });

    const compCols = [0.4, 1.75, 3.05, 4.05, 5.05];
    const compColW = [1.28, 1.28, 0.95, 0.95, 3.3];
    const headers = ["Platform", "Type", "EPK?", "India?", "Gap Identified"];
    headers.forEach((h, i) => {
      s.addShape("rect", { x: compCols[i], y: 3.1, w: compColW[i], h: 0.3, fill: { color: C.NAVY } });
      s.addText(h, { x: compCols[i], y: 3.1, w: compColW[i], h: 0.3, fontSize: 8.5, color: C.WHITE, bold: true, align: "center", valign: "middle", margin: 0 });
    });

    const comps = [
      ["Linktree",         "Link aggregator", "No",  "Yes", "No media, no credibility, no booking flow"],
      ["Spotify for Artists","Analytics tool", "No",  "Yes", "No EPK, no press, no industry targeting"],
      ["Bandcamp",          "Music store",    "No",  "No",  "Commerce-first; lacks identity tools"],
      ["SoundBetter",       "Marketplace",    "No",  "No",  "Services marketplace, not an EPK"],
      ["Sonicbids",         "EPK tool",       "Yes", "No",  "US-focused, expensive, outdated UX"],
      ["Songdew EPK",       "Full MBA suite", "Yes", "Yes", "✓ Fills all gaps — our opportunity"],
    ];
    comps.forEach((row, ri) => {
      const isUs = ri === 5;
      const bg = isUs ? "EEF4FF" : ri % 2 === 0 ? C.CARD : "F9F9F9";
      row.forEach((cell, ci) => {
        s.addShape("rect", { x: compCols[ci], y: 3.42 + ri * 0.3, w: compColW[ci], h: 0.3, fill: { color: bg } });
        const isYes = cell === "Yes" || cell === "✓ Fills all gaps — our opportunity";
        const isNo = cell === "No";
        s.addText(cell, {
          x: compCols[ci], y: 3.42 + ri * 0.3, w: compColW[ci], h: 0.3,
          fontSize: ci === 4 ? 8 : 9, color: isUs && ci === 0 ? C.BLUE : isYes && ci < 4 ? "16A34A" : isNo && ci < 4 ? C.RED : C.DKGRAY,
          bold: isUs, align: ci === 4 ? "left" : "center", valign: "middle", margin: ci === 4 ? 4 : 0
        });
      });
    });

    // Deliverable
    s.addShape("rect", { x: 0.4, y: 5.24, w: 9.2, h: 0.27, fill: { color: "EEF4FF" } });
    s.addText("📋  Deliverable: 2-page Competitive Landscape Report + Opportunity Matrix (Day 2, EOD)", {
      x: 0.4, y: 5.24, w: 9.2, h: 0.27, fontSize: 9, color: C.BLUE, bold: true, valign: "middle", margin: 4
    });
  }

  // ════════════════════════════════════════════════════════════
  // SLIDE 7 — USER PERSONAS
  // ════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    lightSlide(s);
    sectionLabel(s, "Phase 02 · User Personas");
    slideTitle(s, "4 Core User Personas — Built in 1 Day");
    subtitle(s, "Modern research: 2-3 user interviews + pattern-matching from existing Songdew user data");

    const personas = [
      {
        name: "The Independent Artist",
        tag: "PRIMARY",
        role: "Singer / Producer / Band",
        pain: "Manages 5+ platforms, no unified professional presence",
        need: "One link that does everything: music, press, booking, story",
        quote: '"I want to send one link and be taken seriously."',
        color: C.BLUE,
        ci: C.LGRAY
      },
      {
        name: "The Festival Curator",
        tag: "SECONDARY",
        role: "A&R / Talent Scout",
        pain: "Spends hours vetting artists across low-fidelity links",
        need: "Evaluate stage history, press, and music in under 60 seconds",
        quote: '"Show me stage experience and I\'ll book."',
        color: "7C3AED",
        ci: "F5F3FF"
      },
      {
        name: "The Brand Manager",
        tag: "TERTIARY",
        role: "Marketing / Collab Lead",
        pain: "No easy way to assess cultural fit or collaboration potential",
        need: "See social reach, press, and professional enquiry type",
        quote: '"Does this artist match our brand?"',
        color: "059669",
        ci: "ECFDF5"
      },
      {
        name: "The Music Fan",
        tag: "FUTURE",
        role: "Listener / Follower",
        pain: "Discovers good music but can't follow artist journeys",
        need: "Discovery feed, follow artist, listen to new releases",
        quote: '"I want to follow them like I follow on Instagram."',
        color: C.AMBER,
        ci: "FFFBEB"
      },
    ];

    personas.forEach((p, i) => {
      const col = i < 2 ? 0 : 1;
      const row = i % 2;
      const x = 0.4 + col * 4.65;
      const y = 1.55 + row * 2.0;
      s.addShape("rect", { x, y, w: 4.45, h: 1.88, fill: { color: p.ci }, shadow: sh() });
      s.addShape("rect", { x, y, w: 4.45, h: 0.32, fill: { color: p.color } });
      s.addText(p.tag, { x: x + 0.1, y: y, w: 1.2, h: 0.32, fontSize: 8, color: C.WHITE, bold: true, valign: "middle", margin: 0 });
      s.addText(p.name, { x, y: y + 0.38, w: 4.4, h: 0.3, fontSize: 12, bold: true, color: C.NAVY, margin: 4 });
      s.addText(p.role, { x, y: y + 0.68, w: 4.4, h: 0.22, fontSize: 9, color: p.color, bold: true, margin: 4 });
      s.addText("Pain: " + p.pain, { x, y: y + 0.92, w: 4.4, h: 0.32, fontSize: 9, color: C.DKGRAY, margin: 4 });
      s.addText("Need: " + p.need, { x, y: y + 1.24, w: 4.4, h: 0.32, fontSize: 9, color: C.DKGRAY, margin: 4 });
      s.addText(p.quote, { x, y: y + 1.57, w: 4.4, h: 0.26, fontSize: 8.5, color: p.color, italic: true, margin: 4 });
    });

    s.addShape("rect", { x: 0.4, y: 5.24, w: 9.2, h: 0.27, fill: { color: "EEF4FF" } });
    s.addText("📋  Deliverable: Persona Canvas Document (4 profiles, 1 page each) + Jobs-to-be-Done map — EOD Day 3", {
      x: 0.4, y: 5.24, w: 9.2, h: 0.27, fontSize: 9, color: C.BLUE, bold: true, valign: "middle", margin: 4
    });
  }

  // ════════════════════════════════════════════════════════════
  // SLIDE 8 — FEATURE LISTING + PRIORITY MATRIX
  // ════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    lightSlide(s);
    sectionLabel(s, "Phase 03 · Feature Mapping");
    slideTitle(s, "Feature Listing & Priority Matrix");
    subtitle(s, "Duration: 2 days  |  Output: Scoped feature set with P0/P1/P2 labels");

    const features = [
      ["F-01", "Dual-Mode Interface (Edit vs View)",          "P0", C.RED,    "Launch blocker"],
      ["F-02", "Single-Page Portfolio Layout (View Mode)",    "P0", C.RED,    "Launch blocker"],
      ["F-03", "Artist Hero Header (Banner + Avatar)",        "P0", C.RED,    "Launch blocker"],
      ["F-04", "Social Links Row + Edit Modal",               "P0", C.RED,    "Launch blocker"],
      ["F-05", "Section Visibility Toggle (Hide/Unhide)",     "P0", C.RED,    "Launch blocker"],
      ["F-06", "Music Section (Discography + Tracks)",        "P0", C.RED,    "Launch blocker"],
      ["F-07", "Gallery (Videos + Photos)",                   "P0", C.RED,    "Launch blocker"],
      ["F-08", "Contact Info Grid + Edit Modal",              "P0", C.RED,    "Launch blocker"],
      ["F-09", "Dynamic Profile Strength Sidebar",            "P1", C.BLUE,   "Should have"],
      ["F-10", "Live Performances Timeline",                  "P1", C.BLUE,   "Should have"],
      ["F-11", "In Press Section",                            "P1", C.BLUE,   "Should have"],
      ["F-12", "Business Enquiries Section",                  "P1", C.BLUE,   "Should have"],
      ["F-13", "Downloadable EPK Assets",                     "P1", C.BLUE,   "Should have"],
      ["F-14", "Manage Sections Modal (Bulk Visibility)",     "P1", C.BLUE,   "Should have"],
    ];

    const colXs = [0.4, 1.22, 6.55, 7.35, 8.38];
    const colWs = [0.78, 5.28, 0.75, 0.98, 1.22];
    const heads = ["ID", "Feature", "P.", "Status", "Category"];
    heads.forEach((h, i) => {
      s.addShape("rect", { x: colXs[i], y: 1.6, w: colWs[i], h: 0.3, fill: { color: C.NAVY } });
      s.addText(h, { x: colXs[i], y: 1.6, w: colWs[i], h: 0.3, fontSize: 8.5, color: C.WHITE, bold: true, align: "center", valign: "middle", margin: 0 });
    });

    features.forEach((row, ri) => {
      const bg = ri % 2 === 0 ? C.CARD : "F9F9F9";
      const ry = 1.92 + ri * 0.23;
      [0, 1, 2, 3, 4].forEach((ci) => {
        s.addShape("rect", { x: colXs[ci], y: ry, w: colWs[ci], h: 0.23, fill: { color: bg } });
        s.addText(row[ci === 2 ? 2 : ci === 3 ? 3 : ci === 4 ? 4 : ci], {
          x: colXs[ci], y: ry, w: colWs[ci], h: 0.23,
          fontSize: ci === 1 ? 8.5 : 8, color: ci === 2 ? row[3] : C.DKGRAY,
          bold: ci === 2, align: ci === 1 ? "left" : "center", valign: "middle", margin: ci === 1 ? 4 : 0
        });
      });
    });

    s.addShape("rect", { x: 0.4, y: 5.24, w: 9.2, h: 0.27, fill: { color: "EEF4FF" } });
    s.addText("📋  Deliverable: Feature Registry + MoSCoW Priority Table + Scope Agreement Sign-off — EOD Day 5", {
      x: 0.4, y: 5.24, w: 9.2, h: 0.27, fontSize: 9, color: C.BLUE, bold: true, valign: "middle", margin: 4
    });
  }

  // ════════════════════════════════════════════════════════════
  // SLIDE 9 — UI/UX DESIGN PLAN
  // ════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    lightSlide(s);
    sectionLabel(s, "Phase 04 · UI / UX Design");
    slideTitle(s, "Design Sprint — 1 Week");
    subtitle(s, "Output: Wireframes → Hi-Fi Mockups → Dev Handoff (Figma)");

    const days = [
      { day: "Day 1", task: "Wireframes", items: ["Artist Hero + banner layout", "Tab navigation structure", "Single-page scroll wireframe", "Edit Mode overlay concepts"] },
      { day: "Day 2", task: "Design System", items: ["Outfit / Poppins typography", "#007BFF / #222222 palette", "Neumorphic card system", "Icon set (Lucide React)"] },
      { day: "Day 3", task: "Hi-Fi: Artist Mode", items: ["Hero header component", "Section cards (Music, Gallery)", "Edit modals + FileUpload UI", "Profile Strength sidebar"] },
      { day: "Day 4", task: "Hi-Fi: View Mode", items: ["Public EPK scroll layout", "Contact grid (3-col)", "Business Enquiries section", "Mobile responsive breakpoints"] },
      { day: "Day 5", task: "Dev Handoff", items: ["Figma component library", "CSS variables export", "Redline measurements", "Prototype + stakeholder review"] },
    ];

    days.forEach((d, i) => {
      const x = 0.4 + i * 1.84;
      s.addShape("rect", { x, y: 1.55, w: 1.72, h: 3.55, fill: { color: C.CARD }, shadow: sh() });
      s.addShape("rect", { x, y: 1.55, w: 1.72, h: 0.42, fill: { color: C.BLUE } });
      s.addText(d.day, { x, y: 1.55, w: 1.72, h: 0.42, fontSize: 10, color: C.WHITE, bold: true, align: "center", valign: "middle", margin: 0 });
      s.addText(d.task, { x: x + 0.06, y: 2.03, w: 1.6, h: 0.34, fontSize: 10, color: C.NAVY, bold: true, margin: 0 });
      d.items.forEach((item, ii) => {
        s.addShape("oval", { x: x + 0.1, y: 2.46 + ii * 0.52, w: 0.08, h: 0.08, fill: { color: C.BLUE } });
        s.addText(item, { x: x + 0.24, y: 2.43 + ii * 0.52, w: 1.4, h: 0.44, fontSize: 8.5, color: C.DKGRAY, margin: 0 });
      });
    });

    // Design principles strip
    const principles = ["Behance-like portfolio", "Spotify music visuals", "Dribbble polish", "Songdew brand #007BFF"];
    s.addShape("rect", { x: 0.4, y: 5.22, w: 9.2, h: 0.3, fill: { color: C.NAVY } });
    s.addText("Design References:  " + principles.join("   ·   "), {
      x: 0.4, y: 5.22, w: 9.2, h: 0.3, fontSize: 9, color: C.SLATE, align: "center", valign: "middle", margin: 0
    });
  }

  // ════════════════════════════════════════════════════════════
  // SLIDE 10 — DEVELOPMENT TIMELINE
  // ════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    lightSlide(s);
    sectionLabel(s, "Phase 05 · Development");
    slideTitle(s, "Development Sprints — 2.5 Weeks");
    subtitle(s, "Next.js 16 + React Context + Framer Motion + Tailwind CSS v4 + Vitest");

    // Sprint breakdown
    const sprints = [
      {
        label: "Sprint 1 · Days 1–5",
        color: "6366F1",
        items: [
          "ArtistContext + state management",
          "Navbar Edit/View toggle",
          "Hero Header (Banner + Avatar)",
          "Social Links row + modals",
          "Tabs navigation component",
        ]
      },
      {
        label: "Sprint 2 · Days 6–10",
        color: C.BLUE,
        items: [
          "Story Section + bio editor",
          "Music Section (tracks + releases)",
          "Gallery (videos + photos)",
          "Section Visibility toggle system",
          "Manage Sections modal",
        ]
      },
      {
        label: "Sprint 3 · Days 11–12",
        color: "059669",
        items: [
          "Achievements, Press, Assets",
          "Business Enquiries section",
          "Sidebar + contact edit modal",
          "Profile Strength gamification",
          "Back-to-top + toast system",
        ]
      },
    ];

    sprints.forEach((sp, i) => {
      const x = 0.4 + i * 3.08;
      s.addShape("rect", { x, y: 1.55, w: 2.9, h: 3.38, fill: { color: C.CARD }, shadow: sh() });
      s.addShape("rect", { x, y: 1.55, w: 2.9, h: 0.38, fill: { color: sp.color } });
      s.addText(sp.label, { x, y: 1.55, w: 2.9, h: 0.38, fontSize: 9.5, color: C.WHITE, bold: true, align: "center", valign: "middle", margin: 0 });
      sp.items.forEach((it, ii) => {
        s.addImage({ data: icons.check, x: x + 0.12, y: 2.06 + ii * 0.55, w: 0.22, h: 0.22 });
        s.addText(it, { x: x + 0.42, y: 2.06 + ii * 0.55, w: 2.42, h: 0.42, fontSize: 9.5, color: C.DKGRAY, margin: 0 });
      });
    });

    // Testing strip
    s.addShape("rect", { x: 0.4, y: 5.05, w: 9.2, h: 0.48, fill: { color: "ECFDF5" }, shadow: sh() });
    s.addText("Testing (throughout): Vitest + @testing-library/react  |  Unit tests for Context  |  Component tests for Edit Mode  |  Lighthouse ≥ 90 performance", {
      x: 0.52, y: 5.05, w: 9.0, h: 0.48, fontSize: 9, color: "059669", valign: "middle", margin: 0
    });
  }

  // ════════════════════════════════════════════════════════════
  // SLIDE 11 — MASTER GANTT-STYLE TIMELINE
  // ════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    lightSlide(s);
    sectionLabel(s, "Full Timeline");
    slideTitle(s, "Day-by-Day Master Timeline");
    subtitle(s, "EPK Module — 27 working days  ·  Week 1–5.5");

    const rows = [
      { task: "Market Research",          start: 0, dur: 2,  color: "6366F1", phase: "Research" },
      { task: "Competitor Analysis",      start: 0, dur: 2,  color: "6366F1", phase: "Research" },
      { task: "User Personas (4)",        start: 2, dur: 1,  color: C.BLUE,   phase: "Research" },
      { task: "Feature Listing",          start: 3, dur: 1,  color: C.BLUE,   phase: "Strategy" },
      { task: "Priority Matrix",          start: 4, dur: 1,  color: C.BLUE,   phase: "Strategy" },
      { task: "Wireframes",               start: 5, dur: 1,  color: "8B5CF6", phase: "Design" },
      { task: "Design System",            start: 6, dur: 1,  color: "8B5CF6", phase: "Design" },
      { task: "Hi-Fi Mockups",            start: 7, dur: 2,  color: "8B5CF6", phase: "Design" },
      { task: "Dev Handoff",              start: 9, dur: 1,  color: "8B5CF6", phase: "Design" },
      { task: "Sprint 1 — Core",          start: 10, dur: 5, color: "059669", phase: "Dev" },
      { task: "Sprint 2 — Sections",      start: 15, dur: 5, color: "059669", phase: "Dev" },
      { task: "Sprint 3 — Polish",        start: 20, dur: 2, color: "059669", phase: "Dev" },
      { task: "QA + Bugfix",              start: 22, dur: 2, color: C.AMBER,  phase: "QA" },
      { task: "Stakeholder Review",       start: 24, dur: 1, color: C.AMBER,  phase: "QA" },
      { task: "Soft Launch (Songdew Pro)",start: 25, dur: 2, color: C.RED,    phase: "Launch" },
    ];

    const TOTAL = 27;
    const gLeft = 2.55;
    const gRight = 9.6;
    const gW = gRight - gLeft;
    const cellW = gW / TOTAL;
    const rowH = 0.265;
    const startY = 1.55;

    // Phase labels column headers
    for (let d = 0; d < TOTAL; d += 5) {
      s.addText(`W${Math.ceil((d + 1) / 5)}`, {
        x: gLeft + d * cellW, y: 1.35, w: 5 * cellW, h: 0.18,
        fontSize: 7.5, color: C.SLATE, align: "center", bold: true, margin: 0
      });
    }
    // Day ticks
    for (let d = 0; d <= TOTAL; d += 5) {
      s.addShape("line", {
        x: gLeft + d * cellW, y: startY - 0.02, w: 0, h: rows.length * rowH + 0.04,
        line: { color: "DDE3EA", width: 0.5, dashType: "sysDash" }
      });
    }

    rows.forEach((r, ri) => {
      const y = startY + ri * rowH;
      // Row bg alternating
      s.addShape("rect", { x: 0.4, y, w: 9.2, h: rowH - 0.02, fill: { color: ri % 2 === 0 ? C.CARD : "F9F9F9" } });
      // Task name
      s.addText(r.task, { x: 0.45, y, w: 2.05, h: rowH - 0.02, fontSize: 8.5, color: C.DKGRAY, valign: "middle", margin: 2 });
      // Gantt bar
      const bx = gLeft + r.start * cellW;
      const bw = r.dur * cellW;
      s.addShape("rect", { x: bx, y: y + 0.04, w: bw, h: rowH - 0.1, fill: { color: r.color } });
    });

    // Legend
    const legItems = [
      { c: "6366F1", l: "Research" },
      { c: C.BLUE, l: "Strategy" },
      { c: "8B5CF6", l: "Design" },
      { c: "059669", l: "Development" },
      { c: C.AMBER, l: "QA & Review" },
      { c: C.RED, l: "Launch" },
    ];
    legItems.forEach((li, i) => {
      s.addShape("rect", { x: 0.4 + i * 1.52, y: 5.3, w: 0.18, h: 0.18, fill: { color: li.c } });
      s.addText(li.l, { x: 0.62 + i * 1.52, y: 5.3, w: 1.28, h: 0.18, fontSize: 8, color: C.DKGRAY, valign: "middle", margin: 0 });
    });
  }

  // ════════════════════════════════════════════════════════════
  // SLIDE 12 — REALISTIC TIMELINE TABLE (DETAILED)
  // ════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    lightSlide(s);
    sectionLabel(s, "Timeline Detail");
    slideTitle(s, "Why These Timelines Are Realistic");
    subtitle(s, "AI-assisted research, modern frameworks, and pre-built components change the game");

    const rows2 = [
      ["Market Research",      "2 days",  "Traditional: 5–7 days", "AI synthesis tools (Perplexity, Gemini) cut research from days to hours. Focus on insight extraction, not raw data collection."],
      ["Competitor Analysis",  "1 day",   "Traditional: 3–5 days", "AI can scrape + summarise 10 competitors in a morning. Rest of day: insight framework + matrix."],
      ["User Personas",        "1 day",   "Traditional: 3–5 days", "2–3 quick user calls + pattern-match against existing Songdew artist data. No need for lengthy research sprint."],
      ["Feature Listing",      "1 day",   "Traditional: 2–3 days", "Product requirements already informed by research + persona phase. Feature registry is a structuring task, not discovery."],
      ["UX Wireframes",        "1 day",   "Traditional: 3–4 days", "Low-fi sketches + Figma rapid wireframing. Existing design system reduces decisions from scratch."],
      ["Hi-Fi Design",         "3 days",  "Traditional: 1–2 weeks", "Songdew design system (colors, fonts, shadows) is pre-defined. Component-based design = faster execution."],
      ["Development (per feat)","0.5–1 day","Traditional: 2–3 days", "Next.js App Router + Tailwind CSS + React Context + Lucide icons = pre-solved infrastructure. Focus is feature logic."],
      ["Unit Testing",         "Ongoing", "Traditional: 2–3 days", "Vitest + Testing Library makes TDD fast. Tests written alongside features, not as a separate phase."],
      ["QA + Review",          "2–3 days","Traditional: 1 week",   "Lighthouse automated audits. Manual QA on 3 breakpoints. Stakeholder review on pre-built prototype."],
    ];

    const cxs = [0.4, 1.75, 3.02, 4.42, 5.72];
    const cws = [1.3, 1.22, 1.35, 1.25, 4.15];
    const hds = ["Task", "Our Timeline", "Old Estimate", "Why Shorter"];
    hds.forEach((h, i) => {
      s.addShape("rect", { x: cxs[i], y: 1.6, w: cws[i], h: 0.3, fill: { color: C.NAVY } });
      s.addText(h, { x: cxs[i], y: 1.6, w: cws[i], h: 0.3, fontSize: 8.5, color: C.WHITE, bold: true, align: "center", valign: "middle", margin: 0 });
    });

    rows2.forEach((row, ri) => {
      const bg = ri % 2 === 0 ? C.CARD : "F9F9F9";
      const ry = 1.92 + ri * 0.34;
      row.forEach((cell, ci) => {
        s.addShape("rect", { x: cxs[ci], y: ry, w: cws[ci], h: 0.34, fill: { color: ci === 1 ? "EEF4FF" : bg } });
        s.addText(cell, {
          x: cxs[ci], y: ry, w: cws[ci], h: 0.34,
          fontSize: ci === 3 ? 7.8 : 8.5,
          color: ci === 1 ? C.BLUE : ci === 2 ? C.GRAY : C.DKGRAY,
          bold: ci === 1,
          align: ci < 3 ? "center" : "left",
          valign: "middle", margin: ci < 3 ? 0 : 3
        });
      });
    });

    s.addShape("rect", { x: 0.4, y: 5.24, w: 9.2, h: 0.27, fill: { color: "EEF4FF" } });
    s.addText("Tools: Perplexity / Gemini (research)  ·  Figma + FigJam (design)  ·  Claude Code (dev)  ·  Vitest (testing)  ·  Vercel (deploy)", {
      x: 0.4, y: 5.24, w: 9.2, h: 0.27, fontSize: 8.5, color: C.BLUE, bold: true, valign: "middle", margin: 4, align: "center"
    });
  }

  // ════════════════════════════════════════════════════════════
  // SLIDE 13 — SUCCESS METRICS
  // ════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    lightSlide(s);
    sectionLabel(s, "Success Metrics");
    slideTitle(s, "How We Measure Success — OKRs");
    subtitle(s, "3 objectives tied to discovery, engagement, and conversion");

    const okrs = [
      {
        obj: "O1: Drive Profile Completion",
        color: "6366F1",
        krs: [
          ["60%+ artists reach 'Discovery Ready' (≥80% strength) within 48h of signup"],
          ["35% of active users reach 100% Profile Strength within 90 days"],
          ["55% of artists add ≥1 release in first session"],
        ]
      },
      {
        obj: "O2: Reduce Stakeholder Friction",
        color: C.BLUE,
        krs: [
          ["Avg. time-on-profile (curator segment) ≥ 90 seconds"],
          ["Curator survey: 50% reduction in vetting time vs. pre-EPK"],
          ["Bounce rate from profile pages (curator) < 40%"],
        ]
      },
      {
        obj: "O3: Drive Booking Conversions",
        color: "059669",
        krs: [
          ["'Business Enquiry' clicks ≥ 12 per 1,000 profile views"],
          ["EPK Asset downloads ≥ 8 per 1,000 profile views"],
          ["Booking enquiries via EPK: +30% MoM for 3 consecutive months"],
        ]
      },
    ];

    okrs.forEach((o, i) => {
      const x = 0.4 + i * 3.1;
      s.addShape("rect", { x, y: 1.55, w: 2.9, h: 3.55, fill: { color: C.CARD }, shadow: sh() });
      s.addShape("rect", { x, y: 1.55, w: 2.9, h: 0.42, fill: { color: o.color } });
      s.addText(o.obj, { x: x + 0.1, y: 1.55, w: 2.72, h: 0.42, fontSize: 10, color: C.WHITE, bold: true, valign: "middle", margin: 0 });
      o.krs.forEach((kr, ki) => {
        s.addShape("rect", { x: x + 0.12, y: 2.08 + ki * 1.0, w: 2.66, h: 0.88, fill: { color: o.color + "10" } });
        s.addShape("rect", { x: x + 0.12, y: 2.08 + ki * 1.0, w: 0.05, h: 0.88, fill: { color: o.color } });
        s.addText("KR " + (ki + 1), { x: x + 0.22, y: 2.1 + ki * 1.0, w: 2.46, h: 0.2, fontSize: 7.5, color: o.color, bold: true, margin: 0 });
        s.addText(kr[0], { x: x + 0.22, y: 2.3 + ki * 1.0, w: 2.46, h: 0.6, fontSize: 9, color: C.DKGRAY, margin: 0 });
      });
    });

    s.addShape("rect", { x: 0.4, y: 5.24, w: 9.2, h: 0.27, fill: { color: "EEF4FF" } });
    s.addText("North Star: % of artists reaching Discovery Ready status within 48 hours of EPK sign-up", {
      x: 0.4, y: 5.24, w: 9.2, h: 0.27, fontSize: 10, color: C.BLUE, bold: true, valign: "middle", margin: 4, align: "center"
    });
  }

  // ════════════════════════════════════════════════════════════
  // SLIDE 14 — RISKS & MITIGATIONS
  // ════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    lightSlide(s);
    sectionLabel(s, "Risks & Mitigations");
    slideTitle(s, "Known Risks — Planned Mitigations");

    const risks = [
      { risk: "Blob URL expiry on reload", sev: "Medium", phase: "Dev",    mitigation: "v1: Show re-upload prompt. v2: Migrate to S3/Cloudinary CDN upload on save action." },
      { risk: "localStorage 5MB cap exceeded for media-rich profiles", sev: "Medium", phase: "Dev", mitigation: "Optimise serialisation; defer large assets to API-backed persistence in v2." },
      { risk: "Hydration mismatch (Next.js + Framer Motion)", sev: "Low", phase: "Dev", mitigation: "suppressHydrationWarning already in layout.tsx. Monitor edge cases. Defer non-critical animations." },
      { risk: "Legacy artist data migration (no hiddenSections field)", sev: "Low", phase: "Dev", mitigation: "ArtistProvider already defaults hiddenSections to []. Backward-compatible. No migration needed." },
      { risk: "4K asset load time > 2s", sev: "High", phase: "Launch",  mitigation: "Lazy-load Assets section. next/image optimization. Show file size preview before download trigger." },
      { risk: "Design QA overrun (component alignment issues)", sev: "Low", phase: "Design", mitigation: "Framer Motion layout system handles most alignment. 1 dedicated QA day built into each sprint." },
      { risk: "Stakeholder review requiring major redesign", sev: "Medium", phase: "Review", mitigation: "Prototype shared at Day 10 (design complete) for early feedback. Iterate before development starts." },
    ];

    const sevColor = (s) => s === "High" ? C.RED : s === "Medium" ? C.AMBER : "22C55E";

    const cxs2 = [0.4, 3.45, 4.6, 5.5, 6.25];
    const cws2 = [3.0, 1.1, 0.85, 0.7, 3.42];
    const hds2 = ["Risk", "Phase", "Severity", "Impact", "Mitigation"];
    hds2.forEach((h, i) => {
      s.addShape("rect", { x: cxs2[i], y: 1.6, w: cws2[i], h: 0.3, fill: { color: C.NAVY } });
      s.addText(h, { x: cxs2[i], y: 1.6, w: cws2[i], h: 0.3, fontSize: 8.5, color: C.WHITE, bold: true, align: "center", valign: "middle", margin: 0 });
    });

    risks.forEach((r, ri) => {
      const bg = ri % 2 === 0 ? C.CARD : "F9F9F9";
      const ry = 1.92 + ri * 0.44;
      const cells = [r.risk, r.phase, r.sev, r.sev === "High" ? "H" : r.sev === "Medium" ? "M" : "L", r.mitigation];
      cells.forEach((cell, ci) => {
        s.addShape("rect", { x: cxs2[ci], y: ry, w: cws2[ci], h: 0.44, fill: { color: ci === 2 ? sevColor(r.sev) + "22" : bg } });
        s.addText(cell, {
          x: cxs2[ci], y: ry, w: cws2[ci], h: 0.44,
          fontSize: ci === 4 ? 8 : 9,
          color: ci === 2 || ci === 3 ? sevColor(r.sev) : C.DKGRAY,
          bold: ci === 2 || ci === 3,
          align: ci === 0 || ci === 4 ? "left" : "center",
          valign: "middle", margin: ci === 0 || ci === 4 ? 3 : 0
        });
      });
    });
  }

  // ════════════════════════════════════════════════════════════
  // SLIDE 15 — CLOSING / NEXT STEPS
  // ════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    darkSlide(s);

    s.addShape("rect", { x: 0, y: 0, w: 0.12, h: 5.625, fill: { color: C.BLUE } });

    s.addText("NEXT STEPS", { x: 0.35, y: 0.4, w: 9, h: 0.28, fontSize: 9, color: C.BLUE, bold: true, charSpacing: 3, margin: 0 });
    s.addText("Ready to Move. Here's What Happens Next.", {
      x: 0.35, y: 0.82, w: 7.5, h: 0.75,
      fontSize: 28, color: C.WHITE, bold: true, fontFace: "Calibri", margin: 0
    });

    const nexts = [
      { n: "1", t: "Approval",       d: "This deck + timeline shared with team lead for sign-off. Feedback incorporated within 1 day." },
      { n: "2", t: "Kickoff",        d: "Begin Market Research phase (Day 1). Set up project board in Notion/Jira with sprint structure." },
      { n: "3", t: "Weekly Sync",    d: "30-min weekly check-in to review progress, surface blockers, adjust timeline if needed." },
      { n: "4", t: "Day-10 Preview", d: "Design prototype demo with team + stakeholder feedback session before dev sprint begins." },
      { n: "5", t: "Soft Launch",    d: "EPK v1.0 bundled with Songdew Pro. Campaign: 'Your EPK is your Passport to the Stage.'" },
    ];

    nexts.forEach((nx, i) => {
      const x = 0.35 + (i % 3) * 3.12;
      const y = i < 3 ? 1.82 : 3.28;
      s.addShape("rect", { x, y, w: 2.95, h: 1.28, fill: { color: "121C35" }, shadow: sh() });
      s.addShape("rect", { x, y, w: 0.48, h: 1.28, fill: { color: C.BLUE } });
      s.addText(nx.n, { x, y, w: 0.48, h: 1.28, fontSize: 22, color: C.WHITE, bold: true, align: "center", valign: "middle", margin: 0 });
      s.addText(nx.t, { x: x + 0.55, y: y + 0.1, w: 2.3, h: 0.3, fontSize: 12, color: C.WHITE, bold: true, margin: 0 });
      s.addText(nx.d, { x: x + 0.55, y: y + 0.42, w: 2.3, h: 0.75, fontSize: 8.5, color: C.SLATE, margin: 0 });
    });

    s.addText("Prepared by  Dinesh  ·  PM Intern  ·  Songdew EPK Module  ·  June 2026", {
      x: 0, y: 5.35, w: 10, h: 0.22,
      fontSize: 8, color: C.SLATE, align: "center", margin: 0
    });
  }

  await pres.writeFile({ fileName: "/home/claude/Songdew_EPK_Strategy_Deck.pptx" });
  console.log("✅ PPTX done");
}

main().catch(e => { console.error(e); process.exit(1); });
