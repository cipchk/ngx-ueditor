import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { UEditorComponent } from './ueditor.component';
import { UEditorConfig } from './ueditor.config';

@NgModule({
  imports: [CommonModule, UEditorComponent],
  exports: [UEditorComponent],
})
export class UEditorModule {
  static forRoot(config: UEditorConfig): ModuleWithProviders<UEditorModule> {
    return {
      ngModule: UEditorModule,
      providers: [{ provide: UEditorConfig, useValue: config }],
    };
  }
}
