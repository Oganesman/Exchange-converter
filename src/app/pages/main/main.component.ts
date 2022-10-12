import { Component } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.css']
})
export class MainComponent {

	//get API
	// public exchanges: any
	public exchanges: Array<{
		rateBuy: number,
		rateSell: number,
		ccy: string,
	}>
	//select
	
	constructor(public ms: MainService) {
		this.ms.getExchanges()
			.subscribe((data: any) => {
				// this.ms.converBtc(data)
				this.exchanges = data.splice(0, 2)
				this.exchanges[0].ccy = 'USD';
				this.exchanges[1].ccy = 'EUR';
				this.exchanges.map((el: any) => {
					delete el.currencyCodeA,
					delete el.currencyCodeB,
					delete el.date
				}
				)

				this.exchanges.unshift({ rateBuy: 1, rateSell: 1, ccy: 'UAH'})
				console.log(this.exchanges);

				this.exchanges.map((el: any) => {
					el.rateBuy = el.rateBuy.toFixed(2)
					el.rateSell = el.rateSell.toFixed(2)
				})
				if (this.ms.buyOrSale)
					this.ms.convertBuy(this.exchanges)
				else
					this.ms.convertSale(this.exchanges)
			})
	}


}
