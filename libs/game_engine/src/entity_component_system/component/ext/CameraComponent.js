import { GameComponent } from "../GameComponent.js";
import { CameraSystemComponent } from "../../system/ext/CameraSystemComponent.js";
export class CameraComponent extends GameComponent {
    constructor(entity) {
        super(entity);
        CameraSystemComponent.getInstance().saveComponent(this);
    }
    render() {
    }
    update(time) {
        const cameraComponent = this.entity.getComponent(CameraComponent);
        if (cameraComponent.primary) {
            cameraComponent.camera.update();
        }
    }
    remove() {
        CameraSystemComponent.getInstance().removeComponent(this);
    }
}
