export interface UEditorOptions {
  [key: string]: any;
  /** 当你使用 `cdn` 时，属性必填，相当于整个 Ueditor 所需要语言、主题、对话框等根路径 */
  UEDITOR_HOME_URL: string;
  /** 服务器统一请求接口路径 */
  serverUrl?: string;
  /** 工具栏上的所有的功能按钮和下拉框，可以在new编辑器的实例时选择自己需要的从新定义 */
  toolbars?: string[][];
  /** 编辑器层级的基数,默认 `900` */
  zIndex?: number;
}

export class UEditorConfig {
  /**
   * Ueditor [前端配置项](http://fex.baidu.com/ueditor/#start-config)
   */
  options?: UEditorOptions;

  /**
   * 指定ueditor.js和config.js路径，这是启动 Ueditor 必备
   * - **务必**指定 `options.UEDITOR_HOME_URL`（虽然默认会根据 `config.js` 路径获取，但某些环境下更有保证）
   */
  js?: string[];

  /**
   * Hook
   * - 在 Ueditor 对象加载完成后执行
   * - 只执行一次
   */
  hook?: (ue: any) => void;
}
