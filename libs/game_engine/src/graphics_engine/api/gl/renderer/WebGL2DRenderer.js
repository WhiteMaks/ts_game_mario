import { Renderer2D } from "../../../renderer/Renderer2D.js";
export class WebGL2DRenderer extends Renderer2D {
    constructor(gl) {
        super();
        this.gl = gl;
    }
    clear() {
        this.gl.clearColorBuffer();
        this.gl.clearDepthBuffer();
    }
    setClearColor(color) {
        this.gl.clearColor(color.getX(), color.getY(), color.getZ(), color.getW());
    }
    drawTrianglesImpl(arrayBuffer, indexCount = 0) {
        const count = indexCount === 0 ? arrayBuffer.getCount() : indexCount;
        this.gl.drawTriangleElementsUshort(count, 0);
    }
    initImpl() {
        this.gl.enableDepthTest(); //включение проверки удаленности объектов
        this.gl.enableBlend(); //включение смешивания пикселей
        this.gl.blendFuncSrcAlphaOneMinusSrcAlpha(); //включение прозрачности
    }
}
