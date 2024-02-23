import { TagSystemComponent } from "../../system/ext/TagSystemComponent.js";
import { GameComponent } from "../GameComponent.js";
export class TagComponent extends GameComponent {
    constructor(entity) {
        super(entity);
        TagSystemComponent.getInstance().saveComponent(this);
    }
    remove() {
        TagSystemComponent.getInstance().removeComponent(this);
    }
    render() {
    }
    update(time) {
    }
}
