// MathJaxの設定
const mathJaxConfig = {
  options: {
    skipHtmlTags: ["script", "noscript", "style", "textarea", "code", "annotation", "annotation-xml"],
  },
  tex: {
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"],
    ],
  },
};

export default mathJaxConfig;
