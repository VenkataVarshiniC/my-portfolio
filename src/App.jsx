import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import decisionMark from "./assets/hero.png";

const LINKS = {
  github: "https://github.com/VenkataVarshiniC",
  linkedin: "https://www.linkedin.com/in/venkata-varshini-chilukamarri-62b1782b7/",
  email: "mailto:venkatavarshinic@gmail.com",
  resume: "https://drive.google.com/file/d/1a8_gy6e4b5X58k-V0jyL2xGxjsFvqU30/view?usp=sharing",
};

const NAV = [["work", "Casework"], ["experience", "Experience"], ["involvement", "Involvement"], ["approach", "Approach"], ["credentials", "Credentials"], ["contact", "Contact"]];

const SNAPSHOTS = {
  Analyze: { eyebrow: "Find the signal", title: "Structure ambiguity into a decision.", body: "I frame the question, define the evidence, test the assumptions, and make the trade-offs visible.", tags: ["Requirements", "Market research", "KPI design", "Causal analysis"] },
  Build: { eyebrow: "Make it usable", title: "Turn analysis into a product.", body: "I package the work as a dashboard, scenario tool, decision engine, or executive-ready narrative.", tags: ["Product thinking", "Prototyping", "FastAPI", "React"] },
  Lead: { eyebrow: "Move the work forward", title: "Align people around the next step.", body: "I translate between stakeholders, analysts, and builders so recommendations survive beyond the presentation.", tags: ["Client leadership", "Facilitation", "Storytelling", "Delivery"] },
};

const PROJECTS = [
  {
    id: "pulse", order: "01", title: "PULSE", category: "Evidence product", filters: ["Product", "Business"], accent: "green",
    statement: "Post-release intelligence for reconstructing adoption, friction, remediation, and recovery.",
    question: "What actually happens across an open-source ecosystem after a dependency ships a consequential release?",
    analysis: "Compiles declarative cases into deterministic GitHub and PyPI collection plans with append-only evidence, provenance, and bounded candidate rules.",
    decision: "Unknown findings remain unknown until reviewed; the product prioritizes auditable evidence over automated certainty.",
    evidence: ["Immutable raw snapshots", "Human review checkpoints", "Generated forensic reports"],
    metrics: [["5", "release stages"], ["2", "source systems"], ["100%", "evidence traced"]],
    stack: ["Python", "Pydantic", "GitHub API", "pytest"], repo: "https://github.com/VenkataVarshiniC/pulse-ecosystem-release-forensics",
  },
  {
    id: "ledgerguard", order: "02", title: "LedgerGuard", category: "Product analytics", filters: ["Product", "Business"], accent: "amber",
    statement: "A BNPL decision platform that makes the tension between growth, risk, and profit explicit.",
    question: "How can a lender improve profitability without sacrificing an unacceptable amount of approval volume?",
    analysis: "Modeled 5,000 synthetic customers and 42,000 transactions, then compared threshold strategies with SHAP-backed risk scoring and sensitivity analysis.",
    decision: "The recommended break-even policy improves modeled profit by $149,217 while clearly showing the 10.75 percentage-point approval trade-off.",
    evidence: ["Product backlog + UAT criteria", "Scenario comparison dashboard", "Documented assumptions and risk controls"],
    metrics: [["$149K", "modeled improvement"], ["42K", "transactions"], ["90.2%", "loss concentration"]],
    stack: ["Python", "FastAPI", "SHAP", "Product analytics"], repo: "https://github.com/VenkataVarshiniC/BNPL-project",
    caveat: "Modeled result from synthetic data; not a realized lending outcome.",
  },
  {
    id: "ai-paradox", order: "03", title: "AI Adoption Paradox", category: "Strategy analytics", filters: ["Business", "AI"], accent: "violet",
    statement: "An enterprise AI ROI study that tests organizational capability—not spending—as the source of value.",
    question: "Why do large AI investments fail to translate into measurable enterprise value?",
    analysis: "Compared six models across a synthetic panel of 1,500 companies, then used SHAP and causal estimation to separate strong predictors from plausible levers.",
    decision: "Process redesign and executive alignment explain roughly 58% of modeled ROI variance; investment size explains less than 1%.",
    evidence: ["Six-model benchmark", "Capability-tier simulator", "Explainable prediction interface"],
    metrics: [["1,500", "companies"], ["0.886", "test R²"], ["58%", "modeled variance"]],
    stack: ["Python", "DoWhy", "SHAP", "React"], repo: "https://github.com/VenkataVarshiniC/AI-Paradox",
    caveat: "Synthetic research data; presented as a decision-framework demonstration.",
  },
  {
    id: "sdie", order: "04", title: "SDIE", category: "Decision product", filters: ["Product", "AI"], accent: "cyan",
    statement: "A strategic decision workspace where every recommendation traces to a calculation, weight, assumption, or source.",
    question: "How can a team combine quantitative decision analysis with evidence-grounded synthesis without hiding the logic?",
    analysis: "Connected financial modeling, MCDA, Monte Carlo analysis, evidence research, and recommendation synthesis through six bounded contexts.",
    decision: "The system exposes sensitivity and reversal thresholds so users can see what would need to change before a recommendation flips.",
    evidence: ["Six bounded contexts", "132 backend tests", "Deterministic computation boundary"],
    metrics: [["6", "decision modules"], ["132", "backend tests"], ["12/12", "sensitivity scenarios"]],
    stack: ["FastAPI", "PostgreSQL", "React", "Decision science"], repo: "https://github.com/VenkataVarshiniC/SDIE",
  },
  {
    id: "trust-gap", order: "05", title: "The Trust Gap", category: "Research", filters: ["AI", "Business"], accent: "rose",
    statement: "A study of why people over-trust AI and where that creates product and governance risk.",
    question: "Do users trust AI because it is correct—or because it looks confident and well sourced?",
    analysis: "Combined regression, classification, clustering, SHAP, causal estimation, sensitivity analysis, and Monte Carlo simulation across 1,000 interactions.",
    decision: "Presentation cues can outpace accuracy; product teams need calibration safeguards in high-stakes, low-verifiability domains.",
    evidence: ["Three causal estimators", "Four behavioral personas", "Expected Harm Index"],
    metrics: [["34%", "over-trusted"], ["1,000", "interactions"], ["+0.78", "citation effect"]],
    stack: ["Python", "DoWhy", "SHAP", "Responsible AI"], repo: "https://github.com/VenkataVarshiniC/AI-Human-trust",
    caveat: "Directional findings from a research dataset; limitations are documented in the repository.",
  },
];

const EXPERIENCES = [
  { id: "ta", dates: "Aug 2026 — Present", role: "Graduate Teaching Assistant", org: "University of Maryland · Robert H. Smith School of Business", type: "Systems analysis", summary: "Teaching assistant for BMGT 403: Systems Analysis and Design.", bullets: ["Guide students through requirements analysis, business-process modeling, and systems analysis.", "Support projects using Visible Analyst, data-flow diagrams, and structured system documentation.", "Help teams clarify ambiguous business needs and communicate analytical findings."], skills: ["Requirements", "Process modeling", "Stakeholder communication"] },
  { id: "global-consulting", dates: "Sep 2026 — Present", role: "Global Consultant Associate", org: "Maryland Global Consulting Program", type: "Product strategy", summary: "Partnering with International Transaction Advisory Group on its international B2B marketplace.", bullets: ["Conduct market and competitor research for an international marketplace opportunity.", "Translate findings into product positioning and go-to-market recommendations.", "Structure decision evidence for client and program stakeholders."], skills: ["Market research", "GTM strategy", "B2B product"] },
  { id: "impact", dates: "Jun 2026 — Aug 2026", role: "Team Lead — Client Workstream", org: "Impact Consulting Fellowship · Le Chic Miami", type: "Client leadership", summary: "Led a cross-functional team through an open-ended growth and positioning engagement.", bullets: ["Structured the problem into customer, competitive, positioning, and content workstreams.", "Combined customer discovery, market intelligence, and digital-performance analysis.", "Presented an actionable brand-growth framework directly to executive stakeholders."], skills: ["Team leadership", "Client management", "Strategy"] },
  { id: "xr", dates: "Apr 2026 — Present", role: "XR Creator", org: "XR Club @ UMD", type: "Product experimentation", summary: "Designing immersive experiences through user-centered prototyping and testing.", bullets: ["Collaborate across disciplines using AI-assisted tools and rapid prototyping.", "Iterate through user-centered design, testing, and product feedback."], skills: ["XR", "Rapid prototyping", "User testing"] },
];

const INVOLVEMENT = [
  { number: "01", type: "Professional development", dates: "Sep 2026 — Present", title: "McKinsey Forward", org: "McKinsey.org", summary: "Selected for a structured learning program focused on practical problem-solving, adaptive leadership, communication, and collaboration.", tags: ["Problem solving", "Leadership", "Communication"], accent: "violet" },
  { number: "02", type: "Community", dates: "May 2026 — Present", title: "Rewriting the Code", org: "Contributor", summary: "Building practical AI literacy through IBM SkillsBuild while participating in mentorship, workshops, networking, and industry opportunities.", tags: ["AI literacy", "Mentorship", "Community"], accent: "cyan" },
  { number: "03", type: "Competition & award", dates: "Mar 2026", title: "UMD XR Social Impact Buildfest", org: "1st Place · Do Good Institute", summary: "Co-built Cashocracy, an augmented-reality experience that turns campaign-finance and public datasets into intuitive, interactive visual insights.", tags: ["XR", "Social impact", "Data visualization"], accent: "green", featured: true },
];

const COURSEWORK = ["Database Management", "Python Analytics", "Digital Transformation", "AI for Business", "Project Management", "Business Process Analysis", "Decision Models in R", "Predictive Analytics", "Cloud & Big Data"];
const APPROACH = [["01", "Frame", "Name the user, decision, constraint, and success measure before touching the data."], ["02", "Measure", "Build an evidence plan that separates facts, assumptions, proxies, and unknowns."], ["03", "Decide", "Quantify trade-offs, pressure-test the recommendation, and make the reversal conditions visible."], ["04", "Deliver", "Turn the answer into a product, workflow, or narrative that someone can actually use."]];

function usePageSignals() {
  const [active, setActive] = useState("home");
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => { const total = document.documentElement.scrollHeight - window.innerHeight; setProgress(total > 0 ? (window.scrollY / total) * 100 : 0); };
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.isIntersecting && setActive(entry.target.id)), { rootMargin: "-35% 0px -55%", threshold: 0 });
    document.querySelectorAll("main section[id]").forEach(section => observer.observe(section));
    return () => { window.removeEventListener("scroll", onScroll); observer.disconnect(); };
  }, []);
  return { active, progress };
}

function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null); const [visible, setVisible] = useState(false);
  useEffect(() => { const node = ref.current; if (!node) return undefined; const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } }, { threshold: 0.12 }); observer.observe(node); return () => observer.disconnect(); }, []);
  return <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} ${className}`} style={{ "--delay": `${delay}s` }}>{children}</div>;
}

function Icon({ name }) {
  const paths = {
    arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>, external: <><path d="M15 4h5v5"/><path d="m10 14 10-10"/><path d="M20 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h6"/></>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41"/></>, moon: <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"/>, menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>, close: <><path d="m6 6 12 12M18 6 6 18"/></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>, copy: <><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></>,
  };
  return <svg aria-hidden="true" viewBox="0 0 24 24" className="icon">{paths[name]}</svg>;
}

function Header({ active, progress, theme, setTheme }) {
  const [open, setOpen] = useState(false);
  return <header className="site-header"><div className="scroll-progress" style={{ width: `${progress}%` }} /><nav className="nav shell" aria-label="Primary navigation">
    <a className="brand" href="#home" aria-label="Venkata Varshini Chilukamarri — home"><span>VV</span><i /></a>
    <div className={`nav-links ${open ? "is-open" : ""}`}>{NAV.map(([id, label]) => <a key={id} className={active === id ? "is-active" : ""} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>)}</div>
    <div className="nav-actions"><button className="icon-button" type="button" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}><Icon name={theme === "dark" ? "sun" : "moon"} /></button><a className="nav-cta" href={LINKS.resume} target="_blank" rel="noreferrer">Résumé <Icon name="external" /></a><button className="menu-button" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation"><Icon name={open ? "close" : "menu"} /></button></div>
  </nav></header>;
}

function Hero() {
  const [snapshot, setSnapshot] = useState("Analyze"); const current = SNAPSHOTS[snapshot];
  return <section id="home" className="hero shell">
    <div className="hero-copy">
      <Reveal><div className="status-line"><span className="status-dot" /> Open to Business Analyst · Product Analyst · Product roles</div></Reveal>
      <Reveal delay={0.06}><p className="hero-kicker">Venkata Varshini Chilukamarri</p><h1>I turn ambiguity into <em>decisions people can use.</em></h1></Reveal>
      <Reveal delay={0.12}><p className="hero-lede">Strategy, product thinking, and applied analytics—combined to frame the right question, surface the real trade-off, and move a team toward action.</p></Reveal>
      <Reveal delay={0.18} className="hero-actions"><a className="button primary" href="#work">Explore casework <Icon name="arrow" /></a><a className="button secondary" href={LINKS.linkedin} target="_blank" rel="noreferrer">LinkedIn <Icon name="external" /></a></Reveal>
      <Reveal delay={0.24} className="hero-proof"><div><strong>MS IS & AI</strong><span>UMD Smith · Dec 2026</span></div><div><strong>Terrapin Scholar</strong><span>Merit + leadership</span></div><div><strong>1st place</strong><span>UMD XR Buildfest</span></div></Reveal>
    </div>
    <Reveal delay={0.1} className="hero-stage-wrap"><div className="hero-stage"><div className="stage-glow"/><div className="orbit orbit-one"><span>Frame</span></div><div className="orbit orbit-two"><span>Measure</span></div><div className="decision-core"><img src={decisionMark} alt=""/><span>DECISION<br/>INTELLIGENCE</span></div><div className="stage-card"><div className="snapshot-tabs" role="tablist" aria-label="Recruiter snapshot">{Object.keys(SNAPSHOTS).map(key => <button key={key} role="tab" aria-selected={snapshot === key} className={snapshot === key ? "is-active" : ""} onClick={() => setSnapshot(key)}>{key}</button>)}</div><div className="snapshot-content" key={snapshot}><span>{current.eyebrow}</span><h2>{current.title}</h2><p>{current.body}</p><div className="tag-row">{current.tags.map(tag => <b key={tag}>{tag}</b>)}</div></div></div></div></Reveal>
  </section>;
}

function ProofStrip() { return <section className="proof-strip" aria-label="Portfolio summary"><div className="shell proof-grid"><div><span>01</span><strong>Business-first analysis</strong><p>Every project begins with a decision, not a model.</p></div><div><span>02</span><strong>Product-minded delivery</strong><p>Findings become tools, workflows, and clear next steps.</p></div><div><span>03</span><strong>Evidence with limits</strong><p>Assumptions, caveats, and reversal conditions stay visible.</p></div></div></section>; }

function ProjectExplorer() {
  const [filter, setFilter] = useState("All"); const [selectedId, setSelectedId] = useState(PROJECTS[0].id);
  const filtered = useMemo(() => PROJECTS.filter(project => filter === "All" || project.filters.includes(filter)), [filter]);
  const selected = filtered.find(project => project.id === selectedId) || filtered[0];
  return <section id="work" className="section shell">
    <Reveal className="section-heading split-heading"><div><span className="eyebrow">Selected casework</span><h2>Proof, not just projects.</h2></div><p>Choose a case to inspect the business question, analytical approach, decision, and evidence behind the recommendation.</p></Reveal>
    <Reveal delay={0.08} className="filter-bar" role="toolbar" aria-label="Filter case studies">{["All", "Product", "Business", "AI"].map(item => <button key={item} className={filter === item ? "is-active" : ""} onClick={() => setFilter(item)}>{item}</button>)}</Reveal>
    <div className="project-explorer"><div className="project-list" role="list">{filtered.map(project => <button key={project.id} role="listitem" className={`project-row ${selected.id === project.id ? "is-active" : ""}`} onClick={() => setSelectedId(project.id)}><span className={`project-index ${project.accent}`}>{project.order}</span><span className="project-name"><strong>{project.title}</strong><small>{project.category}</small></span><span className="project-summary">{project.statement}</span><Icon name="arrow" /></button>)}</div>
      <article className={`case-panel accent-${selected.accent}`} key={selected.id}><div className="case-topline"><span>{selected.category}</span><span>Case {selected.order}</span></div><h3>{selected.title}</h3><p className="case-statement">{selected.statement}</p><div className="metric-grid">{selected.metrics.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div><div className="case-story"><div><span>01 · Question</span><p>{selected.question}</p></div><div><span>02 · Analysis</span><p>{selected.analysis}</p></div><div><span>03 · Decision</span><p>{selected.decision}</p></div></div><div className="case-evidence"><span>Evidence package</span><ul>{selected.evidence.map(item => <li key={item}>{item}</li>)}</ul></div>{selected.caveat && <p className="case-caveat">{selected.caveat}</p>}<div className="case-footer"><div className="tag-row">{selected.stack.map(item => <b key={item}>{item}</b>)}</div><a href={selected.repo} target="_blank" rel="noreferrer">View repository <Icon name="external" /></a></div></article>
    </div>
  </section>;
}

function Experience() {
  const [selectedId, setSelectedId] = useState(EXPERIENCES[0].id); const selected = EXPERIENCES.find(item => item.id === selectedId);
  return <section id="experience" className="section experience-section"><div className="shell"><Reveal className="section-heading split-heading"><div><span className="eyebrow">Experience</span><h2>Where analysis meets people.</h2></div><p>Consulting, systems analysis, teaching, and product experimentation—connected by one habit: make complicated work easier to act on.</p></Reveal><div className="experience-layout"><Reveal className="timeline-nav">{EXPERIENCES.map(item => <button key={item.id} className={selectedId === item.id ? "is-active" : ""} onClick={() => setSelectedId(item.id)}><span>{item.dates}</span><strong>{item.role}</strong><small>{item.org}</small></button>)}</Reveal><Reveal delay={0.08} className="experience-card" key={selectedId}><div className="experience-label">{selected.type}</div><h3>{selected.role}</h3><p className="experience-org">{selected.org}</p><p className="experience-summary">{selected.summary}</p><ul>{selected.bullets.map(item => <li key={item}>{item}</li>)}</ul><div className="tag-row">{selected.skills.map(item => <b key={item}>{item}</b>)}</div></Reveal></div></div></section>;
}

function Involvement() {
  return <section id="involvement" className="section shell involvement-section"><Reveal className="section-heading split-heading"><div><span className="eyebrow">Involvement</span><h2>Learning, community, and impact.</h2></div><p>Programs and communities where I keep sharpening how I lead, collaborate, and build beyond the classroom and workplace.</p></Reveal><div className="involvement-grid">{INVOLVEMENT.map((item, index) => <Reveal key={item.title} delay={index * 0.06}><article className={`involvement-card accent-${item.accent} ${item.featured ? "is-featured" : ""}`}><div className="involvement-topline"><span>{item.number} · {item.type}</span><span>{item.dates}</span></div><div className="involvement-mark">{item.number}</div><h3>{item.title}</h3><strong>{item.org}</strong><p>{item.summary}</p><div className="tag-row">{item.tags.map(tag => <b key={tag}>{tag}</b>)}</div></article></Reveal>)}</div></section>;
}

function Approach() {
  const [active, setActive] = useState(0);
  return <section id="approach" className="section shell"><Reveal className="section-heading centered-heading"><span className="eyebrow">Operating system</span><h2>How I move from messy to useful.</h2><p>A repeatable path for business, product, and analytical problems.</p></Reveal><div className="approach-grid">{APPROACH.map(([num, title, body], index) => <Reveal key={title} delay={index * 0.05}><button className={`approach-card ${active === index ? "is-active" : ""}`} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} onClick={() => setActive(index)}><span>{num}</span><h3>{title}</h3><p>{body}</p><i /></button></Reveal>)}</div><Reveal className="approach-output"><span>Output</span><div className="output-line"><i style={{ width: `${25 * (active + 1)}%` }} /></div><strong>{["A clear decision frame", "A defensible evidence base", "A pressure-tested recommendation", "An artifact people can use"][active]}</strong></Reveal></section>;
}

function Credentials() {
  return <section id="credentials" className="section credentials-section"><div className="shell"><Reveal className="section-heading split-heading"><div><span className="eyebrow">Education & credentials</span><h2>Built on business and technology.</h2></div><p>Graduate training in information systems and AI, grounded in product delivery, business process design, and analytical decision-making.</p></Reveal><div className="credential-grid"><Reveal className="education-card"><span className="credential-label">Current education</span><h3>University of Maryland</h3><p>Robert H. Smith School of Business</p><strong>MS, Information Systems & Artificial Intelligence</strong><div className="education-meta"><span>Aug 2025 — Dec 2026</span><span>Terrapin Scholar</span></div><div className="course-cloud">{COURSEWORK.map(course => <span key={course}>{course}</span>)}</div></Reveal><div className="recognition-stack"><Reveal className="award-card award-primary" delay={0.06}><span>01 · Scholarship</span><h3>Terrapin Scholar</h3><p>Merit-based recognition for academic excellence and leadership potential in the Smith School’s MS program.</p><b>Robert H. Smith School of Business</b></Reveal><Reveal className="award-card compact-award" delay={0.12}><span>02 · Foundation</span><h3>BTech, Information Technology</h3><p>Keshav Memorial Institute of Technology · 2021–2025</p></Reveal></div></div><Reveal className="credential-line"><span>Selected credentials</span><div>IBM Project Management</div><i/><div>HackerRank SQL Advanced</div><i/><div>BCG Strategy Consulting Simulation</div></Reveal></div></section>;
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const copyEmail = async () => { try { await navigator.clipboard.writeText("venkatavarshinic@gmail.com"); setCopied(true); window.setTimeout(() => setCopied(false), 1800); } catch { window.location.href = LINKS.email; } };
  return <section id="contact" className="contact-section"><div className="shell contact-grid"><Reveal><span className="eyebrow">Let’s connect</span><h2>Have a hard question?<br/><em>Let’s make it answerable.</em></h2></Reveal><Reveal delay={0.08} className="contact-copy"><p>I’m exploring Business Analyst, Product Analyst, and Product Management opportunities where structured problem-solving and clear decisions matter.</p><div className="contact-actions"><a className="button primary" href={LINKS.email}>Start a conversation <Icon name="mail" /></a><button className="button secondary" onClick={copyEmail}>{copied ? "Email copied" : "Copy email"} <Icon name="copy" /></button></div><div className="social-row"><a href={LINKS.linkedin} target="_blank" rel="noreferrer">LinkedIn <Icon name="external" /></a><a href={LINKS.github} target="_blank" rel="noreferrer">GitHub <Icon name="external" /></a><a href={LINKS.resume} target="_blank" rel="noreferrer">Résumé <Icon name="external" /></a></div></Reveal></div><footer className="shell footer"><span>© 2026 Venkata Varshini Chilukamarri</span><span>Strategy · Product · Decision Science</span><a href="#home">Back to top ↑</a></footer></section>;
}

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("portfolio-theme") || "dark"); const { active, progress } = usePageSignals();
  useEffect(() => { document.documentElement.dataset.theme = theme; localStorage.setItem("portfolio-theme", theme); }, [theme]);
  return <><a className="skip-link" href="#work">Skip to casework</a><Header active={active} progress={progress} theme={theme} setTheme={setTheme}/><main><Hero/><ProofStrip/><ProjectExplorer/><Experience/><Involvement/><Approach/><Credentials/><Contact/></main></>;
}
