import { Renderer } from "../renderer/Renderer.js";
import { RendererAPI } from "../renderer/RendererAPI.js";
import { WebGLVertexShader } from "../api/gl/shader/WebGLVertexShader.js";
import { WebGLFragmentShader } from "../api/gl/shader/WebGLFragmentShader.js";
import { WebGLShaderProgram } from "../api/gl/shader/WebGLShaderProgram.js";
export class ShaderProgramFactory {
    static createProgram(graphicsContext, programName, vertexShaderCode, fragmentShaderCode) {
        switch (Renderer.getAPI()) {
            case RendererAPI.WEB_GL: {
                const gl = graphicsContext.getGL();
                const vertexShader = new WebGLVertexShader(gl, vertexShaderCode);
                const fragmentShader = new WebGLFragmentShader(gl, fragmentShaderCode);
                return new WebGLShaderProgram(gl, programName, vertexShader, fragmentShader);
            }
        }
    }
}
