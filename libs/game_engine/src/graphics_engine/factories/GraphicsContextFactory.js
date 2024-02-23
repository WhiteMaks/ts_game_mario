import { RendererAPI } from "../renderer/RendererAPI";
import { WebGLContext } from "../api/gl/renderer/WebGLContext";
import { Renderer } from "../renderer/Renderer";
export class GraphicsContextFactory {
    static createContext(canvasElement) {
        switch (Renderer.getAPI()) {
            case RendererAPI.WEB_GL: return new WebGLContext(canvasElement);
        }
    }
}
