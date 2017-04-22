import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { UeditorModule } from 'ngx-ueditor';

import { AppComponent } from './app.component';
import { DemoComponent } from './components/demo.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CommonModule,
    
    UeditorModule
  ],
  declarations: [
    AppComponent,
    DemoComponent
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})

export class AppDemoModule {
}
