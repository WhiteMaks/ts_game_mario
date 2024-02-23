import { RendererAPI } from "../renderer/RendererAPI.js";
import { WebGLContext } from "../api/gl/renderer/WebGLContext.js";
import { Renderer } from "../renderer/Renderer.js";
export class GraphicsContextFactory {
    static createContext(canvasElement) {
        switch (Renderer.getAPI()) {
            case RendererAPI.WEB_GL: return new WebGLContext(canvasElement);
        }
    }
}
