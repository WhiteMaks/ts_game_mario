export class WebGLVertexDynamicBuffer {
    constructor(gl, size) {
        this.gl = gl;
        this.buffer = gl.createBuffer();
        this.layout = null;
        this.bind();
        gl.arrayBufferDynamicData(size);
    }
    bind() {
        this.gl.bindArrayBuffer(this.buffer);
    }
    unbind() {
        this.gl.unbindArrayBuffer();
    }
    getCount() {
        throw new Error("getCount not supported in Vertex Buffer");
    }
    clean() {
        this.gl.deleteBuffer(this.buffer);
    }
    setLayout(layout) {
        this.layout = layout;
    }
    getLayout() {
        return this.layout;
    }
    setFloat32Data(data) {
        this.bind();
        this.gl.arrayBufferSubData(data);
    }
}
