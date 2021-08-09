const MarkdownIt = require("markdown-it");

export function md2html(markdownOption) {
  const { plugins, ...conf } = markdownOption;
    const md = new MarkdownIt("default", markdownOption);
    
}
