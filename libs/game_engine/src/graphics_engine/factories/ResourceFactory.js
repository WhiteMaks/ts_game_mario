import { Renderer } from "../renderer/Renderer";
import { RendererAPI } from "../renderer/RendererAPI";
import { WebGL2DTexture } from "../api/gl/resource/WebGL2DTexture";
import { Sprite2D } from "../resource/Sprite2D";
import { Vector2 } from "../maths/impl/Vector2";
export class ResourceFactory {
    static create2DFullWhiteTexture(graphicsContext) {
        const image = new Image(1, 1);
        return ResourceFactory.create2DTexture(graphicsContext, image, 4, true);
    }
    static create2DTexture(graphicsContext, image, channels, isEmpty = false) {
        switch (Renderer.getAPI()) {
            case RendererAPI.WEB_GL: {
                const gl = graphicsContext.getGL();
                return new WebGL2DTexture(gl, image, channels, isEmpty);
            }
        }
    }
    static createSprite2D(texture, coords, textureSize, size = new Vector2(1, 1)) {
        const result = new Sprite2D(texture);
        const offset = 0.5; //чтобы не было пересечения смежных текстур
        if (texture.getWidth() === 0 || texture.getHeight() === 0) {
            const listener = () => {
                ResourceFactory.updateSpriteCoordinates(result, coords, textureSize, size, texture, offset);
                texture.getImage().removeEventListener("load", listener);
            };
            texture.getImage().addEventListener("load", listener);
        }
        else {
            ResourceFactory.updateSpriteCoordinates(result, coords, textureSize, size, texture, offset);
        }
        return result;
    }
    static updateSpriteCoordinates(sprite, coords, textureSize, size, texture, offset) {
        const bottomLeftX = (coords.getX() * textureSize.getX() + offset) / texture.getWidth();
        const bottomLeftY = (coords.getY() * textureSize.getY() + offset) / texture.getHeight();
        const bottomLeft = new Vector2(bottomLeftX, bottomLeftY);
        const topRightX = ((coords.getX() + size.getX()) * textureSize.getX() - offset) / texture.getWidth();
        const topRightY = ((coords.getY() + size.getY()) * textureSize.getY() - offset) / texture.getHeight();
        const topRight = new Vector2(topRightX, topRightY);
        sprite.updateCoordinates(bottomLeft, topRight);
    }
}
