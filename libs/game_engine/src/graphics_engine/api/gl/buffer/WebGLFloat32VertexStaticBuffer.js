import { WebGLVertexStaticBuffer } from "./WebGLVertexStaticBuffer";
export class WebGLFloat32VertexStaticBuffer extends WebGLVertexStaticBuffer {
    constructor(gl, data) {
        super(gl, data, data.length);
    }
}
