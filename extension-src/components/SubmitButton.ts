import * as vscode from 'vscode';

// 提出ボタン
export const submitButton = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
submitButton.command = "AOJ.submit";
submitButton.text = "AOJ: 提出";
submitButton.tooltip = "表示中の問題に回答を提出";
