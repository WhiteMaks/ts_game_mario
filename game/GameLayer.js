import { Level } from "./Level";
import { GameEngine } from "../libs/game_engine/src/namespace/game_engine";
class GameLayer extends GameEngine.Layer.BaseLayer {
    constructor(graphicsElement) {
        super("Game layer");
        this.graphicsElement = graphicsElement;
    }
    attach() {
        const scene = new GameEngine.Scene(this.graphicsElement.getWidth(), this.graphicsElement.getHeight());
        this.level = new Level(scene, this.graphicsElement);
    }
    detach() {
    }
    elementInput(event) {
        if (event.getType() === GameEngine.EventSystem.ElementEventType.RESIZE) {
            this.level.resize(event.getWidth(), event.getHeight());
        }
    }
    keyboardInput(event) {
        this.level.keyboardInput(event);
    }
    mouseInput(event) {
        this.level.mouseInput(event);
    }
    update(time) {
        this.level.update(time);
    }
    render() {
        this.level.render();
    }
    clean() {
        this.level.clean();
    }
}
export default GameLayer;
