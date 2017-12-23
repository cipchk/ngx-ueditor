import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UEditorModule } from '../index';

const html = ``;

describe('Component: ngx-ueditor', () => {
  let fixture: ComponentFixture<any>;
  let context: TestNGComponent;
  let element: any;
  let clean: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestNGComponent],
      imports: [UEditorModule]
    });
    TestBed.overrideComponent(TestNGComponent, {set: {template: html}});
    fixture = TestBed.createComponent(TestNGComponent);
    context = fixture.componentInstance;
    element = fixture.nativeElement.querySelector('#c1');
    clean = fixture.nativeElement.querySelector('#c2');
    fixture.detectChanges();
  });

  it('fixture should not be null', () => {
    expect(fixture).not.toBeNull();
  });
});

@Component({
  selector: 'app-ueditor-test',
  template: ''
})
class TestNGComponent {
}
