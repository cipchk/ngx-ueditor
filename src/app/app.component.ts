import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" routerLink="/">ngx-ueditor</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link" routerLink="/">首页</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" routerLink="/dev">二次开发</a>
            </li>
          </ul>
        </div>
    </nav>
    <p class="mt-3 mb-3">Angular2 百度UEditor组件，有关更多细节见<a href="https://github.com/cipchk/ngx-ueditor/blob/master/README.md" target="_blank">README.md</a></p>
    <router-outlet></router-outlet>
  `,
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
}
