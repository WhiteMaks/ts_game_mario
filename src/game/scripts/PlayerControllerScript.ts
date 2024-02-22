import {GameEngine} from "../../libs/game_engine/src/namespace/game_engine";

export class PlayerControllerScript extends GameEngine.ECS.BaseScript {
	private marioAnimationStateComponent!: GameEngine.ECS.State2DAnimationMachineComponent;
	private marioTransformComponent!: GameEngine.ECS.TransformComponent;
	private cameraComponent!: GameEngine.ECS.CameraComponent;

	private marioRunSpeed!: number;
	
	public init() {
		this.marioAnimationStateComponent = this.getComponent(GameEngine.ECS.State2DAnimationMachineComponent);
		this.marioTransformComponent = this.getComponent(GameEngine.ECS.TransformComponent);

		this.cameraComponent = this.getComponent(GameEngine.ECS.CameraComponent);
		this.cameraComponent.camera.getPosition().setY(7.5);

		this.marioRunSpeed = 5;
	}

	public update(time: GameEngine.Time): void {
		const deltaTime = time.getDeltaTimeSec();

		const marioPosition = this.marioTransformComponent.position;
		const marioRotation = this.marioTransformComponent.rotation;

		if (GameEngine.EventSystem.Input.isKeyboardKeyPressed(GameEngine.EventSystem.Key.D)) {
			marioRotation.setY(0);
			marioPosition.setX(marioPosition.getX() + this.marioRunSpeed * deltaTime);

			this.marioAnimationStateComponent.play("Run");
		} else if (GameEngine.EventSystem.Input.isKeyboardKeyPressed(GameEngine.EventSystem.Key.A)) {
			marioRotation.setY(180);
			marioPosition.setX(marioPosition.getX() - this.marioRunSpeed * deltaTime);

			this.marioAnimationStateComponent.play("Run");
		} else {
			this.marioAnimationStateComponent.play("Idle");
		}

		this.cameraComponent.camera.getPosition().setX(marioPosition.getX());
	}

}