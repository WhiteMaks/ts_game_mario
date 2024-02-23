import { Random } from "../../../support/Random.js";
export class WebGL2DTexture {
    constructor(gl, image, channels, isEmpty = false) {
        this.gl = gl;
        this.id = Random.uuid();
        this.image = image;
        this.texture = this.gl.createTexture();
        if (isEmpty) {
            this.prepareTexture();
            this.gl.texImage2DRGBAUbyteWithPixels(0, image, new Uint8Array([255, 255, 255, 255]));
            return;
        }
        const listener = () => {
            this.prepareTexture();
            if (channels === 4) {
                this.gl.texImage2DRGBAUbyte(0, image);
            }
            if (channels === 3) {
                this.gl.texImage2DRGBUbyte(0, image);
            }
            image.removeEventListener("load", listener);
        };
        image.addEventListener("load", listener);
    }
    bind(slot) {
        this.gl.activeTexture(slot);
        this.gl.bindTexture2D(this.texture);
    }
    unbind() {
        this.gl.unbindTexture2D();
    }
    clean() {
        this.gl.deleteTexture(this.texture);
    }
    equal(other) {
        return this.id === other.getId();
    }
    prepareTexture() {
        this.gl.bindTexture2D(this.texture);
        this.gl.tex2DParameteriMinFilterLinear();
        this.gl.tex2DParameteriMagFilterNearest();
        this.gl.tex2DParameteriWrapSClampToEdge();
        this.gl.tex2DParameteriWrapTClampToEdge();
    }
    getHeight() {
        return this.image.height;
    }
    getId() {
        return this.id;
    }
    getWidth() {
        return this.image.width;
    }
    getImage() {
        return this.image;
    }
}
