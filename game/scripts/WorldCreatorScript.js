import { GameEngine } from "../../libs/game_engine/src/namespace/game_engine";
export class WorldCreatorScript extends GameEngine.ECS.BaseScript {
    init() {
        const scene = this.getScene();
        const spriteSheetComponent = this.getComponent(GameEngine.ECS.Texture2DRendererComponent);
        const spriteSheetTexture = spriteSheetComponent.texture;
        const spriteSize = new GameEngine.GraphicsEngine.Vector2(16, 16);
        this.createDecorations(scene, spriteSheetTexture, spriteSize);
        this.createObstacles(scene, spriteSheetTexture, spriteSize);
        spriteSheetComponent.remove();
    }
    update(time) {
    }
    createObstacles(scene, spriteSheetTexture, spriteSize) {
        const floorSprite = GameEngine.GraphicsEngine.ResourceFactory.createSprite2D(spriteSheetTexture, new GameEngine.GraphicsEngine.Vector2(0, 11), spriteSize);
        const topLeftPipeSprite = GameEngine.GraphicsEngine.ResourceFactory.createSprite2D(spriteSheetTexture, new GameEngine.GraphicsEngine.Vector2(2, 2), spriteSize);
        const topRightPipeSprite = GameEngine.GraphicsEngine.ResourceFactory.createSprite2D(spriteSheetTexture, new GameEngine.GraphicsEngine.Vector2(3, 2), spriteSize);
        const bottomLeftPipeSprite = GameEngine.GraphicsEngine.ResourceFactory.createSprite2D(spriteSheetTexture, new GameEngine.GraphicsEngine.Vector2(5, 3), spriteSize);
        const bottomRightPipeSprite = GameEngine.GraphicsEngine.ResourceFactory.createSprite2D(spriteSheetTexture, new GameEngine.GraphicsEngine.Vector2(6, 3), spriteSize);
        this.createFloor(scene, floorSprite, -8, 61);
        this.createSmallPipe(scene, topLeftPipeSprite, topRightPipeSprite, bottomLeftPipeSprite, bottomRightPipeSprite, 20, 0);
        this.createMediumPipe(scene, topLeftPipeSprite, topRightPipeSprite, bottomLeftPipeSprite, bottomRightPipeSprite, 30, 0);
        this.createBigPipe(scene, topLeftPipeSprite, topRightPipeSprite, bottomLeftPipeSprite, bottomRightPipeSprite, 38, 0);
        this.createBigPipe(scene, topLeftPipeSprite, topRightPipeSprite, bottomLeftPipeSprite, bottomRightPipeSprite, 49, 0);
    }
    createDecorations(scene, spriteSheetTexture, spriteSize) {
        const leftBigHillSprite = GameEngine.GraphicsEngine.ResourceFactory.createSprite2D(spriteSheetTexture, new GameEngine.GraphicsEngine.Vector2(3, 5), spriteSize);
        const centreLeftBigHillSprite = GameEngine.GraphicsEngine.ResourceFactory.createSprite2D(spriteSheetTexture, new GameEngine.GraphicsEngine.Vector2(4, 5), spriteSize);
        const centreBigHillSprite = GameEngine.GraphicsEngine.ResourceFactory.createSprite2D(spriteSheetTexture, new GameEngine.GraphicsEngine.Vector2(3, 6), spriteSize);
        const centreRightBigHillSprite = GameEngine.GraphicsEngine.ResourceFactory.createSprite2D(spriteSheetTexture, new GameEngine.GraphicsEngine.Vector2(5, 6), spriteSize);
        const rightBigHillSprite = GameEngine.GraphicsEngine.ResourceFactory.createSprite2D(spriteSheetTexture, new GameEngine.GraphicsEngine.Vector2(5, 5), spriteSize);
        const topBigHillSprite = GameEngine.GraphicsEngine.ResourceFactory.createSprite2D(spriteSheetTexture, new GameEngine.GraphicsEngine.Vector2(4, 6), spriteSize);
        const leftBushSprite = GameEngine.GraphicsEngine.ResourceFactory.createSprite2D(spriteSheetTexture, new GameEngine.GraphicsEngine.Vector2(6, 5), spriteSize);
        const centerBushSprite = GameEngine.GraphicsEngine.ResourceFactory.createSprite2D(spriteSheetTexture, new GameEngine.GraphicsEngine.Vector2(6, 6), spriteSize);
        const rightBushSprite = GameEngine.GraphicsEngine.ResourceFactory.createSprite2D(spriteSheetTexture, new GameEngine.GraphicsEngine.Vector2(6, 7), spriteSize);
        this.createBigHill(scene, leftBigHillSprite, centreLeftBigHillSprite, centreBigHillSprite, centreRightBigHillSprite, rightBigHillSprite, topBigHillSprite, -8, 0, -0.5);
        this.createBigBush(scene, leftBushSprite, centerBushSprite, rightBushSprite, 3, 0, -0.5);
        this.createSmallHill(scene, leftBigHillSprite, centreLeftBigHillSprite, rightBigHillSprite, topBigHillSprite, 8, 0, -0.5);
        this.createSmallBush(scene, leftBushSprite, centerBushSprite, rightBushSprite, 15, 0, -0.5);
        this.createMediumBush(scene, leftBushSprite, centerBushSprite, rightBushSprite, 33, 0, -0.5);
        this.createBigHill(scene, leftBigHillSprite, centreLeftBigHillSprite, centreBigHillSprite, centreRightBigHillSprite, rightBigHillSprite, topBigHillSprite, 40, 0, -0.5);
        this.createBigBush(scene, leftBushSprite, centerBushSprite, rightBushSprite, 51, 0, -0.5);
        this.createSmallHill(scene, leftBigHillSprite, centreLeftBigHillSprite, rightBigHillSprite, topBigHillSprite, 56, 0, -0.5);
    }
    createSmallBush(scene, left, center, right, x, y, z) {
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
    createMediumBush(scene, left, center, right, x, y, z) {
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
    createBigBush(scene, left, center, right, x, y, z) {
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
    createSmallHill(scene, left, center, right, top, x, y, z) {
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
    createBigHill(scene, left, centerLeft, center, centerRight, right, top, x, y, z) {
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
    createFloor(scene, sprite, fromX, toX) {
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
    createBigPipe(scene, topLeft, topRight, bottomLeft, bottomRight, x, y, z = 0.1) {
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
    createMediumPipe(scene, topLeft, topRight, bottomLeft, bottomRight, x, y, z = 0.1) {
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
    createSmallPipe(scene, topLeft, topRight, bottomLeft, bottomRight, x, y, z = 0.1) {
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
