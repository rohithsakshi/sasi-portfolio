"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Navbar.module.scss";

const links = ["About", "Skills", "Work", "Experience", "Thesis", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger liquid transformation only when entering About section (end of Hero)
      setScrolled(window.scrollY > window.innerHeight - 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const target = document.getElementById(id.toLowerCase());
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={`${styles.navContainer} ${scrolled ? styles.navLiquid : ""}`}>
          {/* Logo */}
          <img
            src="/sasi1.png"
            alt="SASIDHARAN"
            className={styles.logo}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          />

          {/* Desktop Navigation */}
          <ul className={styles.linksList}>
            {links.map((link) => (
              <li key={link}>
                <button 
                  className={styles.navBtn} 
                  onClick={() => scrollTo(link)}
                >
                  {link}
                </button>
              </li>
            ))}
            <li>
              <button 
                onClick={() => scrollTo("contact")} 
                className={styles.hireBtn}
              >
                Hire Me
              </button>
            </li>
          </ul>

          {/* Mobile Hamburger */}
          <button 
            className={styles.hamburger} 
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            <span style={{ 
              transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none" 
            }} />
            <span style={{ 
              opacity: menuOpen ? 0 : 1,
              transform: menuOpen ? "scaleX(0)" : "none"
            }} />
            <span style={{ 
              transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none" 
            }} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.open : ""}`}>
        {links.map((link) => (
          <button 
            key={link} 
            className={styles.mobileLink} 
            onClick={() => scrollTo(link)}
          >
            {link}
          </button>
        ))}
        <button 
          onClick={() => scrollTo("contact")} 
          className={styles.hireBtn}
          style={{ textAlign: "center", marginTop: "10px" }}
        >
          Hire Me
        </button>
      </div>
    </>
  );
}
