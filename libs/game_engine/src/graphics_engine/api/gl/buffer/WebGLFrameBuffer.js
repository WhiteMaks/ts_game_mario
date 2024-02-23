import { FrameBuffer } from "../../../buffer/FrameBuffer";
export class WebGLFrameBuffer extends FrameBuffer {
    constructor(gl, data) {
        super(data);
        this.gl = gl;
        this.frameBuffer = null;
        this.colorAttachment = null;
        this.depthAttachment = null;
        this.init();
    }
    init() {
        this.frameBuffer = this.gl.createFrameBuffers();
        this.bind();
        this.colorAttachment = this.gl.createTexture();
        this.gl.bindTexture2D(this.colorAttachment);
        this.gl.textImage2DRGBA8Ubyte(0, this.data.width, this.data.height, 0, null);
        this.gl.tex2DParameteriMinFilterLinear();
        this.gl.tex2DParameteriMagFilterLinear();
        this.gl.frameBufferTexture2DColorAttachment0(this.colorAttachment, 0);
        this.depthAttachment = this.gl.createTexture();
        this.gl.bindTexture2D(this.depthAttachment);
        // this.gl.texStorage2DDepth24Stencil8(0, this.data.width, this.data.height);
        this.gl.textImage2DDepth24Stencil8Uint24_8(0, this.data.width, this.data.height, 0, null);
        this.gl.frameBufferTexture2DDepthStencilAttachment(this.depthAttachment, 0);
        this.gl.checkFrameBufferStatusComplete();
        this.unbind();
    }
    bind() {
        this.gl.bindFrameBuffer(this.frameBuffer);
        //this.gl.setViewport(0, 0, this.data.width, this.data.height);
    }
    unbind() {
        this.gl.unbindFrameBuffer();
    }
    clean() {
        this.gl.deleteFrameBuffer(this.frameBuffer);
        this.gl.deleteTexture(this.colorAttachment);
        this.gl.deleteTexture(this.depthAttachment);
    }
    resize(width, height) {
        this.clean();
        this.data.width = width;
        this.data.height = height;
        this.init();
    }
}
