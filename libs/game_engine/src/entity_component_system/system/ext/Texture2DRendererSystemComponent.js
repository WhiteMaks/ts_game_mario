import { GameSystemComponent } from "../GameSystemComponent.js";
import { TransformComponent } from "../../component/ext/TransformComponent.js";
export class Texture2DRendererSystemComponent extends GameSystemComponent {
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
        if (!Texture2DRendererSystemComponent.instance) {
            Texture2DRendererSystemComponent.instance = new Texture2DRendererSystemComponent();
        }
        return Texture2DRendererSystemComponent.instance;
    }
}
