import { System } from "./System";
export class GameSystemComponent extends System {
    constructor() {
        super();
    }
    update(time) {
        for (const component of this.components) {
            component.update(time);
        }
    }
    render() {
        for (const component of this.components) {
            component.render();
        }
    }
}
