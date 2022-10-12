import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { find, map } from 'rxjs';


@Injectable({
	providedIn: 'root'
})
export class MainService {

	// BTC in UAH
	// public btcShow: any

	public buyOrSale: boolean = true;
	//result
	public result: number | string
	// input with
	public currency: string
	// modelChange input
	public selectSumm: any = ''
	// select input with
	public selectCurrency: string = "UAH"
	// select input to
	public inSelectCurrency: string = "UAH"

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
		return this.http.get('https://api.monobank.ua/bank/currency', {
			headers: headers
		})
			.pipe(map((data: object) => data))
	}

	// input with
	changeSumm(selectSumm: number, exchange: Array<{
		rateBuy: number,
		rateSell: number,
		ccy: string,
	}>) {
		this.selectSumm = selectSumm
		if (this.buyOrSale)
			this.convertBuy(exchange)
		else
			this.convertSale(exchange)
	}

	// select with
	changeCurrency(selectCurrency: string, exchange: Array<{
		rateBuy: number,
		rateSell: number,
		ccy: string,
	}>) {
		this.selectCurrency = selectCurrency
		if (this.buyOrSale)
			this.convertBuy(exchange)
		else
			this.convertSale(exchange)
	}

	//select to
	inChangeCurrency(inSelectCurrency: string, exchange: Array<{
		rateBuy: number,
		rateSell: number,
		ccy: string,
	}>) {
		this.inSelectCurrency = inSelectCurrency
		if (this.buyOrSale)
			this.convertBuy(exchange)
		else
			this.convertSale(exchange)
	}

	// result convert buy
	convertBuy(exchanges: Array<{
		rateBuy: number,
		rateSell: number,
		ccy: string,
	}>) {
		const buyWith: any = exchanges.find((el: any) => el.ccy === this.selectCurrency)?.rateBuy
		const buyIn: any = exchanges.find((el: any) => el.ccy === this.inSelectCurrency)?.rateBuy

		if (this.selectCurrency == this.inSelectCurrency) {
			return this.result = this.selectSumm
		}
		if (this.selectCurrency !== this.inSelectCurrency && this.selectSumm != '') {
			return this.result = ((this.selectSumm * buyWith) / buyIn).toFixed(2)
		}
		if (this.selectSumm == '' || this.currency == undefined) {
			return this.result = ''
		}
	}

	// result convert sale
	convertSale(exchanges: Array<{
		rateBuy: number,
		rateSell: number,
		ccy: string,
	}>) {
		const saleWith: any = exchanges.find((el: any) => el.ccy === this.selectCurrency)?.rateSell
		const saleIn: any = exchanges.find((el: any) => el.ccy === this.inSelectCurrency)?.rateSell

		if (this.inSelectCurrency == this.selectCurrency) {
			return this.result = this.selectSumm
		}
		if (this.selectCurrency !== this.inSelectCurrency && this.selectSumm != '') {
			return this.result = ((this.selectSumm * saleWith) / saleIn).toFixed(2)
		}
		if (this.selectSumm == '' || this.currency == undefined) {
			return this.result = ''
		}
	}
	// // result BTC in UAH
	// converBtc(takeBtc: Array<{
	// 	rateBuy: number,
	// 	rateSell: number,
	// 	ccy: string,
	// }>) {
	// 	const btc = Number(takeBtc[0].rateBuy)
	// 	const usd = Number(takeBtc[takeBtc.length - 1].rateBuy)
	// 	this.btcShow = (btc * usd).toString()
	// 	this.btcShow = this.btcShow.split('.')[0]
	// 	this.btcShow = (this.btcShow.match(/.{1,3}/g)).join(' ');
	// }
}
