import { useState, useEffect, useRef } from "react";
import anh1 from "./assets/anh1.jpg";
import anh2 from "./assets/anh2.jpg";
import anh3 from "./assets/anh3.jpg";
import anh4 from "./assets/anh4.jpg";
import anh5 from "./assets/anh5.jpg";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,600;1,8..60,300;1,8..60,400&display=swap');

  :root {
    --red: #B5271D; --red-dark: #7A1912;
    --gold: #C9942A; --gold-light: #E8C26A;
    --cream: #F5EFE0; --paper: #EDE3CC;
    --ink: #1E1A14; --ink-muted: #4A4234; --ink-light: #7A7060;
    --green-dark: #2D5A27; --border: rgba(30,26,20,0.15);
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }

  @keyframes fadeUp    { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeIn    { from{opacity:0} to{opacity:1} }
  @keyframes slideDown { from{opacity:0;transform:translateY(-12px)} to{opacity:1;transform:translateY(0)} }
  @keyframes drawLine  { from{transform:scaleX(0)} to{transform:scaleX(1)} }
  @keyframes shimmer   { 0%,100%{opacity:0.06} 50%{opacity:0.13} }
  @keyframes countUp   { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
  @keyframes drawerIn  { from{transform:translateX(100%);opacity:0} to{transform:translateX(0);opacity:1} }
  @keyframes drawerOut { from{transform:translateX(0);opacity:1} to{transform:translateX(100%);opacity:0} }
  @keyframes overlayIn { from{opacity:0} to{opacity:1} }

  .app {
    font-family: 'Source Serif 4', Georgia, serif;
    background: var(--cream); color: var(--ink);
    line-height: 1.75; font-size: 16px; min-height: 100vh;
  }

  /* HERO */
  .hero {
    background: var(--red-dark); color: var(--cream);
    position: relative; overflow: hidden;
    min-height: 520px; display: flex; align-items: center;
  }
  .hero-pattern {
    position:absolute; inset:0;
    background-image:
      repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(255,255,255,.04) 39px,rgba(255,255,255,.04) 40px),
      repeating-linear-gradient(90deg,transparent,transparent 39px,rgba(255,255,255,.04) 39px,rgba(255,255,255,.04) 40px);
    pointer-events:none;
  }
  .hero-star {
    position:absolute; top:-60px; right:-40px;
    font-size:300px; line-height:1; color:var(--gold); opacity:.06;
    pointer-events:none; user-select:none; font-family:serif;
    animation: shimmer 4s ease-in-out infinite;
  }
  .hero-content {
    position:relative; z-index:2;
    max-width:900px; margin:0 auto;
    padding:80px 48px; text-align:center;
  }
  .hero-label {
    display:inline-block; background:var(--gold); color:var(--red-dark);
    font-size:11px; font-weight:700; letter-spacing:3px; text-transform:uppercase;
    padding:5px 18px; border-radius:2px; margin-bottom:28px;
    animation: fadeIn .6s ease both;
  }
  .hero h1 {
    font-family:'Playfair Display',serif;
    font-size:clamp(28px,5vw,52px); font-weight:900; line-height:1.15;
    margin-bottom:16px; color:#fff;
    animation: fadeUp .7s .15s ease both;
  }
  .hero h1 em { color:var(--gold-light); font-style:italic; }
  .hero-subtitle {
    font-size:17px; font-weight:300; color:rgba(255,255,255,.75);
    max-width:620px; margin:0 auto 32px; line-height:1.65;
    animation: fadeUp .7s .3s ease both;
  }
  .hero-divider {
    width:60px; height:2px; background:var(--gold); margin:0 auto;
    transform-origin:left;
    animation: drawLine .8s .5s ease both;
  }

  /* NAV */
  .nav {
    background:var(--red); position:sticky; top:0; z-index:100;
    border-bottom:3px solid var(--gold);
    box-shadow:0 2px 12px rgba(0,0,0,.2);
    animation: slideDown .4s ease both;
  }
  .nav-inner { max-width:900px; margin:0 auto; display:flex; overflow-x:auto; scrollbar-width:none; }
  .nav-inner::-webkit-scrollbar { display:none; }
  .nav-btn {
    background:none; border:none; color:rgba(255,255,255,.75);
    font-family:'Source Serif 4',serif; font-size:13px; font-weight:600;
    letter-spacing:.5px; padding:14px 20px; white-space:nowrap;
    cursor:pointer; transition:all .25s; border-bottom:2px solid transparent;
  }
  .nav-btn:hover, .nav-btn.active { color:var(--gold-light); border-bottom-color:var(--gold-light); }

  .container { max-width:900px; margin:0 auto; padding:0 24px; }

  /* SECTION */
  .section {
    padding:64px 0 48px; border-bottom:1px solid var(--border);
    opacity:0; transform:translateY(32px);
    transition:opacity .65s ease, transform .65s ease;
  }
  .section.visible { opacity:1; transform:translateY(0); }
  .section:last-child { border-bottom:none; }

  .section-number {
    font-family:'Playfair Display',serif; font-size:72px; font-weight:900;
    color:rgba(181,39,29,.08); line-height:1; margin-bottom:-18px; letter-spacing:-2px;
  }
  .section-tag {
    display:inline-flex; align-items:center; gap:8px;
    font-size:11px; font-weight:700; letter-spacing:2.5px; text-transform:uppercase;
    color:var(--red); margin-bottom:10px;
  }
  .section-tag::before { content:''; display:block; width:20px; height:2px; background:var(--red); }
  .section h2 {
    font-family:'Playfair Display',serif; font-size:clamp(22px,3.5vw,32px);
    font-weight:700; line-height:1.25; color:var(--ink); margin-bottom:24px;
  }
  .section p { font-size:16px; color:var(--ink-muted); margin-bottom:16px; line-height:1.8; }
  .section p:last-child { margin-bottom:0; }

  /* PULLQUOTE */
  .pullquote {
    border-left:4px solid var(--gold); margin:28px 0; padding:16px 24px;
    background:var(--paper); border-radius:0 6px 6px 0;
    transition:border-color .3s;
  }
  .pullquote:hover { border-color:var(--red); }
  .pullquote p { font-size:18px !important; font-style:italic; font-weight:300; color:var(--ink) !important; line-height:1.65 !important; margin-bottom:8px !important; }
  .pullquote cite { font-size:12px; font-style:normal; font-weight:600; letter-spacing:1.5px; text-transform:uppercase; color:var(--gold); }

  /* TIMELINE */
  .timeline { margin:32px 0; }
  .tl-item { display:flex; gap:20px; margin-bottom:24px; }
  .tl-left { display:flex; flex-direction:column; align-items:center; flex-shrink:0; width:64px; }
  .tl-year {
    background:var(--red); color:#fff; font-family:'Playfair Display',serif;
    font-size:13px; font-weight:700; padding:4px 8px; border-radius:3px;
    white-space:nowrap; text-align:center; transition:background .2s, transform .2s;
  }
  .tl-item:hover .tl-year { background:var(--red-dark); transform:scale(1.05); }
  .tl-line { width:2px; flex:1; background:var(--border); margin-top:6px; }
  .tl-body { flex:1; padding-bottom:8px; }
  .tl-title { font-size:15px; font-weight:600; color:var(--ink); margin-bottom:4px; }
  .tl-desc { font-size:14px; color:var(--ink-muted); line-height:1.65; }

  /* STATS */
  .stats { display:grid; grid-template-columns:repeat(auto-fit,minmax(140px,1fr)); gap:12px; margin:28px 0; }
  .stat {
    background:var(--paper); border-radius:6px; padding:18px 16px; text-align:center;
    transition:transform .2s, box-shadow .2s;
    animation: countUp .5s ease both;
  }
  .stat:hover { transform:translateY(-3px); box-shadow:0 6px 20px rgba(0,0,0,.08); }
  .stat:nth-child(1){animation-delay:.05s}.stat:nth-child(2){animation-delay:.1s}
  .stat:nth-child(3){animation-delay:.15s}.stat:nth-child(4){animation-delay:.2s}
  .stat-num { font-family:'Playfair Display',serif; font-size:30px; font-weight:900; color:var(--red); display:block; line-height:1; margin-bottom:6px; }
  .stat-label { font-size:12px; font-weight:600; color:var(--ink-muted); line-height:1.4; }

  /* CARDS (section IV) */
  .cards { display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:16px; margin:28px 0; }
  .card {
    background:#fff; border:1px solid var(--border); border-radius:8px; padding:20px;
    transition:box-shadow .25s, transform .25s, border-color .25s;
  }
  .card:hover { box-shadow:0 6px 24px rgba(0,0,0,.1); transform:translateY(-3px); border-color:var(--gold); }
  .card-icon { font-size:28px; margin-bottom:10px; display:block; }
  .card h3 { font-family:'Playfair Display',serif; font-size:15px; font-weight:700; color:var(--ink); margin-bottom:6px; }
  .card p { font-size:13px !important; color:var(--ink-light) !important; line-height:1.6 !important; margin-bottom:0 !important; }

  /* PRO/CON */
  .procon { display:grid; grid-template-columns:1fr 1fr; gap:16px; margin:28px 0; }
  @media(max-width:560px){.procon{grid-template-columns:1fr}}
  .procon-col { border-radius:8px; padding:20px; transition:transform .2s; }
  .procon-col:hover { transform:translateY(-2px); }
  .procon-col.pro { background:#EDF4E8; border:1px solid #C3DDB8; }
  .procon-col.con { background:#FBF0ED; border:1px solid #F0C4B8; }
  .procon-col h4 { font-family:'Playfair Display',serif; font-size:14px; font-weight:700; margin-bottom:12px; }
  .procon-col.pro h4 { color:var(--green-dark); }
  .procon-col.con h4 { color:var(--red-dark); }
  .procon-col ul { list-style:none; }
  .procon-col ul li { font-size:13.5px; color:var(--ink-muted); padding:5px 0 5px 18px; border-bottom:1px solid rgba(0,0,0,.06); line-height:1.55; position:relative; }
  .procon-col ul li:last-child { border-bottom:none; }
  .procon-col.pro ul li::before { content:'✓'; position:absolute; left:0; color:var(--green-dark); font-weight:700; font-size:12px; }
  .procon-col.con ul li::before { content:'✗'; position:absolute; left:0; color:var(--red); font-weight:700; font-size:12px; }

  /* VERDICT */
  .verdict {
    background:var(--red-dark); color:#fff; border-radius:10px;
    padding:32px 36px; margin:32px 0; position:relative; overflow:hidden;
    transition:transform .2s;
  }
  .verdict:hover { transform:scale(1.005); }
  .verdict::before { content:'"'; position:absolute; top:-20px; left:16px; font-family:'Playfair Display',serif; font-size:160px; opacity:.08; color:var(--gold); line-height:1; pointer-events:none; }
  .verdict h3 { font-family:'Playfair Display',serif; font-size:22px; font-weight:700; color:var(--gold-light); margin-bottom:14px; }
  .verdict p { font-size:15.5px !important; color:rgba(255,255,255,.85) !important; line-height:1.8 !important; margin-bottom:12px !important; }

  /* IMAGES */
  .img-gallery { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin:24px 0; }
  @media(max-width:560px){.img-gallery{grid-template-columns:1fr}}
  .img-card { border-radius:8px; overflow:hidden; border:1px solid var(--border); background:#fff; transition:transform .25s, box-shadow .25s; }
  .img-card:hover { transform:translateY(-3px); box-shadow:0 8px 24px rgba(0,0,0,.1); }
  .img-card img { width:100%; height:160px; object-fit:cover; display:block; filter:sepia(15%) contrast(1.05); transition:filter .3s; }
  .img-card:hover img { filter:sepia(5%) contrast(1.1); }
  .img-caption { padding:10px 14px; }
  .img-caption strong { display:block; font-size:13px; font-weight:600; color:var(--ink-muted); margin-bottom:3px; }
  .img-caption span { font-size:12px; color:var(--ink-light); font-style:italic; line-height:1.45; display:block; }
  .img-wide { display:grid; grid-template-columns:200px 1fr; gap:16px; margin:20px 0; align-items:center; background:#fff; border:1px solid var(--border); border-radius:8px; overflow:hidden; transition:box-shadow .2s; }
  .img-wide:hover { box-shadow:0 4px 16px rgba(0,0,0,.08); }
  @media(max-width:560px){.img-wide{grid-template-columns:1fr}}
  .img-wide img { width:100%; height:160px; object-fit:cover; display:block; filter:sepia(15%) contrast(1.05); }
  .img-wide-caption { padding:16px 16px 16px 0; }
  @media(max-width:560px){.img-wide-caption{padding:12px 16px 16px}}
  .img-wide-caption strong { display:block; font-size:14px; font-weight:600; color:var(--ink); margin-bottom:6px; font-family:'Playfair Display',serif; }
  .img-wide-caption span { font-size:13px; color:var(--ink-muted); line-height:1.6; font-style:italic; }
  .img-float-wrap { display:grid; grid-template-columns:180px 1fr; gap:16px; margin:20px 0; align-items:start; }
  @media(max-width:560px){.img-float-wrap{grid-template-columns:1fr}}
  .img-float { border-radius:8px; overflow:hidden; border:1px solid var(--border); }
  .img-float img { width:100%; height:130px; object-fit:cover; display:block; filter:sepia(15%) contrast(1.05); }
  .img-float-caption { padding:6px 8px; font-size:11px; color:var(--ink-light); font-style:italic; text-align:center; background:#fff; }

  /* EXP CARDS */
  .exp-cards { display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:16px; margin:28px 0; }
  .exp-card {
    background:#fff; border:1px solid var(--border); border-radius:10px;
    padding:22px; cursor:pointer; position:relative; overflow:hidden;
    transition:box-shadow .25s, transform .25s, border-color .25s;
  }
  .exp-card::after {
    content:''; position:absolute; bottom:0; left:0; right:0; height:3px;
    background:var(--gold); transform:scaleX(0); transform-origin:left;
    transition:transform .3s ease;
  }
  .exp-card:hover { box-shadow:0 8px 28px rgba(0,0,0,.12); transform:translateY(-4px); border-color:var(--gold); }
  .exp-card:hover::after { transform:scaleX(1); }
  .exp-card-icon { font-size:32px; margin-bottom:12px; display:block; transition:transform .2s; }
  .exp-card:hover .exp-card-icon { transform:scale(1.12); }
  .exp-card-title { font-family:'Playfair Display',serif; font-size:15px; font-weight:700; color:var(--ink); margin-bottom:6px; }
  .exp-card-desc { font-size:13px; color:var(--ink-light); line-height:1.6; margin-bottom:12px; }
  .exp-card-hint {
    display:inline-flex; align-items:center; gap:5px;
    font-size:11px; color:var(--gold); font-weight:700;
    letter-spacing:.5px; text-transform:uppercase;
    border:1px solid rgba(201,148,42,.35); border-radius:3px; padding:3px 10px;
    transition:background .2s, color .2s;
  }
  .exp-card:hover .exp-card-hint { background:var(--gold); color:var(--red-dark); }

  /* MODAL DRAWER — 2/3 màn hình */
  .modal-overlay {
    position:fixed; inset:0; z-index:200;
    background:rgba(20,16,10,.6);
    backdrop-filter:blur(4px);
    animation:overlayIn .25s ease both;
  }
  .modal-overlay.closing { animation:fadeIn .2s ease reverse both; }
  .modal-drawer {
    position:fixed; top:0; right:0; bottom:0;
    width:min(67vw,780px);
    background:var(--cream); z-index:201;
    overflow-y:auto; display:flex; flex-direction:column;
    animation:drawerIn .35s cubic-bezier(.22,1,.36,1) both;
    box-shadow:-12px 0 48px rgba(0,0,0,.22);
  }
  .modal-drawer.closing { animation:drawerOut .25s ease both; }
  @media(max-width:700px){ .modal-drawer{ width:92vw; } }

  .modal-header {
    background:var(--red-dark); color:#fff;
    padding:32px 36px 28px;
    position:sticky; top:0; z-index:10; flex-shrink:0;
  }
  .modal-close {
    position:absolute; top:18px; right:22px;
    background:rgba(255,255,255,.12); border:none; color:#fff;
    font-size:18px; width:36px; height:36px; border-radius:50%;
    cursor:pointer; display:flex; align-items:center; justify-content:center;
    transition:background .2s, transform .25s;
  }
  .modal-close:hover { background:rgba(255,255,255,.25); transform:rotate(90deg); }
  .modal-tag {
    display:inline-block; background:var(--gold); color:var(--red-dark);
    font-size:10px; font-weight:700; letter-spacing:2px; text-transform:uppercase;
    padding:3px 10px; border-radius:2px; margin-bottom:12px;
  }
  .modal-title {
    font-family:'Playfair Display',serif; font-size:clamp(22px,3vw,30px);
    font-weight:900; color:#fff; line-height:1.2;
    display:flex; align-items:center; gap:14px;
  }
  .modal-title-icon { font-size:clamp(26px,3vw,34px); }

  .modal-body { padding:36px; flex:1; }
  .modal-body img {
    width:100%; height:240px; object-fit:cover; border-radius:10px;
    display:block; margin-bottom:28px;
    filter:sepia(10%) contrast(1.05);
    box-shadow:0 4px 20px rgba(0,0,0,.12);
  }
  .modal-section-label {
    font-size:11px; font-weight:700; letter-spacing:2.5px; text-transform:uppercase;
    color:var(--red); margin-bottom:18px;
    display:flex; align-items:center; gap:8px;
  }
  .modal-section-label::before { content:''; display:block; width:18px; height:2px; background:var(--red); }
  .modal-para {
    font-size:16px; color:var(--ink-muted); line-height:1.9;
    margin-bottom:18px;
  }
  .modal-para:last-of-type { margin-bottom:0; }
  .modal-highlight {
    background:var(--paper); border-left:4px solid var(--gold);
    border-radius:0 8px 8px 0; padding:16px 20px; margin:24px 0;
    font-size:15px; color:var(--ink); font-style:italic; line-height:1.75;
  }

  .modal-footer {
    padding:20px 36px; border-top:1px solid var(--border);
    background:#fff; flex-shrink:0;
    display:flex; align-items:center; justify-content:space-between;
    gap:12px;
  }
  .modal-nav-btn {
    background:none; border:1px solid var(--border); border-radius:6px;
    padding:9px 18px; font-size:13px; font-weight:600; letter-spacing:.3px;
    color:var(--ink-muted); cursor:pointer; font-family:'Source Serif 4',serif;
    transition:all .2s; display:flex; align-items:center; gap:6px;
  }
  .modal-nav-btn:hover:not(:disabled) { border-color:var(--red); color:var(--red); }
  .modal-nav-btn:disabled { opacity:.3; cursor:default; }
  .modal-dots { display:flex; gap:6px; }
  .modal-dot { width:7px; height:7px; border-radius:50%; background:var(--border); transition:background .2s; }
  .modal-dot.active { background:var(--red); }

  /* SUBSECTION TITLE */
  .subsection-title {
    font-family:'Playfair Display',serif; font-size:17px; font-weight:700;
    color:var(--ink); margin:24px 0 10px; padding-left:12px; border-left:3px solid var(--red);
  }

  /* CONGRESS CARDS — image background */
  .congress-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; margin:16px 0 8px; }
  @media(max-width:560px){.congress-grid{grid-template-columns:1fr}}
  .congress-img-card {
    position:relative; border-radius:10px; overflow:hidden;
    height:200px; cursor:pointer;
    transition:transform .3s, box-shadow .3s;
  }
  .congress-img-card:hover { transform:translateY(-4px); box-shadow:0 12px 32px rgba(0,0,0,.25); }
  .congress-img-card img {
    width:100%; height:100%; object-fit:cover; display:block;
    transition:transform .4s ease, filter .4s ease;
    filter:brightness(.7) sepia(20%);
  }
  .congress-img-card:hover img { transform:scale(1.05); filter:brightness(.55) sepia(30%); }
  .congress-img-overlay {
    position:absolute; inset:0;
    background:linear-gradient(to top, rgba(122,25,18,.92) 0%, rgba(122,25,18,.4) 55%, transparent 100%);
  }
  .congress-img-content {
    position:absolute; bottom:0; left:0; right:0;
    padding:20px 22px;
  }
  .congress-img-tag {
    display:inline-block; background:var(--gold); color:var(--red-dark);
    font-size:10px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase;
    padding:2px 8px; border-radius:2px; margin-bottom:8px;
  }
  .congress-img-title {
    font-family:'Playfair Display',serif; font-size:20px; font-weight:900;
    color:#fff; line-height:1.2; margin-bottom:6px;
  }
  .congress-img-desc {
    font-size:12px; color:rgba(255,255,255,.75); line-height:1.5;
    margin-bottom:10px;
  }
  .congress-img-hint {
    display:inline-flex; align-items:center; gap:5px;
    font-size:11px; color:var(--gold-light); font-weight:700;
    letter-spacing:.5px; text-transform:uppercase;
    border:1px solid rgba(232,194,106,.4); border-radius:3px; padding:3px 10px;
    transition:background .2s, color .2s;
  }
  .congress-img-card:hover .congress-img-hint {
    background:var(--gold); color:var(--red-dark);
    border-color:var(--gold);
  }

  /* AI CHAT */
  .ai-chat { margin-top: 8px; }
  .ai-messages {
    min-height: 200px; max-height: 420px;
    overflow-y: auto; padding: 16px;
    background: #fff; border: 1px solid var(--border);
    border-radius: 10px 10px 0 0;
    display: flex; flex-direction: column; gap: 14px;
    scroll-behavior: smooth;
  }
  .ai-messages::-webkit-scrollbar { width: 4px; }
  .ai-messages::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }
  .ai-msg {
    display: flex; gap: 10px; align-items: flex-start;
    animation: fadeUp .3s ease both;
  }
  .ai-msg.user { flex-direction: row-reverse; }
  .ai-msg-avatar {
    width: 30px; height: 30px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 14px; flex-shrink: 0; font-weight: 700;
  }
  .ai-msg.user .ai-msg-avatar { background: var(--red); color: #fff; font-size: 11px; }
  .ai-msg.ai .ai-msg-avatar { background: var(--paper); color: var(--gold); border: 1px solid var(--border); }
  .ai-msg-bubble {
    max-width: 80%; padding: 10px 14px;
    border-radius: 10px; font-size: 14px; line-height: 1.7;
  }
  .ai-msg.user .ai-msg-bubble {
    background: var(--red-dark); color: #fff;
    border-radius: 10px 2px 10px 10px;
  }
  .ai-msg.ai .ai-msg-bubble {
    background: var(--paper); color: var(--ink-muted);
    border-radius: 2px 10px 10px 10px;
    border: 1px solid var(--border);
  }
  .ai-msg.ai .ai-msg-bubble strong { color: var(--ink); }
  .ai-typing {
    display: flex; gap: 4px; padding: 12px 14px;
    background: var(--paper); border-radius: 2px 10px 10px 10px;
    border: 1px solid var(--border); width: fit-content;
  }
  .ai-typing span {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--ink-light); display: block;
    animation: typingDot 1.2s ease infinite;
  }
  .ai-typing span:nth-child(2) { animation-delay: .2s; }
  .ai-typing span:nth-child(3) { animation-delay: .4s; }
  @keyframes typingDot { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-6px)} }

  .ai-input-row {
    display: flex; gap: 0;
    border: 1px solid var(--border); border-top: none;
    border-radius: 0 0 10px 10px; overflow: hidden;
    background: #fff;
  }
  .ai-input {
    flex: 1; border: none; outline: none;
    padding: 13px 16px; font-size: 14px;
    font-family: 'Source Serif 4', serif; color: var(--ink);
    background: transparent;
  }
  .ai-input::placeholder { color: var(--ink-light); }
  .ai-send {
    background: var(--red); color: #fff; border: none;
    padding: 0 20px; cursor: pointer; font-size: 16px;
    transition: background .2s;
    display: flex; align-items: center; justify-content: center;
  }
  .ai-send:hover { background: var(--red-dark); }
  .ai-send:disabled { background: var(--border); cursor: default; }
  .ai-suggestions {
    display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 14px;
  }
  .ai-suggest-btn {
    background: var(--paper); border: 1px solid var(--border);
    border-radius: 20px; padding: 6px 14px;
    font-size: 12px; color: var(--ink-muted); cursor: pointer;
    font-family: 'Source Serif 4', serif;
    transition: all .2s;
  }
  .ai-suggest-btn:hover { background: var(--red); color: #fff; border-color: var(--red); }

  /* AI USAGE BAR */
  .ai-usage {
    background: var(--ink); padding: 16px 0;
    border-bottom: 1px solid rgba(255,255,255,.08);
  }
  .ai-usage-inner {
    display: flex; align-items: flex-start; gap: 14px;
  }
  .ai-usage-icon {
    color: var(--gold); font-size: 18px; flex-shrink: 0;
    margin-top: 2px;
  }
  .ai-usage-title {
    font-size: 11px; font-weight: 700; letter-spacing: 2px;
    text-transform: uppercase; color: var(--gold-light);
    margin-bottom: 4px;
  }
  .ai-usage-desc {
    font-size: 12px; color: rgba(255,255,255,.5); line-height: 1.6;
  }
  .ai-usage-desc strong { color: rgba(255,255,255,.75); font-weight: 600; }

  /* FOOTER */
  .footer { background:var(--ink); color:rgba(255,255,255,.5); text-align:center; padding:24px; font-size:12px; letter-spacing:.5px; }
  .footer strong { color:var(--gold); font-weight:600; }

  @media(max-width:640px){
    .hero-content{padding:56px 24px}
    .section{padding:48px 0 36px}
    .nav-btn{padding:12px 14px;font-size:12px}
    .modal-body{padding:20px}
    .modal-header{padding:20px 20px 16px}
    .modal-footer{padding:16px 20px}
  }
`;

const limitData = [
  {
    icon: "📉",
    title: "Mất động lực sản xuất",
    tag: "Vấn đề cốt lõi",
    desc: "Thu nhập không gắn với kết quả lao động.",
    detail: [
      "Trong cơ chế bao cấp, lương của người lao động được nhà nước quy định cố định theo ngạch bậc, hoàn toàn không phụ thuộc vào năng suất hay chất lượng công việc. Một công nhân làm tốt và một công nhân làm kém nhận cùng một mức lương — thậm chí người làm kém còn được bảo vệ vì không ai bị sa thải.",
      "Hệ quả là người lao động không có lý do gì để cố gắng hơn mức tối thiểu. Sáng tạo, cải tiến, tăng năng suất đều không được khuyến khích và cũng không mang lại lợi ích gì cho cá nhân. Hiện tượng \"làm cho có\" lan rộng khắp nơi — từ nhà máy đến hợp tác xã, từ cơ quan nhà nước đến nông trường.",
      "Trong nông nghiệp, tình trạng này đặc biệt nghiêm trọng: nông dân làm việc trên đất tập thể với tâm lý \"ruộng đất của nhà nước, lúa của hợp tác xã\" nên chỉ làm đủ chỉ tiêu. Năng suất lúa bình quân của hợp tác xã thường thấp hơn đáng kể so với khi nông dân tự canh tác trên mảnh đất riêng nhỏ được chia.",
    ],
  },
  {
    icon: "🔍",
    title: "Thông tin phi tập trung",
    tag: "Giới hạn nhận thức",
    desc: "Nhà nước không thể nắm đủ thông tin để hoạch định kế hoạch chính xác.",
    highlight: "Nhà kinh tế học Friedrich Hayek đã chỉ ra từ 1945: không một cơ quan trung ương nào có thể thu thập và xử lý đủ thông tin phân tán trong hàng triệu giao dịch thị trường hàng ngày.",
    detail: [
      "Đây là vấn đề mang tính lý luận sâu sắc nhất của kinh tế kế hoạch hóa tập trung. Trong nền kinh tế thị trường, giá cả đóng vai trò như hệ thống tín hiệu tự động — khi cầu tăng, giá tăng, người sản xuất tự điều chỉnh để cung ứng thêm. Nhưng trong bao cấp, giá cả bị nhà nước kiểm soát nên tín hiệu này biến mất.",
      "Ủy ban Kế hoạch Nhà nước phải quyết định sản xuất bao nhiêu gạo, vải, xà phòng, xe đạp, bóng đèn... cho cả nước trong năm tới. Nhưng không ai biết chính xác nhu cầu thực tế là bao nhiêu, ở đâu, lúc nào. Kết quả: mặt hàng này thừa, mặt hàng kia thiếu — và sự mất cân đối này ngày càng tích lũy.",
      "Ở Việt Nam, tình trạng này còn trầm trọng hơn do hệ thống báo cáo từ dưới lên thường bị bóp méo: các đơn vị khai thấp năng lực để nhận chỉ tiêu dễ hoàn thành, khai cao nhu cầu để được phân bổ nhiều nguyên liệu. Nhà nước hoạch định dựa trên số liệu sai từ đầu.",
    ],
  },
  {
    icon: "⚖️",
    title: "Méo mó giá cả",
    tag: "Tham nhũng & Bất bình đẳng",
    desc: "Giá nhà nước thấp hơn giá thị trường tạo ra đầu cơ, tham nhũng và lãng phí.",
    highlight: "Chênh lệch giữa giá nhà nước và giá chợ đen ngày càng lớn — đến đầu thập niên 1980, nhiều mặt hàng chênh lệch 10–20 lần, biến đặc quyền tiếp cận hàng bao cấp thành nguồn thu nhập khổng lồ.",
    detail: [
      "Khi nhà nước bán hàng hóa thấp hơn giá thị trường, ai được quyền mua hàng nhà nước sẽ có lợi thế tuyệt đối. Điều này tạo ra động lực mạnh mẽ để tranh giành quyền phân phối — và từ đó sinh ra tham nhũng có hệ thống. Người có chức vụ, có quan hệ, hoặc làm việc ở các đơn vị phân phối có thể kiếm lợi lớn.",
      "Hệ thống giá kép cũng khuyến khích \"đầu cơ hợp pháp\": mua hàng theo giá nhà nước rồi bán lại theo giá chợ đen. Tầng lớp \"con phe\" — những người chuyên làm trung gian phi chính thức — ra đời và ngày càng không thể thiếu trong nền kinh tế thực tế, dù bị coi là bất hợp pháp.",
      "Hệ quả xã hội sâu xa hơn là sự xói mòn lòng tin: khi người người tìm cách lách luật để tồn tại, khi tham nhũng trở thành bình thường, khi bình đẳng trên danh nghĩa che giấu bất bình đẳng thực tế — xã hội dần mất niềm tin vào tính chính danh của hệ thống.",
    ],
  },
  {
    icon: "🌐",
    title: "Cô lập kinh tế quốc tế",
    tag: "Bối cảnh địa chính trị",
    desc: "Bị phương Tây cấm vận, không tiếp cận công nghệ và vốn đầu tư nước ngoài.",
    highlight: "Mỹ duy trì lệnh cấm vận kinh tế toàn diện với Việt Nam từ 1975 đến 1994 — gần 20 năm Việt Nam bị cắt đứt khỏi hệ thống tài chính và thương mại quốc tế phương Tây.",
    detail: [
      "Ngay sau 1975, Mỹ áp đặt lệnh cấm vận kinh tế toàn diện, phong tỏa tài sản, và vận động các tổ chức quốc tế ngừng viện trợ cho Việt Nam. Điều này đẩy Việt Nam hoàn toàn phụ thuộc vào khối XHCN — đặc biệt là Liên Xô và các nước Đông Âu — trong khi chính khối này cũng đang gặp khó khăn kinh tế ngày càng trầm trọng.",
      "Cô lập quốc tế có nghĩa là Việt Nam không tiếp cận được vốn đầu tư nước ngoài, công nghệ hiện đại, hay thị trường xuất khẩu lớn. Trong khi các nước Đông Nam Á như Thái Lan, Malaysia, Singapore tăng trưởng mạnh nhờ hội nhập kinh tế toàn cầu, Việt Nam ngày càng tụt hậu.",
      "Chiến tranh biên giới với Campuchia (1978) và Trung Quốc (1979) càng làm trầm trọng thêm tình trạng cô lập: ngân sách quốc phòng tăng vọt, quan hệ với Trung Quốc — đối tác thương mại quan trọng — bị cắt đứt, và hình ảnh quốc tế của Việt Nam bị tổn hại nặng nề trong mắt nhiều nước.",
    ],
  },
];

const congressData = [
  {
    icon: "🏛️",
    title: "Đại hội IV — 1976",
    tag: "Kế hoạch 5 năm 1976–1980",
    highlight: "\"Tiến nhanh, tiến mạnh, tiến vững chắc lên chủ nghĩa xã hội\" — Khẩu hiệu chủ đạo của Đại hội IV, phản ánh tư duy lạc quan quá mức về tốc độ xây dựng CNXH.",
    detail: [
      "Đại hội lần thứ IV của Đảng (12/1976) là đại hội đầu tiên sau thống nhất, đặt ra đường lối xây dựng CNXH trên phạm vi cả nước. Đại hội quyết định áp dụng toàn diện cơ chế kế hoạch hóa tập trung, bao cấp — mô hình đã được thực hiện ở miền Bắc từ 1954 — lên toàn quốc.",
      "Kế hoạch 5 năm 1976–1980 đặt ra các mục tiêu rất tham vọng: sản lượng lương thực 21 triệu tấn, phát triển công nghiệp nặng, tập thể hóa nông nghiệp toàn diện ở miền Nam, và xóa bỏ hoàn toàn kinh tế tư nhân. Đây là những mục tiêu được xây dựng thiếu cơ sở thực tiễn, không tính đến điều kiện cụ thể của miền Nam vừa thoát khỏi chiến tranh.",
      "Hậu quả: đến 1980, hầu hết mục tiêu đều không đạt. Sản lượng lương thực chỉ đạt 13–14 triệu tấn. Nền kinh tế rơi vào khủng hoảng nghiêm trọng, thiếu hàng hóa trên diện rộng, lạm phát bắt đầu tăng cao. Đại hội IV đã đặt ra một khung kế hoạch vượt quá năng lực thực tế của đất nước trong giai đoạn hậu chiến.",
    ],
  },
  {
    icon: "📜",
    title: "Đại hội V — 1982",
    tag: "Kế hoạch 5 năm 1981–1985",
    highlight: "Đại hội V là lần đầu tiên Đảng chính thức thừa nhận \"một số sai lầm, khuyết điểm\" trong lãnh đạo kinh tế — nhưng vẫn chưa đủ dũng cảm để từ bỏ cơ chế bao cấp.",
    detail: [
      "Đại hội lần thứ V (3/1982) diễn ra trong bối cảnh khủng hoảng kinh tế đã rõ ràng: lương thực thiếu hụt, lạm phát leo thang, đời sống người dân ngày càng khó khăn. Đây là lần đầu tiên Đảng công khai thừa nhận những sai lầm trong lãnh đạo kinh tế, đặc biệt là việc nóng vội trong cải tạo kinh tế miền Nam và duy trì mô hình bao cấp cứng nhắc.",
      "Kế hoạch 5 năm 1981–1985 có một số điều chỉnh quan trọng: cho phép thực hiện Khoán 100 trong nông nghiệp (giao khoán sản phẩm đến người lao động), nới lỏng một phần cơ chế phân phối, và thừa nhận vai trò bổ sung của thành phần kinh tế cá thể trong một số lĩnh vực.",
      "Tuy nhiên, Đại hội V vẫn giữ nguyên tư duy kế hoạch hóa tập trung làm nền tảng. Những điều chỉnh chỉ mang tính vá víu, không giải quyết được mâu thuẫn cốt lõi của hệ thống. Phải đến Đại hội VI (1986), Đảng mới có bước đột phá thực sự với chính sách Đổi Mới toàn diện.",
    ],
  },
];

const cardData = [
  {
    icon: "🏛️", title: "Quốc hữu hóa sản xuất", tag: "Sở hữu & Tổ chức",
    desc: "Toàn bộ tư liệu sản xuất thuộc sở hữu nhà nước hoặc tập thể.",
    img: null,
    highlight: "Hơn 30.000 cơ sở tư nhân tại Sài Gòn bị tịch thu hoặc buộc phải sáp nhập vào hợp tác xã sau năm 1975.",
    detail: [
      "Sau 1975, toàn bộ nhà máy, xí nghiệp, đất đai và tư liệu sản xuất tại miền Nam bị quốc hữu hóa hoặc chuyển sang hình thức hợp tác xã. Đây là bước đi đầu tiên để thống nhất hai nền kinh tế có xuất phát điểm hoàn toàn khác nhau.",
      "Xí nghiệp quốc doanh là hình thức tổ chức chủ đạo — toàn bộ hoạt động do nhà nước chỉ đạo từ đầu vào đến đầu ra. Người lao động trở thành \"công nhân viên nhà nước\" với mức lương cố định, không phụ thuộc vào năng suất hay kết quả sản xuất.",
      "Hệ quả tất yếu: triệt tiêu động lực cá nhân, gây lãng phí nguồn lực trên diện rộng và sản xuất kém hiệu quả kéo dài. Người ta gọi đây là hiện tượng \"cha chung không ai khóc\" — không ai chịu trách nhiệm, không ai quan tâm đến kết quả cuối cùng.",
    ],
  },
  {
    icon: "📋", title: "Kế hoạch hóa tập trung", tag: "Quản lý & Điều hành",
    desc: "Nhà nước lập kế hoạch sản xuất, phân bổ nguyên liệu cho từng đơn vị.",
    img: null,
    highlight: "Kế hoạch 5 năm 1976–1980 đặt mục tiêu 21 triệu tấn lương thực — nhưng thực tế chỉ đạt 13–14 triệu tấn.",
    detail: [
      "Ủy ban Kế hoạch Nhà nước ban hành kế hoạch 5 năm và kế hoạch hàng năm cho từng ngành, từng địa phương, từng xí nghiệp. Mọi quyết định sản xuất — từ loại hàng, số lượng đến giá cả — đều do cơ quan nhà nước ấn định từ trên xuống.",
      "Các xí nghiệp không có quyền tự quyết. Cơ chế vận hành theo nguyên tắc: nếu lỗ, nhà nước bù; nếu lãi, nhà nước thu. Điều này dẫn đến không ai có động lực tối ưu hóa sản xuất hay tiết kiệm chi phí.",
      "Thất bại của kế hoạch 5 năm đầu tiên (1976–1980) là hồi chuông báo động rõ nhất: mục tiêu sản lượng lương thực 21 triệu tấn không đạt được, trong khi dân số tăng nhanh khiến tình trạng thiếu lương thực ngày càng trầm trọng.",
    ],
  },
  {
    icon: "🎫", title: "Chế độ tem phiếu", tag: "Phân phối & Tiêu dùng",
    desc: "Lương thực, hàng hóa phân phối qua tem phiếu theo định mức nhà nước.",
    img: anh2,
    highlight: "\"Tông Đản là của vua quan / Nhà Thờ là của trung gian nịnh thần / Đồng Xuân là của thương nhân / Vỉa hè là của nhân dân anh hùng.\" — Ca dao dân gian thời bao cấp.",
    detail: [
      "Hệ thống tem phiếu quy định mỗi người chỉ được mua một lượng hàng hóa nhất định mỗi tháng: công nhân được 20kg gạo, cán bộ chỉ 13kg. Ngoài gạo còn có tem cho thịt, vải, xà phòng, dầu hỏa, đường, sữa — hầu như mọi mặt hàng thiết yếu.",
      "Chất lượng và số lượng hàng hóa phụ thuộc vào cấp bậc: quan chức cấp cao mua ở cửa hàng đặc biệt phố Tông Đản với hàng tốt hơn, trong khi người dân thường phải xếp hàng từ sáng sớm — nhiều khi đến lượt thì hết hàng.",
      "Sự bất bình đẳng này khắc sâu vào ký ức xã hội và là một trong những nguyên nhân làm xói mòn niềm tin vào hệ thống. Chợ đen ngày càng phát triển như một lối thoát tất yếu của thực tế.",
    ],
  },
  {
    icon: "💰", title: "Giá nhà nước", tag: "Giá cả & Tài chính",
    desc: "Hai hệ thống giá song song: giá nhà nước và giá thị trường tự do.",
    img: null,
    highlight: "Đến giữa thập niên 1980, giá chợ đen cao gấp 10–20 lần giá nhà nước — tạo siêu lợi nhuận cho những ai có đặc quyền tiếp cận hàng bao cấp.",
    detail: [
      "Nhà nước ấn định giá chính thức cho tất cả hàng hóa — thường thấp hơn rất nhiều so với giá trị thực. Điều này tạo ra hai thị trường song song: thị trường nhà nước (giá thấp, khan hiếm) và chợ đen (giá cao, hàng đầy đủ).",
      "Khoảng cách giá ngày càng lớn khuyến khích tham nhũng — những ai có quyền tiếp cận hàng nhà nước giá thấp có thể bán lại kiếm lời. Đây là cơ sở cho sự hình thành tầng lớp \"con phe\" — giới trung gian phi chính thức nhưng không thể thiếu.",
      "Hệ quả cuối cùng là lạm phát phi mã: khi nhà nước liên tục in tiền để bù thâm hụt ngân sách, đồng tiền mất giá nghiêm trọng, đạt đỉnh 774% năm 1986 — xóa sạch tiết kiệm của hàng triệu gia đình lao động.",
    ],
  },
];

function CardModal({ card, cardIndex, total, onClose, onPrev, onNext }) {
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") handleClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, []);

  const handleClose = () => { setClosing(true); setTimeout(onClose, 250); };

  return (
    <>
      <div className={`modal-overlay${closing ? " closing" : ""}`} onClick={handleClose} />
      <div className={`modal-drawer${closing ? " closing" : ""}`}>
        <div className="modal-header">
          <button className="modal-close" onClick={handleClose}>✕</button>
          <div className="modal-tag">{card.tag}</div>
          <div className="modal-title">
            <span className="modal-title-icon">{card.icon}</span>
            {card.title}
          </div>
        </div>
        <div className="modal-body">
          {card.img && <img src={card.img} alt={card.title} />}
          <div className="modal-section-label">Phân tích chi tiết</div>
          {card.detail.map((p, i) => <p key={i} className="modal-para">{p}</p>)}
          <div className="modal-highlight">{card.highlight}</div>
        </div>
        <div className="modal-footer">
          <button className="modal-nav-btn" onClick={onPrev} disabled={cardIndex === 0}>← Trước</button>
          <div className="modal-dots">
            {Array.from({ length: total }).map((_, i) => (
              <div key={i} className={`modal-dot${i === cardIndex ? " active" : ""}`} />
            ))}
          </div>
          <button className="modal-nav-btn" onClick={onNext} disabled={cardIndex === total - 1}>Tiếp →</button>
        </div>
      </div>
    </>
  );
}

function ExpandableCard({ card, index, onOpen }) {
  return (
    <div className="exp-card" onClick={() => onOpen(index)}>
      <span className="exp-card-icon">{card.icon}</span>
      <div className="exp-card-title">{card.title}</div>
      <div className="exp-card-desc">{card.desc}</div>
      <div className="exp-card-hint">Xem chi tiết ↗</div>
    </div>
  );
}

const SYSTEM_PROMPT = `Bạn là trợ lý học tập chuyên về chủ đề "Kinh tế bao cấp Việt Nam 1975–1986". Nhiệm vụ của bạn là giúp người đọc hiểu rõ hơn về nội dung bài viết.

Phạm vi trả lời: chỉ trả lời các câu hỏi liên quan đến:
- Bối cảnh lịch sử Việt Nam sau năm 1975
- Cơ chế kinh tế kế hoạch hóa tập trung, bao cấp
- Đại hội IV (1976) và Đại hội V (1982)
- Kết quả, hạn chế của cơ chế bao cấp
- Đổi Mới 1986 và quá trình chuyển đổi
- Nhận định, đánh giá về giai đoạn này

Nếu câu hỏi ngoài phạm vi trên, hãy lịch sự từ chối và gợi ý câu hỏi phù hợp hơn.

Phong cách: thân thiện, rõ ràng, ngắn gọn (tối đa 150 từ mỗi câu trả lời). Trả lời bằng tiếng Việt. Dùng **in đậm** để nhấn mạnh các từ khóa quan trọng.`;

const SUGGESTIONS = [
  "Tem phiếu là gì?",
  "Vì sao Đổi Mới 1986 thành công?",
  "Khoán 100 là gì?",
  "Lạm phát 774% có nghĩa gì?",
];

function AiChat() {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Xin chào! Tôi có thể giải thích thêm về bất kỳ nội dung nào trong bài — từ cơ chế tem phiếu, Đại hội IV, cho đến lý do Đổi Mới 1986 thành công. Bạn muốn hỏi gì?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text) => {
    const q = text || input.trim();
    if (!q || loading) return;
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: q }]);
    setLoading(true);
    try {
      const allMsgs = [...messages, { role: "user", text: q }];
      const contents = allMsgs.map(m => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.text }],
      }));

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
            contents,
            generationConfig: { maxOutputTokens: 800 },
          }),
        }
      );
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text
        || "Xin lỗi, có lỗi xảy ra. Vui lòng thử lại.";
      setMessages(prev => [...prev, { role: "ai", text: reply }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: "ai", text: `Lỗi: ${err.message}` }]);
    }
    setLoading(false);
  };

  return (
    <div className="ai-chat">
      <div className="ai-suggestions">
        {SUGGESTIONS.map((s, i) => (
          <button key={i} className="ai-suggest-btn" onClick={() => send(s)}>{s}</button>
        ))}
      </div>
      <div className="ai-messages">
        {messages.map((m, i) => (
          <div key={i} className={`ai-msg ${m.role}`}>
            <div className="ai-msg-avatar">{m.role === "user" ? "Bạn" : "✦"}</div>
            <div className="ai-msg-bubble" dangerouslySetInnerHTML={{
              __html: m.text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br/>")
            }} />
          </div>
        ))}
        {loading && (
          <div className="ai-msg ai">
            <div className="ai-msg-avatar">✦</div>
            <div className="ai-typing"><span/><span/><span/></div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <div className="ai-input-row">
        <input
          className="ai-input"
          placeholder="Đặt câu hỏi về kinh tế bao cấp 1975–1986..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && send()}
          disabled={loading}
        />
        <button className="ai-send" onClick={() => send()} disabled={loading || !input.trim()}>
          {loading ? "..." : "↑"}
        </button>
      </div>
    </div>
  );
}

const timelineData = [
  { year: "1975", title: "Thống nhất đất nước", desc: "Miền Nam hoàn toàn giải phóng. Bắt đầu quá trình cải tạo kinh tế XHCN tại miền Nam, xóa bỏ kinh tế tư nhân." },
  { year: "1976", title: "Đại hội IV – Chủ trương bao cấp toàn quốc", desc: "Đảng chính thức áp dụng kế hoạch hóa tập trung trên phạm vi cả nước, tiến nhanh lên chủ nghĩa xã hội." },
  { year: "1978", title: "Chiến tranh biên giới Tây Nam & Phía Bắc", desc: "Xung đột với Campuchia và Trung Quốc làm cạn kiệt thêm nguồn lực quốc gia, tăng gánh nặng ngân sách quân sự." },
  { year: "1979", title: "Khoán 100 – Tín hiệu đầu tiên", desc: "Chỉ thị 100 cho phép \"khoán sản phẩm đến người lao động\", rạn nứt đầu tiên trong tư duy bao cấp." },
  { year: "1986", title: "Đại hội VI – Đổi Mới", desc: "Đảng chính thức từ bỏ cơ chế bao cấp, chuyển sang kinh tế hàng hóa nhiều thành phần." },
];

const navItems = [
  { id: "boi-canh", label: "I. Bối cảnh" },
  { id: "chu-truong", label: "II. Chủ trương" },
  { id: "ket-qua", label: "III. Kết quả" },
  { id: "han-che", label: "IV. Hạn chế" },
  { id: "nhan-dinh", label: "V. Nhận định" },
  { id: "ai-chat", label: "✦ Hỏi AI" },
];

function useIntersection(ref) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return visible;
}

function AnimatedSection({ id, children }) {
  const ref = useRef(null);
  const visible = useIntersection(ref);
  return (
    <div id={id} ref={ref} className={`section${visible ? " visible" : ""}`}>
      <div className="container">{children}</div>
    </div>
  );
}

function Timeline() {
  return (
    <div className="timeline">
      {timelineData.map((item, i) => (
        <div key={i} className="tl-item">
          <div className="tl-left">
            <div className="tl-year">{item.year}</div>
            {i < timelineData.length - 1 && <div className="tl-line" />}
          </div>
          <div className="tl-body">
            <div className="tl-title">{item.title}</div>
            <div className="tl-desc">{item.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function BaoCapWebsite() {
  const [activeNav, setActiveNav] = useState("boi-canh");
  const [modalIndex, setModalIndex] = useState(null);
  const [congressModal, setCongressModal] = useState(null);
  const [limitModal, setLimitModal] = useState(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const onScroll = () => {
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const r = el.getBoundingClientRect();
          if (r.top <= 120 && r.bottom > 120) { setActiveNav(item.id); break; }
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="app">
      <style>{styles}</style>

      {modalIndex !== null && (
        <CardModal
          card={cardData[modalIndex]}
          cardIndex={modalIndex}
          total={cardData.length}
          onClose={() => setModalIndex(null)}
          onPrev={() => setModalIndex(i => Math.max(0, i - 1))}
          onNext={() => setModalIndex(i => Math.min(cardData.length - 1, i + 1))}
        />
      )}

      {congressModal !== null && (
        <CardModal
          card={congressData[congressModal]}
          cardIndex={congressModal}
          total={congressData.length}
          onClose={() => setCongressModal(null)}
          onPrev={() => setCongressModal(i => Math.max(0, i - 1))}
          onNext={() => setCongressModal(i => Math.min(congressData.length - 1, i + 1))}
        />
      )}

      {limitModal !== null && (
        <CardModal
          card={limitData[limitModal]}
          cardIndex={limitModal}
          total={limitData.length}
          onClose={() => setLimitModal(null)}
          onPrev={() => setLimitModal(i => Math.max(0, i - 1))}
          onNext={() => setLimitModal(i => Math.min(limitData.length - 1, i + 1))}
        />
      )}

      <div className="hero">
        <div className="hero-pattern" />
        <div className="hero-star">★</div>
        <div className="hero-content">
          <div className="hero-label">Lịch sử Kinh tế Việt Nam</div>
          <h1>Kinh Tế Bao Cấp<br /><em>1975 – 1986</em></h1>
          <p className="hero-subtitle">Sai lầm lịch sử hay lựa chọn tất yếu? Phân tích toàn diện về cơ chế kinh tế kế hoạch hóa tập trung trong giai đoạn đầu thống nhất đất nước.</p>
          <div className="hero-divider" />
        </div>
      </div>

      <nav className="nav">
        <div className="nav-inner">
          {navItems.map((item) => (
            <button key={item.id} className={`nav-btn${activeNav === item.id ? " active" : ""}`} onClick={() => scrollTo(item.id)}>
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      <main>
        <AnimatedSection id="boi-canh">
          <div className="section-number">01</div>
          <div className="section-tag">Bối cảnh lịch sử</div>
          <h2>Hoàn cảnh đất nước sau năm 1975</h2>
          <p>Ngày 30/4/1975 đánh dấu bước ngoặt trọng đại: đất nước thống nhất sau hơn ba thập kỷ chiến tranh. Nhưng Việt Nam bước ra với nền kinh tế kiệt sức, hạ tầng tan hoang, và hai miền có mô hình kinh tế hoàn toàn khác biệt.</p>
          <div className="stats">
            {[
              { num: "Phần lớn", label: "Dân số làm nông nghiệp" },
              { num: "~ 5Tr.", label: "Người thiệt mạng trong chiến tranh" },
              { num: "774%", label: "Lạm phát đỉnh điểm năm 1986" },
              { num: "Cô lập", label: "Mỹ phong tỏa thương mại toàn diện" },
            ].map((s, i) => (
              <div key={i} className="stat"><span className="stat-num">{s.num}</span><span className="stat-label">{s.label}</span></div>
            ))}
          </div>
          <Timeline />
          <div className="img-gallery">
            <div className="img-card"><img src={anh1} alt="30/4/1975" /><div className="img-caption"><strong>30/4/1975 — Ngày thống nhất</strong><span>Xe tăng tiến vào Dinh Độc Lập, kết thúc chiến tranh, mở ra giai đoạn xây dựng đất nước.</span></div></div>
            <div className="img-card"><img src={anh2} alt="Tem phiếu" /><div className="img-caption"><strong>Tem phiếu thời bao cấp</strong><span>Phân phối hàng hóa theo định mức qua hệ thống tem phiếu nhà nước.</span></div></div>
            <div className="img-card"><img src={anh3} alt="Nông nghiệp" /><div className="img-caption"><strong>Nông nghiệp tập thể hóa</strong><span>Nông dân làm việc trong hợp tác xã theo kế hoạch nhà nước.</span></div></div>
          </div>
          <div className="pullquote">
            <p>Chúng ta đã tiến lên chủ nghĩa xã hội trong hoàn cảnh đặc biệt: vừa ra khỏi chiến tranh, vừa bị bao vây cô lập, vừa phải xây dựng từ đầu.</p>
            <cite>Bối cảnh 1975–1986</cite>
          </div>
        </AnimatedSection>

        <AnimatedSection id="chu-truong">
          <div className="section-number">02</div>
          <div className="section-tag">Chủ trương & Mục tiêu</div>
          <h2>Cơ chế kinh tế kế hoạch hóa tập trung, bao cấp</h2>
          <p>Cơ chế bao cấp xây dựng trên ba trụ cột: nhà nước độc quyền phân phối, giá cả do nhà nước ấn định, lao động phân công theo kế hoạch. <strong>Nhấn vào từng mục bên dưới để xem phân tích chi tiết.</strong></p>
          <div className="exp-cards">
            {cardData.map((card, i) => <ExpandableCard key={i} card={card} index={i} onOpen={setModalIndex} />)}
          </div>
          <div className="subsection-title">Mục tiêu cụ thể của chủ trương</div>
          <p>Đảng và Nhà nước xác định bốn mục tiêu trọng tâm: <strong>(1)</strong> Thống nhất và cải tạo nền kinh tế hai miền theo định hướng XHCN; <strong>(2)</strong> Tập trung nguồn lực phục hồi sản xuất sau chiến tranh; <strong>(3)</strong> Đảm bảo công bằng phân phối trong điều kiện khan hiếm; <strong>(4)</strong> Xây dựng cơ sở vật chất kỹ thuật cho CNXH theo kế hoạch 5 năm.</p>
          <div className="congress-grid">
            {congressData.map((c, i) => (
              <div key={i} className="congress-img-card" onClick={() => setCongressModal(i)}>
                <img src={i === 0 ? anh4 : anh5} alt={c.title} />
                <div className="congress-img-overlay" />
                <div className="congress-img-content">
                  <div className="congress-img-tag">{c.tag}</div>
                  <div className="congress-img-title">{c.title}</div>
                  <div className="congress-img-desc">{c.detail[0].slice(0, 80)}…</div>
                  <div className="congress-img-hint">Xem chi tiết ↗</div>
                </div>
              </div>
            ))}
          </div>
         
        </AnimatedSection>

        <AnimatedSection id="ket-qua">
          <div className="section-number">03</div>
          <div className="section-tag">Kết quả thực hiện</div>
          <h2>Kết quả giai đoạn 1976–1986</h2>
          <p>Giai đoạn đầu duy trì được ổn định chính trị-xã hội và phân phối tối thiểu. Tuy nhiên từ 1980, các chỉ số kinh tế liên tục xấu đi.</p>
          <div className="stats">
            {[
              { num: "13,4tr", label: "Sản lượng lương thực bình quân" },
              { num: "774%", label: "Lạm phát năm 1986 — đỉnh khủng hoảng" },
              { num: "Hàng tiêu dùng", label: "khan hiếm và thiếu hụt trầm trọng" },
              { num: "1986", label: "Năm Đổi Mới — chính thức bỏ bao cấp" },
            ].map((s, i) => (
              <div key={i} className="stat"><span className="stat-num">{s.num}</span><span className="stat-label">{s.label}</span></div>
            ))}
          </div>
          <div className="procon">
            <div className="procon-col pro"><h4>✦ Thành tựu đạt được</h4><ul>{["Duy trì trật tự xã hội trong giai đoạn chuyển tiếp","Đảm bảo nhu cầu tối thiểu cho cán bộ, công nhân viên","Tập trung nguồn lực tái thiết hạ tầng bị tàn phá","Phổ cập giáo dục và xóa mù chữ được đẩy mạnh","Thống nhất hành chính hai hệ thống kinh tế"].map((li,i)=><li key={i}>{li}</li>)}</ul></div>
            <div className="procon-col con"><h4>✦ Hạn chế bộc lộ rõ</h4><ul>{["Lạm phát phi mã: 774% năm 1986","Thiếu lương thực, nạn đói cục bộ nhiều vùng","Năng suất lao động thấp, không có động lực","Kinh tế ngầm và chợ đen bùng phát","Hàng triệu người vượt biên rời bỏ đất nước"].map((li,i)=><li key={i}>{li}</li>)}</ul></div>
          </div>
          <div className="pullquote">
            <p>Cuối những năm 1970, người dân quen với việc "xé rào" — buôn bán ngoài kế hoạch nhà nước để tồn tại.</p>
            <cite>Thực trạng kinh tế 1979–1985</cite>
          </div>
          
            <p>Đến đầu thập niên 1980, nhiều địa phương tự phát "phá rào" — áp dụng khoán, mua bán theo giá thị trường bất chấp quy định. Đây là minh chứng rõ nhất cho sự thất bại của cơ chế bao cấp trước áp lực thực tế.</p>
       
        </AnimatedSection>

        <AnimatedSection id="han-che">
          <div className="section-number">04</div>
          <div className="section-tag">Phân tích hạn chế</div>
          <h2>Vì sao cơ chế bao cấp không thể duy trì lâu dài?</h2>
          <p>Mâu thuẫn nội tại xuất phát từ cả nguyên nhân khách quan lẫn sai lầm tư duy chủ quan. <strong>Nhấn vào từng mục để xem phân tích chi tiết.</strong></p>
          <div className="exp-cards">
            {limitData.map((card, i) => (
              <ExpandableCard key={i} card={card} index={i} onOpen={setLimitModal} />
            ))}
          </div>
          <p>Viện trợ từ Liên Xô — nguồn duy trì sự sống còn của bao cấp — dần thu hẹp khi Liên Xô cũng chìm vào khủng hoảng. Khi chiếc "nạng" viện trợ không còn, cơ chế bao cấp không thể tự đứng vững.</p>
        </AnimatedSection>

        <AnimatedSection id="nhan-dinh">
          <div className="section-number">05</div>
          <div className="section-tag">Nhận định cá nhân</div>
          <h2>Tất yếu lịch sử hay sai lầm có thể tránh?</h2>
          <p>Theo quan điểm cá nhân, câu trả lời nằm ở <em>cả hai vế</em>: vừa có tính tất yếu trong điều kiện lịch sử cụ thể, vừa tồn tại những sai lầm chủ quan đáng trách.</p>
          <div className="verdict">
            <h3>Quan điểm của người viết</h3>
            <p>Tôi cho rằng việc <em>lựa chọn</em> bao cấp ngay sau 1975 là tất yếu — phản ánh tư duy thời chiến chuyển sang thời bình, bị bao vây cô lập, không có vốn, thiếu kinh nghiệm. Đây là "lựa chọn ít tệ nhất" mà giới lãnh đạo lúc bấy giờ có thể hình dung được.</p>
            <p>Tuy nhiên, <em>sai lầm</em> thực sự là cứng nhắc duy trì quá lâu khi thực tiễn đã báo hiệu thất bại từ 1979. Đổi Mới 1986 minh chứng rằng thay đổi là hoàn toàn có thể — và đáng lẽ có thể đến sớm hơn.</p>
          </div>
          <div className="procon">
            <div className="procon-col pro"><h4>✦ Yếu tố tất yếu</h4><ul>{["Không có mô hình thay thế trong bối cảnh Chiến tranh Lạnh","Di sản chiến tranh: kinh tế sụp đổ, hạ tầng tan hoang","Cần hợp nhất hai hệ thống kinh tế hoàn toàn đối lập","Áp lực từ đồng minh Liên Xô và hệ tư tưởng chủ đạo","Phù hợp với tâm lý \"nhà nước lo tất\" sau thời chiến"].map((li,i)=><li key={i}>{li}</li>)}</ul></div>
            <div className="procon-col con"><h4>✦ Sai lầm chủ quan</h4><ul>{["Duy trì quá lâu dù thực tiễn báo hiệu thất bại từ 1979","Cải tạo tư sản miền Nam quá vội vàng và triệt để","Áp đặt rập khuôn mô hình Liên Xô vào Việt Nam","Trấn áp \"phá rào\" thay vì học hỏi từ thực tiễn","Xem nhẹ vai trò và kinh nghiệm của khu vực tư nhân"].map((li,i)=><li key={i}>{li}</li>)}</ul></div>
          </div>
          <p>Đổi Mới 1986 không chỉ là sự từ bỏ một chính sách — đó là sự thừa nhận dũng cảm rằng một mô hình kinh tế, dù xuất phát từ lý tưởng tốt đẹp, cũng phải được kiểm chứng và điều chỉnh bởi thực tiễn.</p>
          <div className="pullquote">
            <p>Không phải những người lãnh đạo năm 1975 thiếu thiện chí — họ thiếu kinh nghiệm thời bình và mô hình tham chiếu phù hợp. Sai lầm lớn nhất là chậm nhận ra sai lầm.</p>
            <cite>Nhận định cá nhân</cite>
          </div>
        </AnimatedSection>

        {/* AI ASSISTANT */}
        <AnimatedSection id="ai-chat">
          <div className="section-number">06</div>
          <div className="section-tag">Trợ lý AI</div>
          <h2>Hỏi đáp về Kinh tế Bao cấp</h2>
          <p>Bạn còn thắc mắc về nội dung bài? Hãy đặt câu hỏi — AI sẽ trả lời dựa trên kiến thức về giai đoạn 1975–1986.</p>
          <AiChat />
        </AnimatedSection>
      </main>

      {/* AI USAGE */}
 <div className="ai-usage">
   <div className="container">
     <div className="ai-usage-inner">
       <div className="ai-usage-icon">✦</div>
       <div>
         <div className="ai-usage-title">AI Usage</div>
         <div className="ai-usage-desc">
           Trợ lý <strong>Gemini</strong> (nội dung 1975–1986). Thiết kế bởi <strong>Claude</strong>. Triển khai trên <strong>Vercel</strong>.
         </div>
       </div>
     </div>
   </div>
 </div>

      <div className="footer">
        <strong>Kinh Tế Bao Cấp 1975–1986</strong> &nbsp;·&nbsp; Phân tích lịch sử kinh tế Việt Nam &nbsp;·&nbsp; Giai đoạn tiền Đổi Mới
      </div>
    </div>
  );
}
