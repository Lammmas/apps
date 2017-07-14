import { Injectable } from "@angular/core";

import { Settings } from "./settings";

@Injectable()
export class SettingsService {
    private settings: Settings = new Settings();

    getSettings(): Settings {
        return this.settings;
    }

    saveSettings(settings: Settings): Settings {
        this.settings = settings;

        return this.settings;
    }
}
