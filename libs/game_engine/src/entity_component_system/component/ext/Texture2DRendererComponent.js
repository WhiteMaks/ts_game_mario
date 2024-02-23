import { TransformComponent } from "./TransformComponent";
import { Texture2DRendererSystemComponent } from "../../system/ext/Texture2DRendererSystemComponent";
import { GameComponent } from "../GameComponent";
import { Engine } from "../../../Engine";
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
