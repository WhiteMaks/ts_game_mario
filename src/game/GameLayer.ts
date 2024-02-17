import characterSpriteSheetSrc from "../resources/character_spritesheet.png";
import decorationAndBlockSpriteSheetSrc from "../resources/decoration_and_block_spritesheet.png";
import {GameEngine} from "#game_engine/src/namespace/game_engine";

class GameLayer extends GameEngine.Layer.BaseLayer {
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

		this.initCharacters(context);
		this.initDecorationsAndBlocks(context);
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

	public update(time: GameEngine.Time): void {
		this.updateCharacters(time);

		this.scene.update(time);
	}

	public render(): void {
		GameEngine.Engine.renderer2D.resetStatistics();

		GameEngine.Engine.renderer2D.setClearColor(this.color);
		GameEngine.Engine.renderer2D.clear();

		this.scene.render();
	}

	public clean(): void {
		this.scene.clean();
		this.marioEntity.clean();
	}

	//todo перенести в скрипт после реализации системы анимаций
	private updateCharacters(time: GameEngine.Time): void {
		const deltaTime = time.getDeltaTimeSec();
		this.marioSpriteFlipTimeLeft -= deltaTime;
		this.enemySpriteFlipTimeLeft -= deltaTime;

		if (this.marioSpriteFlipTimeLeft < 0) {
			this.marioSpriteFlipTimeLeft = this.marioSpriteFlipTime;
			this.marioSpriteIndex++;
			if (this.marioSpriteIndex >= this.marioSprites.length) {
				this.marioSpriteIndex = 1;
			}

			this.marioEntity.getComponent(GameEngine.ECS.Sprite2DRendererComponent).sprite = this.marioSprites[this.marioSpriteIndex];
		}

		if (this.enemySpriteFlipTimeLeft < 0) {
			this.enemySpriteFlipTimeLeft = this.enemySpriteFlipTime;
			this.enemySpriteIndex++;
			if (this.enemySpriteIndex >= this.enemySprites.length) {
				this.enemySpriteIndex = 0;
			}

			this.enemyEntity.getComponent(GameEngine.ECS.Sprite2DRendererComponent).sprite = this.enemySprites[this.enemySpriteIndex];
		}
	}

	private initDecorationsAndBlocks(context: GameEngine.GraphicsEngine.IGraphicsContext): void {
		const decorationAndBlockSpriteSheetImage = new Image();
		decorationAndBlockSpriteSheetImage.src = decorationAndBlockSpriteSheetSrc;
		const decorationAndBlockSpriteSheetTexture = GameEngine.GraphicsEngine.ResourceFactory.create2DTexture(
			context,
			decorationAndBlockSpriteSheetImage,
			4
		);
		const decorationAndBlockSpriteSize = new GameEngine.GraphicsEngine.Vector2(16, 16);

		const blockSprite = GameEngine.GraphicsEngine.ResourceFactory.createSprite2D(
			decorationAndBlockSpriteSheetTexture,
			new GameEngine.GraphicsEngine.Vector2(1, 11),
			decorationAndBlockSpriteSize
		)

		for (let i = -9; i < 10; i++) {
			const blockEntity = this.scene.createEntity("Block[" + i + "] entity");
			const blockTransformComponent = blockEntity.getComponent(GameEngine.ECS.TransformComponent);
			blockTransformComponent.position.setY(-1);
			blockTransformComponent.position.setX(i);
			const blockSpriteComponent = blockEntity.addComponent(GameEngine.ECS.Sprite2DRendererComponent);
			blockSpriteComponent.sprite = blockSprite;
		}
	}

	private initCharacters(context: GameEngine.GraphicsEngine.IGraphicsContext): void {
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
		const enemySpriteComponent = this.enemyEntity.addComponent(GameEngine.ECS.Sprite2DRendererComponent);
		enemySpriteComponent.sprite = this.enemySprites[this.enemySpriteIndex];

		this.marioEntity = this.scene.createEntity("Mario entity");
		const marioTransformComponent = this.marioEntity.getComponent(GameEngine.ECS.TransformComponent);
		marioTransformComponent.position.setX(-9);
		const marioSpriteComponent = this.marioEntity.addComponent(GameEngine.ECS.Sprite2DRendererComponent);
		marioSpriteComponent.sprite = this.marioSprites[this.marioSpriteIndex];
		const cameraComponent = this.marioEntity.addComponent(GameEngine.ECS.CameraComponent);
		cameraComponent.camera = new GameEngine.GraphicsEngine.OrthographicCamera(
			this.graphicsElement.getWidth(),
			this.graphicsElement.getHeight(),
			5
		);
		cameraComponent.primary = true;
	}

}

export default GameLayer;