export class WebGLVertexShader {
    constructor(gl, code) {
        this.gl = gl;
        this.vs = this.gl.createVertexShader();
        this.gl.setShaderSource(this.vs, code);
    }
    getShader() {
        return this.vs;
    }
    clean() {
        this.gl.deleteShader(this.vs);
    }
}
