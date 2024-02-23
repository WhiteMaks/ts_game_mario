export class System {
    constructor() {
        this.components = new Array();
    }
    saveComponent(component) {
        this.components.push(component);
    }
    removeComponent(component) {
        const index = this.components.indexOf(component);
        if (index > -1) {
            this.components.splice(index, 1);
        }
    }
    clean() {
        for (const component of this.components) {
            component.remove();
        }
    }
}
