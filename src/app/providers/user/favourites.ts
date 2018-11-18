import { Storage } from '@ionic/storage';

export class UserFavourites {

    private _items: string[] = [];

    add(sessionName: string): void {
        this._items.push(sessionName);
    }
    
    has(sessionName: string): boolean {
        return (this._items.indexOf(sessionName) > -1);
    }

    remove(sessionName: string): void {
        const index = this._items.indexOf(sessionName);
        if (index > -1) {
            this._items.splice(index, 1);
        }
    }

}