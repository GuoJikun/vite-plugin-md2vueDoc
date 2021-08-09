export type pluginOption = {
  /**
   * markdown-it相关配置
   */
  markdown: {
    plugins: Array<any>;
    html: Boolean; // Enable HTML tags in source
    xhtmlOut: Boolean; // Use '/' to close single tags (<br />).
    // This is only for full CommonMark compatibility.
    breaks: Boolean; // Convert '\n' in paragraphs into <br>
    langPrefix: string; // CSS language prefix for fenced blocks. Can be
    // useful for external highlighters.
    linkify: Boolean; // 将类似URL的文本自动转换为链接

    // Enable some language-neutral replacement + quotes beautification
    // For the full list of replacements, see https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.js
    typographer: Boolean;

    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: string;

    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externally.
    // If result starts with <pre... internal wrapper is skipped.
    highlight: (str: string, lang: string) => string;
  };
};
