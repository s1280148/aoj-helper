import * as vscode from "vscode";

class SimpleDocumentContentProvider implements vscode.TextDocumentContentProvider {
  static readonly prefix = "text/";

  static readonly suffix = "?_suffix";

  provideTextDocumentContent(uri: vscode.Uri): string {
    return SimpleDocumentContentProvider.getTextDocumentContent(uri);
  }

  private static getTextDocumentContent(uri: vscode.Uri) {
    const originalPath = uri.path;
    const prefixIndex = originalPath.indexOf(this.prefix);
    const suffixIndex = originalPath.lastIndexOf(this.suffix);

    return originalPath.slice(prefixIndex + this.prefix.length, suffixIndex);
  }
}

export default SimpleDocumentContentProvider;
