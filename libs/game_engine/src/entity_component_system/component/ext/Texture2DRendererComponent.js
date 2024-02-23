import { TransformComponent } from "./TransformComponent.js";
import { Texture2DRendererSystemComponent } from "../../system/ext/Texture2DRendererSystemComponent.js";
import { GameComponent } from "../GameComponent.js";
import { Engine } from "../../../Engine.js";
export class Texture2DRendererComponent extends GameComponent {
    constructor(entity) {
        super(entity);
        Texture2DRendererSystemComponent.getInstance().saveComponent(this);
    }
    remove() {
        Texture2DRendererSystemComponent.getInstance().removeComponent(this);
    }
    render() {
        const transformComponent = this.entity.getComponent(TransformComponent);
        Engine.renderer2D.drawQuadWithTexture(transformComponent.position, transformComponent.rotation, transformComponent.scale, this.texture);
    }
    update(time) {
    }
}
