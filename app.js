const App = () => {
  const [year] = React.useState(2023);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState('home');
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [activeImage, setActiveImage] = React.useState(null);
  // Modal popup state (Website khulte hi open hoga)
  const [showModal, setShowModal] = React.useState(true);

  // Form submission tracking state
  const [isFormSubmitted, setIsFormSubmitted] = React.useState(false);

  // Form Submit Handler Function
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);

    // Yahan apna Formspree ID daalein (e.g., https://formspree.io/f/xzyqwaaa)
    const response = await fetch("https://formspree.io/f/YOUR_FORMSPREE_ID_HERE", {
      method: "POST",
      body: data,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      setIsFormSubmitted(true);
      form.reset();
    } else {
      alert("Form submit karne mein masla hua, dubara koshish karein.");
    }
  };
  const StatCounter = ({ id, end, duration, suffix = "" }) => {
    // Session Storage se check karenge ki kya yeh pehle run ho chuka hai
    const storageKey = `has_animated_${id}`;
    const isAlreadyAnimated = sessionStorage.getItem(storageKey) === 'true';



    // Agar pehle se run ho chuka hai to direct final value dikhayega
    const [count, setCount] = React.useState(isAlreadyAnimated ? end : 0);

    React.useEffect(() => {
      // Agar refresh ke pehle chal chuka hai to animation mat chalao
      if (isAlreadyAnimated) return;

      let start = 0;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          sessionStorage.setItem(storageKey, 'true'); // Memory me save ho gaya
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }, [end, duration, isAlreadyAnimated, storageKey]);

    return <span>{count}{suffix}</span>;
  };
  // Current Slide index tracking ke liye state
  const [currentSlide, setCurrentSlide] = React.useState(0);

  // Unsplash se high-quality School Images aur Content
  const slides = [
    {
      id: 1,
      title: "The Knowledge Hub Academy",
      subtitle: "Empowering young minds through modern learning, innovation, and strong moral values.",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80",
      tag: "Excellence in Education"
    },
    {
      id: 2,
      title: "Innovative STEM & Science Labs",
      subtitle: "Inspiring curiosity with state-of-the-art laboratory practicals and digital literacy.",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=80",
      tag: "Modern Learning"
    },
    {
      id: 3,
      title: "Holistic Development & Sports",
      subtitle: "Nurturing future leaders through co-curricular activities, debate, and athletics.",
      image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1600&q=80",
      tag: "Character Building"
    }
  ];

  // Automatic Slide Change after every 4 seconds
  React.useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(slideInterval);
  }, [slides.length]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="layout-container">
      {/* Top Yellow Running Ticker Strip */}
      <div className="top-ticker-bar">
        <div className="ticker-content">
          <span>Empowering young minds through a modern, engaging, and supportive learning environment.</span>
          <span className="ticker-separator">•</span>
          <span>Dedicated to fostering academic excellence, strong character, and lifelong curiosity in every student.</span>
          <span className="ticker-separator">•</span>
          <span>Where passion meets education to prepare future leaders for a rapidly changing world.</span>
          <span className="ticker-separator">•</span>
          {/* Duplicate content for seamless looping */}
          <span>Empowering young minds through a modern, engaging, and supportive learning environment.</span>
          <span className="ticker-separator">•</span>
          <span>Dedicated to fostering academic excellence, strong character, and lifelong curiosity in every student.</span>
          <span className="ticker-separator">•</span>
          <span>Where passion meets education to prepare future leaders for a rapidly changing world.</span>
        </div>
      </div>

      <header className="header">
        {/* 1. Left Side: Logo & Brand Name */}
        <div className="header-brand">
          <img src="logo.jpeg" alt="The Knowledge Hub Academy Logo" className="header-logo-img" />
          <h1 className="brand-title">The Knowledge Hub <span className="brand-accent">Academy</span></h1>
        </div>

        {/* 2. Navigation Menu (Links + Apply Button inside Hamburger for Mobile) */}
        <nav className={`header-nav ${isMenuOpen ? "active" : ""}`}>
          <a href="#home" className="nav-link" onClick={() => { setActiveSection('home'); setIsMenuOpen(false); }}>Home</a>
          <a href="#programs" className="nav-link" onClick={() => { setActiveSection('programs'); setIsMenuOpen(false); }}>Programs</a>
          <a href="#gallery" className="nav-link" onClick={() => { setActiveSection('gallery'); setIsMenuOpen(false); }}>Gallery</a>
          <a href="#admission" className="nav-link" onClick={() => { setActiveSection('admission'); setIsMenuOpen(false); }}>Admission Criteria</a>

          {/* Mobile View mein ye Button Menu ke andar hi dikhega */}
          <div className="premium-flip-btn-wrapper">
            <button
              className="btn-apply-now-premium"
              onClick={() => {
                setActiveSection('apply');
                setIsMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              aria-label="Apply Now"
            >
              {/* Front Side of Button */}
              <div className="btn-face btn-face-front">
                <span>Apply Now</span>
                <span style={{ fontSize: '16px', transition: 'transform 0.3s' }}></span>
              </div>

              {/* Back Side of Button (Visible on Hover Flip) */}
              <div className="btn-face btn-face-back">
                <span>Get Started</span>
                <span style={{ fontSize: '16px' }}></span>
              </div>
            </button>
          </div>
        </nav>

        {/* 3. Hamburger Button (Sirf Mobile par dikhega) */}
        <button
          className={`hamburger-btn ${isMenuOpen ? "open" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle Navigation"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </header>


      {/* Hero / Main Section */}
      <main className="main-content">
        {activeSection === 'home' && (
          <section className="hero-slider-section" style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
            {/* 1. Main Premium Slider Container */}
            {/* ================= CENTER POPUP MODAL CARD (MOBILE RESPONSIVE) ================= */}
            {showModal && (
              <div
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100vw',
                  height: '100vh',
                  backgroundColor: 'rgba(15, 23, 42, 0.75)',
                  backdropFilter: 'blur(6px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 99999,
                  padding: '16px',
                  boxSizing: 'border-box'
                }}
                onClick={() => setShowModal(false)}
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    position: 'relative',
                    maxWidth: '480px',
                    width: '100%',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                    borderRadius: '20px',
                    padding: 'clamp(20px, 5vw, 32px)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
                    border: '1px solid rgba(255, 255, 255, 0.8)',
                    textAlign: 'center',
                    boxSizing: 'border-box'
                  }}
                >
                  {/* Close Icon (✕) */}
                  <button
                    onClick={() => setShowModal(false)}
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: '#f1f5f9',
                      color: '#0f172a',
                      border: 'none',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      display: 'grid',
                      placeItems: 'center',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = '#e2e8f0'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = '#f1f5f9'; }}
                  >
                    ✕
                  </button>

                  {/* Badge / Tag */}
                  <span style={{
                    display: 'inline-block',
                    padding: '5px 14px',
                    backgroundColor: '#dbeafe',
                    color: '#2563eb',
                    borderRadius: '20px',
                    fontSize: '11px',
                    fontWeight: '800',
                    letterSpacing: '0.8px',
                    textTransform: 'uppercase',
                    marginBottom: '12px',
                    marginTop: '6px'
                  }}>
                    Admissions Open 2026-27
                  </span>

                  {/* Card Title */}
                  <h2 style={{
                    fontSize: 'clamp(20px, 4.5vw, 24px)',
                    fontWeight: '900',
                    color: '#0f172a',
                    margin: '0 0 10px 0',
                    lineHeight: '1.25'
                  }}>
                    Welcome to The Knowledge Hub Academy
                  </h2>

                  {/* English Detail Text */}
                  <p style={{
                    fontSize: 'clamp(13px, 3.5vw, 15px)',
                    color: '#475569',
                    lineHeight: '1.55',
                    margin: '0 0 20px 0'
                  }}>
                    Join our premier institution dedicated to academic brilliance, STEM education, and strong moral character building. Secure your seat for the upcoming academic session today!
                  </p>

                  {/* Action Buttons */}
                  <div style={{
                    display: 'flex',
                    gap: '10px',
                    justifyContent: 'center',
                    flexWrap: 'wrap'
                  }}>
                    {/* Apply Now Button */}
                    <button
                      onClick={() => {
                        setShowModal(false);
                        setActiveSection('apply');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      style={{
                        flex: '1 1 140px',
                        padding: '12px 18px',
                        background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '12px',
                        fontSize: '14px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        boxShadow: '0 10px 20px rgba(37, 99, 235, 0.3)',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      Apply Now →
                    </button>

                    {/* Close / Dismiss Button */}
                    <button
                      onClick={() => setShowModal(false)}
                      style={{
                        flex: '1 1 100px',
                        padding: '12px 18px',
                        background: '#f1f5f9',
                        color: '#475569',
                        border: '1px solid #cbd5e1',
                        borderRadius: '12px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            )}
            <>
  <style>{`
    @media (max-width: 768px) {
      .responsive-hero-container {
        height: 60vh !important;
        min-height: 420px !important;
        border-radius: 12px !important;
      }
      .responsive-hero-padding {
        padding: 0 20px !important;
      }
      .responsive-hero-tag {
        padding: 4px 12px !important;
        font-size: 11px !important;
        margin-bottom: 10px !important;
      }
      .responsive-hero-title {
        font-size: 28px !important;
        margin-bottom: 10px !important;
      }
      .responsive-hero-subtitle {
        font-size: 14px !important;
        margin-bottom: 18px !important;
      }
      .responsive-hero-btn {
        padding: 10px 22px !important;
        font-size: 14px !important;
      }
      .responsive-hero-dots {
        bottom: 15px !important;
      }
    }
  `}</style>

  <div
    className="responsive-hero-container"
    style={{
      position: 'relative',
      width: '100%',
      height: '80vh',
      minHeight: '500px',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)'
    }}
  >
    {slides.map((slide, index) => (
      <div
        key={slide.id}
        className="responsive-hero-padding"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: index === currentSlide ? 1 : 0,
          pointerEvents: index === currentSlide ? 'auto' : 'none',
          transition: 'opacity 1s ease-in-out',
          backgroundImage: `linear-gradient(to right, rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.4)), url(${slide.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          padding: '0 5%'
        }}
      >
        {/* Slide Content Box */}
        <div
          style={{
            maxWidth: '650px',
            color: '#ffffff',
            transform: index === currentSlide ? 'translateY(0)' : 'translateY(20px)',
            transition: 'transform 0.8s ease-out',
            fontFamily: "'Inter', 'Segoe UI', Roboto, sans-serif"
          }}
        >
          <span
            className="responsive-hero-tag"
            style={{
              display: 'inline-block',
              padding: '6px 16px',
              backgroundColor: '#2563eb',
              color: '#ffffff',
              borderRadius: '30px',
              fontSize: '13px',
              fontWeight: '700',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              marginBottom: '15px'
            }}
          >
            {slide.tag}
          </span>

          <h1
            className="responsive-hero-title"
            style={{
              fontSize: 'clamp(32px, 5vw, 52px)',
              fontWeight: '800',
              lineHeight: '1.15',
              margin: '0 0 15px 0',
              color: '#ffffff',
              textShadow: '0 2px 10px rgba(0,0,0,0.3)'
            }}
          >
            {slide.title}
          </h1>

          <p
            className="responsive-hero-subtitle"
            style={{
              fontSize: 'clamp(15px, 2vw, 18px)',
              color: '#e2e8f0',
              lineHeight: '1.6',
              marginBottom: '25px',
              maxWidth: '550px'
            }}
          >
            {slide.subtitle}
          </p>

          {/* Smooth Scroll Button */}
          <button
            className="responsive-hero-btn"
            onClick={() => {
              setActiveSection('programs');
              window.scrollTo({ top: 500, behavior: 'smooth' });
            }}
            style={{
              padding: '14px 32px',
              backgroundColor: '#ffffff',
              color: '#0f172a',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#2563eb';
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff';
              e.currentTarget.style.color = '#0f172a';
            }}
          >
            Learn More ↓
          </button>
        </div>
      </div>
    ))}

    {/* 2. Slider Navigation Dots */}
    <div
      className="responsive-hero-dots"
      style={{
        position: 'absolute',
        bottom: '25px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '10px',
        zIndex: 10
      }}
    >
      {slides.map((_, dotIndex) => (
        <button
          key={dotIndex}
          onClick={() => setCurrentSlide(dotIndex)}
          style={{
            width: dotIndex === currentSlide ? '32px' : '10px',
            height: '10px',
            borderRadius: '5px',
            backgroundColor: dotIndex === currentSlide ? '#2563eb' : 'rgba(255, 255, 255, 0.6)',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
        />
      ))}
    </div>
  </div>
</>
            {/* Custom CSS Animation Keyframes for Smooth Floating Effect */}
            <style>{`
  @keyframes floatAnimation {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-12px); }
    100% { transform: translateY(0px); }
  }
  @keyframes pulseGlow {
    0% { box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15); }
    50% { box-shadow: 0 12px 40px 0 rgba(37, 99, 235, 0.3); }
    100% { box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15); }
  }
`}</style>

            {/* 1. Leadership Vision Section (Glassmorphism Split Layout) */}
            <div style={{ marginTop: 'clamp(40px, 8vw, 80px)', marginBottom: 'clamp(40px, 8vw, 80px)', padding: '0 16px' }}>
  {/* Centered Premium Title */}
  <div style={{ textAlign: 'center', marginBottom: 'clamp(30px, 5vw, 50px)' }}>
    <span style={{
      color: '#2563eb',
      background: 'rgba(37, 99, 235, 0.1)',
      backdropFilter: 'blur(10px)',
      padding: '8px 24px',
      borderRadius: '30px',
      fontSize: '13px',
      fontWeight: '800',
      letterSpacing: '1.5px',
      textTransform: 'uppercase',
      display: 'inline-block',
      border: '1px solid rgba(37, 99, 235, 0.2)'
    }}>
      Leadership Vision
    </span>
    <h2 style={{ color: '#0f172a', fontSize: 'clamp(24px, 5vw, 40px)', fontWeight: '900', margin: '12px 0 10px 0', letterSpacing: '-1px', lineHeight: '1.2' }}>
      Welcome To The Knowledge Hub Academy
    </h2>
    <div style={{ width: '100px', height: '4px', background: 'linear-gradient(90deg, #2563eb, #38bdf8)', margin: '0 auto', borderRadius: '2px' }}></div>
  </div>

  {/* Split Layout: Image Card + Text Glass Card */}
  <div style={{ display: 'flex', gap: 'clamp(20px, 4vw, 40px)', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>

    {/* Left Side: Animated Floating Image Card */}
    <div style={{
      flex: '1 1 300px',
      maxWidth: '100%',
      animation: 'floatAnimation 5s ease-in-out infinite',
      position: 'relative'
    }}>
      <div style={{
        padding: '12px',
        background: 'rgba(255, 255, 255, 0.45)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderRadius: '28px',
        border: '1px solid rgba(255, 255, 255, 0.6)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)'
      }}>
        <img
          src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80"
          alt="Principal Message"
          style={{ width: '100%', height: 'clamp(260px, 40vw, 420px)', objectFit: 'cover', borderRadius: '20px', display: 'block' }}
        />
      </div>
    </div>

    {/* Right Side: Ultra Glassmorphism Content Card */}
    <div style={{
      flex: '1 1 300px',
      maxWidth: '100%',
      background: 'rgba(255, 255, 255, 0.65)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderRadius: '28px',
      padding: 'clamp(20px, 5vw, 45px)',
      border: '1px solid rgba(255, 255, 255, 0.8)',
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
      animation: 'pulseGlow 6s ease-in-out infinite',
      boxSizing: 'border-box'
    }}>
      <h3 style={{ color: '#0f172a', fontSize: 'clamp(20px, 4vw, 30px)', fontWeight: '800', margin: '0 0 20px 0', lineHeight: '1.2' }}>
        Nurturing Genius, Character & Future Leadership
      </h3>
      <p style={{ color: '#334155', fontSize: 'clamp(14px, 2vw, 16px)', lineHeight: '1.8', marginBottom: '20px' }}>
        "At The Knowledge Hub Academy, we go far beyond conventional textbook teaching. We cultivate an ecosystem where intellectual curiosity meets unwavering moral integrity, equipping young minds to excel in an ever-evolving world."
      </p>
      <p style={{ color: '#475569', fontSize: 'clamp(13px, 1.8vw, 15px)', lineHeight: '1.7', marginBottom: '30px' }}>
        Our holistic curriculum combines global academic standards, interactive STEM practicals, and dedicated mentorship for every student.
      </p>
      <div style={{ paddingLeft: '16px', borderLeft: '4px solid #2563eb' }}>
        <h4 style={{ margin: 0, color: '#0f172a', fontSize: 'clamp(16px, 2.5vw, 20px)', fontWeight: '800' }}>Mrs. Farida Kamal</h4>
        <p style={{ margin: '4px 0 0 0', color: '#2563eb', fontSize: '14px', fontWeight: '700' }}>Principal & Managing Director</p>
      </div>
    </div>

  </div>
</div>
            <>
  {/* SECTION 1: Campus Vision */}
  <div style={{ marginTop: 'clamp(40px, 8vw, 80px)', marginBottom: 'clamp(40px, 8vw, 80px)', padding: '0 16px' }}>
    {/* Split Layout: Text Glass Card + Image Card */}
    <div style={{ display: 'flex', gap: 'clamp(20px, 4vw, 40px)', alignItems: 'center', flexWrap: 'wrap-reverse', justifyContent: 'center' }}>

      {/* Left Side: Glassmorphism Content Card */}
      <div style={{
        flex: '1 1 300px',
        maxWidth: '100%',
        background: 'rgba(255, 255, 255, 0.65)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRadius: '28px',
        padding: 'clamp(20px, 5vw, 45px)',
        border: '1px solid rgba(255, 255, 255, 0.8)',
        boxShadow: '0 8px 32px 0 rgba(13, 148, 136, 0.1)',
        animation: 'pulseGlow 6s ease-in-out infinite',
        boxSizing: 'border-box'
      }}>
        <div style={{ marginBottom: '15px' }}>
          <span style={{
            color: '#0d9488',
            background: 'rgba(13, 148, 136, 0.1)',
            padding: '6px 16px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: '800',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            display: 'inline-block',
            border: '1px solid rgba(13, 148, 136, 0.2)'
          }}>
            Campus Vision
          </span>
        </div>
        <h3 style={{ color: '#0f172a', fontSize: 'clamp(20px, 4vw, 30px)', fontWeight: '800', margin: '0 0 20px 0', lineHeight: '1.2' }}>
          Modern Classrooms & Practical Learning
        </h3>
        <p style={{ color: '#334155', fontSize: 'clamp(14px, 2vw, 16px)', lineHeight: '1.8', marginBottom: '20px' }}>
          "Education is not just about memorizing facts; it is about training the mind to think critically. Our state-of-the-art campus provides students with hands-on exposure to science, technology, and arts."
        </p>
        <p style={{ color: '#475569', fontSize: 'clamp(13px, 1.8vw, 15px)', lineHeight: '1.7', marginBottom: '30px' }}>
          We foster collaborative learning spaces, advanced robotics labs, and digital libraries that encourage students to explore their passions without boundaries.
        </p>
        <div style={{ paddingLeft: '16px', borderLeft: '4px solid #0d9488' }}>
          <h4 style={{ margin: 0, color: '#0f172a', fontSize: 'clamp(16px, 2.5vw, 20px)', fontWeight: '800' }}>Academic Excellence Program</h4>
          <p style={{ margin: '4px 0 0 0', color: '#0d9488', fontSize: '14px', fontWeight: '700' }}>Innovation & STEM Wing</p>
        </div>
      </div>

      {/* Right Side: Image Card */}
      <div style={{
        flex: '1 1 300px',
        maxWidth: '100%',
        animation: 'floatAnimation 5s ease-in-out infinite',
        position: 'relative'
      }}>
        <div style={{
          padding: '12px',
          background: 'rgba(255, 255, 255, 0.45)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderRadius: '28px',
          border: '1px solid rgba(255, 255, 255, 0.6)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)'
        }}>
          <img
            src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80"
            alt="Modern School Classroom"
            style={{ width: '100%', height: 'clamp(260px, 40vw, 420px)', objectFit: 'cover', borderRadius: '20px', display: 'block' }}
          />
        </div>
      </div>

    </div>
  </div>

  {/* SECTION 2: Beyond Books */}
  <div style={{ marginTop: 'clamp(40px, 8vw, 80px)', marginBottom: 'clamp(40px, 8vw, 80px)', padding: '0 16px' }}>
    {/* Split Layout: Image Card + Text Glass Card */}
    <div style={{ display: 'flex', gap: 'clamp(20px, 4vw, 40px)', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>

      {/* Left Side: Floating Image Card */}
      <div style={{
        flex: '1 1 300px',
        maxWidth: '100%',
        animation: 'floatAnimation 5s ease-in-out infinite',
        position: 'relative'
      }}>
        <div style={{
          padding: '12px',
          background: 'rgba(255, 255, 255, 0.45)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderRadius: '28px',
          border: '1px solid rgba(255, 255, 255, 0.6)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)'
        }}>
          <img
            src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80"
            alt="School Athletics and Activities"
            style={{ width: '100%', height: 'clamp(260px, 40vw, 420px)', objectFit: 'cover', borderRadius: '20px', display: 'block' }}
          />
        </div>
      </div>

      {/* Right Side: Glassmorphism Content Card */}
      <div style={{
        flex: '1 1 300px',
        maxWidth: '100%',
        background: 'rgba(255, 255, 255, 0.65)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRadius: '28px',
        padding: 'clamp(20px, 5vw, 45px)',
        border: '1px solid rgba(255, 255, 255, 0.8)',
        boxShadow: '0 8px 32px 0 rgba(234, 88, 12, 0.1)',
        animation: 'pulseGlow 6s ease-in-out infinite',
        boxSizing: 'border-box'
      }}>
        <div style={{ marginBottom: '15px' }}>
          <span style={{
            color: '#ea580c',
            background: 'rgba(234, 88, 12, 0.1)',
            padding: '6px 16px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: '800',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            display: 'inline-block',
            border: '1px solid rgba(234, 88, 12, 0.2)'
          }}>
            Beyond Books
          </span>
        </div>
        <h3 style={{ color: '#0f172a', fontSize: 'clamp(20px, 4vw, 30px)', fontWeight: '800', margin: '0 0 20px 0', lineHeight: '1.2' }}>
          Building Resilience & Teamwork
        </h3>
        <p style={{ color: '#334155', fontSize: 'clamp(14px, 2vw, 16px)', lineHeight: '1.8', marginBottom: '20px' }}>
          "Physical education and co-curricular activities play a vital role in building stamina, discipline, and team spirit. We ensure that every student discovers their unique athletic and artistic potential."
        </p>
        <p style={{ color: '#475569', fontSize: 'clamp(13px, 1.8vw, 15px)', lineHeight: '1.7', marginBottom: '30px' }}>
          From indoor sports complexes to debate clubs and art exhibitions, our co-curricular programs complement classroom learning to build well-rounded personalities.
        </p>
        <div style={{ paddingLeft: '16px', borderLeft: '4px solid #ea580c' }}>
          <h4 style={{ margin: 0, color: '#0f172a', fontSize: 'clamp(16px, 2.5vw, 20px)', fontWeight: '800' }}>Co-Curricular Wing</h4>
          <p style={{ margin: '4px 0 0 0', color: '#ea580c', fontSize: '14px', fontWeight: '700' }}>Sports & Character Development</p>
        </div>
      </div>

    </div>
  </div>
</>

            {/* 2. Core Educational Pillars (Floating Glass Cards Grid) */}
            <div style={{ marginTop: 'clamp(40px, 8vw, 90px)', marginBottom: 'clamp(40px, 8vw, 90px)', padding: '0 16px' }}>
  {/* Header Section */}
  <div style={{ textAlign: 'center', marginBottom: 'clamp(35px, 6vw, 55px)' }}>
    <span style={{
      color: '#2563eb',
      background: 'rgba(37, 99, 235, 0.1)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      padding: '6px 20px',
      borderRadius: '30px',
      fontSize: '13px',
      fontWeight: '800',
      letterSpacing: '1px',
      textTransform: 'uppercase',
      display: 'inline-block',
      border: '1px solid rgba(37, 99, 235, 0.2)'
    }}>
      Why We Stand Out
    </span>
    <h2 style={{ color: '#0f172a', fontSize: 'clamp(26px, 5vw, 38px)', fontWeight: '900', margin: '12px 0 10px 0', lineHeight: '1.2' }}>
      Our Core Educational Pillars
    </h2>
    <p style={{ color: '#64748b', fontSize: 'clamp(14px, 2vw, 17px)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
      Discover the foundations of our commitment to academic brilliance and student success.
    </p>
    <div style={{ width: '80px', height: '4px', background: 'linear-gradient(90deg, #2563eb, #38bdf8)', margin: '18px auto 0 auto', borderRadius: '2px' }}></div>
  </div>

  {/* Responsive Grid Section */}
  <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(240px, 100%, 260px), 1fr))',
    gap: 'clamp(16px, 3vw, 30px)'
  }}>

    {/* Glass Card 1 */}
    <div style={{
      padding: 'clamp(24px, 4vw, 35px) clamp(20px, 3vw, 30px)',
      background: 'rgba(255, 255, 255, 0.6)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderRadius: '24px',
      border: '1px solid rgba(255, 255, 255, 0.8)',
      boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
      animation: 'floatAnimation 6s ease-in-out infinite',
      boxSizing: 'border-box'
    }}>
      <div style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, #2563eb, #38bdf8)', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', color: '#fff', marginBottom: '20px', boxShadow: '0 8px 20px rgba(37, 99, 235, 0.3)' }}>
        🎓
      </div>
      <h3 style={{ margin: '0 0 10px 0', color: '#0f172a', fontSize: 'clamp(18px, 3vw, 22px)', fontWeight: '800' }}>Academic Excellence</h3>
      <p style={{ margin: 0, fontSize: 'clamp(13px, 1.8vw, 14px)', color: '#475569', lineHeight: '1.7' }}>
        Rigorous concept-driven learning tailored to bring out top performances in board examinations and entry tests.
      </p>
    </div>

    {/* Glass Card 2 */}
    <div style={{
      padding: 'clamp(24px, 4vw, 35px) clamp(20px, 3vw, 30px)',
      background: 'rgba(255, 255, 255, 0.6)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderRadius: '24px',
      border: '1px solid rgba(255, 255, 255, 0.8)',
      boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
      animation: 'floatAnimation 6s ease-in-out infinite 1.5s',
      boxSizing: 'border-box'
    }}>
      <div style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, #059669, #34d399)', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', color: '#fff', marginBottom: '20px', boxShadow: '0 8px 20px rgba(5, 150, 105, 0.3)' }}>
        💻
      </div>
      <h3 style={{ margin: '0 0 10px 0', color: '#0f172a', fontSize: 'clamp(18px, 3vw, 22px)', fontWeight: '800' }}>STEM & Digital Labs</h3>
      <p style={{ margin: 0, fontSize: 'clamp(13px, 1.8vw, 14px)', color: '#475569', lineHeight: '1.7' }}>
        Advanced computer labs and high-tech Science workstations for practical hands-on technical training.
      </p>
    </div>

    {/* Glass Card 3 */}
    <div style={{
      padding: 'clamp(24px, 4vw, 35px) clamp(20px, 3vw, 30px)',
      background: 'rgba(255, 255, 255, 0.6)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderRadius: '24px',
      border: '1px solid rgba(255, 255, 255, 0.8)',
      boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
      animation: 'floatAnimation 6s ease-in-out infinite 3s',
      boxSizing: 'border-box'
    }}>
      <div style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, #d97706, #fbbf24)', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', color: '#fff', marginBottom: '20px', boxShadow: '0 8px 20px rgba(217, 119, 6, 0.3)' }}>
        🌟
      </div>
      <h3 style={{ margin: '0 0 10px 0', color: '#0f172a', fontSize: 'clamp(18px, 3vw, 22px)', fontWeight: '800' }}>Character Building</h3>
      <p style={{ margin: 0, fontSize: 'clamp(13px, 1.8vw, 14px)', color: '#475569', lineHeight: '1.7' }}>
        Instilling discipline, empathetic social values, Islamic ethics, and leadership skills in every student.
      </p>
    </div>

    {/* Glass Card 4 */}
    <div style={{
      padding: 'clamp(24px, 4vw, 35px) clamp(20px, 3vw, 30px)',
      background: 'rgba(255, 255, 255, 0.6)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderRadius: '24px',
      border: '1px solid rgba(255, 255, 255, 0.8)',
      boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
      animation: 'floatAnimation 6s ease-in-out infinite 4.5s',
      boxSizing: 'border-box'
    }}>
      <div style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, #7c3aed, #a78bfa)', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', color: '#fff', marginBottom: '20px', boxShadow: '0 8px 20px rgba(124, 58, 237, 0.3)' }}>
        🏆
      </div>
      <h3 style={{ margin: '0 0 10px 0', color: '#0f172a', fontSize: 'clamp(18px, 3vw, 22px)', fontWeight: '800' }}>Sports & Activities</h3>
      <p style={{ margin: 0, fontSize: 'clamp(13px, 1.8vw, 14px)', color: '#475569', lineHeight: '1.7' }}>
        Comprehensive athletics, debates, speech contests, and arts clubs ensuring balanced growth.
      </p>
    </div>

  </div>
</div>

            {/* 3. Dark Floating Glass Statistics Banner */}
            {/* 3. Dark Floating Glass Statistics Banner */}
            <div style={{
  marginTop: 'clamp(40px, 8vw, 80px)',
  marginBottom: 'clamp(40px, 8vw, 80px)',
  padding: 'clamp(30px, 5vw, 50px) clamp(20px, 4vw, 35px)',
  background: 'rgba(15, 23, 42, 0.95)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  borderRadius: '28px',
  color: '#ffffff',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.4)',
  animation: 'pulseGlow 8s ease-in-out infinite',
  boxSizing: 'border-box'
}}>
  <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(130px, 45%, 200px), 1fr))',
    gap: 'clamp(20px, 4vw, 30px)',
    textAlign: 'center'
  }}>
    <div>
      <h3 style={{ fontSize: 'clamp(32px, 6vw, 46px)', fontWeight: '900', color: '#38bdf8', margin: 0, letterSpacing: '-1px', lineHeight: '1.1' }}>
        <StatCounter id="students" end={1200} duration={2000} suffix="+" />
      </h3>
      <p style={{ margin: '8px 0 0 0', color: '#94a3b8', fontSize: 'clamp(13px, 2vw, 16px)', fontWeight: '600' }}>Enrolled Students</p>
    </div>
    <div>
      <h3 style={{ fontSize: 'clamp(32px, 6vw, 46px)', fontWeight: '900', color: '#38bdf8', margin: 0, letterSpacing: '-1px', lineHeight: '1.1' }}>
        <StatCounter id="teachers" end={50} duration={1800} suffix="+" />
      </h3>
      <p style={{ margin: '8px 0 0 0', color: '#94a3b8', fontSize: 'clamp(13px, 2vw, 16px)', fontWeight: '600' }}>Expert Teachers</p>
    </div>
    <div>
      <h3 style={{ fontSize: 'clamp(32px, 6vw, 46px)', fontWeight: '900', color: '#38bdf8', margin: 0, letterSpacing: '-1px', lineHeight: '1.1' }}>
        <StatCounter id="results" end={98} duration={1500} suffix="%" />
      </h3>
      <p style={{ margin: '8px 0 0 0', color: '#94a3b8', fontSize: 'clamp(13px, 2vw, 16px)', fontWeight: '600' }}>Board Exam Result</p>
    </div>
    <div>
      <h3 style={{ fontSize: 'clamp(32px, 6vw, 46px)', fontWeight: '900', color: '#38bdf8', margin: 0, letterSpacing: '-1px', lineHeight: '1.1' }}>
        <StatCounter id="years" end={15} duration={1200} suffix="+" />
      </h3>
      <p style={{ margin: '8px 0 0 0', color: '#94a3b8', fontSize: 'clamp(13px, 2vw, 16px)', fontWeight: '600' }}>Years Of Legacy</p>
    </div>
  </div>
</div>

            {/* 4. Glassmorphism Notice Board & News */}
            <div style={{ marginTop: 'clamp(40px, 8vw, 80px)', marginBottom: 'clamp(30px, 6vw, 50px)', padding: '0 16px' }}>
  {/* Header Section */}
  <div style={{ textAlign: 'center', marginBottom: 'clamp(30px, 6vw, 50px)' }}>
    <span style={{
      color: '#2563eb',
      background: 'rgba(37, 99, 235, 0.1)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      padding: '6px 20px',
      borderRadius: '30px',
      fontSize: '13px',
      fontWeight: '800',
      letterSpacing: '1px',
      textTransform: 'uppercase',
      display: 'inline-block',
      border: '1px solid rgba(37, 99, 235, 0.2)'
    }}>
      Stay Updated
    </span>
    <h2 style={{ color: '#0f172a', fontSize: 'clamp(26px, 5vw, 38px)', fontWeight: '900', margin: '12px 0 10px 0', lineHeight: '1.2' }}>
      Latest News & Notice Board
    </h2>
    <div style={{ width: '80px', height: '4px', background: 'linear-gradient(90deg, #2563eb, #38bdf8)', margin: '18px auto 0 auto', borderRadius: '2px' }}></div>
  </div>

  {/* Responsive Grid Section */}
  <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(250px, 100%, 280px), 1fr))',
    gap: 'clamp(16px, 3vw, 30px)'
  }}>

    {/* Notice Card 1 */}
    <div style={{
      padding: 'clamp(20px, 4vw, 30px)',
      background: 'rgba(255, 255, 255, 0.65)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderRadius: '24px',
      border: '1px solid rgba(255, 255, 255, 0.8)',
      boxShadow: '0 8px 25px rgba(0,0,0,0.04)',
      boxSizing: 'border-box'
    }}>
      <span style={{ fontSize: '12px', color: '#ffffff', background: '#2563eb', padding: '5px 14px', borderRadius: '20px', fontWeight: '800', display: 'inline-block' }}>
        Admissions
      </span>
      <h3 style={{ margin: '16px 0 10px 0', color: '#0f172a', fontSize: 'clamp(18px, 3vw, 20px)', fontWeight: '800', lineHeight: '1.3' }}>
        Admissions Open Session 2026-27
      </h3>
      <p style={{ margin: 0, fontSize: 'clamp(13px, 1.8vw, 14px)', color: '#64748b', lineHeight: '1.7' }}>
        Registration forms are available at the admin desk for Montessori to Class 9th. Limited seats available.
      </p>
    </div>

    {/* Notice Card 2 */}
    <div style={{
      padding: 'clamp(20px, 4vw, 30px)',
      background: 'rgba(255, 255, 255, 0.65)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderRadius: '24px',
      border: '1px solid rgba(255, 255, 255, 0.8)',
      boxShadow: '0 8px 25px rgba(0,0,0,0.04)',
      boxSizing: 'border-box'
    }}>
      <span style={{ fontSize: '12px', color: '#ffffff', background: '#059669', padding: '5px 14px', borderRadius: '20px', fontWeight: '800', display: 'inline-block' }}>
        Campus Event
      </span>
      <h3 style={{ margin: '16px 0 10px 0', color: '#0f172a', fontSize: 'clamp(18px, 3vw, 20px)', fontWeight: '800', lineHeight: '1.3' }}>
        Annual Science & Art Fair
      </h3>
      <p style={{ margin: 0, fontSize: 'clamp(13px, 1.8vw, 14px)', color: '#64748b', lineHeight: '1.7' }}>
        Students will present live working models, robotics projects, and creative artwork next Friday.
      </p>
    </div>

    {/* Notice Card 3 */}
    <div style={{
      padding: 'clamp(20px, 4vw, 30px)',
      background: 'rgba(255, 255, 255, 0.65)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderRadius: '24px',
      border: '1px solid rgba(255, 255, 255, 0.8)',
      boxShadow: '0 8px 25px rgba(0,0,0,0.04)',
      boxSizing: 'border-box'
    }}>
      <span style={{ fontSize: '12px', color: '#ffffff', background: '#d97706', padding: '5px 14px', borderRadius: '20px', fontWeight: '800', display: 'inline-block' }}>
        Parent Notice
      </span>
      <h3 style={{ margin: '16px 0 10px 0', color: '#0f172a', fontSize: 'clamp(18px, 3vw, 20px)', fontWeight: '800', lineHeight: '1.3' }}>
        Parent-Teacher Meeting (PTM)
      </h3>
      <p style={{ margin: 0, fontSize: 'clamp(13px, 1.8vw, 14px)', color: '#64748b', lineHeight: '1.7' }}>
        PTM is scheduled for the last Saturday of this month to review student assessment report cards.
      </p>
    </div>

  </div>
</div>

            {/* ================= COMPACT & BEAUTIFUL RESPONSIVE CONTACT BAR ================= */}
            <div style={{
  marginTop: 'clamp(20px, 4vw, 30px)',
  marginBottom: 'clamp(30px, 5vw, 40px)',
  padding: 'clamp(14px, 3vw, 18px) clamp(16px, 4vw, 28px)',
  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.85) 100%)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  borderRadius: '16px',
  border: '1px solid rgba(226, 232, 240, 0.9)',
  boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.05), 0 0 15px rgba(37, 99, 235, 0.04)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: '12px 20px',
  boxSizing: 'border-box'
}}>

  {/* Left Side: Compact Title & Subtext */}
  <div style={{ flex: '1 1 220px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
      <span style={{
        width: '7px',
        height: '7px',
        borderRadius: '50%',
        backgroundColor: '#2563eb',
        boxShadow: '0 0 8px #2563eb',
        flexShrink: 0
      }}></span>
      <h4 style={{ margin: 0, color: '#0f172a', fontSize: 'clamp(14px, 2.5vw, 16px)', fontWeight: '800' }}>
        Need Admission Assistance?
      </h4>
    </div>
    <p style={{ margin: 0, color: '#64748b', fontSize: 'clamp(11px, 2vw, 13px)', lineHeight: '1.4', fontWeight: '500' }}>
      Direct contact with our admin desk via call or email.
    </p>
  </div>

  {/* Right Side: Compact Contact Badges */}
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flexWrap: 'wrap',
    flex: '1 1 280px',
    justifyContent: 'flex-start'
  }}>

    {/* Phone Badge */}
    <a
      href="tel:03421287734"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 14px',
        background: '#ffffff',
        borderRadius: '12px',
        border: '1px solid #cbd5e1',
        textDecoration: 'none',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
        transition: 'all 0.2s ease',
        flex: '1 1 140px',
        maxWidth: '100%',
        boxSizing: 'border-box'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#2563eb';
        e.currentTarget.style.transform = 'translateY(-1px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#cbd5e1';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div style={{
        width: '28px',
        height: '28px',
        borderRadius: '8px',
        background: 'rgba(37, 99, 235, 0.1)',
        display: 'grid',
        placeItems: 'center',
        fontSize: '14px',
        flexShrink: 0
      }}>
        📞
      </div>
      <div style={{ overflow: 'hidden' }}>
        <span style={{ display: 'block', fontSize: '9px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Call / WhatsApp
        </span>
        <span style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a', whiteSpace: 'nowrap' }}>
          0342 1287734
        </span>
      </div>
    </a>

    {/* Email Badge */}
    <a
      href="mailto:book.apexcode@gmail.com"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 14px',
        background: '#ffffff',
        borderRadius: '12px',
        border: '1px solid #cbd5e1',
        textDecoration: 'none',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
        transition: 'all 0.2s ease',
        flex: '1 1 180px',
        maxWidth: '100%',
        boxSizing: 'border-box'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#059669';
        e.currentTarget.style.transform = 'translateY(-1px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#cbd5e1';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div style={{
        width: '28px',
        height: '28px',
        borderRadius: '8px',
        background: 'rgba(5, 150, 105, 0.1)',
        display: 'grid',
        placeItems: 'center',
        fontSize: '14px',
        flexShrink: 0
      }}>
        ✉️
      </div>
      <div style={{ overflow: 'hidden', minWidth: 0 }}>
        <span style={{ display: 'block', fontSize: '9px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Email Desk
        </span>
        <span style={{ fontSize: '12px', fontWeight: '800', color: '#0f172a', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          book.apexcode@gmail.com
        </span>
      </div>
    </a>

  </div>

</div>

          </section>
        )}
{activeSection === 'about' && (
  <section
    style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 20px',
      fontFamily: "'Inter', 'Segoe UI', Roboto, sans-serif"
    }}
  >
    {/* Hero Header Banner */}
    <div
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #1e1b4b 100%)',
        borderRadius: '24px',
        padding: '50px 30px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 20px 50px rgba(15, 23, 42, 0.25)',
        marginBottom: '50px'
      }}
    >
      <div style={{
        display: 'inline-block',
        padding: '6px 18px',
        background: 'rgba(56, 189, 248, 0.15)',
        border: '1px solid rgba(56, 189, 248, 0.3)',
        borderRadius: '30px',
        color: '#38bdf8',
        fontSize: '12px',
        fontWeight: '800',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        marginBottom: '15px'
      }}>
        Discover Our Institution
      </div>

      <h1 style={{
        color: '#ffffff',
        fontSize: 'clamp(28px, 4vw, 44px)',
        fontWeight: '900',
        margin: '0 0 16px 0',
        lineHeight: '1.2'
      }}>
        About The Knowledge Hub Academy
      </h1>

      <p style={{
        color: '#94a3b8',
        fontSize: 'clamp(14px, 2vw, 17px)',
        maxWidth: '750px',
        margin: '0 auto',
        lineHeight: '1.7',
        fontWeight: '500'
      }}>
        Empowering generations through educational excellence, innovative STEM methodologies, and unshakeable moral foundation since inception.
      </p>
    </div>

    {/* Story & Campus Overview Split Section */}
    <div style={{
      display: 'flex',
      gap: '40px',
      alignItems: 'center',
      flexWrap: 'wrap',
      marginBottom: '60px'
    }}>
      {/* Left Column: Premium Text Content */}
      <div style={{ flex: '1 1 450px' }}>
        <span style={{
          color: '#2563eb',
          fontWeight: '800',
          fontSize: '13px',
          letterSpacing: '1px',
          textTransform: 'uppercase'
        }}>
          Our Journey & Values
        </span>

        <h2 style={{
          color: '#0f172a',
          fontSize: 'clamp(24px, 3vw, 32px)',
          fontWeight: '800',
          margin: '10px 0 20px 0',
          lineHeight: '1.3'
        }}>
          Nurturing Lifelong Learners & Responsible Future Leaders
        </h2>

        <p style={{ color: '#475569', fontSize: '15px', lineHeight: '1.8', marginBottom: '16px' }}>
          Founded with a commitment to bridge conventional education with modern global standards, <strong>The Knowledge Hub Academy</strong> stands as a beacon of academic rigor and character building.
        </p>

        <p style={{ color: '#475569', fontSize: '15px', lineHeight: '1.8', marginBottom: '24px' }}>
          We believe that every child possesses unique potential. Our holistic approach integrates academic learning with practical scientific exposure, digital literacy, and social ethics to prepare students for real-world challenges.
        </p>

        <div style={{
          padding: '16px 20px',
          borderRadius: '12px',
          backgroundColor: '#f8fafc',
          borderLeft: '4px solid #2563eb'
        }}>
          <p style={{ margin: 0, color: '#1e293b', fontSize: '14px', fontWeight: '600', italic: 'italic' }}>
            "Education is not merely the learning of facts, but the training of the mind to think critically."
          </p>
        </div>
      </div>

      {/* Right Column: Image Presentation */}
      <div style={{ flex: '1 1 400px' }}>
        <div style={{
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.12)',
          border: '1px solid #e2e8f0'
        }}>
          <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
            alt="Academy Campus Life"
            style={{ width: '100%', height: '380px', objectFit: 'cover', display: 'block' }}
          />
        </div>
      </div>
    </div>

    {/* Vision & Mission Dual Cards */}
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '24px',
      marginBottom: '60px'
    }}>
      {/* Vision Card */}
      <div style={{
        padding: '32px 28px',
        borderRadius: '20px',
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        border: '1px solid #cbd5e1',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          borderRadius: '14px',
          backgroundColor: 'rgba(37, 99, 235, 0.1)',
          display: 'grid',
          placeItems: 'center',
          fontSize: '24px',
          marginBottom: '20px'
        }}>
          🎯
        </div>
        <h3 style={{ color: '#0f172a', fontSize: '22px', fontWeight: '800', margin: '0 0 12px 0' }}>
          Our Vision
        </h3>
        <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>
          To evolve into a premier educational institution recognized globally for academic innovation, ethical leadership development, and fostering an inclusive environment where students thrive emotionally and intellectually.
        </p>
      </div>

      {/* Mission Card */}
      <div style={{
        padding: '32px 28px',
        borderRadius: '20px',
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        border: '1px solid #cbd5e1',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          borderRadius: '14px',
          backgroundColor: 'rgba(5, 150, 105, 0.1)',
          display: 'grid',
          placeItems: 'center',
          fontSize: '24px',
          marginBottom: '20px'
        }}>
          🚀
        </div>
        <h3 style={{ color: '#0f172a', fontSize: '22px', fontWeight: '800', margin: '0 0 12px 0' }}>
          Our Mission
        </h3>
        <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>
          To provide high-quality concept-based education using modern pedagogical techniques, state-of-the-art facilities, and continuous moral guidance, enabling students to realize their full potential.
        </p>
      </div>
    </div>

    {/* Core Strengths Section */}
    <div style={{
      padding: '40px 30px',
      borderRadius: '24px',
      backgroundColor: '#0f172a',
      color: '#ffffff',
      boxShadow: '0 20px 40px rgba(15, 23, 42, 0.2)'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '35px' }}>
        <h3 style={{ fontSize: '26px', fontWeight: '800', margin: '0 0 10px 0', color: '#ffffff' }}>
          Why Families Trust Us
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '15px', margin: 0 }}>
          Distinct attributes that make our institution a center for comprehensive development.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '20px'
      }}>
        <div style={{ padding: '20px', borderRadius: '14px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <h4 style={{ color: '#38bdf8', fontSize: '16px', fontWeight: '700', margin: '0 0 8px 0' }}>Certified Educators</h4>
          <p style={{ color: '#cbd5e1', fontSize: '13px', lineHeight: '1.6', margin: 0 }}>Experienced teachers dedicated to student growth and interactive teaching.</p>
        </div>

        <div style={{ padding: '20px', borderRadius: '14px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <h4 style={{ color: '#38bdf8', fontSize: '16px', fontWeight: '700', margin: '0 0 8px 0' }}>Modern STEM Labs</h4>
          <p style={{ color: '#cbd5e1', fontSize: '13px', lineHeight: '1.6', margin: 0 }}>Equipped Science and Computer laboratories for hands-on experimentation.</p>
        </div>

        <div style={{ padding: '20px', borderRadius: '14px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <h4 style={{ color: '#38bdf8', fontSize: '16px', fontWeight: '700', margin: '0 0 8px 0' }}>Safe Environment</h4>
          <p style={{ color: '#cbd5e1', fontSize: '13px', lineHeight: '1.6', margin: 0 }}>CCTV monitored campus ensuring safety, hygiene, and discipline at all times.</p>
        </div>

        <div style={{ padding: '20px', borderRadius: '14px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <h4 style={{ color: '#38bdf8', fontSize: '16px', fontWeight: '700', margin: '0 0 8px 0' }}>Co-Curricular Focus</h4>
          <p style={{ color: '#cbd5e1', fontSize: '13px', lineHeight: '1.6', margin: 0 }}>Debates, athletics, and cultural events for balanced personality growth.</p>
        </div>
      </div>
    </div>
  </section>
)}
{activeSection === 'privacy' && (
  <section
    style={{
      maxWidth: '1000px',
      margin: '0 auto',
      padding: '40px 20px',
      fontFamily: "'Inter', 'Segoe UI', Roboto, sans-serif"
    }}
  >
    {/* Top Header Banner */}
    <div
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #1e1b4b 100%)',
        borderRadius: '24px',
        padding: '40px 28px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(15, 23, 42, 0.25)',
        marginBottom: '40px'
      }}
    >
      <div style={{
        display: 'inline-block',
        padding: '6px 18px',
        background: 'rgba(56, 189, 248, 0.15)',
        border: '1px solid rgba(56, 189, 248, 0.3)',
        borderRadius: '30px',
        color: '#38bdf8',
        fontSize: '11px',
        fontWeight: '800',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        marginBottom: '12px'
      }}>
        Data Protection & Transparency
      </div>

      <h1 style={{
        color: '#ffffff',
        fontSize: 'clamp(26px, 4vw, 38px)',
        fontWeight: '900',
        margin: '0 0 12px 0',
        lineHeight: '1.2'
      }}>
        Privacy Policy
      </h1>

      <p style={{
        color: '#94a3b8',
        fontSize: 'clamp(13px, 2vw, 15px)',
        maxWidth: '650px',
        margin: '0 auto',
        lineHeight: '1.6'
      }}>
        Your privacy is important to us. Learn how The Knowledge Hub Academy collects, uses, and safeguards your personal information.
      </p>
    </div>

    {/* Content Card Container */}
    <div style={{
      background: '#ffffff',
      borderRadius: '20px',
      padding: 'clamp(20px, 4vw, 40px)',
      border: '1px solid #e2e8f0',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)'
    }}>
      
      {/* Policy Clause 1 */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#0f172a', fontSize: '18px', fontWeight: '800', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(37, 99, 235, 0.1)', color: '#2563eb', display: 'grid', placeItems: 'center', fontSize: '14px', flexShrink: 0 }}>1</span>
          Information Collection
        </h3>
        <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.7', margin: 0, paddingLeft: '38px' }}>
          We collect personal details such as student name, guardian contact information, age, academic history, and residential address through our admission forms solely for administrative and educational purposes.
        </p>
      </div>

      {/* Policy Clause 2 */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#0f172a', fontSize: '18px', fontWeight: '800', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(37, 99, 235, 0.1)', color: '#2563eb', display: 'grid', placeItems: 'center', fontSize: '14px', flexShrink: 0 }}>2</span>
          Use of Information
        </h3>
        <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.7', margin: 0, paddingLeft: '38px' }}>
          Collected data is utilized to process enrollment requests, communicate academic updates, manage student records, and send official notifications regarding campus events, schedules, or emergency alerts.
        </p>
      </div>

      {/* Policy Clause 3 */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#0f172a', fontSize: '18px', fontWeight: '800', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(37, 99, 235, 0.1)', color: '#2563eb', display: 'grid', placeItems: 'center', fontSize: '14px', flexShrink: 0 }}>3</span>
          Data Protection & Security
        </h3>
        <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.7', margin: 0, paddingLeft: '38px' }}>
          We maintain strict security measures to protect your personal details against unauthorized access, loss, or misuse. Your submitted forms are strictly accessible by authorized academy personnel only.
        </p>
      </div>

      {/* Policy Clause 4 */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#0f172a', fontSize: '18px', fontWeight: '800', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(37, 99, 235, 0.1)', color: '#2563eb', display: 'grid', placeItems: 'center', fontSize: '14px', flexShrink: 0 }}>4</span>
          Third-Party Sharing
        </h3>
        <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.7', margin: 0, paddingLeft: '38px' }}>
          The Knowledge Hub Academy does not sell, rent, or trade student or parent information to third parties. Data is shared with government educational boards only when mandated for board examinations or legal compliance.
        </p>
      </div>

      {/* Policy Clause 5 */}
      <div style={{ marginBottom: '10px' }}>
        <h3 style={{ color: '#0f172a', fontSize: '18px', fontWeight: '800', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(37, 99, 235, 0.1)', color: '#2563eb', display: 'grid', placeItems: 'center', fontSize: '14px', flexShrink: 0 }}>5</span>
          Contact Us Regarding Privacy
        </h3>
        <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.7', margin: 0, paddingLeft: '38px' }}>
          If you have any questions or concerns about our privacy standards or wish to update your submitted information, please contact our administrative desk or email us at <strong>book.apexcode@gmail.com</strong>.
        </p>
      </div>

    </div>
  </section>
)}
{activeSection === 'terms' && (
  <section
    style={{
      maxWidth: '1000px',
      margin: '0 auto',
      padding: '40px 20px',
      fontFamily: "'Inter', 'Segoe UI', Roboto, sans-serif"
    }}
  >
    {/* Top Header Banner */}
    <div
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #1e1b4b 100%)',
        borderRadius: '24px',
        padding: '40px 28px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(15, 23, 42, 0.25)',
        marginBottom: '40px'
      }}
    >
      <div style={{
        display: 'inline-block',
        padding: '6px 18px',
        background: 'rgba(56, 189, 248, 0.15)',
        border: '1px solid rgba(56, 189, 248, 0.3)',
        borderRadius: '30px',
        color: '#38bdf8',
        fontSize: '11px',
        fontWeight: '800',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        marginBottom: '12px'
      }}>
        Rules & Guidelines
      </div>

      <h1 style={{
        color: '#ffffff',
        fontSize: 'clamp(26px, 4vw, 38px)',
        fontWeight: '900',
        margin: '0 0 12px 0',
        lineHeight: '1.2'
      }}>
        Terms & Conditions
      </h1>

      <p style={{
        color: '#94a3b8',
        fontSize: 'clamp(13px, 2vw, 15px)',
        maxWidth: '650px',
        margin: '0 auto',
        lineHeight: '1.6'
      }}>
        Please read our official academy policies, enrollment conditions, and code of conduct carefully before applying.
      </p>
    </div>

    {/* Content Card Container */}
    <div style={{
      background: '#ffffff',
      borderRadius: '20px',
      padding: 'clamp(20px, 4vw, 40px)',
      border: '1px solid #e2e8f0',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)'
    }}>
      
      {/* Clause 1 */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#0f172a', fontSize: '18px', fontWeight: '800', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(37, 99, 235, 0.1)', color: '#2563eb', display: 'grid', placeItems: 'center', fontSize: '14px', flexShrink: 0 }}>1</span>
          Admission & Enrollment Policy
        </h3>
        <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.7', margin: 0, paddingLeft: '38px' }}>
          All admissions are granted subject to seat availability, successful clearance of the entry assessment, and verification of required documents. Submission of an online form does not guarantee immediate admission.
        </p>
      </div>

      {/* Clause 2 */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#0f172a', fontSize: '18px', fontWeight: '800', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(37, 99, 235, 0.1)', color: '#2563eb', display: 'grid', placeItems: 'center', fontSize: '14px', flexShrink: 0 }}>2</span>
          Fee Payment & Refund Terms
        </h3>
        <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.7', margin: 0, paddingLeft: '38px' }}>
          Monthly tuition fees must be deposited on or before the 10th of each month. One-time admission fees are strictly non-refundable once enrollment is confirmed. Late fee surcharges apply after the due date.
        </p>
      </div>

      {/* Clause 3 */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#0f172a', fontSize: '18px', fontWeight: '800', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(37, 99, 235, 0.1)', color: '#2563eb', display: 'grid', placeItems: 'center', fontSize: '14px', flexShrink: 0 }}>3</span>
          Code of Discipline & Attendance
        </h3>
        <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.7', margin: 0, paddingLeft: '38px' }}>
          Students are expected to maintain at least 85% attendance and adhere strictly to the school dress code and behavioral discipline. Continuous absence without prior written notice may result in cancellation of admission.
        </p>
      </div>

      {/* Clause 4 */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#0f172a', fontSize: '18px', fontWeight: '800', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(37, 99, 235, 0.1)', color: '#2563eb', display: 'grid', placeItems: 'center', fontSize: '14px', flexShrink: 0 }}>4</span>
          Use of Website Content & IP
        </h3>
        <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.7', margin: 0, paddingLeft: '38px' }}>
          All graphics, logos, text material, and curriculum details published on this website are the intellectual property of <strong>The Knowledge Hub Academy</strong>. Unauthorized reproduction or commercial use is prohibited.
        </p>
      </div>

      {/* Clause 5 */}
      <div style={{ marginBottom: '10px' }}>
        <h3 style={{ color: '#0f172a', fontSize: '18px', fontWeight: '800', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(37, 99, 235, 0.1)', color: '#2563eb', display: 'grid', placeItems: 'center', fontSize: '14px', flexShrink: 0 }}>5</span>
          Policy Modifications
        </h3>
        <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.7', margin: 0, paddingLeft: '38px' }}>
          The school management reserves the right to revise or update these terms, fee structures, or code of conduct guidelines at any time to align with administrative standards or educational regulations.
        </p>
      </div>

    </div>
  </section>
)}
        {activeSection === 'apply' && (
          <section
            style={{
              maxWidth: '920px',
              margin: '60px auto',
              padding: '0 20px',
              fontFamily: "'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif"
            }}
          >
            {/* Ultra Premium Top Header Banner */}
            <div
              style={{
                background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #1e1b4b 100%)',
                borderRadius: '32px 32px 20px 20px',
                padding: '50px 40px',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 20px 50px rgba(15, 23, 42, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              {/* Background Decorative Glow Blobs */}
              <div style={{ position: 'absolute', top: '-50%', left: '-20%', width: '300px', height: '300px', background: 'rgba(37, 99, 235, 0.3)', filter: 'blur(80px)', borderRadius: '50%', pointerEvents: 'none' }}></div>
              <div style={{ position: 'absolute', bottom: '-50%', right: '-20%', width: '300px', height: '300px', background: 'rgba(168, 85, 247, 0.25)', filter: 'blur(80px)', borderRadius: '50%', pointerEvents: 'none' }}></div>

              {/* Header Tag / Badge */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.2)', padding: '8px 20px', borderRadius: '40px', marginBottom: '20px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#38bdf8', boxShadow: '0 0 10px #38bdf8' }}></span>
                <span style={{ color: '#f8fafc', fontSize: '13px', fontWeight: '800', letterSpacing: '1.5px', textTransform: 'uppercase' }}>Academic Session 2026-27</span>
              </div>

              <h1 style={{ color: '#ffffff', fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: '900', margin: '0 0 12px 0', letterSpacing: '-1px', lineHeight: '1.2' }}>
                Online Student Admission
              </h1>
              <p style={{ color: '#94a3b8', fontSize: '16px', maxWidth: '600px', margin: '0 auto 25px auto', lineHeight: '1.6', fontWeight: '500' }}>
                The Knowledge Hub Academy mein apna bright future secure karein. Neeche diye gaye form ko dhyan se fill karein.
              </p>

              {/* Form Progress Step Indicator */}
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', maxWidth: '400px', margin: '0 auto', background: 'rgba(255,255,255,0.05)', padding: '10px 20px', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38bdf8', fontWeight: '700', fontSize: '13px' }}>
                  <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#38bdf8', color: '#0f172a', display: 'grid', placeItems: 'center', fontSize: '12px', fontWeight: '900' }}>1</span>
                  Details
                </div>
                <div style={{ width: '40px', height: '2px', background: 'rgba(255,255,255,0.2)' }}></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', fontWeight: '600', fontSize: '13px' }}>
                  <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', color: '#fff', display: 'grid', placeItems: 'center', fontSize: '12px', fontWeight: '700' }}>2</span>
                  Submission
                </div>
              </div>
            </div>

            {/* Form Container Card */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderRadius: '0 0 32px 32px',
                padding: '50px 40px',
                border: '1px solid rgba(255, 255, 255, 0.8)',
                borderTop: 'none',
                boxShadow: '0 30px 60px -12px rgba(15, 23, 42, 0.12)'
              }}
            >
              {isFormSubmitted ? (
                /* Success Thank You Card */
                <div
                  style={{
                    padding: '50px 30px',
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                    borderRadius: '24px',
                    border: '1px solid #86efac',
                    boxShadow: '0 15px 30px rgba(34, 197, 94, 0.12)'
                  }}
                >
                  <div style={{ width: '80px', height: '80px', background: '#22c55e', color: '#fff', borderRadius: '50%', display: 'grid', placeItems: 'center', fontSize: '40px', margin: '0 auto 20px auto', boxShadow: '0 10px 25px rgba(34, 197, 94, 0.4)' }}>
                    ✓
                  </div>
                  <h2 style={{ color: '#14532d', fontSize: '32px', fontWeight: '900', margin: '0 0 12px 0' }}>Application Submitted!</h2>
                  <p style={{ color: '#166534', fontSize: '17px', margin: '0 auto 30px auto', maxWidth: '550px', lineHeight: '1.7' }}>
                    Shukriya! Aapka admission form **The Knowledge Hub Academy** ko receive ho gaya hai. Humari admission team confirmation ke liye jald aap se contact karegi.
                  </p>
                  <button
                    onClick={() => { setIsFormSubmitted(false); setActiveSection('home'); }}
                    style={{
                      padding: '16px 36px',
                      background: 'linear-gradient(135deg, #15803d 0%, #166534 100%)',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '14px',
                      cursor: 'pointer',
                      fontWeight: '800',
                      fontSize: '15px',
                      boxShadow: '0 10px 20px rgba(22, 101, 52, 0.3)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Return To Home
                  </button>
                </div>
              ) : (
                /* Form Inputs Grid */
                <form onSubmit={handleFormSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>

                  {/* Student Name */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '800', color: '#1e293b', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                      Student Full Name <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="Student_Name"
                      required
                      placeholder="e.g. Muhammad Ali"
                      style={{
                        width: '100%',
                        padding: '16px 20px',
                        borderRadius: '14px',
                        border: '1.5px solid #e2e8f0',
                        background: '#f8fafc',
                        fontSize: '15px',
                        fontWeight: '600',
                        color: '#0f172a',
                        outline: 'none',
                        boxSizing: 'border-box',
                        transition: 'all 0.3s ease'
                      }}
                    />
                  </div>

                  {/* Father Name */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '800', color: '#1e293b', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                      Father / Guardian Name <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="Father_Name"
                      required
                      placeholder="e.g. Tariq Mehmood"
                      style={{
                        width: '100%',
                        padding: '16px 20px',
                        borderRadius: '14px',
                        border: '1.5px solid #e2e8f0',
                        background: '#f8fafc',
                        fontSize: '15px',
                        fontWeight: '600',
                        color: '#0f172a',
                        outline: 'none',
                        boxSizing: 'border-box',
                        transition: 'all 0.3s ease'
                      }}
                    />
                  </div>

                  {/* Age / DOB */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '800', color: '#1e293b', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                      Age / Date of Birth <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="Student_Age_DOB"
                      required
                      placeholder="e.g. 7 Years / 15-08-2019"
                      style={{
                        width: '100%',
                        padding: '16px 20px',
                        borderRadius: '14px',
                        border: '1.5px solid #e2e8f0',
                        background: '#f8fafc',
                        fontSize: '15px',
                        fontWeight: '600',
                        color: '#0f172a',
                        outline: 'none',
                        boxSizing: 'border-box',
                        transition: 'all 0.3s ease'
                      }}
                    />
                  </div>

                  {/* Gender Select */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '800', color: '#1e293b', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                      Gender <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <select
                      name="Gender"
                      required
                      style={{
                        width: '100%',
                        padding: '16px 20px',
                        borderRadius: '14px',
                        border: '1.5px solid #e2e8f0',
                        background: '#f8fafc',
                        fontSize: '15px',
                        fontWeight: '600',
                        color: '#0f172a',
                        outline: 'none',
                        boxSizing: 'border-box',
                        cursor: 'pointer'
                      }}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>

                  {/* Applying For Class Select */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '800', color: '#1e293b', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                      Applying For Class <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <select
                      name="Applying_Class"
                      required
                      style={{
                        width: '100%',
                        padding: '16px 20px',
                        borderRadius: '14px',
                        border: '1.5px solid #e2e8f0',
                        background: '#f8fafc',
                        fontSize: '15px',
                        fontWeight: '600',
                        color: '#0f172a',
                        outline: 'none',
                        boxSizing: 'border-box',
                        cursor: 'pointer'
                      }}
                    >
                      <option value="">Select Target Class</option>
                      <option value="Montessori / Playgroup">Montessori / Playgroup</option>
                      <option value="Nursery / KG">Nursery / KG</option>
                      <option value="Primary (Class 1-5)">Primary (Class 1 - 5)</option>
                      <option value="Middle (Class 6-8)">Middle (Class 6 - 8)</option>
                      <option value="Matriculation (Class 9-10)">Matriculation (9th/10th)</option>
                    </select>
                  </div>

                  {/* Phone / WhatsApp */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '800', color: '#1e293b', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                      Contact Number / WhatsApp <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <input
                      type="tel"
                      name="Contact_Number"
                      required
                      placeholder="e.g. 0300 1234567"
                      style={{
                        width: '100%',
                        padding: '16px 20px',
                        borderRadius: '14px',
                        border: '1.5px solid #e2e8f0',
                        background: '#f8fafc',
                        fontSize: '15px',
                        fontWeight: '600',
                        color: '#0f172a',
                        outline: 'none',
                        boxSizing: 'border-box',
                        transition: 'all 0.3s ease'
                      }}
                    />
                  </div>

                  {/* Previous School */}
                  <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '800', color: '#1e293b', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                      Previous School Name (If Any)
                    </label>
                    <input
                      type="text"
                      name="Previous_School"
                      placeholder="e.g. Army Public School / St. Joseph"
                      style={{
                        width: '100%',
                        padding: '16px 20px',
                        borderRadius: '14px',
                        border: '1.5px solid #e2e8f0',
                        background: '#f8fafc',
                        fontSize: '15px',
                        fontWeight: '600',
                        color: '#0f172a',
                        outline: 'none',
                        boxSizing: 'border-box',
                        transition: 'all 0.3s ease'
                      }}
                    />
                  </div>

                  {/* Residential Address */}
                  <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '800', color: '#1e293b', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                      Residential Address <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <textarea
                      name="Address"
                      rows="3"
                      required
                      placeholder="Complete House Address, Block/Sector, City"
                      style={{
                        width: '100%',
                        padding: '16px 20px',
                        borderRadius: '14px',
                        border: '1.5px solid #e2e8f0',
                        background: '#f8fafc',
                        fontSize: '15px',
                        fontWeight: '600',
                        color: '#0f172a',
                        outline: 'none',
                        boxSizing: 'border-box',
                        resize: 'vertical'
                      }}
                    ></textarea>
                  </div>

                  {/* Premium Submit Button Banner */}
                  <div style={{ gridColumn: 'span 2', marginTop: '10px' }}>
                    <button
                      type="submit"
                      style={{
                        width: '100%',
                        padding: '18px 30px',
                        background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 50%, #1e40af 100%)',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '16px',
                        fontSize: '17px',
                        fontWeight: '800',
                        cursor: 'pointer',
                        letterSpacing: '0.5px',
                        boxShadow: '0 12px 25px rgba(37, 99, 235, 0.35)',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px'
                      }}
                    >
                      <span>Submit Admission Form</span>
                      <span style={{ fontSize: '20px' }}>→</span>
                    </button>
                    <p style={{ textAlign: 'center', margin: '15px 0 0 0', color: '#64748b', fontSize: '13px', fontWeight: '500' }}>
                      🔒 Aapka data 100% secure hai aur sirf admission verification ke liye use hoga.
                    </p>
                  </div>

                </form>
              )}
            </div>
          </section>
        )}
        {activeSection === 'programs' && (
  <section
    className="programs-page"
    style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: 'clamp(20px, 5vw, 40px) clamp(12px, 3vw, 20px)',
      fontFamily: "'Inter', 'Segoe UI', Roboto, sans-serif",
      color: '#1a1a1a',
      backgroundColor: '#ffffff',
      boxSizing: 'border-box',
      width: '100%'
    }}
  >
    {/* 1. Main Page Heading (Centered & Premium Styled) */}
    <div style={{ textAlign: 'center', marginBottom: 'clamp(25px, 5vw, 40px)' }}>
      <h2 style={{
        color: '#0f172a',
        fontSize: 'clamp(22px, 5vw, 36px)',
        fontWeight: '800',
        letterSpacing: '-0.5px',
        margin: '0 0 12px 0',
        lineHeight: '1.25'
      }}>
        Academic Programs & Educational Excellence
      </h2>
      <p style={{
        color: '#475569',
        fontSize: 'clamp(13px, 2vw, 18px)',
        maxWidth: '800px',
        margin: '0 auto',
        lineHeight: '1.6'
      }}>
        Empowering students with a future-ready curriculum from Montessori to Matriculation. We cultivate critical thinking, character building, and academic success in a supportive learning environment.
      </p>
      <div style={{
        width: '70px',
        height: '4px',
        backgroundColor: '#2563eb',
        margin: '16px auto 0 auto',
        borderRadius: '2px'
      }}></div>
    </div>

    {/* 2. Comprehensive Subjects & Curriculum Table */}
    <div style={{
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)',
      border: '1px solid #e2e8f0',
      overflow: 'hidden',
      marginBottom: 'clamp(30px, 6vw, 50px)'
    }}>
      <div style={{ padding: 'clamp(12px, 3vw, 20px) clamp(16px, 4vw, 25px)', backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
        <h3 style={{ margin: 0, color: '#0f172a', fontSize: 'clamp(16px, 2.5vw, 20px)', fontWeight: '700' }}>
          Class-Wise Curriculum Breakdown
        </h3>
      </div>
      <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
        <table style={{ width: '100%', minWidth: '500px', color: '#0f172a', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#1e293b', color: '#ffffff' }}>
              <th style={{ padding: '12px 14px', fontSize: '13px', fontWeight: '600', width: '30%' }}>Class / Level</th>
              <th style={{ padding: '12px 14px', fontSize: '13px', fontWeight: '600', width: '70%' }}>Subjects Offered & Focus Areas</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: '#ffffff' }}>
              <td style={{ padding: '12px 14px', fontWeight: '700', color: '#1e293b', fontSize: '13px' }}>
                Montessori / Nursery / KG
              </td>
              <td style={{ padding: '12px 14px', lineHeight: '1.5', color: '#334155', fontSize: '12px' }}>
                English Phonics & Vocabulary, Urdu Alphabets & Conversation, Basic Mathematics & Logic, Early Science Exploration, Creative Arts & Crafts, Rhymes, Physical Motor Skill Activities.
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
              <td style={{ padding: '12px 14px', fontWeight: '700', color: '#1e293b', fontSize: '13px' }}>
                Primary Section (Class 1 to 5)
              </td>
              <td style={{ padding: '12px 14px', lineHeight: '1.5', color: '#334155', fontSize: '12px' }}>
                English Language & Literature, Urdu Language, Mathematics & Mental Math, General Science, Social Studies, Islamiat / Ethics, Computer Science & Digital Basics, Drawing & Creative Arts.
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: '#ffffff' }}>
              <td style={{ padding: '12px 14px', fontWeight: '700', color: '#1e293b', fontSize: '13px' }}>
                Middle Section (Class 6 to 8)
              </td>
              <td style={{ padding: '12px 14px', lineHeight: '1.5', color: '#334155', fontSize: '12px' }}>
                Advanced English Composition, Urdu Literature, General Mathematics & Algebra, General Science (Physics/Chemistry/Bio Fundamentals), History & Geography, Islamiat, Computer Applications & Coding Concepts.
              </td>
            </tr>
            <tr style={{ backgroundColor: '#f8fafc' }}>
              <td style={{ padding: '12px 14px', fontWeight: '700', color: '#1e293b', fontSize: '13px' }}>
                Matriculation (Class 9 & 10)
              </td>
              <td style={{ padding: '12px 14px', lineHeight: '1.5', color: '#334155', fontSize: '12px' }}>
                <strong>Science Group:</strong> English Normal & Compulsory, Urdu Compulsory, Mathematics, Physics, Chemistry, Biology OR Computer Science, Islamiat, Pakistan Studies, Practical Lab Training & Board Exam Prep.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    {/* 3. Why Choose Our Programs Grid */}
    <div style={{ marginBottom: 'clamp(30px, 6vw, 50px)' }}>
      <h3 style={{
        color: '#0f172a',
        fontSize: 'clamp(18px, 3vw, 24px)',
        fontWeight: '700',
        marginBottom: '16px',
        borderLeft: '4px solid #2563eb',
        paddingLeft: '12px'
      }}>
        Why Choose Our Academic Programs?
      </h3>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(200px, 100%, 250px), 1fr))',
        gap: 'clamp(12px, 3vw, 20px)'
      }}>
        <div style={{ padding: 'clamp(16px, 3.5vw, 24px)', borderRadius: '10px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', boxSizing: 'border-box' }}>
          <h4 style={{ margin: '0 0 8px 0', color: '#0f172a', fontSize: 'clamp(15px, 2.5vw, 18px)', fontWeight: '700' }}>Experienced Faculty</h4>
          <p style={{ margin: 0, fontSize: 'clamp(12px, 1.8vw, 14px)', color: '#475569', lineHeight: '1.6' }}>
            Highly qualified teachers delivering interactive, concept-based instruction to clear foundational concepts and encourage student curiosity.
          </p>
        </div>

        <div style={{ padding: 'clamp(16px, 3.5vw, 24px)', borderRadius: '10px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', boxSizing: 'border-box' }}>
          <h4 style={{ margin: '0 0 8px 0', color: '#0f172a', fontSize: 'clamp(15px, 2.5vw, 18px)', fontWeight: '700' }}>Modern Science Labs</h4>
          <p style={{ margin: 0, fontSize: 'clamp(12px, 1.8vw, 14px)', color: '#475569', lineHeight: '1.6' }}>
            Fully-equipped Biology, Physics, and Chemistry laboratories for hands-on experimentations specifically tailored for Matric students.
          </p>
        </div>

        <div style={{ padding: 'clamp(16px, 3.5vw, 24px)', borderRadius: '10px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', boxSizing: 'border-box' }}>
          <h4 style={{ margin: '0 0 8px 0', color: '#0f172a', fontSize: 'clamp(15px, 2.5vw, 18px)', fontWeight: '700' }}>Computer & IT Skills</h4>
          <p style={{ margin: 0, fontSize: 'clamp(12px, 1.8vw, 14px)', color: '#475569', lineHeight: '1.6' }}>
            Modern computer labs equipped with high-speed internet ensuring digital literacy, office tools, and introductory coding exposure.
          </p>
        </div>

        <div style={{ padding: 'clamp(16px, 3.5vw, 24px)', borderRadius: '10px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', boxSizing: 'border-box' }}>
          <h4 style={{ margin: '0 0 8px 0', color: '#0f172a', fontSize: 'clamp(15px, 2.5vw, 18px)', fontWeight: '700' }}>Co-Curricular Growth</h4>
          <p style={{ margin: 0, fontSize: 'clamp(12px, 1.8vw, 14px)', color: '#475569', lineHeight: '1.6' }}>
            Sports tournaments, debates, quiz competitions, and educational field trips designed to nurture public speaking and teamwork skills.
          </p>
        </div>
      </div>
    </div>

    {/* 4. Teaching Methodology Section */}
    <div style={{ marginBottom: 'clamp(30px, 6vw, 50px)', padding: 'clamp(16px, 4vw, 30px)', borderRadius: '12px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', boxSizing: 'border-box' }}>
      <h3 style={{ color: '#0f172a', fontSize: 'clamp(18px, 3vw, 24px)', fontWeight: '700', marginBottom: '12px' }}>
        Our Modern Teaching Methodology
      </h3>
      <p style={{ color: '#334155', lineHeight: '1.6', fontSize: 'clamp(12px, 1.8vw, 15px)', marginBottom: '16px' }}>
        At The Knowledge Hub Academy, we move beyond conventional rote-memorization (ratta system) to embrace interactive, conceptual, and inquiry-based learning techniques.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(200px, 100%, 260px), 1fr))', gap: 'clamp(12px, 3vw, 20px)' }}>
        <div style={{ backgroundColor: '#ffffff', padding: 'clamp(14px, 3vw, 20px)', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}>
          <h5 style={{ margin: '0 0 6px 0', fontSize: '14px', color: '#0f172a', fontWeight: '700' }}>Activity-Based Learning</h5>
          <p style={{ margin: 0, fontSize: '12px', color: '#475569', lineHeight: '1.5' }}>
            Montessori kits, visual smartboards, and physical manipulatives keep young learners actively engaged in foundational concepts.
          </p>
        </div>

        <div style={{ backgroundColor: '#ffffff', padding: 'clamp(14px, 3vw, 20px)', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}>
          <h5 style={{ margin: '0 0 6px 0', fontSize: '14px', color: '#0f172a', fontWeight: '700' }}>STEM Integration</h5>
          <p style={{ margin: 0, fontSize: '12px', color: '#475569', lineHeight: '1.5' }}>
            Practical application of Science, Technology, Engineering, and Math in everyday problem-solving scenarios.
          </p>
        </div>

        <div style={{ backgroundColor: '#ffffff', padding: 'clamp(14px, 3vw, 20px)', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}>
          <h5 style={{ margin: '0 0 6px 0', fontSize: '14px', color: '#0f172a', fontWeight: '700' }}>Board Exam Preparation</h5>
          <p style={{ margin: 0, fontSize: '12px', color: '#475569', lineHeight: '1.5' }}>
            Focused guidance, past paper revision drills, and time management strategies specifically designed for Metric board candidates.
          </p>
        </div>
      </div>
    </div>

    {/* 5. Assessment & Evaluation Section */}
    <div style={{ marginBottom: 'clamp(30px, 6vw, 50px)' }}>
      <h3 style={{ color: '#0f172a', fontSize: 'clamp(18px, 3vw, 24px)', fontWeight: '700', marginBottom: '16px', borderLeft: '4px solid #2563eb', paddingLeft: '12px' }}>
        Continuous Assessment & Student Progress
      </h3>
      <p style={{ color: '#475569', lineHeight: '1.6', fontSize: 'clamp(12px, 1.8vw, 15px)', marginBottom: '16px' }}>
        We monitor each student's progress closely through structured evaluation frameworks that ensure steady academic advancement throughout the year.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(130px, 45%, 220px), 1fr))', gap: 'clamp(10px, 2.5vw, 15px)' }}>
        <div style={{ padding: 'clamp(12px, 3vw, 20px)', backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', boxSizing: 'border-box' }}>
          <h4 style={{ margin: '0 0 6px 0', color: '#0f172a', fontSize: '14px', fontWeight: '700' }}>Monthly Tests</h4>
          <p style={{ margin: 0, fontSize: '12px', color: '#64748b', lineHeight: '1.4' }}>Short regular quizzes to ensure students keep up with classroom learning without stress.</p>
        </div>

        <div style={{ padding: 'clamp(12px, 3vw, 20px)', backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', boxSizing: 'border-box' }}>
          <h4 style={{ margin: '0 0 6px 0', color: '#0f172a', fontSize: '14px', fontWeight: '700' }}>Term Examinations</h4>
          <p style={{ margin: 0, fontSize: '12px', color: '#64748b', lineHeight: '1.4' }}>Mid-term and final examinations to assess comprehensive mastery over syllabus topics.</p>
        </div>

        <div style={{ padding: 'clamp(12px, 3vw, 20px)', backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', boxSizing: 'border-box' }}>
          <h4 style={{ margin: '0 0 6px 0', color: '#0f172a', fontSize: '14px', fontWeight: '700' }}>Mock Board Exams</h4>
          <p style={{ margin: 0, fontSize: '12px', color: '#64748b', lineHeight: '1.4' }}>Replicated board examination environment for Class 9 and 10 to build confidence.</p>
        </div>

        <div style={{ padding: 'clamp(12px, 3vw, 20px)', backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', boxSizing: 'border-box' }}>
          <h4 style={{ margin: '0 0 6px 0', color: '#0f172a', fontSize: '14px', fontWeight: '700' }}>Personalized Feedback</h4>
          <p style={{ margin: 0, fontSize: '12px', color: '#64748b', lineHeight: '1.4' }}>Detailed performance reports highlighting strengths and areas for improvement.</p>
        </div>
      </div>
    </div>

    {/* 6. Parent-Teacher Partnership */}
    <div style={{ marginBottom: 'clamp(30px, 6vw, 50px)', padding: 'clamp(16px, 3.5vw, 25px)', backgroundColor: '#f1f5f9', borderRadius: '10px', borderLeft: '5px solid #0f172a', boxSizing: 'border-box' }}>
      <h3 style={{ margin: '0 0 8px 0', color: '#0f172a', fontSize: 'clamp(17px, 3vw, 22px)', fontWeight: '700' }}>
        Parent-Teacher Collaboration
      </h3>
      <p style={{ margin: 0, color: '#334155', lineHeight: '1.6', fontSize: 'clamp(12px, 1.8vw, 15px)' }}>
        We strongly believe that a child's success depends on open collaboration between parents and educators. Regular <strong>Parent-Teacher Meetings (PTMs)</strong> are conducted following every major evaluation to discuss student progress, behavioral development, and customized learning support.
      </p>
    </div>

    {/* 7. Call To Action (CTA) Banner */}
    <div style={{
      padding: 'clamp(20px, 4vw, 35px) clamp(14px, 3vw, 30px)',
      borderRadius: '12px',
      backgroundColor: '#0f172a',
      color: '#ffffff',
      textAlign: 'center',
      boxShadow: '0 10px 15px -3px rgba(15, 23, 42, 0.3)',
      boxSizing: 'border-box'
    }}>
      <h3 style={{ margin: '0 0 10px 0', fontSize: 'clamp(18px, 4vw, 26px)', fontWeight: '700', color: '#ffffff', lineHeight: '1.3' }}>
        Ready to Join The Knowledge Hub Academy?
      </h3>
      <p style={{ margin: '0 0 20px 0', color: '#94a3b8', fontSize: 'clamp(12px, 2vw, 16px)', maxWidth: '650px', marginLeft: 'auto', marginRight: 'auto', lineHeight: '1.5' }}>
        Admissions are officially open for the upcoming academic session. Secure your child's educational journey with quality instruction and modern learning values.
      </p>
      <button
        onClick={() => {
          setActiveSection('admission');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        style={{
          padding: '10px 20px',
          backgroundColor: '#2563eb',
          color: '#ffffff',
          border: 'none',
          borderRadius: '6px',
          fontSize: 'clamp(13px, 2vw, 16px)',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'all 0.2s ease-in-out',
          maxWidth: '100%'
        }}
      >
        View Admission Criteria & Apply
      </button>
    </div>
  </section>
)}

        {activeSection === 'admission' && (
  <section
    className="admission-page"
    style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: 'clamp(20px, 5vw, 40px) clamp(12px, 3vw, 20px)',
      fontFamily: "'Inter', 'Segoe UI', Roboto, sans-serif",
      color: '#1a1a1a',
      backgroundColor: '#ffffff',
      boxSizing: 'border-box',
      width: '100%'
    }}
  >
    {/* 1. Main Page Heading (Centered & Premium Styled) */}
    <div style={{ textAlign: 'center', marginBottom: 'clamp(25px, 5vw, 40px)' }}>
      <h2 style={{
        color: '#0f172a',
        fontSize: 'clamp(22px, 5vw, 36px)',
        fontWeight: '800',
        letterSpacing: '-0.5px',
        margin: '0 0 12px 0',
        lineHeight: '1.25'
      }}>
        Admission Criteria & Enrollment Guidelines
      </h2>
      <p style={{
        color: '#475569',
        fontSize: 'clamp(13px, 2vw, 18px)',
        maxWidth: '800px',
        margin: '0 auto',
        lineHeight: '1.6'
      }}>
        Welcome to The Knowledge Hub Academy admission portal. We aim to select students based on academic capability, readiness, and age suitability for a holistic learning environment.
      </p>
      <div style={{
        width: '70px',
        height: '4px',
        backgroundColor: '#2563eb',
        margin: '16px auto 0 auto',
        borderRadius: '2px'
      }}></div>
    </div>

    {/* 2. Admission Criteria Table */}
    <div style={{
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)',
      border: '1px solid #e2e8f0',
      overflow: 'hidden',
      marginBottom: 'clamp(30px, 6vw, 50px)'
    }}>
      <div style={{ padding: 'clamp(12px, 3vw, 20px) clamp(16px, 4vw, 25px)', backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
        <h3 style={{ margin: 0, color: '#0f172a', fontSize: 'clamp(16px, 2.5vw, 20px)', fontWeight: '700' }}>
          Eligibility & Age Requirements
        </h3>
      </div>
      <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
        <table style={{ width: '100%', minWidth: '550px', color: '#0f172a', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#1e293b', color: '#ffffff' }}>
              <th style={{ padding: '12px 14px', fontSize: '13px', fontWeight: '600', width: '25%' }}>Class / Level</th>
              <th style={{ padding: '12px 14px', fontSize: '13px', fontWeight: '600', width: '20%' }}>Age Limit</th>
              <th style={{ padding: '12px 14px', fontSize: '13px', fontWeight: '600', width: '55%' }}>Eligibility & Admission Requirements</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: '#ffffff' }}>
              <td style={{ padding: '12px 14px', fontWeight: '700', color: '#1e293b', fontSize: '13px' }}>Montessori / Playgroup</td>
              <td style={{ padding: '12px 14px', color: '#2563eb', fontWeight: '600', fontSize: '13px' }}>2.5 – 3.5 Years</td>
              <td style={{ padding: '12px 14px', lineHeight: '1.5', color: '#334155', fontSize: '12px' }}>
                Basic oral interaction & parent interview. No formal written test required.
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
              <td style={{ padding: '12px 14px', fontWeight: '700', color: '#1e293b', fontSize: '13px' }}>Nursery & KG</td>
              <td style={{ padding: '12px 14px', color: '#2563eb', fontWeight: '600', fontSize: '13px' }}>3.5 – 5.5 Years</td>
              <td style={{ padding: '12px 14px', lineHeight: '1.5', color: '#334155', fontSize: '12px' }}>
                Basic recognition test for English alphabets, Urdu letters, and numbers.
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: '#ffffff' }}>
              <td style={{ padding: '12px 14px', fontWeight: '700', color: '#1e293b', fontSize: '13px' }}>Primary (Class 1 to 5)</td>
              <td style={{ padding: '12px 14px', color: '#2563eb', fontWeight: '600', fontSize: '13px' }}>5.5 – 10.5 Years</td>
              <td style={{ padding: '12px 14px', lineHeight: '1.5', color: '#334155', fontSize: '12px' }}>
                Entry test in English, Mathematics, and Urdu based on previous class curriculum. Result card/SLC from previous school required.
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
              <td style={{ padding: '12px 14px', fontWeight: '700', color: '#1e293b', fontSize: '13px' }}>Middle (Class 6 to 8)</td>
              <td style={{ padding: '12px 14px', color: '#2563eb', fontWeight: '600', fontSize: '13px' }}>10.5 – 13.5 Years</td>
              <td style={{ padding: '12px 14px', lineHeight: '1.5', color: '#334155', fontSize: '12px' }}>
                Written admission test in English, Science, and Mathematics followed by student interview. Previous school clearance certificate is mandatory.
              </td>
            </tr>
            <tr style={{ backgroundColor: '#ffffff' }}>
              <td style={{ padding: '12px 14px', fontWeight: '700', color: '#1e293b', fontSize: '13px' }}>Matriculation (Class 9 & 10)</td>
              <td style={{ padding: '12px 14px', color: '#2563eb', fontWeight: '600', fontSize: '13px' }}>13.5+ Years</td>
              <td style={{ padding: '12px 14px', lineHeight: '1.5', color: '#334155', fontSize: '12px' }}>
                Minimum 65% marks in Class 8th/9th internal exams. Comprehensive test in English, Mathematics, and Science subjects.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    {/* 3. Step-by-Step Admission Process */}
    <div style={{ marginBottom: 'clamp(30px, 6vw, 50px)' }}>
      <h3 style={{
        color: '#0f172a',
        fontSize: 'clamp(18px, 3vw, 24px)',
        fontWeight: '700',
        marginBottom: '16px',
        borderLeft: '4px solid #2563eb',
        paddingLeft: '12px'
      }}>
        Step-by-Step Admission Process
      </h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(200px, 100%, 240px), 1fr))',
        gap: 'clamp(12px, 3vw, 20px)'
      }}>
        <div style={{ padding: 'clamp(16px, 3.5vw, 24px)', borderRadius: '10px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', boxSizing: 'border-box' }}>
          <div style={{ width: '32px', height: '32px', backgroundColor: '#dbeafe', color: '#2563eb', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', marginBottom: '10px', fontSize: '14px' }}>1</div>
          <h4 style={{ margin: '0 0 8px 0', color: '#0f172a', fontSize: 'clamp(15px, 2.5vw, 18px)', fontWeight: '700' }}>Application Form</h4>
          <p style={{ margin: 0, fontSize: 'clamp(12px, 1.8vw, 14px)', color: '#475569', lineHeight: '1.6' }}>
            Collect the admission form from the school office or fill it online via the 'Apply Now' button.
          </p>
        </div>

        <div style={{ padding: 'clamp(16px, 3.5vw, 24px)', borderRadius: '10px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', boxSizing: 'border-box' }}>
          <div style={{ width: '32px', height: '32px', backgroundColor: '#dbeafe', color: '#2563eb', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', marginBottom: '10px', fontSize: '14px' }}>2</div>
          <h4 style={{ margin: '0 0 8px 0', color: '#0f172a', fontSize: 'clamp(15px, 2.5vw, 18px)', fontWeight: '700' }}>Entry Assessment</h4>
          <p style={{ margin: 0, fontSize: 'clamp(12px, 1.8vw, 14px)', color: '#475569', lineHeight: '1.6' }}>
            Appear for the written evaluation test and informal student/parent interaction session.
          </p>
        </div>

        <div style={{ padding: 'clamp(16px, 3.5vw, 24px)', borderRadius: '10px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', boxSizing: 'border-box' }}>
          <div style={{ width: '32px', height: '32px', backgroundColor: '#dbeafe', color: '#2563eb', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', marginBottom: '10px', fontSize: '14px' }}>3</div>
          <h4 style={{ margin: '0 0 8px 0', color: '#0f172a', fontSize: 'clamp(15px, 2.5vw, 18px)', fontWeight: '700' }}>Document Verification</h4>
          <p style={{ margin: 0, fontSize: 'clamp(12px, 1.8vw, 14px)', color: '#475569', lineHeight: '1.6' }}>
            Submit required documents (Form-B, Photographs, Previous Result Cards) to the administration.
          </p>
        </div>

        <div style={{ padding: 'clamp(16px, 3.5vw, 24px)', borderRadius: '10px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', boxSizing: 'border-box' }}>
          <div style={{ width: '32px', height: '32px', backgroundColor: '#dbeafe', color: '#2563eb', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', marginBottom: '10px', fontSize: '14px' }}>4</div>
          <h4 style={{ margin: '0 0 8px 0', color: '#0f172a', fontSize: 'clamp(15px, 2.5vw, 18px)', fontWeight: '700' }}>Fee Submission</h4>
          <p style={{ margin: 0, fontSize: 'clamp(12px, 1.8vw, 14px)', color: '#475569', lineHeight: '1.6' }}>
            Pay the admission & monthly fee at the designated bank branch to confirm enrollment.
          </p>
        </div>
      </div>
    </div>

    {/* 4. Required Documents Checklist */}
    <div style={{ marginBottom: 'clamp(30px, 6vw, 50px)', padding: 'clamp(16px, 4vw, 30px)', borderRadius: '12px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', boxSizing: 'border-box' }}>
      <h3 style={{ color: '#0f172a', fontSize: 'clamp(18px, 3vw, 24px)', fontWeight: '700', marginBottom: '12px' }}>
        Required Documents Checklist
      </h3>
      <ul style={{ color: '#334155', paddingLeft: '20px', lineHeight: '1.7', fontSize: 'clamp(12px, 1.8vw, 15px)', margin: 0 }}>
        <li style={{ marginBottom: '8px' }}>Attested copy of Student's Birth Certificate or Form-B (NADRA).</li>
        <li style={{ marginBottom: '8px' }}>Original School Leaving Certificate (SLC) from the previous institution (for Class 1 and above).</li>
        <li style={{ marginBottom: '8px' }}>Copy of Father's / Guardian's CNIC.</li>
        <li style={{ marginBottom: '8px' }}>4 passport-size recent photographs with blue background.</li>
        <li>Copies of previous academic progress report cards.</li>
      </ul>
    </div>

    {/* 5. Fee Structure & Guidelines */}
    <div style={{ marginBottom: 'clamp(30px, 6vw, 50px)' }}>
      <h3 style={{
        color: '#0f172a',
        fontSize: 'clamp(18px, 3vw, 24px)',
        fontWeight: '700',
        marginBottom: '16px',
        borderLeft: '4px solid #2563eb',
        paddingLeft: '12px'
      }}>
        Fee Structure Policy & Guidelines
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(130px, 45%, 220px), 1fr))', gap: 'clamp(10px, 2.5vw, 15px)' }}>
        <div style={{ padding: 'clamp(12px, 3vw, 20px)', backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', boxSizing: 'border-box' }}>
          <h4 style={{ margin: '0 0 6px 0', color: '#0f172a', fontSize: '14px', fontWeight: '700' }}>One-Time Admission Fee</h4>
          <p style={{ margin: 0, fontSize: '12px', color: '#64748b', lineHeight: '1.4' }}>Payable at the time of initial enrollment (Non-refundable).</p>
        </div>

        <div style={{ padding: 'clamp(12px, 3vw, 20px)', backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', boxSizing: 'border-box' }}>
          <h4 style={{ margin: '0 0 6px 0', color: '#0f172a', fontSize: '14px', fontWeight: '700' }}>Monthly Tuition Fee</h4>
          <p style={{ margin: 0, fontSize: '12px', color: '#64748b', lineHeight: '1.4' }}>Must be deposited on or before the 10th of every calendar month.</p>
        </div>

        <div style={{ padding: 'clamp(12px, 3vw, 20px)', backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', boxSizing: 'border-box' }}>
          <h4 style={{ margin: '0 0 6px 0', color: '#0f172a', fontSize: '14px', fontWeight: '700' }}>Sibling Discount</h4>
          <p style={{ margin: 0, fontSize: '12px', color: '#64748b', lineHeight: '1.4' }}>Special 15% fee waiver offered on tuition fees for second and third child.</p>
        </div>

        <div style={{ padding: 'clamp(12px, 3vw, 20px)', backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', boxSizing: 'border-box' }}>
          <h4 style={{ margin: '0 0 6px 0', color: '#0f172a', fontSize: '14px', fontWeight: '700' }}>Merit Scholarships</h4>
          <p style={{ margin: 0, fontSize: '12px', color: '#64748b', lineHeight: '1.4' }}>Up to 50% waiver on tuition fees for high performers entering Class 9th & 10th.</p>
        </div>
      </div>
    </div>

    {/* 6. Frequently Asked Questions */}
    <div style={{ marginBottom: 'clamp(30px, 6vw, 50px)' }}>
      <h3 style={{ color: '#0f172a', fontSize: 'clamp(18px, 3vw, 24px)', fontWeight: '700', marginBottom: '16px' }}>
        Frequently Asked Questions (FAQs)
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ padding: 'clamp(12px, 3vw, 20px)', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff', boxSizing: 'border-box' }}>
          <h4 style={{ margin: '0 0 6px 0', color: '#0f172a', fontSize: '14px', fontWeight: '700' }}>Q: Is mid-term transfer admission allowed?</h4>
          <p style={{ margin: 0, color: '#475569', fontSize: '12px', lineHeight: '1.5' }}>
            Yes, subject to seat availability and submission of a valid School Leaving Certificate from the previous recognized institution.
          </p>
        </div>

        <div style={{ padding: 'clamp(12px, 3vw, 20px)', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff', boxSizing: 'border-box' }}>
          <h4 style={{ margin: '0 0 6px 0', color: '#0f172a', fontSize: '14px', fontWeight: '700' }}>Q: What is the age relaxation limit?</h4>
          <p style={{ margin: 0, color: '#475569', fontSize: '12px', lineHeight: '1.5' }}>
            A maximum grace period of up to 6 months may be granted based on student assessment and academic background.
          </p>
        </div>

        <div style={{ padding: 'clamp(12px, 3vw, 20px)', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff', boxSizing: 'border-box' }}>
          <h4 style={{ margin: '0 0 6px 0', color: '#0f172a', fontSize: '14px', fontWeight: '700' }}>Q: Are uniforms and books available at the school campus?</h4>
          <p style={{ margin: 0, color: '#475569', fontSize: '12px', lineHeight: '1.5' }}>
            Books syllabus list and uniform specifications are provided during admission; purchase details are available at the front desk office.
          </p>
        </div>
      </div>
    </div>

    {/* 7. Contact & Helpdesk Banner */}
    <div style={{
      padding: 'clamp(18px, 4vw, 30px)',
      borderRadius: '12px',
      backgroundColor: '#0f172a',
      color: '#ffffff',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '16px',
      boxShadow: '0 10px 15px -3px rgba(15, 23, 42, 0.3)',
      boxSizing: 'border-box'
    }}>
      <div style={{ flex: '1 1 240px' }}>
        <h3 style={{ margin: '0 0 6px 0', fontSize: 'clamp(17px, 3vw, 22px)', fontWeight: '700', color: '#ffffff' }}>Need Help with Admissions?</h3>
        <p style={{ margin: 0, color: '#94a3b8', fontSize: 'clamp(12px, 1.8vw, 15px)', lineHeight: '1.4' }}>
          Our admission counselors are available Monday to Saturday from 8:00 AM to 2:00 PM to assist you.
        </p>
      </div>
      <div style={{ backgroundColor: '#1e293b', padding: '10px 16px', borderRadius: '8px', border: '1px solid #334155', flex: '1 1 auto', maxWidth: '100%', boxSizing: 'border-box' }}>
        <p style={{ margin: 0, fontWeight: '600', color: '#38bdf8', fontSize: 'clamp(13px, 2vw, 14px)' }}>
          Helpline: +92 336 2587880
        </p>
        <p style={{ margin: '4px 0 0 0', fontWeight: '500', color: '#cbd5e1', fontSize: 'clamp(11px, 1.8vw, 13px)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          Email: admissions@knowledgehub.edu.pk
        </p>
      </div>
    </div>
  </section>
)}
        {activeSection === 'gallery' && (() => {

          // 30 High-Quality Unsplash School-related Images
          const galleryData = [
            { id: 1, category: 'Campus', title: 'Main Campus Building', url: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=800&q=80' },
            { id: 2, category: 'Classroom', title: 'Interactive Learning Session', url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80' },
            { id: 3, category: 'Labs', title: 'Modern Computer Laboratory', url: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80' },
            { id: 4, category: 'Labs', title: 'Advanced Chemistry Experiment', url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80' },
            { id: 5, category: 'Sports', title: 'Annual Football Tournament', url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80' },
            { id: 6, category: 'Events', title: 'Annual Science & Art Exhibition', url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80' },
            { id: 7, category: 'Classroom', title: 'Montessori Play & Learn', url: 'https://images.unsplash.com/photo-1587691592057-2e02076046e7?auto=format&fit=crop&w=800&q=80' },
            { id: 8, category: 'Campus', title: 'Central Library & Reading Hall', url: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80' },
            { id: 9, category: 'Sports', title: 'Basketball Court & Training', url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80' },
            { id: 10, category: 'Events', title: 'Graduation Day Ceremony', url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80' },
            { id: 11, category: 'Classroom', title: 'STEM Robotics Workshop', url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80' },
            { id: 12, category: 'Labs', title: 'Physics Practical Demonstrations', url: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=800&q=80' },
            { id: 13, category: 'Campus', title: 'Green Outdoor Assembly Ground', url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80' },
            { id: 14, category: 'Sports', title: 'Inter-House Athletics Track', url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80' },
            { id: 15, category: 'Events', title: 'Cultural Performance Night', url: 'https://images.unsplash.com/photo-1469488865564-c2de10f69f96?auto=format&fit=crop&w=800&q=80' },
            { id: 16, category: 'Classroom', title: 'Junior Art & Painting Studio', url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80' },
            { id: 17, category: 'Labs', title: 'Digital Language & Audio Lab', url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80' },
            { id: 18, category: 'Campus', title: 'Student Recreational Courtyard', url: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&w=800&q=80' },
            { id: 19, category: 'Sports', title: 'Indoor Badminton & Table Tennis', url: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80' },
            { id: 20, category: 'Events', title: 'Speech & Debate Championship', url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80' },
            { id: 21, category: 'Classroom', title: 'Collaborative Group Study', url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80' },
            { id: 22, category: 'Labs', title: 'Biology Specimen Examination', url: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80' },
            { id: 23, category: 'Campus', title: 'Modern Auditorium Hall', url: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=800&q=80' },
            { id: 24, category: 'Sports', title: 'Martial Arts & Taekwondo', url: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=800&q=80' },
            { id: 25, category: 'Events', title: 'Parents Day & Award Gala', url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80' },
            { id: 26, category: 'Classroom', title: 'Early Reading Corner', url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80' },
            { id: 27, category: 'Labs', title: 'Coding & Web Design Class', url: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80' },
            { id: 28, category: 'Campus', title: 'Hygienic School Cafeteria', url: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?auto=format&fit=crop&w=800&q=80' },
            { id: 29, category: 'Sports', title: 'Cricket Training Nets', url: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80' },
            { id: 30, category: 'Events', title: 'Educational Field Trip', url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80' },
          ];

          const categories = ['All', 'Campus', 'Classroom', 'Labs', 'Sports', 'Events'];

          const filteredImages = selectedCategory === 'All'
            ? galleryData
            : galleryData.filter(img => img.category === selectedCategory);

          return (
            <section
              className="gallery-page"
              style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: 'clamp(20px, 4vw, 40px) clamp(12px, 3vw, 20px)',
                fontFamily: "'Inter', 'Segoe UI', Roboto, sans-serif"
              }}
            >
              {/* 1. Header Title (Centered) */}
              <div style={{
                textAlign: 'center',
                marginBottom: 'clamp(25px, 5vw, 35px)',
                padding: '0 10px',
                boxSizing: 'border-box'
              }}>
                <h2 style={{
                  color: '#0f172a',
                  fontSize: 'clamp(22px, 5vw, 36px)',
                  fontWeight: '800',
                  margin: '0 0 10px 0',
                  lineHeight: '1.25'
                }}>
                  Campus Life & Facilities Gallery
                </h2>
                <p style={{
                  color: '#475569',
                  fontSize: 'clamp(13px, 2vw, 18px)',
                  maxWidth: '750px',
                  margin: '0 auto',
                  lineHeight: '1.6'
                }}>
                  Explore moments from our modern classrooms, high-tech science labs, athletic activities, and vibrant annual celebrations.
                </p>
                <div style={{
                  width: '70px',
                  height: '4px',
                  backgroundColor: '#2563eb',
                  margin: '16px auto 0 auto',
                  borderRadius: '2px'
                }}></div>
              </div>

              {/* 2. Category Filter Buttons */}
              <div style={{
                display: 'flex',
                justify: 'center',
                gap: 'clamp(6px, 1.5vw, 10px)',
                flexWrap: 'wrap',
                marginBottom: 'clamp(20px, 4vw, 35px)',
                padding: '0 4px',
                boxSizing: 'border-box'
              }}>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    style={{
                      padding: 'clamp(6px, 1.5vw, 8px) clamp(12px, 2.5vw, 22px)',
                      borderRadius: '30px',
                      border: '1px solid #cbd5e1',
                      backgroundColor: selectedCategory === cat ? '#0f172a' : '#ffffff',
                      color: selectedCategory === cat ? '#ffffff' : '#334155',
                      fontWeight: '600',
                      fontSize: 'clamp(12px, 1.8vw, 14px)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* 3. Responsive Image Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(250px, 100%, 280px), 1fr))',
                gap: 'clamp(16px, 3vw, 24px)',
                boxSizing: 'border-box'
              }}>
                {filteredImages.map((img) => (
                  <div
                    key={img.id}
                    onClick={() => setActiveImage(img)}
                    style={{
                      borderRadius: '12px',
                      overflow: 'hidden',
                      backgroundColor: '#ffffff',
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                      cursor: 'pointer',
                      transition: 'transform 0.2s ease, boxShadow 0.2s ease',
                      boxSizing: 'border-box',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.05)';
                    }}
                  >
                    <div style={{ 
                      position: 'relative', 
                      width: '100%', 
                      aspectRatio: '4/3', 
                      backgroundColor: '#f1f5f9',
                      overflow: 'hidden' 
                    }}>
                      <img
                        src={img.url}
                        alt={img.title}
                        loading="lazy"
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'cover', 
                          display: 'block' 
                        }}
                      />
                      <span style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        backgroundColor: 'rgba(15, 23, 42, 0.8)',
                        color: '#fff',
                        fontSize: '11px',
                        fontWeight: '600',
                        padding: '4px 10px',
                        borderRadius: '12px',
                        backdropFilter: 'blur(4px)',
                        WebkitBackdropFilter: 'blur(4px)'
                      }}>
                        {img.category}
                      </span>
                    </div>
                    <div style={{ padding: 'clamp(12px, 2.5vw, 16px)', flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                      <h4 style={{ margin: 0, color: '#0f172a', fontSize: 'clamp(14px, 2vw, 15px)', fontWeight: '700', lineHeight: '1.3' }}>
                        {img.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>

              {/* 4. Fullscreen Modal Lightbox View */}
              {activeImage && (
                <div
                  onClick={() => setActiveImage(null)}
                  style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: 'rgba(15, 23, 42, 0.88)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 9999,
                    padding: 'clamp(12px, 3vw, 20px)',
                    boxSizing: 'border-box',
                    backdropFilter: 'blur(6px)'
                  }}
                >
                  <div
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      backgroundColor: '#ffffff',
                      borderRadius: '12px',
                      maxWidth: '850px',
                      width: '100%',
                      overflow: 'hidden',
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.3)',
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      maxHeight: '90vh'
                    }}
                  >
                    <button
                      onClick={() => setActiveImage(null)}
                      style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        backgroundColor: '#0f172a',
                        color: '#ffffff',
                        border: 'none',
                        width: '34px',
                        height: '34px',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 10,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                      }}
                    >
                      ✕
                    </button>
                    
                    <div style={{
                      width: '100%',
                      backgroundColor: '#0f172a',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      maxHeight: '70vh',
                      overflow: 'hidden'
                    }}>
                      <img
                        src={activeImage.url}
                        alt={activeImage.title}
                        style={{ 
                          width: '100%', 
                          maxHeight: '70vh', 
                          objectFit: 'contain', 
                          display: 'block' 
                        }}
                      />
                    </div>

                    <div style={{ padding: 'clamp(14px, 3vw, 20px)', backgroundColor: '#ffffff' }}>
                      <span style={{ fontSize: '12px', color: '#2563eb', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        {activeImage.category}
                      </span>
                      <h3 style={{ margin: '4px 0 0 0', color: '#0f172a', fontSize: 'clamp(16px, 3vw, 20px)', fontWeight: '700' }}>
                        {activeImage.title}
                      </h3>
                    </div>
                  </div>
                </div>
              )}
            </section>
          );
        })()}
      </main>

      {/* Footer */}
      <footer className="premium-dark-footer">

        {/* Ambient Top Glow */}
        <div className="footer-glow-bg"></div>

        <div className="footer-content-wrapper">

          {/* 1. TOP ROW: Premium Pill Navigation */}
          <div className="footer-nav-row">
            <a 
  href="#about" 
  onClick={(e) => { 
    e.preventDefault(); 
    setActiveSection('about'); 
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  }} 
  className="gold-pill-btn"
>
  About
</a>
            <a href="#contact" onClick={() => setActiveSection('admission')} className="gold-pill-btn">
              Contact Us
            </a>
            <a 
  href="#privacy" 
  onClick={(e) => { 
    e.preventDefault(); 
    setActiveSection('privacy'); 
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  }} 
  className="gold-pill-btn"
>
  Privacy Policy
</a>
            <a 
  href="#terms" 
  onClick={(e) => { 
    e.preventDefault(); 
    setActiveSection('terms'); 
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  }} 
  className="gold-pill-btn"
>
  Terms & Conditions
</a>
          </div>

          {/* Elegant Gold Divider */}
          <div style={{ width: '80px', height: '2px', background: 'linear-gradient(90deg, transparent, #fbbf24, transparent)', marginBottom: '2rem', borderRadius: '50%' }}></div>

          {/* 2. MIDDLE SECTION: Academy Info */}
          <div style={{ textAlign: 'center', maxWidth: '800px', width: '100%', marginBottom: '2.5rem' }}>

            {/* Premium Gradient Title */}
            <h2 className="academy-title">
              The Knowledge Hub Academy
            </h2>

            {/* Sophisticated Description */}
            <p className="academy-desc">
              Dedicated to cultivating intellectual brilliance, moral integrity, and modern leadership. We provide a transformative learning environment where students are empowered to shape the future with confidence.
            </p>

            {/* Modern Contact Buttons */}
            <div className="action-buttons-wrapper">
              <a href="https://wa.me/923362587880" target="_blank" rel="noreferrer" className="action-gold-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                Chat on WhatsApp
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="action-outline-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                </svg>
                Facebook
              </a>
            </div>
          </div>

          {/* 3. BOTTOM BAR: Copyright Line */}
          <div style={{ width: '100%', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <p style={{ margin: 0, color: '#64748b', fontSize: '0.82rem', fontWeight: '500', letterSpacing: '0.3px', textAlign: 'center' }}>
              Copyright © {new Date().getFullYear()} <span style={{ color: '#fbbf24', fontWeight: '700' }}>The Knowledge Hub Academy</span>. All Rights Reserved.
            </p>
          </div>

        </div>
        {/* ================= SLEEK & ELEGANT DEVELOPER FOOTER STRIP ================= */}
<div style={{
  width: '100%',
  marginTop: '24px',
  padding: '16px 20px',
  background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(24, 9, 43, 0.9) 100%)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  borderRadius: '20px',
  border: '1px solid rgba(168, 85, 247, 0.35)',
  boxShadow: '0 12px 40px rgba(0, 0, 0, 0.6), 0 0 25px rgba(168, 85, 247, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.15)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: '16px',
  boxSizing: 'border-box',
  fontFamily: "'Inter', system-ui, -apple-system, sans-serif"
}}>
  {/* Branding Section */}
  <div style={{ 
    display: 'flex', 
    alignItems: 'center', 
    gap: '12px',
    minWidth: '220px',
    flex: '1 1 auto'
  }}>
    {/* Ultra Glow Multi-layer Logo Wrapper */}
    <div style={{
      position: 'relative',
      width: '40px',
      height: '40px',
      display: 'grid',
      placeItems: 'center',
      flexShrink: 0
    }}>
      <div style={{
        position: 'absolute',
        inset: '-3px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #a855f7, #6366f1, #ec4899)',
        filter: 'blur(8px)',
        opacity: 0.85
      }} />
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)',
        padding: '2px',
        boxSizing: 'border-box'
      }}>
        <img 
          src="header.jpeg" 
          alt="Apex Code Logo"
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            objectFit: 'cover',
            display: 'block'
          }}
        />
      </div>
    </div>

    {/* Brand Titles */}
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <span style={{ 
        fontSize: '9px', 
        textTransform: 'uppercase', 
        color: '#94a3b8', 
        letterSpacing: '1.2px', 
        fontWeight: '700',
        lineHeight: '1.2'
      }}>
        Crafted & Developed By
      </span>
      <strong style={{
        color: '#ffffff',
        fontSize: '15px',
        letterSpacing: '1.2px',
        fontWeight: '900',
        background: 'linear-gradient(90deg, #ffffff 0%, #cbd5e1 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        filter: 'drop-shadow(0 0 10px rgba(168, 85, 247, 0.5))'
      }}>
        APEX CODE<span style={{ color: '#a855f7', WebkitTextFillColor: '#a855f7' }}>.</span>
      </strong>
    </div>
  </div>

  {/* Contact Info Responsive Grid / Flex Container */}
  <div style={{ 
    display: 'flex', 
    alignItems: 'center', 
    gap: '10px', 
    flexWrap: 'wrap',
    flex: '2 1 300px',
    justifyContent: 'flex-start'
  }}>
    
    {/* Website Link */}
    <a 
      href="https://www.bookapexcode.store" 
      target="_blank" 
      rel="noreferrer" 
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '8px 14px',
        borderRadius: '12px',
        background: 'rgba(168, 85, 247, 0.1)',
        border: '1px solid rgba(168, 85, 247, 0.35)',
        textDecoration: 'none',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        backdropFilter: 'blur(6px)',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.25)',
        flex: '1 1 180px',
        boxSizing: 'border-box'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(168, 85, 247, 0.25)';
        e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.8)';
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 6px 20px rgba(168, 85, 247, 0.4)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(168, 85, 247, 0.1)';
        e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.35)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.25)';
      }}
    >
      <span style={{ fontSize: '8.5px', textTransform: 'uppercase', color: '#c084fc', fontWeight: '800', letterSpacing: '0.8px', marginBottom: '2px' }}>
        🌐 Website
      </span>
      <span style={{ fontSize: '11.5px', color: '#ffffff', fontWeight: '700', letterSpacing: '0.2px', wordBreak: 'break-word' }}>
        www.bookapexcode.store
      </span>
    </a>

    {/* Email Link */}
    <a 
      href="mailto:book.apexcode@gmail.com" 
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '8px 14px',
        borderRadius: '12px',
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        textDecoration: 'none',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        backdropFilter: 'blur(6px)',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.25)',
        flex: '1 1 180px',
        boxSizing: 'border-box'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(168, 85, 247, 0.22)';
        e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.7)';
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 6px 20px rgba(168, 85, 247, 0.35)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.25)';
      }}
    >
      <span style={{ fontSize: '8.5px', textTransform: 'uppercase', color: '#94a3b8', fontWeight: '800', letterSpacing: '0.8px', marginBottom: '2px' }}>
        ✉️ Email Us
      </span>
      <span style={{ fontSize: '11.5px', color: '#e2e8f0', fontWeight: '700', letterSpacing: '0.2px', wordBreak: 'break-all' }}>
        book.apexcode@gmail.com
      </span>
    </a>

    {/* Phone Link */}
    <a 
      href="tel:03421287734" 
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '8px 14px',
        borderRadius: '12px',
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        textDecoration: 'none',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        backdropFilter: 'blur(6px)',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.25)',
        flex: '1 1 130px',
        boxSizing: 'border-box'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(168, 85, 247, 0.22)';
        e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.7)';
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 6px 20px rgba(168, 85, 247, 0.35)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.25)';
      }}
    >
      <span style={{ fontSize: '8.5px', textTransform: 'uppercase', color: '#94a3b8', fontWeight: '800', letterSpacing: '0.8px', marginBottom: '2px' }}>
        📞 Contact
      </span>
      <span style={{ fontSize: '11.5px', color: '#e2e8f0', fontWeight: '700', letterSpacing: '0.2px' }}>
        0342-1287734
      </span>
    </a>

  </div> 
</div>
      </footer>
    </div>
  );
};

// Render React component to root div
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);