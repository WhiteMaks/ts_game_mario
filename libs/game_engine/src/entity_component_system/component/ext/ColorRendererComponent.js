import { TransformComponent } from "./TransformComponent";
import { Engine } from "../../../Engine";
import { ColorRendererSystemComponent } from "../../system/ext/ColorRendererSystemComponent";
import { GameComponent } from "../GameComponent";
import { GraphicsEngine } from "../../../graphics_engine/namespace/graphics_engine";
export class ColorRendererComponent extends GameComponent {
    constructor(entity) {
        super(entity);
        this.color = new GraphicsEngine.Vector4(1, 1, 1, 1);
        ColorRendererSystemComponent.getInstance().saveComponent(this);
    }
    update(time) {
    }
    render() {
        const transformComponent = this.entity.getComponent(TransformComponent);
        Engine.renderer2D.drawQuadWithColor(transformComponent.position, transformComponent.rotation, transformComponent.scale, this.color);
    }
    remove() {
        ColorRendererSystemComponent.getInstance().removeComponent(this);
    }
}
