"use client";

import Image from 'next/image';
import styles from './ProfileCard.module.scss';

const experiences = [
  {
    year: '2023 – Present',
    role: 'Product Designer',
    company: 'Freelance',
    description: 'Focused on product design, prototyping, and user-centered solutions.',
  },
  {
    year: '2022 – 2023',
    role: 'Graphic Design Intern',
    company: 'Mystic Couture Pvt. Ltd.',
    description: 'Best Intern of the Week × 2. Designed posters, branding, and marketing materials.',
  },
  {
    year: '2020 – 2022',
    role: 'B. Des Product & Industrial Design',
    company: 'Lovely Professional University',
    description: 'CGPA: 5.35. Specialization in user-centered product design and innovation.',
  },
];

export function ProfileCard() {
  return (
    <div className={styles.profileCard}>
      {/* Left: Profile Image */}
      <div className={styles.imageContainer}>
        <img
          src="/sasi1.png"
          alt="SASIDHARAN"
          className={styles.profileImage}
        />
      </div>

      {/* Right: Timeline */}
      <div className={styles.timelineContainer}>
        <h3 className={styles.timelineTitle}>Experience</h3>

        <div className={styles.timeline}>
          {experiences.map((exp, index) => (
            <div key={index} className={styles.timelineItem}>
              <div className={styles.timelineDot} />
              <div className={styles.timelineContent}>
                <div className={styles.year}>{exp.year}</div>
                <div className={styles.role}>{exp.role}</div>
                <div className={styles.company}>{exp.company}</div>
                <div className={styles.description}>{exp.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
