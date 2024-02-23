import { GameComponent } from "../GameComponent.js";
import { Sprite2DRendererComponent } from "./Sprite2DRendererComponent.js";
import { State2DAnimationMachineSystemComponent } from "../../system/ext/State2DAnimationMachineSystemComponent.js";
export class State2DAnimationMachineComponent extends GameComponent {
    constructor(entity) {
        super(entity);
        this.defaultStateName = "";
        this.states = [];
        State2DAnimationMachineSystemComponent.getInstance().saveComponent(this);
        this.spriteComponent = this.entity.getComponent(Sprite2DRendererComponent);
    }
    addState(state) {
        this.states.push(state);
    }
    play(stateName) {
        if (this.currentState.getName() === stateName) {
            return;
        }
        for (const state of this.states) {
            if (state.getName() === stateName) {
                this.currentState = state;
                break;
            }
        }
    }
    remove() {
        State2DAnimationMachineSystemComponent.getInstance().removeComponent(this);
    }
    render() {
    }
    update(time) {
        this.currentState.update(time);
        this.spriteComponent.sprite = this.currentState.getCurrentFrame().getSprite();
    }
    setDefaultStateName(defaultStateName) {
        this.defaultStateName = defaultStateName;
        for (const state of this.states) {
            if (state.getName() === this.defaultStateName) {
                this.currentState = state;
                break;
            }
        }
    }
}
