export class WebGLIndexStaticBuffer {
    constructor(gl, data, count) {
        this.gl = gl;
        this.buffer = gl.createBuffer();
        this.count = count;
        this.bind();
        gl.elementArrayBufferStaticData(data);
    }
    bind() {
        this.gl.bindElementArrayBuffer(this.buffer);
    }
    unbind() {
        this.gl.bindElementArrayBuffer(this.buffer);
    }
    getCount() {
        return this.count;
    }
    clean() {
        this.gl.deleteBuffer(this.buffer);
    }
    setLayout(layout) {
        throw new Error("setLayout: not implemented method");
    }
    getLayout() {
        throw new Error("getLayout: not implemented method");
    }
    setFloat32Data(data) {
        throw new Error("Index Static buffer not supported setFloat32Data");
    }
}
