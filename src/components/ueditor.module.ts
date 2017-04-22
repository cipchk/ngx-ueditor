import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { UeditorComponent } from './ueditor.component';
import { ScriptService } from './script.service';

@NgModule({
  imports: [CommonModule],
  providers: [ ScriptService ],
  declarations: [UeditorComponent],
  exports: [UeditorComponent]
})
export class UeditorModule {
}
