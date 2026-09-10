import React, {useLayoutEffect, useMemo, useRef, useState} from 'react';
import { createRoot } from 'react-dom/client';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDownRight, ArrowUpRight, MapPin, Menu, X, ChevronRight, Sparkles, Utensils, ShoppingBag, Heart, CircleDot } from 'lucide-react';
import './styles.css';

gsap.registerPlugin(ScrollTrigger);

const A='/src/assets/';
const images={
  shelves:A+'01-interior-shelves.png',
  ramenRoom:A+'02-ramen-room.png',
  wide:A+'03-store-wide.png',
  productWall:A+'04-product-wall.png',
  ramen:A+'05-ramen-bar.png',
  entrance:A+'06-entrance.png',
  keychains:A+'07-keychains.png',
  kpop:A+'08-kpop-shelves.png',
  flower:A+'09-interior-flower.png',
  logo:A+'10-ktown-logo.jpg'
};

const mapUrl='https://maps.app.goo.gl/CDE7RZ4BGexHf3NYA';
const reviewData=[
  {quote:'A slice of Seoul right here in Siliguri!', name:'Aditi Jaiswal', note:'Google review · visible on the supplied listing'},
  {quote:'The place for Korean culture experience... KPOP ALBUMS and LIGHTSTICKS!', name:'Shinjan Biswas', note:'Google review · visible on the supplied listing'},
  {quote:'I really enjoyed my visit there; I bought a BTS kit...', name:'Depe Goldar', note:'Google review · visible on the supplied listing'}
];

function Logo(){return <img className="brand-logo" src={images.logo} alt="K Town logo"/>}
function Pill({children, dark=false}){return <span className={'pill'+(dark?' pill-dark':'')}>{children}</span>}

function App(){
 const root=useRef(null);
 const [menu,setMenu]=useState(false);
 const [intent,setIntent]=useState('Explore');
 const [bowl,setBowl]=useState({base:'Buldak Chicken Carbonara',topping:'Cheese',green:'Spring onion'});
 const [fragment,setFragment]=useState(null);
 const choices=['K-Pop','Food','Shopping','Gifts','Explore'];
 const sectionLabels=['Arrival','Explore','Shop','Taste','Discover','Community','Visit'];

 useLayoutEffect(()=>{
  const ctx=gsap.context(()=>{
   gsap.utils.toArray('[data-parallax]').forEach((el)=>{
    const amount=Number(el.dataset.parallax)||20;
    gsap.to(el,{yPercent:-amount,ease:'none',scrollTrigger:{trigger:el,start:'top bottom',end:'bottom top',scrub:true}});
   });
   gsap.utils.toArray('.reveal').forEach(el=>{
    gsap.fromTo(el,{y:30,opacity:0},{y:0,opacity:1,duration:0.9,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 84%',once:true}})
   });
   gsap.utils.toArray('.pin-track').forEach(track=>{
    const panel=track.querySelector('.pin-panel');
    if(panel){
      gsap.to(panel,{x:()=>-(panel.scrollWidth-track.clientWidth+40),ease:'none',scrollTrigger:{trigger:track,start:'top top',end:()=>'+='+Math.max(900,panel.scrollWidth-track.clientWidth+40),pin:true,scrub:1,anticipatePin:1,invalidateOnRefresh:true}});
    }
   });
   gsap.utils.toArray('.hero-image').forEach(img=>gsap.to(img,{scale:1.08,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}}));
   gsap.utils.toArray('.route-dot').forEach((dot,i)=>gsap.fromTo(dot,{scale:0.7,opacity:.35},{scale:1,opacity:1,duration:.35,delay:i*.03,scrollTrigger:{trigger:dot,start:'top 88%',once:true}}));
   ScrollTrigger.refresh();
  }, root);
  return ()=>ctx.revert();
 },[]);

 const selectedCopy=useMemo(()=>{
  const m={
   'K-Pop':['K-POP / COLLECT','Albums, lightsticks & culture-led finds.','Explore the shelves through the real in-store atmosphere.'],
   Food:['FOOD / TASTE','Make a bowl, make it yours.','A visual introduction to the self-serve ramen experience.'],
   Shopping:['SHOP / DISCOVER','Small finds, big Seoul energy.','From snacks and shelves to giftable discoveries.'],
   Gifts:['GIFTS / LITTLE THINGS','A tiny piece of Korea to take home.','Keychains, paper goods and playful finds—shown as inspiration, not inventory.'],
   Explore:['EXPLORE / K TOWN','Shop. Eat. Discover.','Your route through a Korean-inspired retail and food destination in Siliguri.']
  }; return m[intent]
 },[intent]);

 const showFragment=(type)=>{
  setFragment(type);
  window.clearTimeout(showFragment.t); showFragment.t=window.setTimeout(()=>setFragment(null),2200)
 };

 return <div ref={root} className="site">
  <div className="concept-bar"><span>CONCEPT / DEMO WEBSITE</span><span>Designed for K Town · not officially commissioned</span></div>
  <header className="nav">
    <a className="nav-brand" href="#arrival"><Logo/></a>
    <nav className={'nav-links '+(menu?'open':'')}>
      {sectionLabels.map((s,i)=><a key={s} href={'#'+['arrival','experience','shop','taste','discover','community','visit'][i]} onClick={()=>setMenu(false)}>{s}</a>)}
      <a className="nav-visit" href={mapUrl} target="_blank" rel="noreferrer">Directions <ArrowUpRight size={15}/></a>
    </nav>
    <button className="menu-btn" onClick={()=>setMenu(v=>!v)} aria-label="Toggle menu">{menu?<X size={20}/>:<Menu size={20}/>}</button>
  </header>

  <main>
   <section id="arrival" className="hero section-shell">
     <div className="hero-copy reveal">
       <div className="eyebrow">SEOUL ENERGY · SILIGURI ADDRESS</div>
       <h1>A LITTLE PIECE OF <em>KOREA.</em><br/>RIGHT HERE IN <span>SILIGURI.</span></h1>
       <p>Step into K Town — a Korean culture, lifestyle and food destination inside Vega Circle Mall.</p>
       <div className="hero-actions">
         <a className="btn btn-dark" href="#experience">Explore K Town <ArrowDownRight size={17}/></a>
         <a className="btn btn-light" href={mapUrl} target="_blank" rel="noreferrer">Get directions <MapPin size={16}/></a>
       </div>
       <div className="hero-micro"><span><CircleDot size={12}/> Vega Circle Mall</span><span>Sevoke Road · Siliguri</span></div>
     </div>
     <div className="hero-visual reveal">
       <div className="hero-frame"><img className="hero-image" src={images.entrance} alt="K Town exterior entrance"/></div>
       <div className="hero-sticker" onClick={()=>showFragment('안녕하세요')}><span>안녕하세요</span><small>WELCOME</small></div>
       <div className="hero-index">01 / 07</div>
     </div>
   </section>

   <section id="experience" className="experience section-shell">
    <div className="section-top reveal"><div><div className="eyebrow">THE EXPERIENCE</div><h2>Not a stop.<br/><i>A small journey.</i></h2></div><p>Follow the feeling. Choose a path, then let the store pull you somewhere unexpected.</p></div>
    <div className="experience-grid">
      <button className="experience-card shop" onClick={()=>setIntent('Shopping')}><div className="exp-num">01</div><div className="exp-title">SHOP</div><span>See what’s on the shelves <ArrowUpRight size={18}/></span><img data-parallax="10" src={images.shelves} alt="K Town shelves"/></button>
      <button className="experience-card eat" onClick={()=>setIntent('Food')}><div className="exp-num">02</div><div className="exp-title">EAT</div><span>Build a bowl <ArrowUpRight size={18}/></span><img data-parallax="8" src={images.ramenRoom} alt="K Town ramen area"/></button>
      <button className="experience-card discover" onClick={()=>setIntent('Explore')}><div className="exp-num">03</div><div className="exp-title">DISCOVER</div><span>Find your tiny Seoul moment <ArrowUpRight size={18}/></span><img data-parallax="12" src={images.keychains} alt="Korean-inspired accessories at K Town"/></button>
    </div>
   </section>

   <section className="intent-strip">
    <div className="eyebrow">WHAT ARE YOU HERE FOR?</div>
    <div className="intent-row">{choices.map(c=><button key={c} onClick={()=>setIntent(c)} className={intent===c?'active':''}>{c}<span>↗</span></button>)}</div>
    <div className="intent-result"><div><small>{selectedCopy[0]}</small><h3>{selectedCopy[1]}</h3><p>{selectedCopy[2]}</p></div><a href="#discover" className="text-link">Take me there <ChevronRight size={18}/></a></div>
   </section>

   <section id="shop" className="world-section">
     <div className="world-head section-shell reveal"><div className="eyebrow">03 / SHOP</div><h2>The shelves are<br/><i>part of the story.</i></h2><p>Real K Town imagery, arranged like an editorial lookbook. No invented catalogue—just a sense of what it feels like inside.</p></div>
     <div className="pin-track"><div className="pin-panel">
       {[['K-Pop',images.kpop,'albums · lightsticks'],['Everyday discovery',images.productWall,'snacks · pantry · gifting'],['Details',images.keychains,'small finds · playful details'],['The room',images.wide,'colour · shelves · movement']].map((item,i)=><article className="look-card" key={item[0]}><div className="look-index">0{i+1}</div><img src={item[1]} alt={item[0]}/><div className="look-caption"><strong>{item[0]}</strong><span>{item[2]}</span></div></article>)}
     </div></div>
   </section>

   <section id="taste" className="ramen-section section-shell">
    <div className="ramen-copy reveal"><div className="eyebrow">04 / TASTE · RAMEN</div><h2>Your bowl.<br/><i>Your rules.</i></h2><p>The supplied store imagery shows a self-serve ramen setup where ingredients can be combined into a bowl. This interaction is a concept layer until menu/pricing data is verified.</p>
      <div className="bowl-controls">
       <label>Base<select value={bowl.base} onChange={e=>setBowl({...bowl,base:e.target.value})}><option>Buldak Chicken Carbonara</option><option>Ramen — verify on visit</option></select></label>
       <label>Topping<select value={bowl.topping} onChange={e=>setBowl({...bowl,topping:e.target.value})}><option>Cheese</option><option>Egg</option><option>Vegetables</option></select></label>
       <label>Finish<select value={bowl.green} onChange={e=>setBowl({...bowl,green:e.target.value})}><option>Spring onion</option><option>Greens</option></select></label>
      </div>
      <div className="bowl-note"><Sparkles size={15}/> Demo build — not an ordering flow.</div>
    </div>
    <div className="bowl-stage reveal">
      <div className="bowl-blob"></div><img data-parallax="8" src={images.ramen} alt="Self-serve ramen toppings at K Town"/>
      <div className="annotation ann1"><span>01</span>{bowl.base}</div><div className="annotation ann2"><span>02</span>{bowl.topping}</div><div className="annotation ann3"><span>03</span>{bowl.green}</div>
    </div>
   </section>

   <section id="discover" className="culture section-shell">
    <div className="culture-image reveal"><img src={images.flower} alt="K Town interior ceiling installation"/></div>
    <div className="culture-copy reveal"><div className="eyebrow">05 / DISCOVER · CULTURE</div><h2>A slice of Seoul,<br/><i>in Siliguri.</i></h2><p>K Town’s atmosphere is part of the destination: soft pink architecture, floral ceilings, Korean signage, colourful shelves and the feeling of finding something new.</p><div className="fragment-board"><button onClick={()=>showFragment('SHOPPING LABEL')}><span>SHOPPING LABEL</span>↗</button><button onClick={()=>showFragment('라면  RAMEN')}><span>라면 · RAMEN</span>↗</button><button onClick={()=>showFragment('서울  SEOUL')}><span>서울 · SEOUL</span>↗</button><button onClick={()=>showFragment('DISCOVERY')}><span>DISCOVERY</span>↗</button></div></div>
   </section>

   <section id="community" className="community section-shell">
    <div className="section-top reveal"><div><div className="eyebrow">06 / COMMUNITY</div><h2>Heard from<br/><i>people who went.</i></h2></div><p>Only review text visible on the supplied Google listing is used here. Nothing below is presented as a brand-authored testimonial.</p></div>
    <div className="reviews">{reviewData.map((r,i)=><article className="review reveal" key={r.name}><div className="review-top"><span>0{i+1}</span><span>★★★★★</span></div><blockquote>“{r.quote}”</blockquote><div className="review-name">{r.name}</div><small>{r.note}</small></article>)}</div>
   </section>

   <section id="visit" className="visit section-shell">
    <div className="visit-card reveal"><div><div className="eyebrow">07 / VISIT</div><h2>Come experience<br/><i>K Town.</i></h2><p>Vega Circle Mall, Sevoke Rd,<br/>Ward 42, Siliguri, West Bengal 734008</p><div className="visit-actions"><a className="btn btn-dark" href={mapUrl} target="_blank" rel="noreferrer">Open in Maps <MapPin size={16}/></a></div></div><div className="visit-photo"><img src={images.entrance} alt="K Town exterior"/><div className="map-label">VEGA CIRCLE MALL<br/><span>SILIGURI</span></div></div></div>
    <div className="hours-row"><div><span>Status shown on supplied listing</span><strong>Open · Closes 10 pm</strong></div><div className="hours-note">Hours may change. Verify on the day of your visit.</div></div>
   </section>

   <section className="final section-shell"><div className="final-orbit"><img src={images.logo} alt="K Town logo"/></div><div className="eyebrow">SHOP · EAT · DISCOVER</div><h2>COME EXPERIENCE<br/><i>K TOWN.</i></h2><div className="hero-actions"><a className="btn btn-dark" href="#arrival">Explore <ArrowDownRight size={17}/></a><a className="btn btn-light" href={mapUrl} target="_blank" rel="noreferrer">Directions <MapPin size={16}/></a></div></section>
  </main>

  <footer><div><Logo/></div><div className="footer-center">케 타운 · A LITTLE PIECE OF KOREA, RIGHT HERE IN SILIGURI.</div><a href="#arrival">Back to top ↑</a></footer>

  {fragment && <div className="fragment-toast" role="status"><span>DISCOVERED</span><strong>{fragment}</strong></div>}
 </div>
}

createRoot(document.getElementById('root')).render(<App/>);
