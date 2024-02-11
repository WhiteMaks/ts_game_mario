import characterSpriteSheetSrc from "../resources/character_spritesheet.png";
import {GameEngine} from "#game_engine/src/namespace/game_engine";

class GameLayer extends GameEngine.BaseLayer {
	private readonly graphicsElement: GameEngine.GraphicsEngine.GraphicsElement;
	private readonly color: GameEngine.GraphicsEngine.Vector4;

	private scene!: GameEngine.Scene;

	private marioEntity!: GameEngine.ECS.Entity;
	private enemyEntity!: GameEngine.ECS.Entity;

	private marioSprites!: GameEngine.GraphicsEngine.Sprite2D[];
	private enemySprites!: GameEngine.GraphicsEngine.Sprite2D[];

	private marioSpriteIndex!: number;
	private marioSpriteFlipTime!: number;
	private marioSpriteFlipTimeLeft!: number;

	private enemySpriteIndex!: number;
	private enemySpriteFlipTime!: number;
	private enemySpriteFlipTimeLeft!: number;

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

		this.marioSpriteIndex = 0;
		this.marioSpriteFlipTime = 0.2;
		this.marioSpriteFlipTimeLeft = 0;
		this.marioSprites = [];
		this.marioSprites.push(
			GameEngine.GraphicsEngine.ResourceFactory.createSprite2D(
				characterSpriteSheetTexture,
				new GameEngine.GraphicsEngine.Vector2(0, 1),
				characterSpriteSize
			)
		);
		this.marioSprites.push(
			GameEngine.GraphicsEngine.ResourceFactory.createSprite2D(
				characterSpriteSheetTexture,
				new GameEngine.GraphicsEngine.Vector2(1, 1),
				characterSpriteSize
			)
		);
		this.marioSprites.push(
			GameEngine.GraphicsEngine.ResourceFactory.createSprite2D(
				characterSpriteSheetTexture,
				new GameEngine.GraphicsEngine.Vector2(2, 1),
				characterSpriteSize
			)
		);
		this.marioSprites.push(
			GameEngine.GraphicsEngine.ResourceFactory.createSprite2D(
				characterSpriteSheetTexture,
				new GameEngine.GraphicsEngine.Vector2(3, 1),
				characterSpriteSize
			)
		);

		this.enemySpriteIndex = 0;
		this.enemySpriteFlipTime = 0.2;
		this.enemySpriteFlipTimeLeft = 0;
		this.enemySprites = [];
		this.enemySprites.push(
			GameEngine.GraphicsEngine.ResourceFactory.createSprite2D(
				characterSpriteSheetTexture,
				new GameEngine.GraphicsEngine.Vector2(0, 0),
				characterSpriteSize
			)
		);
		this.enemySprites.push(
			GameEngine.GraphicsEngine.ResourceFactory.createSprite2D(
				characterSpriteSheetTexture,
				new GameEngine.GraphicsEngine.Vector2(1, 0),
				characterSpriteSize
			)
		);

		this.enemyEntity = this.scene.createEntity("Enemy entity");
		const enemyTransformComponent = this.enemyEntity.getComponent(GameEngine.TransformComponent);
		enemyTransformComponent.position.setX(0.5);
		const enemySpriteComponent = this.enemyEntity.addComponent(GameEngine.Sprite2DRendererComponent);
		enemySpriteComponent.sprite = this.enemySprites[this.enemySpriteIndex];

		this.marioEntity = this.scene.createEntity("Mario entity");
		const marioTransformComponent = this.marioEntity.getComponent(GameEngine.TransformComponent);
		marioTransformComponent.position.setX(-0.5);
		marioTransformComponent.position.setZ(0.5);
		const marioSpriteComponent = this.marioEntity.addComponent(GameEngine.Sprite2DRendererComponent);
		marioSpriteComponent.sprite = this.marioSprites[this.marioSpriteIndex];
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
		const deltaTime = time.getDeltaTime() / 1000;
		this.marioSpriteFlipTimeLeft -= deltaTime;
		this.enemySpriteFlipTimeLeft -= deltaTime;

		if (this.marioSpriteFlipTimeLeft < 0) {
			this.marioSpriteFlipTimeLeft = this.marioSpriteFlipTime;
			this.marioSpriteIndex++;
			if (this.marioSpriteIndex >= this.marioSprites.length) {
				this.marioSpriteIndex = 0;
			}

			this.marioEntity.getComponent(GameEngine.Sprite2DRendererComponent).sprite = this.marioSprites[this.marioSpriteIndex];
		}

		if (this.enemySpriteFlipTimeLeft < 0) {
			this.enemySpriteFlipTimeLeft = this.enemySpriteFlipTime;
			this.enemySpriteIndex++;
			if (this.enemySpriteIndex >= this.enemySprites.length) {
				this.enemySpriteIndex = 0;
			}

			this.enemyEntity.getComponent(GameEngine.Sprite2DRendererComponent).sprite = this.enemySprites[this.enemySpriteIndex];
		}

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