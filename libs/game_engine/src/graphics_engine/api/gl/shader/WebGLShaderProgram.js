export class WebGLShaderProgram {
    constructor(gl, name, vertexShader, fragmentShader) {
        this.locationsCache = new Map();
        this.gl = gl;
        this.name = name;
        this.vertexShader = vertexShader;
        this.fragmentShader = fragmentShader;
        this.program = this.gl.createProgram();
        this.gl.attachShader(this.program, this.vertexShader.getShader());
        this.gl.attachShader(this.program, this.fragmentShader.getShader());
        this.gl.linkProgram(this.program);
        this.vertexShader.clean();
        this.fragmentShader.clean();
    }
    getName() {
        return this.name;
    }
    bind() {
        this.gl.useProgram(this.program);
    }
    unbind() {
        this.gl.removeProgram();
    }
    setVector3f(name, vector) {
        this.gl.uniform3f(this.getUniformLocation(name), vector);
    }
    setVector4f(name, vector) {
        this.gl.uniform4f(this.getUniformLocation(name), vector);
    }
    setValue1i(name, value) {
        this.gl.uniform1i(this.getUniformLocation(name), value);
    }
    setValueArrayI(name, values) {
        this.gl.uniform1iv(this.getUniformLocation(name), values);
    }
    setMatrix4f(name, matrix) {
        this.gl.uniformMatrix4fv(this.getUniformLocation(name), false, new Float32Array(matrix.getArray()));
    }
    getUniformLocation(name) {
        let location = this.locationsCache.get(name);
        if (!location) {
            location = this.gl.getUniformLocation(this.program, name);
            this.locationsCache.set(name, location);
        }
        return location;
    }
    clean() {
        this.vertexShader.clean();
        this.fragmentShader.clean();
        this.gl.deleteProgram(this.program);
    }
}
