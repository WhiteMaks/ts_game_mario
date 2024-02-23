export class Animation2DSpriteFrame {
    constructor(sprite, time) {
        this.sprite = sprite;
        this.time = time;
    }
    getTime() {
        return this.time;
    }
    getSprite() {
        return this.sprite;
    }
}
