import { Sprite2DRendererSystemComponent } from "../../system/ext/Sprite2DRendererSystemComponent.js";
import { TransformComponent } from "./TransformComponent.js";
import { Engine } from "../../../Engine.js";
import { GameComponent } from "../GameComponent.js";
export class Sprite2DRendererComponent extends GameComponent {
    constructor(entity) {
        super(entity);
        Sprite2DRendererSystemComponent.getInstance().saveComponent(this);
    }
    update(time) {
    }
    render() {
        const transformComponent = this.entity.getComponent(TransformComponent);
        Engine.renderer2D.drawQuadWithSprite(transformComponent.position, transformComponent.rotation, transformComponent.scale, this.sprite);
    }
    remove() {
        Sprite2DRendererSystemComponent.getInstance().removeComponent(this);
    }
}
