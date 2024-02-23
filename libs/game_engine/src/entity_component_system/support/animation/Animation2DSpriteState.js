import { Animation2DSpriteFrame } from "./Animation2DSpriteFrame";
export class Animation2DSpriteState {
    constructor(name) {
        this.name = name;
        this.frames = [];
        this.currentFrameIndex = 0;
        this.timeTracker = 0;
    }
    addFrame(sprite, frameTime) {
        this.frames.push(new Animation2DSpriteFrame(sprite, frameTime));
    }
    update(time) {
        this.timeTracker -= time.getDeltaTimeMs();
        if (this.timeTracker < 0) {
            this.currentFrameIndex++;
            if (this.currentFrameIndex >= this.frames.length) {
                this.currentFrameIndex = 0;
            }
            this.timeTracker = this.frames[this.currentFrameIndex].getTime();
        }
    }
    getCurrentFrame() {
        return this.frames[this.currentFrameIndex];
    }
    getName() {
        return this.name;
    }
}
