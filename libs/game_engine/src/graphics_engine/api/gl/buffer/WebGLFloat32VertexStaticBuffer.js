import { WebGLVertexStaticBuffer } from "./WebGLVertexStaticBuffer.js";
export class WebGLFloat32VertexStaticBuffer extends WebGLVertexStaticBuffer {
    constructor(gl, data) {
        super(gl, data, data.length);
    }
}
