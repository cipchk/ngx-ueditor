import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { NuLazyService } from '@ng-util/lazy';

@Injectable()
export class ScriptService {
  private loaded = false;
  private emitter: Subject<void> = new Subject<void>();

  constructor(private lazySrv: NuLazyService) {}

  get change(): Observable<void> {
    return this.emitter.asObservable();
  }

  load(path: string[]): this {
    if (this.loaded) {
      return this;
    }
    this.loaded = true;
    Promise.all(
      path.map((script) => this.lazySrv.loadScript(script)),
    ).then(() => this.emitter.next());

    return this;
  }
}
