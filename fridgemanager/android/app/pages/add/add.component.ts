import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Page } from "ui/page";
import { TextField } from "ui/text-field";
import { Frame } from "ui/frame";
import * as TimeDatePicker from 'nativescript-timedatepicker';

import { Item, ItemService } from "../../shared";

@Component({
    selector: "add",
    moduleId: module.id,
    templateUrl: "./add.component.html",
})
export class AddComponent implements OnInit {
	item: Item;

    constructor(private itemService: ItemService, private route: ActivatedRoute, private page: Page, private frame: Frame) {
        this.item = new Item();
        // Default values
        this.item.id = 0; // Basically no ID, meaning new item
        this.item.name = "";
        this.item.expiry = "";
        this.item.location = "fridge";
        this.item.auto = true;
        this.item.open = false;
        this.item.opened = "";
        this.item.deleted = false;
    }

    ngOnInit(): void {
        const type = this.route.snapshot.params["type"];

        if (type && type === 'shopping') this.item.location = 'shopping';
    }

    showExpiryPicker(): void {
        let pickerCallback = ((result: string) => {
            let field: TextField = <TextField> this.page.getViewById("expiryField");

            // String result, ex. 20 07 2017 14:54 +0300
            if (result) {
                this.item.expiry = result.substring(0, 10).replace(/ /g, ".");
                // Because there was some sync issues and the field wouldn't always immediately update, we force
                field.text = this.item.expiry;
                field.android.clearFocus();
            }
        });

        TimeDatePicker.init(pickerCallback, 'Expiry', new Date());
        TimeDatePicker.showDatePickerDialog();
    }

    showOpenPicker(): void {
        let pickerCallback = ((result: string) => {
            let field: TextField = <TextField> this.page.getViewById("openedField");

            // String result, ex. 20 07 2017 14:54 +0300
            if (result) {
                this.item.opened = result.substring(0, 10).replace(/ /g, ".");
                // Because there was some sync issues and the field wouldn't always immediately update, we force
                field.text = this.item.opened;
                field.android.clearFocus();
            }
        });

        TimeDatePicker.init(pickerCallback, 'Opened', new Date());
        TimeDatePicker.showDatePickerDialog();
    }

    submit(): void {
        if (this.item.id > 0) this.itemService.saveItem(this.item);
        else this.item = this.itemService.createItem(this.item);
    }

    goBack(): void {
        this.frame.goBack();
    }

    submitBack(): void {
        this.submit();
        this.goBack();
    }
}