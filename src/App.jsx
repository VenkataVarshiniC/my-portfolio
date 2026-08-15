import { useEffect, useRef, useState } from "react";
import "./App.css";
import ContactWallet from "./Contactwallet";
import Cursor from "./Cursor";

// Swap these paths for your actual filenames if different.
import linkedinPost1 from "./assets/Link1.png";
import linkedinPost2 from "./assets/BuildFest.png";

/* ══════════════════════════════════════════════════════════
   DATA — sourced from resume, edit freely
   ══════════════════════════════════════════════════════════ */
const LINKS = {
  github: "https://github.com/VenkataVarshiniC",
  linkedin: "https://www.linkedin.com/in/venkata-varshini-chilukamarri-62b1782b7/",
  portfolio: "https://varshini-dev.vercel.app/",
  email: "venkatavarshinic@gmail.com",
  phone: "+1 (862) 340-5578",
  resume: "https://drive.google.com/file/d/1a8_gy6e4b5X58k-V0jyL2xGxjsFvqU30/view?usp=sharing",
};

const NAV = [
  { id: "hero", label: "Home", num: "00" },
  { id: "about", label: "About", num: "01" },
  { id: "experience", label: "Experience", num: "02" },
  { id: "work", label: "Work", num: "03" },
  { id: "research", label: "Research", num: "04" },
  { id: "stack", label: "Stack", num: "05" },
  { id: "network", label: "Network", num: "06" },
  { id: "console", label: "Console", num: "07" },
  { id: "recognition", label: "Recognition", num: "08" },
  { id: "contact", label: "Contact", num: "09" },
];

const TICKER = [
  "business analyst → strategy & decision science",
  "role → Business Analyst",
  "status → Open to Full-time, Internships",
  "gpa → 3.4 / 4.0 · Robert H. Smith School of Business, University of Maryland",
  "building → AI-powered solutions, data-driven insights, strategic decisions",
];

const EXPERIENCE = {
  org: "Impact Consulting Fellowship",
  role: "Team Lead — Strategy & Client Consulting",
  where: "Le Chic Miami · Remote",
  when: "June 2026 – August 2026",
  points: [
    "Walked into an open-ended brand-growth problem with no obvious starting point, and led a 4-member team to structure it into customer, competitive, positioning, and content workstreams — then wove the findings back into one coherent strategy.",
    "Sat down directly with the founder to dig past the pitch and find the real story behind the brand, turning scattered customer signals and competitive research into a sharper, more defensible positioning bet.",
    "Mined Shopify and Google Analytics data alongside qualitative research to catch audience patterns the numbers alone wouldn't reveal, converting them into concrete moves for customer engagement and content strategy.",
    "Designed a Brand Story Content Framework around Craftsmanship, Founder Story, Customer Community, and Lifestyle & Inspiration — a repeatable playbook the client could keep using to communicate what makes them different, long after the engagement ended.",
    "Carried the engagement end to end by coordinating the team, owning the client relationship, and distilling weeks of research into a clean, decision-ready strategy the founder could act on the same day it landed.",
  ],
  stack: ["Strategy Consulting", "Problem Structuring", "Market Research", "Data Analytics", "Competitive Intelligence", "Client Management"],
};

const PROJECTS = [
  {
    no: "01", title: "SDIE", sub: "Strategic Decision Intelligence Engine · full-stack decision science",
    accent: "violet",
    desc: "A platform that structures a strategic decision the way a case team does — not a chatbot, not a spreadsheet. Every recommendation traces back to a deterministic calculation or a cited source.",
    points: ["Six bounded contexts (Clean Architecture/DDD) spanning financial modeling, decision analysis, evidence research, and recommendation synthesis", "Monte Carlo simulation + robustness checks quantifying exactly how far an assumption must shift before a recommendation flips", "LLM restricted to prose only, never computation — validated by re-running Blockbuster's real 2000 Netflix decision and getting a 0.70/0.30 acquire recommendation"],
    stack: ["Python", "FastAPI", "PostgreSQL", "Next.js", "Clean Architecture/DDD"],
    gh: "https://github.com/VenkataVarshiniC/SDIE",
  },
  {
    no: "02", title: "The AI Adoption Paradox", sub: "Enterprise AI ROI Intelligence Platform · causal inference",
    accent: "cyan",
    desc: "McKinsey found only 6% of companies see real ROI from AI spend. I set out to find out why, with data instead of a hunch.",
    points: ["1,500-company synthetic dataset across 12 industries, every distribution calibrated to a published finding rather than a convenient assumption", "Random Forest (test R² = 0.886) selected across 6 models under 5-fold cross-validation, decomposed feature-by-feature with SHAP", "DoWhy causal backdoor adjustment isolates true effect from confounding correlation — process redesign quality causally drives +8.67% ROI, not investment size"],
    stack: ["Python", "scikit-learn", "XGBoost", "SHAP", "DoWhy", "React"],
    gh: "https://github.com/VenkataVarshiniC/AI-Paradox",
  },
  {
    no: "03", title: "Ledger", sub: "BNPL Portfolio Profitability & Risk Optimization",
    accent: "amber",
    desc: "BNPL lenders make money in a narrow margin between fee revenue and default losses. Most underwriting conversations only look at one side of that equation.",
    points: ["5,000-customer, 42,000-transaction synthetic portfolio with every default computed from a real risk logit — credit score, income, employment, category risk — not randomized", "Gradient-boosted risk model (AUC 0.70) with SHAP explainability behind every score", "Threshold-simulation engine tests every approval cutoff live, surfacing a $470K profit swing by repricing only the riskiest 5–15% of volume instead of tightening credit across the board"],
    stack: ["Python", "Pandas", "Gradient Boosting", "SHAP"],
    gh: "https://github.com/VenkataVarshiniC/BNPL-project",
  },
];

// Standalone research study — a companion piece to the AI Adoption Paradox project,
// pushing the same ROI-gap question down to the individual human-trust level.
const RESEARCH = {
  title: "AI-Human-trust",
  sub: "The Trust Gap: Why Calibrated Trust, Not Blind Adoption, Predicts AI Value Realization",
  tag: "Companion study · AI Adoption Paradox",
  summary:
    "People trust AI responses based on how they're presented — confident tone, cited sources — more than whether they're actually correct. This study pushes the Adoption Paradox's org-level ROI gap down to its individual-level mechanism: miscalibrated human trust.",
  dataset: "Human Trust Levels in AI Systems (Kaggle) · 1,000 logged interactions · 6 AI models · 12 query domains",
  findings: [
    "Citing sources causally increases trust by +0.78 points (0–10 scale), independent of accuracy — confirmed across 3 causal estimators and 3 refutation tests",
    "34% of interactions are 'over-trusted'; the effect is significantly amplified in low-verifiability domains (interaction p=0.008)",
    "Simple linear models outperform Random Forest and XGBoost — the underlying relationships are largely additive",
    "Four behavioral personas emerge from clustering; 'Confident Digital Natives' show the highest over-trust rate (48%) despite fact-checking every time",
    "Findings replicate five published 2024–2025 studies on algorithm aversion and AI trust calibration",
  ],
  methodology: [
    "Feature engineering & trust-zone classification",
    "Bootstrapped correlation + significance testing",
    "Random Forest regression/classification + SHAP",
    "OLS moderation / interaction analysis",
    "DoWhy causal inference (3 estimators, 3 refutations)",
    "K-means persona segmentation",
    "Composite Expected Harm Index",
    "5-threshold sensitivity sweep",
    "Fairness checks (chi-square)",
    "Monte Carlo dollar-cost simulation",
    "Model horse-race vs. baselines",
    "Power analysis (Cohen's f²)",
  ],
  stack: ["Python", "pandas", "scikit-learn", "XGBoost", "SHAP", "DoWhy", "statsmodels", "NumPy Monte Carlo"],
  deliverables: [
    "Trust_Gap_Analysis.ipynb — 21-section notebook, 73 cells, 11 charts",
    "trust_simulator.html — interactive risk simulator",
    "Trust_Gap_Policy_Brief.docx — one-page executive brief",
    "Trust_Gap_Summary_Slide.pptx — single-slide summary",
  ],
  gh: "https://github.com/VenkataVarshiniC/AI-Human-trust",
};

const STACK = [
  { cat: "Business & Strategy", accent: "violet", items: ["Problem Structuring", "Hypothesis-Driven Analysis", "Stakeholder Management", "Competitive Research", "Business Case Development", "Requirements Gathering"] },
  { cat: "Full-Stack & Architecture", accent: "cyan", items: ["Python", "FastAPI", "Next.js", "React", "PostgreSQL", "SQL", "Clean Architecture / DDD", "REST APIs"] },
  { cat: "AI / ML & Causal Inference", accent: "amber", items: ["Scikit-learn", "XGBoost", "SHAP", "DoWhy", "Predictive Modeling", "Generative AI", "Prompt Engineering"] },
  { cat: "Financial & Data Analytics", accent: "violet", items: ["Financial Modeling (DCF, NPV, IRR)", "Decision Analysis", "Excel", "Tableau", "Power BI", "A/B Testing"] },
  { cat: "Tools & Practices", accent: "cyan", items: ["Git / GitHub", "Agile", "Figma", "Pandas", "NumPy", "Jupyter"] },
];

// Real LinkedIn posts — tags pulled from each post's own hashtags, links go straight to the post.
const LINKEDIN_POSTS = [
  { img: linkedinPost1, tags: ["RewritingTheCode", "IBMSkillsBuild", "IBM"], url: "https://www.linkedin.com/posts/venkata-varshini-chilukamarri-62b1782b7_rewritingthecode-ibmskillsbuild-ibm-activity-7476668003766525953-AZFp" },
  { img: linkedinPost2, tags: ["XR", "Hackathon", "AugmentedReality"], url: "https://www.linkedin.com/posts/venkata-varshini-chilukamarri-62b1782b7_xr-hackathon-augmentedreality-activity-7449183448931532800-_2tz" },
];

const CERTS = [
  { t: "SQL (Advanced)", o: "HackerRank" },
  { t: "Project Management Fundamentals", o: "IBM" },
  { t: "AI Fundamentals: Foundations for Understanding AI", o: "IBM" },
  { t: "BCG — Introduction to Strategy Consulting Job Simulation", o: "Forage" },
  { t: "Career Essentials in Generative AI", o: "Microsoft & LinkedIn" },
  { t: "Spreadsheet Modeling", o: "Harvard Business Publishing" },
];

const ACHIEVEMENTS = [
  { t: "Terrapin Scholar", d: "Merit-based scholarship, MS Information Systems & AI — Robert H. Smith School of Business" },
  { t: "1st Place, UMD XR Social Impact Buildfest", d: "Cashocracy — AR app turning campaign finance data into interactive visuals, Do Good Institute" },
];

const ACCENT = {
  violet: { text: "text-[var(--violet)]", ring: "ring-[var(--violet)]/30", bg: "bg-[var(--violet)]/10", border: "border-[var(--violet)]/30", dot: "bg-[var(--violet)]" },
  cyan: { text: "text-[var(--cyan)]", ring: "ring-[var(--cyan)]/30", bg: "bg-[var(--cyan)]/10", border: "border-[var(--cyan)]/30", dot: "bg-[var(--cyan)]" },
  amber: { text: "text-[var(--amber)]", ring: "ring-[var(--amber)]/30", bg: "bg-[var(--amber)]/10", border: "border-[var(--amber)]/30", dot: "bg-[var(--amber)]" },
};

/* ══════════════════════════════════════════════════════════
   CONSOLE COMMANDS — driven entirely by this page's own data
   ══════════════════════════════════════════════════════════ */
function useConsoleCommands() {
  const cases = PROJECTS.map(p => ({
    slug: p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    ...p,
  }));

  const findCase = q => {
    if (!q) return null;
    const n = parseInt(q, 10);
    if (!Number.isNaN(n) && cases[n - 1]) return cases[n - 1];
    return cases.find(c => c.slug.includes(q.toLowerCase())) || null;
  };

  const run = raw => {
    const parts = raw.trim().split(/\s+/);
    const cmd = (parts[0] || "").toLowerCase();
    const arg = parts.slice(1).join(" ");

    switch (cmd) {
      case "":
        return [];
      case "help":
        return [
          "available commands:",
          "  help                 show this list",
          "  ls / cases           list case studies",
          "  whoami               about varshini",
          "  case <name|#>        pull up a full case walkthrough",
          "  research             show the trust-gap research study",
          "  framework mece       how I structure ambiguous problems",
          "  frame <question>     route any question through frame → test → recommend",
          "  stack                tools I actually use",
          "  experience           impact consulting fellowship",
          "  achievements         awards & recognition",
          "  certs                certifications",
          "  resume               open resume",
          "  contact              how to reach me",
          "  clear                clear the console",
        ];
      case "ls":
      case "cases":
        return cases.map((c, i) => `${i + 1}. ${c.slug.padEnd(28)} ${c.sub}`);
      case "whoami":
      case "about":
        return [
          "venkata varshini chilukamarri",
          "ms information systems & ai · robert h. smith school of business, umd",
          "terrapin scholar · targeting mckinsey ba / bain associate consultant roles",
          "status: open to full-time, internships",
        ];
      case "case": {
        if (!arg) return ["usage: case <sdie|ai-adoption-paradox|ledger>  or  case <#>"];
        const c = findCase(arg);
        if (!c) return [`no case found for "${arg}" — try 'ls'`];
        const header = `${c.title} — ${c.sub}`;
        return [
          header,
          "─".repeat(header.length),
          c.desc,
          ...c.points.map(p => `  · ${p}`),
          `stack: ${c.stack.join(", ")}`,
          `source: ${c.gh}`,
        ];
      }
      case "research": {
        const header = `${RESEARCH.title} — ${RESEARCH.sub}`;
        return [
          header,
          "─".repeat(Math.min(header.length, 72)),
          RESEARCH.summary,
          "",
          "key findings:",
          ...RESEARCH.findings.map(f => `  · ${f}`),
          "",
          `dataset: ${RESEARCH.dataset}`,
          `stack: ${RESEARCH.stack.join(", ")}`,
          `source: ${RESEARCH.gh}`,
        ];
      }
      case "framework":
        if (arg !== "mece") return [`no framework found for "${arg}" — try: framework mece`];
        return [
          "MECE — Mutually Exclusive, Collectively Exhaustive",
          "the lens I default to when a problem is still ambiguous:",
          "  1. do these branches overlap? they shouldn't.",
          "  2. is anything missing? there shouldn't be.",
          "if either answer is no, the framing isn't done yet.",
        ];
      case "frame":
        if (!arg) return ["usage: frame <a business question> — e.g. frame should we expand internationally"];
        return [
          `FRAME     ${arg}`,
          "STEP 1    break it into 3–4 MECE branches",
          "STEP 2    attach evidence to each branch, not intuition",
          "STEP 3    stress-test the weakest assumption first",
          "STEP 4    recommend, with a stated confidence level",
          "— this is the exact sequence SDIE runs programmatically. try: case sdie",
        ];
      case "stack":
        return STACK.flatMap(s => [`${s.cat}:`, `  ${s.items.join(", ")}`]);
      case "experience":
        return [`${EXPERIENCE.org} — ${EXPERIENCE.when}`, EXPERIENCE.role, ...EXPERIENCE.points.map(p => `  · ${p}`)];
      case "achievements":
        return ACHIEVEMENTS.map(a => `- ${a.t}: ${a.d}`);
      case "certs":
        return CERTS.map(c => `- ${c.t} (${c.o})`);
      case "resume":
        window.open(LINKS.resume, "_blank");
        return ["opening resume ↗"];
      case "contact":
        return [`email    → ${LINKS.email}`, `linkedin → ${LINKS.linkedin}`, `phone    → ${LINKS.phone}`];
      case "sudo":
        return ["permission denied: varshini is not in the sudoers file. (jk — try 'help')"];
      case "clear":
        return null;
      default:
        return [`command not found: ${cmd} — type 'help'`];
    }
  };

  return { run, cases };
}

/* ══════════════════════════════════════════════════════════
   HELPERS
   ══════════════════════════════════════════════════════════ */
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); o.disconnect(); } }, { threshold: 0.12 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${visible ? "in" : ""} ${className}`} style={{ transitionDelay: `${delay}s` }}>{children}</div>;
}

function Eyebrow({ num, children }) {
  return (
    <div className="flex items-center gap-3 font-mono text-xs tracking-[0.25em] text-[var(--muted)] uppercase">
      <span className="text-[var(--violet)]">{num}</span>
      <span className="h-px w-8 bg-[var(--border-hi)]" />
      {children}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   BACKDROP — animated gradient mesh + drifting grid
   ══════════════════════════════════════════════════════════ */
function Backdrop() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[var(--bg)]">
      <div className="absolute inset-0 bg-grid opacity-70" />
      {/* Ledger margin rule — echoes ruled stationery */}
      <div className="absolute inset-y-0 left-10 hidden w-px bg-[var(--amber)]/25 sm:block" />
      <div className="absolute inset-y-0 left-[46px] hidden w-px bg-[var(--border)] sm:block" />
      {/* Monogram watermark */}
      <div className="font-display pointer-events-none absolute -right-16 top-4 select-none text-[26rem] font-medium italic leading-none text-[var(--ink)] opacity-[0.03]">
        VC
      </div>
      <div className="animate-blob absolute -top-40 -left-40 h-[36rem] w-[36rem] rounded-full bg-[var(--indigo)]/18 blur-[130px]" />
      <div className="animate-blob-slow absolute top-1/3 -right-40 h-[30rem] w-[30rem] rounded-full bg-[var(--cyan)]/12 blur-[130px]" />
      <div className="animate-blob absolute bottom-0 left-1/4 h-[26rem] w-[26rem] rounded-full bg-[var(--amber)]/10 blur-[140px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--bg)]" />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   NAV
   ══════════════════════════════════════════════════════════ */
function Nav() {
  const [active, setActive] = useState("hero");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const y = window.scrollY + window.innerHeight * 0.35;
      let cur = "hero";
      NAV.forEach(n => { const el = document.getElementById(n.id); if (el && el.offsetTop <= y) cur = n.id; });
      setActive(cur);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = id => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setOpen(false); };

  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled ? "bg-[var(--bg)]/80 backdrop-blur-xl border-b border-[var(--border)]" : "bg-transparent"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <button onClick={() => goTo("hero")} className="font-display text-lg font-bold tracking-tight">
          VC<span className="text-[var(--violet)]">.</span>
        </button>
        <nav className="hidden lg:flex items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--surface)] px-2 py-1.5 backdrop-blur-xl">
          {NAV.map(n => (
            <button
              key={n.id}
              onClick={() => goTo(n.id)}
              className={`rounded-full px-4 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-all ${active === n.id ? "bg-white text-black" : "text-[var(--muted)] hover:text-[var(--ink)]"}`}
            >
              {n.label}
            </button>
          ))}
        </nav>
        <a href={LINKS.resume} target="_blank" rel="noreferrer" className="hidden lg:inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--violet)] to-[var(--indigo)] px-5 py-2 font-mono text-[11px] uppercase tracking-wider text-white shadow-lg shadow-[var(--indigo)]/25 transition-transform hover:scale-105">
          Resume ↗
        </a>
        <button onClick={() => setOpen(o => !o)} className="lg:hidden flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-[var(--border)]" aria-label="Menu">
          <span className={`h-px w-5 bg-[var(--ink)] transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`} />
          <span className={`h-px w-5 bg-[var(--ink)] transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`h-px w-5 bg-[var(--ink)] transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-[var(--border)] bg-[var(--bg)]/95 backdrop-blur-xl px-6 py-4">
          {NAV.map(n => (
            <button key={n.id} onClick={() => goTo(n.id)} className="flex w-full items-center justify-between border-b border-[var(--border)] py-3 font-mono text-sm uppercase tracking-wider text-[var(--muted)] last:border-0">
              {n.label}<span className="text-[var(--violet)]">{n.num}</span>
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

/* ══════════════════════════════════════════════════════════
   HERO
   ══════════════════════════════════════════════════════════ */
function Ticker() {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = TICKER[i];
    const speed = deleting ? 22 : 34;
    const t = setTimeout(() => {
      if (!deleting) {
        setText(full.slice(0, text.length + 1));
        if (text.length + 1 === full.length) setTimeout(() => setDeleting(true), 1400);
      } else {
        setText(full.slice(0, text.length - 1));
        if (text.length === 0) { setDeleting(false); setI(v => (v + 1) % TICKER.length); }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, deleting, i]);

  return (
    <>
      {text}<span className="animate-caret text-[var(--cyan)]">▍</span>
    </>
  );
}

function Hero() {
  const goTo = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const STATS = [
    ["3.4/4.0", "GPA"],
    ["4", "Flagship Builds"],
    ["Dec 2026", "Graduating"],
    ["70/30", "SDIE Verdict"],
  ];

  return (
    <section id="hero" className="relative flex min-h-screen items-center px-6 pt-28 pb-16">
      <div className="mx-auto w-full max-w-6xl">

        <Reveal>
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--violet)]">
            Open to Full-time & Internships
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <h1 className="font-display mt-4 text-5xl font-semibold leading-[1.05] text-[var(--ink)] sm:text-6xl lg:text-7xl">
            Varshini Chilukamarri
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-[var(--muted)]">
            MS Information Systems & AI candidate at UMD's Robert H. Smith School of Business.
            I turn messy business questions into defensible recommendations — financial models,
            causal analysis, and the decision engines behind them.
          </p>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={() => goTo("work")} className="rounded-full bg-gradient-to-r from-[var(--violet)] to-[var(--indigo)] px-6 py-3 font-mono text-xs uppercase tracking-wider text-white shadow-lg shadow-[var(--indigo)]/25 transition-transform hover:scale-105">
              See the Work →
            </button>
            <button onClick={() => goTo("contact")} className="rounded-full border border-[var(--border-hi)] px-6 py-3 font-mono text-xs uppercase tracking-wider text-[var(--ink)] transition-colors hover:border-[var(--violet)]/50 hover:text-[var(--violet)]">
              Get in Touch
            </button>
          </div>
        </Reveal>

        <Reveal delay={0.22} className="mt-16 grid grid-cols-2 gap-8 border-t border-[var(--border)] pt-8 sm:grid-cols-4">
          {STATS.map(([v, l]) => (
            <div key={l}>
              <div className="font-display text-3xl font-semibold text-[var(--ink)]">{v}</div>
              <div className="mt-1 font-mono text-xs uppercase tracking-wider text-[var(--muted-2)]">{l}</div>
            </div>
          ))}
        </Reveal>

      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   ABOUT
   ══════════════════════════════════════════════════════════ */
function About() {
  const PRINCIPLES = [
    ["Make the mess smaller", "Start with the question, break it into parts, figure out what actually matters."],
    ["Follow the evidence", "Numbers, assumptions, experiments, uncomfortable findings — I want to know what survives scrutiny."],
    ["Build only when useful", "I like technology, but I'm more interested in what it changes than how impressive it looks."],
    ["Make the answer usable", "A good analysis should eventually become a decision, recommendation, or next step."],
  ];

  return (
    <section id="about" className="relative px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <Eyebrow num="01">About</Eyebrow>
        </Reveal>

        <Reveal delay={0.06}>
          <h2 className="font-display mt-4 text-4xl font-bold sm:text-5xl">
            The person behind the commits
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-16 lg:grid-cols-[1.3fr_0.7fr]">

          {/* LEFT — STORY, editorial layout */}
          <Reveal delay={0.1} className="space-y-6">
            <p className="font-display text-2xl leading-relaxed text-[var(--ink)] sm:text-[1.65rem]">
              <span className="float-left mr-3 mt-1 font-display text-7xl font-medium italic leading-[0.8] text-[var(--violet)]">
                I
              </span>
              'm an MS Information Systems & AI candidate at the University of
              Maryland's Robert H. Smith School of Business, and a Terrapin
              Scholar. I came to graduate school knowing how to build things.
              What I wanted to figure out was something harder —{" "}
              <em className="not-italic text-[var(--violet)]">
                which things are actually worth building, and why.
              </em>
            </p>

            <p className="text-lg leading-relaxed text-[var(--muted)]">
              That question has become a bit of a pattern for me. I like
              taking problems that feel messy at first, organizing the chaos,
              finding the signal, and turning it into a decision. That's what
              led me to build SDIE, a decision-intelligence engine that re-ran
              Blockbuster's 2000 decision around Netflix — using only
              information that was publicly available at the time, the model
              recommended acquiring Netflix, with a 70/30 split.
            </p>

            <blockquote className="border-l-2 border-[var(--amber)] pl-6 font-display text-xl italic leading-relaxed text-[var(--ink)]">
              Taking a vague question, breaking it down until it becomes
              answerable, and making the answer defensible.
            </blockquote>

            <p className="text-lg leading-relaxed text-[var(--muted)]">
              I tend to build in that space between technology, analysis, and
              judgment. Sometimes that's an AI system. Sometimes it's a
              dashboard, a financial model, or a consulting framework. I've
              led consulting teams through open-ended client problems, shipped
              technical projects end to end, and contribute remotely to{" "}
              <b className="text-[var(--ink)]">Rewriting the Code</b>, while
              building my path toward strategy and business analysis roles
              where the problem is usually more interesting than the answer.
            </p>

            <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-[var(--border)] pt-6 font-mono text-[11px] uppercase tracking-wider text-[var(--muted-2)]">
              <span>MS IS & AI · UMD</span>
              <span>Terrapin Scholar</span>
              <span>B.Tech IT · KMIT</span>
              <span>Expected Dec 2026</span>
            </div>
          </Reveal>

          {/* RIGHT — HOW I THINK, unboxed hairline list */}
          <Reveal delay={0.18}>
            <div className="sticky top-28">
              <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--amber)]">
                How I tend to work
              </div>

              <div className="mt-6 divide-y divide-[var(--border)]">
                {PRINCIPLES.map(([t, d], i) => (
                  <div key={t} className="flex gap-4 py-5 first:pt-0">
                    <span className="font-display text-sm italic text-[var(--muted-2)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <div className="font-display text-lg font-semibold text-[var(--ink)]">
                        {t}
                      </div>
                      <p className="mt-1.5 text-sm leading-relaxed text-[var(--muted)]">
                        {d}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t border-[var(--border)] pt-5">
                <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--muted-2)]">
                  currently curious about
                </span>
                <p className="mt-2 font-display text-lg italic text-[var(--violet)]">
                  AI × Strategy × Decision Intelligence
                </p>
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   EXPERIENCE
   ══════════════════════════════════════════════════════════ */
function Experience() {
  return (
    <section id="experience" className="relative px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal><Eyebrow num="02">Experience</Eyebrow></Reveal>
        <Reveal delay={0.06}><h2 className="font-display mt-4 text-4xl font-bold sm:text-5xl">Led, delivered, adopted</h2></Reveal>

        <Reveal delay={0.12} className="mt-14 border-y border-[var(--border)] py-10">
          <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
            <div>
              <div className="font-mono text-xs uppercase tracking-wider text-[var(--amber)]">{EXPERIENCE.when}</div>
              <div className="font-display mt-3 text-2xl font-semibold text-[var(--ink)]">{EXPERIENCE.org}</div>
              <div className="mt-1 text-sm text-[var(--muted)]">{EXPERIENCE.role}</div>
              <div className="mt-1 text-sm text-[var(--muted-2)]">{EXPERIENCE.where}</div>
              <a href={LINKS.linkedin} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider text-[var(--violet)] transition-transform hover:translate-x-1">
                Connect on LinkedIn ↗
              </a>
            </div>
            <div>
              <ul className="space-y-4">
                {EXPERIENCE.points.map(p => (
                  <li key={p} className="flex gap-3 text-[var(--muted)]">
                    <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-[var(--amber)]" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-x-1 gap-y-1 border-t border-[var(--border)] pt-5 font-mono text-[11px] text-[var(--muted-2)]">
                {EXPERIENCE.stack.map((s, i) => (
                  <span key={s}>
                    {s}
                    {i < EXPERIENCE.stack.length - 1 && (
                      <span className="mx-2 text-[var(--border-hi)]">/</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   WORK / PROJECTS
   ══════════════════════════════════════════════════════════ */
function ProjectCard({ p, i }) {
  const a = ACCENT[p.accent];
  return (
    <Reveal delay={i * 0.06}>
      <div className="group flex h-full flex-col rounded-sm border border-[var(--border)] bg-[var(--surface-hi)] p-8 shadow-[var(--card-shadow)] transition-transform duration-300 hover:-translate-y-1">
        <div className="flex items-baseline justify-between border-b border-[var(--border)] pb-4">
          <span className={`font-display text-2xl italic ${a.text}`}>{p.no}</span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--muted-2)]">Exhibit</span>
        </div>
        <h3 className="font-display mt-5 text-2xl font-semibold text-[var(--ink)]">{p.title}</h3>
        <p className={`mt-1 font-mono text-xs uppercase tracking-wide ${a.text}`}>{p.sub}</p>
        <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">{p.desc}</p>
        <ul className="mt-4 flex-1 space-y-2.5">
          {p.points.map(pt => (
            <li key={pt} className="flex gap-2.5 text-sm text-[var(--muted)]">
              <span className="mt-2 h-[3px] w-[3px] shrink-0 rounded-full bg-[var(--muted-2)]" />
              <span>{pt}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-x-1 gap-y-1 border-t border-[var(--border)] pt-5 font-mono text-[10px] text-[var(--muted-2)]">
          {p.stack.map((s, idx) => (
            <span key={s}>
              {s}
              {idx < p.stack.length - 1 && <span className="mx-1.5 text-[var(--border-hi)]">/</span>}
            </span>
          ))}
        </div>
        <a href={p.gh} target="_blank" rel="noreferrer" className={`mt-5 inline-flex items-center gap-1 font-mono text-xs ${a.text} transition-transform hover:translate-x-1`}>
          View source ↗
        </a>
      </div>
    </Reveal>
  );
}

function Work() {
  return (
    <section id="work" className="relative px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal><Eyebrow num="03">Work</Eyebrow></Reveal>
        <Reveal delay={0.06}><h2 className="font-display mt-4 text-4xl font-bold sm:text-5xl">Three questions, answered properly</h2></Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p, i) => <ProjectCard key={p.no} p={p} i={i} />)}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   RESEARCH — standalone study, distinct from shipped Work
   ══════════════════════════════════════════════════════════ */
function Research() {
  return (
    <section id="research" className="relative px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal><Eyebrow num="04">Research</Eyebrow></Reveal>
        <Reveal delay={0.06}>
          <h2 className="font-display mt-4 text-4xl font-bold sm:text-5xl">A study, not a shipped product</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 max-w-2xl text-[var(--muted)]">{RESEARCH.tag}</p>
        </Reveal>

        <Reveal delay={0.14} className="mt-12 rounded-sm border border-[var(--border)] bg-[var(--surface-hi)] p-8 shadow-[var(--card-shadow)] sm:p-10">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">

            {/* LEFT — title, summary, findings */}
            <div>
              <h3 className="font-display text-3xl font-semibold text-[var(--ink)] sm:text-4xl">
                {RESEARCH.title}
              </h3>
              <p className="mt-1 font-mono text-xs uppercase tracking-wide text-[var(--violet)]">
                {RESEARCH.sub}
              </p>
              <p className="mt-5 text-[15px] leading-relaxed text-[var(--muted)]">
                {RESEARCH.summary}
              </p>

              <div className="mt-8 border-t border-[var(--border)] pt-6">
                <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--amber)]">
                  Key findings
                </div>
                <ul className="mt-4 space-y-3">
                  {RESEARCH.findings.map((f, i) => (
                    <li key={f} className="flex gap-3 text-sm leading-relaxed text-[var(--muted)]">
                      <span className="font-mono text-xs text-[var(--muted-2)]">{String(i + 1).padStart(2, "0")}</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 border-t border-[var(--border)] pt-6">
                <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--cyan)]">Dataset</div>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{RESEARCH.dataset}</p>
              </div>
            </div>

            {/* RIGHT — methodology, stack, deliverables */}
            <div className="lg:border-l lg:border-[var(--border)] lg:pl-10">
              <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--violet)]">
                Methodology
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {RESEARCH.methodology.map(m => (
                  <span key={m} className="rounded-full border border-[var(--border-hi)] px-3 py-1 text-xs text-[var(--muted)]">
                    {m}
                  </span>
                ))}
              </div>

              <div className="mt-8">
                <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--amber)]">Stack</div>
                <div className="mt-3 flex flex-wrap gap-x-1 gap-y-1 font-mono text-[11px] text-[var(--muted-2)]">
                  {RESEARCH.stack.map((s, idx) => (
                    <span key={s}>
                      {s}
                      {idx < RESEARCH.stack.length - 1 && <span className="mx-1.5 text-[var(--border-hi)]">/</span>}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--cyan)]">Deliverables</div>
                <ul className="mt-3 space-y-2">
                  {RESEARCH.deliverables.map(d => (
                    <li key={d} className="text-xs leading-relaxed text-[var(--muted)]">{d}</li>
                  ))}
                </ul>
              </div>

              <a href={RESEARCH.gh} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-1 border-t border-[var(--border)] pt-5 font-mono text-xs text-[var(--violet)] transition-transform hover:translate-x-1">
                View source ↗
              </a>
            </div>

          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   STACK / SKILLS
   ══════════════════════════════════════════════════════════ */
function Stack() {
  return (
    <section id="stack" className="relative px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal><Eyebrow num="05">Stack</Eyebrow></Reveal>
        <Reveal delay={0.06}><h2 className="font-display mt-4 text-4xl font-bold sm:text-5xl">What runs underneath</h2></Reveal>
        <div className="mt-14 divide-y divide-[var(--border)] border-y border-[var(--border)]">
          {STACK.map((s, i) => {
            const a = ACCENT[s.accent];
            return (
              <Reveal key={s.cat} delay={i * 0.05}>
                <div className="grid gap-3 py-7 sm:grid-cols-[220px_1fr] sm:items-baseline sm:gap-8">
                  <div className={`font-mono text-xs uppercase tracking-[0.2em] ${a.text}`}>{s.cat}</div>
                  <div className="text-[15px] leading-relaxed text-[var(--muted)]">
                    {s.items.map((it, idx) => (
                      <span key={it}>
                        {it}
                        {idx < s.items.length - 1 && (
                          <span className="mx-2.5 text-[var(--border-hi)]">·</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   NETWORK — the hand of cards, mimicking a real LinkedIn post
   ══════════════════════════════════════════════════════════ */
function Network() {
  const cards = [...LINKEDIN_POSTS, { seeMore: true }];
  const n = cards.length;
  const mid = (n - 1) / 2;
  return (
    <section id="network" className="relative px-6 py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <Reveal><Eyebrow num="06">Network</Eyebrow></Reveal>
        <Reveal delay={0.06}><h2 className="font-display mt-4 text-4xl font-bold sm:text-5xl">A hand from LinkedIn</h2></Reveal>

        <Reveal delay={0.12} className="relative mt-20 flex h-[360px] items-center justify-center sm:h-[400px]">
          {cards.map((p, i) => {
            const offset = i - mid;
            const rot = offset * 8;
            const tx = offset * 90;
            const ty = Math.abs(offset) * 16;
            return (
              <a
                key={i}
                href={p.seeMore ? LINKS.linkedin : p.url}
                target="_blank"
                rel="noreferrer"
                className="absolute flex h-[340px] w-[230px] cursor-pointer flex-col overflow-hidden rounded-2xl border border-[var(--border-hi)] bg-[var(--surface)] shadow-2xl shadow-black/50 backdrop-blur-xl transition-transform duration-300 ease-out sm:h-[360px] sm:w-[250px]"
                style={{ transform: `translate(${tx}px, ${ty}px) rotate(${rot}deg)`, zIndex: 10 - Math.abs(offset) }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = `translate(${tx}px, ${ty - 34}px) rotate(0deg) scale(1.07)`; e.currentTarget.style.zIndex = 50; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = `translate(${tx}px, ${ty}px) rotate(${rot}deg) scale(1)`; e.currentTarget.style.zIndex = 10 - Math.abs(offset); }}
              >
                {p.seeMore ? (
                  <div className="flex h-full flex-col items-center justify-center bg-gradient-to-b from-[var(--surface-hi)] to-[var(--surface)] text-center">
                    <div className="font-display text-3xl text-[var(--violet)]">↗</div>
                    <div className="mt-3 font-mono text-xs uppercase tracking-wider text-[var(--ink)]">See more on</div>
                    <div className="font-display text-lg font-bold text-[var(--violet)]">LinkedIn</div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-2 bg-[var(--surface-hi)] px-3 pt-3 pb-2.5">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--violet)] to-[var(--indigo)] font-display text-[11px] font-bold text-white">VC</div>
                      <div className="min-w-0 leading-tight">
                        <div className="truncate text-xs font-semibold text-[var(--ink)]">Venkata Varshini Chilukamarri</div>
                        <div className="font-mono text-[9px] text-[var(--muted-2)]">Business Analyst · 1st</div>
                      </div>
                      <svg viewBox="0 0 24 24" className="ml-auto h-4 w-4 shrink-0 fill-[#0A66C2]">
                        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" />
                      </svg>
                    </div>
                    <div className="flex flex-wrap gap-1 px-3 pb-2 font-mono text-[9px] text-[var(--cyan)]">
                      {p.tags.map((t) => (
                        <span key={t}>#{t}</span>
                      ))}
                    </div>
                    <div className="relative flex-1 overflow-hidden bg-[var(--bg)]">
                      <img src={p.img} alt="LinkedIn post" className="h-full w-full object-cover" />
                    </div>
                    <div className="flex items-center justify-between border-t border-[var(--border)] px-3 py-2.5 font-mono text-[10px] text-[var(--muted-2)]">
                      <span className="flex items-center gap-1">👍 Like</span>
                      <span className="flex items-center gap-1">💬 Comment</span>
                      <span className="flex items-center gap-1 text-[var(--cyan)]">View ↗</span>
                    </div>
                  </>
                )}
              </a>
            );
          })}
        </Reveal>

        <div className="mt-12 flex justify-center">
          <a href={LINKS.linkedin} target="_blank" rel="noreferrer" className="rounded-full bg-gradient-to-r from-[var(--violet)] to-[var(--indigo)] px-6 py-3 font-mono text-xs uppercase tracking-wider text-white shadow-lg shadow-[var(--indigo)]/25 transition-transform hover:scale-105">
            View Full Profile ↗
          </a>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   DECISION CONSOLE
   ══════════════════════════════════════════════════════════ */
function DecisionConsole() {
  const { run, cases } = useConsoleCommands();
  const [lines, setLines] = useState([
    { t: "sys", v: "decision console — type 'help' or tap an exhibit on the right" },
  ]);
  const [input, setInput] = useState("");
  const [hist, setHist] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  const exec = raw => {
    const cmd = raw.trim();
    if (!cmd) return;
    setLines(l => [...l, { t: "cmd", v: cmd }]);
    if (cmd.toLowerCase() === "clear") { setLines([]); setHist(h => [...h, cmd]); setHistIdx(-1); return; }
    const out = run(cmd);
    if (out && out.length) setLines(l => [...l, ...out.map(v => ({ t: "out", v }))]);
    setHist(h => [...h, cmd]);
    setHistIdx(-1);
  };

  const onSubmit = e => { e.preventDefault(); exec(input); setInput(""); };

  const onKeyDown = e => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!hist.length) return;
      const idx = histIdx === -1 ? hist.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(idx); setInput(hist[idx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx === -1) return;
      const idx = histIdx + 1;
      if (idx >= hist.length) { setHistIdx(-1); setInput(""); }
      else { setHistIdx(idx); setInput(hist[idx]); }
    }
  };

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [lines]);

  const EXHIBITS = [
    ...cases.map(c => [`case ${c.slug}`, c.sub]),
    ["research", "the trust gap — companion study"],
    ["framework mece", "how I structure a problem"],
    ["frame should we enter a new market", "run any question through the framework"],
    ["stack", "toolkit"],
    ["experience", "impact consulting fellowship"],
    ["resume", "open resume"],
    ["contact", "get in touch"],
  ];

  return (
    <section id="console" className="relative px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal><Eyebrow num="07">Console</Eyebrow></Reveal>
        <Reveal delay={0.06}>
          <h2 className="font-display mt-4 text-4xl font-bold sm:text-5xl">
            Skip the scrolling — run the case yourself
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 max-w-2xl text-[var(--muted)]">
            A live decision console — type a command, or tap an exhibit. Every answer pulls from a real
            project on this page: the framework, the data, and the recommendation it actually produced.
          </p>
        </Reveal>

        <Reveal delay={0.14} className="mt-12 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <div
            className="decision-console overflow-hidden rounded-2xl border border-[var(--border-hi)] bg-[var(--console-bg)] shadow-2xl shadow-black/40"
            onClick={() => inputRef.current?.focus()}
          >
            <div className="flex items-center gap-3 border-b border-[var(--console-border)] bg-[var(--console-header)] px-4 py-3">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--cyan)]">Exhibit</span>
              <span className="font-mono text-[11px] text-[var(--console-muted)]">varshini/decision-console</span>
            </div>
            <div ref={scrollRef} className="h-[380px] overflow-y-auto p-6 font-mono text-[13px] leading-relaxed sm:p-8">
              {lines.map((l, i) => (
                <div
                  key={i}
                  className={
                    l.t === "cmd"
                      ? "text-[var(--console-text)]"
                      : l.t === "sys"
                      ? "text-[var(--console-muted)]"
                      : "whitespace-pre-wrap text-[var(--console-muted)]"
                  }
                >
                  {l.t === "cmd" ? (
                    <>
                      <span className="text-[var(--cyan)]">›</span> {l.v}
                    </>
                  ) : (
                    l.v
                  )}
                </div>
              ))}
              <form onSubmit={onSubmit} className="mt-1 flex items-center gap-2">
                <span className="text-[var(--cyan)]">›</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  autoComplete="off"
                  spellCheck={false}
                  aria-label="Console command input"
                  className="flex-1 bg-transparent text-[var(--console-text)] outline-none"
                  placeholder="type a command…"
                />
                <span className="animate-caret text-[var(--cyan)]">▍</span>
              </form>
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 backdrop-blur-xl">
            <div className="font-mono text-xs uppercase tracking-wider text-[var(--violet)]">Case index</div>
            <div className="mt-4 space-y-2">
              {EXHIBITS.map(([c, d]) => (
                <button
                  key={c}
                  onClick={() => { exec(c); inputRef.current?.focus(); }}
                  className="flex w-full items-center justify-between gap-3 rounded-lg border border-transparent px-3 py-2 text-left transition-colors hover:border-[var(--border)] hover:bg-[var(--surface-hi)]"
                >
                  <span className="font-mono text-xs text-[var(--cyan)]">{c}</span>
                  <span className="text-right text-[11px] text-[var(--muted-2)]">{d}</span>
                </button>
              ))}
            </div>
            <a
              href={LINKS.github}
              target="_blank"
              rel="noreferrer"
              className="mt-5 flex items-center justify-between border-t border-[var(--border)] pt-4 font-mono text-[11px] text-[var(--muted-2)] transition-colors hover:text-[var(--violet)]"
            >
              view case repos on GitHub ↗
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   RECOGNITION — certs + achievements
   ══════════════════════════════════════════════════════════ */
function Recognition() {
  return (
    <section id="recognition" className="relative px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal><Eyebrow num="08">Recognition</Eyebrow></Reveal>
        <Reveal delay={0.06}><h2 className="font-display mt-4 text-4xl font-bold sm:text-5xl">Certified, and on record</h2></Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <Reveal delay={0.1}>
            <div className="font-mono text-xs uppercase tracking-wider text-[var(--violet)]">Certifications</div>
            <div className="mt-4 space-y-3">
              {CERTS.map((c, i) => (
                <div key={c.t} className="flex items-center gap-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 backdrop-blur-xl">
                  <div className="font-display flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--violet)]/10 text-xs font-bold text-[var(--violet)]">{String(i + 1).padStart(2, "0")}</div>
                  <div>
                    <div className="text-sm font-semibold text-[var(--ink)]">{c.t}</div>
                    <div className="text-xs text-[var(--muted)]">{c.o}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="font-mono text-xs uppercase tracking-wider text-[var(--cyan)]">Achievements</div>
            <div className="mt-4 space-y-3">
              {ACHIEVEMENTS.map((a, i) => (
                <div key={a.t} className="flex items-center gap-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 backdrop-blur-xl">
                  <div className="font-display flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--cyan)]/10 text-xs font-bold text-[var(--cyan)]">{String(i + 1).padStart(2, "0")}</div>
                  <div>
                    <div className="text-sm font-semibold text-[var(--ink)]">{a.t}</div>
                    <div className="text-xs text-[var(--muted)]">{a.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   CONTACT
   ══════════════════════════════════════════════════════════ */
function Contact() {
  const [msg, setMsg] = useState({ text: "", type: "" });

  const handleForm = e => {
    e.preventDefault();
    const n = e.target.fn.value.trim(), em = e.target.fe.value.trim(), m = e.target.fm.value.trim();
    if (!n || !em || !m) { setMsg({ text: "Please fill in all fields.", type: "err" }); return; }
    const subject = encodeURIComponent(`Portfolio contact — ${n}`);
    const body = encodeURIComponent(`${m}\n\n—\n${n}\n${em}`);
    window.location.href = `mailto:${LINKS.email}?subject=${subject}&body=${body}`;
    setMsg({ text: "✓ Opening your mail client — send when ready.", type: "ok" });
    setTimeout(() => setMsg({ text: "", type: "" }), 5000);
  };

  return (
    <section id="contact" className="relative px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal><Eyebrow num="09">Contact</Eyebrow></Reveal>
        <Reveal delay={0.06}><h2 className="font-display mt-4 text-4xl font-bold sm:text-5xl">Let's build something</h2></Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:items-center">
          <Reveal delay={0.1} className="flex flex-col items-center gap-10 md:flex-row md:items-center md:justify-center lg:justify-start lg:gap-14">
            <p className="max-w-xs text-lg text-[var(--muted)] text-center md:text-left">Currently looking for Business Analyst or Strategy Consulting internship and full-time opportunities. If you'd like to work together, or just say hi — reach out.</p>
            <ContactWallet />
          </Reveal>
          <Reveal delay={0.16}>
            <form onSubmit={handleForm} className="space-y-4 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 backdrop-blur-xl">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-wider text-[var(--muted-2)]">Name</label>
                  <input name="fn" placeholder="Your name" className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--bg)]/50 px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--violet)]/50" />
                </div>
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-wider text-[var(--muted-2)]">Email</label>
                  <input name="fe" type="email" placeholder="your@email.com" className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--bg)]/50 px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--violet)]/50" />
                </div>
              </div>
              <div>
                <label className="font-mono text-[10px] uppercase tracking-wider text-[var(--muted-2)]">Message</label>
                <textarea name="fm" rows="5" placeholder="Tell me about your project or opportunity..." className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--bg)]/50 px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--violet)]/50" />
              </div>
              {msg.text && <div className={`font-mono text-xs ${msg.type === "ok" ? "text-[var(--cyan)]" : "text-[var(--amber)]"}`}>{msg.text}</div>}
              <button type="submit" className="w-full rounded-full bg-gradient-to-r from-[var(--violet)] to-[var(--indigo)] py-3.5 font-mono text-xs uppercase tracking-wider text-white shadow-lg shadow-[var(--indigo)]/25 transition-transform hover:scale-[1.02]">
                Send via Mail →
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[var(--border)] px-6 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="font-mono text-[11px] text-[var(--muted-2)]">© 2026 Varshini Chilukamarri · built with intent</div>
        <div className="flex gap-6 font-mono text-[11px] uppercase tracking-wider text-[var(--muted)]">
          <a href={LINKS.github} target="_blank" rel="noreferrer" className="transition-colors hover:text-[var(--violet)]">GitHub</a>
          <a href={LINKS.linkedin} target="_blank" rel="noreferrer" className="transition-colors hover:text-[var(--violet)]">LinkedIn</a>
          <a href={`mailto:${LINKS.email}`} className="transition-colors hover:text-[var(--violet)]">Email</a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="relative min-h-screen">
      <Cursor />
      <Backdrop />
      <Nav />
      <Hero />
      <About />
      <Experience />
      <Work />
      <Research />
      <Stack />
      <Network />
      <DecisionConsole />
      <Recognition />
      <Contact />
      <Footer />
    </div>
  );
}