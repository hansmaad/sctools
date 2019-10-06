import { Item, items } from "./items";


export interface Selection {
    name: string;
    item: Item;
    valuePerTime: number;
    amountPerTime: number;
}

export interface SaleSelection extends Selection {
    maxAmountPerTime: number;
    needs: Array<{
        item: string;
        amountPerTime: number;
    }>;
}

export interface Factory {
    production: Production[];
    workload: number;
}

export interface Production {
    item: string;
    amountPerTime: number;
    workload: number;
}

export interface Shop {
    name: string;
    production: Production[];
    workload: number;
}

export type Stock = Array<{
    item: Item;
    amountPerTime: number;
}>;

export class Simulator {
    numberOfFactories = 10;
    sales: SaleSelection[] = [];
    purchase: Selection[] = [];
    stock: Stock;
    factories: Factory = {
        production: [],
        workload: 0
    };
    shops: Shop[];

    totalIncomePerTime: number = 0;
    totalExpensesPerTime: number = 0;

    items = Object.keys(items).map(k => {
        const i = {
            name: k
        };
        Object.assign(i, items[k]) ;
        return i;
    });

    constructor() {
        let shops = {};
        for (let i in items) {
            if (items[i].build) {
                shops[items[i].build.store] = 1;
            }
        }
        this.shops = Object.keys(shops).map(name => ({
            name: name,
            production: [],
            workload: 0,
        }));
    }

    select(itemName: string) {
        const selection = this.sales.find(s => s.name === itemName);
        if (selection) {
            return;
        }
        const item = items[itemName];
        const amountPerTime = 1 / buildTime(item)
        this.sales.push({
            name: itemName,
            item,
            maxAmountPerTime: amountPerTime,
            amountPerTime,
            valuePerTime: item.value * amountPerTime,
            needs: needs(itemName, amountPerTime),
        });
        this.update();
    }

    buy(itemName: string) {
        const purchase = this.purchase.find(s => s.name === itemName);
        if (purchase) {
            return;
        }
        const item = items[itemName];
        const amountPerTime = 1 / 60;
        this.purchase.push({
            name: itemName,
            item,
            amountPerTime,
            valuePerTime: item.value * amountPerTime,
        });
        this.update();
    }

    updateSelection(itemName: string, amountPerTime: number) {
        const selection = this.sales.find(s => s.name === itemName);
        selection.amountPerTime = Math.max(amountPerTime, 0);
        selection.needs = needs(itemName, amountPerTime);
        selection.valuePerTime = selection.item.value * amountPerTime,
        this.update();
    }

    updatePurchase(itemName: string, amountPerTime: number) {
        const selection = this.purchase.find(s => s.name === itemName);
        selection.amountPerTime = Math.max(amountPerTime, 0);
        selection.valuePerTime = selection.item.value * amountPerTime,
        this.update();
    }

    removeSelection(itemName: string) {
        const selection = this.sales.find(s => s.name === itemName);
        this.sales.splice(this.sales.indexOf(selection), 1);
        this.update();
    }

    removePurchase(itemName: string) {
        const selection = this.purchase.find(s => s.name === itemName);
        this.purchase.splice(this.purchase.indexOf(selection), 1);
        this.update();
    }

    private update() {
        this.shops.forEach(s => {
            s.production.length = 0;
            s.workload = 0;
        });
        this.factories.workload = 0;
        this.factories.production.length = 0;
        const stock = this.stock = this.purchase.map(p => ({ item: p.item, amountPerTime: p.amountPerTime }));
        this.sales.forEach(s => this.addProduction(s.name, s.amountPerTime, stock));
        this.totalIncomePerTime = this.sales.reduce((v, s) => v + s.valuePerTime, 0);
        this.totalExpensesPerTime = this.purchase.reduce((v, s) => v + s.valuePerTime, 0);
    }

    // 3 planks per hour.
    //   each need 2 woods
    //   => 6 woods per hour
    private addProduction(itemName: string, amountPerTime: number, stock: Stock) {
        const item = items[itemName];
        if (item.build) {
            this.addShop(itemName, amountPerTime, stock);
        }
        if (item.factory) {
            this.addFactory(itemName, amountPerTime, stock);
        }
    }

    private addShop(itemName: string, amountPerTime: number, stock: Stock) {
        const item = items[itemName];
        const time = buildTime(item);
        const onStock = stock.find(s => s.item === item);
        if (onStock) {
            const available = onStock.amountPerTime;
            const takeFromStock = Math.min(available, amountPerTime);
            amountPerTime -= takeFromStock;
            onStock.amountPerTime -= takeFromStock;
        }
        if (amountPerTime > 0) {
            const shop = this.shops.find(s => s.name === item.build.store);
            shop.production.push({
                item: itemName,
                amountPerTime: amountPerTime,
                workload: amountPerTime * time,
            });
            if (item.needs) {
                item.needs.forEach(n => {
                    this.addProduction(n.item, n.count * amountPerTime, stock);
                });
            }
            shop.workload = shop.production.reduce((w, p) => w + p.workload, 0);
        }
    }

    private addFactory(itemName: string, amountPerTime: number, stock: Stock) {

        let factory = this.factories;
        const item = items[itemName];

        const onStock = stock.find(s => s.item === item);
        if (onStock) {
            const available = onStock.amountPerTime;
            const takeFromStock = Math.min(available, amountPerTime);
            amountPerTime -= takeFromStock;
            onStock.amountPerTime -= takeFromStock;
        }
        if (amountPerTime > 0) {
            let production = factory.production.find(i => i.item === itemName);
            if (production) {
                production.amountPerTime += amountPerTime;
            }
            else {
                production = {
                    item: itemName,
                    amountPerTime: amountPerTime,
                    workload: 0,
                }
                factory.production.push(production);
            }
            amountPerTime = production.amountPerTime;

            // 1 slot can produce 1 item / itemTime
            // amountPerTime / 1item/itemTime = needed slots
            // workload = neededSlots / availableSlots
            const time = buildTime(item);
            const neededCapacity = amountPerTime * time;
            const availableCapacity = this.numberOfFactories * 5;
            production.workload = neededCapacity / availableCapacity,

            factory.workload = factory.production.reduce((w, p) => w + p.workload, 0);
        }
    }
}

function buildTime(item: Item) {
    return item.build ? item.build.time : item.factory;
}

function needs(itemName: string, amountPerTime: number): Array<{ item: string; amountPerTime: number; }> {
    const n = [];
    const item = items[itemName];
    addNeeds(n, itemName, amountPerTime);
    return n;
}

function addNeeds(dest: Array<{ item: string; amountPerTime: number; }>, itemName: string, amountPerTime: number) {

    const item = items[itemName];
    (item.needs || []).forEach(need => {
        const existingNeed = dest.find(i => i.item === need.item);
        if (existingNeed) {
            existingNeed.amountPerTime += amountPerTime * need.count;
        }
        else {
            dest.push({
                item: need.item,
                amountPerTime: amountPerTime * need.count,
            });
        }
        addNeeds(dest, need.item, need.count * amountPerTime);
    })
}
