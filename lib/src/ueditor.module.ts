import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { UEditorComponent } from './ueditor.component';
import { UEditorConfig } from './ueditor.config';
import { ScriptService } from './script.service';

@NgModule({
  imports: [CommonModule],
  providers: [ScriptService],
  declarations: [UEditorComponent],
  exports: [UEditorComponent],
})
export class UEditorModule {
  static forRoot(config: UEditorConfig): ModuleWithProviders {
    return {
      ngModule: UEditorModule,
      providers: [{ provide: UEditorConfig, useValue: config }],
    };
  }
}
