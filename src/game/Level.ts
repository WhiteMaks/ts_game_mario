import decorationAndBlockSpriteSheetSrc from "../resources/decoration_and_block_spritesheet.png";
import characterSpriteSheetSrc from "../resources/character_spritesheet.png";
import {WorldCreatorScript} from "./scripts/WorldCreatorScript";
import {PlayerControllerScript} from "./scripts/PlayerControllerScript";
import {EnemyCreatorScript} from "./scripts/EnemyCreatorScript";
import {GameEngine} from "../libs/game_engine/src/namespace/game_engine";

export class Level {
	private readonly scene: GameEngine.Scene;
	private readonly graphicsElement: GameEngine.GraphicsEngine.GraphicsElement;
	private readonly color: GameEngine.GraphicsEngine.Vector4;

	public constructor(scene: GameEngine.Scene, graphicsElement: GameEngine.GraphicsEngine.GraphicsElement) {
		this.scene = scene;
		this.graphicsElement = graphicsElement;

		this.color = new GameEngine.GraphicsEngine.Vector4(0.41, 0.57, 0.96, 1.0);

		const context = this.graphicsElement.getGraphicsContext();
		context.printDebugInfo();

		const decorationAndBlockSpriteSheetImage = new Image();
		decorationAndBlockSpriteSheetImage.src = decorationAndBlockSpriteSheetSrc;
		const decorationAndBlockSpriteSheetTexture = GameEngine.GraphicsEngine.ResourceFactory.create2DTexture(
			context,
			decorationAndBlockSpriteSheetImage,
			4
		);

		const characterSpriteSheetImage = new Image();
		characterSpriteSheetImage.src = characterSpriteSheetSrc;
		const characterSpriteSheetTexture = GameEngine.GraphicsEngine.ResourceFactory.create2DTexture(
			context,
			characterSpriteSheetImage,
			4
		);
		const characterSpriteSize = new GameEngine.GraphicsEngine.Vector2(16, 16);

		this.addWorldOnScene(decorationAndBlockSpriteSheetTexture);
		this.addMarioOnScene(characterSpriteSheetTexture, characterSpriteSize);
		this.addEnemiesOnScene(characterSpriteSheetTexture);
	}

	public resize(width: number, height: number): void {
		this.scene.resize(width, height);
	}

	public keyboardInput(event: GameEngine.EventSystem.KeyboardEvent): void {
	}

	public mouseInput(event: GameEngine.EventSystem.MouseEvent): void {
	}

	public update(time: GameEngine.Time): void {
		this.scene.update(time);
		// console.log(1 / time.getDeltaTimeSec());
	}

	public render(): void {
		GameEngine.Engine.renderer2D.resetStatistics();

		GameEngine.Engine.renderer2D.setClearColor(this.color);
		GameEngine.Engine.renderer2D.clear();

		this.scene.render();
		// console.log(GameEngine.Engine.renderer2D.getStatics());
	}

	public clean(): void {
		this.scene.clean();
	}

	private addWorldOnScene(decorationAndBlockSpriteSheetTexture: GameEngine.GraphicsEngine.ITexture): void {
		const worldEntity = this.scene.createEntity("World");
		const worldTextureComponent = worldEntity.addComponent(GameEngine.ECS.Texture2DRendererComponent);
		worldTextureComponent.texture = decorationAndBlockSpriteSheetTexture;
		worldEntity.addComponent(GameEngine.ECS.TypeScriptComponent).bind(WorldCreatorScript);
	}

	private addEnemiesOnScene(characterSpriteSheetTexture: GameEngine.GraphicsEngine.ITexture): void {
		const enemyEntity = this.scene.createEntity("Enemy");
		const enemyTransformComponent = enemyEntity.getComponent(GameEngine.ECS.TransformComponent);
		enemyTransformComponent.position.setX(9);
		enemyTransformComponent.position.setZ(0.5);
		const enemyCharactersTextureComponent = enemyEntity.addComponent(GameEngine.ECS.Texture2DRendererComponent);
		enemyCharactersTextureComponent.texture = characterSpriteSheetTexture;
		enemyEntity.addComponent(GameEngine.ECS.TypeScriptComponent).bind(EnemyCreatorScript);
	}

	private addMarioOnScene(
		characterSpriteSheetTexture: GameEngine.GraphicsEngine.ITexture,
		characterSpriteSize: GameEngine.GraphicsEngine.Vector2
	): void {
		const playerEntity = this.scene.createEntity("Player");
		playerEntity.addComponent(GameEngine.ECS.TypeScriptComponent).bind(PlayerControllerScript);
		const playerCameraComponent = playerEntity.addComponent(GameEngine.ECS.CameraComponent);
		playerCameraComponent.camera = new GameEngine.GraphicsEngine.OrthographicCamera(
			this.graphicsElement.getWidth(),
			this.graphicsElement.getHeight(),
			10
		);
		playerCameraComponent.primary = true;
		const playerSprite2DRendererComponent = playerEntity.addComponent(GameEngine.ECS.Sprite2DRendererComponent);
		const playerIdleSprite = GameEngine.GraphicsEngine.ResourceFactory.createSprite2D(
			characterSpriteSheetTexture,
			new GameEngine.GraphicsEngine.Vector2(0, 1),
			characterSpriteSize
		);
		playerSprite2DRendererComponent.sprite = playerIdleSprite;
		const playerStateMachineComponent = playerEntity.addComponent(GameEngine.ECS.State2DAnimationMachineComponent);
		const idle = new GameEngine.ECS.Animation2DSpriteState("Idle");
		const idleFrameTime = 2000;
		idle.addFrame(playerIdleSprite, idleFrameTime);
		const run = new GameEngine.ECS.Animation2DSpriteState("Run");
		const runFrameTime = 150;
		run.addFrame(
			GameEngine.GraphicsEngine.ResourceFactory.createSprite2D(
				characterSpriteSheetTexture,
				new GameEngine.GraphicsEngine.Vector2(1, 1),
				characterSpriteSize
			), runFrameTime);
		run.addFrame(
			GameEngine.GraphicsEngine.ResourceFactory.createSprite2D(
				characterSpriteSheetTexture,
				new GameEngine.GraphicsEngine.Vector2(2, 1),
				characterSpriteSize
			), runFrameTime);
		run.addFrame(
			GameEngine.GraphicsEngine.ResourceFactory.createSprite2D(
				characterSpriteSheetTexture,
				new GameEngine.GraphicsEngine.Vector2(3, 1),
				characterSpriteSize
			), runFrameTime);
		playerStateMachineComponent.addState(idle);
		playerStateMachineComponent.addState(run);
		playerStateMachineComponent.setDefaultStateName(idle.getName());
	}
}