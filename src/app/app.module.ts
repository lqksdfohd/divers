import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalculatriceComponent } from './calculatrice/calculatrice.component';
import { ServiceCalcul } from './services/ServiceCalcul';

@NgModule({
  declarations: [
    AppComponent,
    CalculatriceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [ServiceCalcul],
  bootstrap: [AppComponent]
})
export class AppModule { }
