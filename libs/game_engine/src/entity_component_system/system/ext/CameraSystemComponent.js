import { GameSystemComponent } from "../GameSystemComponent.js";
export class CameraSystemComponent extends GameSystemComponent {
    constructor() {
        super();
    }
    static getInstance() {
        if (!CameraSystemComponent.instance) {
            CameraSystemComponent.instance = new CameraSystemComponent();
        }
        return CameraSystemComponent.instance;
    }
    resize(width, height) {
        for (const component of this.components) {
            component.camera.resize(width, height);
        }
    }
    getPrimaryCamera() {
        for (const component of this.components) {
            if (component.primary) {
                return component.camera;
            }
        }
        return null;
    }
}
