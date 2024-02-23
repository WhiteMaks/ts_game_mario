import { GameSystemComponent } from "../GameSystemComponent.js";
import { TransformComponent } from "../../component/ext/TransformComponent.js";
export class ColorRendererSystemComponent extends GameSystemComponent {
    constructor() {
        super();
    }
    saveComponent(component) {
        super.saveComponent(component);
        this.components = this.components.sort((a, b) => {
            const aZ = a.entity.getComponent(TransformComponent).position.getZ();
            const bZ = b.entity.getComponent(TransformComponent).position.getZ();
            return aZ - bZ;
        });
    }
    static getInstance() {
        if (!ColorRendererSystemComponent.instance) {
            ColorRendererSystemComponent.instance = new ColorRendererSystemComponent();
        }
        return ColorRendererSystemComponent.instance;
    }
}
