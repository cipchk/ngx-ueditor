# ngx-ueditor
Angular2.x for Baidu UEditor（[UMeditor](https://github.com/cipchk/ngx-umeditor)）

[![NPM version](https://img.shields.io/npm/v/ngx-ueditor.svg)](https://www.npmjs.com/package/ngx-ueditor)
![Ci](https://github.com/cipchk/ngx-ueditor/workflows/Ci/badge.svg)

## Demo

- [Live Demo](https://cipchk.github.io/ngx-ueditor/)
- [Stackblitz](https://stackblitz.com/edit/ngx-ueditor)

## 特性

+ 懒加载 ueditor.all.js 文件。
+ 支持ueditor事件监听与移除
+ 支持语言切换
+ 支持ueditor实例对象直接访问。
+ 支持二次开发。

## 使用

### 1、安装

```
npm install ngx-ueditor --save
```

把 `UEditorModule` 模块导入到你项目中。

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { UEditorModule } from 'ngx-ueditor';

@NgModule({
  imports: [ 
    BrowserModule,
    FormsModule,
    UEditorModule.forRoot({
      js: [
        `./assets/ueditor/ueditor.config.js`,
        `./assets/ueditor/ueditor.all.min.js`,
      ],
      // 默认前端配置项
      options: {
        UEDITOR_HOME_URL: './assets/ueditor/'
      }
    })
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### 2、使用

```html
<ueditor [(ngModel)]="html" 
         [config]="{ wordCount: true }"
         [loadingTip]="'加载中……'"
         (onReady)="_ready($event)"
         (onDestroy)="_destroy()"
         (ngModelChange)="_change($event)"></ueditor>
```

| 名称    | 类型           | 默认值  | 描述 |
| ------- | ------------- | ----- | ----- |
| config | `Object` | - | 前端配置项说明，[见官网](http://fex.baidu.com/ueditor/#start-config) |
| loadingTip | `string` | `加载中...` | 初始化提示文本 |
| disabled | `boolean` | `false` | 是否禁用 |
| delay | `number` | `50` | 延迟初始化UEditor，单位：毫秒 |
| onPreReady | `EventEmitter<UEditorComponent>` | - | 编辑器准备就绪之前会触发该事件，并会传递 `UEditorComponent` 当前实例对象，可用于后续操作（比如：二次开发前的准备）。 |
| onReady | `EventEmitter<UEditorComponent>` | - | 编辑器准备就绪后会触发该事件，并会传递 `UEditorComponent` 当前实例对象，可用于后续操作。 |
| onDestroy | `EventEmitter` | - | **编辑器组件销毁**后会触发该事件 |
| ngModelChange | `EventEmitter<string>` | - | 编辑器内容发生改变时会触发该事件 |

### 3、关于懒加载

懒加载在未到 `wdinow.UE` 时会启动，如果你在 `index.html` 已经使用 `<script src="ueditor.all.js"></script>` 加载过，懒加载流程将会失效。

**加载语言注意点**

懒加载会自动识别并引用，否则，需要自行在 `<head>` 加入语言版本脚本。

## 访问ueditor实例对象

首先，需要给组件定义一下模板变量：

```html
<ueditor [(ngModel)]="full_source" #full></ueditor>
```

使用 `@ViewChild` 访问组件，并使用 `this.full.Instance` 访问ueditor实例对象。

```typescript
export class DemoComponent {
  @ViewChild('full') full: UEditorComponent;
  constructor(private el: ElementRef) {}

  getAllHtml() {
    // 通过 `this.full.Instance` 访问ueditor实例对象
    alert(this.full.Instance.getAllHtml())
  }
}
```

## 事件

虽说上节也可以直接注册ueditor事件，但当组件被销毁时可能会引发内存泄露。所以**不建议直接在ueditor实例中这么做**。组件本身提供 `addListener` 和 `removeListener` 来帮你处理。

```typescript
// 事件监听
this.full.addListener('focus', () => {
  this.focus = `fire focus in ${new Date().getTime()}`;
});
// 事件移除
this.full.removeListener('focus');
```

## 二次开发

**onPreReady**

`onPreReady` 是指在UEditor创建前会触发；因此，可以利用这个事件做一些针对二次开发的准备工作。比如，针对本实例创建自定义一个按钮：

```html
<ueditor [(ngModel)]="custom_source" (onPreReady)="onPreReady($event)" [config]="custom"></ueditor>
```

```typescript
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
  // comp.id 是指当前UEditor实例Id
}

```

**Hook**

hook调用会在UE加载完成后，UEditor初始化前调用，而且这个整个APP中只会调用一次，通过这个勾子可以做全局性的二次开发。

```typescript
UEditorModule.forRoot({
    js: [
      `./assets/ueditor/ueditor.config.js`,
      `./assets/ueditor/ueditor.all.min.js`,
    ],
    // 默认前端配置项
    options: {
      UEDITOR_HOME_URL: './assets/ueditor/'
    },
    hook: (UE: any): void => {
      // button 自定义按钮将在所有实例中有效。
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
      });
    }
})
```

## 表单非空校验

组件加入 `required` 当编辑器为空时会处于 `ng-invalid` 状态，具体体验见[Live Demo](https://cipchk.github.io/ngx-ueditor/)。

## 常见问题

### Cannot read property 'getDom' of undefined

当你快速切换路由时，可能会引起：`Cannot read property 'getDom' of undefined` 异常，这是因为 UEditor 在初始化过程中是异步行为，当 Angular 组件被销毁后其 DOM 也一并被移除，这可能导致进行初始化中的 UEditor 无法找到相应 DOM。我们无法避免这种错误，可以使用 `delay` 延迟启动初始化 Ueditor 适当地减少这种快速切换路由的问题。

### 关于图片上传

UEditor 自带单图、多图上传，只需要配置 `options.serverUrl` 服务端路径即可，有关更多上传细节 [百度：Ueditor](https://www.baidu.com/s?wd=ueditor+%E4%B8%8A%E4%BC%A0)。

> 若自身已经系统包含类似_淘宝图片_统一图片管理可以自行通过二次开发图片资源选取按钮。

## Troubleshooting

Please follow this guidelines when reporting bugs and feature requests:

1. Use [GitHub Issues](https://github.com/cipchk/ngx-ueditor/issues) board to report bugs and feature requests (not our email address)
2. Please **always** write steps to reproduce the error. That way we can focus on fixing the bug, not scratching our heads trying to reproduce it.

Thanks for understanding!

### License

The MIT License (see the [LICENSE](https://github.com/cipchk/ngx-ueditor/blob/master/LICENSE) file for the full text)
