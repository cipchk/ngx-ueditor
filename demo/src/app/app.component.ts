import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>ngx-ueditor</h1>
    <p>Angular2 百度UEditor组件，有关更多细节见<a href="https://github.com/cipchk/ngx-ueditor/blob/master/README.md" target="_blank">README.md</a></p>
    <demo></demo>
  `,
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
}
