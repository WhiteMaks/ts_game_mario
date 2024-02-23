import { Sprite2DRendererSystemComponent } from "../../system/ext/Sprite2DRendererSystemComponent";
import { TransformComponent } from "./TransformComponent";
import { Engine } from "../../../Engine";
import { GameComponent } from "../GameComponent";
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
