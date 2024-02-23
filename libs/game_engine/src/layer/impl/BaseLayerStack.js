export class BaseLayerStack {
    constructor() {
        this.layers = [];
        this.layerInsert = 0;
    }
    push(layer) {
        this.layers.splice(this.layerInsert, 0, layer);
        layer.attach();
        this.layerInsert++;
    }
    pushOverlay(layer) {
        this.layers.push(layer);
        layer.attach();
    }
    clean() {
        while (this.layers.length > 0) {
            this.layers.pop();
        }
    }
    getLayers() {
        return this.layers;
    }
}
