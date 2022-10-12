import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent {
	
	@Input() exchanges: Array<{
		rateBuy: number,
		rateSell: number,
		ccy: string,
	}>

	constructor() { }



}
