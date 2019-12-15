import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { LogoConvasComponent } from './components/logo-convas/logo-convas.component';
import { HomeComponent } from './components/home/home.component';
import { FontsFamilyComponent } from './components/font-family/font-family.component';

@NgModule({
  declarations: [
    AppComponent,
    LogoConvasComponent,
    HomeComponent,
    FontsFamilyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
