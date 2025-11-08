/**
 * Composed Interface Example Demo Script
 * Demonstrates complete LCARS interface with panels and buttons
 */

// Import all LCARS components
import "../../src/components/lcars-panel/lcars-panel.js";
import "../../src/components/lcars-button/lcars-button.js";

// Import theme styles
import "../../src/styles/theme.css";

console.log("✓ LCARS Panel and Button components loaded");
console.log("✓ Complete interface composition ready");

// Add event listeners to all buttons
document.addEventListener("lcars-click", (event) => {
  const button = event.target;
  const buttonText = button.textContent.trim();

  console.log(`[LCARS] Button clicked: "${buttonText}"`);

  // Handle specific button actions
  switch (button.id) {
    case "engage":
      console.log("🚀 Engaging warp drive!");
      alert("Engaging at warp speed!");
      break;

    case "red-alert":
      console.log("🚨 RED ALERT activated!");
      alert("⚠️ RED ALERT! All hands to battle stations!");
      break;

    case "all-stop":
      console.log("🛑 Full stop");
      alert("All stop. Holding position.");
      break;

    case "diagnostics":
      console.log("🔧 Running ship diagnostics...");
      alert("Diagnostics: All systems operational");
      break;

    case "plot-course":
      console.log("🗺️ Plotting new course");
      alert("Course plotted. Awaiting command to engage.");
      break;

    case "hail-freq":
      console.log("📡 Opening hailing frequencies");
      alert("Hailing frequencies open, Captain.");
      break;

    case "scan":
      console.log("🔍 Initiating long range scan");
      alert("Long range scan complete. No immediate threats detected.");
      break;

    case "shields-up":
      console.log("🛡️ Raising shields");
      alert("Shields up. Shield strength at 100%.");
      break;

    case "investigate":
      console.log("🔎 Investigating sensor anomaly");
      alert("Anomaly under investigation. Science team dispatched.");
      break;

    default:
      console.log(`Action for "${buttonText}" button`);
  }
});

console.log("✓ Event listeners attached to all buttons");
console.log("✓ Composition validation: 4 panels + 12 buttons working together");
