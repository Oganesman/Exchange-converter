import { Component } from '@angular/core';
import { MainService } from 'src/app/service/main.service';

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.css']
})
export class MainComponent {
	
	//get API
	public exchanges: Array<{
		base_ccy: String,
		buy: String,
		ccy: String,
		sale: String
	}>
	//select
	public selects: Array<{ currency: String }> = [
		{ currency: 'UAH' },
		{ currency: 'USD' },
		{ currency: 'EUR' },
	]
	constructor(public ms: MainService) {
		this.ms.getExchanges()
			.subscribe((data: any) => {
				this.exchanges = data.splice(0, 2)
				this.exchanges.map(el => {
					el.buy = el.buy.slice(0, 5)
					el.sale = el.sale.slice(0, 5)
				})
				if(this.ms.buy)
				this.ms.convertBuy(this.exchanges)
				else
				this.ms.convertSale(this.exchanges)
			})
	}
}
