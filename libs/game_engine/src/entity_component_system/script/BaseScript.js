export class BaseScript {
    constructor(entity) {
        this.entity = entity;
    }
    getComponent(componentClass) {
        return this.entity.getComponent(componentClass);
    }
    addComponent(componentClass) {
        return this.entity.addComponent(componentClass);
    }
    getScene() {
        return this.entity.getScene();
    }
    init() { }
    destroy() { }
}
