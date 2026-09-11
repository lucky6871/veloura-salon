/* Navy Luxe: cinematic midnight navy, lavender glass, pearl type, rose-gold metal, and restrained beauty-film motion. */
import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Play,
  Plus,
  Sparkles,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const assets = {
  hero: "/manus-storage/veloura-navy-hero_f0c3302a.jpg",
  hair: "/manus-storage/veloura-navy-hair_c1e014ca.jpg",
  artist: "/manus-storage/veloura-navy-portrait_bc2d6d41.jpg",
  interior: "/manus-storage/veloura-interior_225b9ac8.jpg",
  detail: "/manus-storage/veloura-service-color_32bb10a6.jpg",
  monogram: "/manus-storage/veloura-monogram_d9f5f2c5.png",
};

const services = [
  ["01", "Signature Cut", "A precise, face-framing cut shaped around your natural movement.", "From ₹—", "45 min"],
  ["02", "Luminous Colour", "Dimensional colour with softness, shine and a thoughtful grow-out.", "From ₹—", "2–3 hrs"],
  ["03", "Sculpted Styling", "Polished texture, shine and hold for an elevated everyday or occasion look.", "From ₹—", "45 min"],
  ["04", "Restoration Ritual", "A tailored care moment for scalp comfort and touchable, healthier hair.", "From ₹—", "60 min"],
];

const bookingSteps = ["Service", "Date", "Time", "Details"];
const availableDates = ["This Friday", "Saturday", "Next Tuesday"];
const availableTimes = ["10:00 AM", "12:30 PM", "3:00 PM", "5:30 PM"];

type Booking = { service: string; date: string; time: string; name: string; phone: string };

function BrandMark() {
  return <span className="navy-mark"><img src={assets.monogram} alt="" /></span>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(0);
  const [confirmed, setConfirmed] = useState(false);
  const [heroProgress, setHeroProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("top");
  const scrollState = useRef({ hero: -1, active: "" });
  const heroFilmRef = useRef<HTMLDivElement>(null);
  const heroTintRef = useRef<HTMLDivElement>(null);
  const [booking, setBooking] = useState<Booking>({ service: "Signature Cut", date: "This Friday", time: "10:00 AM", name: "", phone: "" });

  useEffect(() => {
    const updateScrollEffects = () => {
      const visualProgress = Math.min(window.scrollY / (window.innerHeight * 0.78), 1);
      if (heroFilmRef.current) {
        heroFilmRef.current.style.opacity = String(1 - visualProgress * 0.8);
        heroFilmRef.current.style.transform = `scale(${1 + visualProgress * 0.11})`;
      }
      if (heroTintRef.current) heroTintRef.current.style.opacity = String(visualProgress * 0.9);
      const next = visualProgress > 0.18 ? 1 : 0;
      if (scrollState.current.hero !== next) {
        scrollState.current.hero = next;
        setHeroProgress(next);
      }
      const sectionIds = ["services", "featured", "about", "gallery", "visit"];
      const matched = sectionIds.reduce((current, id) => {
        const section = document.getElementById(id);
        return section && window.scrollY >= section.offsetTop - window.innerHeight * 0.42 ? id : current;
      }, "top");
      if (scrollState.current.active !== matched) {
        scrollState.current.active = matched;
        setActiveSection(matched);
      }
    };
    let frame = 0;
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(() => { updateScrollEffects(); frame = 0; });
    };
    updateScrollEffects();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); if (frame) window.cancelAnimationFrame(frame); };
  }, []);

  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>(".reveal");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("revealed"); observer.unobserve(entry.target); } });
    }, { threshold: 0.12 });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const openBooking = (service?: string) => {
    if (service) setBooking((previous) => ({ ...previous, service }));
    setBookingStep(0); setConfirmed(false); setBookingOpen(true);
  };
  const updateBooking = <K extends keyof Booking>(key: K, value: Booking[K]) => setBooking((previous) => ({ ...previous, [key]: value }));
  const continueBooking = () => {
    if (bookingStep === 3) { if (booking.name.trim() && booking.phone.trim()) setConfirmed(true); return; }
    setBookingStep((current) => current + 1);
  };

  return (
    <main className="navy-site">
      <header className={`navy-nav ${heroProgress > 0.18 ? "navy-nav-scrolled" : ""}`}>
        <a href="#top" className="navy-brand" aria-label="Veloura home"><BrandMark /><span>Veloura<small>beauty atelier</small></span></a>
        <nav className="navy-navigation" aria-label="Primary navigation"><div className="navy-navigation-list">
          <a className={activeSection === "services" ? "active" : ""} href="#services">Services</a><a className={activeSection === "featured" ? "active" : ""} href="#featured">The Edit</a><a className={activeSection === "about" ? "active" : ""} href="#about">About</a><a className={activeSection === "gallery" ? "active" : ""} href="#gallery">Gallery</a><a className={activeSection === "visit" ? "active" : ""} href="#visit">Visit</a>
        </div></nav>
        <button className="navy-appointment" onClick={() => openBooking()}>Book appointment <ArrowUpRight size={15} /></button>
        <button className="navy-menu" onClick={() => setMenuOpen((value) => !value)} aria-label={menuOpen ? "Close menu" : "Open menu"}>{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <div className={`navy-mobile-menu ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}>
        <span>Navigate</span>
        {["Services", "The edit", "About", "Gallery", "Visit"].map((item) => <a key={item} href={`#${item === "The edit" ? "featured" : item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}<ArrowUpRight size={20} /></a>)}
        <button onClick={() => { setMenuOpen(false); openBooking(); }}>Reserve your time <ArrowUpRight size={17} /></button>
      </div>

      <section className="navy-hero" id="top">
        <div className="hero-film" ref={heroFilmRef}>
          <img src={assets.hero} alt="Luxury navy salon interior with sculptural styling chair and oval mirror" decoding="async" fetchPriority="high" />
          <span className="hero-grain" />
          <span className="hero-lavender-glow" />
          <span className="hero-orbital-label">Veloura / beauty in motion / Veloura / beauty in motion</span>
        </div>
        <div className="hero-tint" ref={heroTintRef} />
        <div className="hero-content">
          <p className="lux-label"><i /> A new kind of appointment</p>
          <h1>Hair, with a<br /><em>higher frequency.</em></h1>
          <p className="hero-lead">Precision cut, luminous colour, and restorative rituals for the version of you that feels most magnetic.</p>
          <div className="hero-cta-row"><button className="rose-button" onClick={() => openBooking()}>Reserve your time <ArrowUpRight size={18} /></button><a href="#services" className="ghost-link">Explore the menu <ArrowDown size={17} /></a></div>
        </div>
        <div className="hero-bottom"><span>Scroll to enter</span><div><b>01</b><i /></div><p>London-inspired beauty craft,<br />made personal.</p></div>
      </section>

      <section className="intro-band reveal">
        <p className="lux-label"><i /> Veloura signature</p>
        <h2>Not a salon visit.<br /><em>A study in you.</em></h2>
        <p>We pair the discipline of exceptional technique with the pleasure of a beauty experience that feels cinematic, intimate, and entirely considered.</p>
        <div className="intro-stat"><span>03</span><small>WAYS WE MAKE<br />YOU GLOW</small><Sparkles size={22} /></div>
      </section>

      <section className="services-luxe" id="services">
        <div className="section-heading reveal"><div><p className="lux-label"><i /> The menu</p><h2>Crafted for<br /><em>your orbit.</em></h2></div><div className="menu-summary"><span>04 / Signature experiences</span><p>Exceptional results start with a considered consultation, then unfold through technique, tone and finish.</p></div></div>
        <div className="services-stack">
          {services.map(([number, name, description, price, duration], index) => <article className={`service-luxe-row reveal reveal-delay-${index + 1}`} key={name}>
            <span>{number}</span><div><h3>{name}</h3><p>{description}</p></div><div className="service-price"><b>{price}</b><small><Clock3 size={12} /> {duration}</small></div><button onClick={() => openBooking(name)} aria-label={`Book ${name}`}><Plus size={18} /></button>
          </article>)}
        </div>
        <button className="line-link reveal" onClick={() => openBooking()}>View the full service menu <ArrowUpRight size={17} /></button>
      </section>

      <section className="featured-edit" id="featured">
        <div className="featured-copy reveal"><p className="lux-label"><i /> Featured service</p><span className="chapter-no">02 / THE EDIT</span><h2>Gloss lives<br />in the <em>details.</em></h2><p>A light-reflecting colour story, designed from root to end. Think silk, not stripes. A finish that changes character in every room.</p><div className="featured-notes"><span><b>01</b> Bespoke tone mapping</span><span><b>02</b> Light-responsive dimension</span><span><b>03</b> Personalised care ritual</span></div><button className="rose-button" onClick={() => openBooking("Luminous Colour")}>Book a colour consultation <ArrowUpRight size={17} /></button></div>
        <div className="featured-image reveal"><img src={assets.hair} alt="Glossy dark hair styled into luminous waves" loading="lazy" decoding="async" /><span className="image-vertical">DIMENSION / LIGHT / DEPTH</span><div className="feature-image-caption"><small>COLOUR STUDY / 02</small><p>The Luminous Edit</p><span>By consultation</span></div><div className="rose-seal">V<br /><small>THE<br />LUMINOUS<br />EDIT</small></div></div>
      </section>

      <section className="about-luxe" id="about">
        <div className="about-photo reveal"><img src={assets.artist} alt="A luxury salon artist working beside a navy styling station" loading="lazy" decoding="async" /><div className="glass-caption"><span>Est. for the<br />feeling.</span><b>V</b></div></div>
        <div className="about-copy reveal"><p className="lux-label"><i /> Our philosophy</p><h2>Considered<br /><em>by design.</em></h2><p>At Veloura, expertise never needs to announce itself. It lives in a consult that listens closely, a hand that knows when to soften, and a studio designed to let you exhale.</p><div className="about-principles"><span><b>01</b>Unhurried consultation</span><span><b>02</b>Technique with intuition</span><span><b>03</b>Beauty that belongs to you</span></div><a href="#visit" className="ghost-link dark-link">Meet the atelier <ArrowUpRight size={17} /></a></div>
      </section>

      <section className="gallery-luxe" id="gallery">
        <div className="gallery-top reveal"><div><p className="lux-label"><i /> The world of Veloura</p><h2>Frame the<br /><em>feeling.</em></h2></div><p>Small details, electric shadows, and the quiet confidence of a look that moves with you.</p></div>
        <div className="gallery-frames">
          <figure className="gallery-main reveal"><img src={assets.interior} alt="Salon interior with warm styling stations" loading="lazy" decoding="async" /><figcaption>THE SPACE / 01</figcaption></figure>
          <figure className="gallery-detail reveal"><img src={assets.detail} alt="Luminous textured hair detail" loading="lazy" decoding="async" /><figcaption>THE FINISH / 02</figcaption></figure>
          <div className="gallery-quote reveal"><span>“</span><p>Beauty is a<br /><em>point of view.</em></p><small>VELOURA MANIFESTO</small></div>
        </div>
      </section>

      <section className="reviews-luxe" id="reviews">
        <div className="reviews-title reveal"><p className="lux-label"><i /> Client notes</p><h2>The trust<br />we <em>earn.</em></h2></div>
        <div className="review-glass reveal"><Sparkles size={19} /><h3>Real words deserve a real space.</h3><p>This future-facing panel is reserved for verified notes from Veloura guests. We do not use fabricated testimonials.</p><span>Verified reviews will appear here.</span></div>
      </section>

      <section className="visit-luxe" id="visit">
        <div className="visit-copy reveal"><p className="lux-label"><i /> Find your way here</p><h2>Come as you are.<br /><em>Leave in colour.</em></h2><p>Tell us what you are drawn to. We will make the appointment feel considered from the first message.</p><button className="rose-button" onClick={() => openBooking()}>Book appointment <ArrowUpRight size={17} /></button></div>
        <div className="visit-glass reveal"><span className="map-halo"><MapPin size={25} /></span><div><small>STUDIO ADDRESS</small><p>Location and directions will be added before launch.</p></div><div><small>OPENING HOURS</small><p>Salon hours will be confirmed with the contact details.</p></div><div className="visit-actions"><a href="#top">Get directions <ArrowUpRight size={16} /></a><button onClick={() => openBooking()}>Reserve a visit <CalendarDays size={16} /></button></div></div>
      </section>

      <footer className="navy-footer"><div className="footer-logo"><BrandMark /><span>Veloura<small>beauty atelier</small></span></div><p>Where precision meets presence.</p><div><a href="#services">Services</a><a href="#about">Philosophy</a><a href="#gallery">Gallery</a><a href="#visit">Visit</a></div><small>© 2026 Veloura Salon. All rights reserved.</small></footer>

      <div className="mobile-luxe-bar"><a href="#visit"><Phone size={16} />Call</a><a href="#visit"><MessageCircle size={16} />WhatsApp</a><button onClick={() => openBooking()}><CalendarDays size={16} />Book now</button></div>

      <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
        <DialogContent className="luxe-booking" showCloseButton>
          {confirmed ? <div className="booking-confirmed"><span><Check size={24} /></span><p className="lux-label"><i /> Request received</p><DialogTitle>Your moment<br />is <em>pending.</em></DialogTitle><DialogDescription>We will confirm your appointment using the number you shared.</DialogDescription><div><b>Service</b><p>{booking.service}</p><b>When</b><p>{booking.date} · {booking.time}</p><b>For</b><p>{booking.name}</p></div><button className="rose-button" onClick={() => setBookingOpen(false)}>Done <Check size={17} /></button></div> : <>
            <DialogHeader><p className="lux-label"><i /> Book an appointment</p><DialogTitle>Find your<br /><em>perfect time.</em></DialogTitle><DialogDescription>A considered request, in four quick steps.</DialogDescription></DialogHeader>
            <div className="luxe-progress">{bookingSteps.map((step, index) => <span key={step} className={index <= bookingStep ? "active" : ""}>0{index + 1}<small>{step}</small></span>)}</div>
            <div className="booking-stage">
              {bookingStep === 0 && <div className="luxe-options">{services.map((item) => <button key={item[1]} onClick={() => updateBooking("service", item[1])} className={booking.service === item[1] ? "chosen" : ""}>{item[1]}<small>{item[4]}</small><Check size={16} /></button>)}</div>}
              {bookingStep === 1 && <div className="luxe-options">{availableDates.map((date) => <button key={date} onClick={() => updateBooking("date", date)} className={booking.date === date ? "chosen" : ""}>{date}<Check size={16} /></button>)}</div>}
              {bookingStep === 2 && <div className="luxe-options time-choice">{availableTimes.map((time) => <button key={time} onClick={() => updateBooking("time", time)} className={booking.time === time ? "chosen" : ""}>{time}<Check size={16} /></button>)}</div>}
              {bookingStep === 3 && <div className="luxe-fields"><label>Name<input value={booking.name} onChange={(event) => updateBooking("name", event.target.value)} placeholder="Your name" autoComplete="name" /></label><label>Phone number<input value={booking.phone} onChange={(event) => updateBooking("phone", event.target.value)} placeholder="Your phone number" inputMode="tel" autoComplete="tel" /></label><p>We will use these details only to confirm your request.</p></div>}
            </div>
            <div className="booking-nav"><button disabled={bookingStep === 0} onClick={() => setBookingStep((step) => step - 1)}>Back</button><button className="rose-button" disabled={bookingStep === 3 && (!booking.name.trim() || !booking.phone.trim())} onClick={continueBooking}>{bookingStep === 3 ? "Confirm request" : "Continue"}<ChevronRight size={17} /></button></div>
          </>}
        </DialogContent>
      </Dialog>
    </main>
  );
}
