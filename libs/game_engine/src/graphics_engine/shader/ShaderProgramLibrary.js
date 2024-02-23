export class ShaderProgramLibrary {
    constructor() {
        this.shaderPrograms = new Map();
    }
    add(shaderProgram) {
        this.shaderPrograms.set(shaderProgram.getName(), shaderProgram);
    }
    get(name) {
        const result = this.shaderPrograms.get(name);
        if (!result) {
            throw new Error("Shader program by name [ " + name + " ] not found in library");
        }
        return result;
    }
    clean() {
        this.shaderPrograms.clear();
    }
}
