import { LightningElement } from 'lwc';
import backgroundImage from '@salesforce/resourceUrl/back';

export default class SectionExperience extends LightningElement {

    renderedCallback() {
        this.applyBackgroundStyles();
        const content = this.template.querySelector('.experience-content');
if (content) {
    content.style.position = "relative";
    content.style.zIndex = "2"; // ← ensures content appears above overlay
}

    }

    applyBackgroundStyles() {
        const section = this.template.querySelector('.experience-section');

        if (section) {
            section.style.backgroundImage = `url('${backgroundImage}')`;
            section.style.backgroundSize = "cover";
            section.style.backgroundPosition = "center";
            section.style.backgroundRepeat = "no-repeat";
            section.style.backgroundAttachment = "fixed";
        }
    }
}
