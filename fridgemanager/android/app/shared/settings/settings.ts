export class Settings {
    auto: boolean; // Automatically transfer everything to/from shopping
    notify: boolean;

    constructor(auto: boolean = true, notify: boolean = true) {
        this.auto = auto;
        this.notify = notify;
    }
}