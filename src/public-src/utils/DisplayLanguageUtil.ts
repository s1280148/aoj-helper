import { DisplayLanguage } from "../constants/constant";

/**
 * 表示言語を示す文字列から表示言語のラベルを取得します。
 * @param displayLanguageStr - 表示言語を示す文字列
 * @returns 表示言語のラベル
 */
export const getDisplayLanguageLabelFromDisplayLanguage = (displayLanguageStr: string) => {
  const displayLanguage = displayLanguageStr as DisplayLanguage;

  switch (displayLanguage) {
    case DisplayLanguage.Japanese: {
      return "Japanese";
    }
    case DisplayLanguage.English: {
      return "English";
    }
    default: {
      return "Japanese";
    }
  }
};
