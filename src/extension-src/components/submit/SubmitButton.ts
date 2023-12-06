import * as vscode from "vscode";
import { default as dlm } from "../DisplayLanguageManager";
import AOJViewProvider from "../AOJViewProvider";

/**
 * 提出ボタン
 */
class SubmitButton {
  /** 提出ボタンの要素 */
  private element: vscode.StatusBarItem;

  /**
   * コンストラクタ
   */
  constructor() {
    this.element = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    this.element.command = "AOJ.submit";
    this.element.text = "";
    this.element.tooltip = "";
  }

  /**
   * 提出ボタンの要素を取得します。
   * @returns 提出ボタンの要素
   */
  public getElement = () => {
    return this.element;
  };

  /**
   * 提出ボタンを表示します。
   */
  public show = () => {
    this.element.show();
  };

  /**
   * 提出ボタンを非表示にします。
   */
  public hide = () => {
    this.element.hide();
  };

  /**
   * 提出ボタンのテキストを更新します。
   */
  public updateElementText = () => {
    const aojViewProvider = AOJViewProvider.getInstance();
    if (aojViewProvider.getArenaSelectInfo()?.isArena) {
      this.element.text = dlm.t("submit.submitButton.arenaSubmit.text");
      this.element.tooltip = dlm.t("submit.submitButton.arenaSubmit.tooltip");
    } else {
      this.element.text = dlm.t("submit.submitButton.submit.text");
      this.element.tooltip = dlm.t("submit.submitButton.submit.tooltip");
    }
  };
}

const submitButton = new SubmitButton();
export default submitButton;
