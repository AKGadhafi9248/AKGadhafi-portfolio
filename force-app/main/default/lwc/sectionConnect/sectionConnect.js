import { LightningElement, track } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import EMAILJS from '@salesforce/resourceUrl/EmailJS';

export default class SectionConnect extends LightningElement {

    // ===============================
    // 🔐 EMAILJS CONFIG (EDIT HERE)
    // ===============================
    EMAILJS_PUBLIC_KEY = 'bWiTLy6QMKpWIql23';      // ✅ PUBLIC KEY
    EMAILJS_SERVICE_ID = 'service_w845o33';      // ✅ SERVICE ID
    TEMPLATE_OWNER = 'template_nuk8jna';            // ✅ TEMPLATE ID (YOU)
    TEMPLATE_VISITOR = 'template_fbjseqj';        // ✅ TEMPLATE ID (VISITOR)
    // ===============================

    @track name = '';
    @track email = '';
    @track message = '';
    @track includeResume = false;
    @track isSubmitted = false;
    @track resumeRequested = false;
    @track isLoading = false;


    emailJsInitialized = false;

    // 🔹 Load EmailJS SDK
    renderedCallback() {
    if (this.emailJsInitialized) return;
    this.emailJsInitialized = true;

    loadScript(this, EMAILJS)
        .then(() => {
            // ✅ CORRECT FOR emailjs-com v3
            window.emailjs.init(this.EMAILJS_PUBLIC_KEY);
        })
        .catch(error => {
            console.error('EmailJS load error', error);
        });
}
returnToForm() {
    this.isSubmitted = false;
}


    handleChange(event) {
        const field = event.target.dataset.field;
        this[field] =
            event.target.type === 'checkbox'
                ? event.target.checked
                : event.target.value;
    }

    sendEmail() {
    if (!this.name || !this.email || !this.message) return;

    this.isLoading = true; // 🔄 START LOADING
    this.resumeRequested = this.includeResume;

    const storedEmail = localStorage.getItem('portfolioVisitorEmail');

    const emailSubject =
        storedEmail === this.email
            ? `Welcome back ${this.name}`
            : 'Thank you for contacting me!';

    const mainMessage =
        'Thank you for taking your time to visit and appreciate my work.\n\n' +
        'You can contact me on WhatsApp:\n+91-73394-51032';

    const resumeSection = this.includeResume
        ? 'Resume link:\nhttps://drive.google.com/file/d/1uD0QUyNR0a_UZJebYqPV1ba6FSNpSx_z/view'
        : '';

    const resumeStatus = this.includeResume
        ? 'Resume Requested'
        : 'Resume Not Requested';

    const params = {
        from_name: this.name,
        from_email: this.email,
        message: this.message,
        email_subject: emailSubject,
        main_message: mainMessage,
        resume_section: resumeSection,
        resume_status: resumeStatus
    };

    const ownerEmail = window.emailjs.send(
        this.EMAILJS_SERVICE_ID,
        this.TEMPLATE_OWNER,
        params
    );

    const visitorEmail = window.emailjs.send(
        this.EMAILJS_SERVICE_ID,
        this.TEMPLATE_VISITOR,
        params
    );

    Promise.all([ownerEmail, visitorEmail])
        .then(() => {
            localStorage.setItem('portfolioVisitorEmail', this.email);
            this.isSubmitted = true;
            this.resetForm();
        })
        .catch(error => {
            console.error('EmailJS Error:', error);
        })
        .finally(() => {
            this.isLoading = false; // ✅ STOP LOADING
        });
}


    resetForm() {
        this.name = '';
        this.email = '';
        this.message = '';
        this.includeResume = false;
    }
}
