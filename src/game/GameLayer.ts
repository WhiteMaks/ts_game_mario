import {Level} from "./Level";
import {GameEngine} from "../libs/game_engine/src/namespace/game_engine";

class GameLayer extends GameEngine.Layer.BaseLayer {
	private readonly graphicsElement: GameEngine.GraphicsEngine.GraphicsElement;

	private level!: Level;

	public constructor(graphicsElement: GameEngine.GraphicsEngine.GraphicsElement) {
		super("Game layer");

		this.graphicsElement = graphicsElement;
	}

	public attach(): void {
		const scene = new GameEngine.Scene(this.graphicsElement.getWidth(), this.graphicsElement.getHeight());
		this.level = new Level(scene, this.graphicsElement);
	}

	public detach(): void {
	}

	public elementInput(event: GameEngine.EventSystem.ElementEvent): void {
		if (event.getType() === GameEngine.EventSystem.ElementEventType.RESIZE) {
			this.level.resize(event.getWidth(), event.getHeight());
		}
	}

	public keyboardInput(event: GameEngine.EventSystem.KeyboardEvent): void {
		this.level.keyboardInput(event);
	}

	public mouseInput(event: GameEngine.EventSystem.MouseEvent): void {
		this.level.mouseInput(event);
	}

	public update(time: GameEngine.Time): void {
		this.level.update(time);
	}

	public render(): void {
		this.level.render();
	}

	public clean(): void {
		this.level.clean();
	}
}

export default GameLayer;