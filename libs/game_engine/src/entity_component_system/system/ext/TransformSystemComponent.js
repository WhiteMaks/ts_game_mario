import { GameSystemComponent } from "../GameSystemComponent";
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
