import { TagSystemComponent } from "../../system/ext/TagSystemComponent";
import { GameComponent } from "../GameComponent";
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
