export class BaseLayer {
    constructor(name = "layer") {
        this.name = name;
    }
    getName() {
        return this.name;
    }
}
