import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Page } from "ui/page";
import { TextField } from "ui/text-field";
import { Frame } from "ui/frame";
import * as TimeDatePicker from 'nativescript-timedatepicker';

import { Item, ItemService } from "../../shared";

@Component({
    selector: "edit",
    moduleId: module.id,
    templateUrl: "./edit.component.html",
})
export class EditComponent implements OnInit {
    item: Item;

    constructor(private itemService: ItemService, private route: ActivatedRoute, private page: Page, private frame: Frame) { }

    ngOnInit(): void {
        const id = +this.route.snapshot.params["id"];
        let item = this.itemService.getItem(id);

        if (item !== null) this.item = item;
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
        this.itemService.saveItem(this.item);
    }

    goBack(): void {
        this.frame.goBack();
    }

    submitBack(): void {
        this.submit();
        this.goBack();
    }
}
