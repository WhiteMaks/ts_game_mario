import { Transformation } from "../../maths/support/Transformation.js";
import { BaseCamera } from "../impl/BaseCamera.js";
export class OrthographicCamera extends BaseCamera {
    constructor(width, height, zoomLevel = 1) {
        super(Transformation.getOrthogonalProjectionMatrix((-1) * width / height * zoomLevel, width / height * zoomLevel, -1 * zoomLevel, zoomLevel, -1.0, 1.0), width, height);
        this.zoomLevel = zoomLevel;
    }
    update() {
        this.recalculateViewMatrix();
        this.recalculateViewProjectionMatrix();
    }
    setZoomLevel(zoomLevel) {
        if (zoomLevel <= 1) {
            this.zoomLevel = 1;
            return;
        }
        this.zoomLevel = zoomLevel;
        this.resize(this.width, this.height);
    }
    getZoomLevel() {
        return this.zoomLevel;
    }
    recalculateViewMatrix() {
        this.viewMatrix = Transformation.getViewMatrix(this.position, this.rotation);
    }
    recalculateViewProjectionMatrix() {
        this.viewProjectionMatrix = this.viewMatrix.multiplyMatrix(this.projectionMatrix);
    }
    resize(width, height) {
        this.width = width;
        this.height = height;
        const aspectRation = this.width / this.height;
        this.projectionMatrix = Transformation.getOrthogonalProjectionMatrix((-1) * aspectRation * this.zoomLevel, aspectRation * this.zoomLevel, -1 * this.zoomLevel, this.zoomLevel, -1.0, 1.0);
    }
}
