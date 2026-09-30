({
    updateActiveSection : function(component) {
        let index = component.get("v.currentIndex");
        let sections = component.get("v.sections");

        let current = sections[index];

        component.set("v.activeTitle", current.title);
        component.set("v.activeLogos", current.logos);
    }
})
