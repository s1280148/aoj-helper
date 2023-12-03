import { DisplayLanguage, ProgrammingLanguage } from "../constants/constant";

/**
 * プログラミング言語を示す文字列からモナコエディターで設定するプログラミング言語名を取得します。
 * @param programmingLanguageStr - プログラミング言語を示す文字列
 * @returns プログラミング言語名
 */
export const getMonacoEditorLanguageFromProgrammingLanguage = (programmingLanguageStr: string) => {
  const programmingLanguage = programmingLanguageStr as ProgrammingLanguage;

  switch (programmingLanguage) {
    case ProgrammingLanguage.C: {
      return "c";
    }
    case ProgrammingLanguage.Cpp:
    case ProgrammingLanguage.Cpp11:
    case ProgrammingLanguage.Cpp14:
    case ProgrammingLanguage.Cpp17: {
      return "cpp";
    }
    case ProgrammingLanguage.Java: {
      return "java";
    }
    case ProgrammingLanguage.CS: {
      return "csharp";
    }
    case ProgrammingLanguage.Go: {
      return "go";
    }
    case ProgrammingLanguage.Ruby: {
      return "ruby";
    }
    case ProgrammingLanguage.Rust: {
      return "rust";
    }
    case ProgrammingLanguage.Python:
    case ProgrammingLanguage.Python3:
    case ProgrammingLanguage.PyPy3: {
      return "python";
    }
    case ProgrammingLanguage.JavaScript: {
      return "javascript";
    }
    case ProgrammingLanguage.Scala: {
      return "scala";
    }
    case ProgrammingLanguage.PHP: {
      return "php";
    }
    case ProgrammingLanguage.Kotlin: {
      return "kotlin";
    }
    default: {
      return "plaintext";
    }
  }
};

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
