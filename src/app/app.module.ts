import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ButtonComponent } from './shared/components/button/button.component';
import { SelectComponent } from './select/select.component';
import { SelectCountryComponent } from './select/select-country/select-country.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    SelectComponent,
    SelectCountryComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
