"use client";

import styles from './ToolStack.module.scss';

const toolCategories = [
  {
    category: 'Design Tools',
    tools: ['Figma', 'Adobe Suite', 'Sketch', 'Photoshop'],
  },
  {
    category: '3D & CAD',
    tools: ['Fusion 360', 'SolidWorks', 'Blender', 'Adobe XD'],
  },
  {
    category: 'Other Tools',
    tools: ['Notion', 'Figma Plugins', 'Chrome DevTools', 'Procreate'],
  },
];

export function ToolStack() {
  return (
    <div className={styles.toolCard}>
      <h3 className={styles.toolTitle}>Tools & Technologies</h3>

      <div className={styles.toolsGrid}>
        {toolCategories.flatMap((cat) =>
          cat.tools.map((tool, idx) => (
            <div key={`${cat.category}-${idx}`} className={styles.toolItem}>
              {tool}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
