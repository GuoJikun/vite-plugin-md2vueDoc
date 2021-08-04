import MarkdownItEmoji from "markdown-it-emoji";
import MarkdownItSub from "markdown-it-sub";
import MarkdownItSup from "markdown-it-sup";
import MarkdownItFootnote from "markdown-it-footnote";
// import MarkdownItDeflist from "markdown-it-deflist";
import MarkdownItAbbr from "markdown-it-abbr";
// import MarkdownItIns from "markdown-it-ins";
import MarkdownItMark from "markdown-it-mark";
import MarkdownItLatex from "markdown-it-latex";
// import MarkdownItKatex from "markdown-it-katex";
import MarkdownItTocAndAnchor from "markdown-it-toc-and-anchor";
import MarkdownItTaskLists from "markdown-it-task-lists";
import MarkdownItSourceMap from "markdown-it-source-map";

export const plugins = [
  MarkdownItEmoji,
  MarkdownItSub,
  MarkdownItSup,
  MarkdownItFootnote,
  MarkdownItAbbr,
  MarkdownItMark,
  MarkdownItLatex,
  MarkdownItTocAndAnchor,
  MarkdownItTaskLists,
  MarkdownItSourceMap,
];
