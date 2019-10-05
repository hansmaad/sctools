import { Component, OnInit } from '@angular/core';
import { Simulator, SaleSelection, Selection } from './items/simulator';

@Component({
    selector: 'app-production',
    templateUrl: './production.component.html',
    styles: []
})
export class ProductionComponent implements OnInit {


    simulator = new Simulator();
    buyItem;
    saleItem;

    constructor() { }

    ngOnInit() {
    }

    addSale() {
        this.simulator.select(this.saleItem.name);
        this.saleItem = null;
    }

    addBuy() {
        this.simulator.buy(this.buyItem.name);
        this.buyItem = null;
    }

    amountPerHour(amountPerTime: number) {
        return this.renderNumber(amountPerTime * 60 * 24);
    }

    renderNumber(x: number) {
        return '' + Math.round(x * 100) / 100;
    }

    more(item: SaleSelection) {
        this.simulator.updateSelection(item.name, item.amountPerTime * 1.1);
    }

    less(item: SaleSelection) {
        this.simulator.updateSelection(item.name, item.amountPerTime * 0.9);
    }

    buyMore(item: Selection) {
        this.simulator.updatePurchase(item.name, item.amountPerTime * 1.1);
    }

    buyLess(item: Selection) {
        this.simulator.updatePurchase(item.name, item.amountPerTime * 0.9);
    }
}
