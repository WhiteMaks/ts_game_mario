import { Vector2 } from "../impl/Vector2";
import { Random } from "../../support/Random";
export class RandomWalk2D {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    generate(steps) {
        const result = new Array(this.width);
        for (let i = 0; i < this.width; i++) {
            result[i] = new Array(this.height).fill(false);
        }
        let position = new Vector2(Random.int(this.width), Random.int(this.height));
        result[position.getX()][position.getY()] = true;
        const movements = [
            Vector2.up(),
            Vector2.down(),
            Vector2.left(),
            Vector2.right(),
        ];
        for (let step = 0; step < steps; step++) {
            while (true) {
                const randomMove = movements[Random.int(movements.length)];
                const newPosition = position.plus(new Vector2(randomMove.getX(), randomMove.getY()));
                if (newPosition.getX() >= 0 &&
                    newPosition.getX() < this.width &&
                    newPosition.getY() >= 0 &&
                    newPosition.getY() < this.height) {
                    result[newPosition.getX()][newPosition.getY()] = true;
                    position = newPosition;
                    break;
                }
            }
        }
        return result;
    }
}
