import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

declare const document: any;

@Injectable()
export class ScriptService {

    private loaded = false;
    private list: any = {};
    private emitter: Subject<boolean> = new Subject<boolean>();

    getChangeEmitter() {
        return this.emitter;
    }

    load(path: string, debug?: boolean) {
        if (this.loaded) return this;

        this.loaded = true;

        const promises: Promise<any>[] = [];

        if (!path.endsWith('/')) path += '/';

        [ `${path}ueditor.config.js`, debug === true ? `${path}ueditor.all.js` : `${path}ueditor.all.min.js` ].forEach((script) => promises.push(this.loadScript(script)));

        Promise.all(promises).then(res => {
            this.emitter.next(true);
        });

        return this;
    }

    loadScript(path: string): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.list[path] === true) {
                resolve(<any>{
                    path: path,
                    loaded: true,
                    status: 'Loaded'
                });
                return;
            }

            this.list[path] = true;

            const node = document.createElement('script');
            node.type = 'text/javascript';
            node.src = path;
            node.charset = 'utf-8';
            if (node.readyState) { // IE
                node.onreadystatechange = () => {
                    if (node.readyState === 'loaded' || node.readyState === 'complete') {
                        node.onreadystatechange = null;
                        resolve(<any>{
                            path: path,
                            loaded: true,
                            status: 'Loaded'
                        });
                    }
                };
            } else {
                node.onload = () => {
                    resolve(<any>{
                        path: path,
                        loaded: true,
                        status: 'Loaded'
                    });
                };
            }
            node.onerror = (error: any) => resolve(<any>{
                path: path,
                loaded: false,
                status: 'Loaded'
            });
            document.getElementsByTagName('head')[0].appendChild(node);
        });
    }
}
