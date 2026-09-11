import { useState } from "react";
import {
  ArrowUp, Bot, CheckCircle2, ChevronRight, Clock3, Gift,
  Headphones, Landmark, Menu, MessageCircle,
  ShieldCheck, Smartphone, Sparkles, X, Zap
} from "lucide-react";

const css = `*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#17221d;background:#fbfcfb}button,input{font:inherit}button{cursor:pointer}a{text-decoration:none;color:inherit}.container{width:min(1120px,calc(100% - 40px));margin:auto}.nav{height:76px;background:rgba(251,252,251,.88);backdrop-filter:blur(14px);position:sticky;top:0;z-index:20;border-bottom:1px solid #edf0ed}.nav-inner{height:100%;display:flex;align-items:center;gap:30px}.brand{display:flex;align-items:center;gap:9px;font-weight:800;font-size:21px;letter-spacing:-.6px}.brand-mark{display:grid;place-items:center;width:34px;height:34px;border-radius:11px;background:#257b51;color:white;font-weight:900}.nav-links{display:flex;gap:25px;margin-left:auto;color:#637068;font-size:14px}.nav-links a:hover{color:#257b51}.nav-cta,.primary{border:0;background:#257b51;color:white;border-radius:12px;padding:12px 17px;font-weight:700;display:inline-flex;align-items:center;gap:8px;box-shadow:0 8px 22px #257b5120}.mobile-menu{display:none;border:0;background:none}.hero{padding:76px 0 64px;background:radial-gradient(circle at 78% 30%,#e6dcff 0,#f6f4ff 22%,transparent 44%),linear-gradient(180deg,#fbfcfb,#f6faf7)}.hero-grid{display:grid;grid-template-columns:1.04fr .96fr;align-items:center;gap:60px}.eyebrow,.section-kicker{font-size:11px;font-weight:800;letter-spacing:1.7px;color:#257b51}.eyebrow{display:inline-flex;align-items:center;gap:7px;background:#edf8f1;padding:7px 10px;border-radius:999px}.eyebrow span{display:grid;place-items:center}.hero h1{font-size:clamp(44px,6vw,73px);line-height:.99;letter-spacing:-4px;max-width:700px;margin:22px 0}.hero h1 em{font-style:normal;color:#7455b6}.hero-copy{font-size:18px;line-height:1.65;color:#657069;max-width:600px}.hero-actions{display:flex;gap:12px;align-items:center;margin-top:28px}.secondary{padding:12px 15px;border:1px solid #dfe6e1;border-radius:12px;background:white;display:inline-flex;align-items:center;gap:5px;font-weight:700}.trust-row{display:flex;align-items:center;gap:8px;color:#77827b;font-size:12px;margin-top:28px}.dot{width:4px;height:4px;background:#bbc3be;border-radius:50%;margin:0 4px}.hero-card{min-height:470px;border-radius:34px;background:linear-gradient(145deg,#1e6545,#7755b3);position:relative;overflow:hidden;padding:42px;box-shadow:0 28px 70px #257b5120}.orb{position:absolute;border-radius:50%;filter:blur(2px)}.orb-one{width:280px;height:280px;background:#b9f2cf55;top:-110px;right:-80px}.orb-two{width:240px;height:240px;background:#d7c5ff55;bottom:-100px;left:-90px}.chat-preview{position:relative;background:#fff;border:1px solid #ffffff88;border-radius:22px;padding:18px;box-shadow:0 20px 60px #10271c44;max-width:420px;margin:35px auto}.preview-top{display:flex;align-items:center;gap:10px;padding-bottom:15px;border-bottom:1px solid #edf0ed}.avatar{width:38px;height:38px;border-radius:12px;background:#e9f7ee;color:#257b51;display:grid;place-items:center}.preview-top small{display:block;color:#89938d;font-size:11px;margin-top:2px}.online{width:8px;height:8px;border-radius:50%;background:#39b86f;margin-left:auto}.preview-msg{max-width:86%;padding:11px 13px;border-radius:14px;margin-top:13px;font-size:12px;line-height:1.5}.preview-msg.ai{background:#f1f5f2}.preview-msg.user{background:#257b51;color:white;margin-left:auto}.typing{display:flex;gap:4px;background:#f1f5f2;width:45px;padding:9px 11px;border-radius:12px;margin-top:13px}.typing i{width:5px;height:5px;background:#8c9690;border-radius:50%;animation:pulse 1s infinite}.typing i:nth-child(2){animation-delay:.2s}.typing i:nth-child(3){animation-delay:.4s}@keyframes pulse{50%{opacity:.25}}.quick{padding:25px 0 55px}.chips{display:flex;flex-wrap:wrap;gap:9px;margin-top:14px}.chips button,.modal-suggestions button{border:1px solid #e1e7e2;background:white;color:#5e6a63;border-radius:999px;padding:9px 12px;font-size:12px;display:inline-flex;align-items:center;gap:8px}.chips button:hover,.modal-suggestions button:hover{border-color:#9ac5aa;color:#257b51}.section{padding:55px 0}.section-head{display:flex;justify-content:space-between;align-items:end;gap:30px;margin-bottom:25px}.section-head h2,.support-band h2{font-size:38px;letter-spacing:-1.8px;line-height:1.1;margin:8px 0}.section-head p{max-width:350px;color:#7a847e;line-height:1.6}.service-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:12px}.service-card{min-height:215px;text-align:left;border:1px solid #e6ebe7;background:white;border-radius:20px;padding:19px;display:flex;flex-direction:column;position:relative;transition:.2s}.service-card:hover{transform:translateY(-4px);border-color:#b9d8c3;box-shadow:0 14px 30px #193c2710}.service-icon{width:43px;height:43px;border-radius:13px;background:#eff8f2;color:#257b51;display:grid;place-items:center;margin-bottom:auto}.service-card b{display:block;font-size:15px;margin-bottom:6px}.service-card small{display:block;color:#78827c;line-height:1.45;font-size:11px}.chev{position:absolute;right:15px;top:18px;color:#9ba49f;width:17px}.support-band{margin-top:45px;background:#18382a;color:white;padding:80px 0}.support-grid{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center}.support-band .section-kicker{color:#9de3b9}.support-band h2{font-size:48px}.support-band p{color:#c5d3cb;line-height:1.7;max-width:560px}.light{background:white;color:#1d6946;box-shadow:none;margin-top:16px}.features{display:grid;gap:12px}.features div{border:1px solid #ffffff1a;background:#ffffff08;border-radius:17px;padding:18px;display:grid;grid-template-columns:27px 1fr;column-gap:10px}.features svg{grid-row:span 2;color:#a7e9bf}.features b{font-size:14px}.features span{font-size:12px;color:#aabdb3;margin-top:3px}.faq-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}details{background:white;border:1px solid #e5ebe6;border-radius:15px;padding:17px 19px}summary{list-style:none;display:flex;justify-content:space-between;gap:15px;font-weight:700;font-size:14px;cursor:pointer}summary::-webkit-details-marker{display:none}summary svg{width:17px}details p{color:#77817b;font-size:13px;line-height:1.6;margin-bottom:0}footer{border-top:1px solid #e5eae6;padding:45px 0 22px;background:#fff}.footer-inner{display:grid;grid-template-columns:2fr 1fr 1fr;gap:40px}.footer-inner p,.footer-inner span{display:block;color:#7d8781;font-size:12px;margin-top:10px}.footer-inner b{font-size:12px}.copyright{margin-top:40px;padding-top:17px;border-top:1px solid #eef1ee;color:#98a19c;font-size:11px}.floating{position:fixed;right:24px;bottom:24px;z-index:15;border:0;background:#257b51;color:white;border-radius:999px;padding:13px 17px;display:flex;align-items:center;gap:8px;font-weight:700;box-shadow:0 15px 35px #153f2a40}.modal-backdrop{position:fixed;inset:0;background:#12241b70;backdrop-filter:blur(5px);z-index:50;display:flex;justify-content:flex-end;align-items:flex-end;padding:22px}.chat-modal{width:min(450px,100%);height:min(700px,calc(100vh - 44px));background:#fbfcfb;border-radius:24px;box-shadow:0 30px 90px #0005;display:flex;flex-direction:column;overflow:hidden}.chat-head{background:white;padding:16px;display:flex;align-items:center;gap:10px;border-bottom:1px solid #e8ece9}.chat-head small{display:block;color:#87918b;font-size:10px;margin-top:2px}.chat-head>button{margin-left:auto;border:0;background:#f2f5f2;width:33px;height:33px;border-radius:50%;display:grid;place-items:center}.chat-body{padding:17px;overflow:auto;flex:1}.bubble-wrap{display:flex;margin:10px 0}.bubble-wrap.user{justify-content:flex-end}.bubble{max-width:82%;white-space:pre-line;padding:11px 13px;border-radius:15px;font-size:12px;line-height:1.55}.bubble.ai{background:#eef3ef;color:#26342c}.bubble.user{background:#257b51;color:white}.modal-suggestions{padding:0 14px 10px;display:flex;gap:6px;overflow:auto}.modal-suggestions button{white-space:nowrap;padding:7px 9px}.chat-input{margin:0 14px 8px;background:white;border:1px solid #dfe6e1;border-radius:14px;padding:6px;display:flex}.chat-input input{border:0;outline:0;background:transparent;padding:9px;flex:1;font-size:13px}.chat-input button{border:0;background:#257b51;color:white;width:38px;height:38px;border-radius:10px;display:grid;place-items:center}.safe-note{padding:5px 16px 13px;color:#8a938e;font-size:9px;display:flex;align-items:center;gap:5px}.safe-note svg{color:#257b51}.nav-cta{display:inline-flex;align-items:center;gap:6px;border:0}.nav-cta{background:#257b51;color:white;padding:10px 14px;border-radius:11px;font-weight:700}@media(max-width:900px){.hero-grid,.support-grid{grid-template-columns:1fr}.hero-card{min-height:390px}.service-grid{grid-template-columns:repeat(2,1fr)}.support-grid{gap:40px}.faq-grid{grid-template-columns:1fr}.footer-inner{grid-template-columns:1.5fr 1fr 1fr}}@media(max-width:680px){.container{width:min(100% - 28px,1120px)}.nav-links{display:none;position:absolute;top:76px;left:0;right:0;background:white;border-bottom:1px solid #e7ebe8;padding:15px 20px;flex-direction:column}.nav-links.show{display:flex}.mobile-menu{display:block;margin-left:auto}.nav-cta{display:none}.hero{padding:52px 0 42px}.hero h1{font-size:47px;letter-spacing:-2.8px}.hero-copy{font-size:15px}.hero-card{padding:20px;min-height:350px}.chat-preview{margin:20px auto}.section{padding:42px 0}.section-head{display:block}.section-head h2,.support-band h2{font-size:32px}.section-head p{font-size:13px}.service-grid{grid-template-columns:1fr}.service-card{min-height:155px}.support-band{padding:55px 0}.faq-grid{gap:8px}.footer-inner{grid-template-columns:1fr 1fr}.footer-inner>div:first-child{grid-column:1/-1}.floating{right:14px;bottom:14px}.modal-backdrop{padding:0}.chat-modal{width:100%;height:100%;border-radius:0}.chips{flex-wrap:nowrap;overflow:auto}.chips button{white-space:nowrap}}`;

const services = [
  {title:"Banking", icon:Landmark, text:"Transfers, account questions, transaction status and more."},
  {title:"Airtime", icon:Smartphone, text:"Buy airtime, check failed purchases and missing credit."},
  {title:"Data", icon:Zap, text:"Purchase data bundles and get help with data issues."},
  {title:"Gift Cards", icon:Gift, text:"Redeem supported gift cards and resolve redemption issues."},
  {title:"Electricity", icon:Zap, text:"Pay electricity bills and get help with payment problems."}
];

const suggestions = [
  "How do I buy airtime?",
  "My transaction is pending",
  "How do I redeem a gift card?",
  "My electricity payment failed"
];

function answer(q) {
  const s=q.toLowerCase();
  if (s.includes("airtime")) return "I can help with airtime. First, check the transaction status in your Dominox history. If it shows Successful but your line was not credited, keep the transaction reference and contact Dominox Support for investigation. Never share your PIN or OTP here.";
  if (s.includes("data")) return "For a data purchase, confirm the phone number, network and transaction status. If the transaction is Successful but the bundle is missing, save your transaction reference and request support. I can also guide you through a new data purchase.";
  if (s.includes("gift")) return "For gift-card redemption, make sure the card is supported and the details are entered correctly. If redemption fails, do not share the full card details in chat; request human support with your transaction/reference information.";
  if (s.includes("electric") || s.includes("bill") || s.includes("meter")) return "For an electricity payment issue, check whether the transaction is Pending or Successful. Keep your meter/payment reference available. If you were charged but the payment or token was not delivered, Dominox Support should investigate it.";
  if (s.includes("pending")) return "A pending transaction may still be processing. Check your transaction history for the latest status. If it remains pending beyond Dominox's stated processing window, contact human support with the transaction reference.";
  if (s.includes("fraud") || s.includes("unauthor") || s.includes("stolen")) return "For suspected unauthorized activity, please contact Dominox human support immediately. Do not share your password, PIN, OTP, CVV or full card number in this chat.";
  return "I'm Dominox AI Support. I can help with banking, airtime, data, gift cards, electricity payments and other Dominox services. Tell me what happened and I'll guide you through the next step. For account-specific or sensitive issues, I can connect you with human support.";
}

export default function Home() {
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {role:"ai", text:"Hi! I'm Dominox AI Support 👋\nHow can I help you today? You can ask about banking, airtime, data, gift cards, electricity or a transaction."}
  ]);

  function send(text=input) {
    const q=text.trim(); if(!q) return;
    setMessages(m=>[...m,{role:"user",text:q},{role:"ai",text:answer(q)}]);
    setInput("");
  }

  return (
    <main>
      <style>{css}</style>
      <header className="nav">
        <div className="container nav-inner">
          <div className="brand"><span className="brand-mark">D</span><span>Dominox</span></div>
          <nav className={mobile ? "nav-links show" : "nav-links"}>
            <a href="#services">Services</a><a href="#support">AI Support</a><a href="#faq">FAQs</a><a href="#contact">Contact</a>
          </nav>
          <button className="mobile-menu" onClick={()=>setMobile(!mobile)} aria-label="Menu">{mobile?<X/>:<Menu/>}</button>
          <button className="nav-cta" onClick={()=>setOpen(true)}>Ask AI <Sparkles size={16}/></button>
        </div>
      </header>

      <section className="hero">
        <div className="container hero-grid">
          <div>
            <div className="eyebrow"><span><Sparkles size={15}/></span> Dominox intelligent support</div>
            <h1>Your Dominox questions, <em>answered instantly.</em></h1>
            <p className="hero-copy">Fast, helpful support for banking, airtime, data, gift cards, electricity payments and more — all in one place.</p>
            <div className="hero-actions">
              <button className="primary" onClick={()=>setOpen(true)}>Ask Dominox AI <ArrowUp size={17}/></button>
              <a className="secondary" href="#services">Explore services <ChevronRight size={17}/></a>
            </div>
            <div className="trust-row"><ShieldCheck size={17}/><span>Secure support experience</span><span className="dot"/> <Clock3 size={17}/><span>Available 24/7</span></div>
          </div>
          <div className="hero-card">
            <div className="orb orb-one"/><div className="orb orb-two"/>
            <div className="chat-preview">
              <div className="preview-top"><div className="avatar"><Bot size={18}/></div><div><b>Dominox AI</b><small>Online now</small></div><span className="online"/></div>
              <div className="preview-msg ai">Hi! What can I help you with today?</div>
              <div className="preview-msg user">My airtime purchase is successful but I wasn't credited.</div>
              <div className="preview-msg ai">I can help. Let's check your transaction status and next steps.</div>
              <div className="typing"><i/><i/><i/></div>
            </div>
          </div>
        </div>
      </section>

      <section className="quick container">
        <div className="section-kicker">POPULAR QUESTIONS</div>
        <div className="chips">{suggestions.map(s=><button key={s} onClick={()=>{setOpen(true); setTimeout(()=>send(s),50)}}>{s}<ArrowUp size={14}/></button>)}</div>
      </section>

      <section id="services" className="section container">
        <div className="section-head"><div><div className="section-kicker">DOMINOX SERVICES</div><h2>Everything you need, in one place.</h2></div><p>Choose a service or ask our AI assistant for guidance.</p></div>
        <div className="service-grid">{services.map(({title,icon:Icon,text})=><button className="service-card" key={title} onClick={()=>{setOpen(true);setInput(`I need help with ${title.toLowerCase()}`)}}><span className="service-icon"><Icon/></span><span><b>{title}</b><small>{text}</small></span><ChevronRight className="chev"/></button>)}</div>
      </section>

      <section id="support" className="support-band">
        <div className="container support-grid">
          <div><div className="section-kicker">AI SUPPORT</div><h2>Support that understands what you mean.</h2><p>Start with a simple question. Dominox AI can explain common issues, guide you to the right service and escalate complex cases to a human support agent.</p><button className="primary light" onClick={()=>setOpen(true)}>Start a conversation <MessageCircle size={17}/></button></div>
          <div className="features"><div><CheckCircle2/><b>Clear answers</b><span>Simple next steps without unnecessary jargon.</span></div><div><ShieldCheck/><b>Safety first</b><span>Never share your PIN, OTP, password or CVV.</span></div><div><Headphones/><b>Human escalation</b><span>Complex issues can move to support agents.</span></div></div>
        </div>
      </section>

      <section id="faq" className="section container">
        <div className="section-head"><div><div className="section-kicker">FAQ</div><h2>Common questions.</h2></div></div>
        <div className="faq-grid">
          {[
            ["How do I contact Dominox Support?","Start with Dominox AI Support. If your issue needs human assistance, request a support agent."],
            ["What should I do if my transaction is pending?","Check your transaction history and follow the service-specific guidance. If it remains unresolved, contact support with the reference."],
            ["My airtime wasn't received. What should I do?","Confirm the number and transaction status. If successful but airtime was not received, contact support with the transaction reference."],
            ["Can I redeem gift cards?","Yes, for supported gift cards. Availability and requirements depend on the card and current Dominox service coverage."]
          ].map(([q,a])=><details key={q}><summary>{q}<ChevronRight/></summary><p>{a}</p></details>)}
        </div>
      </section>

      <footer id="contact"><div className="container footer-inner"><div><div className="brand"><span className="brand-mark">D</span><span>Dominox</span></div><p>Everything you need, one transaction away.</p></div><div><b>Support</b><span>AI Support</span><span>Human Support</span><span>FAQs</span></div><div><b>Safety</b><span>Privacy</span><span>Security</span><span>Terms</span></div></div><div className="container copyright">© 2026 Dominox. Built for fast, simple digital support.</div></footer>

      <button className="floating" onClick={()=>setOpen(true)} aria-label="Open AI support"><Bot/><span>AI Support</span></button>

      {open && <div className="modal-backdrop" onClick={()=>setOpen(false)}>
        <div className="chat-modal" onClick={e=>e.stopPropagation()}>
          <div className="chat-head"><div className="avatar"><Bot/></div><div><b>Dominox AI Support</b><small>Typically replies instantly</small></div><button onClick={()=>setOpen(false)}><X/></button></div>
          <div className="chat-body">{messages.map((m,i)=><div key={i} className={"bubble-wrap "+m.role}><div className={"bubble "+m.role}>{m.text}</div></div>)}</div>
          <div className="modal-suggestions">{suggestions.slice(0,2).map(s=><button key={s} onClick={()=>send(s)}>{s}</button>)}</div>
          <div className="chat-input"><input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Ask Dominox anything..." /><button onClick={()=>send()} aria-label="Send"><ArrowUp/></button></div>
          <div className="safe-note"><ShieldCheck size={14}/> Never share your PIN, OTP, password, CVV or full card number.</div>
        </div>
      </div>}
    </main>
  );
}# Dominox
Web application Dominox
