import { Component, OnInit } from "@angular/core";

import { Frame } from "ui/frame";

import { Settings, SettingsService } from "../../shared";

@Component({
    selector: "settings",
    moduleId: module.id,
    templateUrl: "./settings.component.html",
})
export class SettingsComponent implements OnInit {
    settings: Settings;

    constructor(private settingsService: SettingsService, private frame: Frame) { }

    ngOnInit(): void {
        this.settings = this.settingsService.getSettings();
    }

    submit(): void {
        this.settingsService.saveSettings(this.settings);
    }

    goBack(): void {
        this.frame.goBack();
    }

    submitBack(): void {
        this.submit();
        this.goBack();
    }

    goHelp(): void {
        //
    }

    goAbout(): void {
        //
    }
}