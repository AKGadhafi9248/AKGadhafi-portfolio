import { LightningElement, track } from "lwc";
import { loadStyle } from "lightning/platformResourceLoader";
import BOXICONS from "@salesforce/resourceUrl/myBoxicons";

export default class SectionMain extends LightningElement {
  myImage = BOXICONS + "/intro.jpg";
  menuOpen = false;
  @track isDarkMode = false;

  connectedCallback() {
    this.setupMetaTags();
    loadStyle(this, BOXICONS + "/boxicons.min.css")
      .then(() => console.log("✅ Boxicons CSS loaded"))
      .catch((error) => console.error("❌ Failed to load Boxicons CSS", error));

    window.addEventListener("scroll", this.handleScroll.bind(this));
  }

  disconnectedCallback() {
    window.removeEventListener("scroll", this.handleScroll.bind(this));
  }
  scrollToConnectSection() {
    const el = this.template.querySelector('[data-section="connect"]');
    if (el) el.scrollIntoView({ behavior: "smooth" });
}
  setupMetaTags() {
    const metaTags = [
      { name: "mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "theme-color", content: "#1A7F8C" },
    ];
    metaTags.forEach((tag) => {
      const el = document.createElement("meta");
      el.name = tag.name;
      el.content = tag.content;
      document.head.appendChild(el);
    });
  }

  toggleMenu() {
    const menu = this.template.querySelector(".menu");
    const overlay = this.template.querySelector(".menu-overlay");
    if (menu && overlay) {
      menu.classList.toggle("active");
      overlay.classList.toggle("active");
    }
  }

  scrollToSection(event) {
    const targetId = event.currentTarget.dataset.target;
    const section = this.template.querySelector(`[data-section="${targetId}"]`);
    if (section) {
      const rect = section.getBoundingClientRect();
      window.scrollTo({
        top: rect.top + window.scrollY - 60,
        behavior: "smooth",
      });
    }

    this.updateActiveNav(targetId);
    const menu = this.template.querySelector(".menu");
    const overlay = this.template.querySelector(".menu-overlay");
    if (menu?.classList.contains("active")) {
      menu.classList.remove("active");
      overlay.classList.remove("active");
    }
  }

 handleScrollToSkillSet() {
    console.log("🔥 ScrollToSkillSet triggered!");

    const skillSection = this.template.querySelector("c-skill-set");

    if (!skillSection) {
        console.error("❌ Could not find <c-skill-set> inside template!");
        // Additional debug: list all children
        console.log("📌 Available child components:", 
            this.template.querySelectorAll("*")
        );
        return;
    }

    console.log("✅ Found c-skill-set:", skillSection);

    try {
        skillSection.scrollIntoView({ behavior: "smooth", block: "start" });
        console.log("✨ Smooth scroll executed!");
    } catch (err) {
        console.error("⚠️ Error while scrolling:", err);
    }
}




  // ✅ Toggle dark/light theme and notify children
  handleToggle() {
    this.template
      .querySelectorAll(".dark-light")
      .forEach((dl) => dl.classList.toggle("active"));

    this.template.host.classList.toggle("dark-mode");
    document.body.classList.toggle("dark-mode");
    this.isDarkMode = !this.isDarkMode;

    // 🔔 Dispatch event so children (like section-journey) can update their backgrounds
    const event = new CustomEvent("themetoggle", {
      detail: { isDarkMode: this.isDarkMode },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  handleScroll() {
    const sections = this.template.querySelectorAll("[data-section]");
    let scrollPos = window.scrollY + window.innerHeight / 3;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY - 80;
      const sectionBottom = sectionTop + rect.height;
      const sectionId = section.dataset.section;

      if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
        this.updateActiveNav(sectionId);
      }
    });
  }

  updateActiveNav(activeId) {
    this.template
      .querySelectorAll(".nav.desktop-nav button")
      .forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.target === activeId);
      });

    this.template
      .querySelectorAll(".nav-links li a")
      .forEach((link) => {
        link.classList.toggle("active", link.dataset.target === activeId);
      });
  }
}
