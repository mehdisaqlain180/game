/**
 * Gravity Games - Google AdSense Ready Placement Architecture
 * gravitygamez.fun
 * Zero-CLS, Policy-Compliant Plug-and-Play Ad Configuration
 */

const ADSENSE_CONFIG = {
  enabled: false, // Set to true once AdSense is approved
  publisherId: "ca-pub-XXXXXXXXXXXXXXXX", // Replace with your AdSense Publisher ID
  slots: {
    homeTopLeaderboard: "1111111111",
    homeInFeedBanner: "2222222222",
    playerLeftSkyscraper: "3333333333",
    playerRightRectangle: "4444444444",
    playerBottomBanner: "5555555555",
    blogInArticle: "6666666666"
  }
};

/**
 * AdManager - Handles zero-CLS insertion and placeholder management
 */
const AdManager = {
  initializedScript: false,

  init() {
    if (ADSENSE_CONFIG.enabled && !this.initializedScript) {
      this.loadAdSenseScript();
    }
  },

  loadAdSenseScript() {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CONFIG.publisherId}`;
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);
    this.initializedScript = true;
  },

  renderSlot(elementId, slotKey, adFormat = "auto") {
    const container = document.getElementById(elementId);
    if (!container) return;

    const slotId = ADSENSE_CONFIG.slots[slotKey] || "";

    if (ADSENSE_CONFIG.enabled) {
      container.classList.remove("ad-hidden");
      container.innerHTML = "";
      const ins = document.createElement("ins");
      ins.className = "adsbygoogle";
      ins.style.display = "block";
      ins.setAttribute("data-ad-client", ADSENSE_CONFIG.publisherId);
      ins.setAttribute("data-ad-slot", slotId);
      ins.setAttribute("data-ad-format", adFormat);
      if (adFormat === "auto") {
        ins.setAttribute("data-full-width-responsive", "true");
      }
      container.appendChild(ins);

      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.warn("AdSense push error:", e);
      }
    } else {
      // Keep layout clean until AdSense is enabled
      container.classList.add("ad-hidden");
      container.innerHTML = "";
    }
  }
};

// Export to window
if (typeof window !== "undefined") {
  window.ADSENSE_CONFIG = ADSENSE_CONFIG;
  window.AdManager = AdManager;
}
