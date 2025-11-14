import React, { useState } from "react";

export default function MenuButtons() {
  const all = [
    "Generate Ideas",
    "Summarize & Simplify",
    "Create Something New",
    "Write & Refine",
    "Get Smart Advice",
    "Plan & Organize",
    "Build with Code",
    "Analyze & Predict",
    "Understand Images"
  ];

  const [showAll, setShowAll] = useState(false);

  const display = showAll ? all : all.slice(0, 3);

  return (
    <div className="button-grid">
      {display.map((t) => (
        <button className="menu-btn" key={t}>{t}</button>
      ))}

      {!showAll && (
        <button className="menu-btn more-btn" onClick={() => setShowAll(true)}>
          More
        </button>
      )}
    </div>
  );
}
