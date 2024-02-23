import { Vector3 } from "../../maths/impl/Vector3.js";
import { Transformation } from "../../maths/support/Transformation.js";
export class BaseCamera {
    constructor(projectionMatrix, width, height) {
        this.projectionMatrix = projectionMatrix;
        this.width = width;
        this.height = height;
        this.position = new Vector3(0, 0, 0);
        this.rotation = new Vector3(0, 0, 0);
        this.viewMatrix = Transformation.getViewMatrix(this.position, this.rotation);
        this.viewProjectionMatrix = this.viewMatrix.multiplyMatrix(this.projectionMatrix);
    }
    getPosition() {
        return this.position;
    }
    getProjectionMatrix() {
        return this.projectionMatrix;
    }
    getRotation() {
        return this.rotation;
    }
    getViewMatrix() {
        return this.viewMatrix;
    }
    getViewProjectionMatrix() {
        return this.viewProjectionMatrix;
    }
    setPosition(position) {
        this.position = position;
    }
    setRotation(rotation) {
        this.rotation = rotation;
    }
}
