import { RendererAPI } from "./RendererAPI";
export class Renderer {
    static getAPI() {
        return this.rendererAPI;
    }
    static setAPI(api) {
        Renderer.rendererAPI = api;
    }
}
Renderer.rendererAPI = RendererAPI.WEB_GL;
