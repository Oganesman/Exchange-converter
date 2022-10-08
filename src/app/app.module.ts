import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './pages/main/header/header.component';
import { ArrowSvgComponent } from './pages/main/arrow-svg/arrow-svg.component';

const routing: Routes = [
	{ path: '', component: MainComponent }
]

@NgModule({
	declarations: [
		AppComponent,
		MainComponent,
		HeaderComponent,
		ArrowSvgComponent,
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		FormsModule,
		RouterModule.forRoot(routing, {useHash: true})
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
