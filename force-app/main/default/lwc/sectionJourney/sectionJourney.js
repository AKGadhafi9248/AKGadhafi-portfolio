import { LightningElement, track, api } from "lwc";
import getJourneyData from "@salesforce/apex/JourneyDataController.getJourneyData";

// 🎞️ Static Resources
import lightCloud from "@salesforce/resourceUrl/lightCloud";
import darkCloud from "@salesforce/resourceUrl/darkCloud";
import backgroundImage from "@salesforce/resourceUrl/backgroundImage";
import backgroundImageDark from "@salesforce/resourceUrl/backgroundImageDark";

export default class SectionJourney extends LightningElement {
  @track journeyData = [];
    @track subtitleText = "";
  _isDarkTheme = false;

  // Static resource URLs
  lightCloudUrl = lightCloud;
  darkCloudUrl = darkCloud;
  backgroundImageUrl = backgroundImage;
  backgroundImageDarkUrl = backgroundImageDark;

  // Computed property for template
  get currentThemeText() {
    return this._isDarkTheme ? 'Dark' : 'Light';
  }

  connectedCallback() {
    console.log("✅ SectionJourney connected");
    this.checkStaticResources();
    this.fetchJourneyData();
    // Observe theme changes in CSS variables as a fallback
    this.startThemeObserver();
  }

  renderedCallback() {
    this.updateBackground();
    this.updateClouds();
  }
  get cloudSubtitle() {
        return this._isDarkTheme
            ? "Clouds are just checkpoints on the way to the moon."   // dark
            : "Shaping my path, one cloud at a time.";               // light
    }
  // 🌗 Public API for parent to toggle dark mode
  @api
  get isDarkTheme() {
    return this._isDarkTheme;
  }
  set isDarkTheme(value) {
    console.log("🎚️ Theme Setter Triggered with value:", value, typeof value);
    
    const coerced = this.coerceThemeValue(value);
    console.log(`Coerced theme value: ${coerced} (was: ${this._isDarkTheme})`);

    if (this._isDarkTheme !== coerced) {
      this._isDarkTheme = coerced;
      console.log(`🎨 Theme changed → ${this._isDarkTheme ? "Dark" : "Light"}`);

      // Force immediate update
      this.updateAllVisuals();
    }
  }

  // 🎨 Update both background and clouds immediately
  updateAllVisuals() {
    // Use multiple methods to ensure update
    setTimeout(() => {
      this.updateBackground();
      this.updateClouds();
    }, 0);
    
    requestAnimationFrame(() => {
      this.updateBackground();
      this.updateClouds();
    });
  }

  // 🎨 Dynamically set section background based on theme
  updateBackground() {
    const section = this.template.querySelector(".mypath-section");
    if (!section) {
      console.warn("⚠️ .mypath-section not found yet");
      return;
    }

    const bgUrl = this._isDarkTheme ? this.backgroundImageDarkUrl : this.backgroundImageUrl;
    
    console.log("🎨 Setting background:", {
      isDarkTheme: this._isDarkTheme,
      bgUrl: bgUrl
    });

    section.style.backgroundImage = `url('${bgUrl}')`;
    section.style.backgroundSize = "cover";
    section.style.backgroundPosition = "center";
    section.style.backgroundRepeat = "no-repeat";
    section.style.backgroundAttachment = "fixed";

    console.log("✅ Background applied successfully");
  }

  // ☁️ Update all clouds to match current theme
  updateClouds() {
    const clouds = this.template.querySelectorAll(".cloud");
    if (!clouds || clouds.length === 0) {
      console.warn("☁️ No clouds found");
      return;
    }

    const cloudUrl = this._isDarkTheme ? this.darkCloudUrl : this.lightCloudUrl;
    
    clouds.forEach((cloud) => {
      cloud.style.backgroundImage = `url('${cloudUrl}')`;
      cloud.style.backgroundSize = "cover";
      cloud.style.backgroundRepeat = "no-repeat";
      cloud.style.backgroundPosition = "center";
    });

    console.log(`✅ Updated ${clouds.length} clouds to:`, cloudUrl);
  }

  // 📘 Fetch journey data from Apex
  async fetchJourneyData() {
    try {
      const data = await getJourneyData();

      this.journeyData = data
        .map((item) => ({
          id: item.Id,
          institution: item.Institution_c__c,
          year: item.Year_c__c,
          medium: item.Medium_c__c,
          place: item.Place_c__c,
          standard: item.Standard_c__c,
          detail: item.Detail_c__c,
          cloudClass: "cloud",
        }))
        .sort((a, b) => {
          const startA = parseInt((a.year || "").split(" - ")[0], 10) || 0;
          const startB = parseInt((b.year || "").split(" - ")[0], 10) || 0;
          return startA - startB;
        });

      setTimeout(() => {
        this.updateAllVisuals();
      }, 100);

      console.log("✅ Journey data loaded successfully");
    } catch (error) {
      console.error("❌ Error fetching journey data:", error);
    }
  }

  // 🎯 Manual test method for debugging
  forceUpdateBackground() {
    console.log('🔄 Manually forcing background update');
    console.log('Current isDarkTheme:', this._isDarkTheme);
    this.updateAllVisuals();
  }

  // 🔄 Toggle theme manually for testing
  toggleThemeTest() {
    console.log('🎨 Manually toggling theme');
    this.isDarkTheme = !this._isDarkTheme;
  }

  // 🧪 TEST METHOD: Check static resource loading
  checkStaticResources() {
    console.log('🔍 Checking Static Resources:');
    console.log('Light Background URL:', this.backgroundImageUrl);
    console.log('Dark Background URL:', this.backgroundImageDarkUrl);
    
    this.testImageLoad(this.backgroundImageUrl, 'Light Background');
    this.testImageLoad(this.backgroundImageDarkUrl, 'Dark Background');
  }

  testImageLoad(url, name) {
    const img = new Image();
    img.onload = () => console.log(`✅ ${name} loads successfully:`, url);
    img.onerror = () => console.log(`❌ ${name} failed to load:`, url);
    img.src = url;
  }

  // 🔍 Theme value coercion helper
  coerceThemeValue(value) {
    if (typeof value === 'string') {
      return value === 'true' || value === '1' || value === 'on';
    }
    return Boolean(value);
  }

  // 👀 Observe CSS variable changes as fallback
  startThemeObserver() {
    // Check if theme changes are reflected in CSS variables
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const hasDarkClass = this.template.host.classList.contains('dark-theme') || 
                              document.body.classList.contains('dark-theme');
          if (hasDarkClass !== this._isDarkTheme) {
            console.log('👀 CSS class change detected, updating theme to:', hasDarkClass);
            this._isDarkTheme = hasDarkClass;
            this.updateAllVisuals();
          }
        }
      });
    });

    observer.observe(this.template.host, {
      attributes: true,
      attributeFilter: ['class']
    });

    // Also observe body for theme classes
    if (document.body) {
      observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['class']
      });
    }
  }
}