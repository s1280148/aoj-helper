import * as vscode from "vscode";

/**
 * SimpleDocumentContentProvider
 *
 * @remarks
 * シンプルなテキストを返すURIを提供する。
 *
 * @example
 * aoj-helper:text/simple-text?_suffix=123456789
 */
class SimpleDocumentContentProvider implements vscode.TextDocumentContentProvider {
  /** URIのタイプ */
  static readonly prefix = "text/";

  /** URIの接尾辞（キャッシュされるのを回避するために付与する) */
  static readonly suffix = "?_suffix";

  /**
   * URIからドキュメントの内容を提供します。
   * @param uri - uri
   * @returns ドキュメントの内容
   */
  provideTextDocumentContent(uri: vscode.Uri): string {
    return SimpleDocumentContentProvider.getTextDocumentContent(uri);
  }

  /**
   * URIからドキュメントの内容を取得します。
   * @param uri - uri
   * @returns ドキュメントの内容
   */
  private static getTextDocumentContent(uri: vscode.Uri) {
    const originalPath = uri.path;
    const prefixIndex = originalPath.indexOf(this.prefix);
    const suffixIndex = originalPath.lastIndexOf(this.suffix);

    // 元のURIから内容部分のみを取得する
    return originalPath.slice(prefixIndex + this.prefix.length, suffixIndex);
  }
}

export default SimpleDocumentContentProvider;
