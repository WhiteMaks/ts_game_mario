import { WebGLIndexStaticBuffer } from "./WebGLIndexStaticBuffer";
export class WebGLUint16IndexStaticBuffer extends WebGLIndexStaticBuffer {
    constructor(gl, data) {
        super(gl, data, data.length);
    }
}
