import { Renderer } from "../renderer/Renderer";
import { RendererAPI } from "../renderer/RendererAPI";
import { WebGLVertexShader } from "../api/gl/shader/WebGLVertexShader";
import { WebGLFragmentShader } from "../api/gl/shader/WebGLFragmentShader";
import { WebGLShaderProgram } from "../api/gl/shader/WebGLShaderProgram";
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
