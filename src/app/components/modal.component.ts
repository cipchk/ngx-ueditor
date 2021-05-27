import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'demo-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title pull-left">Title</h4>
      <button type="button" class="close pull-right" aria-label="Close" (click)="bsModalRef.hide()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <ueditor [(ngModel)]="html"></ueditor>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary" (click)="save()">Save</button>
    </div>
  `,
})
export class DemoModalContentComponent {
  onClose = new Subject();
  html = ``;
  constructor(public bsModalRef: BsModalRef) {}

  save() {
    this.onClose.next(this.html);
    this.bsModalRef.hide();
  }
}

@Component({
  selector: 'demo-modal',
  template: `
    <button type="button" class="btn btn-primary" (click)="openModalWithComponent()">Create modal with component</button>
    <div class="card card-outline-secondary mt-3">
      <div class="card-body">
        <blockquote class="card-bodyquote" [innerHTML]="html"></blockquote>
      </div>
    </div>
  `,
})
export class DemoModalComponent {
  html = ``;
  bsModalRef: BsModalRef | null = null;
  constructor(private modalService: BsModalService) {}

  openModalWithComponent() {
    this.bsModalRef = this.modalService.show(DemoModalContentComponent, {
      initialState: { html: this.html },
      class: 'modal-lg',
    });
    this.bsModalRef.content.onClose.subscribe((html: string) => (this.html = html));
  }
}
