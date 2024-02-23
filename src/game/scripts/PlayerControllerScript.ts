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
		this.cameraComponent.camera.getPosition().setY(5.5);

		this.marioRunSpeed = 5;
	}

	public update(time: GameEngine.Time): void {
		const deltaTime = time.getDeltaTimeSec();

		const marioPosition = this.marioTransformComponent.position;
		const marioRotation = this.marioTransformComponent.rotation;

		const horizontalAxis = GameEngine.EventSystem.Input.getHorizontalAxis();

		if (horizontalAxis < 0) {
			marioRotation.setY(180);
		} else if (horizontalAxis > 0) {
			marioRotation.setY(0);
		}

		if (horizontalAxis === 0) {
			this.playIdleAnimation();
		} else {
			this.playRunAnimation();
		}

		marioPosition.setX(marioPosition.getX() + this.marioRunSpeed * deltaTime * horizontalAxis);

		this.cameraComponent.camera.getPosition().setX(marioPosition.getX());
	}

	private playRunAnimation(): void {
		this.marioAnimationStateComponent.play("Run");
	}

	private playIdleAnimation(): void {
		this.marioAnimationStateComponent.play("Idle");
	}

}