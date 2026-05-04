"use client";

import React from "react";
import styles from "./Contact.module.scss";

const contactLinks = [
  { icon: "✉", label: "Sasiharsha6602@gmail.com", href: "mailto:Sasiharsha6602@gmail.com" },
  { icon: "☏", label: "+91 6382931941", href: "tel:+916382931941" },
  { icon: "in", label: "linkedin.com/in/sasidharan", href: "https://www.linkedin.com/in/sasidharan" },
  { icon: "Be", label: "behance.net/sasidharan14", href: "https://www.behance.net/sasidharan14" },
];

export default function Contact() {
  return (
    <section id="contact" className={styles.contactSection}>
      <div className={styles.card}>
        {/* ── LEFT PANEL ── */}
        <div className={styles.leftPanel}>
          {/* Open to Work badge */}
          <div className={styles.openBadge}>
            Open to Work
          </div>

          {/* Profile photo */}
          <img
            src="/sasi1.png"
            alt="Sasidharan K"
            className={styles.profilePhoto}
          />

          {/* Name + Role */}
          <div className={styles.personName}>Sasidharan K</div>
          <div className={styles.personRole}>Product &amp; Industrial Designer</div>

          {/* Divider */}
          <div className={styles.divider} />

          {/* Contact links */}
          {contactLinks.map((item, i) => (
            <a
              key={i}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className={styles.contactLinkRow}
            >
              <div className={styles.iconBox}>{item.icon}</div>
              <span className={styles.linkLabel}>{item.label}</span>
            </a>
          ))}
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className={styles.rightPanel}>
          {/* Inner content */}
          <div className={styles.innerContent}>
            {/* Header */}
            <div>
              <div className={styles.eyebrow}>Get in touch</div>
              <div className={styles.formHeading}>
                Let&apos;s build<br />something great.
              </div>
              <div className={styles.formSubtext}>
                Open to freelance projects, internships, and design collaborations.
              </div>
            </div>

            {/* Form */}
            <form onSubmit={(e) => e.preventDefault()} className={styles.form}>
              <div className={styles.fieldWrapper}>
                <input
                  type="text"
                  placeholder="Your Name"
                  className={styles.fieldInput}
                />
              </div>

              <div className={styles.fieldWrapper}>
                <input
                  type="email"
                  placeholder="Email Address"
                  className={styles.fieldInput}
                />
              </div>

              <div className={styles.fieldWrapper}>
                <textarea
                  placeholder="Your Message"
                  rows={3}
                  className={styles.fieldTextarea}
                />
              </div>

              <button type="submit" className={styles.submitBtn}>
                Send Message →
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
