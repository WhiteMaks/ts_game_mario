import {GameEngine} from "../../libs/game_engine/src/namespace/game_engine";

export class WorldCreatorScript extends GameEngine.ECS.BaseScript {

	public init() {
		const scene = this.getScene();
		const spriteSheetComponent = this.getComponent(GameEngine.ECS.Texture2DRendererComponent);

		const spriteSheetTexture = spriteSheetComponent.texture;
		const spriteSize = new GameEngine.GraphicsEngine.Vector2(16, 16);

		const floorSprite = GameEngine.GraphicsEngine.ResourceFactory.createSprite2D(
			spriteSheetTexture,
			new GameEngine.GraphicsEngine.Vector2(0, 11),
			spriteSize
		);

		this.createFloor(scene, floorSprite, -8, 61);

		spriteSheetComponent.remove();
	}

	public update(time: GameEngine.Time): void {
	}

	private createFloor(scene: GameEngine.Scene, sprite: GameEngine.GraphicsEngine.Sprite2D, fromX: number, toX: number): void {
		for (let row = -1; row > -3; row--) {
			for (let column = fromX; column < toX; column++) {
				const blockEntity = scene.createEntity("Floor[" + row + "][" + column + "] entity");
				const blockTransformComponent = blockEntity.getComponent(GameEngine.ECS.TransformComponent);
				blockTransformComponent.position.setY(row);
				blockTransformComponent.position.setX(column);
				const blockSpriteComponent = blockEntity.addComponent(GameEngine.ECS.Sprite2DRendererComponent);
				blockSpriteComponent.sprite = sprite;
			}
		}
	}

}