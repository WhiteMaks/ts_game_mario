import { ShaderDataType, getComponentCountFromShaderDataType } from "../../../shader/ShaderDataType";
export class WebGLVertexArrayBuffer {
    constructor(gl) {
        this.gl = gl;
        this.vertexBuffers = [];
        this.indexBuffer = null;
        this.buffer = gl.createVertexArray();
        this.bind();
    }
    getCount() {
        return 0;
    }
    addVertexBuffer(buffer) {
        this.bind();
        buffer.bind();
        const layout = buffer.getLayout();
        const elements = buffer.getLayout().getElements();
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            this.gl.enableVertexAttribArray(i);
            switch (element.type) {
                case ShaderDataType.FLOAT_4:
                case ShaderDataType.FLOAT_3:
                case ShaderDataType.FLOAT_2:
                case ShaderDataType.FLOAT_1: {
                    this.gl.vertexAttribPointerFloat(i, getComponentCountFromShaderDataType(element.type), element.normalized, layout.getStride(), element.offset);
                    break;
                }
                case ShaderDataType.INT_4:
                case ShaderDataType.INT_3:
                case ShaderDataType.INT_2:
                case ShaderDataType.INT_1: {
                    this.gl.vertexAttribPointerUint(i, getComponentCountFromShaderDataType(element.type), element.normalized, layout.getStride(), element.offset);
                    break;
                }
                default: {
                    throw new Error("ShaderDataType [ " + element.type + " ] not supported");
                }
            }
        }
        this.vertexBuffers.push(buffer);
    }
    setIndexBuffer(buffer) {
        this.bind();
        buffer.bind();
        this.indexBuffer = buffer;
    }
    bind() {
        this.gl.bindVertexArray(this.buffer);
    }
    unbind() {
        this.gl.unbindVertexArray();
    }
    clean() {
        var _a;
        this.gl.deleteVertexArray(this.buffer);
        for (const buffer of this.vertexBuffers) {
            buffer.clean();
        }
        (_a = this.indexBuffer) === null || _a === void 0 ? void 0 : _a.clean();
    }
    setLayout(layout) {
        throw new Error("setLayout: not implemented method");
    }
    getLayout() {
        throw new Error("getLayout: not implemented method");
    }
    getVertexBuffers() {
        return this.vertexBuffers;
    }
    getIndexBuffer() {
        return this.indexBuffer;
    }
    setFloat32Data(data) {
        throw new Error("Vertex Array buffer not supported setFloat32Data");
    }
}
