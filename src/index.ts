import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { UEditorComponent } from './components/ueditor.component';
import { UEditorConfig } from './components/ueditor.config';
import { ScriptService } from './components/script.service';

export { UEditorComponent } from './components/ueditor.component';
export { UEditorConfig } from './components/ueditor.config';

@NgModule({
  imports: [CommonModule],
  providers: [ ScriptService ],
  declarations: [UEditorComponent],
  exports: [UEditorComponent]
})
export class UEditorModule {
    static forRoot(config: UEditorConfig): ModuleWithProviders {
        return {
            ngModule: UEditorModule,
            providers: [
                { provide: UEditorConfig, useValue: config }
            ]
        };
    }
}
