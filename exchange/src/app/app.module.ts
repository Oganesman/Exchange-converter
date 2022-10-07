import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './pages/main/header/header.component';
import { MainListComponent } from './pages/main/main-list/main-list.component';

const routing: Routes = [
	{path: '', component: MainComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    MainListComponent
  ],
  imports: [
    BrowserModule,
	 HttpClientModule,
	 FormsModule,
	 RouterModule.forRoot(routing)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
