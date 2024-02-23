import { TransformComponent } from "./TransformComponent.js";
import { Engine } from "../../../Engine.js";
import { ColorRendererSystemComponent } from "../../system/ext/ColorRendererSystemComponent.js";
import { GameComponent } from "../GameComponent.js";
import { GraphicsEngine } from "../../../graphics_engine/namespace/graphics_engine.js";
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
