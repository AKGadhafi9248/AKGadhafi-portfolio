({
    nextSection : function(component, event, helper) {
        let index = component.get("v.currentIndex");
        let sections = component.get("v.sections");

        index = (index + 1) % sections.length;

        component.set("v.currentIndex", index);

        // Add fade animation
        let el = document.querySelector('.logo-box');
        el.classList.remove('fadeAnim');
        void el.offsetWidth; // reflow
        el.classList.add('fadeAnim');
    }
    
})

