import { GameEngine } from "../../libs/game_engine/src/namespace/game_engine";
export class EnemyCreatorScript extends GameEngine.ECS.BaseScript {
    init() {
        const spriteSheetComponent = this.getComponent(GameEngine.ECS.Texture2DRendererComponent);
        const spriteSheetTexture = spriteSheetComponent.texture;
        const spriteSize = new GameEngine.GraphicsEngine.Vector2(16, 16);
        this.enemyRunSpriteIndex = 0;
        this.enemyRunSpriteFlipTime = 0.25;
        this.enemyRunSpriteFlipTimeLeft = 0;
        this.enemyRunSprites = [];
        this.enemyRunSprites.push(GameEngine.GraphicsEngine.ResourceFactory.createSprite2D(spriteSheetTexture, new GameEngine.GraphicsEngine.Vector2(0, 0), spriteSize));
        this.enemyRunSprites.push(GameEngine.GraphicsEngine.ResourceFactory.createSprite2D(spriteSheetTexture, new GameEngine.GraphicsEngine.Vector2(1, 0), spriteSize));
        this.enemySpriteComponent = this.addComponent(GameEngine.ECS.Sprite2DRendererComponent);
        this.enemySpriteComponent.sprite = this.enemyRunSprites[this.enemyRunSpriteIndex];
        spriteSheetComponent.remove();
    }
    update(time) {
        const deltaTime = time.getDeltaTimeSec();
        this.updateRunFrame(deltaTime);
    }
    updateRunFrame(deltaTime) {
        this.enemyRunSpriteFlipTimeLeft -= deltaTime;
        if (this.enemyRunSpriteFlipTimeLeft < 0) {
            this.enemyRunSpriteFlipTimeLeft = this.enemyRunSpriteFlipTime;
            this.enemyRunSpriteIndex++;
            if (this.enemyRunSpriteIndex >= this.enemyRunSprites.length) {
                this.enemyRunSpriteIndex = 0;
            }
            this.enemySpriteComponent.sprite = this.enemyRunSprites[this.enemyRunSpriteIndex];
        }
    }
}
