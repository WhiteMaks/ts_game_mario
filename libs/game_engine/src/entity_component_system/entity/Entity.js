export class Entity {
    constructor(id, scene) {
        this.id = id;
        this.scene = scene;
        this.components = new Map();
    }
    addComponent(componentClass) {
        const component = new componentClass(this);
        this.components.set(componentClass.name, component);
        return component;
    }
    hasComponent(componentClass) {
        return this.components.has(componentClass.name);
    }
    getComponent(componentClass) {
        const componentType = componentClass.name;
        if (this.hasComponent(componentClass)) {
            return this.components.get(componentClass.name);
        }
        throw new Error("Component by type [ " + componentType + " ] not found into entity [ " + this.id + " ]");
    }
    removeComponent(componentClass) {
        const component = this.getComponent(componentClass);
        component.remove();
        this.components.delete(componentClass.name);
    }
    getScene() {
        return this.scene;
    }
    clean() {
        for (const component of this.components.values()) {
            component.remove();
        }
        this.components.clear();
    }
}
