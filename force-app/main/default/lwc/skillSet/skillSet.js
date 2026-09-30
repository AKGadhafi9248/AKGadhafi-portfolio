import { LightningElement, track, api } from "lwc";

import cloudImg from "@salesforce/resourceUrl/cloudImg";
import touch from "@salesforce/resourceUrl/touch";
import ProjectLogos from "@salesforce/resourceUrl/ProjectLogos";

export default class SkillSet extends LightningElement {
    cloudImg = cloudImg;
    touchImg = touch;
    ProjectLogos = ProjectLogos;

    step = 1;

    @track headerTitle = "Programming Languages";

    @track logoSet = [
        { 
            id: 1, 
            src: ProjectLogos + "/java.png", 
            class: "logo-container logo-left",
            title: "Java"
        },
        { 
            id: 2, 
            src: ProjectLogos + "/apex.png", 
            class: "logo-container logo-right",
            title: "Apex"
        }
    ];

    @api 
    get isDarkTheme() {
        return this._isDarkTheme;
    }
    
    set isDarkTheme(value) {
        this._isDarkTheme = value;
        // Update the data attribute for CSS selection
        if (this._isDarkTheme) {
            this.template.host.setAttribute('data-is-dark-theme', 'true');
        } else {
            this.template.host.setAttribute('data-is-dark-theme', 'false');
        }
    }
    
    _isDarkTheme = false;

    renderedCallback() {
        // Set cloud background after component is rendered
        const cloudContainer = this.template.querySelector('.cloud-container');
        if (cloudContainer) {
            cloudContainer.style.backgroundImage = `url(${this.cloudImg})`;
            cloudContainer.style.backgroundSize = 'contain';
            cloudContainer.style.backgroundRepeat = 'no-repeat';
            cloudContainer.style.backgroundPosition = 'center';
        }
    }

    handleTouch() {
        this.step++;

        if (this.step === 2) {
            this.headerTitle = "Frameworks & Libraries";
            this.logoSet = [
                { 
                    id: 1, 
                    src: this.ProjectLogos + "/react.png", 
                    class: "logo-container logo-top-right",
                    title: "React JS"
                },
                { 
                    id: 2, 
                    src: this.ProjectLogos + "/ex.png", 
                    class: "logo-container logo-middle-left",
                    title: "Express JS"
                },
                { 
                    id: 3, 
                    src: this.ProjectLogos + "/spring.png", 
                    class: "logo-container logo-bottom-right",
                    title: "Spring Boot"
                },
                { 
                    id: 4, 
                    src: this.ProjectLogos + "/node.png", 
                    class: "logo-container logo-bottom-left",
                    title: "Node JS"
                }
            ];
        } else if (this.step === 3) {
            this.headerTitle = "Databases";
            this.logoSet = [
                // { 
                //     id: 1, 
                //     src: this.ProjectLogos + "/html.png", 
                //     class: "logo-container logo-bottom",
                //     title: "HTML"
                // },
                { 
                    id: 2, 
                    src: this.ProjectLogos + "/mysql.png", 
                    class: "logo-container logo-middle-right",
                    title: "Mysql"
                },
                { 
                    id: 3, 
                    src: this.ProjectLogos + "/mongo.png", 
                    class: "logo-container logo-top-left",
                    title: "MongoDB"
                }
            ];
        } 
        else if (this.step === 4) {
            this.headerTitle = "SAP HANA Tools";
            this.logoSet = [
                // { 
                //     id: 1, 
                //     src: this.ProjectLogos + "/html.png", 
                //     class: "logo-container logo-bottom",
                //     title: "HTML"
                // },
                { 
                    id: 2, 
                    src: this.ProjectLogos + "/hdb.png", 
                    class: "logo-container logo-middle-right",
                    title: "HDBSQL"
                },
                { 
                    id: 3, 
                    src: this.ProjectLogos + "/hs.png", 
                    class: "logo-container logo-top-left",
                    title: "HANA Studio"
                },
                { 
                    id: 4, 
                    src: this.ProjectLogos + "/spc.png", 
                    class: "logo-container logo-bottom-left",
                    title: "SPC"
                },
            ];
        } else if (this.step > 4) {
            this.step = 1;
            this.headerTitle = "Programming Languages";
            this.logoSet = [
                { 
                    id: 1, 
                    src: this.ProjectLogos + "/java.png", 
                    class: "logo-container logo-left",
                    title: "Java"
                },
                { 
                    id: 2, 
                    src: this.ProjectLogos + "/apex.png", 
                    class: "logo-container logo-right",
                    title: "Apex"
                }
            ];
        }
    }
}