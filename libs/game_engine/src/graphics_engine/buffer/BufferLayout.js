export class BufferLayout {
    constructor(elements) {
        this.elements = elements;
        this.stride = 0;
        this.calculateStride();
    }
    getElements() {
        return this.elements;
    }
    getStride() {
        return this.stride;
    }
    sizeof() {
        let result = 0;
        for (const element of this.elements) {
            result += element.size;
        }
        return result;
    }
    calculateStride() {
        let offset = 0;
        for (const element of this.elements) {
            element.offset = offset;
            offset += element.size;
            this.stride += element.size;
        }
    }
}
