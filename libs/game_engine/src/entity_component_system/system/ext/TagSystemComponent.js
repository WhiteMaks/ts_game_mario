import { GameSystemComponent } from "../GameSystemComponent.js";
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
