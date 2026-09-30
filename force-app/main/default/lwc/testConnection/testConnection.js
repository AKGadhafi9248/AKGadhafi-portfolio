import { LightningElement } from 'lwc';

export default class TestConnection extends LightningElement {
    connectedCallback() {
        console.log('🚀 TestConnection component connected to DOM');
    }

    scrollToSection(event) {
        const targetId = event.currentTarget.dataset.target;
        console.log('📌 Scroll button clicked');
        const section = this.template.querySelector(`[data-section="${targetId}"]`); 
        console.log('ID:'+section);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
            console.log('✅ Scrolled to section');
        } else {
            console.error('❌ Section not found inside this component');
        }
    }
}
