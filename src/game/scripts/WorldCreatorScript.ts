import {GameEngine} from "../../libs/game_engine/src/namespace/game_engine";

export class WorldCreatorScript extends GameEngine.ECS.BaseScript {

	public init() {
		const scene = this.getScene();
		const spriteSheetComponent = this.getComponent(GameEngine.ECS.Texture2DRendererComponent);

		const spriteSheetTexture = spriteSheetComponent.texture;
		const spriteSize = new GameEngine.GraphicsEngine.Vector2(16, 16);

		this.createDecorations(scene, spriteSheetTexture, spriteSize);
		this.createObstacles(scene, spriteSheetTexture, spriteSize);

		spriteSheetComponent.remove();
	}

	public update(time: GameEngine.Time): void {
	}

	private createObstacles(
		scene: GameEngine.Scene,
		spriteSheetTexture: GameEngine.GraphicsEngine.ITexture,
		spriteSize: GameEngine.GraphicsEngine.Vector2
	): void {
		const floorSprite = GameEngine.GraphicsEngine.ResourceFactory.createSprite2D(
			spriteSheetTexture,
			new GameEngine.GraphicsEngine.Vector2(0, 11),
			spriteSize
		);

		const topLeftPipeSprite = GameEngine.GraphicsEngine.ResourceFactory.createSprite2D(
			spriteSheetTexture,
			new GameEngine.GraphicsEngine.Vector2(2, 2),
			spriteSize
		);

		const topRightPipeSprite = GameEngine.GraphicsEngine.ResourceFactory.createSprite2D(
			spriteSheetTexture,
			new GameEngine.GraphicsEngine.Vector2(3, 2),
			spriteSize
		);

		const bottomLeftPipeSprite = GameEngine.GraphicsEngine.ResourceFactory.createSprite2D(
			spriteSheetTexture,
			new GameEngine.GraphicsEngine.Vector2(5, 3),
			spriteSize
		);

		const bottomRightPipeSprite = GameEngine.GraphicsEngine.ResourceFactory.createSprite2D(
			spriteSheetTexture,
			new GameEngine.GraphicsEngine.Vector2(6, 3),
			spriteSize
		);

		this.createFloor(scene, floorSprite, -8, 61);

		this.createSmallPipe(
			scene,
			topLeftPipeSprite,
			topRightPipeSprite,
			bottomLeftPipeSprite,
			bottomRightPipeSprite,
			20, 0
		);

		this.createMediumPipe(
			scene,
			topLeftPipeSprite,
			topRightPipeSprite,
			bottomLeftPipeSprite,
			bottomRightPipeSprite,
			30, 0
		);

		this.createBigPipe(
			scene,
			topLeftPipeSprite,
			topRightPipeSprite,
			bottomLeftPipeSprite,
			bottomRightPipeSprite,
			38, 0
		);

		this.createBigPipe(
			scene,
			topLeftPipeSprite,
			topRightPipeSprite,
			bottomLeftPipeSprite,
			bottomRightPipeSprite,
			49, 0
		);
	}

	private createDecorations(
		scene: GameEngine.Scene,
		spriteSheetTexture: GameEngine.GraphicsEngine.ITexture,
		spriteSize: GameEngine.GraphicsEngine.Vector2
	): void {
		const leftBigHillSprite = GameEngine.GraphicsEngine.ResourceFactory.createSprite2D(
			spriteSheetTexture,
			new GameEngine.GraphicsEngine.Vector2(3, 5),
			spriteSize
		);

		const centreLeftBigHillSprite = GameEngine.GraphicsEngine.ResourceFactory.createSprite2D(
			spriteSheetTexture,
			new GameEngine.GraphicsEngine.Vector2(4, 5),
			spriteSize
		);

		const centreBigHillSprite = GameEngine.GraphicsEngine.ResourceFactory.createSprite2D(
			spriteSheetTexture,
			new GameEngine.GraphicsEngine.Vector2(3, 6),
			spriteSize
		);

		const centreRightBigHillSprite = GameEngine.GraphicsEngine.ResourceFactory.createSprite2D(
			spriteSheetTexture,
			new GameEngine.GraphicsEngine.Vector2(5, 6),
			spriteSize
		);

		const rightBigHillSprite = GameEngine.GraphicsEngine.ResourceFactory.createSprite2D(
			spriteSheetTexture,
			new GameEngine.GraphicsEngine.Vector2(5, 5),
			spriteSize
		);

		const topBigHillSprite = GameEngine.GraphicsEngine.ResourceFactory.createSprite2D(
			spriteSheetTexture,
			new GameEngine.GraphicsEngine.Vector2(4, 6),
			spriteSize
		);

		const leftBushSprite = GameEngine.GraphicsEngine.ResourceFactory.createSprite2D(
			spriteSheetTexture,
			new GameEngine.GraphicsEngine.Vector2(6, 5),
			spriteSize
		);

		const centerBushSprite = GameEngine.GraphicsEngine.ResourceFactory.createSprite2D(
			spriteSheetTexture,
			new GameEngine.GraphicsEngine.Vector2(6, 6),
			spriteSize
		);

		const rightBushSprite = GameEngine.GraphicsEngine.ResourceFactory.createSprite2D(
			spriteSheetTexture,
			new GameEngine.GraphicsEngine.Vector2(6, 7),
			spriteSize
		);

		const topLeftCloudSprite = GameEngine.GraphicsEngine.ResourceFactory.createSprite2D(
			spriteSheetTexture,
			new GameEngine.GraphicsEngine.Vector2(3, 4),
			spriteSize
		);

		const topCenterCloudSprite = GameEngine.GraphicsEngine.ResourceFactory.createSprite2D(
			spriteSheetTexture,
			new GameEngine.GraphicsEngine.Vector2(4, 4),
			spriteSize
		);

		const topRightCloudSprite = GameEngine.GraphicsEngine.ResourceFactory.createSprite2D(
			spriteSheetTexture,
			new GameEngine.GraphicsEngine.Vector2(5, 4),
			spriteSize
		);

		const bottomLeftCloudSprite = GameEngine.GraphicsEngine.ResourceFactory.createSprite2D(
			spriteSheetTexture,
			new GameEngine.GraphicsEngine.Vector2(2, 3),
			spriteSize
		);

		const bottomCenterCloudSprite = GameEngine.GraphicsEngine.ResourceFactory.createSprite2D(
			spriteSheetTexture,
			new GameEngine.GraphicsEngine.Vector2(3, 3),
			spriteSize
		);

		const bottomRightCloudSprite = GameEngine.GraphicsEngine.ResourceFactory.createSprite2D(
			spriteSheetTexture,
			new GameEngine.GraphicsEngine.Vector2(4, 3),
			spriteSize
		);

		this.createBigHill(
			scene,
			leftBigHillSprite,
			centreLeftBigHillSprite,
			centreBigHillSprite,
			centreRightBigHillSprite,
			rightBigHillSprite,
			topBigHillSprite,
			-8, 0, -0.5
		);

		this.createBigBush(
			scene,
			leftBushSprite,
			centerBushSprite,
			rightBushSprite,
			3, 0, -0.5
		);

		this.createSmallHill(
			scene,
			leftBigHillSprite,
			centreLeftBigHillSprite,
			rightBigHillSprite,
			topBigHillSprite,
			8, 0, -0.5
		);

		this.createSmallBush(
			scene,
			leftBushSprite,
			centerBushSprite,
			rightBushSprite,
			15, 0, -0.5
		);

		this.createMediumBush(
			scene,
			leftBushSprite,
			centerBushSprite,
			rightBushSprite,
			33, 0, -0.5
		);

		this.createBigHill(
			scene,
			leftBigHillSprite,
			centreLeftBigHillSprite,
			centreBigHillSprite,
			centreRightBigHillSprite,
			rightBigHillSprite,
			topBigHillSprite,
			40, 0, -0.5
		);

		this.createBigBush(
			scene,
			leftBushSprite,
			centerBushSprite,
			rightBushSprite,
			51, 0, -0.5
		);

		this.createSmallHill(
			scene,
			leftBigHillSprite,
			centreLeftBigHillSprite,
			rightBigHillSprite,
			topBigHillSprite,
			56, 0, -0.5
		);

		this.createSmallCloud(
			scene,
			topLeftCloudSprite,
			topCenterCloudSprite,
			topRightCloudSprite,
			bottomLeftCloudSprite,
			bottomCenterCloudSprite,
			bottomRightCloudSprite,
			0, 9, -0.5
		);

		this.createSmallCloud(
			scene,
			topLeftCloudSprite,
			topCenterCloudSprite,
			topRightCloudSprite,
			bottomLeftCloudSprite,
			bottomCenterCloudSprite,
			bottomRightCloudSprite,
			11, 10, -0.5
		);

		this.createBigCloud(
			scene,
			topLeftCloudSprite,
			topCenterCloudSprite,
			topRightCloudSprite,
			bottomLeftCloudSprite,
			bottomCenterCloudSprite,
			bottomRightCloudSprite,
			19, 9, -0.5
		);

		this.createMediumCloud(
			scene,
			topLeftCloudSprite,
			topCenterCloudSprite,
			topRightCloudSprite,
			bottomLeftCloudSprite,
			bottomCenterCloudSprite,
			bottomRightCloudSprite,
			28, 10, -0.5
		);

		this.createSmallCloud(
			scene,
			topLeftCloudSprite,
			topCenterCloudSprite,
			topRightCloudSprite,
			bottomLeftCloudSprite,
			bottomCenterCloudSprite,
			bottomRightCloudSprite,
			48, 9, -0.5
		);

		this.createSmallCloud(
			scene,
			topLeftCloudSprite,
			topCenterCloudSprite,
			topRightCloudSprite,
			bottomLeftCloudSprite,
			bottomCenterCloudSprite,
			bottomRightCloudSprite,
			59, 10, -0.5
		);
	}

	private createMediumCloud(
		scene: GameEngine.Scene,
		topLeft: GameEngine.GraphicsEngine.Sprite2D,
		topCenter: GameEngine.GraphicsEngine.Sprite2D,
		topRight: GameEngine.GraphicsEngine.Sprite2D,
		bottomLeft: GameEngine.GraphicsEngine.Sprite2D,
		bottomCenter: GameEngine.GraphicsEngine.Sprite2D,
		bottomRight: GameEngine.GraphicsEngine.Sprite2D,
		x: number, y: number, z: number
	): void {
		const topLeftEntity = scene.createEntity("Medium cloud [topLeft] entity");
		const topLeftTransformComponent = topLeftEntity.getComponent(GameEngine.ECS.TransformComponent);
		topLeftTransformComponent.position.setX(x);
		topLeftTransformComponent.position.setY(y + 1);
		topLeftTransformComponent.position.setZ(z);
		const topLeftSpriteComponent = topLeftEntity.addComponent(GameEngine.ECS.Sprite2DRendererComponent);
		topLeftSpriteComponent.sprite = topLeft;

		const topCenterEntity = scene.createEntity("Medium cloud [topCenter] entity");
		const topCenterTransformComponent = topCenterEntity.getComponent(GameEngine.ECS.TransformComponent);
		topCenterTransformComponent.position.setX(x + 1);
		topCenterTransformComponent.position.setY(y + 1);
		topCenterTransformComponent.position.setZ(z);
		const topCenterSpriteComponent = topCenterEntity.addComponent(GameEngine.ECS.Sprite2DRendererComponent);
		topCenterSpriteComponent.sprite = topCenter;

		const topCenter2Entity = scene.createEntity("Medium cloud [topCenter 2] entity");
		const topCenter2TransformComponent = topCenter2Entity.getComponent(GameEngine.ECS.TransformComponent);
		topCenter2TransformComponent.position.setX(x + 2);
		topCenter2TransformComponent.position.setY(y + 1);
		topCenter2TransformComponent.position.setZ(z);
		const topCenter2SpriteComponent = topCenter2Entity.addComponent(GameEngine.ECS.Sprite2DRendererComponent);
		topCenter2SpriteComponent.sprite = topCenter;

		const topRightEntity = scene.createEntity("Medium cloud [topRight] entity");
		const topRightTransformComponent = topRightEntity.getComponent(GameEngine.ECS.TransformComponent);
		topRightTransformComponent.position.setX(x + 3);
		topRightTransformComponent.position.setY(y + 1);
		topRightTransformComponent.position.setZ(z);
		const topRightSpriteComponent = topRightEntity.addComponent(GameEngine.ECS.Sprite2DRendererComponent);
		topRightSpriteComponent.sprite = topRight;

		const bottomLeftEntity = scene.createEntity("Medium cloud [bottomLeft] entity");
		const bottomLeftTransformComponent = bottomLeftEntity.getComponent(GameEngine.ECS.TransformComponent);
		bottomLeftTransformComponent.position.setX(x);
		bottomLeftTransformComponent.position.setY(y);
		bottomLeftTransformComponent.position.setZ(z);
		const bottomLeftSpriteComponent = bottomLeftEntity.addComponent(GameEngine.ECS.Sprite2DRendererComponent);
		bottomLeftSpriteComponent.sprite = bottomLeft;

		const bottomCenterEntity = scene.createEntity("Medium cloud [bottomCenter] entity");
		const bottomCenterTransformComponent = bottomCenterEntity.getComponent(GameEngine.ECS.TransformComponent);
		bottomCenterTransformComponent.position.setX(x + 1);
		bottomCenterTransformComponent.position.setY(y);
		bottomCenterTransformComponent.position.setZ(z);
		const bottomCenterSpriteComponent = bottomCenterEntity.addComponent(GameEngine.ECS.Sprite2DRendererComponent);
		bottomCenterSpriteComponent.sprite = bottomCenter;

		const bottomCenter2Entity = scene.createEntity("Medium cloud [bottomCenter 2] entity");
		const bottomCenter2TransformComponent = bottomCenter2Entity.getComponent(GameEngine.ECS.TransformComponent);
		bottomCenter2TransformComponent.position.setX(x + 2);
		bottomCenter2TransformComponent.position.setY(y);
		bottomCenter2TransformComponent.position.setZ(z);
		const bottomCenter2SpriteComponent = bottomCenter2Entity.addComponent(GameEngine.ECS.Sprite2DRendererComponent);
		bottomCenter2SpriteComponent.sprite = bottomCenter;

		const bottomRightEntity = scene.createEntity("Medium cloud [bottomRight] entity");
		const bottomRightTransformComponent = bottomRightEntity.getComponent(GameEngine.ECS.TransformComponent);
		bottomRightTransformComponent.position.setX(x + 3);
		bottomRightTransformComponent.position.setY(y);
		bottomRightTransformComponent.position.setZ(z);
		const bottomRightSpriteComponent = bottomRightEntity.addComponent(GameEngine.ECS.Sprite2DRendererComponent);
		bottomRightSpriteComponent.sprite = bottomRight;
	}

	private createBigCloud(
		scene: GameEngine.Scene,
		topLeft: GameEngine.GraphicsEngine.Sprite2D,
		topCenter: GameEngine.GraphicsEngine.Sprite2D,
		topRight: GameEngine.GraphicsEngine.Sprite2D,
		bottomLeft: GameEngine.GraphicsEngine.Sprite2D,
		bottomCenter: GameEngine.GraphicsEngine.Sprite2D,
		bottomRight: GameEngine.GraphicsEngine.Sprite2D,
		x: number, y: number, z: number
	): void {
		const topLeftEntity = scene.createEntity("Bid cloud [topLeft] entity");
		const topLeftTransformComponent = topLeftEntity.getComponent(GameEngine.ECS.TransformComponent);
		topLeftTransformComponent.position.setX(x);
		topLeftTransformComponent.position.setY(y + 1);
		topLeftTransformComponent.position.setZ(z);
		const topLeftSpriteComponent = topLeftEntity.addComponent(GameEngine.ECS.Sprite2DRendererComponent);
		topLeftSpriteComponent.sprite = topLeft;

		const topCenterEntity = scene.createEntity("Bid cloud [topCenter] entity");
		const topCenterTransformComponent = topCenterEntity.getComponent(GameEngine.ECS.TransformComponent);
		topCenterTransformComponent.position.setX(x + 1);
		topCenterTransformComponent.position.setY(y + 1);
		topCenterTransformComponent.position.setZ(z);
		const topCenterSpriteComponent = topCenterEntity.addComponent(GameEngine.ECS.Sprite2DRendererComponent);
		topCenterSpriteComponent.sprite = topCenter;

		const topCenter2Entity = scene.createEntity("Bid cloud [topCenter 2] entity");
		const topCenter2TransformComponent = topCenter2Entity.getComponent(GameEngine.ECS.TransformComponent);
		topCenter2TransformComponent.position.setX(x + 2);
		topCenter2TransformComponent.position.setY(y + 1);
		topCenter2TransformComponent.position.setZ(z);
		const topCenter2SpriteComponent = topCenter2Entity.addComponent(GameEngine.ECS.Sprite2DRendererComponent);
		topCenter2SpriteComponent.sprite = topCenter;

		const topCenter3Entity = scene.createEntity("Bid cloud [topCenter 3] entity");
		const topCenter3TransformComponent = topCenter3Entity.getComponent(GameEngine.ECS.TransformComponent);
		topCenter3TransformComponent.position.setX(x + 3);
		topCenter3TransformComponent.position.setY(y + 1);
		topCenter3TransformComponent.position.setZ(z);
		const topCenter3SpriteComponent = topCenter3Entity.addComponent(GameEngine.ECS.Sprite2DRendererComponent);
		topCenter3SpriteComponent.sprite = topCenter;

		const topRightEntity = scene.createEntity("Big cloud [topRight] entity");
		const topRightTransformComponent = topRightEntity.getComponent(GameEngine.ECS.TransformComponent);
		topRightTransformComponent.position.setX(x + 4);
		topRightTransformComponent.position.setY(y + 1);
		topRightTransformComponent.position.setZ(z);
		const topRightSpriteComponent = topRightEntity.addComponent(GameEngine.ECS.Sprite2DRendererComponent);
		topRightSpriteComponent.sprite = topRight;

		const bottomLeftEntity = scene.createEntity("Big cloud [bottomLeft] entity");
		const bottomLeftTransformComponent = bottomLeftEntity.getComponent(GameEngine.ECS.TransformComponent);
		bottomLeftTransformComponent.position.setX(x);
		bottomLeftTransformComponent.position.setY(y);
		bottomLeftTransformComponent.position.setZ(z);
		const bottomLeftSpriteComponent = bottomLeftEntity.addComponent(GameEngine.ECS.Sprite2DRendererComponent);
		bottomLeftSpriteComponent.sprite = bottomLeft;

		const bottomCenterEntity = scene.createEntity("Big cloud [bottomCenter] entity");
		const bottomCenterTransformComponent = bottomCenterEntity.getComponent(GameEngine.ECS.TransformComponent);
		bottomCenterTransformComponent.position.setX(x + 1);
		bottomCenterTransformComponent.position.setY(y);
		bottomCenterTransformComponent.position.setZ(z);
		const bottomCenterSpriteComponent = bottomCenterEntity.addComponent(GameEngine.ECS.Sprite2DRendererComponent);
		bottomCenterSpriteComponent.sprite = bottomCenter;

		const bottomCenter2Entity = scene.createEntity("Big cloud [bottomCenter 2] entity");
		const bottomCenter2TransformComponent = bottomCenter2Entity.getComponent(GameEngine.ECS.TransformComponent);
		bottomCenter2TransformComponent.position.setX(x + 2);
		bottomCenter2TransformComponent.position.setY(y);
		bottomCenter2TransformComponent.position.setZ(z);
		const bottomCenter2SpriteComponent = bottomCenter2Entity.addComponent(GameEngine.ECS.Sprite2DRendererComponent);
		bottomCenter2SpriteComponent.sprite = bottomCenter;

		const bottomCenter3Entity = scene.createEntity("Big cloud [bottomCenter 3] entity");
		const bottomCenter3TransformComponent = bottomCenter3Entity.getComponent(GameEngine.ECS.TransformComponent);
		bottomCenter3TransformComponent.position.setX(x + 3);
		bottomCenter3TransformComponent.position.setY(y);
		bottomCenter3TransformComponent.position.setZ(z);
		const bottomCenter3SpriteComponent = bottomCenter3Entity.addComponent(GameEngine.ECS.Sprite2DRendererComponent);
		bottomCenter3SpriteComponent.sprite = bottomCenter;

		const bottomRightEntity = scene.createEntity("Big cloud [bottomRight] entity");
		const bottomRightTransformComponent = bottomRightEntity.getComponent(GameEngine.ECS.TransformComponent);
		bottomRightTransformComponent.position.setX(x + 4);
		bottomRightTransformComponent.position.setY(y);
		bottomRightTransformComponent.position.setZ(z);
		const bottomRightSpriteComponent = bottomRightEntity.addComponent(GameEngine.ECS.Sprite2DRendererComponent);
		bottomRightSpriteComponent.sprite = bottomRight;
	}

	private createSmallCloud(
		scene: GameEngine.Scene,
		topLeft: GameEngine.GraphicsEngine.Sprite2D,
		topCenter: GameEngine.GraphicsEngine.Sprite2D,
		topRight: GameEngine.GraphicsEngine.Sprite2D,
		bottomLeft: GameEngine.GraphicsEngine.Sprite2D,
		bottomCenter: GameEngine.GraphicsEngine.Sprite2D,
		bottomRight: GameEngine.GraphicsEngine.Sprite2D,
		x: number, y: number, z: number
	): void {
		const topLeftEntity = scene.createEntity("Small cloud [topLeft] entity");
		const topLeftTransformComponent = topLeftEntity.getComponent(GameEngine.ECS.TransformComponent);
		topLeftTransformComponent.position.setX(x);
		topLeftTransformComponent.position.setY(y + 1);
		topLeftTransformComponent.position.setZ(z);
		const topLeftSpriteComponent = topLeftEntity.addComponent(GameEngine.ECS.Sprite2DRendererComponent);
		topLeftSpriteComponent.sprite = topLeft;

		const topCenterEntity = scene.createEntity("Small cloud [topCenter] entity");
		const topCenterTransformComponent = topCenterEntity.getComponent(GameEngine.ECS.TransformComponent);
		topCenterTransformComponent.position.setX(x + 1);
		topCenterTransformComponent.position.setY(y + 1);
		topCenterTransformComponent.position.setZ(z);
		const topCenterSpriteComponent = topCenterEntity.addComponent(GameEngine.ECS.Sprite2DRendererComponent);
		topCenterSpriteComponent.sprite = topCenter;

		const topRightEntity = scene.createEntity("Small cloud [topRight] entity");
		const topRightTransformComponent = topRightEntity.getComponent(GameEngine.ECS.TransformComponent);
		topRightTransformComponent.position.setX(x + 2);
		topRightTransformComponent.position.setY(y + 1);
		topRightTransformComponent.position.setZ(z);
		const topRightSpriteComponent = topRightEntity.addComponent(GameEngine.ECS.Sprite2DRendererComponent);
		topRightSpriteComponent.sprite = topRight;

		const bottomLeftEntity = scene.createEntity("Small cloud [bottomLeft] entity");
		const bottomLeftTransformComponent = bottomLeftEntity.getComponent(GameEngine.ECS.TransformComponent);
		bottomLeftTransformComponent.position.setX(x);
		bottomLeftTransformComponent.position.setY(y);
		bottomLeftTransformComponent.position.setZ(z);
		const bottomLeftSpriteComponent = bottomLeftEntity.addComponent(GameEngine.ECS.Sprite2DRendererComponent);
		bottomLeftSpriteComponent.sprite = bottomLeft;

		const bottomCenterEntity = scene.createEntity("Small cloud [bottomCenter] entity");
		const bottomCenterTransformComponent = bottomCenterEntity.getComponent(GameEngine.ECS.TransformComponent);
		bottomCenterTransformComponent.position.setX(x + 1);
		bottomCenterTransformComponent.position.setY(y);
		bottomCenterTransformComponent.position.setZ(z);
		const bottomCenterSpriteComponent = bottomCenterEntity.addComponent(GameEngine.ECS.Sprite2DRendererComponent);
		bottomCenterSpriteComponent.sprite = bottomCenter;

		const bottomRightEntity = scene.createEntity("Small cloud [bottomRight] entity");
		const bottomRightTransformComponent = bottomRightEntity.getComponent(GameEngine.ECS.TransformComponent);
		bottomRightTransformComponent.position.setX(x + 2);
		bottomRightTransformComponent.position.setY(y);
		bottomRightTransformComponent.position.setZ(z);
		const bottomRightSpriteComponent = bottomRightEntity.addComponent(GameEngine.ECS.Sprite2DRendererComponent);
		bottomRightSpriteComponent.sprite = bottomRight;
	}

	private createSmallBush(
		scene: GameEngine.Scene,
		left: GameEngine.GraphicsEngine.Sprite2D,
		center: GameEngine.GraphicsEngine.Sprite2D,
		right: GameEngine.GraphicsEngine.Sprite2D,
		x: number, y: number, z: number
	): void {
		const leftEntity = scene.createEntity("Small Bush [left] entity");
		const leftTransformComponent = leftEntity.getComponent(GameEngine.ECS.TransformComponent);
		leftTransformComponent.position.setX(x);
		leftTransformComponent.position.setY(y);
		leftTransformComponent.position.setZ(z);
		const leftSpriteComponent = leftEntity.addComponent(GameEngine.ECS.Sprite2DRendererComponent);
		leftSpriteComponent.sprite = left;

		const centerEntity = scene.createEntity("Small Bush [center] entity");
		const centerTransformComponent = centerEntity.getComponent(GameEngine.ECS.TransformComponent);
		centerTransformComponent.position.setX(x + 1);
		centerTransformComponent.position.setY(y);
		centerTransformComponent.position.setZ(z);
		const centerSpriteComponent = centerEntity.addComponent(GameEngine.ECS.Sprite2DRendererComponent);
		centerSpriteComponent.sprite = center;

		const rightEntity = scene.createEntity("Small Bush [right] entity");
		const rightTransformComponent = rightEntity.getComponent(GameEngine.ECS.TransformComponent);
		rightTransformComponent.position.setX(x + 2);
		rightTransformComponent.position.setY(y);
		rightTransformComponent.position.setZ(z);
		const rightSpriteComponent = rightEntity.addComponent(GameEngine.ECS.Sprite2DRendererComponent);
		rightSpriteComponent.sprite = right;
	}

	private createMediumBush(
		scene: GameEngine.Scene,
		left: GameEngine.GraphicsEngine.Sprite2D,
		center: GameEngine.GraphicsEngine.Sprite2D,
		right: GameEngine.GraphicsEngine.Sprite2D,
		x: number, y: number, z: number
	): void {
		const leftEntity = scene.createEntity("Big Bush [left] entity");
		const leftTransformComponent = leftEntity.getComponent(GameEngine.ECS.TransformComponent);
		leftTransformComponent.position.setX(x);
		leftTransformComponent.position.setY(y);
		leftTransformComponent.position.setZ(z);
		const leftSpriteComponent = leftEntity.addComponent(GameEngine.ECS.Sprite2DRendererComponent);
		leftSpriteComponent.sprite = left;

		const centerLeftEntity = scene.createEntity("Big Bush [center left] entity");
		const centerLeftTransformComponent = centerLeftEntity.getComponent(GameEngine.ECS.TransformComponent);
		centerLeftTransformComponent.position.setX(x + 1);
		centerLeftTransformComponent.position.setY(y);
		centerLeftTransformComponent.position.setZ(z);
		const centerLeftSpriteComponent = centerLeftEntity.addComponent(GameEngine.ECS.Sprite2DRendererComponent);
		centerLeftSpriteComponent.sprite = center;

		const centerRightEntity = scene.createEntity("Big Bush [center right] entity");
		const centerRightTransformComponent = centerRightEntity.getComponent(GameEngine.ECS.TransformComponent);
		centerRightTransformComponent.position.setX(x + 2);
		centerRightTransformComponent.position.setY(y);
		centerRightTransformComponent.position.setZ(z);
		const centerRightSpriteComponent = centerRightEntity.addComponent(GameEngine.ECS.Sprite2DRendererComponent);
		centerRightSpriteComponent.sprite = center;

		const rightEntity = scene.createEntity("Big Bush [right] entity");
		const rightTransformComponent = rightEntity.getComponent(GameEngine.ECS.TransformComponent);
		rightTransformComponent.position.setX(x + 3);
		rightTransformComponent.position.setY(y);
		rightTransformComponent.position.setZ(z);
		const rightSpriteComponent = rightEntity.addComponent(GameEngine.ECS.Sprite2DRendererComponent);
		rightSpriteComponent.sprite = right;
	}

	private createBigBush(
		scene: GameEngine.Scene,
		left: GameEngine.GraphicsEngine.Sprite2D,
		center: GameEngine.GraphicsEngine.Sprite2D,
		right: GameEngine.GraphicsEngine.Sprite2D,
		x: number, y: number, z: number
	): void {
		const leftEntity = scene.createEntity("Big Bush [left] entity");
		const leftTransformComponent = leftEntity.getComponent(GameEngine.ECS.TransformComponent);
		leftTransformComponent.position.setX(x);
		leftTransformComponent.position.setY(y);
		leftTransformComponent.position.setZ(z);
		const leftSpriteComponent = leftEntity.addComponent(GameEngine.ECS.Sprite2DRendererComponent);
		leftSpriteComponent.sprite = left;

		const centerLeftEntity = scene.createEntity("Big Bush [center left] entity");
		const centerLeftTransformComponent = centerLeftEntity.getComponent(GameEngine.ECS.TransformComponent);
		centerLeftTransformComponent.position.setX(x + 1);
		centerLeftTransformComponent.position.setY(y);
		centerLeftTransformComponent.position.setZ(z);
		const centerLeftSpriteComponent = centerLeftEntity.addComponent(GameEngine.ECS.Sprite2DRendererComponent);
		centerLeftSpriteComponent.sprite = center;

		const centerEntity = scene.createEntity("Big Bush [center] entity");
		const centerTransformComponent = centerEntity.getComponent(GameEngine.ECS.TransformComponent);
		centerTransformComponent.position.setX(x + 2);
		centerTransformComponent.position.setY(y);
		centerTransformComponent.position.setZ(z);
		const centerSpriteComponent = centerEntity.addComponent(GameEngine.ECS.Sprite2DRendererComponent);
		centerSpriteComponent.sprite = center;

		const centerRightEntity = scene.createEntity("Big Bush [center right] entity");
		const centerRightTransformComponent = centerRightEntity.getComponent(GameEngine.ECS.TransformComponent);
		centerRightTransformComponent.position.setX(x + 3);
		centerRightTransformComponent.position.setY(y);
		centerRightTransformComponent.position.setZ(z);
		const centerRightSpriteComponent = centerRightEntity.addComponent(GameEngine.ECS.Sprite2DRendererComponent);
		centerRightSpriteComponent.sprite = center;

		const rightEntity = scene.createEntity("Big Bush [right] entity");
		const rightTransformComponent = rightEntity.getComponent(GameEngine.ECS.TransformComponent);
		rightTransformComponent.position.setX(x + 4);
		rightTransformComponent.position.setY(y);
		rightTransformComponent.position.setZ(z);
		const rightSpriteComponent = rightEntity.addComponent(GameEngine.ECS.Sprite2DRendererComponent);
		rightSpriteComponent.sprite = right;
	}

	private createSmallHill(
		scene: GameEngine.Scene,
		left: GameEngine.GraphicsEngine.Sprite2D,
		center: GameEngine.GraphicsEngine.Sprite2D,
		right: GameEngine.GraphicsEngine.Sprite2D,
		top: GameEngine.GraphicsEngine.Sprite2D,
		x: number, y: number, z: number
	): void {
		const bottomLeftEntity = scene.createEntity("Small Hill [bottom left] entity");
		const bottomLeftTransformComponent = bottomLeftEntity.getComponent(GameEngine.ECS.TransformComponent);
		bottomLeftTransformComponent.position.setX(x);
		bottomLeftTransformComponent.position.setY(y);
		bottomLeftTransformComponent.position.setZ(z);
		const bottomLeftSpriteComponent = bottomLeftEntity.addComponent(GameEngine.ECS.Sprite2DRendererComponent);
		bottomLeftSpriteComponent.sprite = left;

		const bottomCenterEntity = scene.createEntity("Small Hill [bottom center] entity");
		const bottomCenterTransformComponent = bottomCenterEntity.getComponent(GameEngine.ECS.TransformComponent);
		bottomCenterTransformComponent.position.setX(x + 1);
		bottomCenterTransformComponent.position.setY(y);
		bottomCenterTransformComponent.position.setZ(z);
		const bottomCenterSpriteComponent = bottomCenterEntity.addComponent(GameEngine.ECS.Sprite2DRendererComponent);
		bottomCenterSpriteComponent.sprite = center;

		const bottomRightEntity = scene.createEntity("Small Hill [bottom right] entity");
		const bottomRightTransformComponent = bottomRightEntity.getComponent(GameEngine.ECS.TransformComponent);
		bottomRightTransformComponent.position.setX(x + 2);
		bottomRightTransformComponent.position.setY(y);
		bottomRightTransformComponent.position.setZ(z);
		const bottomRightSpriteComponent = bottomRightEntity.addComponent(GameEngine.ECS.Sprite2DRendererComponent);
		bottomRightSpriteComponent.sprite = right;

		const topEntity = scene.createEntity("Small Hill [top] entity");
		const topTransformComponent = topEntity.getComponent(GameEngine.ECS.TransformComponent);
		topTransformComponent.position.setX(x + 1);
		topTransformComponent.position.setY(y + 1);
		topTransformComponent.position.setZ(z);
		const topSpriteComponent = topEntity.addComponent(GameEngine.ECS.Sprite2DRendererComponent);
		topSpriteComponent.sprite = top;
	}

	private createBigHill(
		scene: GameEngine.Scene,
		left: GameEngine.GraphicsEngine.Sprite2D,
		centerLeft: GameEngine.GraphicsEngine.Sprite2D,
		center: GameEngine.GraphicsEngine.Sprite2D,
		centerRight: GameEngine.GraphicsEngine.Sprite2D,
		right: GameEngine.GraphicsEngine.Sprite2D,
		top: GameEngine.GraphicsEngine.Sprite2D,
		x: number, y: number, z: number
	): void {
		const bottomLeftEntity = scene.createEntity("Big Hill [bottom left] entity");
		const bottomLeftTransformComponent = bottomLeftEntity.getComponent(GameEngine.ECS.TransformComponent);
		bottomLeftTransformComponent.position.setX(x);
		bottomLeftTransformComponent.position.setY(y);
		bottomLeftTransformComponent.position.setZ(z);
		const bottomLeftSpriteComponent = bottomLeftEntity.addComponent(GameEngine.ECS.Sprite2DRendererComponent);
		bottomLeftSpriteComponent.sprite = left;

		const bottomCenterLeftEntity = scene.createEntity("Big Hill [bottom center left] entity");
		const bottomCenterLeftTransformComponent = bottomCenterLeftEntity.getComponent(GameEngine.ECS.TransformComponent);
		bottomCenterLeftTransformComponent.position.setX(x + 1);
		bottomCenterLeftTransformComponent.position.setY(y);
		bottomCenterLeftTransformComponent.position.setZ(z);
		const bottomCenterLeftSpriteComponent = bottomCenterLeftEntity.addComponent(GameEngine.ECS.Sprite2DRendererComponent);
		bottomCenterLeftSpriteComponent.sprite = centerLeft;

		const bottomCenterEntity = scene.createEntity("Big Hill [bottom center] entity");
		const bottomCenterTransformComponent = bottomCenterEntity.getComponent(GameEngine.ECS.TransformComponent);
		bottomCenterTransformComponent.position.setX(x + 2);
		bottomCenterTransformComponent.position.setY(y);
		bottomCenterTransformComponent.position.setZ(z);
		const bottomCenterSpriteComponent = bottomCenterEntity.addComponent(GameEngine.ECS.Sprite2DRendererComponent);
		bottomCenterSpriteComponent.sprite = center;

		const bottomCenterRightEntity = scene.createEntity("Big Hill [bottom center right] entity");
		const bottomCenterRightTransformComponent = bottomCenterRightEntity.getComponent(GameEngine.ECS.TransformComponent);
		bottomCenterRightTransformComponent.position.setX(x + 3);
		bottomCenterRightTransformComponent.position.setY(y);
		bottomCenterRightTransformComponent.position.setZ(z);
		const bottomCenterRightSpriteComponent = bottomCenterRightEntity.addComponent(GameEngine.ECS.Sprite2DRendererComponent);
		bottomCenterRightSpriteComponent.sprite = centerRight;

		const bottomRightEntity = scene.createEntity("Big Hill [bottom right] entity");
		const bottomRightTransformComponent = bottomRightEntity.getComponent(GameEngine.ECS.TransformComponent);
		bottomRightTransformComponent.position.setX(x + 4);
		bottomRightTransformComponent.position.setY(y);
		bottomRightTransformComponent.position.setZ(z);
		const bottomRightSpriteComponent = bottomRightEntity.addComponent(GameEngine.ECS.Sprite2DRendererComponent);
		bottomRightSpriteComponent.sprite = right;

		const topLeftEntity = scene.createEntity("Big Hill [top left] entity");
		const topLeftTransformComponent = topLeftEntity.getComponent(GameEngine.ECS.TransformComponent);
		topLeftTransformComponent.position.setX(x + 1);
		topLeftTransformComponent.position.setY(y + 1);
		topLeftTransformComponent.position.setZ(z);
		const topLeftSpriteComponent = topLeftEntity.addComponent(GameEngine.ECS.Sprite2DRendererComponent);
		topLeftSpriteComponent.sprite = left;

		const topCentreEntity = scene.createEntity("Big Hill [top centre] entity");
		const topCenterTransformComponent = topCentreEntity.getComponent(GameEngine.ECS.TransformComponent);
		topCenterTransformComponent.position.setX(x + 2);
		topCenterTransformComponent.position.setY(y + 1);
		topCenterTransformComponent.position.setZ(z);
		const topCenterSpriteComponent = topCentreEntity.addComponent(GameEngine.ECS.Sprite2DRendererComponent);
		topCenterSpriteComponent.sprite = centerLeft;

		const topRightEntity = scene.createEntity("Big Hill [top right] entity");
		const topRightTransformComponent = topRightEntity.getComponent(GameEngine.ECS.TransformComponent);
		topRightTransformComponent.position.setX(x + 3);
		topRightTransformComponent.position.setY(y + 1);
		topRightTransformComponent.position.setZ(z);
		const topRightSpriteComponent = topRightEntity.addComponent(GameEngine.ECS.Sprite2DRendererComponent);
		topRightSpriteComponent.sprite = right;

		const topEntity = scene.createEntity("Big Hill [top] entity");
		const topTransformComponent = topEntity.getComponent(GameEngine.ECS.TransformComponent);
		topTransformComponent.position.setX(x + 2);
		topTransformComponent.position.setY(y + 2);
		topTransformComponent.position.setZ(z);
		const topSpriteComponent = topEntity.addComponent(GameEngine.ECS.Sprite2DRendererComponent);
		topSpriteComponent.sprite = top;
	}

	private createFloor(scene: GameEngine.Scene, sprite: GameEngine.GraphicsEngine.Sprite2D, fromX: number, toX: number): void {
		for (let row = -1; row > -3; row--) {
			for (let column = fromX; column < toX; column++) {
				const blockEntity = scene.createEntity("Floor[" + row + "][" + column + "] entity");
				const blockTransformComponent = blockEntity.getComponent(GameEngine.ECS.TransformComponent);
				blockTransformComponent.position.setX(column);
				blockTransformComponent.position.setY(row);
				const blockSpriteComponent = blockEntity.addComponent(GameEngine.ECS.Sprite2DRendererComponent);
				blockSpriteComponent.sprite = sprite;
			}
		}
	}

	private createBigPipe(
		scene: GameEngine.Scene,
		topLeft: GameEngine.GraphicsEngine.Sprite2D,
		topRight: GameEngine.GraphicsEngine.Sprite2D,
		bottomLeft: GameEngine.GraphicsEngine.Sprite2D,
		bottomRight: GameEngine.GraphicsEngine.Sprite2D,
		x: number, y: number, z: number = 0.1
	): void {
		this.createMediumPipe(scene, topLeft, topRight, bottomLeft, bottomRight, x, y + 1, z);

		const bottomLeftEntity = scene.createEntity("Big Pipe [bottom left] entity");
		const bottomLeftTransformComponent = bottomLeftEntity.getComponent(GameEngine.ECS.TransformComponent);
		bottomLeftTransformComponent.position.setX(x);
		bottomLeftTransformComponent.position.setY(y);
		bottomLeftTransformComponent.position.setZ(z);
		const bottomLeftSpriteComponent = bottomLeftEntity.addComponent(GameEngine.ECS.Sprite2DRendererComponent);
		bottomLeftSpriteComponent.sprite = bottomLeft;

		const bottomRightEntity = scene.createEntity("Big Pipe [bottom right] entity");
		const bottomRightTransformComponent = bottomRightEntity.getComponent(GameEngine.ECS.TransformComponent);
		bottomRightTransformComponent.position.setX(x + 1);
		bottomRightTransformComponent.position.setY(y);
		bottomRightTransformComponent.position.setZ(z);
		const bottomRightSpriteComponent = bottomRightEntity.addComponent(GameEngine.ECS.Sprite2DRendererComponent);
		bottomRightSpriteComponent.sprite = bottomRight;
	}

	private createMediumPipe(
		scene: GameEngine.Scene,
		topLeft: GameEngine.GraphicsEngine.Sprite2D,
		topRight: GameEngine.GraphicsEngine.Sprite2D,
		bottomLeft: GameEngine.GraphicsEngine.Sprite2D,
		bottomRight: GameEngine.GraphicsEngine.Sprite2D,
		x: number, y: number, z: number = 0.1
	): void {
		this.createSmallPipe(scene, topLeft, topRight, bottomLeft, bottomRight, x, y + 1, z);

		const bottomLeftEntity = scene.createEntity("Medium Pipe [bottom left] entity");
		const bottomLeftTransformComponent = bottomLeftEntity.getComponent(GameEngine.ECS.TransformComponent);
		bottomLeftTransformComponent.position.setX(x);
		bottomLeftTransformComponent.position.setY(y);
		bottomLeftTransformComponent.position.setZ(z);
		const bottomLeftSpriteComponent = bottomLeftEntity.addComponent(GameEngine.ECS.Sprite2DRendererComponent);
		bottomLeftSpriteComponent.sprite = bottomLeft;

		const bottomRightEntity = scene.createEntity("Medium Pipe [bottom right] entity");
		const bottomRightTransformComponent = bottomRightEntity.getComponent(GameEngine.ECS.TransformComponent);
		bottomRightTransformComponent.position.setX(x + 1);
		bottomRightTransformComponent.position.setY(y);
		bottomRightTransformComponent.position.setZ(z);
		const bottomRightSpriteComponent = bottomRightEntity.addComponent(GameEngine.ECS.Sprite2DRendererComponent);
		bottomRightSpriteComponent.sprite = bottomRight;
	}

	private createSmallPipe(
		scene: GameEngine.Scene,
		topLeft: GameEngine.GraphicsEngine.Sprite2D,
		topRight: GameEngine.GraphicsEngine.Sprite2D,
		bottomLeft: GameEngine.GraphicsEngine.Sprite2D,
		bottomRight: GameEngine.GraphicsEngine.Sprite2D,
		x: number, y: number, z: number = 0.1
	): void {
		const bottomLeftEntity = scene.createEntity("Small Pipe [bottom left] entity");
		const bottomLeftTransformComponent = bottomLeftEntity.getComponent(GameEngine.ECS.TransformComponent);
		bottomLeftTransformComponent.position.setX(x);
		bottomLeftTransformComponent.position.setY(y);
		bottomLeftTransformComponent.position.setZ(z);
		const bottomLeftSpriteComponent = bottomLeftEntity.addComponent(GameEngine.ECS.Sprite2DRendererComponent);
		bottomLeftSpriteComponent.sprite = bottomLeft;

		const bottomRightEntity = scene.createEntity("Small Pipe [bottom right] entity");
		const bottomRightTransformComponent = bottomRightEntity.getComponent(GameEngine.ECS.TransformComponent);
		bottomRightTransformComponent.position.setX(x + 1);
		bottomRightTransformComponent.position.setY(y);
		bottomRightTransformComponent.position.setZ(z);
		const bottomRightSpriteComponent = bottomRightEntity.addComponent(GameEngine.ECS.Sprite2DRendererComponent);
		bottomRightSpriteComponent.sprite = bottomRight;

		const topLeftEntity = scene.createEntity("Small Pipe [top left] entity");
		const topLeftTransformComponent = topLeftEntity.getComponent(GameEngine.ECS.TransformComponent);
		topLeftTransformComponent.position.setX(x);
		topLeftTransformComponent.position.setY(y + 1);
		topLeftTransformComponent.position.setZ(z);
		const topLeftSpriteComponent = topLeftEntity.addComponent(GameEngine.ECS.Sprite2DRendererComponent);
		topLeftSpriteComponent.sprite = topLeft;

		const topRightEntity = scene.createEntity("Small Pipe [top right] entity");
		const topRightTransformComponent = topRightEntity.getComponent(GameEngine.ECS.TransformComponent);
		topRightTransformComponent.position.setX(x + 1);
		topRightTransformComponent.position.setY(y + 1);
		topRightTransformComponent.position.setZ(z);
		const topRightSpriteComponent = topRightEntity.addComponent(GameEngine.ECS.Sprite2DRendererComponent);
		topRightSpriteComponent.sprite = topRight;
	}

}