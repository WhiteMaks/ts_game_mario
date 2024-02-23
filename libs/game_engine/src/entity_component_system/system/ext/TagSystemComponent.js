import { GameSystemComponent } from "../GameSystemComponent";
export class TagSystemComponent extends GameSystemComponent {
    constructor() {
        super();
    }
    static getInstance() {
        if (!TagSystemComponent.instance) {
            TagSystemComponent.instance = new TagSystemComponent();
        }
        return TagSystemComponent.instance;
    }
}
