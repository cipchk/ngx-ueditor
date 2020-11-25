import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HighlightJsModule } from 'ngx-highlight-js';
import { UEditorModule } from 'ngx-ueditor';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { DemoComponent } from './components/demo.component';
import { DevComponent } from './components/dev.component';
import {
  DemoModalComponent,
  DemoModalContentComponent,
} from './components/modal.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(
      [
        { path: '', component: DemoComponent },
        { path: 'dev', component: DevComponent },
        { path: 'modal', component: DemoModalComponent },
      ],
      { useHash: true, relativeLinkResolution: 'legacy' },
    ),
    CommonModule,
    HighlightJsModule,
    ModalModule.forRoot(),

    UEditorModule.forRoot({
      js: [
        `./assets/ueditor/ueditor.config.js`,
        `./assets/ueditor/ueditor.all.min.js`,
      ],
      options: {
        zIndex: 5000,
        UEDITOR_HOME_URL:
          (location.href.indexOf('github') !== -1 ? '/ngx-ueditor' : '.') +
          '/assets/ueditor/',
      },
    }),
  ],
  declarations: [
    AppComponent,
    DemoComponent,
    DevComponent,
    DemoModalComponent,
    DemoModalContentComponent,
  ],
  entryComponents: [DemoModalContentComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
