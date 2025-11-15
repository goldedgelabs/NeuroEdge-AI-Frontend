import React, { useState } from "react";

export default function MenuButtons() {
  const all = [
    { label: "Generate Ideas", emoji: "💡" },
    { label: "Summarize & Simplify", emoji: "📝" },
    { label: "Create Something New", emoji: "✨" },
    { label: "Write & Refine", emoji: "✍️" },
    { label: "Get Smart Advice", emoji: "🧠" },
    { label: "Plan & Organize", emoji: "📅" },
    { label: "Build with Code", emoji: "💻" },
    { label: "Analyze & Predict", emoji: "🔍" },
    { label: "Understand Images", emoji: "🖼️" },
    { label: "Translate & Explore", emoji: "🌐" },
  ];

  const [showAll, setShowAll] = useState(false);
  const display = showAll ? all : all.slice(0, 3);

  return (
    <div className="button-grid">
      {display.map(({ label, emoji }) => (
        <button
          className="menu-btn premium-btn"
          key={label}
          title="Premium feature"
          onClick={() => alert("Upgrade to Premium to use this feature!")}
        >
          <span style={{ marginRight: "8px" }}>{emoji}</span>
          {label}
          <span role="img" aria-label="Premium" style={{ marginLeft: "4px" }}>🔒</span>
        </button>
      ))}

      {!showAll && (
        <button
          className="menu-btn more-btn"
          onClick={() => setShowAll(true)}
        >
          ➕ More
        </button>
      )}
    </div>
  );
     }
