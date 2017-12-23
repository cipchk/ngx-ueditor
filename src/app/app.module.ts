import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HighlightJsModule } from 'ngx-highlight-js';

import { UEditorModule } from '../../lib';

import { AppComponent } from './app.component';
import { DemoComponent } from './components/demo.component';
import { DevComponent } from './components/dev.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
        { path: '', component: DemoComponent },
        { path: 'dev', component: DevComponent }
    ], { useHash: true }),
    CommonModule,
    HighlightJsModule,

    UEditorModule.forRoot({
        path: './assets/ueditor/',
        options: {
            themePath: (~location.href.indexOf('github') ? '/ngx-ueditor' : '') +  '/assets/ueditor/themes/'
        }
    })
  ],
  declarations: [
    AppComponent,
    DemoComponent,
    DevComponent
  ],
  providers: [  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
