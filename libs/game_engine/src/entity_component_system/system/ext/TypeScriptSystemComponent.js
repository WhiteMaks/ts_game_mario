import { GameSystemComponent } from "../GameSystemComponent.js";
export class TypeScriptSystemComponent extends GameSystemComponent {
    constructor() {
        super();
    }
    static getInstance() {
        if (!TypeScriptSystemComponent.instance) {
            TypeScriptSystemComponent.instance = new TypeScriptSystemComponent();
        }
        return TypeScriptSystemComponent.instance;
    }
}
