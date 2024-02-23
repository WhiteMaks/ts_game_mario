import { Engine } from "./Engine";
import { ECS } from "./entity_component_system/namespace/ecs";
export class Scene {
    constructor(width, height) {
        this.transformSystemComponent = ECS.TransformSystemComponent.getInstance();
        this.sprite2DRendererSystemComponent = ECS.Sprite2DRendererSystemComponent.getInstance();
        this.tagSystemComponent = ECS.TagSystemComponent.getInstance();
        this.cameraSystemComponent = ECS.CameraSystemComponent.getInstance();
        this.texture2DRendererSystemComponent = ECS.Texture2DRendererSystemComponent.getInstance();
        this.colorRendererSystemComponent = ECS.ColorRendererSystemComponent.getInstance();
        this.typeScriptSystemComponent = ECS.TypeScriptSystemComponent.getInstance();
        this.state2DMachineSystemComponent = ECS.State2DAnimationMachineSystemComponent.getInstance();
        this.width = width;
        this.height = height;
        this.entities = [];
    }
    createEntity(name = "Entity") {
        const result = new ECS.Entity(Scene.entityId++, this);
        result.addComponent(ECS.TransformComponent);
        result.addComponent(ECS.TagComponent).tag = name;
        this.entities.push(result);
        return result;
    }
    resizeCamera() {
        this.cameraSystemComponent.resize(this.width, this.height);
    }
    resize(width, height) {
        this.width = width;
        this.height = height;
        this.resizeCamera();
    }
    update(time) {
        this.transformSystemComponent.update(time);
        this.sprite2DRendererSystemComponent.update(time);
        this.tagSystemComponent.update(time);
        this.cameraSystemComponent.update(time);
        this.colorRendererSystemComponent.update(time);
        this.texture2DRendererSystemComponent.update(time);
        this.typeScriptSystemComponent.update(time);
        this.state2DMachineSystemComponent.update(time);
    }
    render() {
        const primaryCamera = this.cameraSystemComponent.getPrimaryCamera();
        if (primaryCamera) {
            Engine.renderer2D.begin(primaryCamera);
            this.colorRendererSystemComponent.render();
            this.texture2DRendererSystemComponent.render();
            this.sprite2DRendererSystemComponent.render();
            Engine.renderer2D.end();
        }
    }
    clean() {
        this.transformSystemComponent.clean();
        this.sprite2DRendererSystemComponent.clean();
        this.tagSystemComponent.clean();
        this.cameraSystemComponent.clean();
        this.texture2DRendererSystemComponent.clean();
        this.colorRendererSystemComponent.clean();
        this.typeScriptSystemComponent.clean();
        this.state2DMachineSystemComponent.clean();
    }
    getEntities() {
        return this.entities;
    }
}
Scene.entityId = 1;
