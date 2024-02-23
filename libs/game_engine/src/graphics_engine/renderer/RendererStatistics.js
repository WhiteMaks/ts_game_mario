export class RendererStatistics {
    constructor() {
        this.drawMethodCallsCount = 0;
        this.quadsCount = 0;
        this.textureSlotsCount = 0;
    }
    increaseDrawMethodCallsCount() {
        this.drawMethodCallsCount++;
    }
    increaseQuadsCount() {
        this.quadsCount++;
    }
    increaseTextureSlotsCount() {
        this.textureSlotsCount++;
    }
    reset() {
        this.drawMethodCallsCount = 0;
        this.quadsCount = 0;
    }
    getDrawMethodCallsCount() {
        return this.drawMethodCallsCount;
    }
    getQuadsCount() {
        return this.quadsCount;
    }
    getTextureSlotsCount() {
        return this.textureSlotsCount;
    }
}
