import { BaseCamera } from "../impl/BaseCamera";
import { Transformation } from "../../maths/support/Transformation";
export class PerspectiveCamera extends BaseCamera {
    constructor(width, height, fieldOfView, zNear, zFar) {
        super(Transformation.getPerspectiveProjectionMatrix(width / height, Transformation.degreesToRadians(fieldOfView), zNear, zFar), width, height);
        this.zNear = zNear;
        this.zFar = zFar;
        this.fieldOfView = Transformation.degreesToRadians(fieldOfView);
    }
    update() {
        this.recalculateViewMatrix();
        this.recalculateViewProjectionMatrix();
    }
    resize(width, height) {
        this.width = width;
        this.height = height;
        this.projectionMatrix = Transformation.getPerspectiveProjectionMatrix(this.width / this.height, this.fieldOfView, this.zNear, this.zFar);
    }
    recalculateViewMatrix() {
        this.viewMatrix = Transformation.getViewMatrix(this.position, this.rotation);
    }
    recalculateViewProjectionMatrix() {
        this.viewProjectionMatrix = this.viewMatrix.multiplyMatrix(this.projectionMatrix);
    }
}
