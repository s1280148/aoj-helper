/**
 * レビューのメッセージをHTML形式の文字列にフォーマットします。
 * @param message レビューのメッセージ
 * @returns HTML形式の文字列
 */
export const formatReviewMessage = (message: string) => {
  const htmlText = message
    .replace(/```([\w\+\#]+)\n([\s\S]*?)\n```/g, (match, lang, code) => {
      const escapedCode = escapeHTML(code);
      return `<pre class="p-3 my-2 border rounded-lg bg-gray-300 border-gray-400 text-gray-800 dark:bg-darkMode-dark dark:text-darkMode-text dark:border-darkMode">${escapedCode}</pre>`;
    })
    .replace(/\n/g, "<br>");

  return htmlText;
};

/**
 * HTML形式の文字列をエスケープします。
 * @param str HTML形式の文字列
 * @returns エスケープ後のHTML形式の文字列
 */
const escapeHTML = (str: string) => {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};
