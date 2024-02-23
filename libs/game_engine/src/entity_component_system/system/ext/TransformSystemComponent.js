import { GameSystemComponent } from "../GameSystemComponent.js";
export class TransformSystemComponent extends GameSystemComponent {
    constructor() {
        super();
    }
    static getInstance() {
        if (!TransformSystemComponent.instance) {
            TransformSystemComponent.instance = new TransformSystemComponent();
        }
        return TransformSystemComponent.instance;
    }
}
