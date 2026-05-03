"use client";

import React from "react";
import styles from "./Projects.module.scss";

const projects = [
  {
    id: 1,
    title: "Portable Air Conditioner",
    domain: "Domestic Sector",
    type: "Team Project",
    year: "Jul–Nov '22",
    description: "Redesigned a static air cooler into a fully portable unit with ergonomic features.",
    tags: ["ERGONOMICS", "USER RESEARCH", "PROTOTYPING"],
    image: "/pac.png",
    rating: 4.8,
  },
  {
    id: 2,
    title: "Shoe & Slipper Stand",
    domain: "Domestic Sector",
    type: "Individual Project",
    year: "Sept '22",
    description: "Innovated a new design concept for domestic shoe storage with physical prototyping.",
    tags: ["PRODUCT DESIGN", "FABRICATION", "INNOVATION"],
    image: "/ss.png",
    rating: 4.9,
  },
  {
    id: 3,
    title: "Extension Box Redesign",
    domain: "Consumer Electronics",
    type: "Thesis Project",
    year: "2023",
    description: "Expandable, foldable, portable extension box design with multiple pin configurations.",
    tags: ["THESIS", "SMART DESIGN", "PORTABILITY"],
    image: "/EB.png",
    rating: 5.0,
  },
];

export default function Projects() {
  return (
    <section id="projects" className={styles.projectsSection}>
      <div className={styles.headingContainer}>
        <h2 className={styles.heading}>Featured Work</h2>
      </div>

      <div className={styles.projectsGrid}>
        {projects.map((project, index) => (
          <div 
            key={project.id} 
            className={`${styles.projectCard} ${index === 1 ? styles.inverted : ""}`}
          >
            {/* TOP/BOTTOM PART: Content Area (Info) */}
            <div className={styles.contentArea}>
              <div className={styles.badge}>{project.type}</div>
              
              <div className={styles.textInfo}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <div className={styles.projectMeta}>
                  {project.year} • {project.domain}
                </div>
                <p className={styles.projectDescription}>{project.description}</p>
              </div>

              <div className={styles.footer}>
                <button className={styles.viewButton}>
                  VIEW PROJECT →
                </button>
              </div>
            </div>

            {/* TOP/BOTTOM PART: Image Area */}
            <div className={styles.imageArea}>
              <img 
                src={project.image} 
                alt={project.title} 
                className={styles.projectImage} 
              />
              <div className={styles.tagsOverlay}>
                {project.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className={styles.tagPill}>{tag}</span>
                ))}
              </div>
              <div className={styles.rating}>
                ★ {project.rating}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}



