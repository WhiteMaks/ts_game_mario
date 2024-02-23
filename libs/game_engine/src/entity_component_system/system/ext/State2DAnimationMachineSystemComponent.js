import { GameSystemComponent } from "../GameSystemComponent";
export class State2DAnimationMachineSystemComponent extends GameSystemComponent {
    constructor() {
        super();
    }
    static getInstance() {
        if (!State2DAnimationMachineSystemComponent.instance) {
            State2DAnimationMachineSystemComponent.instance = new State2DAnimationMachineSystemComponent();
        }
        return State2DAnimationMachineSystemComponent.instance;
    }
}
