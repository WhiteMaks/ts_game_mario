export class Time {
    constructor(timestamp = 0) {
        this.timestamp = timestamp;
        this.deltaTime = 0;
    }
    update(timestamp) {
        this.deltaTime = timestamp - this.timestamp;
        this.timestamp = timestamp;
    }
    getTimestamp() {
        return this.timestamp;
    }
    getDeltaTimeMs() {
        return this.deltaTime;
    }
    getDeltaTimeSec() {
        return this.deltaTime / 1000;
    }
}
