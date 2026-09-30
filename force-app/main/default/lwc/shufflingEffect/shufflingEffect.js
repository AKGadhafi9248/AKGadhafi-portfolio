import { LightningElement, track,api } from "lwc";
import Images from "@salesforce/resourceUrl/Images";
import Logos from "@salesforce/resourceUrl/ProjectLogos";
import cloudImage from "@salesforce/resourceUrl/cicdImg";
import akg from "@salesforce/resourceUrl/ProImgs";

export default class ShufflingEffect extends LightningElement {

    cloudImage = cloudImage;

    @track subtitleText = "";


    @track skillProjects = [
        {
            id: 1,
            title: "AKGadhafi Portfolio",
            description: "Modern Web Development.",
            details: "A personal portfolio website built after completing my Salesforce Development course. Designed as a real-time implementation project to showcase my skills, experience, and technical capabilities with a clean modern UI.",
            demoLink:null,
            githubLink: "https://github.com/yourusername/portfolio",
            tech: [`${Logos}/sf.png`],
            isCloudView: false,
            bg: `${akg}/1.png`,
            isNew: true
        },
        {
            id: 2,
            title: "Ignite Freaks Journal Web App",
            description: "Traditional Web Development.",
            details: "A final-year academic project developed using the MERN stack. The main objective was to gain hands-on experience with full-stack development, API integration, authentication, and implementing core application logic.",
            demoLink: "https://ignitefreaks.netlify.app/",
            githubLink: "https://github.com/yourusername/portfolio",
            tech: [`${Logos}/mongo.png`,`${Logos}/ex.png`,`${Logos}/react.png`,`${Logos}/node.png`,`${Logos}/net.png`],
            isCloudView: false,
            bg: `${akg}/2.png`
        },
        {
            id: 3,
            title: "Voltcare Elect Management",
            description: "Enterprise Backend Development.",
            details: "A training project completed during my TCS onboarding program. Developed using JSP and Spring Boot, focusing on building enterprise-level modules, understanding MVC architecture, and applying both basic and advanced backend concepts.",
            demoLink: "https://github.com/AKGadhafi9248/Voltcare_Electricity_Management.git",
            githubLink: "https://github.com/yourusername/portfolio",
            tech: [`${Logos}/java.png`,`${Logos}/spring.png`,`${Logos}/jsp.png`,`${Logos}/github.png`],
            isCloudView: false,
            bg: `${akg}/3.png`
        },
    ];

    @track industrialProjects = [
        {
            id: 4,
            title: "MTRF Company Website",
            description: "Modern Frontend Development (React).",
            details: "A React-based static marketing website built during my internship for a startup company. The goal was to deliver a clean, responsive frontend without backend or database integration, focused purely on UI/UX and branding.",
            demoLink: "https://meck-teck-research-foundation.vercel.app/service",
            githubLink: "https://github.com/yourusername/erp-integration",
            tech: [`${Logos}/react.png`,`${Logos}/vercel.png`],
            isCloudView: false,
            bg: `${akg}/4.png`
        },
        {
            id: 5,
            title: "Retail Store Web Solution",
            description: "Classic Web Development.",
            details: "Designed and implemented a complete marketing-focused website for a retail shop while working part-time with their team. My role involved supporting their marketing efforts and creating a digital presence that improved product showcase, customer reach, and brand visibility.",
            demoLink: "https://anjali-super-store.vercel.app/",
            githubLink: "https://github.com/yourusername/ecommerce",
            tech: [`${Logos}/html.png`,`${Logos}/css.png`,`${Logos}/js.png`,`${Logos}/scss.png`],
            isCloudView: false,
            bg: `${akg}/5.png`
        },
        {
            id: 6,
            title: "Bakery Store Digital Launch",
            description: "Classic Web Development.",
            details: "A self-initiated freelance project completed after graduation. I identified client requirements, designed the website, and delivered a professional marketing platform to support their customer reach and business visibility.",
            demoLink: "https://jjblackforest.vercel.app/",
            githubLink: "https://github.com/yourusername/ecommerce",
            tech: [`${Logos}/html.png`,`${Logos}/css.png`,`${Logos}/js.png`,`${Logos}/b.png`],
            isCloudView: false,
            bg: `${akg}/6.png`
        },
    ];

    @track commercialProjects = [
        
    ];
    
    // SHOW CLOUD VIEW
    showCloudView(event) {
        const id = parseInt(event.currentTarget.dataset.id);

        this.updateProject(id, true);
        setTimeout(() => this.startTyping(id), 50);
    }
    
   _isDarkTheme = false;

    @api
    get isDarkTheme() {
        return this._isDarkTheme;
    }
    set isDarkTheme(value) {
        const coerced = this.coerceThemeValue(value);
        if(this._isDarkTheme !== coerced) {
            this._isDarkTheme = coerced;
        }
    }
 handleDemoClick(event) {
    const projectId = parseInt(event.currentTarget.dataset.id, 10);

    const allProjects = [
        ...this.skillProjects,
        ...this.industrialProjects,
        ...this.commercialProjects
    ];

    const project = allProjects.find(p => p.id === projectId);

    if (!project) return;

    if (projectId === 1) {
        this.dispatchEvent(new CustomEvent('scrolltohome', {
            bubbles: true,
            composed: true
        }));
    } else if (project.demoLink) {
        window.open(project.demoLink, '_blank');
    }
}

scrollToHomeSection() {
    const homeSection = this.template.querySelector(
        '[data-section="home"]'
    );

    if (homeSection) {
        homeSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}


    get cloudSubtitle() {
        return this._isDarkTheme
            ? "Upgrade. Implement. Repeat. My pipeline keeps running—even in the dark."
            : "Upgrade. Implement. Repeat. Just like a personal CI/CD pipeline.";
    }

    coerceThemeValue(value) {
        if (typeof value === 'string') {
            return value === 'true' || value === '1' || value === 'on';
        }
        return Boolean(value);
    }
    // BACK TO CARD
    closeCloudView(event) {
        const id = parseInt(event.currentTarget.dataset.id);
        this.updateProject(id, false);
    }

    // Update project state
    updateProject(id, value) {
        const update = arr => arr.map(p => ({
            ...p,
            isCloudView: p.id === id ? value : p.isCloudView
        }));

        this.skillProjects = update(this.skillProjects);
        this.industrialProjects = update(this.industrialProjects);
        this.commercialProjects = update(this.commercialProjects);
    }

    // Typing animation
    startTyping(id) {
        const all = [...this.skillProjects, ...this.industrialProjects, ...this.commercialProjects];
        const project = all.find(p => p.id === id);

        const element = this.template.querySelector(`.typing-text[data-id="${id}"]`);
        if (!element) return;

        const text = `${project.title}\n${project.description}\n${project.details}`;
        let index = 0;
        element.textContent = "";

        const typer = setInterval(() => {
            element.textContent += text[index];
            index++;
            if (index >= text.length) clearInterval(typer);
        }, 40);

    }
    _renderedOnce = false;

renderedCallback() {
    // if (this._renderedOnce) return;
    // this._renderedOnce = true;

    if (this.isDarkTheme) {
        this.template.host.classList.add("dark-mode");
    } else {
        this.template.host.classList.remove("dark-mode");
    }

    const sections = [
        { type: 'skill', data: this.skillProjects },
        { type: 'industrial', data: this.industrialProjects },
        { type: 'commercial', data: this.commercialProjects }
    ];

    sections.forEach(section => {
        this.template
            .querySelectorAll(`[data-type="${section.type}"]`)
            .forEach(card => {
                const proj = section.data.find(p => p.id == card.dataset.id);
                if (proj) {
                    card.style.backgroundImage = `url('${proj.bg}')`;
                    card.style.backgroundSize = 'cover';
                    card.style.backgroundPosition = 'center';
                    card.style.backgroundRepeat = 'no-repeat';
                    card.style.borderRadius = '12px';
                }
            });
    });
}
}
