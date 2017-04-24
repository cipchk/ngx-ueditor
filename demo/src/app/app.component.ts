import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
    <nav class="navbar navbar-toggleable-md navbar-light bg-faded mb-3">
        <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <a class="navbar-brand" href="#">ngx-ueditor</a>
        <div class="collapse navbar-collapse">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link" routerLink="/">首页</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" routerLink="/dev">二次开发</a>
                </li>
            </ul>
        </div>
    </nav>
    <p class="mb-3">Angular2 百度UEditor组件，有关更多细节见<a href="https://github.com/cipchk/ngx-ueditor/blob/master/README.md" target="_blank">README.md</a></p>
    <router-outlet></router-outlet>
  `,
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
}
