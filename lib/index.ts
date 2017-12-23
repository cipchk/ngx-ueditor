import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { UEditorComponent } from './src/ueditor.component';
import { UEditorConfig } from './src/ueditor.config';
import { ScriptService } from './src/script.service';

export { UEditorComponent } from './src/ueditor.component';
export { UEditorConfig } from './src/ueditor.config';

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
