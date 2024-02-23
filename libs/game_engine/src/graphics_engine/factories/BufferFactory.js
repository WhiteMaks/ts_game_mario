import { Renderer } from "../renderer/Renderer";
import { RendererAPI } from "../renderer/RendererAPI";
import { WebGLVertexArrayBuffer } from "../api/gl/buffer/WebGLVertexArrayBuffer";
import { WebGLUint16IndexStaticBuffer } from "../api/gl/buffer/WebGLUint16IndexStaticBuffer";
import { WebGLFloat32VertexStaticBuffer } from "../api/gl/buffer/WebGLFloat32VertexStaticBuffer";
import { WebGLFloat32VertexDynamicBuffer } from "../api/gl/buffer/WebGLFloat32VertexDynamicBuffer";
import { WebGLFrameBuffer } from "../api/gl/buffer/WebGLFrameBuffer";
export class BufferFactory {
    static createFloat32VertexDynamicBuffer(graphicsContext, size) {
        switch (Renderer.getAPI()) {
            case RendererAPI.WEB_GL: {
                const gl = graphicsContext.getGL();
                return new WebGLFloat32VertexDynamicBuffer(gl, size);
            }
        }
    }
    static createFloat32VertexStaticBuffer(graphicsContext, data) {
        switch (Renderer.getAPI()) {
            case RendererAPI.WEB_GL: {
                const gl = graphicsContext.getGL();
                return new WebGLFloat32VertexStaticBuffer(gl, data);
            }
        }
    }
    static createUint16IndexStaticBuffer(graphicsContext, data) {
        switch (Renderer.getAPI()) {
            case RendererAPI.WEB_GL: {
                const gl = graphicsContext.getGL();
                return new WebGLUint16IndexStaticBuffer(gl, data);
            }
        }
    }
    static createVertexArrayBuffer(graphicsContext) {
        switch (Renderer.getAPI()) {
            case RendererAPI.WEB_GL: {
                const gl = graphicsContext.getGL();
                return new WebGLVertexArrayBuffer(gl);
            }
        }
    }
    static createFrameBuffer(graphicsContext, data) {
        switch (Renderer.getAPI()) {
            case RendererAPI.WEB_GL: {
                const gl = graphicsContext.getGL();
                return new WebGLFrameBuffer(gl, data);
            }
        }
    }
}
