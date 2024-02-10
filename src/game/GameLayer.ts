import {GameEngine} from "#game_engine/src/namespace/game_engine";
import characterSpriteSheetSrc from "../resources/character_spritesheet.png";

class GameLayer extends GameEngine.BaseLayer {
	private readonly graphicsElement: GameEngine.GraphicsEngine.GraphicsElement;
	private readonly color: GameEngine.GraphicsEngine.Vector4;

	private scene!: GameEngine.Scene;

	private marioEntity!: GameEngine.ECS.Entity;
	private enemyEntity!: GameEngine.ECS.Entity;

	public constructor(graphicsElement: GameEngine.GraphicsEngine.GraphicsElement) {
		super("Game layer");

		this.graphicsElement = graphicsElement;
		this.color = new GameEngine.GraphicsEngine.Vector4(0.41, 0.57, 0.96, 1.0);
	}

	public attach(): void {
		this.scene = new GameEngine.Scene(this.graphicsElement.getWidth(), this.graphicsElement.getHeight());

		const context = this.graphicsElement.getGraphicsContext();

		const characterSpriteSheetImage = new Image();
		characterSpriteSheetImage.src = characterSpriteSheetSrc;
		const characterSpriteSheetTexture = GameEngine.GraphicsEngine.ResourceFactory.create2DTexture(
			context,
			characterSpriteSheetImage,
			4
		);
		const characterSpriteSize = new GameEngine.GraphicsEngine.Vector2(16, 16);

		this.enemyEntity = this.scene.createEntity("Enemy entity");
		const enemyTransformComponent = this.enemyEntity.getComponent(GameEngine.TransformComponent);
		enemyTransformComponent.position.setX(0.5);
		const enemySpriteComponent = this.enemyEntity.addComponent(GameEngine.Sprite2DRendererComponent);
		enemySpriteComponent.sprite = GameEngine.GraphicsEngine.ResourceFactory.createSprite2D(
			characterSpriteSheetTexture,
			new GameEngine.GraphicsEngine.Vector2(0, 0),
			characterSpriteSize
		);

		this.marioEntity = this.scene.createEntity("Mario entity");
		const marioTransformComponent = this.marioEntity.getComponent(GameEngine.TransformComponent);
		marioTransformComponent.position.setX(-0.5);
		marioTransformComponent.position.setZ(0.5);
		const marioSpriteComponent = this.marioEntity.addComponent(GameEngine.Sprite2DRendererComponent);
		marioSpriteComponent.sprite = GameEngine.GraphicsEngine.ResourceFactory.createSprite2D(
			characterSpriteSheetTexture,
			new GameEngine.GraphicsEngine.Vector2(0, 1),
			characterSpriteSize
		);
		const cameraComponent = this.marioEntity.addComponent(GameEngine.CameraComponent);
		cameraComponent.camera = new GameEngine.GraphicsEngine.OrthographicCamera(
			this.graphicsElement.getWidth(),
			this.graphicsElement.getHeight()
		);
		cameraComponent.primary = true;
	}

	public detach(): void {
	}

	public elementInput(event: GameEngine.EventSystem.ElementEvent): void {
		if (event.getType() === GameEngine.EventSystem.ElementEventType.RESIZE) {
			this.scene.resize(event.getWidth(), event.getHeight());
		}
	}

	public keyboardInput(event: GameEngine.EventSystem.KeyboardEvent): void {
	}

	public mouseInput(event: GameEngine.EventSystem.MouseEvent): void {
	}

	public update(time: GameEngine.GraphicsEngine.Time): void {
		this.scene.update(time);
	}

	public render(): void {
		GameEngine.GameEngine.renderer2D.resetStatistics();

		GameEngine.GameEngine.renderer2D.setClearColor(this.color);
		GameEngine.GameEngine.renderer2D.clear();

		this.scene.render();
	}

	public clean(): void {
		this.scene.clean();
		this.marioEntity.clean();
	}

}

export default GameLayer;