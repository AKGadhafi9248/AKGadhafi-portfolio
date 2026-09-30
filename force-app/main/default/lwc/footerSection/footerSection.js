import { LightningElement } from 'lwc';

export default class FooterSection extends LightningElement {
  scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
