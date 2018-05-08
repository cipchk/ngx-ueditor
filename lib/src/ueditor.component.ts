import {
  Component,
  Input,
  forwardRef,
  ViewChild,
  ElementRef,
  OnDestroy,
  EventEmitter,
  Output,
  OnInit,
  Optional,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { ScriptService } from './script.service';
import { UEditorConfig } from './ueditor.config';

declare const window: any;
declare const UE: any;
let _hook_finished = false;

export type EventTypes =
  | 'destroy'
  | 'reset'
  | 'focus'
  | 'langReady'
  | 'beforeExecCommand'
  | 'afterExecCommand'
  | 'firstBeforeExecCommand'
  | 'beforeGetContent'
  | 'afterGetContent'
  | 'getAllHtml'
  | 'beforeSetContent'
  | 'afterSetContent'
  | 'selectionchange'
  | 'beforeSelectionChange'
  | 'afterSelectionChange';

@Component({
  selector: 'ueditor',
  template: `
    <textarea #host id="{{id}}" class="ueditor-textarea"></textarea>
    <div class="loading" *ngIf="loading" [innerHTML]="loadingTip"></div>
    `,
  styles: [`:host .ueditor-textarea{display:none;}`],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UEditorComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UEditorComponent
  implements OnInit, AfterViewInit, OnChanges, OnDestroy, ControlValueAccessor {
  private instance: any;
  private value: string;
  private inited = false;
  private events: any = {};

  loading = true;
  id = `_ueditor-${Math.random()
    .toString(36)
    .substring(2)}`;

  @Input() config: any;
  @Input() loadingTip = '加载中...';
  @ViewChild('host') host: ElementRef;

  @Output() onPreReady = new EventEmitter<UEditorComponent>();
  @Output() onReady = new EventEmitter<UEditorComponent>();
  @Output() onDestroy = new EventEmitter();
  @Output() onContentChange = new EventEmitter();

  constructor(
    private el: ElementRef,
    private ss: ScriptService,
    private cog: UEditorConfig,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.inited = true;
  }

  ngAfterViewInit(): void {
    // 已经存在对象无须进入懒加载模式
    if (window.UE) {
      this.init();
      return;
    }

    this.ss
      .load(this.cog.js)
      .getChangeEmitter()
      .subscribe(res => {
        this.init();
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.inited && changes.config) {
      this.destroy();
      this.init();
    }
  }

  private init(options?: any) {
    if (!window.UE) throw new Error('uedito js文件加载失败');

    if (this.instance) return;

    // registrer hook
    if (this.cog.hook && !_hook_finished) {
      _hook_finished = true;
      this.cog.hook(UE);
    }

    this.onPreReady.emit(this);

    const opt = Object.assign({}, this.cog.options, this.config, options);

    const ueditor = UE.getEditor(this.id, opt);
    ueditor.ready(() => {
      this.instance = ueditor;
      if (this.value) this.instance.setContent(this.value);
      this.onReady.emit(this);
    });

    ueditor.addListener('contentChange', () => {
      this.value = ueditor.getContent();

      this.onChange(this.value);
      this.onTouched(this.value);

      this.onContentChange.emit(this.value);
    });
    this.loading = false;
    this.cd.detectChanges();
  }

  private destroy() {
    if (this.instance) {
      for (const ki of this.events) {
        this.instance.removeListener(ki, this.events[ki]);
      }
      this.instance.removeListener('ready');
      this.instance.removeListener('contentChange');
      this.instance.destroy();
      this.instance = null;
    }
    this.onDestroy.emit();
  }

  /**
   * 获取UE实例
   *
   * @readonly
   */
  get Instance(): any {
    return this.instance;
  }

  /**
   * 设置编辑器语言
   *
   * @param {('zh-cn' | 'en')} lang
   */
  setLanguage(lang: 'zh-cn' | 'en') {
    this.ss
      .loadScript(
        `${this.cog.options.UEDITOR_HOME_URL}/lang/${lang}/${lang}.js`,
      )
      .then(res => {
        this.destroy();

        // 清空语言
        if (!UE._bak_I18N) {
          UE._bak_I18N = UE.I18N;
        }
        UE.I18N = {};
        UE.I18N[lang] = UE._bak_I18N[lang];

        this.init();
      });
  }

  /**
   * 添加编辑器事件
   */
  addListener(eventName: EventTypes, fn: Function): void {
    if (this.events[eventName]) return;
    this.events[eventName] = fn;
    this.instance.addListener(eventName, fn);
  }

  /**
   * 移除编辑器事件
   */
  removeListener(eventName: EventTypes): void {
    if (!this.events[eventName]) return;
    this.instance.removeListener(eventName, this.events[eventName]);
    delete this.events[eventName];
  }

  ngOnDestroy() {
    this.destroy();
  }

  // reuse-tab: http://ng-alain.com/components/reuse-tab#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F
  _onReuseInit() {
    this.destroy();
    this.init();
  }

  writeValue(value: string): void {
    this.value = value;
    if (this.instance) {
      this.instance.setContent(this.value);
    }
  }

  protected onChange: any = Function.prototype;
  protected onTouched: any = Function.prototype;

  public registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }
  public registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.instance.setDisabled();
    } else {
      this.instance.setEnabled();
    }
  }
}
