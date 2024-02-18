import {GameEngine} from "../../libs/game_engine/src/namespace/game_engine";

export class PlayerControllerScript extends GameEngine.ECS.BaseScript {
	private marioSpriteComponent!: GameEngine.ECS.Sprite2DRendererComponent;

	private marioIdleSprites!: GameEngine.GraphicsEngine.Sprite2D[];
	private marioIdleSpriteIndex!: number;
	private marioIdleSpriteFlipTime!: number;
	private marioIdleSpriteFlipTimeLeft!: number;

	private marioRunSprites!: GameEngine.GraphicsEngine.Sprite2D[];
	private marioRunSpriteIndex!: number;
	private marioRunSpriteFlipTime!: number;
	private marioRunSpriteFlipTimeLeft!: number;
	
	public init() {
		const spriteSheetComponent = this.getComponent(GameEngine.ECS.Texture2DRendererComponent);

		const spriteSheetTexture = spriteSheetComponent.texture;
		const spriteSize = new GameEngine.GraphicsEngine.Vector2(16, 16);

		this.marioIdleSpriteIndex = 0;
		this.marioIdleSpriteFlipTime = 0.2;
		this.marioIdleSpriteFlipTimeLeft = 0;
		this.marioIdleSprites = [];
		this.marioIdleSprites.push(
			GameEngine.GraphicsEngine.ResourceFactory.createSprite2D(
				spriteSheetTexture,
				new GameEngine.GraphicsEngine.Vector2(0, 1),
				spriteSize
			)
		);

		this.marioRunSpriteIndex = 0;
		this.marioRunSpriteFlipTime = 0.15;
		this.marioRunSpriteFlipTimeLeft = 0;
		this.marioRunSprites = [];
		this.marioRunSprites.push(
			GameEngine.GraphicsEngine.ResourceFactory.createSprite2D(
				spriteSheetTexture,
				new GameEngine.GraphicsEngine.Vector2(1, 1),
				spriteSize
			)
		);
		this.marioRunSprites.push(
			GameEngine.GraphicsEngine.ResourceFactory.createSprite2D(
				spriteSheetTexture,
				new GameEngine.GraphicsEngine.Vector2(2, 1),
				spriteSize
			)
		);
		this.marioRunSprites.push(
			GameEngine.GraphicsEngine.ResourceFactory.createSprite2D(
				spriteSheetTexture,
				new GameEngine.GraphicsEngine.Vector2(3, 1),
				spriteSize
			)
		);

		this.marioSpriteComponent = this.addComponent(GameEngine.ECS.Sprite2DRendererComponent);
		this.marioSpriteComponent.sprite = this.marioIdleSprites[this.marioIdleSpriteIndex];

		spriteSheetComponent.remove();
	}

	public update(time: GameEngine.Time): void {
		const deltaTime = time.getDeltaTimeSec();

		// if (
		// 	GameEngine.EventSystem.Input.isKeyboardKeyPressed(GameEngine.EventSystem.Key.D) ||
		// 	GameEngine.EventSystem.Input.isKeyboardKeyPressed(GameEngine.EventSystem.Key.A)
		// ) {
			this.updateRunFrame(deltaTime);
		// } else {
		// 	this.updateIdleFrame(deltaTime);
		// }
	}

	private updateIdleFrame(deltaTime: number): void {
		this.marioIdleSpriteFlipTimeLeft -= deltaTime;

		if (this.marioIdleSpriteFlipTimeLeft < 0) {
			this.marioIdleSpriteFlipTimeLeft = this.marioIdleSpriteFlipTime;
			this.marioIdleSpriteIndex++;
			if (this.marioIdleSpriteIndex >= this.marioIdleSprites.length) {
				this.marioIdleSpriteIndex = 0;
			}

			this.marioSpriteComponent.sprite = this.marioIdleSprites[this.marioIdleSpriteIndex];
		}
	}

	private updateRunFrame(deltaTime: number): void {
		this.marioRunSpriteFlipTimeLeft -= deltaTime;

		if (this.marioRunSpriteFlipTimeLeft < 0) {
			this.marioRunSpriteFlipTimeLeft = this.marioRunSpriteFlipTime;
			this.marioRunSpriteIndex++;
			if (this.marioRunSpriteIndex >= this.marioRunSprites.length) {
				this.marioRunSpriteIndex = 0;
			}

			this.marioSpriteComponent.sprite = this.marioRunSprites[this.marioRunSpriteIndex];
		}
	}

}