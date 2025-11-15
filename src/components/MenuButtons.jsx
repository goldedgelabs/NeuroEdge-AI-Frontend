import React, { useState } from "react";

export default function MenuButtons() {
  const all = [
    { text: "💡 Generate Ideas", key: "Generate Ideas" },
    { text: "📝 Summarize & Simplify", key: "Summarize & Simplify" },
    { text: "✨ Create Something New", key: "Create Something New" },
    { text: "✍️ Write & Refine", key: "Write & Refine" },
    { text: "🧠 Get Smart Advice", key: "Get Smart Advice" },
    { text: "📅 Plan & Organize", key: "Plan & Organize" },
    { text: "💻 Build with Code", key: "Build with Code" },
    { text: "🔍 Analyze & Predict", key: "Analyze & Predict" },
    { text: "🖼️ Understand Images", key: "Understand Images" },
    { text: "🌐 Translate & Explore", key: "Translate & Explore" } // 10th premium button
  ];

  const [showAll, setShowAll] = useState(false);

  const display = showAll ? all : all.slice(0, 3);

  return (
    <div className="button-grid">
      {display.map((t) => (
        <button className="menu-btn" key={t.key}>
          {t.text}
        </button>
      ))}

      {!showAll && (
        <button className="menu-btn more-btn" onClick={() => setShowAll(true)}>
          ➕ More
        </button>
      )}
    </div>
  );
}
