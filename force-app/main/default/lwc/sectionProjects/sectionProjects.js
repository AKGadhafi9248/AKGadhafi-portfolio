import { LightningElement, track } from 'lwc';
import Img from '@salesforce/resourceUrl/Images';

export default class ShufflingEffect extends LightningElement {
  @track currentIndex = 0;

  // keep your images here; update filenames if needed
  baseImages = [
    { id: 1, src: `${Img}/1.jpg`, title: 'Salesforce Development Certified', description: 'Successfully completed a comprehensive Salesforce Development course on Udemy, gaining hands-on experience with APEX, SOQL, SObject operations, and Lightning Web Components (LWC). Built a personal Salesforce portfolio project.' },
    { id: 2, src: `${Img}/2.jpg`, title: 'Full Stack Development Intern (MERN)', description: 'Completed a 3-month MERN Stack internship during my final engineering semester. Worked on multiple real-time projects and actively delivered technical workshops to students, strengthening development and presentation skills.' },
    { id: 3, src: `${Img}/3.jpg`, title: 'Modern React with Redux Certified', description: 'Completed an advanced React & Redux course on Udemy prior to starting my full-stack internship, building strong foundations in component architecture, state management, and modern React workflows.' },
    { id: 4, src: `${Img}/4.jpg`, title: 'Academic Excellence Awards', description: 'Received recognition and awards for academic excellence during my Bachelor of Engineering program.' },
    { id: 5, src: `${Img}/5.jpg`, title: 'Schooling Shields', description: 'Honored with multiple awards during SSLC and HSC, marking the early milestones of my academic achievements—memorable and foundational moments.' },
    { id: 6, src: `${Img}/6.jpg`, title: 'SSLC Award Recognition', description: 'Received a special shield and prize during SSLC for exceptional performance —an inspiring milestone in my education journey.' },
    { id: 7, src: `${Img}/7.jpg`, title: 'Naan Mudalvan Course — Certified', description: 'Successfully completed Naan Mudalvan courses during my academic program, focusing on Full Stack Development with MongoDB, Angular, and Node.js, aligned with my interest in web technologies.' },
    { id: 8, src: `${Img}/8.jpg`, title: 'Web Development Intern', description: 'Proactively approached and secured a web development internship during my academics, gaining practical experience and enhancing frontend development skills.' },
    { id: 9, src: `${Img}/9.jpg`, title: 'Internship Certificate Recognition', description: 'Received a certificate and memento from the organization in recognition of my performance during the internship—valuable learning beyond technical skills.' },
    { id: 10, src: `${Img}/10.jpg`, title: 'First Internship Certification', description: 'My first internship experience in the IT domain—an important step that provided exposure, industry understanding, and foundational technical learning.' },
    
    // add more if needed
  ];

  // Expose current item for content on right side
  get currentItem() {
    return this.baseImages[this.currentIndex];
  }

  // returns a list with CSS classes computed for each image (no inline style)
  get visibleImages() {
    const len = this.baseImages.length;
    return this.baseImages.map((img, idx) => {
      // relative position from current index (0 = front card)
      const rel = (idx - this.currentIndex + len) % len;

      // collapse higher offsets into a generic "back" group
      // pos 0 = front, pos 1 = next behind, pos 2 = next2 behind, pos 3 = the rest (far back)
      const pos = rel === 0 ? 0 : rel === 1 ? 1 : rel === 2 ? 2 : 3;

      // build class string
      const classes = [
        'image-card',
        `pos-${pos}`,
        pos === 0 ? 'active' : ''
      ].join(' ');

      return {
        ...img,
        cardClass: classes
      };
    });
  }

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.baseImages.length;
  }

  prevImage() {
    this.currentIndex = (this.currentIndex - 1 + this.baseImages.length) % this.baseImages.length;
  }
}
