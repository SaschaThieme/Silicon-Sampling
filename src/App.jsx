import { useState, useEffect, useCallback, useRef } from "react";
import { User, Users, Baby, Building2, Users2, UserCheck } from "lucide-react";

const LOGO_B64 = "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";

const C = {
  blue: "#0082C8",
  blueDark: "#005f95",
  blueLight: "#d4e9f7",
  blueMid: "#a8d4ef",
  navy: "#0d1f35",
  navyMid: "#1a3550",
  pink: "#E5007D",
  pinkLight: "#fad0e8",
  text: "#0d1f35",
  textMid: "#2e4057",
  textLight: "#5a7191",
  border: "#9ab8d0",
  borderLight: "#c8dce9",
  bg: "#ffffff",
  bgSoft: "#eaf2f8",
  bgDark: "#0d1f35",
  green: "#16a34a",
  greenLight: "#f0fdf4",
  amber: "#d97706",
  amberLight: "#fffbeb",
};

const STEPS = ["Auftraggeber", "Thema", "Persona", "Gegenstand", "Fragebogen", "Simulation", "Ergebnisse"];


const AUFTRAGGEBER_BRANCHEN = [
  "Automobilindustrie", "Banken & Finanzdienstleistungen", "Beratung & Consulting",
  "Bildung & Forschung", "Chemie & Pharma", "E-Commerce & Onlinehandel",
  "Energie & Umwelt", "Gesundheit & Medizin", "Handel & Retail",
  "Immobilien & Bau", "IT & Software", "Konsumgüter & FMCG",
  "Logistik & Transport", "Maschinenbau & Industrie", "Medien & Werbung",
  "Möbel & Einrichtung", "Mode & Textil", "Öffentliche Verwaltung",
  "Telekommunikation", "Tourismus & Gastronomie", "Versicherungen",
  "Verbände & Genossenschaften", "Sonstige",
];

const KAUFVERHALTEN_OPTIONS_B2C = [
  { value: "Risikoavers & Markentreu", desc: "Setzt auf bewährte Marken, meidet Unsicherheit" },
  { value: "Qualitätsorientiert & Langfristig", desc: "Bevorzugt langlebige, hochwertige Produkte" },
  { value: "Preissensibel & Schnäppchenjäger", desc: "Vergleicht intensiv, sucht aktiv Angebote" },
  { value: "Impulsiv & Spontan", desc: "Kauft aus dem Bauch heraus, emotional getrieben" },
  { value: "Digital-First & Convenience", desc: "Kauft bevorzugt online, schätzt Bequemlichkeit" },
  { value: "Community-Getrieben & Social-Proof", desc: "Orientiert sich an Empfehlungen & Bewertungen" },
  { value: "Nachhaltigkeitsorientiert", desc: "Priorisiert ökologische & ethische Kaufkriterien" },
  { value: "Statusorientiert & Premium", desc: "Wählt Premiummarken als Qualitäts- & Statussignal" },
  { value: "Traditionell & Loyalitätsstark", desc: "Bleibt vertrauten Marken langfristig treu" },
  { value: "Recherchestark & Informationsgetrieben", desc: "Liest ausführlich Testberichte & Reviews" },
];

const KAUFVERHALTEN_OPTIONS_B2B = [
  { value: "Rationalorientiert & ROI-fokus", desc: "Entscheidet nach Nutzen-Kosten-Analyse" },
  { value: "Komiteentscheidung & mehrstufig", desc: "Kauf involviert mehrere Stakeholder & Freigaben" },
  { value: "Compliance-getrieben & risikoavers", desc: "Entscheidung stark durch Regelwerk & Richtlinien geprägt" },
  { value: "Beziehungsorientiert & netzwerkbasiert", desc: "Vertraut auf Empfehlungen aus dem Netzwerk" },
];

// Combined for legacy lookup (export, sysPrompt etc.)
const KAUFVERHALTEN_OPTIONS = [...KAUFVERHALTEN_OPTIONS_B2C, ...KAUFVERHALTEN_OPTIONS_B2B];

const WERTE_CLUSTER = [
  { id: "sicherheit", label: "Sicherheit & Stabilität", color: "#0082C8", bg: "#d4e9f7",
    werte: ["Sicherheit", "Stabilität", "Zuverlässigkeit", "Ordnung", "Disziplin", "Besonnenheit", "Kontinuität"] },
  { id: "leistung", label: "Leistung & Erfolg", color: "#7B3FA0", bg: "#ede0f5",
    werte: ["Erfolg", "Leistung", "Ehrgeiz", "Effizienz", "Exzellenz", "Professionalität", "Fokus"] },
  { id: "freiheit", label: "Freiheit & Selbstbestimmung", color: "#0891b2", bg: "#d0f0f9",
    werte: ["Freiheit", "Unabhängigkeit", "Selbstverwirklichung", "Spontanität", "Flexibilität", "Abenteuer", "Originalität"] },
  { id: "soziales", label: "Soziales & Gemeinschaft", color: "#16a34a", bg: "#dcf5e5",
    werte: ["Familie", "Freundschaft", "Solidarität", "Teamwork", "Hilfsbereitschaft", "Zugehörigkeit", "Loyalität"] },
  { id: "ethik", label: "Ethik & Integrität", color: "#b45309", bg: "#fef0cc",
    werte: ["Ehrlichkeit", "Integrität", "Gerechtigkeit", "Fairness", "Vertrauen", "Respekt", "Aufrichtigkeit", "Authentizität"] },
  { id: "genuss", label: "Genuss & Wohlbefinden", color: "#e5007d", bg: "#fad0e8",
    werte: ["Genuss", "Freude", "Glück", "Gesundheit", "Entspannung", "Humor", "Lebensqualität", "Erlebnis"] },
  { id: "wachstum", label: "Wachstum & Erkenntnis", color: "#0082C8", bg: "#d4e9f7",
    werte: ["Lernen", "Wissen", "Neugier", "Weisheit", "Wachstum", "Reflexion", "Klarheit"] },
  { id: "kreativitaet", label: "Kreativität & Innovation", color: "#7c3aed", bg: "#ede9fe",
    werte: ["Kreativität", "Innovation", "Phantasie", "Inspiration", "Erfindungsgabe", "Ausdrucksfähigkeit", "Schönheit"] },
  { id: "spiritualitaet", label: "Spiritualität & Sinn", color: "#78716c", bg: "#eeebe9",
    werte: ["Sinn", "Spiritualität", "Glaube", "Frieden", "Stille", "Tiefe", "Ehrfurcht"] },
  { id: "mut", label: "Mut & Resilienz", color: "#dc2626", bg: "#fde8e8",
    werte: ["Mut", "Tapferkeit", "Entschlossenheit", "Stärke", "Leidenschaft", "Widerstandsfähigkeit", "Überzeugung"] },
  { id: "status", label: "Status & Einfluss", color: "#92400e", bg: "#fef0cc",
    werte: ["Macht", "Führung", "Einfluss", "Anerkennung", "Reichtum", "Beliebtheit", "Erfolg"] },
  { id: "pragmatismus", label: "Pragmatismus & Wirtschaftlichkeit", color: "#059669", bg: "#d8f5eb",
    werte: ["Pragmatismus", "Sparsamkeit", "Nützlichkeit", "Wirtschaftlichkeit", "Value for Money", "Vernunft", "Zweckmäßigkeit"] },
];

const LEBENSSTIL_OPTIONS = [
  "Urban & Vernetzt", "Suburban & Familienorientiert", "Ländlich & Naturverbunden",
  "Sportlich & Aktiv", "Kulturinteressiert", "Reiseaffin & Weltgewandt",
  "Karrierefokussiert", "Digital & Social-Media-Affin", "Genuss & Kulinarik",
  "Handwerk & DIY", "Nachhaltiger Konsum", "Heimorientiert & Gemütlich",
  "Fitnessbegeistert", "Gaming & Tech-Affin", "Kreativ & Kunstbegeistert",
  "Bewusster Konsum / Minimalismus", "Ehrenamt & Gesellschaftliches Engagement",
];

const HAUSHALTSTYP_OPTIONS = [
  { value: "single", label: "Single", desc: "Lebt allein", Icon: User },
  { value: "paar", label: "Paar / Zusammenlebend", desc: "Ohne Kinder im Haushalt", Icon: Users },
  { value: "familie", label: "Familie mit Kindern", desc: "Kinder im gleichen Haushalt", Icon: Baby },
];

// ── B2B Constants ─────────────────────────────────────────────────────────────
const B2B_BRANCHEN = [
  "Maschinenbau & Industrie", "Automobilzulieferer", "Chemie & Pharma",
  "IT & Software", "Telekommunikation", "Finanzdienstleistungen & Versicherung",
  "Handel & Logistik", "Bau & Immobilien", "Energie & Umwelt",
  "Gesundheit & Medizintechnik", "Medien & Werbung", "Beratung & Dienstleistung",
  "Öffentliche Verwaltung", "Bildung & Forschung", "Sonstige",
];

const B2B_MITARBEITER = ["< 10 (Kleinunternehmen)", "10–49 (Kleines KMU)", "50–249 (Mittleres KMU)", "250–999 (Großes KMU)", "1.000+ (Konzern)"];
const B2B_UMSATZ = ["< 1 Mio. €", "1–10 Mio. €", "10–50 Mio. €", "50–250 Mio. €", "> 250 Mio. €"];

const B2B_STRATEGISCHE_AUSRICHTUNG = [
  { value: "innovationsfuehrer", label: "Innovationsführer", desc: "Technologie-Vorreiter, F&E-intensiv" },
  { value: "early_follower", label: "Early Follower", desc: "Übernimmt bewährte Innovationen früh" },
  { value: "kostenfuehrer", label: "Kostenführer", desc: "Effizienz & Preis als Wettbewerbsvorteil" },
  { value: "konservativ", label: "Konservativ", desc: "Bewährte Lösungen, hohe Stabilität" },
];

const B2B_BUYING_CENTER = ["Entscheider", "Beeinflusser", "Gatekeeper", "Einkäufer", "Nutzer", "Initiator"];
const B2B_HIERARCHIE = ["C-Level (CEO, CFO, CTO)", "Direktor / VP", "Abteilungsleiter", "Projektleiter / Manager", "Sachbearbeiter / Fachexperte"];
const B2B_BUDGET = ["< 10.000 €", "10.000–50.000 €", "50.000–250.000 €", "250.000–1 Mio. €", "> 1 Mio. €"];

const B2B_PREISORIENTIERUNG = ["Preis-sensitiv", "Value-for-Money", "Qualität über Preis", "Innovationsbereit (Premiumbudget)"];
const B2B_ANBIETERLOYALITAET = ["Sehr loyal (Langzeitverträge)", "Loyal mit Vergleichen", "Wechselbereit bei besserem Angebot", "Aktiv auf Suche nach Alternativen"];
const B2B_INFORMATIONSQUELLEN = ["Fachmessen & Kongresse", "Fachpresse & Whitepapers", "Peer-Empfehlungen & Netzwerk", "Online-Recherche & Reviews", "Vertriebskontakt direkt", "LinkedIn & Social Selling", "Analysten & Berater (Gartner etc.)"];
const B2B_ONLINE_AFFINITAET = ["Digital-first (Online-Kanäle bevorzugt)", "Hybrid (Online & Persönlich gemischt)", "Offline-präferiert (Persönliche Meetings)"];

const PERSONA_PRESETS_B2C = [
  {
    label: "Mittelständische Familie", alter: "35–54", einkommen: "60.000–120.000 €/Jahr",
    bildung: "Hochschulabschluss", region: "Deutschland (Suburban/Ländlich)",
    haushaltstyp: "familie",
    werte: ["Sicherheit", "Stabilität", "Familie", "Zuverlässigkeit", "Qualität"],
    lebensstil: ["Suburban & Familienorientiert", "Heimorientiert & Gemütlich"],
    kaufverhalten: ["Risikoavers & Markentreu"],
    bevoelkerung: "~8 Mio. HH",
  },
  {
    label: "Junger Mittelstand", alter: "25–38", einkommen: "35.000–70.000 €/Jahr",
    bildung: "Hochschulabschluss", region: "Mittelgroße Stadt / Speckgürtel",
    haushaltstyp: "paar",
    werte: ["Freiheit", "Selbstverwirklichung", "Wachstum", "Qualität", "Pragmatismus"],
    lebensstil: ["Karrierefokussiert", "Reiseaffin & Weltgewandt", "Digital & Social-Media-Affin"],
    kaufverhalten: ["Recherchestark & Informationsgetrieben"],
    bevoelkerung: "~5 Mio.",
  },
  {
    label: "Urban Millennial", alter: "25–38", einkommen: "30.000–65.000 €/Jahr",
    bildung: "Hochschulabschluss", region: "Großstadt (Berlin, München, Hamburg)",
    haushaltstyp: "single",
    werte: ["Freiheit", "Selbstverwirklichung", "Innovation", "Solidarität", "Originalität"],
    lebensstil: ["Urban & Vernetzt", "Digital & Social-Media-Affin", "Reiseaffin & Weltgewandt", "Nachhaltiger Konsum"],
    kaufverhalten: ["Community-Getrieben & Social-Proof", "Nachhaltigkeitsorientiert"],
    bevoelkerung: "~3,5 Mio.",
  },
  {
    label: "Gen X",
    alter: "44–59",
    bevoelkerung: "16,7 Mio.",
  },
  {
    label: "Gen Y / Millennial",
    alter: "28–43",
    bevoelkerung: "16,5 Mio.",
  },
  {
    label: "Gen Z",
    alter: "18–27",
    bevoelkerung: "12,0 Mio.",
  },
];

const PERSONA_PRESETS_B2B = [
  {
    label: "IT-Einkäufer Mittelstand", type: "b2b",
    branche: "IT & Software", mitarbeiter: "50–249 (Mittleres KMU)", umsatz: "10–50 Mio. €",
    region: "DACH-Region", strategischeAusrichtung: "early_follower",
    buyingCenterRolle: ["Einkäufer", "Beeinflusser"],
    hierarchie: "Abteilungsleiter",
    budget: "50.000–250.000 €",
    preisorientierung: "Value-for-Money",
    anbieterloyalitaet: "Loyal mit Vergleichen",
    informationsquellen: ["Online-Recherche & Reviews", "Peer-Empfehlungen & Netzwerk"],
    onlineAffinitaet: "Hybrid (Online & Persönlich gemischt)",
  },
  {
    label: "C-Level Industrie", type: "b2b",
    branche: "Maschinenbau & Industrie", mitarbeiter: "250–999 (Großes KMU)", umsatz: "50–250 Mio. €",
    region: "Deutschland (Bayern/BW)", strategischeAusrichtung: "innovationsfuehrer",
    buyingCenterRolle: ["Entscheider"],
    hierarchie: "C-Level (CEO, CFO, CTO)",
    budget: "> 1 Mio. €",
    preisorientierung: "Qualität über Preis",
    anbieterloyalitaet: "Sehr loyal (Langzeitverträge)",
    informationsquellen: ["Fachmessen & Kongresse", "Analysten & Berater (Gartner etc.)", "Peer-Empfehlungen & Netzwerk"],
    onlineAffinitaet: "Offline-präferiert (Persönliche Meetings)",
  },
];


const QUESTION_TEMPLATES_BY_THEMA = {
  "Produkttest": [
    "Was ist Ihr erster Eindruck von [Gegenstand]?",
    "Welche Eigenschaften von [Gegenstand] gefallen Ihnen besonders?",
    "Was würden Sie an [Gegenstand] verbessern?",
    "Würden Sie [Gegenstand] kaufen? Was spricht dafür oder dagegen?",
    "Welchen Preis empfinden Sie für [Gegenstand] als fair?",
    "Wie unterscheidet sich [Gegenstand] von dem, was Sie bisher nutzen?",
  ],
  "Markenwahrnehmung": [
    "Was verbinden Sie spontan mit [Gegenstand]?",
    "Wie würden Sie [Gegenstand] in drei Worten beschreiben?",
    "Welche Gefühle löst [Gegenstand] bei Ihnen aus?",
    "Für wen ist [Gegenstand] Ihrer Meinung nach gemacht?",
    "Wie vertrauenswürdig wirkt [Gegenstand] auf Sie?",
    "Was müsste [Gegenstand] tun, um Sie als Kunden zu gewinnen?",
  ],
  "Konzepttest": [
    "Wie verständlich ist das Konzept von [Gegenstand] für Sie?",
    "Welches Problem löst [Gegenstand] für Sie?",
    "Was ist Ihr größter Einwand gegen [Gegenstand]?",
    "Was fehlt Ihnen noch, um [Gegenstand] zu nutzen?",
    "Wie wahrscheinlich würden Sie [Gegenstand] ausprobieren?",
    "An wen würden Sie [Gegenstand] weiterempfehlen?",
  ],
  "Preisbereitschaft & Zahlungsbereitschaft": [
    "Was würden Sie maximal für [Gegenstand] zahlen?",
    "Ab welchem Preis wäre [Gegenstand] für Sie zu teuer?",
    "Ab welchem Preis würden Sie an der Qualität zweifeln?",
    "Welches Preismodell bevorzugen Sie für [Gegenstand]?",
    "Wie bewerten Sie das Preis-Leistungs-Verhältnis von [Gegenstand]?",
  ],
  "Kundenzufriedenheit & NPS": [
    "Wie zufrieden sind Sie insgesamt mit [Gegenstand]?",
    "Würden Sie [Gegenstand] weiterempfehlen? Warum?",
    "Was läuft bei [Gegenstand] besonders gut?",
    "Was ist Ihr größter Kritikpunkt an [Gegenstand]?",
    "Was hat sich seit Ihrer letzten Erfahrung mit [Gegenstand] verändert?",
  ],
  "Kommunikationstest (Werbung, Kampagne)": [
    "Was ist Ihre erste Reaktion auf diese Kommunikation?",
    "Was ist die Kernbotschaft, die Sie verstehen?",
    "Wie glaubwürdig wirkt diese Botschaft auf Sie?",
    "Spricht Sie diese Kommunikation persönlich an? Warum?",
    "Was würden Sie an dieser Botschaft ändern?",
    "Motiviert Sie diese Kommunikation zum Handeln?",
  ],
  "Sortiments- & Angebotstest": [
    "Welche Produkte aus [Gegenstand] würden Sie kaufen?",
    "Was fehlt Ihnen in diesem Sortiment?",
    "Wie übersichtlich und verständlich ist [Gegenstand] für Sie?",
    "Welches Produkt aus [Gegenstand] enttäuscht Sie?",
    "Wie unterscheidet sich [Gegenstand] von vergleichbaren Angeboten?",
    "Was würde Sie zu einem regelmäßigen Kauf aus [Gegenstand] bewegen?",
  ],
};

const QUESTION_TEMPLATES = QUESTION_TEMPLATES_BY_THEMA["Produkttest"];

// ── Bevölkerungsdaten Deutschland (Destatis 2023) ────────────────────────────
// Quelle: Statistisches Bundesamt, Bevölkerung nach Einzeljahren
const BEVOELKERUNG_DE = {
  18:741000,19:762000,20:798000,21:830000,22:862000,23:893000,24:921000,
  25:947000,26:968000,27:983000,28:994000,29:1001000,30:1005000,31:1007000,
  32:1008000,33:1010000,34:1014000,35:1021000,36:1031000,37:1044000,
  38:1058000,39:1071000,40:1082000,41:1090000,42:1094000,43:1094000,
  44:1091000,45:1085000,46:1078000,47:1071000,48:1064000,49:1058000,
  50:1053000,51:1049000,52:1046000,53:1043000,54:1041000,55:1039000,
  56:1037000,57:1035000,58:1032000,59:1028000,60:1022000,61:1013000,
  62:1002000,63:989000,64:974000,65:958000,66:941000,67:923000,68:904000,
  69:884000,70:863000,71:841000,72:818000,73:794000,74:769000
};

function getBevoelkerungDE(alterStr) {
  const match = alterStr?.match(/(\d+)[–\-]+(\d+)/);
  if (!match) return null;
  const from = parseInt(match[1]);
  const to   = parseInt(match[2]);
  let sum = 0;
  for (let age = from; age <= to; age++) {
    sum += BEVOELKERUNG_DE[age] || 0;
  }
  return sum > 0 ? sum : null;
}

function BevoelkerungBadge({ alter, fallback, style: extraStyle, plain }) {
  const val = alter ? getBevoelkerungDE(alter) : null;
  const numText = val != null
    ? `${(val / 1e6).toFixed(1).replace('.', ',')} Mio.`
    : fallback || null;

  if (!numText) return null;

  if (plain) {
    return <div style={{ fontSize: 15, fontWeight: 700, color: "#0d1f35", ...extraStyle }}>{numText}</div>;
  }

  return (
    <div style={{ display: "inline-block", fontSize: 10, fontWeight: 700, padding: "2px 8px",
      borderRadius: 10, background: "#eaf2f8", color: "#2e4057",
      border: "1px solid #c8dce9", marginTop: 5, ...extraStyle }}>
      🇩🇪 {numText} in DE
    </div>
  );
}

// ── Export helpers ───────────────────────────────────────────────────────────

function exportCSV(results, persona, topic) {
  if (!results.length) return;
  const cols = ["Respondent", "NPS", "Sentiment", ...results[0].answers.map((a, i) => `F${i + 1}: ${a.question}`)];
  const rows = results.map(r => [
    r.id, r.nps, r.sentiment,
    ...(r.answers || []).map(a => `"${(a.answer || "").replace(/"/g, '""')}"`)
  ]);
  const csv = [cols.join(";"), ...rows.map(r => r.join(";"))].join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href = url;
  a.download = `silicon-sampling_${persona.label.replace(/\s+/g,"-")}_${Date.now()}.csv`;
  a.click(); URL.revokeObjectURL(url);
}

async function exportPDF(results, persona, topic, summary, avgNps, sentimentCounts) {
  const pdfCdns = [
    "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js",
    "https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js",
    "https://unpkg.com/jspdf@2.5.1/dist/jspdf.umd.min.js",
  ];
  for (const url of pdfCdns) {
    try { await loadScript(url); if (window.jspdf) break; } catch {}
  }
  if (!window.jspdf) { alert("PDF-Export konnte nicht geladen werden. Bitte Internetverbindung prüfen."); return; }
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const W = 210, M = 18;

  // Header bar
  doc.setFillColor(13, 31, 53);
  doc.rect(0, 0, W, 32, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18); doc.setFont("helvetica", "bold");
  doc.text("Silicon Sampling", M, 14);
  doc.setFontSize(9); doc.setFont("helvetica", "normal");
  doc.text("von Neuem — Synthetische Marktforschung", M, 22);
  doc.setFontSize(8);
  doc.text(`Generiert: ${new Date().toLocaleDateString("de-DE")}`, W - M, 22, { align: "right" });

  let y = 42;
  const blueLine = () => { doc.setDrawColor(0, 130, 200); doc.setLineWidth(0.4); doc.line(M, y, W - M, y); y += 5; };
  const label = (txt) => { doc.setFontSize(7); doc.setTextColor(138, 155, 176); doc.setFont("helvetica", "bold"); doc.text(txt.toUpperCase(), M, y); y += 4; };
  const body = (txt, indent = 0) => { doc.setFontSize(10); doc.setTextColor(13, 31, 53); doc.setFont("helvetica", "normal"); const lines = doc.splitTextToSize(txt, W - M * 2 - indent); doc.text(lines, M + indent, y); y += lines.length * 5 + 2; };

  // Meta
  label("Studie"); body(`Persona: ${persona.label}  ·  Region: ${persona.region}  ·  Alter: ${persona.alter}`); 
  body(`Thema: ${topic}`);
  if (persona.kaufverhalten?.length) body(`Kaufverhalten: ${Array.isArray(persona.kaufverhalten) ? persona.kaufverhalten.join(", ") : persona.kaufverhalten}`);
  if (persona.werte?.length) body(`Werte: ${Array.isArray(persona.werte) ? persona.werte.join(", ") : persona.werte}`);
  if (persona.lebensstil?.length) body(`Lebensstil: ${Array.isArray(persona.lebensstil) ? persona.lebensstil.join(", ") : persona.lebensstil}`);
  y += 2;

  // KPIs
  blueLine();
  label("Kennzahlen");
  const kpis = [
    ["Ø NPS Score", `${avgNps}/10`],
    ["Positiv", `${sentimentCounts["positiv"] || 0}`],
    ["Neutral", `${sentimentCounts["neutral"] || 0}`],
    ["Negativ", `${sentimentCounts["negativ"] || 0}`],
    ["Respondenten", `${results.length}`],
  ];
  kpis.forEach(([k, v], i) => {
    const x = M + (i % 3) * 58;
    if (i % 3 === 0 && i > 0) y += 14;
    doc.setFillColor(245, 248, 252);
    doc.roundedRect(x, y, 54, 12, 2, 2, "F");
    doc.setFontSize(14); doc.setTextColor(0, 130, 200); doc.setFont("helvetica", "bold");
    doc.text(v, x + 27, y + 8, { align: "center" });
    doc.setFontSize(6.5); doc.setTextColor(138, 155, 176); doc.setFont("helvetica", "normal");
    doc.text(k.toUpperCase(), x + 27, y + 11.5, { align: "center" });
  });
  y += 18;

  // Summary
  if (summary) {
    blueLine();
    label("Executive Summary");
    body(summary);
    y += 2;
  }

  // Individual results
  blueLine();
  label(`Einzelantworten (${results.length} Respondenten)`);
  results.forEach(r => {
    if (y > 265) { doc.addPage(); y = 20; }
    doc.setFillColor(0, 130, 200, 0.08);
    doc.setFontSize(9); doc.setFont("helvetica", "bold"); doc.setTextColor(0, 130, 200);
    doc.text(`Respondent #${r.id}  ·  NPS ${r.nps}/10  ·  ${r.sentiment}`, M, y); y += 5;
    (r.answers || []).forEach(a => {
      doc.setFontSize(8); doc.setFont("helvetica", "bold"); doc.setTextColor(13, 31, 53);
      const qLines = doc.splitTextToSize(a.question, W - M * 2 - 4); doc.text(qLines, M + 4, y); y += qLines.length * 4 + 1;
      doc.setFont("helvetica", "normal"); doc.setTextColor(74, 85, 104);
      const aLines = doc.splitTextToSize(a.answer, W - M * 2 - 8); doc.text(aLines, M + 8, y); y += aLines.length * 4 + 3;
      if (y > 270) { doc.addPage(); y = 20; }
    });
    y += 3;
  });

  doc.save(`silicon-sampling_${persona.label.replace(/\s+/g,"-")}_${Date.now()}.pdf`);
}

async function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`) && window.PptxGenJS) { resolve(); return; }
    const s = document.createElement("script");
    s.src = src;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

async function exportPPTX(results, persona, topic, summary, avgNps, sentimentCounts) {
  const cdnUrls = [
    "https://cdnjs.cloudflare.com/ajax/libs/PptxGenJS/3.12.0/pptxgen.bundled.js",
    "https://cdn.jsdelivr.net/npm/pptxgenjs@3.12.0/dist/pptxgen.bundled.js",
    "https://unpkg.com/pptxgenjs@3.12.0/dist/pptxgen.bundled.js",
  ];
  for (const url of cdnUrls) {
    try { await loadScript(url); if (window.PptxGenJS) break; } catch {}
  }
  if (!window.PptxGenJS) { alert("PPTX-Export konnte nicht geladen werden. Bitte Internetverbindung prüfen."); return; }
  const pptx = new window.PptxGenJS();
  pptx.layout = "LAYOUT_16x9";
  pptx.author = "von Neuem — Silicon Sampling";

  const navy = "0D1F35", blue = "0082C8", white = "FFFFFF", lightBg = "F5F8FC", textMid = "4A5568", lightBlue = "E8F4FC";

  // ── Slide 1: Title ──
  let s = pptx.addSlide();
  s.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: "100%", h: "100%", fill: { color: navy } });
  s.addShape(pptx.ShapeType.rect, { x: 0, y: 3.8, w: "100%", h: 0.06, fill: { color: blue } });
  s.addText("Silicon Sampling", { x: 0.7, y: 0.9, w: 8, h: 1, fontSize: 44, bold: true, color: white, fontFace: "Arial" });
  s.addText("Synthetische Marktforschung", { x: 0.7, y: 1.85, w: 8, h: 0.5, fontSize: 18, color: "7EB8D8", fontFace: "Arial" });
  s.addText(`Persona: ${persona.label}`, { x: 0.7, y: 4.1, w: 5, h: 0.4, fontSize: 13, color: white, fontFace: "Arial", bold: true });
  s.addText(`Thema: ${topic}`, { x: 0.7, y: 4.55, w: 8.5, h: 0.35, fontSize: 12, color: "7EB8D8", fontFace: "Arial" });
  const werteTxt = Array.isArray(persona.werte) ? persona.werte.join(" · ") : persona.werte;
  const lsTxt = Array.isArray(persona.lebensstil) ? persona.lebensstil.join(" · ") : persona.lebensstil;
  if (werteTxt) s.addText(`Werte: ${werteTxt}`, { x: 0.7, y: 4.93, w: 9, h: 0.28, fontSize: 9, color: "4A8FC4", fontFace: "Arial" });
  s.addText(`${results.length} Respondenten  ·  ${new Date().toLocaleDateString("de-DE")}`, { x: 0.7, y: 5.28, w: 6, h: 0.28, fontSize: 10, color: "4A6A8A", fontFace: "Arial" });
  s.addText("von Neuem", { x: 7.5, y: 5.05, w: 2.3, h: 0.4, fontSize: 15, italic: true, color: "4A8FC4", fontFace: "Georgia" });

  // ── Slide 2: KPIs ──
  s = pptx.addSlide();
  s.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: "100%", h: 0.9, fill: { color: navy } });
  s.addText("Ergebnisübersicht", { x: 0.5, y: 0.18, w: 9, h: 0.55, fontSize: 20, bold: true, color: white, fontFace: "Arial" });
  const kpiData = [
    { label: "Ø NPS Score", value: `${avgNps}/10`, color: blue },
    { label: "Positiv", value: `${sentimentCounts["positiv"] || 0}`, color: "16A34A" },
    { label: "Neutral", value: `${sentimentCounts["neutral"] || 0}`, color: "D97706" },
    { label: "Negativ", value: `${sentimentCounts["negativ"] || 0}`, color: "E5007D" },
  ];
  kpiData.forEach((k, i) => {
    const x = 0.4 + i * 2.4;
    s.addShape(pptx.ShapeType.rect, { x, y: 1.1, w: 2.2, h: 1.5, fill: { color: lightBg }, line: { color: "DDE6EF", pt: 1 } });
    s.addText(k.value, { x, y: 1.25, w: 2.2, h: 0.75, fontSize: 32, bold: true, color: k.color, fontFace: "Arial", align: "center" });
    s.addText(k.label.toUpperCase(), { x, y: 2.05, w: 2.2, h: 0.35, fontSize: 8, color: "8A9BB0", fontFace: "Arial", align: "center", bold: true });
  });

  // NPS bar chart
  s.addText("NPS-VERTEILUNG", { x: 0.4, y: 2.85, w: 9, h: 0.3, fontSize: 8, color: "8A9BB0", bold: true, fontFace: "Arial" });
  const maxNps = Math.max(...results.map(r => r.nps), 1);
  results.forEach((r, i) => {
    const bw = (r.nps / 10) * 8.8;
    s.addShape(pptx.ShapeType.rect, { x: 0.4, y: 3.2 + i * 0.28, w: bw, h: 0.2, fill: { color: blue } });
    s.addText(`#${r.id} NPS ${r.nps}`, { x: 0.4, y: 3.2 + i * 0.28, w: 2, h: 0.2, fontSize: 7, color: white, fontFace: "Arial" });
    if (3.2 + i * 0.28 > 6.8) return;
  });

  // ── Slide 3: Executive Summary ──
  if (summary) {
    s = pptx.addSlide();
    s.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: "100%", h: 0.9, fill: { color: navy } });
    s.addText("Executive Summary", { x: 0.5, y: 0.18, w: 9, h: 0.55, fontSize: 20, bold: true, color: white, fontFace: "Arial" });
    s.addShape(pptx.ShapeType.rect, { x: 0.4, y: 1.05, w: 9.2, h: 4.8, fill: { color: lightBlue }, line: { color: "CCE6F5", pt: 1 } });
    s.addText(summary, { x: 0.65, y: 1.2, w: 8.7, h: 4.5, fontSize: 11, color: navy, fontFace: "Arial", valign: "top" });
  }

  // ── Slides: Individual results (3 per slide) ──
  const chunkSize = 3;
  for (let start = 0; start < results.length; start += chunkSize) {
    s = pptx.addSlide();
    s.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: "100%", h: 0.9, fill: { color: navy } });
    const end = Math.min(start + chunkSize, results.length);
    s.addText(`Respondenten ${start + 1}–${end}`, { x: 0.5, y: 0.18, w: 9, h: 0.55, fontSize: 20, bold: true, color: white, fontFace: "Arial" });
    results.slice(start, end).forEach((r, idx) => {
      const col = idx;
      const cx = 0.2 + col * 3.3;
      const sentColor = r.sentiment === "positiv" ? "16A34A" : r.sentiment === "negativ" ? "E5007D" : "D97706";
      s.addShape(pptx.ShapeType.rect, { x: cx, y: 1.0, w: 3.1, h: 5.5, fill: { color: lightBg }, line: { color: "DDE6EF", pt: 1 } });
      s.addText(`#${r.id}`, { x: cx + 0.1, y: 1.1, w: 1, h: 0.35, fontSize: 12, bold: true, color: blue, fontFace: "Arial" });
      s.addText(`${r.sentiment}`, { x: cx + 1.1, y: 1.1, w: 1.3, h: 0.3, fontSize: 8, bold: true, color: sentColor, fontFace: "Arial" });
      s.addText(`NPS ${r.nps}/10`, { x: cx + 2.3, y: 1.1, w: 0.7, h: 0.3, fontSize: 8, color: textMid, fontFace: "Arial" });
      let ay = 1.55;
      (r.answers || []).slice(0, 3).forEach(a => {
        s.addText(a.question, { x: cx + 0.12, y: ay, w: 2.86, h: 0.3, fontSize: 7, bold: true, color: navy, fontFace: "Arial" });
        ay += 0.3;
        const aText = (a.answer || "").substring(0, 120);
        s.addText(aText, { x: cx + 0.12, y: ay, w: 2.86, h: 0.65, fontSize: 7, color: textMid, fontFace: "Arial" });
        ay += 0.7;
      });
    });
  }

  pptx.writeFile({ fileName: `silicon-sampling_${persona.label.replace(/\s+/g, "-")}_${Date.now()}.pptx` });
}

// ── Main Component ────────────────────────────────────────────────────────────

const EMPTY_AUFTRAGGEBER = { name: "", branche: "", url: "", beschreibung: "" };
const EMPTY_PERSONA_B2C = { label: "", alter: "", einkommen: "", bildung: "", region: "", haushaltstyp: "", werte: [], lebensstil: [], kaufverhalten: [], bevoelkerung: "" };
const EMPTY_PERSONA_B2B = { label: "", type: "b2b", branche: "", mitarbeiter: "", umsatz: "", region: "", strategischeAusrichtung: "", buyingCenterRolle: [], hierarchie: "", budget: "", kaufverhalten: [], preisorientierung: "", anbieterloyalitaet: "", informationsquellen: [], onlineAffinitaet: "" };
const EMPTY_GEGENSTAND = { name: "", beschreibung: "", preis: "", bilder: [] };


export default function SiliconSamplingApp() {
  const [step, setStep] = useState(0);

  // ── Auftraggeber ──
  const [auftraggeber, setAuftraggeber] = useState({ ...EMPTY_AUFTRAGGEBER });
  const [savedAuftraggeber, setSavedAuftraggeber] = useState([]);
  const [auftraggeberMode, setAuftraggeberMode] = useState("select");

  const [personaType, setPersonaType] = useState("b2c"); // "b2c" | "b2b"
  const EMPTY_PERSONA = personaType === "b2c" ? EMPTY_PERSONA_B2C : EMPTY_PERSONA_B2B;
  const [persona, setPersona] = useState({ ...EMPTY_PERSONA_B2C });
  const [savedPersonas, setSavedPersonas] = useState([]);
  const [hiddenPresets, setHiddenPresets] = useState({ b2c: [], b2b: [] });
  const [saveNameInput, setSaveNameInput] = useState("");
  const [showSaveInput, setShowSaveInput] = useState(false);
  const [openWerteCluster, setOpenWerteCluster] = useState(null);
  const [personaMode, setPersonaMode] = useState("select"); // "select" | "create"

  // Load saved personas + hidden presets from storage on mount
  useEffect(() => {
    (async () => {
      try {
        const result = await window.storage.get("auftraggeber-library");
        if (result?.value) setSavedAuftraggeber(JSON.parse(result.value));
      } catch {}
      try {
        const result = await window.storage.get("personas-library");
        if (result?.value) setSavedPersonas(JSON.parse(result.value));
      } catch {}
      try {
        const result = await window.storage.get("hidden-presets");
        if (result?.value) setHiddenPresets(JSON.parse(result.value));
      } catch {}
    })();
  }, []);

  const savePersona = async (name) => {
    const toSave = { ...persona, label: name || persona.label, savedAt: Date.now() };
    const updated = [...savedPersonas.filter(p => p.label !== toSave.label), toSave];
    setSavedPersonas(updated);
    try { await window.storage.set("personas-library", JSON.stringify(updated)); } catch {}
    setShowSaveInput(false);
    setSaveNameInput("");
  };

  const deletePersona = async (label) => {
    const updated = savedPersonas.filter(p => p.label !== label);
    setSavedPersonas(updated);
    try { await window.storage.set("personas-library", JSON.stringify(updated)); } catch {}
  };

  const hidePreset = async (type, label) => {
    const updated = { ...hiddenPresets, [type]: [...(hiddenPresets[type] || []), label] };
    setHiddenPresets(updated);
    try { await window.storage.set("hidden-presets", JSON.stringify(updated)); } catch {}
  };

  // Smooth progress animation
  useEffect(() => {
    if (!simulating) { setSmoothProgress(0); return; }
    const interval = setInterval(() => {
      setSmoothProgress(prev => {
        // Crawl toward real progress, but never exceed it by more than a few %
        const target = progress;
        const diff = target - prev;
        if (Math.abs(diff) < 0.5) return target;
        return prev + Math.max(0.3, diff * 0.08);
      });
    }, 80);
    return () => clearInterval(interval);
  }, [simulating, progress]);

  const loadPersona = (p) => {
    setPersona({ ...p });
    setPersonaMode("create");
  };

  const saveAuftraggeber = async (ag) => {
    const updated = [...savedAuftraggeber.filter(a => a.name !== ag.name), { ...ag, savedAt: Date.now() }];
    setSavedAuftraggeber(updated);
    try { await window.storage.set("auftraggeber-library", JSON.stringify(updated)); } catch {}
  };

  const deleteAuftraggeber = async (name) => {
    const updated = savedAuftraggeber.filter(a => a.name !== name);
    setSavedAuftraggeber(updated);
    try { await window.storage.set("auftraggeber-library", JSON.stringify(updated)); } catch {}
  };

  const loadAuftraggeber = (ag) => {
    setAuftraggeber({ ...ag });
    // Stay in select mode so all auftraggeber remain visible
  };
  const [topic, setTopic] = useState("");
  const [themaKategorie, setThemaKategorie] = useState("");
  const [gegenstand, setGegenstand] = useState({ ...EMPTY_GEGENSTAND });
  const [questions, setQuestions] = useState([""]);
  const [sampleSize, setSampleSize] = useState(8);
  const [simulating, setSimulating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [smoothProgress, setSmoothProgress] = useState(0);
  const [results, setResults] = useState([]);
  const [summary, setSummary] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [error, setError] = useState("");
  const [expandedCard, setExpandedCard] = useState(null);
  const [exporting, setExporting] = useState("");

  const canProceed = () => {
    if (step === 0) return auftraggeber.name && auftraggeber.branche;
    if (step === 1) return topic.trim().length > 0 && themaKategorie.length > 0;
    if (step === 2) {
      if (personaType === "b2b") return persona.label && persona.branche;
      return persona.label && persona.alter;
    }
    if (step === 3) return gegenstand.name.trim().length > 0;
    if (step === 4) return questions.filter(q => q.trim()).length > 0;
    return true;
  };

  const addQuestion = () => setQuestions([...questions, ""]);
  const updateQuestion = (i, val) => { const q = [...questions]; q[i] = val; setQuestions(q); };
  const removeQuestion = (i) => setQuestions(questions.filter((_, idx) => idx !== i));

  const runSimulation = async () => {
    setSimulating(true); setProgress(0); setResults([]); setSummary(""); setError("");
    const validQs = questions.filter(q => q.trim());
    const total = sampleSize; const collected = [];

    const haushaltsLabel = HAUSHALTSTYP_OPTIONS.find(h => h.value === persona.haushaltstyp)?.label || "";
    const stratLabel = B2B_STRATEGISCHE_AUSRICHTUNG.find(s => s.value === persona.strategischeAusrichtung)?.label || "";

    const STIMMUNGEN = ["eher skeptisch heute", "offen und neugierig", "pragmatisch und direkt", "leicht genervt von Werbung", "auf der Suche nach etwas Gutem", "zeitlich gestresst", "in Kauflaune", "gerade enttäuscht von einem ähnlichen Produkt", "entspannt und reflektiert", "eher konservativ in Entscheidungen", "begeisterungsfähig", "kritisch aber fair", "unentschlossen", "hat schlechte Erfahrungen gemacht", "sehr markenaffin"];
    const PERSPEKTIVEN = ["legt heute besonders viel Wert auf Preis", "denkt gerade viel an Qualität", "hat kürzlich ein ähnliches Produkt genutzt", "hat das Thema gerade im Freundeskreis diskutiert", "kennt das Produkt bisher nur vom Hören", "hat konkrete Alternativen im Kopf", "ist zum ersten Mal mit diesem Thema konfrontiert", "hat bereits Kauferfahrung in dieser Kategorie", "ist durch eine Empfehlung auf das Thema gekommen", "recherchiert gerade aktiv in dieser Kategorie"];
    const getSeed = (id) => {
      const s = STIMMUNGEN[(id * 7 + 3) % STIMMUNGEN.length];
      const p = PERSPEKTIVEN[(id * 11 + 5) % PERSPEKTIVEN.length];
      return `Du bist heute ${s}. ${p}.`;
    };

    const buildPrompt = (id) => personaType === "b2b"
      ? `Du wirst befragt im Auftrag von: ${auftraggeber.name}${auftraggeber.beschreibung ? " — " + auftraggeber.beschreibung : ""}.
Du bist eine synthetische B2B-Marktforschungs-Persona:
- Unternehmen: ${persona.branche} | ${persona.mitarbeiter} Mitarbeiter | Umsatz ${persona.umsatz}
- Region: ${persona.region} | Strategische Ausrichtung: ${stratLabel}
- Deine Rolle im Buying Center: ${Array.isArray(persona.buyingCenterRolle) ? persona.buyingCenterRolle.join(", ") : persona.buyingCenterRolle}
- Hierarchische Position: ${persona.hierarchie} | Entscheidungsbudget: ${persona.budget}
- Preisorientierung: ${persona.preisorientierung} | Anbieterloyalität: ${persona.anbieterloyalitaet}
- Informationsquellen: ${Array.isArray(persona.informationsquellen) ? persona.informationsquellen.join(", ") : persona.informationsquellen}
- Online-Affinität: ${persona.onlineAffinitaet}
Thema: ${topic}
${gegenstand.name ? `Untersuchungsgegenstand: ${gegenstand.name}${gegenstand.preis ? " · Preis: " + gegenstand.preis : ""}
${gegenstand.beschreibung ? "Beschreibung: " + gegenstand.beschreibung : ""}` : ""}
Du bist Respondent ${id} von ${total}. ${getSeed(id)} Jede Person hat andere Prioritäten, andere Erfahrungen, andere Entscheidungslogiken.
Antworte so, wie diese Person in dieser Rolle, in diesem Unternehmen, mit dieser Entscheidungslogik wirklich antworten würde.
Vermeide Füllphrasen ("ehrlich gesagt", "grundsätzlich", "im Großen und Ganzen"). Deine Antwort hat ihre eigene Stimme.
Der Score (0-10) ergibt sich aus deiner echten Einschätzung als diese Persona — nicht aus einer Vorgabe.
NUR JSON: {"answers":[{"question":"...","answer":"..."}],"sentiment":"positiv|neutral|negativ","nps":<0-10>}`
      : `Du wirst befragt im Auftrag von: ${auftraggeber.name}${auftraggeber.beschreibung ? " — " + auftraggeber.beschreibung : ""}.
Du bist eine synthetische B2C-Marktforschungs-Persona:
- Alter: ${persona.alter}  - Einkommen: ${persona.einkommen}  - Bildung: ${persona.bildung}
- Region: ${persona.region}  - Haushaltstyp: ${haushaltsLabel}
- Werte: ${Array.isArray(persona.werte) ? persona.werte.join(", ") : persona.werte}
- Lebensstil: ${Array.isArray(persona.lebensstil) ? persona.lebensstil.join(", ") : persona.lebensstil}
- Kaufverhalten: ${Array.isArray(persona.kaufverhalten) ? persona.kaufverhalten.join(", ") : persona.kaufverhalten}
Thema: ${topic}
${gegenstand.name ? `Untersuchungsgegenstand: ${gegenstand.name}${gegenstand.preis ? " · Preis: " + gegenstand.preis : ""}
${gegenstand.beschreibung ? "Beschreibung: " + gegenstand.beschreibung : ""}` : ""}
Du bist Respondent ${id} von ${total}. ${getSeed(id)} Jede Person hat eine eigene Persönlichkeit, eigene Erfahrungen und eigene Meinungen.
Antworte so, wie diese Person mit diesem Hintergrund, diesen Werten und diesem Kaufverhalten wirklich antworten würde.
Bleib deiner Persona treu — nicht jede Persona findet alles gut, und nicht jede findet alles schlecht.
Vermeide Klischees und Füllphrasen ("ehrlich gesagt", "grundsätzlich", "ich muss sagen"). Jede Antwort hat ihre eigene Stimme.
Der Score (0-10) ergibt sich aus deiner echten Haltung als diese Persona — nicht aus einer Vorgabe.
NUR JSON: {"answers":[{"question":"...","answer":"..."}],"sentiment":"positiv|neutral|negativ","nps":<0-10>}`;

    try {
      const batchSize = 1;
      for (let b = 0; b < Math.ceil(total / batchSize); b++) {
        const cur = Math.min(batchSize, total - b * batchSize);
        const batch = await Promise.all(Array.from({ length: cur }, async (_, i) => {
          const id = b * batchSize + i + 1;
          const resp = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, system: buildPrompt(id),
              messages: [{ role: "user", content: `Befragung ${id}/${total}:\n${validQs.map((q, qi) => `F${qi + 1}: ${q}`).join("\n")}` }] }),
          });
          if (!resp.ok) throw new Error(`API ${resp.status}`);
          const data = await resp.json();
          const text = data.content?.find(c => c.type === "text")?.text || "{}";
          try { return { id, ...JSON.parse(text.replace(/```json|```/g, "").trim()) }; }
          catch { return { id, answers: validQs.map(q => ({ question: q, answer: "–" })), sentiment: "neutral", nps: 5 }; }
        }));
        collected.push(...batch);
        setProgress(Math.round((collected.length / total) * 100));
        setResults([...collected]);
        await new Promise(r => setTimeout(r, 150));
      }
    } catch (e) { setError("Simulation fehlgeschlagen: " + e.message); setSimulating(false); return; }
    setSimulating(false);

    if (collected.length > 0) {
      setLoadingSummary(true);
      try {
        const allAnswers = collected.map(r =>
          `Person ${r.id} (NPS: ${r.nps}, ${r.sentiment}):\n` + (r.answers || []).map(a => `  Q: ${a.question}\n  A: ${a.answer}`).join("\n")
        ).join("\n\n");
        const sumResp = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000,
            messages: [{ role: "user", content: `Marktforschungsexperte bei Unternehmensberatung. Analysiere diese Befragungsergebnisse, erstelle Executive Summary (max. 180 Wörter, Deutsch). Struktur: 1) Kernerkenntnisse, 2) Auffälligkeiten, 3) Handlungsempfehlungen.\n\nAuftraggeber: ${auftraggeber.name}\nThema: ${themaKategorie}\nGegenstand: ${gegenstand.name || topic}\nPersona: ${persona.label}\n\n${allAnswers}` }] }),
        });
        const sd = await sumResp.json();
        setSummary(sd.content?.find(c => c.type === "text")?.text || "");
      } catch { setSummary(""); }
      setLoadingSummary(false);
    }
  };

  const avgNps = results.length > 0 ? (results.reduce((s, r) => s + (r.nps || 5), 0) / results.length).toFixed(1) : null;
  const sentimentCounts = results.reduce((a, r) => { a[r.sentiment] = (a[r.sentiment] || 0) + 1; return a; }, {});
  const validQs = questions.filter(q => q.trim());

  const sentColor = s => s === "positiv" ? C.green : s === "negativ" ? C.pink : C.amber;
  const sentBg = s => s === "positiv" ? C.greenLight : s === "negativ" ? C.pinkLight : C.amberLight;

  const handleExport = async (type) => {
    setExporting(type);
    try {
      if (type === "csv") exportCSV(results, persona, topic);
      else if (type === "pdf") await exportPDF(results, persona, topic, summary, avgNps, sentimentCounts);
      else if (type === "pptx") await exportPPTX(results, persona, topic, summary, avgNps, sentimentCounts);
    } catch (e) { console.error(e); }
    setExporting("");
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", background: C.bgSoft, minHeight: "100vh", color: C.text }}>

      {/* ── Header ── */}
      <div style={{ background: C.navy, borderBottom: `3px solid ${C.blue}`, position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1040, margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <img src={`data:image/png;base64,${LOGO_B64}`} alt="von Neuem" style={{ height: 44, filter: "brightness(0) invert(1)" }} />
            <div style={{ width: 1, height: 22, background: "#2a4a6a" }} />
            <div style={{ fontSize: 12, color: "#7eb8d8", letterSpacing: "0.12em", fontWeight: 600, textTransform: "uppercase" }}>Silicon Sampling</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
            {STEPS.map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center" }}>
                <div onClick={() => i < step && setStep(i)} style={{
                  display: "flex", alignItems: "center", gap: 7, padding: "5px 12px", borderRadius: 5,
                  cursor: i < step ? "pointer" : "default",
                  background: i === step ? "rgba(0,130,200,0.2)" : "transparent",
                }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: "50%", fontSize: 10, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700,
                    background: i < step ? C.blue : i === step ? C.blue : "#2a4a6a",
                    color: i <= step ? "#fff" : "#4a6a8a",
                  }}>{i < step ? "✓" : i + 1}</div>
                  <span style={{ fontSize: 12, color: i === step ? "#7eb8d8" : i < step ? "#4a8fc4" : "#4a6a8a", fontWeight: i === step ? 600 : 400 }}>{s}</span>
                </div>
                {i < STEPS.length - 1 && <div style={{ width: 20, height: 1, background: i < step ? C.blue : "#2a4a6a" }} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1040, margin: "0 auto", padding: "40px 32px 60px" }}>

        {/* ── STEP 0: Auftraggeber ── */}
        {step === 0 && (
          <div>
            <StepHeader num={1} title="Auftraggeber" subtitle="Für wen führst du diese Studie durch?" accent={C.blue} />

            <div style={{ display: "flex", gap: 0, marginBottom: 28, background: C.bg, border: `1px solid ${C.border}`, borderRadius: 10, padding: 4, width: "fit-content", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              {[
                { id: "select", label: "📋  Auftraggeber wählen", count: savedAuftraggeber.length },
                { id: "create", label: "✏️  Auftraggeber anlegen" },
              ].map(tab => (
                <button key={tab.id} onClick={() => setAuftraggeberMode(tab.id)} style={{
                  padding: "8px 20px", borderRadius: 7, border: "none", cursor: "pointer",
                  background: auftraggeberMode === tab.id ? C.navy : "transparent",
                  color: auftraggeberMode === tab.id ? "#fff" : C.textMid,
                  fontSize: 13, fontWeight: auftraggeberMode === tab.id ? 700 : 400,
                  fontFamily: "inherit", transition: "all 0.15s",
                }}>
                  {tab.label}{tab.count > 0 ? ` (${tab.count})` : ""}
                </button>
              ))}
            </div>

            {auftraggeberMode === "select" && (
              <div>
                {savedAuftraggeber.length > 0 ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {savedAuftraggeber.map((ag, i) => (
                      <div key={i} style={{ background: C.bg, border: `2px solid ${auftraggeber.name === ag.name ? C.blue : C.border}`, borderRadius: 10, padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", cursor: "pointer" }}
                        onClick={() => loadAuftraggeber(ag)}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 3 }}>{ag.name}</div>
                          <div style={{ fontSize: 12, color: C.textMid }}>{ag.branche}</div>
                          {ag.beschreibung && <div style={{ fontSize: 11, color: C.textLight, marginTop: 4, fontStyle: "italic" }}>{ag.beschreibung.substring(0, 100)}{ag.beschreibung.length > 100 ? "…" : ""}</div>}
                        </div>
                        <button onClick={e => { e.stopPropagation(); deleteAuftraggeber(ag.name); }}
                          style={{ padding: "7px 10px", borderRadius: 6, border: `1px solid ${C.border}`, background: C.bg, color: C.textLight, cursor: "pointer", fontSize: 12, fontFamily: "inherit", marginLeft: 12, flexShrink: 0 }}>✕</button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ padding: "32px 0", textAlign: "center", color: C.textLight, fontSize: 13 }}>
                    Noch kein Auftraggeber angelegt.
                    <br />
                    <button onClick={() => setAuftraggeberMode("create")} style={{ marginTop: 12, padding: "9px 20px", borderRadius: 8, border: `1px solid ${C.blue}`, background: C.blueLight, color: C.blue, cursor: "pointer", fontSize: 13, fontFamily: "inherit", fontWeight: 600 }}>+ Auftraggeber anlegen</button>
                  </div>
                )}
              </div>
            )}

            {auftraggeberMode === "create" && (
              <div>
                <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 12, padding: "24px 28px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", marginBottom: 16 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 20px" }}>
                    <div style={{ gridColumn: "1 / -1" }}>
                      <Label>Unternehmen / Marke *</Label>
                      <input value={auftraggeber.name} onChange={e => setAuftraggeber({ ...auftraggeber, name: e.target.value })}
                        placeholder="z.B. Einrichtungspartnerring VME, Apple, XCX GmbH"
                        style={inputStyle(C.blue)} />
                    </div>
                    <div style={{ gridColumn: "1 / -1" }}>
                      <Label>Branche *</Label>
                      <select value={auftraggeber.branche} onChange={e => setAuftraggeber({ ...auftraggeber, branche: e.target.value })}
                        style={{ width: "100%", border: `1px solid ${auftraggeber.branche ? C.blue : C.border}`, borderRadius: 8, padding: "10px 14px", fontSize: 13, color: auftraggeber.branche ? C.text : "#b0bac5", background: C.bg, fontFamily: "inherit", outline: "none", appearance: "none", WebkitAppearance: "none" }}>
                        <option value="">— Branche wählen —</option>
                        {AUFTRAGGEBER_BRANCHEN.map(b => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>
                    <div style={{ gridColumn: "1 / -1" }}>
                      <Label>Website (optional)</Label>
                      <input value={auftraggeber.url} onChange={e => setAuftraggeber({ ...auftraggeber, url: e.target.value })}
                        placeholder="z.B. https://www.einrichtungspartnerring.com"
                        style={inputStyle(C.blue)} />
                    </div>
                    <div style={{ gridColumn: "1 / -1" }}>
                      <Label>Wofür steht das Unternehmen?</Label>
                      <textarea value={auftraggeber.beschreibung} onChange={e => setAuftraggeber({ ...auftraggeber, beschreibung: e.target.value })}
                        placeholder="z.B. Wir sind die führende Einkaufsgemeinschaft für unabhängige Möbelhändler in Deutschland — wir bündeln Einkaufsmacht und entwickeln eigene Handelsmarken wie Interliving und Trendhopper."
                        rows={4}
                        style={{ ...inputStyle(C.blue), resize: "vertical", lineHeight: 1.6 }} />
                    </div>
                  </div>
                </div>
                {auftraggeber.name && auftraggeber.branche && (
                  <AuftraggeberSaveBar auftraggeber={auftraggeber} onSave={saveAuftraggeber} />
                )}
              </div>
            )}
          </div>
        )}

        {/* ── STEP 1: Thema ── */}
        {step === 1 && (
          <div>
            <StepHeader num={2} title="Thema der Studie" subtitle="Was soll untersucht werden?" accent="#7B3FA0" />
            <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 12, padding: "24px 28px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>

              {/* Auftraggeber Auswahl */}
              <div style={{ marginBottom: 20 }}>
                <Label>Auftraggeber</Label>
                {savedAuftraggeber.length > 0 ? (
                  <select
                    value={auftraggeber.name}
                    onChange={e => {
                      const ag = savedAuftraggeber.find(a => a.name === e.target.value);
                      if (ag) setAuftraggeber({ ...ag });
                    }}
                    style={{ width: "100%", border: `1px solid ${C.blue}`, borderRadius: 8, padding: "10px 14px", fontSize: 13, color: C.text, background: C.bg, fontFamily: "inherit", outline: "none", appearance: "none", WebkitAppearance: "none", fontWeight: 600 }}>
                    {savedAuftraggeber.map(ag => (
                      <option key={ag.name} value={ag.name}>{ag.name} · {ag.branche}</option>
                    ))}
                  </select>
                ) : (
                  <div style={{ padding: "10px 14px", background: C.bgSoft, borderRadius: 8, border: `1px solid ${C.borderLight}`, fontSize: 13 }}>
                    <span style={{ fontWeight: 700, color: C.text }}>{auftraggeber.name}</span>
                    <span style={{ color: C.textMid }}> · {auftraggeber.branche}</span>
                  </div>
                )}
              </div>

              {/* Forschungsthema Dropdown */}
              <select
                value={themaKategorie}
                onChange={e => { setThemaKategorie(e.target.value); setTopic(e.target.value); }}
                style={{ width: "100%", border: `1px solid ${themaKategorie ? "#7B3FA0" : C.border}`, borderRadius: 8, padding: "12px 16px", fontSize: 13, fontWeight: themaKategorie ? 600 : 400, color: themaKategorie ? "#7B3FA0" : "#b0bac5", background: themaKategorie ? "#f0e8f6" : C.bg, fontFamily: "inherit", outline: "none", appearance: "none", WebkitAppearance: "none", cursor: "pointer", marginBottom: 8 }}>
                <option value="">— Wähle das Forschungsthema —</option>
                {Object.keys(QUESTION_TEMPLATES_BY_THEMA).map(kat => (
                  <option key={kat} value={kat}>{kat}</option>
                ))}
              </select>
              <div style={{ fontSize: 12, color: C.textLight }}>
                Wähle das Forschungsthema — das Sampling passt sich automatisch an.
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 2: Persona ── */}
        {step === 2 && (
          <div>
            <StepHeader num={3} title="Persona der Zielgruppe" subtitle="Wähle eine gespeicherte Persona oder erstelle eine neue." accent={C.blue} />

            {/* B2C / B2B Toggle */}
            <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
              {[
                { id: "b2c", label: "B2C — Konsument", Icon: User, desc: "Privatkunden, Endverbraucher" },
                { id: "b2b", label: "B2B — Organisation", Icon: Building2, desc: "Unternehmen, Einkäufer, Entscheider" },
              ].map(({ id, label, Icon: TabIcon, desc }) => {
                const sel = personaType === id;
                return (
                  <div key={id} onClick={() => { setPersonaType(id); setPersona(id === "b2b" ? { label: "", type: "b2b", branche: "", mitarbeiter: "", umsatz: "", region: "", strategischeAusrichtung: "", buyingCenterRolle: [], hierarchie: "", budget: "", kaufverhalten: [], preisorientierung: "", anbieterloyalitaet: "", informationsquellen: [], onlineAffinitaet: "" } : { label: "", alter: "", einkommen: "", bildung: "", region: "", haushaltstyp: "", werte: [], lebensstil: [], kaufverhalten: [] }); setPersonaMode("select"); }}
                    style={{ flex: 1, padding: "14px 18px", borderRadius: 10, cursor: "pointer", border: `2px solid ${sel ? C.blue : C.border}`, background: sel ? C.blueLight : C.bg, display: "flex", alignItems: "center", gap: 12, boxShadow: sel ? `0 0 0 1px ${C.blue}` : "0 1px 4px rgba(0,0,0,0.06)", transition: "all 0.15s" }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: sel ? C.blue : C.bgSoft, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <TabIcon size={18} color={sel ? "#fff" : C.textMid} />
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: sel ? C.blue : C.text }}>{label}</div>
                      <div style={{ fontSize: 11, color: C.textLight }}>{desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mode Tabs */}
            <div style={{ display: "flex", gap: 0, marginBottom: 28, background: C.bg, border: `1px solid ${C.border}`, borderRadius: 10, padding: 4, width: "fit-content", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              {[
                { id: "select", label: "📋  Persona wählen", count: savedPersonas.length },
                { id: "create", label: "✏️  Persona erstellen" },
              ].map(tab => (
                <button key={tab.id} onClick={() => setPersonaMode(tab.id)} style={{
                  padding: "8px 20px", borderRadius: 7, border: "none", cursor: "pointer",
                  background: personaMode === tab.id ? C.navy : "transparent",
                  color: personaMode === tab.id ? "#fff" : C.textMid,
                  fontSize: 13, fontWeight: personaMode === tab.id ? 700 : 400,
                  fontFamily: "inherit", transition: "all 0.15s",
                }}>
                  {tab.label}{tab.count > 0 ? ` (${tab.count})` : ""}
                </button>
              ))}
            </div>

            {/* ── SELECT MODE ── */}
            {personaMode === "select" && (
              <div>
                {/* Presets */}
                <div style={{ marginBottom: 28 }}>
                  <Label>Vorlagen</Label>
                  <div style={{ display: "grid", gridTemplateColumns: `repeat(${personaType === "b2c" ? 3 : 2},1fr)`, gap: 12 }}>
                    {(personaType === "b2c" ? PERSONA_PRESETS_B2C : PERSONA_PRESETS_B2B)
                      .filter(p => !(hiddenPresets[personaType] || []).includes(p.label))
                      .map((p, i) => {
                      const ht = personaType === "b2c" ? HAUSHALTSTYP_OPTIONS.find(h => h.value === p.haushaltstyp) : null;
                      const isGenOnly = !p.alter && !p.branche; // Gen presets with no fields
                      return (
                        <div key={i} style={{ position: "relative", padding: "14px 18px", borderRadius: 10, cursor: "pointer", border: `2px solid ${C.border}`, background: C.bg, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", transition: "all 0.15s" }}
                          onClick={() => { const base = p.alter || p.branche ? p : { label: p.label }; setPersona({ werte: [], lebensstil: [], kaufverhalten: [], buyingCenterRolle: [], informationsquellen: [], ...base }); setPersonaMode("create"); }}>
                          {/* (x) delete button */}
                          <button onClick={e => { e.stopPropagation(); hidePreset(personaType, p.label); }}
                            style={{ position: "absolute", top: 7, right: 8, background: "none", border: "none", cursor: "pointer", fontSize: 13, color: C.textLight, lineHeight: 1, padding: "2px 4px", borderRadius: 4 }}
                            title="Vorlage ausblenden">✕</button>
                          <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 4, paddingRight: 18 }}>{p.label}</div>
                          {!isGenOnly && (
                            personaType === "b2c"
                              ? <div style={{ fontSize: 11, color: C.textMid }}>{p.alter} · {ht?.label}</div>
                              : <div style={{ fontSize: 11, color: C.textMid }}>{p.branche} · {p.mitarbeiter?.split(" ")[0]}</div>
                          )}
                          <BevoelkerungBadge alter={p.alter} fallback={p.bevoelkerung} />
                        </div>
                      );
                    })}
                    {/* "Vorlagen zurücksetzen" falls alle ausgeblendet */}
                    {(personaType === "b2c" ? PERSONA_PRESETS_B2C : PERSONA_PRESETS_B2B).every(p => (hiddenPresets[personaType] || []).includes(p.label)) && (
                      <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "16px 0" }}>
                        <button onClick={async () => { const updated = { ...hiddenPresets, [personaType]: [] }; setHiddenPresets(updated); try { await window.storage.set("hidden-presets", JSON.stringify(updated)); } catch {} }}
                          style={{ fontSize: 12, color: C.blue, background: "none", border: `1px solid ${C.blue}`, borderRadius: 7, padding: "7px 16px", cursor: "pointer", fontFamily: "inherit" }}>
                          Alle Vorlagen wiederherstellen
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Saved Personas */}
                {savedPersonas.length > 0 && (
                  <div>
                    <Label>Gespeicherte Personas</Label>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {savedPersonas.map((p, i) => {
                        const isB2B = p.type === "b2b";
                        const ht = !isB2B ? HAUSHALTSTYP_OPTIONS.find(h => h.value === p.haushaltstyp) : null;
                        return (
                          <div key={i} style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 10, padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                            <div style={{ flex: 1 }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                                <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 8, background: isB2B ? "#e0f7fa" : C.blueLight, color: isB2B ? "#0891b2" : C.blue, fontWeight: 700 }}>{isB2B ? "B2B" : "B2C"}</span>
                                <span style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{p.label}</span>
                              </div>
                              <div style={{ fontSize: 11, color: C.textMid, display: "flex", gap: 12, flexWrap: "wrap" }}>
                                {isB2B ? (
                                  <><span>{p.branche}</span><span>{p.mitarbeiter?.split(" ")[0]}</span><span>{p.hierarchie}</span></>
                                ) : (
                                  <><span>{p.alter}</span>{ht && <span>{ht.label}</span>}<span>{p.region?.split("(")[0]?.trim()}</span>{p.werte?.length > 0 && <span>{p.werte.slice(0,3).join(", ")}{p.werte.length > 3 ? " …" : ""}</span>}</>
                                )}
                              </div>
                            </div>
                            <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                              <button onClick={() => { setPersonaType(isB2B ? "b2b" : "b2c"); loadPersona(p); }} style={{ padding: "7px 14px", borderRadius: 6, border: `1px solid ${C.blue}`, background: C.blueLight, color: C.blue, cursor: "pointer", fontSize: 12, fontFamily: "inherit", fontWeight: 600 }}>Laden</button>
                              <button onClick={() => deletePersona(p.label)} style={{ padding: "7px 10px", borderRadius: 6, border: `1px solid ${C.border}`, background: C.bg, color: C.textLight, cursor: "pointer", fontSize: 12, fontFamily: "inherit" }}>✕</button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {savedPersonas.length === 0 && (
                  <div style={{ padding: "32px 0", textAlign: "center", color: C.textLight, fontSize: 13 }}>
                    Passt keine der gespeicherten Personas? Erstelle eine neue und speichere sie.
                    <br />
                    <button onClick={() => setPersonaMode("create")} style={{ marginTop: 12, padding: "9px 20px", borderRadius: 8, border: `1px solid ${C.blue}`, background: C.blueLight, color: C.blue, cursor: "pointer", fontSize: 13, fontFamily: "inherit", fontWeight: 600 }}>+ Neue Persona erstellen</button>
                  </div>
                )}
              </div>
            )}

            {/* ── CREATE MODE ── */}
            {personaMode === "create" && (
              <div>
                {/* ── B2C FORM ── */}
                {personaType === "b2c" && (<div>
                <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 12, padding: "24px 28px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", marginBottom: 16 }}>
                  <Label>Persona-Details</Label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 20px", marginBottom: 20 }}>
                    <Field label="Segment / Name *" value={persona.label} onChange={v => setPersona({ ...persona, label: v })} placeholder="z.B. Deutscher Mittelstand" />
                    <Field label="Altersgruppe *" value={persona.alter} onChange={v => setPersona({ ...persona, alter: v })} placeholder="z.B. 35–54 Jahre" />
                    <Field label="Einkommen" value={persona.einkommen} onChange={v => setPersona({ ...persona, einkommen: v })} placeholder="z.B. 60.000–120.000 €/Jahr" />
                    <div>
                      <Label>Bildung</Label>
                      <select value={persona.bildung} onChange={e => setPersona({ ...persona, bildung: e.target.value })}
                        style={{ width: "100%", border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", fontSize: 13, color: persona.bildung ? C.text : "#b0bac5", background: C.bg, fontFamily: "inherit", outline: "none", appearance: "none", WebkitAppearance: "none" }}>
                        <option value="">— Bildungsabschluss wählen —</option>
                        <option>Kein Schulabschluss</option>
                        <option>Hauptschulabschluss</option>
                        <option>Mittlere Reife / Realschulabschluss</option>
                        <option>Fachhochschulreife / Abitur</option>
                        <option>Berufsausbildung (dual)</option>
                        <option>Meister / Techniker / Fachwirt</option>
                        <option>Fachhochschulabschluss (B.A./B.Sc.)</option>
                        <option>Hochschulabschluss (M.A./M.Sc./Diplom)</option>
                        <option>Promotion / Habilitation</option>
                        <option>MBA / Executive Education</option>
                      </select>
                    </div>
                    <div style={{ gridColumn: "1 / -1" }}>
                      <Field label="Region" value={persona.region} onChange={v => setPersona({ ...persona, region: v })} placeholder="z.B. Deutschland (urban/suburban)" />
                    </div>
                  </div>

                  {/* Haushaltstyp */}
                  <div style={{ marginBottom: 20 }}>
                    <Label>Haushaltstyp</Label>
                    <div style={{ display: "flex", gap: 10 }}>
                      {HAUSHALTSTYP_OPTIONS.map(ht => {
                        const sel = persona.haushaltstyp === ht.value;
                        return (
                          <div key={ht.value} onClick={() => setPersona(p => ({ ...p, haushaltstyp: sel ? "" : ht.value }))} style={{
                            flex: 1, padding: "12px 14px", borderRadius: 10, cursor: "pointer",
                            border: `2px solid ${sel ? C.blue : C.border}`,
                            background: sel ? C.blueLight : C.bg,
                            textAlign: "center", transition: "all 0.15s",
                            boxShadow: sel ? `0 0 0 1px ${C.blue}` : "none",
                          }}>
                            <div style={{ display: "flex", justifyContent: "center", marginBottom: 5 }}><ht.Icon size={20} color={sel ? C.blue : C.textMid} /></div>
                            <div style={{ fontSize: 12, fontWeight: sel ? 700 : 500, color: sel ? C.blue : C.text }}>{ht.label}</div>
                            <div style={{ fontSize: 10, color: C.textLight, marginTop: 2 }}>{ht.desc}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Kaufverhalten Multi-Select */}
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                      <Label>Kaufverhalten</Label>
                      {persona.kaufverhalten?.length > 0 && (
                        <span style={{ fontSize: 11, color: C.blue, fontWeight: 700 }}>{persona.kaufverhalten.length} gewählt</span>
                      )}
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                      {KAUFVERHALTEN_OPTIONS_B2C.map(o => {
                        const sel = persona.kaufverhalten?.includes(o.value);
                        return (
                          <button key={o.value}
                            onClick={() => setPersona(p => ({ ...p, kaufverhalten: sel ? (p.kaufverhalten||[]).filter(x => x !== o.value) : [...(p.kaufverhalten||[]), o.value] }))}
                            title={o.desc}
                            style={{ padding: "6px 13px", borderRadius: 20, fontSize: 12, fontFamily: "inherit", cursor: "pointer", border: `1.5px solid ${sel ? C.blue : C.border}`, background: sel ? C.blueLight : C.bg, color: sel ? C.blue : C.textMid, fontWeight: sel ? 700 : 400, transition: "all 0.12s" }}>
                            {sel ? "✓ " : ""}{o.value}
                          </button>
                        );
                      })}
                    </div>
                    {persona.kaufverhalten?.length > 0 && (
                      <div style={{ marginTop: 8, padding: "8px 12px", background: C.blueLight, borderRadius: 6, fontSize: 11, color: C.blueDark, lineHeight: 1.7 }}>
                        {persona.kaufverhalten.map(v => {
                          const o = KAUFVERHALTEN_OPTIONS.find(x => x.value === v);
                          return o ? <div key={v}><strong>{v}</strong> — {o.desc}</div> : null;
                        })}
                      </div>
                    )}
                  </div>

                  {/* Werte Cluster Accordion */}
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                      <Label>Werte</Label>
                      {persona.werte?.length > 0 && <span style={{ fontSize: 11, color: C.blue, fontWeight: 700 }}>{persona.werte?.length} ausgewählt</span>}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      {WERTE_CLUSTER.map(cluster => {
                        const isOpen = openWerteCluster === cluster.id;
                        const selectedInCluster = cluster.werte.filter(w => persona.werte.includes(w));
                        return (
                          <div key={cluster.id} style={{ border: `1px solid ${selectedInCluster.length > 0 ? cluster.color + "60" : C.border}`, borderRadius: 9, overflow: "hidden", background: C.bg, transition: "border-color 0.15s" }}>
                            <div onClick={() => setOpenWerteCluster(isOpen ? null : cluster.id)}
                              style={{ padding: "10px 16px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", background: selectedInCluster.length > 0 ? cluster.bg : C.bg }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                <div style={{ width: 10, height: 10, borderRadius: "50%", background: cluster.color, flexShrink: 0 }} />
                                <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{cluster.label}</span>
                                {selectedInCluster.length > 0 && (
                                  <span style={{ padding: "2px 8px", borderRadius: 10, background: cluster.color, color: "#fff", fontSize: 10, fontWeight: 700 }}>{selectedInCluster.length}</span>
                                )}
                              </div>
                              <span style={{ color: C.textLight, fontSize: 11 }}>{isOpen ? "▲" : "▼"}</span>
                            </div>
                            {isOpen && (
                              <div style={{ padding: "12px 16px 14px", borderTop: `1px solid ${C.borderLight}`, display: "flex", flexWrap: "wrap", gap: 6 }}>
                                {cluster.werte.map(w => {
                                  const sel = persona.werte.includes(w);
                                  return (
                                    <button key={w} onClick={() => setPersona(p => ({ ...p, werte: sel ? p.werte.filter(x => x !== w) : [...p.werte, w] }))}
                                      style={{ padding: "5px 12px", borderRadius: 16, fontSize: 12, fontFamily: "inherit", cursor: "pointer", border: `1.5px solid ${sel ? cluster.color : C.border}`, background: sel ? cluster.color : C.bg, color: sel ? "#fff" : C.textMid, fontWeight: sel ? 600 : 400, transition: "all 0.12s" }}>
                                      {sel ? "✓ " : ""}{w}
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Lebensstil Tags */}
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                      <Label>Lebensstil</Label>
                      {persona.lebensstil?.length > 0 && <span style={{ fontSize: 11, color: "#7B3FA0", fontWeight: 700 }}>{persona.lebensstil?.length} ausgewählt</span>}
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                      {LEBENSSTIL_OPTIONS.map(l => {
                        const sel = persona.lebensstil.includes(l);
                        return (
                          <button key={l} onClick={() => setPersona(p => ({ ...p, lebensstil: sel ? p.lebensstil.filter(x => x !== l) : [...p.lebensstil, l] }))}
                            style={{ padding: "6px 14px", borderRadius: 20, fontSize: 12, fontFamily: "inherit", cursor: "pointer", border: `1.5px solid ${sel ? "#7B3FA0" : C.border}`, background: sel ? "#7B3FA0" : C.bg, color: sel ? "#fff" : C.textMid, fontWeight: sel ? 600 : 400, transition: "all 0.12s" }}>
                            {sel ? "✓ " : ""}{l}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Save Persona */}
                <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 10, padding: "16px 20px", marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                  <div style={{ fontSize: 13, color: C.textMid }}>✦ Persona generieren</div>
                  {!showSaveInput ? (
                    <button onClick={() => { setSaveNameInput(persona.label); setShowSaveInput(true); }} disabled={!persona.label}
                      style={{ padding: "8px 18px", borderRadius: 7, border: `1px solid ${C.blue}`, background: C.blueLight, color: C.blue, cursor: persona.label ? "pointer" : "not-allowed", fontSize: 12, fontFamily: "inherit", fontWeight: 600, opacity: persona.label ? 1 : 0.5 }}>
                      Speichern
                    </button>
                  ) : (
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <input value={saveNameInput} onChange={e => setSaveNameInput(e.target.value)} placeholder="Name der Persona" style={{ ...inputStyle(C.blue), width: 200, padding: "7px 12px", fontSize: 12 }} onKeyDown={e => e.key === "Enter" && savePersona(saveNameInput)} autoFocus />
                      <button onClick={() => savePersona(saveNameInput)} style={{ padding: "7px 14px", borderRadius: 7, border: "none", background: C.blue, color: "#fff", cursor: "pointer", fontSize: 12, fontFamily: "inherit", fontWeight: 600 }}>✓</button>
                      <button onClick={() => setShowSaveInput(false)} style={{ padding: "7px 10px", borderRadius: 7, border: `1px solid ${C.border}`, background: C.bg, color: C.textLight, cursor: "pointer", fontSize: 12, fontFamily: "inherit" }}>✕</button>
                    </div>
                  )}
                </div>

                </div>)} {/* end B2C */}

                {/* ── B2B FORM ── */}
                {personaType === "b2b" && (<div>
                <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 12, padding: "24px 28px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", marginBottom: 16 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.blue, marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.05em" }}>Makro-Kriterien — Unternehmen</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 20px", marginBottom: 20 }}>
                    <Field label="Segment / Name *" value={persona.label} onChange={v => setPersona({ ...persona, label: v })} placeholder="z.B. IT-Einkäufer Mittelstand" />
                    <div>
                      <Label>Branche *</Label>
                      <select value={persona.branche} onChange={e => setPersona({ ...persona, branche: e.target.value })}
                        style={{ width: "100%", border: `1px solid ${persona.branche ? C.blue : C.border}`, borderRadius: 8, padding: "10px 14px", fontSize: 13, color: persona.branche ? C.text : "#b0bac5", background: C.bg, fontFamily: "inherit", outline: "none", appearance: "none", WebkitAppearance: "none" }}>
                        <option value="">— Branche wählen —</option>
                        {B2B_BRANCHEN.map(b => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>
                    <div>
                      <Label>Mitarbeiteranzahl</Label>
                      <select value={persona.mitarbeiter} onChange={e => setPersona({ ...persona, mitarbeiter: e.target.value })}
                        style={{ width: "100%", border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", fontSize: 13, color: C.text, background: C.bg, fontFamily: "inherit", outline: "none", appearance: "none", WebkitAppearance: "none" }}>
                        <option value="">— Größe wählen —</option>
                        {B2B_MITARBEITER.map(m => <option key={m} value={m}>{m}</option>)}
                      </select>
                    </div>
                    <div>
                      <Label>Jahresumsatz</Label>
                      <select value={persona.umsatz} onChange={e => setPersona({ ...persona, umsatz: e.target.value })}
                        style={{ width: "100%", border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", fontSize: 13, color: C.text, background: C.bg, fontFamily: "inherit", outline: "none", appearance: "none", WebkitAppearance: "none" }}>
                        <option value="">— Umsatz wählen —</option>
                        {B2B_UMSATZ.map(u => <option key={u} value={u}>{u}</option>)}
                      </select>
                    </div>
                    <div style={{ gridColumn: "1 / -1" }}>
                      <Field label="Region / Markt" value={persona.region} onChange={v => setPersona({ ...persona, region: v })} placeholder="z.B. DACH-Region, Deutschland (Bayern/BW)" />
                    </div>
                  </div>
                  <div style={{ marginBottom: 4 }}>
                    <Label>Strategische Ausrichtung</Label>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {B2B_STRATEGISCHE_AUSRICHTUNG.map(s => {
                        const sel = persona.strategischeAusrichtung === s.value;
                        return (
                          <div key={s.value} onClick={() => setPersona(p => ({ ...p, strategischeAusrichtung: sel ? "" : s.value }))}
                            style={{ padding: "8px 14px", borderRadius: 8, cursor: "pointer", border: `1.5px solid ${sel ? C.blue : C.border}`, background: sel ? C.blueLight : C.bg, transition: "all 0.12s" }}>
                            <div style={{ fontSize: 12, fontWeight: sel ? 700 : 500, color: sel ? C.blue : C.text }}>{s.label}</div>
                            <div style={{ fontSize: 10, color: C.textLight }}>{s.desc}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 12, padding: "24px 28px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", marginBottom: 16 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#7B3FA0", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.05em" }}>Mikro-Kriterien — Ansprechpartner</div>
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                      <Label>Buying-Center-Rolle</Label>
                      {persona.buyingCenterRolle?.length > 0 && <span style={{ fontSize: 11, color: "#7B3FA0", fontWeight: 700 }}>{persona.buyingCenterRolle.length} gewählt</span>}
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                      {B2B_BUYING_CENTER.map(r => {
                        const sel = persona.buyingCenterRolle?.includes(r);
                        return <button key={r} onClick={() => setPersona(p => ({ ...p, buyingCenterRolle: sel ? p.buyingCenterRolle.filter(x => x !== r) : [...(p.buyingCenterRolle||[]), r] }))}
                          style={{ padding: "6px 14px", borderRadius: 20, fontSize: 12, fontFamily: "inherit", cursor: "pointer", border: `1.5px solid ${sel ? "#7B3FA0" : C.border}`, background: sel ? "#7B3FA0" : C.bg, color: sel ? "#fff" : C.textMid, fontWeight: sel ? 600 : 400, transition: "all 0.12s" }}>
                          {sel ? "✓ " : ""}{r}
                        </button>;
                      })}
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 20px" }}>
                    <div>
                      <Label>Hierarchische Position</Label>
                      <select value={persona.hierarchie} onChange={e => setPersona({ ...persona, hierarchie: e.target.value })}
                        style={{ width: "100%", border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", fontSize: 13, color: C.text, background: C.bg, fontFamily: "inherit", outline: "none", appearance: "none", WebkitAppearance: "none" }}>
                        <option value="">— Position wählen —</option>
                        {B2B_HIERARCHIE.map(h => <option key={h} value={h}>{h}</option>)}
                      </select>
                    </div>
                    <div>
                      <Label>Entscheidungsbudget</Label>
                      <select value={persona.budget} onChange={e => setPersona({ ...persona, budget: e.target.value })}
                        style={{ width: "100%", border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", fontSize: 13, color: C.text, background: C.bg, fontFamily: "inherit", outline: "none", appearance: "none", WebkitAppearance: "none" }}>
                        <option value="">— Budget wählen —</option>
                        {B2B_BUDGET.map(b => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 12, padding: "24px 28px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", marginBottom: 16 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#b45309", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.05em" }}>Marketing-Diamant — Verhalten</div>
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                      <Label>Kaufentscheidungsverhalten</Label>
                      {persona.kaufverhalten?.length > 0 && <span style={{ fontSize: 11, color: "#b45309", fontWeight: 700 }}>{persona.kaufverhalten.length} gewählt</span>}
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 6 }}>
                      {KAUFVERHALTEN_OPTIONS_B2B.map(o => {
                        const sel = persona.kaufverhalten?.includes(o.value);
                        return (
                          <button key={o.value}
                            onClick={() => setPersona(p => ({ ...p, kaufverhalten: sel ? (p.kaufverhalten||[]).filter(x => x !== o.value) : [...(p.kaufverhalten||[]), o.value] }))}
                            title={o.desc}
                            style={{ padding: "6px 13px", borderRadius: 20, fontSize: 12, fontFamily: "inherit", cursor: "pointer", border: `1.5px solid ${sel ? "#b45309" : C.border}`, background: sel ? "#fef0cc" : C.bg, color: sel ? "#b45309" : C.textMid, fontWeight: sel ? 700 : 400, transition: "all 0.12s" }}>
                            {sel ? "✓ " : ""}{o.value}
                          </button>
                        );
                      })}
                    </div>
                    {persona.kaufverhalten?.length > 0 && (
                      <div style={{ padding: "7px 11px", background: "#fef0cc", borderRadius: 6, fontSize: 11, color: "#92400e", lineHeight: 1.6 }}>
                        {persona.kaufverhalten.map(v => { const o = KAUFVERHALTEN_OPTIONS.find(x => x.value === v); return o ? <div key={v}><strong>{v}</strong> — {o.desc}</div> : null; })}
                      </div>
                    )}
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <Label>Preisorientierung</Label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                      {B2B_PREISORIENTIERUNG.map(p => { const sel = persona.preisorientierung === p; return <button key={p} onClick={() => setPersona(px => ({ ...px, preisorientierung: sel ? "" : p }))} style={{ padding: "6px 14px", borderRadius: 20, fontSize: 12, fontFamily: "inherit", cursor: "pointer", border: `1.5px solid ${sel ? "#b45309" : C.border}`, background: sel ? "#fef3c7" : C.bg, color: sel ? "#b45309" : C.textMid, fontWeight: sel ? 700 : 400, transition: "all 0.12s" }}>{p}</button>; })}
                    </div>
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <Label>Anbieterloyalität</Label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                      {B2B_ANBIETERLOYALITAET.map(p => { const sel = persona.anbieterloyalitaet === p; return <button key={p} onClick={() => setPersona(px => ({ ...px, anbieterloyalitaet: sel ? "" : p }))} style={{ padding: "6px 14px", borderRadius: 20, fontSize: 12, fontFamily: "inherit", cursor: "pointer", border: `1.5px solid ${sel ? "#b45309" : C.border}`, background: sel ? "#fef3c7" : C.bg, color: sel ? "#b45309" : C.textMid, fontWeight: sel ? 700 : 400, transition: "all 0.12s" }}>{p}</button>; })}
                    </div>
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                      <Label>Informationsquellen</Label>
                      {persona.informationsquellen?.length > 0 && <span style={{ fontSize: 11, color: "#b45309", fontWeight: 700 }}>{persona.informationsquellen.length} gewählt</span>}
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                      {B2B_INFORMATIONSQUELLEN.map(q => { const sel = persona.informationsquellen?.includes(q); return <button key={q} onClick={() => setPersona(px => ({ ...px, informationsquellen: sel ? px.informationsquellen.filter(x => x !== q) : [...(px.informationsquellen||[]), q] }))} style={{ padding: "6px 14px", borderRadius: 20, fontSize: 12, fontFamily: "inherit", cursor: "pointer", border: `1.5px solid ${sel ? "#b45309" : C.border}`, background: sel ? "#fef3c7" : C.bg, color: sel ? "#b45309" : C.textMid, fontWeight: sel ? 700 : 400, transition: "all 0.12s" }}>{sel ? "✓ " : ""}{q}</button>; })}
                    </div>
                  </div>
                  <div>
                    <Label>Online-Affinität</Label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                      {B2B_ONLINE_AFFINITAET.map(p => { const sel = persona.onlineAffinitaet === p; return <button key={p} onClick={() => setPersona(px => ({ ...px, onlineAffinitaet: sel ? "" : p }))} style={{ padding: "6px 14px", borderRadius: 20, fontSize: 12, fontFamily: "inherit", cursor: "pointer", border: `1.5px solid ${sel ? C.blue : C.border}`, background: sel ? C.blueLight : C.bg, color: sel ? C.blue : C.textMid, fontWeight: sel ? 700 : 400, transition: "all 0.12s" }}>{p}</button>; })}
                    </div>
                  </div>
                </div>

                {/* Save + Topic for B2B */}
                <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 10, padding: "16px 20px", marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                  <div style={{ fontSize: 13, color: C.textMid }}>✦ Persona generieren</div>
                  {!showSaveInput ? (
                    <button onClick={() => { setSaveNameInput(persona.label); setShowSaveInput(true); }} disabled={!persona.label}
                      style={{ padding: "8px 18px", borderRadius: 7, border: `1px solid ${C.blue}`, background: C.blueLight, color: C.blue, cursor: persona.label ? "pointer" : "not-allowed", fontSize: 12, fontFamily: "inherit", fontWeight: 600, opacity: persona.label ? 1 : 0.5 }}>
                      Speichern
                    </button>
                  ) : (
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <input value={saveNameInput} onChange={e => setSaveNameInput(e.target.value)} placeholder="Name der Persona" style={{ ...inputStyle(C.blue), width: 200, padding: "7px 12px", fontSize: 12 }} onKeyDown={e => e.key === "Enter" && savePersona(saveNameInput)} autoFocus />
                      <button onClick={() => savePersona(saveNameInput)} style={{ padding: "7px 14px", borderRadius: 7, border: "none", background: C.blue, color: "#fff", cursor: "pointer", fontSize: 12, fontFamily: "inherit", fontWeight: 600 }}>✓</button>
                      <button onClick={() => setShowSaveInput(false)} style={{ padding: "7px 10px", borderRadius: 7, border: `1px solid ${C.border}`, background: C.bg, color: C.textLight, cursor: "pointer", fontSize: 12, fontFamily: "inherit" }}>✕</button>
                    </div>
                  )}
                </div>
                </div>)} {/* end B2B */}
              </div>
            )}
          </div>
        )}

        {/* ── STEP 3: Untersuchungsgegenstand ── */}
        {step === 3 && (
          <div>
            <StepHeader num={4} title="Untersuchungsgegenstand" subtitle="Was genau soll untersucht werden?" accent={C.pink} />
            <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 12, padding: "24px 28px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
              <div style={{ display: "flex", gap: 12, marginBottom: 20, padding: "10px 14px", background: C.bgSoft, borderRadius: 8, border: `1px solid ${C.borderLight}`, flexWrap: "wrap", alignItems: "center" }}>
                <span style={{ fontSize: 11, color: C.pink, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>{themaKategorie}</span>
                <span style={{ color: C.borderLight }}>·</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: C.text }}>{auftraggeber.name}</span>
                <span style={{ fontSize: 12, color: C.textMid }}>· {persona.label}</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 20px" }}>
                <div style={{ gridColumn: "1 / -1" }}>
                  <Label>Name / Bezeichnung *</Label>
                  <input value={gegenstand.name} onChange={e => setGegenstand({ ...gegenstand, name: e.target.value })}
                    placeholder={themaKategorie === "Produkttest" ? "z.B. Interliving Sofa Modell 6601" : themaKategorie === "Markenwahrnehmung" ? "z.B. Marke Trendhopper" : themaKategorie === "Kommunikationstest (Werbung, Kampagne)" ? "z.B. TV-Spot Frühjahr 2026" : "z.B. Neues Sortiment Wohnen 2026"}
                    style={inputStyle(C.pink)} />
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <Label>Beschreibung</Label>
                  <textarea value={gegenstand.beschreibung} onChange={e => setGegenstand({ ...gegenstand, beschreibung: e.target.value })}
                    placeholder="Beschreibe den Gegenstand so, wie ihn die Persona kennenlernen soll — Materialien, Eigenschaften, Besonderheiten, Positionierung…"
                    rows={5} style={{ ...inputStyle(C.pink), resize: "vertical", lineHeight: 1.6 }} />
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <Label>Bilder hochladen (optional)</Label>
                  <ImageDropZone bilder={gegenstand.bilder || []} onChange={imgs => setGegenstand(g => ({ ...g, bilder: imgs }))} />
                </div>
                {(themaKategorie === "Produkttest" || themaKategorie === "Preisbereitschaft & Zahlungsbereitschaft" || themaKategorie === "Sortiments- & Angebotstest") && (
                  <div style={{ gridColumn: "1 / -1" }}>
                    <Label>Preis (optional)</Label>
                    <input value={gegenstand.preis} onChange={e => setGegenstand({ ...gegenstand, preis: e.target.value })}
                      placeholder="z.B. 899 €" style={inputStyle(C.pink)} />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 3: Fragebogen ── */}
        {step === 4 && (
          <div>
            <StepHeader num={5} title="Fragebogen" subtitle="Formuliere die Fragen für deine synthetischen Respondenten." accent="#7B3FA0" />

            <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 12, padding: "20px 24px", marginBottom: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
              <Label>Fragevorlagen</Label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {(QUESTION_TEMPLATES_BY_THEMA[themaKategorie] || QUESTION_TEMPLATES_BY_THEMA["Produkttest"]).map((t, i) => {
                  const gegenstandName = gegenstand.name || topic; const q = t.replace("[Gegenstand]", gegenstandName).replace("[Thema]", gegenstandName);
                  const alreadyAdded = questions.includes(q);
                  return (
                    <button key={i} disabled={alreadyAdded} onClick={() => setQuestions(prev => prev[prev.length-1] === "" ? [...prev.slice(0,-1), q] : [...prev, q])}
                      style={{ padding: "6px 14px", borderRadius: 6, border: `1px solid ${alreadyAdded ? C.border : "#7B3FA0"}`, background: alreadyAdded ? C.bgSoft : "#f5eef9", color: alreadyAdded ? C.textLight : "#7B3FA0", fontSize: 12, cursor: alreadyAdded ? "default" : "pointer", fontFamily: "inherit", transition: "all 0.15s" }}>
                      {alreadyAdded ? "✓ " : "+ "}{q.length > 52 ? q.substring(0, 52) + "…" : q}
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 12, padding: "20px 24px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", marginBottom: 16 }}>
              <Label>Deine Fragen</Label>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {questions.map((q, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#f0e8f6", border: "1px solid #d0b8e8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#7B3FA0", fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
                    <input value={q} onChange={e => updateQuestion(i, e.target.value)} placeholder={`Frage ${i + 1} eingeben...`} style={{ ...inputStyle("#7B3FA0"), flex: 1 }} />
                    {questions.length > 1 && (
                      <button onClick={() => removeQuestion(i)} style={{ background: "none", border: `1px solid ${C.border}`, color: C.textLight, borderRadius: 6, padding: "7px 10px", cursor: "pointer", fontSize: 13, flexShrink: 0 }}>✕</button>
                    )}
                  </div>
                ))}
              </div>
              <button onClick={addQuestion} style={{ marginTop: 12, background: "none", border: `1.5px dashed #7B3FA040`, color: "#7B3FA0", borderRadius: 8, padding: "10px 24px", cursor: "pointer", fontSize: 13, width: "100%", fontFamily: "inherit", transition: "all 0.15s" }}>+ Frage hinzufügen</button>
            </div>

            <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 12, padding: "20px 24px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
              <Label>Stichprobengröße</Label>
              <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <input type="range" min="5" max="20" value={sampleSize} onChange={e => setSampleSize(Number(e.target.value))} style={{ flex: 1, accentColor: C.blue }} />
                <div style={{ fontSize: 24, fontWeight: 700, color: C.blue, minWidth: 80, textAlign: "right" }}>
                  {sampleSize} <span style={{ fontSize: 12, fontWeight: 400, color: C.textMid }}>Respondenten</span>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: C.textLight, marginTop: 4 }}>
                <span>5 — schneller Test</span><span>20 — repräsentativer</span>
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 4: Simulation ── */}
        {step === 5 && (
          <div>
            <StepHeader num={6} title="Simulation starten" subtitle="Die KI befragt jetzt die synthetischen Respondenten deiner Zielgruppe." accent={C.pink} />

            <div style={{ display: "grid", gridTemplateColumns: `repeat(${persona.alter ? 5 : 4},1fr)`, gap: 14, marginBottom: 28 }}>
              {[
                { k: "Auftraggeber", v: auftraggeber.name || "–", s: auftraggeber.branche || "" },
                { k: "Thema", v: themaKategorie, s: gegenstand.name || "" },
                { k: "Persona", v: persona.label, s: persona.alter || "Generation" },
                { k: "Fragen", v: `${validQs.length}`, s: "formuliert" },
                { k: "Stichprobe", v: `${sampleSize}`, s: "Respondenten" },
              ].map((item, i) => (
                <div key={i} style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 10, padding: "14px 18px", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
                  <div style={{ fontSize: 10, color: C.textLight, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 5 }}>{item.k}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>{item.v}</div>
                  <div style={{ fontSize: 11, color: C.textMid }}>{item.s}</div>
                </div>
              ))}
              {persona.alter && (
                <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 10, padding: "14px 18px", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
                  <div style={{ fontSize: 10, color: C.textLight, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 5 }}>🇩🇪 Marktgröße</div>
                  <BevoelkerungBadge alter={persona.alter} fallback={persona.bevoelkerung} plain />
                  <div style={{ fontSize: 11, color: C.textMid, marginTop: 2 }}>in Deutschland</div>
                </div>
              )}
            </div>

            {/* Kaufverhalten / Werte / Lebensstil summary */}
            {(persona.kaufverhalten?.length > 0 || persona.werte?.length > 0 || persona.lebensstil?.length > 0) && (
              <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 12, padding: "18px 24px", marginBottom: 20, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
                {persona.kaufverhalten?.length > 0 && (
                  <div style={{ marginBottom: persona.werte?.length || persona.lebensstil?.length ? 14 : 0 }}>
                    <div style={{ fontSize: 10, color: C.textLight, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 700, marginBottom: 6 }}>Kaufverhalten</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {(Array.isArray(persona.kaufverhalten) ? persona.kaufverhalten : [persona.kaufverhalten]).map(v => (
                        <span key={v} style={{ padding: "3px 10px", borderRadius: 12, background: C.blueLight, color: C.blue, fontSize: 11, fontWeight: 600 }}>{v}</span>
                      ))}
                    </div>
                  </div>
                )}
                {persona.werte?.length > 0 && (
                  <div style={{ marginBottom: persona.lebensstil?.length ? 12 : 0 }}>
                    <div style={{ fontSize: 10, color: C.textLight, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 700, marginBottom: 6 }}>Werte</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {persona.werte.map(w => <span key={w} style={{ padding: "3px 10px", borderRadius: 12, background: C.blueLight, color: C.blue, fontSize: 11, fontWeight: 600 }}>{w}</span>)}
                    </div>
                  </div>
                )}
                {persona.lebensstil?.length > 0 && (
                  <div>
                    <div style={{ fontSize: 10, color: C.textLight, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 700, marginBottom: 6 }}>Lebensstil</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {persona.lebensstil.map(l => <span key={l} style={{ padding: "3px 10px", borderRadius: 12, background: "#f0e8f6", color: "#7B3FA0", fontSize: 11, fontWeight: 600 }}>{l}</span>)}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 12, padding: "20px 24px", marginBottom: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
              <Label>Forschungsthema</Label>
              <div style={{ fontSize: 15, color: C.text, lineHeight: 1.5 }}>{topic}</div>
            </div>

            {!simulating && results.length === 0 && !error && (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <button onClick={() => { runSimulation(); setStep(6); }} style={{
                  background: `linear-gradient(135deg, ${C.blue}, ${C.blueDark})`,
                  border: "none", color: "#fff", padding: "15px 48px", borderRadius: 8,
                  fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
                  letterSpacing: "0.04em", boxShadow: `0 6px 24px ${C.blue}50`, transition: "all 0.2s",
                }}>
                  Simulation starten →
                </button>
                <div style={{ marginTop: 10, fontSize: 12, color: C.textLight }}>Startet {sampleSize} parallele KI-Befragungen</div>
              </div>
            )}
            {error && <div style={{ color: C.pink, padding: "14px 18px", border: `1px solid ${C.pink}30`, borderRadius: 8, fontSize: 13, background: C.pinkLight }}>{error}</div>}
          </div>
        )}

        {/* ── STEP 5: Ergebnisse ── */}
        {step === 6 && (
          <div>
            {simulating && (
              <div style={{ background: C.navy, border: `1px solid ${C.navyMid}`, borderRadius: 12, padding: "28px 32px", marginBottom: 28, boxShadow: `0 4px 24px ${C.navy}60` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: C.blue, animation: "simPulse 1s infinite", flexShrink: 0 }} />
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>KI befragt synthetische Respondenten…</div>
                  </div>
                  <div style={{ fontSize: 14, color: C.blue, fontWeight: 700 }}>{results.length} / {sampleSize}</div>
                </div>
                <div style={{ height: 8, background: "#1a3550", borderRadius: 4, overflow: "hidden", marginBottom: 20 }}>
                  <div style={{ height: "100%", width: `${smoothProgress}%`, background: `linear-gradient(90deg, ${C.blue}, ${C.pink})`, borderRadius: 4, transition: "width 0.08s linear", boxShadow: `0 0 12px ${C.blue}80` }} />
                </div>
                {results.slice(-3).map((r, i) => (
                  <div key={i} style={{ padding: "10px 16px", background: "rgba(255,255,255,0.05)", borderRadius: 8, border: "1px solid rgba(255,255,255,0.08)", display: "flex", gap: 12, alignItems: "center", fontSize: 13, marginBottom: 6 }}>
                    <span style={{ color: "#4a8fc4", minWidth: 72, fontWeight: 600 }}>Person {r.id}</span>
                    <span style={{ padding: "2px 10px", borderRadius: 12, background: sentBg(r.sentiment), color: sentColor(r.sentiment), fontSize: 11, fontWeight: 700 }}>{r.sentiment}</span>
                    <span style={{ color: "#7eb8d8" }}>Score {r.nps}/10</span>
                  </div>
                ))}
                <style>{`@keyframes simPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(1.4)} }`}</style>
              </div>
            )}

            {results.length > 0 && (
              <>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28, gap: 16, flexWrap: "wrap" }}>
                  <div>
                    <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: C.text, letterSpacing: "-0.02em" }}>Ergebnisse</h1>
                    <p style={{ margin: "4px 0 0", fontSize: 13, color: C.textMid }}>{results.length} Respondenten · {persona.label} · {topic}</p>
                  </div>
                  {/* Export Buttons */}
                  <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                    {[
                      { type: "csv", label: "CSV", icon: "⬇" },
                      { type: "pdf", label: "PDF", icon: "⬇" },
                      { type: "pptx", label: "PPTX", icon: "⬇" },
                    ].map(btn => (
                      <button key={btn.type} onClick={() => handleExport(btn.type)} disabled={!!exporting}
                        style={{
                          padding: "9px 18px", borderRadius: 7, border: `1px solid ${C.border}`,
                          background: exporting === btn.type ? C.blueLight : C.bg,
                          color: exporting === btn.type ? C.blue : C.textMid,
                          cursor: exporting ? "wait" : "pointer", fontSize: 12, fontFamily: "inherit", fontWeight: 600,
                          display: "flex", alignItems: "center", gap: 6, transition: "all 0.15s",
                          boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                        }}>
                        {exporting === btn.type ? "…" : btn.icon} {btn.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* KPIs */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 28 }}>
                  <KpiCard label="Ø NPS Score" value={avgNps} unit="/10" color={C.blue} bg={C.blueLight} border={`${C.blue}30`} />
                  <KpiCard label="Positiv" value={sentimentCounts["positiv"] || 0} unit={`/${results.length}`} color={C.green} bg={C.greenLight} border="#16a34a30" />
                  <KpiCard label="Neutral" value={sentimentCounts["neutral"] || 0} unit={`/${results.length}`} color={C.amber} bg={C.amberLight} border="#d9770630" />
                  <KpiCard label="Negativ" value={sentimentCounts["negativ"] || 0} unit={`/${results.length}`} color={C.pink} bg={C.pinkLight} border={`${C.pink}30`} />
                </div>

                {/* NPS Visualization */}
                <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 12, padding: "20px 24px", marginBottom: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                  <Label>{themaKategorie ? themaKategorie.split(" ")[0] + "-Bewertung" : "Bewertungsverteilung"}</Label>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 8 }}>
                    {results.map(r => (
                      <div key={r.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ fontSize: 11, color: C.textLight, minWidth: 72 }}>#{r.id} · {r.sentiment.slice(0,3)}</div>
                        <div style={{ flex: 1, height: 10, background: C.borderLight, borderRadius: 5, overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${r.nps * 10}%`, borderRadius: 5, background: r.nps >= 7 ? C.green : r.nps >= 5 ? C.blue : C.pink, transition: "width 1s ease" }} />
                        </div>
                        <div style={{ fontSize: 11, fontWeight: 700, color: C.text, minWidth: 36, textAlign: "right" }}>{r.nps}/10</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Executive Summary */}
                {(summary || loadingSummary) && (
                  <div style={{ background: C.navy, borderRadius: 12, padding: "24px 28px", marginBottom: 24, boxShadow: `0 4px 20px ${C.navy}40` }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                      <div style={{ width: 28, height: 28, borderRadius: 6, background: C.blue, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 14 }}>✦</div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: C.blue, letterSpacing: "0.1em", textTransform: "uppercase" }}>Executive Summary</div>
                    </div>
                    {loadingSummary
                      ? <div style={{ color: "#4a8fc4", fontSize: 13 }}>KI analysiert und fasst zusammen…</div>
                      : <div style={{ fontSize: 14, lineHeight: "1.8", color: "#c8dff0", whiteSpace: "pre-wrap" }}>{summary}</div>
                    }
                  </div>
                )}

                {/* Individual Results */}
                <div style={{ marginBottom: 16 }}>
                  <Label>Einzelne Antworten ({results.length} Respondenten)</Label>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {results.map((r, ri) => (
                    <div key={ri} style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden", background: C.bg, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                      <div onClick={() => setExpandedCard(expandedCard === ri ? null : ri)}
                        style={{ padding: "14px 20px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", background: expandedCard === ri ? C.bgSoft : C.bg, transition: "background 0.15s" }}>
                        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                          <div style={{ width: 28, height: 28, borderRadius: "50%", background: C.blueLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: C.blue }}>{r.id}</div>
                          <span style={{ fontSize: 13, color: C.textMid, fontWeight: 500 }}>Respondent #{r.id}</span>
                          <span style={{ padding: "2px 10px", borderRadius: 12, background: sentBg(r.sentiment), color: sentColor(r.sentiment), fontSize: 11, fontWeight: 700 }}>{r.sentiment}</span>
                        </div>
                        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                          <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
                            {[...Array(10)].map((_, ni) => (
                              <div key={ni} style={{ width: 8, height: 8, borderRadius: 2, background: ni < r.nps ? C.blue : C.borderLight }} />
                            ))}
                          </div>
                          <span style={{ fontSize: 12, fontWeight: 700, color: C.blue }}>NPS {r.nps}</span>
                          <span style={{ color: C.textLight, fontSize: 12 }}>{expandedCard === ri ? "▲" : "▼"}</span>
                        </div>
                      </div>
                      {expandedCard === ri && (
                        <div style={{ padding: "18px 20px 18px 60px", borderTop: `1px solid ${C.borderLight}` }}>
                          {(r.answers || []).map((a, ai) => (
                            <div key={ai} style={{ marginBottom: ai < r.answers.length - 1 ? 16 : 0 }}>
                              <div style={{ fontSize: 11, fontWeight: 700, color: C.blue, marginBottom: 4, letterSpacing: "0.02em" }}>F{ai + 1}: {a.question}</div>
                              <div style={{ fontSize: 13, color: C.textMid, lineHeight: "1.65" }}>{a.answer}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: 28, display: "flex", gap: 10 }}>
                  <button onClick={() => { setStep(0); setResults([]); setSummary(""); setProgress(0); setPersona(personaType === "b2b" ? { ...EMPTY_PERSONA_B2B } : { ...EMPTY_PERSONA_B2C }); setTopic(""); setQuestions([""]); setPersonaMode("select"); setAuftraggeber({ ...EMPTY_AUFTRAGGEBER }); setAuftraggeberMode("select"); setGegenstand({ ...EMPTY_GEGENSTAND }); }}
                    style={{ padding: "11px 24px", borderRadius: 8, border: `1px solid ${C.border}`, background: C.bg, color: C.textMid, cursor: "pointer", fontSize: 13, fontFamily: "inherit", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
                    ↺ Neue Studie starten
                  </button>
                  <button onClick={() => { setStep(4); setResults([]); setSummary(""); setProgress(0); }}
                    style={{ padding: "11px 24px", borderRadius: 8, border: `1px solid ${C.blue}`, background: C.blueLight, color: C.blue, cursor: "pointer", fontSize: 13, fontFamily: "inherit", fontWeight: 600 }}>
                    ↻ Gleiche Persona, neue Fragen
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* ── Navigation ── */}
        {step < 5 && (
          <div style={{ marginTop: 48, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              {step > 0 && (
                <button onClick={() => setStep(step - 1)} style={{ background: "none", border: `1px solid ${C.border}`, color: C.textMid, padding: "11px 24px", borderRadius: 8, cursor: "pointer", fontSize: 13, fontFamily: "inherit" }}>← Zurück</button>
              )}
            </div>
            <button onClick={() => setStep(step + 1)} disabled={!canProceed()} style={{
              background: canProceed() ? `linear-gradient(135deg, ${C.blue}, ${C.blueDark})` : C.borderLight,
              border: "none", color: canProceed() ? "#fff" : C.textLight, padding: "12px 32px", borderRadius: 8,
              cursor: canProceed() ? "pointer" : "not-allowed", fontSize: 14, fontWeight: 700, letterSpacing: "0.03em",
              fontFamily: "inherit", transition: "all 0.2s", boxShadow: canProceed() ? `0 4px 18px ${C.blue}40` : "none",
            }}>Weiter →</button>
          </div>
        )}

        {step === 5 && results.length === 0 && !simulating && (
          <div style={{ marginTop: 16 }}>
            <button onClick={() => setStep(1)} style={{ background: "none", border: `1px solid ${C.border}`, color: C.textMid, padding: "11px 24px", borderRadius: 8, cursor: "pointer", fontSize: 13, fontFamily: "inherit" }}>← Zurück</button>
          </div>
        )}
      </div>

      <style>{`* { box-sizing: border-box; } input:focus { outline: 2px solid ${C.blue}40 !important; } input::placeholder { color: #b0bac5; } button:hover:not(:disabled) { opacity: 0.88; }`}</style>
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function ImageDropZone({ bilder, onChange }) {
  const [dragging, setDragging] = useState(false);

  const processFiles = (files) => {
    Promise.all(Array.from(files).filter(f => f.type.startsWith("image/")).map(f => new Promise(res => {
      const reader = new FileReader();
      reader.onload = ev => res({ name: f.name, data: ev.target.result });
      reader.readAsDataURL(f);
    }))).then(imgs => onChange([...bilder, ...imgs]));
  };

  return (
    <div>
      <label
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => { e.preventDefault(); setDragging(false); processFiles(e.dataTransfer.files); }}
        style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6,
          padding: "18px 14px", border: `2px dashed ${dragging ? C.pink : bilder.length > 0 ? C.pink : C.border}`,
          borderRadius: 8, cursor: "pointer", background: dragging ? C.pinkLight : bilder.length > 0 ? C.pinkLight : C.bgSoft,
          transition: "all 0.15s", minHeight: 80 }}>
        <input type="file" accept="image/*" multiple style={{ display: "none" }}
          onChange={e => processFiles(e.target.files)} />
        <span style={{ fontSize: 22 }}>{dragging ? "📂" : "🖼"}</span>
        <span style={{ fontSize: 12, color: bilder.length > 0 ? C.pink : C.textMid, textAlign: "center" }}>
          {bilder.length > 0
            ? `${bilder.length} Bild${bilder.length > 1 ? "er" : ""} geladen`
            : dragging ? "Loslassen zum Hochladen" : "Bilder hierher ziehen oder klicken"}
        </span>
      </label>
      {bilder.length > 0 && (
        <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
          {bilder.map((img, i) => (
            <div key={i} style={{ position: "relative" }}>
              <img src={img.data} alt={img.name} style={{ width: 64, height: 64, objectFit: "cover", borderRadius: 6, border: `1px solid ${C.border}` }} />
              <button onClick={() => onChange(bilder.filter((_, j) => j !== i))}
                style={{ position: "absolute", top: -6, right: -6, background: C.pink, border: "none", borderRadius: "50%", width: 18, height: 18, color: "#fff", cursor: "pointer", fontSize: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


function DiktierInput({ value, onChange, placeholder, accentColor = C.blue }) {
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    setSupported(!!SpeechRec);
  }, []);

  const toggleDiktieren = () => {
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRec) return;

    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }

    const rec = new SpeechRec();
    rec.lang = "de-DE";
    rec.continuous = true;
    rec.interimResults = false;
    rec.onresult = (e) => {
      const transcript = Array.from(e.results)
        .map(r => r[0].transcript)
        .join(" ");
      onChange(transcript);
    };
    rec.onerror = () => setListening(false);
    rec.onend = () => setListening(false);
    rec.start();
    recognitionRef.current = rec;
    setListening(true);
  };

  return (
    <div style={{ position: "relative" }}>
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ ...inputStyle(accentColor), paddingRight: supported ? 44 : 14 }}
      />
      {supported && (
        <button
          onClick={toggleDiktieren}
          title={listening ? "Diktat stoppen" : "Diktat starten"}
          style={{
            position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
            background: listening ? accentColor : "transparent",
            border: `1px solid ${listening ? accentColor : C.border}`,
            borderRadius: 6, width: 28, height: 28, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 14, transition: "all 0.2s",
            animation: listening ? "pulse 1.2s infinite" : "none",
          }}>
          {listening ? <span style={{ color: "#fff" }}>⏹</span> : <span style={{ color: C.textLight }}>🎙</span>}
        </button>
      )}
      <style>{`@keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.5; } }`}</style>
    </div>
  );
}


function AuftraggeberSaveBar({ auftraggeber, onSave }) {
  const [saved, setSaved] = useState(false);
  const handleSave = () => {
    onSave(auftraggeber);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };
  return (
    <div style={{ background: saved ? C.greenLight : C.bg, border: `1px solid ${saved ? C.green : C.border}`, borderRadius: 10, padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.04)", transition: "all 0.3s" }}>
      <div style={{ fontSize: 13, color: saved ? C.green : C.textMid, fontWeight: saved ? 600 : 400 }}>
        {saved ? "✓ Auftraggeber gespeichert!" : "✦ Auftraggeber für spätere Studien speichern"}
      </div>
      <button onClick={handleSave}
        style={{ padding: "8px 18px", borderRadius: 7, border: `1px solid ${saved ? C.green : C.blue}`, background: saved ? C.greenLight : C.blueLight, color: saved ? C.green : C.blue, cursor: "pointer", fontSize: 12, fontFamily: "inherit", fontWeight: 600, transition: "all 0.3s" }}>
        {saved ? "✓ Gespeichert" : "Auftraggeber generieren"}
      </button>
    </div>
  );
}


function StepHeader({ num, title, subtitle, accent }) {
  return (
    <div style={{ marginBottom: 36 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 6 }}>
        <div style={{ width: 34, height: 34, borderRadius: 8, background: accent, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 14, fontWeight: 800, flexShrink: 0 }}>{num}</div>
        <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: C.text, letterSpacing: "-0.02em" }}>{title}</h1>
      </div>
      <p style={{ margin: "0 0 0 48px", fontSize: 13, color: C.textMid }}>{subtitle}</p>
      <div style={{ marginTop: 22, height: 2, background: `linear-gradient(90deg, ${accent}, transparent)`, borderRadius: 1 }} />
    </div>
  );
}

function Label({ children }) {
  return <div style={{ fontSize: 10, letterSpacing: "0.12em", color: C.textLight, textTransform: "uppercase", fontWeight: 700, marginBottom: 10 }}>{children}</div>;
}

function Field({ label, value, onChange, placeholder }) {
  return (
    <div>
      <Label>{label}</Label>
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={inputStyle(C.blue)} />
    </div>
  );
}

function KpiCard({ label, value, unit, color, bg, border }) {
  return (
    <div style={{ padding: "20px", border: `1px solid ${border}`, borderRadius: 12, background: bg, textAlign: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
      <div style={{ fontSize: 34, fontWeight: 800, color, lineHeight: 1, marginBottom: 4 }}>
        {value}<span style={{ fontSize: 13, fontWeight: 400, color: C.textLight }}>{unit}</span>
      </div>
      <div style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: C.textLight, fontWeight: 600 }}>{label}</div>
    </div>
  );
}

function inputStyle(accent) {
  return {
    width: "100%", border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px",
    fontSize: 14, color: C.text, background: C.bg, fontFamily: "inherit",
    transition: "border-color 0.15s", outline: "none",
  };
}
