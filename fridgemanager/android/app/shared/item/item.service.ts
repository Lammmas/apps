import { Injectable } from "@angular/core";

import { Item } from "./item";

@Injectable()
export class ItemService {
    private items = new Array<Item>(
        { id: 1, name: "Eggs", expiry: "13.07.2017", location: 'fridge', deleted: false, auto: true, open: true, opened: "10.07.2017" },
        { id: 2, name: "Milk", expiry: "15.07.2017", location: 'fridge', deleted: false, auto: true, open: false, opened: "" },
        { id: 3, name: "Milk", expiry: "", location: 'shopping', deleted: false, auto: false, open: false, opened: "" },
        { id: 4, name: "Meat", expiry: "", location: 'shopping', deleted: true, auto: false, open: false, opened: "" },
    );

    getItems(): Item[] {
        return this.items.filter(item => item.deleted === false);
    }

    /** Helper function to get both deleted and not deleted items for auto-complietion purposes*/
    getAllItems(): Item[] {
        return this.items;
    }

    /**
	Gets item by ID

	@return Item Either the found item or Null if invalid ID
    */
    getItem(id: number): Item {
    	// Don't check for deleted here so we would be able to recreate
        let idx = this.items.findIndex(item => item.id === id);

        // Check for valid ID
        if (idx < 0) return null;

        return this.items[idx];
    }

    getFridge(): Item[] {
    	return this.items.filter(item => item.location === 'fridge' && item.deleted === false);
    }

    getShopping(): Item[] {
    	return this.items.filter(item => item.location === 'shopping' && item.deleted === false);
    }

    /**
    Updates the given item; Searches for updatable item by ID in the given Item object

    @return boolean True for success, False for failure
    */
    saveItem(item: Item): boolean {
        let idx = this.items.findIndex(itm => itm.id === item.id);

        if (idx < 0) return false;

        this.items[idx] = item;
        return true;
    }

    createItem(item: Item): Item {
        // Get the biggest ID
        const max = this.items.reduce((prev, current) => (prev.id > current.id) ? prev : current);

        // New item now has biggest ID
        item.id = max.id + 1;
        this.items.push(item);

        // Return new item with new ID
        return item;
    }

    /**
    Moves item from one category to another

    @return boolean True for success, False for failure (check category string)
    */
    moveItem(id: number, to: string): boolean {
    	// Check for valid category
    	if (!(['fridge', 'shopping'].some(x => x === to))) return false;

        let idx = this.items.findIndex(item => item.id === id);

        // Check for valid ID
        if (idx < 0) return false;

        let item = this.items[idx];

        item.location = to;
        this.items[idx] = item;

        return true;
    }

    deleteItem(id: number): boolean {
        let idx = this.items.findIndex(item => item.id === id);

        // Check for valid ID
        if (idx < 0) return false;

        let item = this.items[idx];

        // For auto-completion and convenience we don't actually remove items, only soft-delete
        item.deleted = true;
        this.items[idx] = item;

        return true;
    }
}
