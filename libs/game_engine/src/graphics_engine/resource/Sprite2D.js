import { Vector2 } from "../maths/impl/Vector2.js";
export class Sprite2D {
    constructor(texture) {
        this.texture = texture;
        this.coordinates = new Array(4);
        this.coordinates[0] = new Vector2(0, 0);
        this.coordinates[1] = new Vector2(0, 0);
        this.coordinates[2] = new Vector2(0, 0);
        this.coordinates[3] = new Vector2(0, 0);
    }
    updateCoordinates(bottomLeft, topRight) {
        this.coordinates[0] = new Vector2(bottomLeft.getX(), bottomLeft.getY());
        this.coordinates[1] = new Vector2(topRight.getX(), bottomLeft.getY());
        this.coordinates[2] = new Vector2(topRight.getX(), topRight.getY());
        this.coordinates[3] = new Vector2(bottomLeft.getX(), topRight.getY());
    }
    getTexture() {
        return this.texture;
    }
    getCoordinates() {
        return this.coordinates;
    }
}
