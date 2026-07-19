import { useEffect, useRef, useState } from "react";
import varshinImage from "./assets/varshini-image.jpeg";

/* ─── CSS injected globally ─── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#020409;
  --bg2:#04080f;
  --surface:rgba(255,255,255,0.025);
  --surface2:rgba(255,255,255,0.05);
  --border:rgba(255,255,255,0.07);
  --border2:rgba(100,180,255,0.25);
  --text:#e8f0ff;
  --text2:#7a90b8;
  --text3:#3a4a68;
  --accent:#38b2ff;
  --accent2:#b06fff;
  --accent3:#00e5b0;
  --accent4:#ff6b6b;
  --glow:rgba(56,178,255,0.12);
}
html{scroll-behavior:smooth}
body{
  background:var(--bg);
  color:var(--text);
  font-family:'Space Grotesk',sans-serif;
  overflow-x:hidden;
  cursor:none;
}

/* ── CURSOR ── */
#vv-cursor{
  position:fixed;width:10px;height:10px;
  background:var(--accent);border-radius:50%;
  pointer-events:none;z-index:9999;
  transform:translate(-50%,-50%);
  transition:width .25s,height .25s,background .25s;
  mix-blend-mode:screen;
}
#vv-ring{
  position:fixed;width:34px;height:34px;
  border:1px solid rgba(56,178,255,.45);
  border-radius:50%;pointer-events:none;z-index:9998;
  transform:translate(-50%,-50%);
  transition:width .3s,height .3s,border-color .3s;
}
body.hovered #vv-cursor{width:5px;height:5px}
body.hovered #vv-ring{width:50px;height:50px;border-color:rgba(56,178,255,.8)}

/* ── GRADIENT MESH BACKGROUND ── */
#mesh-bg{
  position:fixed;inset:0;z-index:0;pointer-events:none;overflow:hidden;
}
.mesh-blob{
  position:absolute;border-radius:50%;filter:blur(120px);
  opacity:0;animation:blob-in .8s ease forwards;
}
.mesh-blob-1{
  width:700px;height:700px;
  background:radial-gradient(ellipse,rgba(56,178,255,0.09) 0%,transparent 70%);
  top:-15%;left:-10%;
  animation:blob-drift-1 22s ease-in-out infinite, blob-in .8s ease forwards;
}
.mesh-blob-2{
  width:600px;height:600px;
  background:radial-gradient(ellipse,rgba(176,111,255,0.08) 0%,transparent 70%);
  top:20%;right:-8%;
  animation:blob-drift-2 28s ease-in-out infinite, blob-in .8s ease .2s forwards;
}
.mesh-blob-3{
  width:500px;height:500px;
  background:radial-gradient(ellipse,rgba(0,229,176,0.05) 0%,transparent 70%);
  bottom:10%;left:20%;
  animation:blob-drift-3 34s ease-in-out infinite, blob-in .8s ease .4s forwards;
}
.mesh-blob-4{
  width:400px;height:400px;
  background:radial-gradient(ellipse,rgba(56,178,255,0.06) 0%,transparent 70%);
  bottom:-5%;right:25%;
  animation:blob-drift-4 26s ease-in-out infinite, blob-in .8s ease .3s forwards;
}
.mesh-noise{
  position:absolute;inset:0;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
  opacity:0.4;
}
@keyframes blob-in{from{opacity:0}to{opacity:1}}
@keyframes blob-drift-1{
  0%,100%{transform:translate(0,0) scale(1)}
  33%{transform:translate(60px,-40px) scale(1.08)}
  66%{transform:translate(-30px,50px) scale(0.95)}
}
@keyframes blob-drift-2{
  0%,100%{transform:translate(0,0) scale(1)}
  40%{transform:translate(-50px,60px) scale(1.1)}
  70%{transform:translate(40px,-30px) scale(0.92)}
}
@keyframes blob-drift-3{
  0%,100%{transform:translate(0,0) scale(1)}
  30%{transform:translate(70px,30px) scale(1.06)}
  65%{transform:translate(-40px,-50px) scale(0.97)}
}
@keyframes blob-drift-4{
  0%,100%{transform:translate(0,0) scale(1)}
  45%{transform:translate(-60px,40px) scale(1.12)}
  75%{transform:translate(50px,-20px) scale(0.9)}
}

/* ── NAV ── */
nav{
  position:fixed;top:0;left:0;right:0;z-index:100;
  padding:1.25rem 4rem;
  display:flex;justify-content:space-between;align-items:center;
  transition:all .4s ease;
}
nav.scrolled{
  background:rgba(2,4,9,.88);
  backdrop-filter:blur(24px);
  border-bottom:1px solid var(--border);
}
.nav-logo{
  font-family:'Bebas Neue',sans-serif;
  font-size:1.6rem;letter-spacing:.12em;
  color:var(--text);text-decoration:none;
}
.nav-logo span{color:var(--accent)}
.nav-links{display:flex;gap:2.5rem;list-style:none}
.nav-links a{
  color:var(--text2);font-size:.8rem;
  text-decoration:none;letter-spacing:.1em;text-transform:uppercase;
  transition:color .3s;font-weight:500;
}
.nav-links a:hover{color:var(--accent)}
.nav-cta{
  padding:.45rem 1.4rem;
  border:1px solid var(--border2);border-radius:3px;
  color:var(--accent);font-size:.78rem;letter-spacing:.08em;text-transform:uppercase;
  text-decoration:none;transition:all .3s;
  background:rgba(56,178,255,.05);font-weight:600;
  font-family:'Space Mono',monospace;
}
.nav-cta:hover{background:rgba(56,178,255,.12);border-color:var(--accent)}

/* ── HERO ── */
#hero{
  min-height:100vh;display:flex;align-items:center;
  padding:0 4rem;position:relative;z-index:1;overflow:hidden;
}
.hero-inner{
  max-width:1200px;margin:0 auto;width:100%;
  display:grid;grid-template-columns:1fr 1fr;
  gap:4rem;align-items:center;padding-top:6rem;
}
.hero-tag{
  display:inline-flex;align-items:center;gap:.6rem;
  font-family:'Space Mono',monospace;
  font-size:.65rem;letter-spacing:.14em;text-transform:uppercase;
  color:var(--accent3);margin-bottom:1.8rem;
}
.hero-tag-dot{
  width:7px;height:7px;border-radius:50%;
  background:var(--accent3);
  animation:ping 2s cubic-bezier(0,0,.2,1) infinite;
}
@keyframes ping{
  0%{box-shadow:0 0 0 0 rgba(0,229,176,.6)}
  70%{box-shadow:0 0 0 10px rgba(0,229,176,0)}
  100%{box-shadow:0 0 0 0 rgba(0,229,176,0)}
}
.hero-name{
  font-family:'Bebas Neue',sans-serif;
  font-size:clamp(3rem,6vw,5.5rem);
  line-height:.95;letter-spacing:.04em;
  margin-bottom:1.2rem;
}
.hero-name .line{display:block;overflow:hidden}
.hero-name .word{
  display:inline-block;
  transform:translateY(100%);opacity:0;
  transition:transform .9s cubic-bezier(.16,1,.3,1),opacity .6s ease;
}
.hero-name .word.vis{transform:translateY(0);opacity:1}
.hero-name .grad{
  background:linear-gradient(135deg,var(--accent) 0%,var(--accent2) 100%);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
}
.hero-sub{
  font-size:clamp(.95rem,1.3vw,1.05rem);
  color:var(--text2);line-height:1.75;
  margin-bottom:1.6rem;font-weight:300;max-width:480px;
}
.hero-sub strong{color:var(--text);font-weight:500}
.role-pills{display:flex;gap:.5rem;flex-wrap:wrap;margin-bottom:2rem}
.rpill{
  padding:.28rem .9rem;border-radius:2px;
  font-size:.68rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;
  font-family:'Space Mono',monospace;
}
.rpill-pm{background:rgba(56,178,255,.1);color:var(--accent);border:1px solid rgba(56,178,255,.3)}
.rpill-da{background:rgba(0,229,176,.1);color:var(--accent3);border:1px solid rgba(0,229,176,.3)}
.rpill-ba{background:rgba(176,111,255,.1);color:var(--accent2);border:1px solid rgba(176,111,255,.3)}
.hero-btns{display:flex;gap:1rem;flex-wrap:wrap}
.btn-pri{
  padding:.75rem 2rem;
  background:linear-gradient(135deg,var(--accent),var(--accent2));
  border:none;border-radius:3px;
  color:#fff;font-size:.85rem;font-weight:600;
  text-decoration:none;cursor:none;
  transition:transform .3s,box-shadow .3s;
  font-family:'Space Grotesk',sans-serif;letter-spacing:.06em;text-transform:uppercase;
  box-shadow:0 0 30px rgba(56,178,255,.25);
}
.btn-pri:hover{transform:translateY(-2px);box-shadow:0 0 50px rgba(56,178,255,.45)}
.btn-sec{
  padding:.75rem 2rem;
  background:var(--surface2);border:1px solid var(--border);
  border-radius:3px;color:var(--text);font-size:.85rem;font-weight:500;
  text-decoration:none;cursor:none;transition:all .3s;
  font-family:'Space Grotesk',sans-serif;letter-spacing:.06em;text-transform:uppercase;
}
.btn-sec:hover{border-color:var(--border2)}

/* profile orb */
.hero-visual{
  display:flex;justify-content:center;align-items:center;position:relative;
}
.orb-wrap{position:relative;width:340px;height:340px}
.orb-ring{
  position:absolute;inset:0;border-radius:50%;
  border:1px solid rgba(56,178,255,.18);
  animation:spin 14s linear infinite;
}
.orb-ring2{
  position:absolute;inset:-24px;border-radius:50%;
  border:1px dashed rgba(176,111,255,.12);
  animation:spin 22s linear infinite reverse;
}
.orb-ring::after{
  content:'';position:absolute;top:-5px;left:50%;width:10px;height:10px;
  margin-left:-5px;border-radius:50%;
  background:var(--accent);box-shadow:0 0 16px var(--accent);
}
@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
.orb-glow{
  position:absolute;inset:0;border-radius:50%;
  background:radial-gradient(ellipse,rgba(56,178,255,.14) 0%,rgba(176,111,255,.07) 50%,transparent 75%);
  animation:breathe 5s ease-in-out infinite;
}
@keyframes breathe{0%,100%{transform:scale(1);opacity:.8}50%{transform:scale(1.1);opacity:1}}
.profile-circle{
  position:absolute;inset:40px;border-radius:50%;overflow:hidden;
  border:2px solid rgba(56,178,255,.35);
  box-shadow:0 0 60px rgba(56,178,255,.18),0 0 120px rgba(176,111,255,.1);
  animation:float 7s ease-in-out infinite;
  cursor:none;
  padding:0;
}
.profile-circle img{
  width:100%;
  height:100%;
  object-fit:cover;
  object-position:center top;
  display:block;
}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
.coord-tag{
  position:absolute;font-family:'Space Mono',monospace;
  font-size:.55rem;color:var(--text3);letter-spacing:.08em;
}
.coord-tag.tl{top:10px;left:10px}
.coord-tag.br{bottom:10px;right:10px}
.coord-tag.tr{top:10px;right:10px;color:var(--accent3)}

/* scroll hint */
.scroll-hint{
  position:absolute;bottom:2.5rem;left:50%;
  transform:translateX(-50%);
  display:flex;flex-direction:column;align-items:center;gap:.5rem;
  color:var(--text3);font-family:'Space Mono',monospace;font-size:.6rem;letter-spacing:.12em;text-transform:uppercase;z-index:1;
}
.scroll-line{
  width:1px;height:48px;
  background:linear-gradient(to bottom,var(--accent),transparent);
  animation:scroll-drop 2.2s ease-in-out infinite;
}
@keyframes scroll-drop{0%,100%{transform:scaleY(1);opacity:1}50%{transform:scaleY(.5);opacity:.5}}

/* ── SECTION SHARED ── */
section{position:relative;z-index:1}
.sec-label{
  font-family:'Space Mono',monospace;
  font-size:.62rem;letter-spacing:.18em;text-transform:uppercase;
  color:var(--accent);margin-bottom:.7rem;
  display:flex;align-items:center;gap:.6rem;
}
.sec-label::before{content:'';display:none}
.sec-title{
  font-family:'Bebas Neue',sans-serif;
  font-size:clamp(2.4rem,4vw,3.5rem);
  line-height:1;letter-spacing:.06em;margin-bottom:1.5rem;
}
.divider{width:40px;height:2px;background:linear-gradient(90deg,var(--accent),var(--accent2));margin-bottom:2rem}

/* reveal */
.reveal{opacity:0;transform:translateY(32px);transition:opacity .8s,transform .8s}
.reveal.vis{opacity:1;transform:translateY(0)}

/* ── ABOUT ── */
#about{padding:9rem 4rem}
.about-inner{
  max-width:1200px;margin:0 auto;
  display:grid;grid-template-columns:1fr 2.2fr;gap:6rem;align-items:center;
}
.about-img-wrap{
  position:relative;
  display:flex;
  justify-content:center;
  order:0;
}
.about-frame{
  width:350px;height:350px;border-radius:10px;overflow:hidden;
  border:1px solid rgba(56,178,255,.22);
  box-shadow:0 0 40px rgba(56,178,255,.12);
  animation:float 9s ease-in-out infinite;
  z-index:2;position:relative;
  padding:0;
  display:block;
}
.about-frame img{
  width:100%;
  height:100%;
  object-fit:cover;
  object-position:center top;
  display:block;
}
.about-deco{
  position:absolute;inset:-18px;border-radius:10px;
  border:1px solid rgba(56,178,255,.06);animation:float 9s ease-in-out infinite reverse;
}
.about-txt p{color:var(--text2);line-height:1.85;margin-bottom:1.2rem;font-size:.935rem;font-weight:300}
.about-txt p strong{color:var(--text);font-weight:500}
.stats-row{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin-top:2.5rem}
.stat-card{
  padding:1.2rem;background:var(--surface);
  border:1px solid var(--border);border-radius:4px;text-align:center;
  transition:border-color .3s,background .3s;
}
.stat-card:hover{border-color:var(--border2);background:var(--surface2)}
.stat-num{
  font-family:'Bebas Neue',sans-serif;font-size:2.4rem;letter-spacing:.04em;
  background:linear-gradient(135deg,var(--accent),var(--accent2));
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
}
.stat-lbl{font-size:.68rem;color:var(--text3);margin-top:.2rem;letter-spacing:.08em;font-family:'Space Mono',monospace}

/* ── PROJECTS ── */
#projects{padding:9rem 4rem}
.projects-wrap{max-width:1200px;margin:0 auto}
.sec-hdr{
  display:flex;justify-content:space-between;align-items:flex-end;
  flex-wrap:wrap;gap:1rem;margin-bottom:4rem;
}
.sec-hdr-sub{color:var(--text3);font-size:.8rem;max-width:260px;text-align:right;line-height:1.6;font-family:'Space Mono',monospace}
.projects-grid{display:flex;flex-direction:column;gap:2rem}
.pcard{
  background:var(--surface);border:1px solid var(--border);
  border-radius:6px;overflow:hidden;
  transition:border-color .4s,transform .4s,box-shadow .4s;cursor:none;
}
.pcard:hover{
  border-color:rgba(56,178,255,.28);
  transform:translateY(-3px);
  box-shadow:0 24px 64px rgba(56,178,255,.07);
}
.pcard-inner{display:grid;grid-template-columns:1fr 1fr;min-height:380px}
.pcard-inner.rev{direction:rtl}
.pcard-inner.rev>*{direction:ltr}
.pcard-info{padding:3rem}
.ptag{
  display:inline-block;padding:.28rem .85rem;border-radius:2px;
  font-size:.62rem;letter-spacing:.12em;text-transform:uppercase;
  margin-bottom:1.2rem;font-weight:600;font-family:'Space Mono',monospace;
}
.ptag-b{background:rgba(56,178,255,.1);color:var(--accent);border:1px solid rgba(56,178,255,.22)}
.ptag-p{background:rgba(176,111,255,.1);color:var(--accent2);border:1px solid rgba(176,111,255,.22)}
.ptag-g{background:rgba(0,229,176,.1);color:var(--accent3);border:1px solid rgba(0,229,176,.22)}
.ptitle{
  font-family:'Bebas Neue',sans-serif;
  font-size:2rem;letter-spacing:.04em;line-height:1.05;margin-bottom:1rem;
}
.pdesc{color:var(--text2);font-size:.855rem;line-height:1.75;margin-bottom:1.5rem;font-weight:300}
.pmetrics{display:flex;gap:1.5rem;flex-wrap:wrap;margin-bottom:1.5rem}
.pmetric{display:flex;flex-direction:column}
.pmetric-val{
  font-family:'Bebas Neue',sans-serif;font-size:1.6rem;letter-spacing:.04em;
  background:linear-gradient(135deg,var(--accent),var(--accent2));
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
}
.pmetric-lbl{font-size:.62rem;color:var(--text3);letter-spacing:.08em;margin-top:.1rem;font-family:'Space Mono',monospace}
.ptags{display:flex;gap:.45rem;flex-wrap:wrap}
.pcard-footer{margin-top:1.4rem;padding-top:1.2rem;border-top:1px solid var(--border)}
.case-study-link{
  display:inline-flex;align-items:center;gap:.4rem;
  color:var(--accent3);font-size:.82rem;font-weight:500;text-decoration:none;
  letter-spacing:.02em;transition:gap .3s,color .3s;cursor:none;
}
.case-study-link:hover{gap:.7rem;color:#5ff5c8}
.stag{
  padding:.28rem .72rem;background:rgba(255,255,255,.03);
  border:1px solid var(--border);border-radius:2px;
  font-size:.67rem;color:var(--text2);letter-spacing:.04em;
}
.pvisual{
  background:var(--bg2);
  display:flex;align-items:center;justify-content:center;
  position:relative;overflow:hidden;min-height:280px;
}
.pvisual-inner{padding:2rem;width:100%}

/* mini bar chart */
.mini-chart-title{font-family:'Space Mono',monospace;font-size:.6rem;color:var(--text3);letter-spacing:.1em;text-transform:uppercase;margin-bottom:1rem}
.bar-rows{display:flex;flex-direction:column;gap:.65rem}
.bar-row{display:flex;align-items:center;gap:.7rem}
.bar-lbl{font-size:.65rem;color:var(--text2);width:72px;flex-shrink:0;text-align:right;font-family:'Space Mono',monospace}
.bar-track{flex:1;height:5px;background:rgba(255,255,255,.04);border-radius:2px;overflow:hidden}
.bar-fill{height:100%;border-radius:2px;width:0;transition:width 1.4s cubic-bezier(.4,0,.2,1)}
.bar-val{font-size:.62rem;color:var(--text3);width:30px;font-family:'Space Mono',monospace}

/* kpi grid */
.kpi-grid{display:grid;grid-template-columns:1fr 1fr;gap:.75rem;padding:1.5rem}
.kpi-card{padding:1rem;background:rgba(255,255,255,.03);border:1px solid var(--border);border-radius:4px;text-align:center}
.kpi-val{font-family:'Bebas Neue',sans-serif;font-size:1.6rem;letter-spacing:.04em}
.kpi-lbl{font-size:.6rem;color:var(--text3);margin-top:.2rem;letter-spacing:.08em;font-family:'Space Mono',monospace}

/* flow */
.flow-diagram{display:flex;flex-direction:column;gap:.45rem;padding:1rem 1.5rem}
.flow-step{
  display:flex;align-items:center;gap:.7rem;
  padding:.55rem .85rem;border-radius:3px;
  border:1px solid var(--border);background:rgba(255,255,255,.02);
  font-size:.73rem;color:var(--text2);transition:all .3s;
}
.flow-step:hover{border-color:var(--border2);background:rgba(56,178,255,.04)}
.flow-dot{width:7px;height:7px;border-radius:50%;flex-shrink:0}
.flow-arrow{text-align:center;font-size:.58rem;color:var(--text3);margin:0 0 0 .5rem;font-family:'Space Mono',monospace}

/* ── CASE STUDY (SDIE) ── */
#sdie-case-study{padding:6rem 4rem 9rem}
.cs-inner{max-width:1080px;margin:0 auto;display:flex;flex-direction:column;gap:5rem}
.cs-header{max-width:760px}
.cs-eyebrow{font-family:'Space Mono',monospace;font-size:.65rem;letter-spacing:.16em;text-transform:uppercase;color:var(--accent2);margin-bottom:.8rem}
.cs-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(2rem,3.6vw,3rem);letter-spacing:.04em;line-height:1.05;margin-bottom:1.4rem}
.cs-problem{color:var(--text2);font-size:.95rem;line-height:1.85;font-weight:300}
.cs-problem strong{color:var(--text);font-weight:500}

.cs-block-label{font-family:'Space Mono',monospace;font-size:.64rem;letter-spacing:.14em;text-transform:uppercase;color:var(--accent);margin-bottom:1rem;display:flex;align-items:center;gap:.6rem}
.cs-block-label::after{content:'';flex:1;height:1px;background:linear-gradient(90deg,var(--border2),transparent)}

/* Signature artifact */
.cs-artifact-intro{font-size:.9rem;color:var(--text2);font-style:italic;line-height:1.7;margin-bottom:1.6rem;max-width:640px;font-weight:300}
.cs-artifact-intro strong{color:var(--accent3);font-style:normal;font-weight:500}
.cs-artifact-card{
  border:1px solid rgba(0,229,176,.28);border-radius:8px;
  background:linear-gradient(160deg,rgba(0,229,176,.05),rgba(176,111,255,.03));
  padding:2.5rem;position:relative;overflow:hidden;
  box-shadow:0 0 60px rgba(0,229,176,.06);
}
.cs-artifact-card::before{
  content:'';position:absolute;top:-40%;right:-10%;width:340px;height:340px;border-radius:50%;
  background:radial-gradient(ellipse,rgba(0,229,176,.1),transparent 70%);pointer-events:none;
}
.cs-artifact-tag{
  display:inline-block;padding:.3rem .85rem;border-radius:2px;
  font-size:.62rem;letter-spacing:.12em;text-transform:uppercase;font-weight:600;
  font-family:'Space Mono',monospace;color:var(--accent3);
  background:rgba(0,229,176,.1);border:1px solid rgba(0,229,176,.3);margin-bottom:1.2rem;
}
.cs-artifact-title{font-family:'Bebas Neue',sans-serif;font-size:1.8rem;letter-spacing:.03em;line-height:1.1;margin-bottom:.9rem;position:relative}
.cs-artifact-summary{color:var(--text2);font-size:.88rem;line-height:1.8;margin-bottom:1.6rem;max-width:620px;position:relative;font-weight:300}
.cs-artifact-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin-bottom:1.8rem;position:relative}
.cs-artifact-stat{padding:1rem;background:rgba(0,0,0,.2);border:1px solid var(--border);border-radius:4px;text-align:center}
.cs-artifact-stat-val{font-family:'Bebas Neue',sans-serif;font-size:1.7rem;color:var(--accent3);letter-spacing:.03em}
.cs-artifact-stat-lbl{font-size:.6rem;color:var(--text3);margin-top:.25rem;letter-spacing:.06em;font-family:'Space Mono',monospace}
.cs-artifact-actions{display:flex;gap:.9rem;flex-wrap:wrap;position:relative}
.cs-artifact-btn{
  display:inline-flex;align-items:center;gap:.5rem;padding:.7rem 1.5rem;border-radius:3px;
  font-size:.8rem;font-weight:600;letter-spacing:.05em;text-transform:uppercase;text-decoration:none;
  cursor:none;transition:all .3s;font-family:'Space Grotesk',sans-serif;
}
.cs-artifact-btn-primary{background:linear-gradient(135deg,var(--accent3),var(--accent));color:#04120e;box-shadow:0 0 24px rgba(0,229,176,.25)}
.cs-artifact-btn-primary:hover{transform:translateY(-2px);box-shadow:0 0 36px rgba(0,229,176,.4)}
.cs-artifact-btn-ghost{background:rgba(255,255,255,.03);border:1px solid var(--border);color:var(--text)}
.cs-artifact-btn-ghost:hover{border-color:var(--border2)}
.cs-robust-table{width:100%;border-collapse:collapse;margin-top:1.4rem;font-size:.78rem;position:relative}
.cs-robust-table th{text-align:left;color:var(--text3);font-weight:500;font-size:.62rem;letter-spacing:.08em;text-transform:uppercase;padding:.5rem .7rem;border-bottom:1px solid var(--border);font-family:'Space Mono',monospace}
.cs-robust-table td{padding:.6rem .7rem;border-bottom:1px solid rgba(255,255,255,.04);color:var(--text2)}
.cs-robust-table tr:last-child td{border-bottom:none}
.cs-robust-table .flip-never{color:var(--accent3);font-family:'Space Mono',monospace}
.cs-robust-table .flip-val{color:#ffd166;font-family:'Space Mono',monospace}

/* Architecture diagram (hand-built, no external image dependency) */
.cs-diagram-frame{
  border:1px solid var(--border);border-radius:8px;background:var(--surface);
  padding:2.5rem 2rem;overflow-x:auto;
}
.cs-diagram-row{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;margin-bottom:1rem}
.cs-diagram-node{
  min-width:150px;padding:.9rem 1.1rem;border-radius:6px;text-align:center;
  border:1px solid var(--border2);background:rgba(56,178,255,.05);
}
.cs-diagram-node-name{font-family:'Space Mono',monospace;font-size:.72rem;color:var(--text);font-weight:700}
.cs-diagram-node-sub{font-size:.62rem;color:var(--text3);margin-top:.25rem;letter-spacing:.03em}
.cs-diagram-node.orchestrator{
  background:linear-gradient(135deg,rgba(0,229,176,.1),rgba(176,111,255,.08));
  border-color:rgba(0,229,176,.4);min-width:200px;
}
.cs-diagram-node.orchestrator .cs-diagram-node-name{color:var(--accent3)}
.cs-diagram-connector{display:flex;justify-content:center;margin-bottom:1rem}
.cs-diagram-connector-line{width:1px;height:34px;background:linear-gradient(to bottom,var(--accent3),transparent)}
.cs-diagram-legend{display:flex;gap:1.5rem;justify-content:center;margin-top:1.6rem;flex-wrap:wrap}
.cs-diagram-legend-item{display:flex;align-items:center;gap:.5rem;font-size:.68rem;color:var(--text3);font-family:'Space Mono',monospace}
.cs-diagram-legend-dot{width:8px;height:8px;border-radius:50%}

/* Screenshots */
.cs-shots-grid{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem}
.cs-shot-frame{
  border:1px solid var(--border);border-radius:8px;overflow:hidden;background:var(--bg2);
}
.cs-shot-frame img{width:100%;height:auto;display:block}
.cs-shot-caption{padding:1rem 1.2rem;border-top:1px solid var(--border)}
.cs-shot-caption-title{font-size:.85rem;color:var(--text);font-weight:500;margin-bottom:.2rem}
.cs-shot-caption-desc{font-size:.72rem;color:var(--text3);font-family:'Space Mono',monospace;letter-spacing:.02em}
.cs-shot-placeholder{
  aspect-ratio:16/10;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.6rem;
  border-bottom:1px dashed var(--border);color:var(--text3);
}
.cs-shot-placeholder-icon{font-size:1.6rem;opacity:.5}
.cs-shot-placeholder-text{font-size:.7rem;font-family:'Space Mono',monospace;letter-spacing:.04em;text-align:center;max-width:220px;line-height:1.6}

/* Not-built section */
.cs-not-built-list{display:flex;flex-direction:column;gap:1rem}
.cs-not-built-item{
  padding:1.3rem 1.5rem;background:var(--surface);border:1px solid var(--border);
  border-radius:6px;display:grid;grid-template-columns:180px 1fr;gap:1.2rem;align-items:start;
}
.cs-not-built-choice{font-size:.8rem;color:var(--accent2);font-weight:600;line-height:1.5}
.cs-not-built-why{font-size:.82rem;color:var(--text2);line-height:1.7;font-weight:300}

@media(max-width:900px){
  #sdie-case-study{padding:4rem 1.5rem}
  .cs-artifact-stats{grid-template-columns:1fr}
  .cs-diagram-row{flex-direction:column;align-items:center}
  .cs-shots-grid{grid-template-columns:1fr}
  .cs-not-built-item{grid-template-columns:1fr;gap:.4rem}
}

/* ── SKILLS ── */
#skills{
  padding:9rem 4rem;
  background:linear-gradient(180deg,var(--bg) 0%,var(--bg2) 50%,var(--bg) 100%);
}
.skills-inner{max-width:1200px;margin:0 auto}
.skills-hdr{text-align:center;margin-bottom:4rem}
.skills-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:2rem}
.skill-cat{
  padding:2rem;background:var(--surface);
  border:1px solid var(--border);border-radius:6px;
  transition:border-color .3s;
}
.skill-cat:hover{border-color:var(--border2)}
.skill-cat-title{
  font-family:'Space Mono',monospace;
  font-size:.72rem;letter-spacing:.12em;text-transform:uppercase;
  color:var(--accent);margin-bottom:1.5rem;
  display:flex;align-items:center;gap:.5rem;
}
.skill-bars-wrap{display:flex;flex-direction:column;gap:1rem}
.skill-bar-row{display:flex;flex-direction:column;gap:.35rem}
.skill-bar-hdr{display:flex;justify-content:space-between;align-items:center}
.skill-name{font-size:.78rem;color:var(--text2)}
.skill-pct{font-size:.7rem;color:var(--text3);font-family:'Space Mono',monospace}
.skill-track{height:3px;background:rgba(255,255,255,.05);border-radius:2px;overflow:hidden}
.skill-fill{height:100%;border-radius:2px;background:linear-gradient(90deg,var(--accent),var(--accent2));width:0;transition:width 1.2s cubic-bezier(.4,0,.2,1)}

/* Core concepts tags */
.concepts-wrap{
  margin-top:2rem;padding:2rem;background:var(--surface);
  border:1px solid var(--border);border-radius:6px;
}
.concepts-title{
  font-family:'Space Mono',monospace;font-size:.62rem;letter-spacing:.14em;
  text-transform:uppercase;color:var(--accent);margin-bottom:1.2rem;
  display:flex;align-items:center;gap:.5rem;
}
.concepts-cloud{display:flex;flex-wrap:wrap;gap:.5rem}
.concept-tag{
  padding:.35rem .95rem;border-radius:2px;font-size:.73rem;
  border:1px solid rgba(176,111,255,.2);color:var(--accent2);
  background:rgba(176,111,255,.04);transition:all .3s;cursor:none;
}
.concept-tag:hover{border-color:rgba(176,111,255,.5);background:rgba(176,111,255,.08)}

/* Certs section */
.certs-wrap{margin-top:2rem;padding:2rem;background:var(--surface);border:1px solid var(--border);border-radius:6px}
.certs-title{font-family:'Space Mono',monospace;font-size:.62rem;letter-spacing:.14em;text-transform:uppercase;color:var(--text3);margin-bottom:1.2rem}
.tags-cloud{display:flex;flex-wrap:wrap;gap:.5rem}
.cert-tag{
  padding:.35rem .95rem;border-radius:2px;font-size:.73rem;
  border:1px solid var(--border);color:var(--text2);
  background:rgba(255,255,255,.02);transition:all .3s;cursor:none;
}
.cert-tag:hover{border-color:var(--border2);color:var(--text);background:rgba(56,178,255,.05)}

/* ── EXPERIENCE / EDUCATION / CERTS ── */
#experience{padding:9rem 4rem}
#education{padding:5rem 4rem 9rem}
#certifications{padding:0 4rem 9rem}

.exp-inner,.edu-inner,.certs-inner{max-width:860px;margin:0 auto}
.exp-hdr,.edu-hdr,.certs-section-hdr{text-align:center;margin-bottom:4rem}
.timeline{position:relative;padding-left:2rem}
.timeline::before{
  content:'';position:absolute;left:0;top:0;bottom:0;width:1px;
  background:linear-gradient(to bottom,transparent,var(--border2) 20%,var(--border2) 80%,transparent);
}
.tl-item{
  position:relative;padding-left:2.5rem;margin-bottom:3rem;
  opacity:0;transform:translateX(-20px);
  transition:opacity .6s,transform .6s;
}
.tl-item.vis{opacity:1;transform:translateX(0)}
.tl-dot{
  position:absolute;left:-2rem;top:.35rem;
  width:10px;height:10px;border-radius:50%;
  background:var(--accent);box-shadow:0 0 4px var(--accent);
  transform:translateX(-50%);
}
.tl-dot::before{
  content:'';position:absolute;inset:-4px;
  border-radius:50%;border:1px solid rgba(56,178,255,.3);
}
.exp-period{font-family:'Space Mono',monospace;font-size:.65rem;letter-spacing:.1em;text-transform:uppercase;color:var(--accent);margin-bottom:.4rem;font-weight:400}
.exp-role{font-family:'Bebas Neue',sans-serif;font-size:1.4rem;letter-spacing:.04em;margin-bottom:.2rem}
.exp-org{color:var(--text2);font-size:.83rem;margin-bottom:1rem;font-weight:300}
.exp-bullets{list-style:none;display:flex;flex-direction:column;gap:.45rem}
.exp-bullets li{font-size:.825rem;color:var(--text2);padding-left:1.2rem;position:relative;line-height:1.65;font-weight:300}
.exp-bullets li::before{content:'→';position:absolute;left:0;color:var(--accent);font-size:.7rem;top:.05rem;font-family:'Space Mono',monospace}

/* Education cards */
.edu-grid{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem}
.edu-card{
  padding:2rem;background:var(--surface);
  border:1px solid var(--border);border-radius:6px;
  transition:border-color .3s,background .3s;
}
.edu-card:hover{border-color:var(--border2);background:var(--surface2)}
.edu-period{font-family:'Space Mono',monospace;font-size:.62rem;letter-spacing:.1em;text-transform:uppercase;color:var(--accent);margin-bottom:.5rem}
.edu-degree{font-family:'Bebas Neue',sans-serif;font-size:1.3rem;letter-spacing:.04em;margin-bottom:.3rem}
.edu-school{color:var(--text);font-size:.88rem;font-weight:500;margin-bottom:.2rem}
.edu-location{color:var(--text2);font-size:.78rem;font-weight:300;margin-bottom:.8rem;font-family:'Space Mono',monospace}
.edu-note{font-size:.78rem;color:var(--accent3);font-family:'Space Mono',monospace;letter-spacing:.06em}

/* Cert cards */
.cert-cards-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem}
.cert-card{
  padding:1.4rem 1.6rem;background:var(--surface);
  border:1px solid var(--border);border-radius:6px;
  transition:border-color .3s,background .3s;
  display:flex;flex-direction:column;gap:.3rem;
}
.cert-card:hover{border-color:var(--border2);background:var(--surface2)}
.cert-card.award{
  border-color:rgba(255,213,0,.25);
  background:rgba(255,213,0,.03);
}
.cert-card.award:hover{border-color:rgba(255,213,0,.5);background:rgba(255,213,0,.06)}
.cert-card-name{font-size:.85rem;color:var(--text);font-weight:500}
.cert-card-issuer{font-size:.7rem;color:var(--text3);font-family:'Space Mono',monospace;letter-spacing:.06em}

/* ── CONTACT ── */
#contact{padding:9rem 4rem}
.contact-inner{max-width:680px;margin:0 auto;text-align:center}
.contact-badge{
  display:inline-flex;align-items:center;gap:.5rem;
  padding:.4rem 1.2rem;border:1px solid var(--border2);border-radius:3px;
  font-family:'Space Mono',monospace;font-size:.62rem;letter-spacing:.14em;text-transform:uppercase;
  color:var(--accent3);background:rgba(0,229,176,.05);margin-bottom:2rem;
}
.contact-title{
  font-family:'Bebas Neue',sans-serif;
  font-size:clamp(2.4rem,6vw,4rem);letter-spacing:.06em;line-height:1;margin-bottom:1.2rem;
}
.contact-title span{
  background:linear-gradient(135deg,var(--accent),var(--accent2));
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
}
.contact-sub{color:var(--text2);font-size:.95rem;margin-bottom:3rem;font-weight:300;line-height:1.7}
.contact-links{display:flex;justify-content:center;gap:.75rem;flex-wrap:wrap;margin-bottom:3rem}
.contact-link{
  display:flex;align-items:center;gap:.5rem;
  padding:.65rem 1.4rem;background:var(--surface2);
  border:1px solid var(--border);border-radius:3px;
  color:var(--text2);font-size:.8rem;text-decoration:none;
  transition:all .3s;cursor:none;letter-spacing:.04em;
}
.contact-link:hover{border-color:var(--border2);color:var(--text);background:rgba(56,178,255,.06)}
.email-box{
  padding:2.5rem;background:var(--surface);border:1px solid var(--border);
  border-radius:6px;position:relative;overflow:hidden;
}
.email-box::before{
  content:'';position:absolute;inset:0;
  background:radial-gradient(ellipse at 50% 0%,rgba(56,178,255,.06),transparent 60%);
}
.email-addr{
  font-family:'Space Mono',monospace;
  font-size:clamp(.9rem,1.8vw,1.1rem);color:var(--text);letter-spacing:.02em;margin-bottom:.5rem;
}
.email-sub{font-size:.73rem;color:var(--text3);font-family:'Space Mono',monospace;letter-spacing:.06em}

/* ── FOOTER ── */
footer{
  padding:1.8rem 4rem;border-top:1px solid var(--border);
  display:flex;justify-content:space-between;align-items:center;
  color:var(--text3);font-size:.72rem;flex-wrap:wrap;gap:1rem;
  position:relative;z-index:1;font-family:'Space Mono',monospace;letter-spacing:.06em;
}

/* ── RESPONSIVE ── */
@media(max-width:900px){
  nav{padding:1rem 1.5rem}
  #hero,#about,#projects,#skills,#experience,#education,#certifications,#contact{padding:5rem 1.5rem}
  .hero-inner{grid-template-columns:1fr;gap:3rem;padding-top:7rem;text-align:center}
  .hero-btns,.role-pills{justify-content:center}
  .hero-visual{order:-1}
  .orb-wrap{width:240px;height:240px}
  .about-inner{grid-template-columns:1fr;gap:3rem}
  .about-img-wrap{order:0;justify-content:flex-start;align-items:center}
  .about-txt{order:1}
  .stats-row{grid-template-columns:repeat(3,1fr)}
  .pcard-inner{grid-template-columns:1fr!important;direction:ltr!important}
  .skills-grid{grid-template-columns:1fr}
  .nav-links{display:none}
  footer{padding:1.5rem 1.5rem}
  .sec-hdr{flex-direction:column;align-items:flex-start}
  .sec-hdr-sub{text-align:left}
  .edu-grid{grid-template-columns:1fr}
  .cert-cards-grid{grid-template-columns:1fr}
}
`;

/* ─────────────── DATA ─────────────── */
const SKILLS = [
  {
  icon: "📊", label: "Business Analysis",
  bars: [
    { name: "Requirements Gathering", pct: 92 },
    { name: "Stakeholder Management", pct: 90 },
    { name: "Workflow Analysis", pct: 88 },
    { name: "Business Requirements Documents (BRDs)", pct: 90 },
    { name: "User Acceptance Testing (UAT)", pct: 86 },
    { name: "Agile Methodologies", pct: 88 },
  ],
},
  {
    icon: "⚙️", label: "Technical",
    bars: [
      { name: "Python", pct: 85 },
      { name: "SQL", pct: 88 },
      { name: "R", pct: 72 },
      { name: "MySQL / MongoDB", pct: 82 },
      { name: "Neo4j", pct: 65 },
    ],
  },
  {
    icon: "📈", label: "Data & Analytics",
    bars: [
      { name: "Tableau", pct: 83 },
      { name: "Power BI", pct: 78 },
      { name: "Predictive Modeling", pct: 77 },
      { name: "Statistical Analysis", pct: 80 },
      { name: "Data Visualization", pct: 87 },
    ],
  },
  {
    icon: "🛠", label: "Tools & Platforms",
    bars: [
      { name: "JIRA / Confluence", pct: 85 },
      { name: "Notion / Trello", pct: 90 },
      { name: "Microsoft 365 / Excel", pct: 88 },
    ],
  },
];

const CORE_CONCEPTS = [
  "Database Management Systems",
  "Data Mining",
  "Predictive Analytics",
  "Project Management",
  "Digital Transformation",
  "Data Processing in Python",
  "Finance Information Systems",
  "Big Data & Cloud Computing",
  "Harnessing AI",
];

const CERTS = [
  { name: "BCG: Introduction to Strategic Consulting", issuer: "BCG · Forage" },
  { name: "AI fundamentals: Foundations for understanding AI", issuer: "IBM" },
  { name: "Career Essentials in Generative AI", issuer: "Microsoft & LinkedIn" },
  { name: "Bloomberg Market Concepts", issuer: "Bloomberg" },
  { name: "SQL Certification", issuer: "HackerRank" },
  { name: "🏆 1st Place — Social Impact Buildfest", issuer: "UMD Do Good Institute · Cashocracy AR App · Apr 2026" },
];

const EXP = [
  {
    period: "Jun 2026 – Present",
    role: "Team Lead - Impact consulting Fellowship",
    org: "University of Maryland · College Park, MD",
    color: "var(--accent3)",
    bullets: [
      "Led a consulting workstream analyzing client business challenges and identifying AI-enabled process improvement opportunities",
      "Conducted market research, workflow analysis, and stakeholder discussions to surface business needs and develop recommendations.",
      "Synthesized findings into actionable deliverables and coordinated execution across cross-functional teams.",
    ],
  },
  {
    period: "Aug 2024 – Feb 2025",
    role: "Project Lead",
    org: "KMIT · Hyderabad, India",
    color: "var(--accent2)",
    bullets: [
      "Collaborated with cross-functional stakeholders to elicit, document, and validate business requirements — creating workflows and process maps that reduced project ambiguity across 3 departments",
      "Analyzed 10+ process inefficiencies in data pipelines using SQL and Python, proposing improvements that enhanced data processing efficiency by 25%",
      "Designed and delivered Power BI dashboards enabling data-driven decision-making for senior stakeholders, ensuring on-time delivery of 4 key project milestones",
      "Supported Agile project planning, sprint tracking, and status reporting, maintaining comprehensive documentation throughout the project lifecycle",
    ],
  },
];

const EDUCATION = [
  {
    period: "Aug 2025 – Dec 2026",
    degree: "MS in Information Systems and AI",
    school: "University of Maryland, Robert H. Smith School of Business",
    location: "College Park, MD",
    color: "var(--accent)",
  },
  {
    period: "Aug 2021 – Jun 2025",
    degree: "B.Tech in Information Technology",
    school: "Keshav Memorial Institute of Technology",
    location: "Hyderabad, India",
    note: null,
    color: "var(--accent2)",
  },
];

/* ─── Gradient Mesh Background ─── */
function MeshBackground() {
  return (
    <div id="mesh-bg">
      <div className="mesh-blob mesh-blob-1" />
      <div className="mesh-blob mesh-blob-2" />
      <div className="mesh-blob mesh-blob-3" />
      <div className="mesh-blob mesh-blob-4" />
      <div className="mesh-noise" />
    </div>
  );
}

/* ─── Bar chart mini ─── */
function MiniBarChart({ title, bars, gradients }) {
  const ref = useRef(null);
  const [fired, setFired] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting && !fired) setFired(true); }, { threshold: 0.3 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [fired]);
  return (
    <div ref={ref} className="pvisual-inner">
      <div className="mini-chart-title">{title}</div>
      <div className="bar-rows">
        {bars.map((b, i) => (
          <div className="bar-row" key={i}>
            <span className="bar-lbl">{b.label}</span>
            <div className="bar-track">
              <div className="bar-fill" style={{
                width: fired ? `${b.pct}%` : "0%",
                background: gradients?.[i] || "linear-gradient(90deg,#38b2ff,#b06fff)",
                transitionDelay: `${i * 0.1}s`,
              }} />
            </div>
            <span className="bar-val">{b.valLabel ?? `${b.pct}%`}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Skill bars ─── */
function SkillBars({ bars, fired }) {
  return (
    <div className="skill-bars-wrap">
      {bars.map((b, i) => (
        <div className="skill-bar-row" key={i}>
          <div className="skill-bar-hdr">
            <span className="skill-name">{b.name}</span>
            <span className="skill-pct">{b.pct}%</span>
          </div>
          <div className="skill-track">
            <div className="skill-fill" style={{
              width: fired ? `${b.pct}%` : "0%",
              transitionDelay: `${i * 0.08}s`,
            }} />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Reveal hook ─── */
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); io.disconnect(); }
    }, { threshold });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, vis];
}

/* ─── Counter ─── */
function Counter({ target, suffix = "" }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const fired = useRef(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !fired.current) {
        fired.current = true;
        const dur = 1600; const step = 1000 / 60;
        const inc = target / (dur / step);
        let cur = 0;
        const t = setInterval(() => {
          cur += inc;
          if (cur >= target) { setVal(target); clearInterval(t); }
          else setVal(Math.floor(cur));
        }, step);
      }
    }, { threshold: 0.3 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [target]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ══════════════════════════════════════ */
export default function App() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const mx = useRef(0); const my = useRef(0);
  const rx = useRef(0); const ry = useRef(0);
  const [scrolled, setScrolled] = useState(false);
  const [heroVis, setHeroVis] = useState(false);

  /* Cursor */
  useEffect(() => {
    const move = e => {
      mx.current = e.clientX; my.current = e.clientY;
      if (cursorRef.current) { cursorRef.current.style.left = mx.current + "px"; cursorRef.current.style.top = my.current + "px"; }
    };
    document.addEventListener("mousemove", move);
    let raf;
    const anim = () => {
      rx.current += (mx.current - rx.current) * 0.12;
      ry.current += (my.current - ry.current) * 0.12;
      if (ringRef.current) { ringRef.current.style.left = rx.current + "px"; ringRef.current.style.top = ry.current + "px"; }
      raf = requestAnimationFrame(anim);
    };
    anim();
    return () => { document.removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setHeroVis(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll("a,button,.pcard,.cert-tag,.stat-card,.stag,.concept-tag,.cert-card,.edu-card");
    const on = () => document.body.classList.add("hovered");
    const off = () => document.body.classList.remove("hovered");
    els.forEach(el => { el.addEventListener("mouseenter", on); el.addEventListener("mouseleave", off); });
    return () => els.forEach(el => { el.removeEventListener("mouseenter", on); el.removeEventListener("mouseleave", off); });
  });

  /* Reveal refs */
  const [aboutImgRef, aboutImgVis] = useReveal();
  const [aboutTxtRef, aboutTxtVis] = useReveal();
  const [projHdrRef, projHdrVis] = useReveal();
  const [csHdrRef, csHdrVis] = useReveal();
  const [csArtifactRef, csArtifactVis] = useReveal();
  const [csDiagramRef, csDiagramVis] = useReveal();
  const [csShotsRef, csShotsVis] = useReveal();
  const [csNotBuiltRef, csNotBuiltVis] = useReveal();
  const [skillsHdrRef, skillsHdrVis] = useReveal();
  const [skillsGridRef, skillsGridVis] = useReveal(0.1);
  const [conceptsRef, conceptsVis] = useReveal();
  const [certsRef, certsVis] = useReveal();
  const [expHdrRef, expHdrVis] = useReveal();
  const [eduHdrRef, eduHdrVis] = useReveal();
  const [eduGridRef, eduGridVis] = useReveal(0.1);
  const [certSecRef, certSecVis] = useReveal();
  const [certCardsRef, certCardsVis] = useReveal(0.1);
  const [contactRef, contactVis] = useReveal();

  /* timeline */
  const tlRefs = EXP.map(() => useRef(null));
  const [tlVis, setTlVis] = useState(EXP.map(() => false));
  useEffect(() => {
    const ios = tlRefs.map((r, i) => {
      const io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) setTlVis(v => { const nv = [...v]; nv[i] = true; return nv; });
      }, { threshold: 0.2 });
      if (r.current) io.observe(r.current);
      return io;
    });
    return () => ios.forEach(io => io.disconnect());
  });

  return (
    <>
      <style>{CSS}</style>
      <div id="vv-cursor" ref={cursorRef} />
      <div id="vv-ring" ref={ringRef} />
      <MeshBackground />

      {/* NAV */}
      <nav className={scrolled ? "scrolled" : ""}>
        <a href="#" className="nav-logo">V<span>V</span>C</a>
        <ul className="nav-links">
          {["about","projects","skills","experience","education","contact"].map(s => (
            <li key={s}><a href={`#${s}`}>{s}</a></li>
          ))}
        </ul>
        <a href="mailto:venkatavarshinic@gmail.com" className="nav-cta">Get in Touch</a>
      </nav>

      {/* HERO */}
      <section id="hero">
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-tag" style={{ opacity: heroVis ? 1 : 0, transition: "opacity .6s .1s" }}>
              <div className="hero-tag-dot" />
              Open to Opportunities · 2026
            </div>
            <h1 className="hero-name">
              {["Venkata", "Varshini", "Chilukamarri"].map((w, i) => (
                <span className="line" key={w}>
                  <span className="word" style={{
                    transform: heroVis ? "translateY(0)" : "translateY(100%)",
                    opacity: heroVis ? 1 : 0,
                    transitionDelay: `${0.2 + i * 0.15}s`,
                  }}>
                    {i === 2 ? <span className="grad">{w}</span> : w}
                  </span>
                </span>
              ))}
            </h1>
            <div className="role-pills" style={{ opacity: heroVis ? 1 : 0, transition: "opacity .6s .65s" }}>
              <span className="rpill rpill-pm">Aspiring Business Analyst</span>
              <span className="rpill rpill-ba">Data. Strategy. Decisions.</span>
            </div>
            <p className="hero-sub" style={{ opacity: heroVis ? 1 : 0, transition: "opacity .6s .75s" }}>
  Every dashboard tells a story. <strong>My job is making sure it's the right one.</strong>
</p>
<div className="hero-btns" style={{ opacity: heroVis ? 1 : 0, transition: "opacity .6s .9s" }}>
              <a href="#projects" className="btn-pri">View My Work</a>
              <a href="#contact" className="btn-sec">Get In Touch</a>
            </div>
          </div>

          {/* HERO VISUAL */}
          <div className="hero-visual" style={{ opacity: heroVis ? 1 : 0, transform: heroVis ? "scale(1)" : "scale(.94)", transition: "opacity 1s .4s, transform 1s .4s" }}>
            <div className="orb-wrap">
              <div className="orb-glow" />
              <div className="orb-ring" />
              <div className="orb-ring2" />
              <div className="profile-circle">
                <img src={varshinImage} alt="Venkata Varshini Chilukamarri" />
              </div>
              <div className="coord-tag tl">38.9897° N</div>
              <div className="coord-tag br">76.9378° W</div>
              <div className="coord-tag tr">UMD · Smith</div>
            </div>
          </div>
        </div>
        <div className="scroll-hint">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about">
        <div className="about-inner">
          <div ref={aboutImgRef} className={`about-img-wrap reveal ${aboutImgVis ? "vis" : ""}`}>
            <div className="about-deco" />
            <div className="about-frame">
              <img src={varshinImage} alt="Venkata Varshini Chilukamarri" />
            </div>
          </div>
          <div ref={aboutTxtRef} className={`about-txt reveal ${aboutTxtVis ? "vis" : ""}`}>
    <div className="sec-label">About Me</div>
   <h2 className="sec-title">
  Clarity through<br />
  analysis.</h2>
<div className="divider" />

    <p>
        I enjoy solving <strong>business problems</strong> that don't come with obvious answers.
    </p>

    <p>
        That's what drew me to <strong>business analysis, consulting, and AI</strong>. I enjoy breaking down complex challenges, understanding what stakeholders truly need, and connecting data with strategy to uncover practical solutions.
    </p>

    <p>
        I'm currently pursuing my <strong>M.S. in Information Systems &amp; Artificial Intelligence</strong> at the <strong>University of Maryland, Robert H. Smith School of Business</strong>. Along the way, I've led consulting workstreams, built decision intelligence platforms, developed business intelligence dashboards, and collaborated with cross-functional teams to transform ideas into solutions backed by data.
    </p>

    <p>
        What motivates me most isn't just building dashboards or predictive models—it's understanding the business context behind them. I enjoy asking <strong>"why"</strong> a problem exists before deciding <strong>"how"</strong> to solve it. Whether I'm working on a consulting case, exploring emerging AI trends, or designing my next decision intelligence project, I'm always looking for better ways to help organizations make informed, confident decisions.
    </p>

    <div className="stats-row">
              {[
                { target: 250, suffix: "+", label: "User Interactions Analyzed" },
                { target: 22, suffix: "%", label: "Onboarding Drop-off Found" },
                { target: 8, suffix: "+", label: "KPIs Designed & Tracked" },
              ].map((s, i) => (
                <div className="stat-card" key={i}>
                  <div className="stat-num">
                    {aboutTxtVis && <Counter target={s.target} suffix={s.suffix} />}
                  </div>
                  <div className="stat-lbl">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects">
        <div className="projects-wrap">
          <div ref={projHdrRef} className={`sec-hdr reveal ${projHdrVis ? "vis" : ""}`}>
            <div>
              <div className="sec-label">Featured Work</div>
              <h2 className="sec-title">Projects</h2>
            </div>
            <p className="sec-hdr-sub">Real problems, hard decisions, and measurable outcomes.</p>
          </div>

          <div className="projects-grid">
            {/* PROJECT 1 — AI Strategy Copilot */}
            <ProjectCard
              tag="Multi-Agent AI · RAG · Consulting Frameworks" tagClass="ptag-b"
              title="AI Strategy Copilot — Hypothesis-Driven Consulting Engine"
              desc="Built a hypothesis-driven analysis engine that mirrors how a consulting case team works a problem: breaks a business question into a MECE issue tree, grounds each branch in retrieved evidence via RAG, runs quantitative analysis, red-teams its own recommendation, and exports a client-ready deck — architected end-to-end across backend, frontend, and multi-agent orchestration as an independent project."
              metrics={[
                { val: "MECE", label: "Issue Tree Engine" },
                { val: "RAG", label: "Evidence Grounding" },
                { val: "2-Stage", label: "Red-Team Review" },
              ]}
              tags={["MECE Framework", "Pyramid Principle", "Retrieval-Augmented Generation", "Multi-Agent Orchestration", "Sensitivity Analysis", "Automated Deck Export"]}
              visual={
                <div className="pvisual-inner">
                  <div className="mini-chart-title">Case-Team Reasoning Pipeline</div>
                  <div className="flow-diagram">
                    {[
                      { color: "var(--accent)", text: "Structure question into MECE issue tree" },
                      { color: "var(--accent3)", text: "Ground each branch via RAG evidence retrieval" },
                      { color: "var(--accent2)", text: "Run deterministic quantitative analysis" },
                      { color: "#ff6b6b", text: "Red-team stage stress-tests recommendation" },
                      { color: "var(--accent)", text: "Export client-ready deck" },
                    ].map((f, i) => (
                      <div key={i}>
                        {i > 0 && <div className="flow-arrow">↓</div>}
                        <div className="flow-step">
                          <div className="flow-dot" style={{ background: f.color }} />
                          <span>{f.text}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              }
            />

            {/* PROJECT 2 — Strategic Decision Intelligence Engine */}
            <ProjectCard
              rev
              tag="Full-Stack · Financial Modeling · Decision Science" tagClass="ptag-p"
              title="Strategic Decision Intelligence Engine (SDIE)"
              desc="A full-stack platform structuring strategic decisions the way a case team does: decompose into workstreams, apply rigorous quant analysis, ground every claim in evidence, stress-test the answer before trusting it. Deterministic quant analysis is kept strictly separate from LLM-assisted synthesis, so every recommendation traces to a number or a cited source — not a language model's confidence."
              metrics={[
                { val: "2000", label: "Hindcast Tested Against" },
                { val: "0.40", label: "Robustness Margin" },
                { val: "6", label: "Bounded Contexts" },
              ]}
              tags={["Clean Architecture / DDD", "Monte Carlo Simulation", "MCDA + Weight Robustness", "Decision-Tree EVPI", "Evidence-Grounded Synthesis", "PostgreSQL"]}
              footer={
                <a href="#sdie-case-study" className="case-study-link">
                  View full case study — the Blockbuster/Netflix hindcast ↓
                </a>
              }
              visual={
                <div className="pvisual-inner">
                  <div className="kpi-grid">
                    {[
                      { val: "5", lbl: "Workstreams Scoped", color: "var(--accent)" },
                      { val: "FastAPI", lbl: "Backend Engine", color: "var(--accent3)" },
                      { val: "Next.js", lbl: "Frontend Stack", color: "var(--accent2)" },
                      { val: "Robust", lbl: "Recommendation Holds", color: "#ffd166" },
                    ].map((k, i) => (
                      <div className="kpi-card" key={i}>
                        <div className="kpi-val" style={{ color: k.color }}>{k.val}</div>
                        <div className="kpi-lbl">{k.lbl}</div>
                      </div>
                    ))}
                  </div>
                  <div className="flow-diagram">
                    {[
                      { color: "var(--accent)", text: "Build vs. Acquire vs. Partner decision framed" },
                      { color: "var(--accent2)", text: "Financial model + decision-science workstreams run" },
                      { color: "var(--accent3)", text: "Recommendation holds unless cost weight shifts >X%" },
                    ].map((f, i) => (
                      <div key={i}>
                        {i > 0 && <div className="flow-arrow">↓</div>}
                        <div className="flow-step">
                          <div className="flow-dot" style={{ background: f.color }} />
                          <span>{f.text}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              }
            />
          </div>
        </div>
      </section>

      {/* SDIE CASE STUDY */}
      <section id="sdie-case-study">
        <div className="cs-inner">
          <div ref={csHdrRef} className={`cs-header reveal ${csHdrVis ? "vis" : ""}`}>
            <div className="cs-eyebrow">Featured Case Study — SDIE</div>
            <h2 className="cs-title">Strategic Decision Intelligence Engine</h2>
            <p className="cs-problem">
              Most "AI decision tools" fall into one of two traps: <strong>chatbots</strong> that
              generate confident-sounding answers with no analytical rigor behind them, or
              <strong> spreadsheets</strong> with rigor but no structure connecting the numbers to
              a decision. SDIE separates deterministic quant analysis — financial modeling,
              decision science — from LLM-assisted synthesis, so every recommendation traces back
              to <strong>a number or a cited source</strong>, never to a language model's
              confidence alone.
            </p>
          </div>

          {/* SIGNATURE ARTIFACT */}
          <div ref={csArtifactRef} className={`reveal ${csArtifactVis ? "vis" : ""}`}>
            <div className="cs-block-label">The Signature Artifact</div>
            <p className="cs-artifact-intro">
              I tested the platform against <strong>one of the most-cited strategic
              misjudgments in corporate history</strong> — using only information available in
              2000.
            </p>
            <div className="cs-artifact-card">
              <span className="cs-artifact-tag">Hindcast Validation · Live API, Not a Mockup</span>
              <h3 className="cs-artifact-title">Would SDIE Have Caught Blockbuster's Netflix Mistake?</h3>
              <p className="cs-artifact-summary">
                In 2000, Netflix offered to sell itself to Blockbuster for $50M. Blockbuster
                declined. Using only the figures a Blockbuster executive had access to at the
                time, I ran the decision through SDIE's live MCDA engine — same endpoint used for
                any build-vs-buy case on the platform — and it recommended acquisition by a 0.40
                weighted-score margin, then automatically stress-tested that recommendation
                against every criterion's weight.
              </p>
              <div className="cs-artifact-stats">
                <div className="cs-artifact-stat">
                  <div className="cs-artifact-stat-val">0.70</div>
                  <div className="cs-artifact-stat-lbl">Acquire — Weighted Score</div>
                </div>
                <div className="cs-artifact-stat">
                  <div className="cs-artifact-stat-val">0.30</div>
                  <div className="cs-artifact-stat-lbl">Decline — Weighted Score</div>
                </div>
                <div className="cs-artifact-stat">
                  <div className="cs-artifact-stat-val">2 of 4</div>
                  <div className="cs-artifact-stat-lbl">Criteria Never Flip the Call</div>
                </div>
              </div>
              <table className="cs-robust-table">
                <thead>
                  <tr><th>Criterion</th><th>Weight</th><th>Flips recommendation at</th></tr>
                </thead>
                <tbody>
                  <tr><td>Strategic fit with digital distribution</td><td>0.35</td><td className="flip-never">Never flips</td></tr>
                  <tr><td>Downside protection against disruption</td><td>0.35</td><td className="flip-never">Never flips</td></tr>
                  <tr><td>Acquisition cost</td><td>0.15</td><td className="flip-val">0.40 (+167%)</td></tr>
                  <tr><td>Near-term cannibalization risk</td><td>0.15</td><td className="flip-val">0.40 (+167%)</td></tr>
                </tbody>
              </table>
              <div className="cs-artifact-actions">
                <a href="/case-studies/blockbuster-netflix-memo.pdf" target="_blank" rel="noopener noreferrer" className="cs-artifact-btn cs-artifact-btn-primary">
                  ↓ View the one-page memo (PDF)
                </a>
                <a href="/case-studies/blockbuster-netflix-2000.md" target="_blank" rel="noopener noreferrer" className="cs-artifact-btn cs-artifact-btn-ghost">
                  Read the full write-up
                </a>
              </div>
            </div>
          </div>

          {/* ARCHITECTURE DIAGRAM */}
          <div ref={csDiagramRef} className={`reveal ${csDiagramVis ? "vis" : ""}`}>
            <div className="cs-block-label">System Architecture — Bounded Context Map</div>
            <div className="cs-diagram-frame">
              <div className="cs-diagram-row">
                <div className="cs-diagram-node">
                  <div className="cs-diagram-node-name">problem_framing</div>
                  <div className="cs-diagram-node-sub">Five Forces / SWOT</div>
                </div>
                <div className="cs-diagram-node">
                  <div className="cs-diagram-node-name">evidence_research</div>
                  <div className="cs-diagram-node-sub">Cited, exact-excerpt search</div>
                </div>
              </div>
              <div className="cs-diagram-connector"><div className="cs-diagram-connector-line" /></div>
              <div className="cs-diagram-row">
                <div className="cs-diagram-node">
                  <div className="cs-diagram-node-name">financial_modeling</div>
                  <div className="cs-diagram-node-sub">NPV · IRR · sensitivity</div>
                </div>
                <div className="cs-diagram-node">
                  <div className="cs-diagram-node-name">decision_analysis</div>
                  <div className="cs-diagram-node-sub">MCDA · Monte Carlo · EVPI</div>
                </div>
              </div>
              <div className="cs-diagram-connector"><div className="cs-diagram-connector-line" /></div>
              <div className="cs-diagram-row">
                <div className="cs-diagram-node">
                  <div className="cs-diagram-node-name">recommendation_synthesis</div>
                  <div className="cs-diagram-node-sub">Rationale · overrides · narrative</div>
                </div>
              </div>
              <div className="cs-diagram-connector"><div className="cs-diagram-connector-line" /></div>
              <div className="cs-diagram-row">
                <div className="cs-diagram-node orchestrator">
                  <div className="cs-diagram-node-name">workspace</div>
                  <div className="cs-diagram-node-sub">Orchestrates all five by reference — owns no analytical logic itself</div>
                </div>
              </div>
              <div className="cs-diagram-legend">
                <div className="cs-diagram-legend-item"><span className="cs-diagram-legend-dot" style={{ background: "var(--accent)" }} />Deterministic quant core</div>
                <div className="cs-diagram-legend-item"><span className="cs-diagram-legend-dot" style={{ background: "var(--accent3)" }} />Orchestration layer</div>
                <div className="cs-diagram-legend-item"><span className="cs-diagram-legend-dot" style={{ background: "var(--accent2)" }} />LLM boundary: narrative generation only, grounded strictly in the synthesized rationale</div>
              </div>
            </div>
          </div>

          {/* SCREENSHOTS */}
          <div ref={csShotsRef} className={`reveal ${csShotsVis ? "vis" : ""}`}>
            <div className="cs-block-label">Dashboards</div>
            <div className="cs-shots-grid">
              <div className="cs-shot-frame">
                <div className="cs-shot-placeholder">
                  <span className="cs-shot-placeholder-icon">📊</span>
                  <span className="cs-shot-placeholder-text">Add screenshot: financial-modeling-dashboard.png</span>
                </div>
                <div className="cs-shot-caption">
                  <div className="cs-shot-caption-title">Financial Modeling</div>
                  <div className="cs-shot-caption-desc">NPV / IRR / payback + one-way sensitivity tornado</div>
                </div>
              </div>
              <div className="cs-shot-frame">
                <div className="cs-shot-placeholder">
                  <span className="cs-shot-placeholder-icon">📈</span>
                  <span className="cs-shot-placeholder-text">Add screenshot: decision-analysis-dashboard.png</span>
                </div>
                <div className="cs-shot-caption">
                  <div className="cs-shot-caption-title">Decision Analysis</div>
                  <div className="cs-shot-caption-desc">MCDA ranking + weight-robustness breakeven</div>
                </div>
              </div>
            </div>
          </div>

          {/* WHAT I CHOSE NOT TO BUILD */}
          <div ref={csNotBuiltRef} className={`reveal ${csNotBuiltVis ? "vis" : ""}`}>
            <div className="cs-block-label">What I Deliberately Chose Not to Build</div>
            <div className="cs-not-built-list">
              <div className="cs-not-built-item">
                <span className="cs-not-built-choice">Lexical search, not vector embeddings</span>
                <span className="cs-not-built-why">Evidence retrieval runs on Postgres native full-text search rather than pgvector or an embedding API — sufficient for this corpus size, and it avoids an external dependency the scope doesn't need.</span>
              </div>
              <div className="cs-not-built-item">
                <span className="cs-not-built-choice">Hardcoded benchmark table, not a live data feed</span>
                <span className="cs-not-built-why">Industry WACC/IRR ranges are stable, slow-changing figures. Keeping them in code (not an external API) keeps every assumption flag fast, offline, and auditable — a reviewer can trace a warning to a one-line constant, not an opaque call.</span>
              </div>
              <div className="cs-not-built-item">
                <span className="cs-not-built-choice">Stub auth, not full OIDC</span>
                <span className="cs-not-built-why">Every request already routes through one tenant/user resolution seam, so real auth is a scoped swap later, not a redesign — appropriate scoping for a portfolio-stage build, not a production one.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills">
        <div className="skills-inner">
          <div ref={skillsHdrRef} className={`skills-hdr reveal ${skillsHdrVis ? "vis" : ""}`}>
            <div className="sec-label" style={{ justifyContent: "center" }}>Capabilities</div>
            <h2 className="sec-title">Skills & Expertise</h2>
          </div>
          <div ref={skillsGridRef} className={`skills-grid reveal ${skillsGridVis ? "vis" : ""}`}>
            {SKILLS.map((cat, i) => (
              <div className="skill-cat" key={i}>
                <div className="skill-cat-title">
                  <span>{cat.icon}</span> {cat.label}
                </div>
                <SkillBars bars={cat.bars} fired={skillsGridVis} />
              </div>
            ))}
          </div>

          {/* Core Concepts */}
          <div ref={conceptsRef} className={`concepts-wrap reveal ${conceptsVis ? "vis" : ""}`}>
            <div className="concepts-title">🧠 Core Concepts</div>
            <div className="concepts-cloud">
              {CORE_CONCEPTS.map((c, i) => <span className="concept-tag" key={i}>{c}</span>)}
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience">
        <div className="exp-inner">
          <div ref={expHdrRef} className={`exp-hdr reveal ${expHdrVis ? "vis" : ""}`}>
            <div className="sec-label" style={{ justifyContent: "center" }}>Career</div>
            <h2 className="sec-title">Experience</h2>
          </div>
          <div className="timeline">
            {EXP.map((e, i) => (
              <div
                key={i} ref={tlRefs[i]}
                className={`tl-item ${tlVis[i] ? "vis" : ""}`}
                style={{ transitionDelay: `${i * 0.12}s` }}
              >
                <div className="tl-dot" style={{ background: e.color, boxShadow: `0 0 14px ${e.color}` }} />
                <div className="exp-period" style={{ color: e.color }}>{e.period}</div>
                <div className="exp-role">{e.role}</div>
                <div className="exp-org">{e.org}</div>
                <ul className="exp-bullets">
                  {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education">
        <div className="edu-inner">
          <div ref={eduHdrRef} className={`edu-hdr reveal ${eduHdrVis ? "vis" : ""}`}>
            <div className="sec-label" style={{ justifyContent: "center" }}>Academic Background</div>
            <h2 className="sec-title">Education</h2>
          </div>
          <div ref={eduGridRef} className={`edu-grid reveal ${eduGridVis ? "vis" : ""}`}>
            {EDUCATION.map((e, i) => (
              <div className="edu-card" key={i} style={{ borderColor: `rgba(${e.color === "var(--accent)" ? "56,178,255" : "176,111,255"},.15)` }}>
                <div className="edu-period" style={{ color: e.color }}>{e.period}</div>
                <div className="edu-degree">{e.degree}</div>
                <div className="edu-school">{e.school}</div>
                <div className="edu-location">{e.location}</div>
                {e.note && <div className="edu-note">⭐ {e.note}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section id="certifications">
        <div className="certs-inner">
          <div ref={certSecRef} className={`certs-section-hdr reveal ${certSecVis ? "vis" : ""}`}>
            <div className="sec-label" style={{ justifyContent: "center" }}>Credentials</div>
            <h2 className="sec-title">Certifications</h2>
          </div>
          <div ref={certCardsRef} className={`cert-cards-grid reveal ${certCardsVis ? "vis" : ""}`}>
            {CERTS.map((c, i) => (
              <div className={`cert-card${c.name.startsWith("🏆") ? " award" : ""}`} key={i}>
                <div className="cert-card-name">{c.name}</div>
                <div className="cert-card-issuer">{c.issuer}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div ref={contactRef} className={`contact-inner reveal ${contactVis ? "vis" : ""}`}>
          <div className="contact-badge">
            <div className="hero-tag-dot" style={{ background: "var(--accent3)" }} />
            Open to Product Manager Roles
          </div>
          <h2 className="contact-title">
            Let's build something<br /><span>remarkable.</span>
          </h2>
          <p className="contact-sub">
            Actively seeking Business Analyst roles where I can connect data to strategy and ship work that matters. If that sounds like your team — let's talk.
          </p>
          <div className="contact-links">
            {[
              { href: "mailto:venkatavarshinic@gmail.com", icon: "✉", label: "venkatavarshinic@gmail.com" },
              { href: "tel:8623405578", icon: "✆", label: "+1 (862) 340-5578" },
              { href: "https://www.linkedin.com/in/venkata-varshini-chilukamarri-62b1782b7/", icon: "in", label: "LinkedIn", target: "_blank" },
            ].map((l, i) => (
              <a key={i} href={l.href} className="contact-link" target={l.target}>
                <span>{l.icon}</span> {l.label}
              </a>
            ))}
          </div>
          <div className="email-box">
            <div className="email-addr">venkatavarshinic@gmail.com</div>
            <div className="email-sub">College Park, MD · U.S. Work Authorized · Remote & Hybrid</div>
          </div>
        </div>
      </section>

      <footer>
        <span>© 2026 Venkata Varshini Chilukamarri</span>
        <span>Aspiring Business Analyst · UMD Smith School · U.S. Work Authorized</span>
      </footer>
    </>
  );
}

/* ─── Project Card component ─── */
function ProjectCard({ tag, tagClass, title, desc, metrics, tags, visual, rev, footer }) {
  const [ref, vis] = useReveal();
  return (
    <div ref={ref} className={`pcard reveal ${vis ? "vis" : ""}`}>
      <div className={`pcard-inner ${rev ? "rev" : ""}`}>
        <div className="pcard-info">
          <span className={`ptag ${tagClass}`}>{tag}</span>
          <h3 className="ptitle">{title}</h3>
          <p className="pdesc">{desc}</p>
          <div className="pmetrics">
            {metrics.map((m, i) => (
              <div className="pmetric" key={i}>
                <span className="pmetric-val">{m.val}</span>
                <span className="pmetric-lbl">{m.label}</span>
              </div>
            ))}
          </div>
          <div className="ptags">
            {tags.map((t, i) => <span className="stag" key={i}>{t}</span>)}
          </div>
          {footer && <div className="pcard-footer">{footer}</div>}
        </div>
        <div className="pvisual">{visual}</div>
      </div>
    </div>
  );
}
