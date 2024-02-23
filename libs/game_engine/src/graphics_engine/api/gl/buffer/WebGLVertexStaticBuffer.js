export class WebGLVertexStaticBuffer {
    constructor(gl, data, count) {
        this.gl = gl;
        this.buffer = gl.createBuffer();
        this.count = count;
        this.layout = null;
        this.bind();
        gl.arrayBufferStaticData(data);
    }
    bind() {
        this.gl.bindArrayBuffer(this.buffer);
    }
    unbind() {
        this.gl.unbindArrayBuffer();
    }
    getCount() {
        return this.count;
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
        throw new Error("Vertex Static buffer not supported setFloat32Data");
    }
}
