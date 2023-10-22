export enum ProgrammingLanguage {
  C = "C",
  Cpp = "C++",
  Java = "JAVA",
  Cpp11 = "C++11",
  Cpp14 = "C++14",
  Cpp17 = "C++17",
  CS = "C#",
  D = "D",
  Go = "Go",
  Ruby = "Ruby",
  Rust = "Rust",
  Python = "Python",
  Python3 = "Python3",
  PyPy3 = "PyPy3",
  JavaScript = "JavaScript",
  Scala = "Scala",
  Haskell = "Haskell",
  OCaml = "OCaml",
  PHP = "PHP",
  Kotlin = "Kotlin",
}

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
