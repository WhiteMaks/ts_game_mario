import { Renderer } from "../renderer/Renderer";
import { RendererAPI } from "../renderer/RendererAPI";
import { WebGL2DRenderer } from "../api/gl/renderer/WebGL2DRenderer";
export class RendererFactory {
    static create2D(graphicsContext) {
        switch (Renderer.getAPI()) {
            case RendererAPI.WEB_GL: {
                const gl = graphicsContext.getGL();
                return new WebGL2DRenderer(gl);
            }
        }
    }
}
