import { Component, OnInit } from "@angular/core";

import { Item, ItemService } from "../../shared/item";

@Component({
    selector: "list",
    moduleId: module.id,
    templateUrl: "./list.component.html",
})
export class ListComponent implements OnInit {
    fridge: Item[];
    shopping: Item[];

    constructor(private itemService: ItemService) { }

    ngOnInit(): void {
        this.fridge = this.itemService.getFridge();
        this.shopping = this.itemService.getShopping();
        console.log("I'm home!");
    }
}