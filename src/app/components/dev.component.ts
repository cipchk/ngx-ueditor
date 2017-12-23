/* tslint:disable */
import { Component, OnInit, ViewEncapsulation, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { UEditorComponent } from '../../../lib';

declare const UE: any;

@Component({
    selector: 'dev',
    templateUrl: './dev.component.html',
    encapsulation: ViewEncapsulation.None
})
export class DevComponent {
    constructor(private el: ElementRef) {}

    custom_source: string = `<p>Hello ${+new Date}</p>`;
    custom: any = {
        toolbars: [['FullScreen', 'Source', 'Undo', 'Redo', 'Bold', 'button']]
    };

    onPreReady(comp: UEditorComponent) {
        UE.registerUI('button', function(editor, uiName) {
            //注册按钮执行时的command命令，使用命令默认就会带有回退操作
            editor.registerCommand(uiName, {
                execCommand: function() {
                    alert('execCommand:' + uiName)
                }
            });
            //创建一个button
            var btn = new UE.ui.Button({
                //按钮的名字
                name: uiName,
                //提示
                title: uiName,
                //添加额外样式，指定icon图标，这里默认使用一个重复的icon
                cssRules: 'background-position: -500px 0;',
                //点击时执行的命令
                onclick: function() {
                    //这里可以不用执行命令,做你自己的操作也可
                    editor.execCommand(uiName);
                }
            });
            //当点到编辑内容上时，按钮要做的状态反射
            editor.addListener('selectionchange', function() {
                var state = editor.queryCommandState(uiName);
                if (state == -1) {
                    btn.setDisabled(true);
                    btn.setChecked(false);
                } else {
                    btn.setDisabled(false);
                    btn.setChecked(state);
                }
            });
            //因为你是添加button,所以需要返回这个button
            return btn;
        }, 5, comp.id);
    }
}
