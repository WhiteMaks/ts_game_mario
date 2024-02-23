import { TypeScriptSystemComponent } from "../../system/ext/TypeScriptSystemComponent.js";
import { GameComponent } from "../GameComponent.js";
export class TypeScriptComponent extends GameComponent {
    constructor(entity) {
        super(entity);
        this.instanceFn = () => { };
        this.destroyFn = () => { };
        this.onInitFn = () => { };
        this.onUpdateFn = (time) => { };
        this.onDestroyFn = () => { };
        TypeScriptSystemComponent.getInstance().saveComponent(this);
    }
    bind(componentClass) {
        this.instanceFn = () => {
            this.script = new componentClass(this.entity);
        };
        this.destroyFn = () => {
            this.script = null;
            this.instanceFn = () => { };
            this.destroyFn = () => { };
            this.onInitFn = () => { };
            this.onUpdateFn = (time) => { };
            this.onDestroyFn = () => { };
        };
        this.onInitFn = () => {
            this.script.init();
        };
        this.onUpdateFn = (time) => {
            this.script.update(time);
        };
        this.onDestroyFn = () => {
            this.script.destroy();
        };
    }
    remove() {
        this.onDestroyFn();
        this.destroyFn();
        TypeScriptSystemComponent.getInstance().removeComponent(this);
    }
    render() {
    }
    update(time) {
        if (!this.script) {
            this.instanceFn();
            this.onInitFn();
        }
        this.onUpdateFn(time);
    }
}
