import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ContactUsFormComponent } from './ui-lib/contact-us-form/contact-us-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactUsFormComponent
  ],
  imports: [
    BrowserModule, 
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
