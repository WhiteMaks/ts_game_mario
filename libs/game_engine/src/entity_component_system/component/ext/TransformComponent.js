import { TransformSystemComponent } from "../../system/ext/TransformSystemComponent";
import { GameComponent } from "../GameComponent";
import { GraphicsEngine } from "../../../graphics_engine/namespace/graphics_engine";
export class TransformComponent extends GameComponent {
    constructor(entity) {
        super(entity);
        this.position = new GraphicsEngine.Vector3(0, 0, 0);
        this.rotation = new GraphicsEngine.Vector3(0, 0, 0);
        this.scale = new GraphicsEngine.Vector3(1, 1, 1);
        TransformSystemComponent.getInstance().saveComponent(this);
    }
    update(time) {
    }
    render() {
    }
    remove() {
        TransformSystemComponent.getInstance().removeComponent(this);
    }
}
