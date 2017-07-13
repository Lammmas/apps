export class Item {
    id: number;
    name: string;
    expiry: string;
    location: string = 'fridge';
    auto: boolean = false;
    open: boolean = false;
    opened: string = '';
    deleted: boolean = false;
}