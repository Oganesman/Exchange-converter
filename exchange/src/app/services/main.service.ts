import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';


@Injectable({
	providedIn: 'root'
})
export class MainService {
	public buyOrSale: Boolean = true;
	//result
	public result: Number | String
	// input with
	public currency: String
	// modelChange input
	public selectSumm: any = ''
	// select input with
	public selectCurrency: String = "UAH"

	// select input to
	public inSelectCurrency: String = "UAH"

	constructor(private http: HttpClient) { }

	//function clear Params
	clearParam() {
		this.selectSumm = '';
		this.selectCurrency = 'UAH';
		this.inSelectCurrency = 'UAH';
		this.currency = '';
		this.result = '';
	}
	
	// get API
	getExchanges() {
		let headers = new HttpHeaders()
		headers.append('Content-Type', 'application/json')
		return this.http.get(' https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5', { headers: headers })
			.pipe(map((data: Object) => data))
	}

	// input with
	changeSumm(selectSumm: number, exchange: any) {
		this.selectSumm = selectSumm
		if (this.buyOrSale)
			this.convertBuy(exchange)
		else
			this.convertSale(exchange)
	}

	// select with
	changeCurrency(selectCurrency: String, exchange: any) {
		this.selectCurrency = selectCurrency
		if (this.buyOrSale)
			this.convertBuy(exchange)
		else
			this.convertSale(exchange)
	}

	//select to
	inChangeCurrency(inSelectCurrency: String, exchange: any) {
		this.inSelectCurrency = inSelectCurrency
		if (this.buyOrSale)
			this.convertBuy(exchange)
		else
			this.convertSale(exchange)
	}

	// result convert buy
	convertBuy(exchanges: any) {
		const buyWith: any = exchanges.find((el: any) => el.ccy === this.selectCurrency)?.buy
		const buyIn: any = exchanges.find((el: any) => el.ccy === this.inSelectCurrency)?.buy

		if (this.selectCurrency == this.inSelectCurrency) {
			return this.result = this.selectSumm
		}
		if (this.selectCurrency !== this.inSelectCurrency ) {
			return this.result = (this.selectSumm * buyWith) / buyIn
		}
		if (this.selectSumm == '' || this.currency == undefined) {
			return this.result = ''
		}
	}

	// result convert sale
	convertSale(exchanges: any) {
		const saleWith: any = exchanges.find((el: any) => el.ccy === this.selectCurrency)?.sale
		const saleIn: any = exchanges.find((el: any) => el.ccy === this.inSelectCurrency)?.sale

		if (this.inSelectCurrency == this.selectCurrency) {
			return this.result = this.selectSumm
		}
		if (this.selectCurrency !== this.inSelectCurrency) {
			return this.result = (this.selectSumm * saleWith) / saleIn
		}
		if (this.selectSumm == '' || this.currency == undefined) {
			return this.result = ''
		}
	}
}
