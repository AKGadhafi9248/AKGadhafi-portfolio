import { LightningElement, track, api } from 'lwc';
import BOXICONS from "@salesforce/resourceUrl/myBoxicons";
// import lightProfile from "@salesforce/resourceUrl/lightProfile";
// import darkProfile from "@salesforce/resourceUrl/darkProfile";
import lightProfile from "@salesforce/resourceUrl/white";
import darkProfile from "@salesforce/resourceUrl/black";

export default class SectionHome extends LightningElement {
    lightProfileUrl = lightProfile;
    darkProfileUrl = darkProfile;
    _isDarkTheme = false;

    // Computed property for profile image
    get profileImage() {
        return this._isDarkTheme ? this.darkProfileUrl : this.lightProfileUrl;
    }

    // Computed property for intro text
    get introText() {
        return this._isDarkTheme 
            ? "❝ Practical learning empowers confident and effective real-world implementation.❞"
            : "❝ Passionate About Creating Practical Tech Solutions and Digital Experiences That Matter.❞";
    }

    connectedCallback() {
        // Listen to theme toggle event from parent
        this.addEventListener('themetoggle', this.handleThemeToggle.bind(this));
    }

    // Handle theme toggle event from parent
    handleThemeToggle(event) {
        console.log('🎚️ Home: Theme toggle event received:', event.detail);
        this._isDarkTheme = event.detail.isDarkMode;
    }

    // Public API for parent to set theme
    @api
    get isDarkTheme() {
        return this._isDarkTheme;
    }
    set isDarkTheme(value) {
        const coerced = Boolean(value);
        if (this._isDarkTheme !== coerced) {
            this._isDarkTheme = coerced;
        }
    }

    scrollToJourney() {
        this.dispatchEvent(new CustomEvent('scrolltoskillset'));

    }
    scrollToConnect() {
    this.dispatchEvent(new CustomEvent('scrolltoconnect'));
}
}