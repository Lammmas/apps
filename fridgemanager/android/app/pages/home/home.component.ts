import { Component, OnInit } from "@angular/core";

import { openUrl } from "utils/utils";
import { Switch } from "ui/switch";

import { Item, ItemService, Settings, SettingsService } from "../../shared";

@Component({
    selector: "home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit {
    fridge: Item[];
    shopping: Item[];
    settings: Settings;

    constructor(private itemService: ItemService, private settingsService: SettingsService) {
        this.settings = settingsService.getSettings();
    }

    ngOnInit(): void {
        this.fridge = this.itemService.getFridge();
        this.shopping = this.itemService.getShopping();
    }

    submit(): void {
        this.settingsService.saveSettings(this.settings);
    }

    onAutoChecked(args): void {
        if (args.object.checked) this.settings.auto = true;
        else this.settings.auto = false;

        this.submit();
    }

    onNotifyChecked(args): void {
        if (args.object.checked) this.settings.notify = true;
        else this.settings.notify = false;

        this.submit();
    }

    goHelp(): void {
        openUrl("https://github.com/Lammmas/apps/issues?utf8=✓&q=project%3ALammmas%2Fapps%2F4%20");
    }

    goAbout(): void {
        openUrl("https://github.com/Lammmas/apps/blob/master/fridgemanager/README.md");
    }
}