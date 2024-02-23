import { WebGLExt } from "../wrappers/WebGLExt.js";
export class WebGLContext {
    constructor(canvasElement) {
        this.canvasElement = canvasElement;
        const webGLContext = this.canvasElement.getContext("webgl2"); //получение контекста для работы с WebGL
        //если выбранный контекст не проинициализирован, значит либо его не существует, либо браузер не может с ним работать
        if (!webGLContext) {
            throw new Error("Невозможно проинициализировать WebGL. Данный браузер не поддерживает данный контекст [ webgl2 ]");
        }
        //инициализация объекта WebGL с выбранным контекстом
        this.gl = new WebGLExt(webGLContext //выбранный контекст
        );
    }
    init() {
    }
    setViewport(x, y, width, height) {
        this.gl.setViewport(x, y, width, height);
    }
    printDebugInfo() {
        console.log("Vendor: " + this.gl.getVendor());
        console.log("Renderer: " + this.gl.getRenderer());
    }
    getGL() {
        return this.gl;
    }
}
