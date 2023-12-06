import { ProgrammingLanguage, DisplayLanguage } from "./../../public-src/constants/constant";
import translation_ja from "../settings/i18n/locales/ja.json";
import translation_en from "../settings/i18n/locales/en.json";
import submitButton from "./submit/SubmitButton";

/**
 * 翻訳テキスト一覧のオブジェクトの型
 */
type TranslationMap = {
  [key in DisplayLanguage]: {
    [key: string]: string;
  };
};

/**
 * 表示言語マネージャー
 */
class DisplayLanguageManager {
  /** 現在の表示言語 */
  private currentDisplayLanguage: DisplayLanguage;

  /** 翻訳テキスト一覧のオブジェクト */
  private translationMap: TranslationMap;

  /**
   * コンストラクタ
   */
  constructor() {
    this.currentDisplayLanguage = DisplayLanguage.Japanese;

    this.translationMap = {
      [DisplayLanguage.Japanese]: translation_ja,
      [DisplayLanguage.English]: translation_en,
    };
  }

  /**
   * 表示言語を変更します。
   * @param displayLanguage - 変更先の表示言語
   */
  public changeDisplayLanguage = (displayLanguage: DisplayLanguage) => {
    this.currentDisplayLanguage = displayLanguage;

    // 手動で変更する必要がある要素のテキストを変更
    this.changeElementTextManually();
  };

  /**
   * 現在の表示言語に対応するテキストを取得します。
   * @param textId - テキストID
   * @returns  現在の表示言語に対応するテキスト
   */
  public t = (textId: string) => {
    return this.translationMap[this.currentDisplayLanguage][textId];
  };

  /**
   * 要素のテキストを現在の表示言語に応じて手動で変更します。
   */
  private changeElementTextManually = () => {
    // 提出ボタンのテキストを更新
    submitButton.updateElementText();
  };
}

const displayLanguageManager = new DisplayLanguageManager();
export default displayLanguageManager;
